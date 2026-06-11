/**
 * Processes the "Power of Lightroom" before/after pair into the project's
 * standard multi-format/multi-size structure used by the gallery helpers:
 *   <name>/<name>-<size>.{avif,webp,jpg}
 *
 * Source: public/POWER-OF-LR/IMG_9966.jpeg (straight-out-of-camera, "before")
 *         public/POWER-OF-LR/IMG_9966.jpg  (Lightroom edit, "after")
 * Output: public/Webpage-Images/Power-of-LR/lr-before/lr-before-<size>.{…}
 *         public/Webpage-Images/Power-of-LR/lr-after/lr-after-<size>.{…}
 *
 * These intentionally live outside the watermarked galleries — the showcase
 * compares Julian's editing, so no "UP SOCIAL" mark is baked in.
 *
 * Run with: node scripts/process-lr-images.mjs
 */

import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SRC_DIR = join(ROOT, 'public/POWER-OF-LR');
const OUT_DIR = join(ROOT, 'public/Webpage-Images/Power-of-LR');

const SIZES = { xs: 480, sm: 640, md: 960, lg: 1280, xl: 1600, '4k': 2400 };

const PAIR = [
  { src: 'IMG_9966.jpeg', name: 'lr-before' },
  { src: 'IMG_9966.jpg', name: 'lr-after' },
];

async function processImage(srcPath, outDir, outName) {
  await mkdir(outDir, { recursive: true });

  for (const [sizeName, width] of Object.entries(SIZES)) {
    const pipe = sharp(srcPath).resize({ width, withoutEnlargement: false });
    await pipe
      .clone()
      .avif({ quality: 72 })
      .toFile(join(outDir, `${outName}-${sizeName}.avif`));
    await pipe
      .clone()
      .webp({ quality: 80 })
      .toFile(join(outDir, `${outName}-${sizeName}.webp`));
    await pipe
      .clone()
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(join(outDir, `${outName}-${sizeName}.jpg`));
    process.stdout.write('.');
  }
  console.log(` ✓ ${outName}`);
}

async function main() {
  console.log('\n=== Processing Power-of-LR before/after pair ===');
  for (const { src, name } of PAIR) {
    await processImage(join(SRC_DIR, src), join(OUT_DIR, name), name);
  }
  console.log('\nDone.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
