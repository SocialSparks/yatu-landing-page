/**
 * Yatu - collecte des deux formulaires du site vitrine dans une Google Sheet.
 *
 * Installation (5 minutes, une seule fois) :
 *
 *  1. Crée une Google Sheet vide (les onglets sont créés automatiquement).
 *  2. Extensions > Apps Script. Efface le contenu, colle ce fichier, enregistre.
 *  3. Deployer > Nouveau deploiement > type "Application Web" avec :
 *       - Executer en tant que  : Moi
 *       - Qui a acces           : Tout le monde
 *     Autorise le script quand Google le demande (l'ecran "application non
 *     verifiee" est normal : Parametres avances > Acceder a ...).
 *  4. Copie l'URL qui finit par /exec dans .env.local :
 *       NEXT_PUBLIC_FORMS_ENDPOINT=https://script.google.com/macros/s/xxxx/exec
 *     ...et dans les variables d'environnement de l'hebergeur.
 *
 * A chaque modification de ce fichier : Deployer > Gerer les deploiements >
 * crayon > Version "Nouvelle version". Sans ca l'ancienne version continue de
 * repondre et l'URL ne change pas.
 */

/** Destinataire des notifications. Mets "" pour ne recevoir aucun mail. */
const NOTIFY_EMAIL = 'support@yatu-pro.com';

/**
 * Formulaires qui declenchent un mail. Le questionnaire de /bienvenue en est
 * volontairement absent : il se lit dans la feuille, pas dans la boite mail.
 */
const NOTIFY_KINDS = ['waitlist', 'bde-demo'];

const SUBJECTS = {
  waitlist: 'Yatu - nouvelle inscription',
  'bde-demo': 'Yatu - demande de demo BDE',
  profil: 'Yatu - questionnaire',
};

/**
 * Un onglet par formulaire. Chaque colonne est [en-tete, cle envoyee par le
 * site] - l'ordre ici est l'ordre des colonnes dans la feuille. Pour ajouter un
 * champ : ajoute-le au formulaire React, ajoute la ligne ici, redeploie.
 */
const FORMS = {
  waitlist: {
    sheet: 'Waitlist',
    columns: [
      ['Date', 'ts'],
      ['E-mail', 'email'],
      ['Source', 'source'],
      ['Page', 'page'],
    ],
  },
  'bde-demo': {
    sheet: 'Demandes BDE',
    columns: [
      ['Date', 'ts'],
      ['Prenom et nom', 'nom'],
      ['BDE ou association', 'asso'],
      ['Ecole ou campus', 'ecole'],
      ['E-mail', 'email'],
      ["Type d'evenement", 'type'],
      ['Participants', 'taille'],
      ['Message', 'message'],
      ['Page', 'page'],
    ],
  },
  profil: {
    sheet: 'Questionnaire',
    columns: [
      ['Date', 'ts'],
      ['E-mail', 'email'],
      ['Ce qu il organise', 'types'],
      ['Taille du groupe', 'size'],
      ['BDE ou asso', 'bde'],
      ['Source inscription', 'source'],
    ],
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

    // Deux visiteurs qui valident en meme temps ecriraient sur la meme ligne.
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      sheetFor(form).appendRow(form.columns.map(function (col) {
        return cell(body[col[1]]);
      }));
    } finally {
      lock.releaseLock();
    }

    notify(body.kind, form, body);
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
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

/** Utile pour verifier a l'oeil que le deploiement repond. */
function doGet() {
  return reply({ ok: true, service: 'yatu-forms' });
}

/** L'onglet du formulaire, cree avec sa ligne d'en-tetes s'il n'existe pas. */
function sheetFor(form) {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = doc.getSheetByName(form.sheet);
  if (!sheet) {
    sheet = doc.insertSheet(form.sheet);
    sheet.appendRow(form.columns.map(function (col) { return col[0]; }));
    sheet.getRange(1, 1, 1, form.columns.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notify(kind, form, body) {
  if (!NOTIFY_EMAIL) return;
  if (NOTIFY_KINDS.indexOf(kind) === -1) return;

  const lines = form.columns.map(function (col) {
    return col[0] + ' : ' + (cell(body[col[1]]) || '-');
  });
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: SUBJECTS[kind] || 'Yatu - formulaire',
    body: lines.join('\n') + '\n\n' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  });
}

function reply(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
