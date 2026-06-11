/**
 * Bakes a permanent "UP SOCIAL" watermark into every served gallery image so a
 * downloaded file can never be stripped of it. Mirrors the on-screen mark:
 * centered, uppercase, white at ~30% opacity.
 *
 * Processes (in place) all sizes/formats under:
 *   public/Webpage-Images/{Natur,People,ZGK,EVENTS,KFO-Praxis}
 *
 * Resumable: every finished file is recorded in .context/watermark-done.txt and
 * skipped on a re-run, so an interrupted run never double-stamps an image.
 *
 * Run with: node scripts/bake-watermarks.mjs
 */

import sharp from 'sharp';
import { readFile, writeFile, appendFile, mkdir } from 'fs/promises';
import { readFileSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASE = join(ROOT, 'public/Webpage-Images');
const GALLERIES = ['Natur', 'People', 'ZGK', 'EVENTS', 'KFO-Praxis'];
const MANIFEST = join(ROOT, '.context/watermark-done.txt');
const CONCURRENCY = 5;

const done = new Set();
try {
  for (const line of readFileSync(MANIFEST, 'utf8').split('\n')) {
    if (line.trim()) done.add(line.trim());
  }
} catch {
  // first run
}

/** Centered "UP SOCIAL" mark sized relative to the image width. */
function watermarkSvg(w, h) {
  const fontSize = Math.max(14, Math.round(w * 0.075));
  const letterSpacing = (fontSize * 0.25).toFixed(1);
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">` +
      `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" ` +
      `font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="600" ` +
      `font-size="${fontSize}" letter-spacing="${letterSpacing}" ` +
      `fill="#ffffff" fill-opacity="0.30">UP SOCIAL</text></svg>`
  );
}

function encode(ext, pipeline) {
  if (ext === '.avif') return pipeline.avif({ quality: 72 }).toBuffer();
  if (ext === '.webp') return pipeline.webp({ quality: 80 }).toBuffer();
  return pipeline.jpeg({ quality: 85, mozjpeg: true }).toBuffer();
}

async function processFile(path) {
  const ext = extname(path).toLowerCase();
  const input = await readFile(path);
  const { width, height } = await sharp(input).metadata();
  const svg = watermarkSvg(width, height);
  const out = await encode(ext, sharp(input).composite([{ input: svg, top: 0, left: 0 }]));
  await writeFile(path, out);
  await appendFile(MANIFEST, path + '\n');
}

async function collectFiles(dir) {
  const { readdir } = await import('fs/promises');
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await collectFiles(p)));
    else if (/\.(avif|webp|jpe?g)$/i.test(e.name)) files.push(p);
  }
  return files;
}

async function main() {
  await mkdir(dirname(MANIFEST), { recursive: true });

  const all = [];
  for (const g of GALLERIES) all.push(...(await collectFiles(join(BASE, g))));
  const todo = all.filter((p) => !done.has(p));
  console.log(
    `\n${all.length} gallery images, ${done.size} already done, ${todo.length} to watermark.\n`
  );

  let completed = 0;
  let next = 0;
  async function worker() {
    while (next < todo.length) {
      const i = next++;
      await processFile(todo[i]);
      completed++;
      if (completed % 50 === 0 || completed === todo.length) {
        process.stdout.write(`  ${completed}/${todo.length}\n`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log('\nDone.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
