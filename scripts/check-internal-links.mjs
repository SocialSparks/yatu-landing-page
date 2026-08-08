/**
 * Ensures every indexable URL has at least one real incoming HTML link.
 *
 * The sitemap is deliberately not counted: this script reads <a href> values
 * from the prerendered pages, which is the navigation a crawler and a reader
 * can actually follow.
 *
 * Run after `next build`, once `.next/server/app/sitemap.xml.body` and the
 * prerendered HTML files exist.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const APP_DIR = path.join(import.meta.dirname, "..", ".next", "server", "app");
const SITEMAP = path.join(APP_DIR, "sitemap.xml.body");

if (!existsSync(SITEMAP)) {
  console.error("Pas de build à lire. Lance `npm run build` d’abord.");
  process.exit(1);
}

const sitemap = readFileSync(SITEMAP, "utf8");
const urls = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((match) =>
  new URL(match[1]),
);
const origin = urls[0]?.origin;

if (!origin || urls.length === 0) {
  console.error("Le sitemap généré ne contient aucune URL indexable.");
  process.exit(1);
}

const normalizePath = (pathname) =>
  pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

const htmlFile = (pathname) => {
  if (pathname === "/") return path.join(APP_DIR, "index.html");

  const relative = pathname.replace(/^\//, "");
  const flat = path.join(APP_DIR, `${relative}.html`);
  if (existsSync(flat)) return flat;

  return path.join(APP_DIR, relative, "index.html");
};

const paths = urls.map((url) => normalizePath(url.pathname));
const indexable = new Set(paths);
const incoming = new Map(paths.map((pathname) => [pathname, new Set()]));
let failed = false;

for (const source of paths) {
  const file = htmlFile(source);
  if (!existsSync(file)) {
    console.error(`  ! aucun HTML généré pour ${source}`);
    failed = true;
    continue;
  }

  const html = readFileSync(file, "utf8");
  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((match) =>
    match[1].replace(/&amp;/g, "&"),
  );

  for (const href of hrefs) {
    let target;
    try {
      target = new URL(href, `${origin}${source}`);
    } catch {
      continue;
    }

    const targetPath = normalizePath(target.pathname);
    if (target.origin !== origin || !indexable.has(targetPath) || targetPath === source) continue;
    incoming.get(targetPath).add(source);
  }
}

console.log("Liens HTML entrants vers les pages indexables\n");

for (const pathname of paths) {
  const sources = [...incoming.get(pathname)].sort();
  if (sources.length === 0) {
    console.log(`  ! ${pathname} — aucun lien entrant`);
    failed = true;
    continue;
  }

  const examples = sources.slice(0, 3).join(", ");
  const remaining = sources.length > 3 ? `, +${sources.length - 3}` : "";
  console.log(`  ok  ${pathname} — ${sources.length} page(s) : ${examples}${remaining}`);
}

console.log(failed ? "\nÉchec : au moins une page est orpheline." : "\nAucune page orpheline. ✓");
process.exit(failed ? 1 : 0);
