/**
 * Yatu - collecte des formulaires du site vitrine dans une Google Sheet.
 *
 * Installation (une seule fois) :
 *
 *  1. Crée une Google Sheet vide (les onglets sont créés automatiquement).
 *  2. Extensions > Apps Script. Efface le contenu, colle ce fichier, enregistre.
 *  3. Deployer > Nouveau deploiement > type "Application Web" avec :
 *       - Executer en tant que  : Moi
 *       - Qui a acces           : Tout le monde
 *     ...et surtout PAS "Tout le monde disposant d'un compte Google" : le site
 *     poste sans etre connecte, Google renverrait une page d'erreur Drive.
 *     Autorise le script quand il le demande (l'ecran "application non
 *     verifiee" est normal : Parametres avances > Acceder a ...).
 *  4. Copie l'URL qui finit par /exec dans .env.local :
 *       NEXT_PUBLIC_FORMS_ENDPOINT=https://script.google.com/macros/s/xxxx/exec
 *     ...et dans les variables d'environnement de l'hebergeur.
 *
 * A chaque modification de ce fichier : Deployer > Gerer les deploiements >
 * crayon > Version "Nouvelle version". Sans ca l'ancienne version continue de
 * repondre et l'URL ne change pas.
 *
 * Pour verifier que le deploiement repond, ouvre l'URL /exec dans un onglet :
 * tu dois lire {"ok":true,"service":"yatu-forms"}.
 */

/**
 * L'onglet Waitlist tient une ligne par personne. L'inscription ecrit les
 * quatre premieres colonnes ; le questionnaire facultatif de /bienvenue
 * complete les quatre suivantes sur cette meme ligne, retrouvee par e-mail.
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
];

/**
 * Un formulaire : son onglet, les colonnes de cet onglet, et quelle cle du
 * payload alimente quelle colonne. Une colonne absente de `values` n'est pas
 * touchee par ce formulaire.
 *
 * Pour ajouter un champ : ajoute-le au formulaire React, ajoute la colonne et
 * son entree `values` ici, puis redeploie une NOUVELLE VERSION.
 */
const FORMS = {
  waitlist: {
    sheet: 'Waitlist',
    columns: WAITLIST_COLUMNS,
    values: {
      Date: 'ts',
      'E-mail': 'email',
      Source: 'source',
      Page: 'page',
    },
  },
  profil: {
    sheet: 'Waitlist',
    columns: WAITLIST_COLUMNS,
    values: {
      'E-mail': 'email',
      'Date questionnaire': 'ts',
      'Ce qu il organise': 'types',
      'Taille du groupe': 'size',
      'BDE ou asso': 'bde',
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
    ],
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
    },
  },
};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const form = FORMS[body.kind];
    if (!form) return reply({ ok: false, error: 'kind inconnu' });

    // Honeypot : un humain ne remplit jamais ce champ. On repond ok pour ne pas
    // apprendre au bot que le piege existe, mais rien n'est ecrit.
    if (body.website) return reply({ ok: true });

    // Deux visiteurs qui valident en meme temps liraient le meme numero de
    // ligne avant que l'autre ait ecrit.
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const sheet = sheetFor(form);
      const row = form.mergeOn ? findRow(sheet, form, body) : 0;
      if (row) updateRow(sheet, form, body, row);
      else sheet.appendRow(buildRow(form, body));
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

/** La ligne complete a ajouter : '' pour toute colonne que ce formulaire ne remplit pas. */
function buildRow(form, body) {
  return form.columns.map(function (column) {
    const key = form.values[column];
    return key ? cell(body[key]) : '';
  });
}

/**
 * Le numero de la ligne dont la colonne `mergeOn` vaut la meme chose que le
 * payload, 0 si personne. On parcourt a l'envers : si la meme adresse s'est
 * inscrite deux fois, le questionnaire complete la plus recente.
 */
function findRow(sheet, form, body) {
  const index = form.columns.indexOf(form.mergeOn);
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
function updateRow(sheet, form, body, row) {
  form.columns.forEach(function (column, i) {
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
