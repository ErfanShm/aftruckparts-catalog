/**
 * Fills interior transparent holes in outline-style logo PNGs
 * (keeps pixels outside the mark transparent).
 *
 * Usage: tsx scripts/fix-brand-logo-holes.ts [path/to/logo.png]
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const FILL = { r: 244, g: 247, b: 251, a: 255 };

function idx(x: number, y: number, width: number) {
  return y * width + x;
}

async function fillInteriorHoles(filePath: string) {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
  const { data, info } = await sharp(abs).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const alphaAt = (i: number) => data[i * channels + 3]!;

  const isOpaque = (x: number, y: number) => alphaAt(idx(x, y, width)) > 40;

  const outside = new Uint8Array(width * height);
  const queue: [number, number][] = [];

  const trySeed = (x: number, y: number) => {
    const i = idx(x, y, width);
    if (outside[i] || isOpaque(x, y)) return;
    outside[i] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < width; x++) {
    trySeed(x, 0);
    trySeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    trySeed(0, y);
    trySeed(width - 1, y);
  }

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;
    for (const [nx, ny] of [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ] as const) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const i = idx(nx, ny, width);
      if (outside[i] || isOpaque(nx, ny)) continue;
      outside[i] = 1;
      queue.push([nx, ny]);
    }
  }

  let filled = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = idx(x, y, width);
      const pi = i * channels;
      if (alphaAt(i) > 40 || outside[i]) continue;
      data[pi] = FILL.r;
      data[pi + 1] = FILL.g;
      data[pi + 2] = FILL.b;
      data[pi + 3] = FILL.a;
      filled++;
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(abs);
  console.log(`[ok] ${path.relative(ROOT, abs)} — filled ${filled} interior pixels`);
}

const targets = process.argv.slice(2);
const files =
  targets.length > 0 ? targets : ["public/brands/daf.png", "public/brands/volvo.png", "public/brands/af-accessories.png"];

for (const file of files) {
  await fillInteriorHoles(file);
}
