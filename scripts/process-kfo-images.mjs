/**
 * Processes the flat KFO-Praxis source JPGs into the project's standard
 * multi-format/multi-size structure: <name>/<name>-<size>.{avif,webp,jpg}.
 *
 * Source: public/Webpage-Images/KFO-Praxis/kfo-<n>-4k.jpg (+ stray originals)
 * Output: public/Webpage-Images/KFO-Praxis/kfo-<n>/kfo-<n>-<size>.{avif,webp,jpg}
 * Run with: node scripts/process-kfo-images.mjs
 */

import sharp from 'sharp';
import { mkdir, rm, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const KFO_DIR = join(ROOT, 'public/Webpage-Images/KFO-Praxis');
const COUNT = 6;

const SIZES = { xs: 480, sm: 640, md: 960, lg: 1280, xl: 1600, '4k': 2400 };

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
  console.log('\n=== Processing KFO-Praxis images (kfo-1 … kfo-6) ===');
  for (let i = 1; i <= COUNT; i++) {
    const name = `kfo-${i}`;
    const src = join(KFO_DIR, `${name}-4k.jpg`);
    await processImage(src, join(KFO_DIR, name), name);
  }

  console.log('\n=== Cleaning up flat source files ===');
  const keep = new Set(Array.from({ length: COUNT }, (_, i) => `kfo-${i + 1}`));
  const entries = await readdir(KFO_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && keep.has(entry.name)) continue;
    const p = join(KFO_DIR, entry.name);
    await rm(p, { recursive: true });
    console.log(`  deleted ${entry.name}`);
  }

  console.log('\nDone.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
