/**
 * Processes the Gastro-Event source images (event-1 … event-33) into the
 * project's multi-format/multi-size structure:
 *   <name>/<name>-<size>.{avif,webp,jpg} in xs/sm/md/lg/xl/4k.
 *
 * Source: public/images/EVENT- PEOPLE/
 * Output: public/Webpage-Images/EVENTS-GASTRO/  (gastro-1 … gastro-33)
 *
 * The chosen cover (gastro-13) also gets a clean, un-watermarked copy under
 * public/Webpage-Images/Landing/ so the home teaser can stay watermark-free,
 * mirroring the other galleries. Run watermark baking afterwards:
 *   node scripts/process-gastro-images.mjs && node scripts/bake-watermarks.mjs
 *
 * Run with: node scripts/process-gastro-images.mjs
 */

import sharp from 'sharp';
import { mkdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const SRC = join(ROOT, 'public/images/EVENT- PEOPLE ');
const OUT = join(ROOT, 'public/Webpage-Images/EVENTS-GASTRO');
const LANDING = join(ROOT, 'public/Webpage-Images/Landing');

const SOURCE_COUNT = 33;

// event-22 duplicates event-21 → skipped. Remaining sources are renumbered
// continuously so the on-site display order matches the file numbering.
const SKIP = new Set([22]);
const sourceIndices = Array.from({ length: SOURCE_COUNT }, (_, k) => k + 1).filter(
  (i) => !SKIP.has(i)
);

// Source indices that are ALSO used in the People gallery. They get an "XX"
// suffix (gastro-1XX, …) so a multi-category image is recognizable in the tree.
const MULTI = new Set([1, 2, 4]);

// Source indices whose clean (un-watermarked) copy is mirrored into Landing/
// for the home teaser: gastro-13 = Gastro cover, gastro-1 = People cover.
const LANDING_COVERS = new Set([1, 13]);

const SIZES = { xs: 480, sm: 640, md: 960, lg: 1280, xl: 1600, '4k': 2400 };

/** Find the largest available source file, trying size suffixes largest-first. */
async function findSource(dir, base, exts = ['jpg', 'jpeg', 'png', 'webp']) {
  const order = ['4k', 'xl', 'lg', 'md', 'sm', 'xs'];
  for (const s of order) {
    for (const ext of exts) {
      const f = join(dir, `${base}-${s}.${ext}`);
      try {
        await access(f);
        return f;
      } catch {
        // try next
      }
    }
  }
  throw new Error(`No source found for ${base} in ${dir}`);
}

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
  console.log(`\n=== Processing Gastro images (gastro-1 … gastro-${sourceIndices.length}) ===`);
  for (let pos = 0; pos < sourceIndices.length; pos++) {
    const source = sourceIndices[pos];
    const outNum = pos + 1; // continuous 1 … 32
    const name = `gastro-${outNum}${MULTI.has(source) ? 'XX' : ''}`;
    const src = await findSource(SRC, `event-${source}`);
    await processImage(src, join(OUT, name), name);

    if (LANDING_COVERS.has(source)) {
      console.log(`   ↳ clean landing copy: Landing/${name}`);
      await processImage(src, join(LANDING, name), name);
    }
  }

  console.log('\nDone. Now run: node scripts/bake-watermarks.mjs\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
