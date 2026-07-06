/**
 * Renders a clean DAF wordmark PNG (white fill, cyan stroke, transparent bg).
 * Replaces broken AI outline-only exports where letter interiors stay empty.
 *
 * Usage: pnpm brands:generate-daf
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../public/brands/daf.png");

const WIDTH = 960;
const HEIGHT = 320;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <text
    x="480"
    y="228"
    text-anchor="middle"
    font-family="'Arial Black', 'Helvetica Neue', Impact, sans-serif"
    font-size="196"
    font-weight="900"
    letter-spacing="6"
    fill="#F4F7FB"
    stroke="#84bce8"
    stroke-width="5"
    stroke-linejoin="round"
    stroke-linecap="round"
    paint-order="stroke fill"
  >DAF</text>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(WIDTH, HEIGHT)
  .png()
  .toFile(OUT);

console.log(`[ok] Generated ${path.relative(path.join(__dirname, ".."), OUT)}`);
