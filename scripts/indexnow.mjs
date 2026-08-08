/**
 * Prévient Bing (et les autres moteurs IndexNow) des URLs qui ont changé.
 *
 *   npm run indexnow             # après un déploiement
 *   npm run indexnow -- --dry-run   # ce qui partirait, sans rien envoyer
 *
 * Branché à la fin de `npm run deploy`, donc rien à lancer à la main dans le
 * cas courant. L'état écrit ensuite dans scripts/indexnow-state.json est
 * versionné : c'est lui qui distingue « déjà signalé » de « à signaler », il
 * faut donc le commiter après un déploiement.
 *
 * Tourne après le déploiement, jamais avant : notifier une URL que le moteur
 * ne peut pas encore charger la brûle pour rien, il repart avec l'ancienne
 * version en cache et n'a plus de raison de revenir.
 *
 * Ce qui est soumis vient de la comparaison entre le <lastmod> du sitemap
 * généré et INDEXNOW_STATE, l'état de la dernière soumission réussie. Une page
 * dont la date n'a pas bougé n'est pas renvoyée : redire à Bing que douze URLs
 * ont changé à chaque déploiement est exactement le gaspillage de crawl que
 * ses guidelines (§21) demandent d'éviter, et la première façon de lui
 * apprendre à ignorer nos signaux de fraîcheur.
 *
 * Les URLs sont envoyées une par une plutôt qu'en lot : les guidelines Bing
 * (§4) préfèrent explicitement les soumissions « streaming », et sur une
 * douzaine de pages le lot n'économise rien.
 *
 * La clé est publique par construction - elle est servie en clair sur le
 * domaine, c'est ce qui prouve à Bing qu'on en est propriétaire. Rien à
 * cacher ici.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const KEY = "69a6a383b11dea5a3bdd3e5eb67459d1";
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** `--dry-run` : liste ce qui partirait, sans rien envoyer ni écrire l'état. */
const DRY_RUN = process.argv.includes("--dry-run");

const ROOT = path.join(import.meta.dirname, "..");
const SITEMAP = path.join(ROOT, ".next", "server", "app", "sitemap.xml.body");
const KEY_FILE = path.join(ROOT, "public", `${KEY}.txt`);
const INDEXNOW_STATE = path.join(ROOT, "scripts", "indexnow-state.json");

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

if (!existsSync(SITEMAP)) {
  fail("Pas de build à lire. Lance `npm run build` d’abord.");
}

// Le fichier de clé est ce que Bing va chercher pour valider la soumission.
// S'il manque ou ne correspond pas, l'API répond 403 sans rien indexer -
// autant s'en apercevoir ici plutôt que dans un code HTTP.
if (!existsSync(KEY_FILE)) {
  fail(`Clé absente : public/${KEY}.txt doit exister et contenir la clé.`);
}

if (readFileSync(KEY_FILE, "utf8").trim() !== KEY) {
  fail(`public/${KEY}.txt ne contient pas la clé attendue.`);
}

// Lecture bloc par bloc plutôt qu'en une seule expression : un <url> peut
// porter des <image:image> entre son <loc> et son <lastmod>, et une regex qui
// enjambe ça finit par apparier le <loc> d'une entrée avec le <lastmod> de la
// suivante. Le découpage rend l'appariement impossible à décaler.
const sitemap = readFileSync(SITEMAP, "utf8");
const current = new Map();

for (const [, block] of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const url = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];

  // Sans <lastmod>, aucune façon de savoir si la page a changé : on ne peut
  // que la resoumettre à chaque déploiement, donc on s'abstient.
  if (url && lastmod) current.set(url, lastmod);
}

if (current.size === 0) {
  fail("Le sitemap généré ne contient aucune URL datée.");
}

const previous = existsSync(INDEXNOW_STATE)
  ? new Map(Object.entries(JSON.parse(readFileSync(INDEXNOW_STATE, "utf8"))))
  : new Map();

// Une URL sortie du sitemap est signalée une dernière fois : c'est ce qui
// pousse Bing à repasser, tomber sur le 404 et la retirer de l'index (§9).
// Elle disparaît de l'état dans la foulée, donc une seule fois.
const removed = [...previous.keys()].filter((url) => !current.has(url));
const changed = [...current].filter(([url, lastmod]) => previous.get(url) !== lastmod);
const submissions = [...changed.map(([url]) => url), ...removed];

if (submissions.length === 0) {
  console.log("IndexNow : aucune URL modifiée depuis la dernière soumission. ✓");
  process.exit(0);
}

console.log(
  `IndexNow : ${submissions.length} URL(s) à signaler${DRY_RUN ? " (dry-run, rien n’est envoyé)" : ""}\n`,
);

if (DRY_RUN) {
  for (const url of submissions) {
    console.log(`  · ${url}${removed.includes(url) ? " (retirée)" : ""}`);
  }
  process.exit(0);
}

// Ce que renvoie l'API. Un 202 veut dire « reçu, clé en cours de
// vérification » : c'est un succès, pas une erreur à réessayer.
const OUTCOMES = {
  200: ["ok", "reçue"],
  202: ["ok", "reçue, clé en cours de validation"],
  400: ["ko", "format de soumission invalide"],
  403: ["ko", `clé refusée - vérifie que https://.../${KEY}.txt est bien servi`],
  422: ["ko", "URL hors du domaine de la clé"],
  429: ["ko", "trop de soumissions, réessaie plus tard"],
};

const submitted = new Map(previous);
let failed = false;

for (const url of submissions) {
  const target = `${ENDPOINT}?url=${encodeURIComponent(url)}&key=${KEY}`;
  const label = removed.includes(url) ? `${url} (retirée)` : url;

  let status;
  try {
    ({ status } = await fetch(target, { headers: { "User-Agent": "yatu-landing-page/indexnow" } }));
  } catch (error) {
    console.log(`  ! ${label} — injoignable : ${error.message}`);
    failed = true;
    continue;
  }

  const [outcome, detail] = OUTCOMES[status] ?? ["ko", "réponse inattendue"];

  if (outcome === "ko") {
    console.log(`  ! ${label} — ${status} ${detail}`);
    failed = true;
    continue;
  }

  console.log(`  ok  ${label} — ${status} ${detail}`);

  // L'état ne retient que les soumissions acceptées : une URL en échec sera
  // retentée au prochain déploiement plutôt que considérée comme signalée.
  if (removed.includes(url)) submitted.delete(url);
  else submitted.set(url, current.get(url));
}

writeFileSync(
  INDEXNOW_STATE,
  `${JSON.stringify(Object.fromEntries([...submitted].sort()), null, 2)}\n`,
);

console.log(
  failed
    ? "\nAu moins une soumission a échoué ; elle repartira au prochain déploiement."
    : "\nToutes les URLs modifiées ont été signalées. ✓",
);

// Sortie 0 même en cas d'échec partiel : le site est déjà déployé à ce stade,
// et une notification ratée se rattrape toute seule au déploiement suivant.
// Faire échouer `npm run deploy` ici laisserait croire que la mise en ligne
// n'a pas eu lieu.
process.exit(0);
