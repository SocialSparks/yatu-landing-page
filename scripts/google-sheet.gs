/**
 * Yatu - collecte des formulaires du site vitrine dans une Google Sheet.
 *
 * Ce script n'est plus appele par le navigateur du visiteur mais par le Worker
 * Cloudflare, qui a d'abord range la soumission dans sa base D1. Deux
 * consequences : l'URL /exec n'apparait plus dans le JavaScript public, et le
 * Worker rejoue une soumission dont il n'a pas recu la reponse. D'ou la colonne
 * d'identifiant et le dedoublonnage plus bas - sans eux, un simple timeout
 * cote Cloudflare produirait une ligne en double.
 *
 * Installation (une seule fois) :
 *
 *  1. Cree une Google Sheet vide (les onglets sont crees automatiquement).
 *  2. Extensions > Apps Script. Efface le contenu, colle ce fichier, enregistre.
 *  3. Parametres du projet > Proprietes du script > Ajouter une propriete :
 *       FORMS_TOKEN = une longue chaine aleatoire
 *     C'est le seul rempart de l'URL /exec, qui reste accessible a tous.
 *  4. Deployer > Nouveau deploiement > type "Application Web" avec :
 *       - Executer en tant que  : Moi
 *       - Qui a acces           : Tout le monde
 *     ...et surtout PAS "Tout le monde disposant d'un compte Google" : le Worker
 *     poste sans etre connecte, Google renverrait une page d'erreur Drive.
 *     Autorise le script quand il le demande (l'ecran "application non
 *     verifiee" est normal : Parametres avances > Acceder a ...).
 *  5. Copie l'URL qui finit par /exec dans les secrets du Worker :
 *       npx wrangler secret put FORMS_ENDPOINT
 *       npx wrangler secret put FORMS_TOKEN     (la meme valeur qu'a l'etape 3)
 *     En local, les memes cles vont dans `.dev.vars` (voir `.dev.vars.example`).
 *
 * A chaque modification de ce fichier : Deployer > Gerer les deploiements >
 * crayon > Version "Nouvelle version". Sans ca l'ancienne version continue de
 * repondre et l'URL ne change pas.
 *
 * Pour verifier que le deploiement repond, ouvre l'URL /exec dans un onglet :
 * tu dois lire {"ok":true,"service":"yatu-forms"}.
 */

/** Le champ qu'aucun humain ne remplit. Les deux noms sont acceptes : l'ancien
 *  a circule dans le JavaScript public jusqu'a la bascule du site. */
const HONEYPOT_FIELDS = ['yq-ref', 'website'];

/**
 * L'onglet Waitlist tient une ligne par personne. L'inscription ecrit les
 * quatre premieres colonnes ; le questionnaire facultatif de /bienvenue
 * complete les quatre suivantes sur cette meme ligne, retrouvee par e-mail.
 *
 * Les deux colonnes d'identifiant sont distinctes parce que les deux ecritures
 * d'une meme ligne viennent de deux soumissions differentes, chacune avec son
 * propre identifiant a dedoublonner.
 */
const WAITLIST_COLUMNS = [
  'Date',
  'E-mail',
  'Source',
  'Page',
  'Date questionnaire',
  'Ce qu il organise',
  'Taille du groupe',
  'BDE ou asso',
  'Id',
  'Id questionnaire',
];

/**
 * Un formulaire : son onglet, les colonnes de cet onglet, quelle cle du payload
 * alimente quelle colonne, et la colonne qui porte son identifiant.
 *
 * Pour ajouter un champ : ajoute-le au formulaire React, ajoute-le a la liste
 * blanche de `lib/server/form-schema.ts`, ajoute la colonne et son entree
 * `values` ici, puis redeploie une NOUVELLE VERSION. La colonne manquante sera
 * ajoutee toute seule a la feuille existante.
 */
const FORMS = {
  waitlist: {
    sheet: 'Waitlist',
    columns: WAITLIST_COLUMNS,
    idColumn: 'Id',
    values: {
      Date: 'ts',
      'E-mail': 'email',
      Source: 'source',
      Page: 'page',
      Id: 'id',
    },
  },
  profil: {
    sheet: 'Waitlist',
    columns: WAITLIST_COLUMNS,
    idColumn: 'Id questionnaire',
    values: {
      'E-mail': 'email',
      'Date questionnaire': 'ts',
      'Ce qu il organise': 'types',
      'Taille du groupe': 'size',
      'BDE ou asso': 'bde',
      'Id questionnaire': 'id',
    },
    // Le questionnaire prolonge une inscription : on complete la ligne de cette
    // personne au lieu d'en ajouter une deuxieme. Sans e-mail (lien /bienvenue
    // ouvert directement), on retombe sur un simple ajout.
    mergeOn: 'E-mail',
  },
  'bde-demo': {
    sheet: 'Demandes BDE',
    columns: [
      'Date',
      'Prenom et nom',
      'BDE ou association',
      'Ecole ou campus',
      'E-mail',
      "Type d'evenement",
      'Participants',
      'Message',
      'Page',
      'Id',
    ],
    idColumn: 'Id',
    values: {
      Date: 'ts',
      'Prenom et nom': 'nom',
      'BDE ou association': 'asso',
      'Ecole ou campus': 'ecole',
      'E-mail': 'email',
      "Type d'evenement": 'type',
      Participants: 'taille',
      Message: 'message',
      Page: 'page',
      Id: 'id',
    },
  },
};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const form = FORMS[body.kind];
    if (!form) return reply({ ok: false, error: 'kind inconnu' });

    // L'URL /exec est publique par construction : ce jeton est ce qui distingue
    // le Worker de n'importe qui d'autre. Tant que la propriete n'est pas
    // definie, le controle ne s'applique pas - de quoi deployer sans coupure.
    const expected = PropertiesService.getScriptProperties().getProperty('FORMS_TOKEN');
    if (expected && body.token !== expected) return reply({ ok: false, error: 'jeton invalide' });

    // Le Worker filtre deja le piege a bots et ne transmet jamais ces
    // soumissions. Ce garde-fou ne sert plus qu'aux POST directs sur /exec.
    if (hasHoneypot(body)) return reply({ ok: true, ignored: 'honeypot' });

    // Deux visiteurs qui valident en meme temps liraient le meme numero de
    // ligne avant que l'autre ait ecrit.
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sheet = sheetFor(form);
      const header = ensureHeader(sheet, form.columns);

      // Un timeout cote Cloudflare ne veut pas dire que la ligne n'a pas ete
      // ecrite. On repond ok pour que le Worker marque la soumission comme
      // partie et cesse de la rejouer.
      if (alreadySeen(sheet, header, form, body)) return reply({ ok: true, duplicate: true });

      const row = form.mergeOn ? findRow(sheet, header, form, body) : 0;
      if (row) updateRow(sheet, header, form, body, row);
      else sheet.appendRow(buildRow(header, form, body));
    } finally {
      lock.releaseLock();
    }

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

