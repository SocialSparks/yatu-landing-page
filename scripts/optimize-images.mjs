/**
 * Generates the WebP and AVIF variants the components serve through <picture>.
 *
 *   node scripts/optimize-images.mjs
 *
 * Run it after adding or replacing a source image, and commit what it writes -
 * the Workers deployment has no image optimizer, so every variant a browser can
 * ask for has to exist as a file. Sources stay in the repo untouched and remain
 * the <img> fallback for anything that understands neither format.
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

/** Widths are CSS pixels ×1 and ×2 for the largest box each image is drawn in. */
const JOBS = [
  { dir: "public/mockups", match: /\.svg$/, widths: [418, 836], formats: ["webp", "avif"] },
  { dir: "public/assets/usecases", match: /\.jpg$/, widths: [480, 1040], formats: ["webp", "avif"] },
  { files: ["public/assets/bde-hero.jpg"], widths: [520, 1040], formats: ["webp", "avif"] },
  { files: ["public/assets/hero-app.webp"], widths: [335, 670], formats: ["webp"] },
  { files: ["public/assets/app-home.webp"], widths: [550, 1100], formats: ["webp"] },
  { files: ["public/assets/waitlist-avatars.jpg"], widths: [320, 640], formats: ["webp"] },
  // Drawn 86px wide in the header, shipped as a 3468px PNG.
  { files: ["public/assets/yatu-wordmark.png"], widths: [172, 344], formats: ["webp"] },
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
    const { dir, name } = path.parse(rel);

    for (const width of job.widths) {
      for (const format of job.formats) {
        const out = path.join(ROOT, dir, `${name}-${width}.${format}`);

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
