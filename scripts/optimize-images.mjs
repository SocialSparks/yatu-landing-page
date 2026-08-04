/**
 * Generates the WebP and AVIF variants the components serve through <picture>.
 *
 *   node scripts/optimize-images.mjs
 *
 * Run it after adding or replacing a source image, and commit what it writes -
 * the Workers deployment has no image optimizer, so every variant a browser can
 * ask for has to exist as a file.
 *
 * Sources live in assets-src/, deliberately outside public/. The rule is simple
 * and worth keeping: public/ holds only what a browser can request, assets-src/
 * holds what it never asks for. <Picture> emits `-418.avif`-style paths and
 * never the original, so shipping the originals meant 8.6 MiB of Worker bundle
 * that no request could ever reach. The two exceptions stay in public/ because
 * something really does fetch them - waitlist-avatars.jpg is the image-set()
 * fallback in components/waitlist-social-proof.tsx, and app-home.webp is served
 * as-is by components/app-home.tsx.
 *
 * The mockups are the reason this exists: they are not really SVG, they are two
 * full-size PNGs base64'd into an SVG wrapper (830 KiB for the hero alone, and
 * base64 barely gzips). Rasterising the whole wrapper flattens both layers and
 * keeps the transparent frame.
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..");

/**
 * `from` is the source, `to` the public directory the variants land in - they
 * are no longer the same folder. Widths are CSS pixels ×1 and ×2 for the
 * largest box each image is drawn in.
 */
const JOBS = [
  {
    dir: "assets-src/mockups",
    match: /\.svg$/,
    to: "public/mockups",
    widths: [418, 836],
    formats: ["webp", "avif"],
  },
  {
    dir: "assets-src/usecases",
    match: /\.jpg$/,
    to: "public/assets/usecases",
    widths: [480, 1040],
    formats: ["webp", "avif"],
  },
  {
    files: ["assets-src/bde-hero.jpg"],
    to: "public/assets",
    widths: [520, 1040],
    formats: ["webp", "avif"],
  },
  // Drawn 86px wide in the header, shipped as a 3468px PNG.
  {
    files: ["assets-src/yatu-wordmark.png"],
    to: "public/assets",
    widths: [172, 344],
    formats: ["webp"],
  },
  // Served from public/ as its own JPEG fallback - see the note above.
  {
    files: ["public/assets/waitlist-avatars.jpg"],
    to: "public/assets",
    widths: [320, 640],
    formats: ["webp"],
  },
];

const QUALITY = { webp: 82, avif: 55 };

const sources = (job) =>
  job.files ??
  readdirSync(path.join(ROOT, job.dir))
    .filter((name) => job.match.test(name))
    .map((name) => path.join(job.dir, name));

let written = 0;
let saved = 0;

for (const job of JOBS) {
  for (const rel of sources(job)) {
    const abs = path.join(ROOT, rel);
    const source = statSync(abs);
    const { name } = path.parse(rel);

    for (const width of job.widths) {
      for (const format of job.formats) {
        const out = path.join(ROOT, job.to, `${name}-${width}.${format}`);

        // Cheap re-runs: only rebuild what the source is newer than.
        if (existsSync(out) && statSync(out).mtimeMs > source.mtimeMs) continue;

        // density only matters for the SVG wrappers; it is ignored otherwise.
        const image = sharp(abs, { density: 144 }).resize({
          width,
          withoutEnlargement: true,
          fit: "inside",
        });

        const info = await (format === "avif"
          ? image.avif({ quality: QUALITY.avif })
          : image.webp({ quality: QUALITY.webp })
        ).toFile(out);

        written += 1;
        saved += source.size - info.size;
        console.log(
          `${path.relative(ROOT, out).padEnd(52)} ${String(Math.round(info.size / 1024)).padStart(5)} Ko`,
        );
      }
    }
  }
}

console.log(`\n${written} variantes écrites.`);
