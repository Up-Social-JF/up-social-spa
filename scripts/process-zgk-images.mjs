/**
 * Processes ZGK-Update source images into the project's multi-format/multi-size
 * structure: <name>/<name>-<size>.{avif,webp,jpg} in xs/sm/md/lg/xl/4k.
 *
 * Output: public/Webpage-Images/ZGK/
 * Run with: node scripts/process-zgk-images.mjs
 */

import sharp from 'sharp';
import { mkdir, rm, access } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const ZGK_UPDATE = join(ROOT, 'public/Webpage-Images/ZGK-Update');
const ZGK_OUT = join(ROOT, 'public/Webpage-Images/ZGK');

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
    await pipe.clone().avif({ quality: 72 }).toFile(join(outDir, `${outName}-${sizeName}.avif`));
    await pipe.clone().webp({ quality: 80 }).toFile(join(outDir, `${outName}-${sizeName}.webp`));
    await pipe.clone().jpeg({ quality: 85, mozjpeg: true }).toFile(join(outDir, `${outName}-${sizeName}.jpg`));
    process.stdout.write('.');
  }
  console.log(` ✓ ${outName}`);
}

async function main() {
  console.log('\n=== Processing Ambiente images (amb-1 … amb-12) ===');
  const AMB = join(ZGK_UPDATE, 'Ambiente');
  const ambienteOrder = [
    'IMG_8793-2', 'IMG_8804', 'IMG_8817', 'IMG_8819',
    'IMG_8826', 'IMG_8852', 'IMG_8861', 'IMG_9071',
    'IMG_9083',  // → amb-9 = cover
    'IMG_9086', 'IMG_9090', 'IMG_9091',
  ];

  for (let i = 0; i < ambienteOrder.length; i++) {
    const name = `amb-${i + 1}`;
    const src = await findSource(AMB, ambienteOrder[i]);
    await processImage(src, join(ZGK_OUT, name), name);
  }

  console.log('\n=== Processing Jan Bull carousel (janbull-1 … janbull-4) ===');
  const JB = join(ZGK_UPDATE, 'JANBULL');
  const janbullSrc = ['JanBull-1', 'JanBull-2', 'JanBull-3', 'JanBull-4'];
  for (let i = 0; i < janbullSrc.length; i++) {
    const name = `janbull-${i + 1}`;
    const src = await findSource(JB, janbullSrc[i]);
    await processImage(src, join(ZGK_OUT, name), name);
  }

  console.log('\n=== Processing Hereford carousel (hereford-1 … hereford-4) ===');
  const HF = join(ZGK_UPDATE, 'HEREFORD');
  const herefordSrc = [
    '2876E778-CE9E-4D7A-82D1-D9D11B352288_1_102_o',
    'AA0C8F72-1130-4407-A198-4637AE973CB9_1_102_o',
    'E64E2F9C-2490-41E2-94DA-4CD4278F8F30_1_102_o',
    'FFC6E4EE-D7A6-4FC2-AF9C-4BFAA430A56E_1_102_o',
  ];
  for (let i = 0; i < herefordSrc.length; i++) {
    const name = `hereford-${i + 1}`;
    const src = await findSource(HF, herefordSrc[i]);
    await processImage(src, join(ZGK_OUT, name), name);
  }

  console.log('\n=== Cleaning up old ZGK subfolders ===');
  const { readdirSync, statSync } = await import('fs');
  const entries = readdirSync(ZGK_OUT);
  const newNames = new Set([
    ...ambienteOrder.map((_, i) => `amb-${i + 1}`),
    ...janbullSrc.map((_, i) => `janbull-${i + 1}`),
    ...herefordSrc.map((_, i) => `hereford-${i + 1}`),
  ]);
  for (const entry of entries) {
    if (!newNames.has(entry)) {
      const p = join(ZGK_OUT, entry);
      if (statSync(p).isDirectory()) {
        await rm(p, { recursive: true });
        console.log(`  deleted ${entry}`);
      }
    }
  }

  console.log('\n=== Removing ZGK-Update folder ===');
  await rm(ZGK_UPDATE, { recursive: true });
  console.log('  deleted ZGK-Update/');

  console.log('\nDone.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