/** Ouvre l'URL /exec dans un onglet pour verifier que le deploiement repond. */
function doGet() {
  return reply({ ok: true, service: 'yatu-forms' });
}

function hasHoneypot(body) {
  for (let i = 0; i < HONEYPOT_FIELDS.length; i++) {
    if (body[HONEYPOT_FIELDS[i]]) return true;
  }
  return false;
}

/** L'onglet du formulaire, cree avec sa ligne d'en-tetes s'il n'existe pas. */
function sheetFor(form) {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = doc.getSheetByName(form.sheet);
  if (!sheet) {
    sheet = doc.insertSheet(form.sheet);
    sheet.appendRow(form.columns);
    sheet.getRange(1, 1, 1, form.columns.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Les colonnes reellement presentes dans la feuille, dans leur ordre reel, en
 * ajoutant a la fin celles que le formulaire connait et que la feuille n'a pas.
 *
 * C'est cet ordre-la, et pas la constante, qui gouverne les ecritures : une
 * feuille deja remplie ne se reordonne pas toute seule quand on ajoute une
 * colonne au code, et ecrire a l'aveugle decalerait chaque valeur d'une case.
 */
function ensureHeader(sheet, columns) {
  const width = Math.max(sheet.getLastColumn(), 1);
  const header = sheet.getRange(1, 1, 1, width).getValues()[0].map(function (value) {
    return String(value).trim();
  });
  // Une feuille vide renvoie une ligne de chaines vides : sans ce nettoyage, les
  // en-tetes seraient ecrits a partir de la colonne 2.
  while (header.length && header[header.length - 1] === '') header.pop();

  const missing = columns.filter(function (column) {
    return header.indexOf(column) === -1;
  });
  if (missing.length) {
    sheet.getRange(1, header.length + 1, 1, missing.length).setValues([missing]);
    sheet.getRange(1, 1, 1, header.length + missing.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return header.concat(missing);
}

/**
 * Vrai si cet identifiant a deja produit une ligne. Parcours a l'envers : un
 * rejeu porte sur une soumission recente, inutile de relire toute la feuille.
 */
function alreadySeen(sheet, header, form, body) {
  const index = header.indexOf(form.idColumn);
  const wanted = String(body.id || '').trim();
  if (index === -1 || !wanted) return false;

  const last = sheet.getLastRow();
  if (last < 2) return false;

  const values = sheet.getRange(2, index + 1, last - 1, 1).getValues();
  for (let i = values.length - 1; i >= 0; i--) {
    if (String(values[i][0]).trim() === wanted) return true;
  }
  return false;
}

/** La ligne complete a ajouter : '' pour toute colonne que ce formulaire ne remplit pas. */
function buildRow(header, form, body) {
  return header.map(function (column) {
    const key = form.values[column];
    return key ? cell(body[key]) : '';
  });
}

/**
 * Le numero de la ligne dont la colonne `mergeOn` vaut la meme chose que le
 * payload, 0 si personne. On parcourt a l'envers : si la meme adresse s'est
 * inscrite deux fois, le questionnaire complete la plus recente.
 */
function findRow(sheet, header, form, body) {
  const index = header.indexOf(form.mergeOn);
  const wanted = String(body[form.values[form.mergeOn]] || '').trim().toLowerCase();
  if (index === -1 || !wanted) return 0;

  const last = sheet.getLastRow();
  if (last < 2) return 0;

  const values = sheet.getRange(2, index + 1, last - 1, 1).getValues();
  for (let i = values.length - 1; i >= 0; i--) {
    if (String(values[i][0]).trim().toLowerCase() === wanted) return i + 2;
  }
  return 0;
}

/** Ecrit seulement les colonnes que ce formulaire alimente, cellule par cellule. */
function updateRow(sheet, header, form, body, row) {
  header.forEach(function (column, i) {
    const key = form.values[column];
    if (key) sheet.getRange(row, i + 1).setValue(cell(body[key]));
  });
}

/**
 * Une valeur telle qu'elle doit apparaitre dans la feuille. Les questions a
 * choix multiple (le questionnaire de /bienvenue) arrivent en tableau : une
 * seule cellule lisible plutot qu'une valeur que Sheets ne sait pas ecrire.
 */
function cell(value) {
  if (value === undefined || value === null) return '';
  if (Array.isArray(value)) return value.join(', ');
  return value;
}

function reply(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
