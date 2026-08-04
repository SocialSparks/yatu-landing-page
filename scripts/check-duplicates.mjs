/**
 * Reports what a guide and its "application pour X" page still say identically.
 *
 *   npm run build && node scripts/check-duplicates.mjs
 *
 * The two pages of a pair answer neighbouring queries. When they share
 * paragraphs, Google has to choose between them and picks badly - so the number
 * that matters here is zero shared body sentences. It reads the prerendered
 * HTML rather than the source, because that is what a crawler actually sees.
 *
 * The header, the footer, the waiting-list form and the sibling cards are the
 * same markup on every page by design. Only <main> is compared, it is cut
 * before the "à lire ensuite" rail - those cards are navigation, and two pages
 * pointing at the same guide is the point of them - and the remaining shared
 * chrome is skipped by the SHARED list below.
 *
 * Exits 1 if a pair shares a sentence, or if two pages carry the same module
 * <h2> - the strongest "these are one page" signal a pair can send.
 */
import {existsSync, readdirSync, readFileSync} from "node:fs";
import path from "node:path";

const DIR = path.join(import.meta.dirname, "..", ".next", "server", "app");

if (!existsSync(DIR)) {
  console.error("Pas de build à lire. Lance `npm run build` d’abord.");
  process.exit(1);
}

/** The pairs that compete with each other, guide first. */
const PAIRS = [
  ["organiser-un-week-end-entre-amis", "application-organiser-week-end-entre-amis"],
  ["organiser-un-voyage-entre-amis", "application-organiser-voyage-groupe"],
  ["partager-les-depenses-entre-amis", "application-partage-depenses-entre-amis"],
];

/** Chrome rendered inside <main> on every landing page - not a duplication. */
const SHARED = [
  "Rejoindre la liste",
  "Garde ta place",
  "Laisse ton adresse",
  "Voir tous les guides",
];

const main = (slug) => {
  const html = readFileSync(path.join(DIR, `${slug}.html`), "utf8");
  const body = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";
  // Everything from the sibling rail down is navigation, not copy.
  const [copy] = body.split(/À lire (?:ensuite|aussi)/);
  return copy
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

/** Long enough that sharing one is a real duplication, not a stock phrase. */
const sentences = (text) =>
  text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.split(" ").length >= 8)
    .filter((s) => !SHARED.some((chrome) => s.includes(chrome)));

let failed = false;

console.log("Phrases partagées entre un guide et sa page « application »\n");

for (const [guide, app] of PAIRS) {
  const inApp = new Set(sentences(main(app)));
  const shared = [...new Set(sentences(main(guide)))].filter((s) => inApp.has(s));
  const words = (slug) => main(slug).split(" ").length;

  console.log(`  ${guide}`);
  console.log(`  ${app}`);
  console.log(`    ${words(guide)} / ${words(app)} mots - ${shared.length} phrase(s) en commun`);
  shared.forEach((s) => console.log(`    ! ${s}`));
  console.log();

  if (shared.length) failed = true;
}

console.log("Titre <h2> du bloc modules, page par page\n");

const titles = new Map();
for (const file of readdirSync(DIR).filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(path.join(DIR, file), "utf8");
  for (const match of html.matchAll(/Avec Yatu<\/span><h2[^>]*>(.*?)<\/h2>/g)) {
    const title = match[1].replace(/<[^>]+>/g, "").replace(/&#x27;|&#39;/g, "’");
    titles.set(title, [...(titles.get(title) ?? []), file.replace(".html", "")]);
  }
}

for (const [title, slugs] of titles) {
  if (slugs.length > 1) {
    failed = true;
    console.log(`  ! partagé par ${slugs.length} pages : « ${title} »`);
    slugs.forEach((s) => console.log(`      ${s}`));
  } else {
    console.log(`  ok  ${title}`);
  }
}

console.log(failed ? "\nÉchec : de la copie est partagée." : "\nRien de partagé. ✓");
process.exit(failed ? 1 : 0);
