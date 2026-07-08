/**
 * Scans public/catalog/products/{slug}/ sources and writes WebP/AVIF variants
 * plus src/data/catalog-image-manifest.ts for the app.
 *
 * Usage:
 *   pnpm images:optimize          # regenerate changed sources only
 *   pnpm images:optimize -- --force   # regenerate everything
 *   pnpm images:check             # CI: verify manifest + optimized files on disk
 */
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import sharp from "sharp";

import {
  CATALOG_PAGES,
  PRODUCT_FOLDER_SLUGS,
  type ProductCategory,
} from "../src/data/catalog-products.ts";
import type {
  CatalogImageManifest,
  ImageManifestEntry,
  ProductImageManifest,
} from "../src/data/catalog-image-types.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PRODUCTS_ROOT = path.join(ROOT, "public/catalog/products");
const MANIFEST_OUT = path.join(ROOT, "src/data/catalog-image-manifest.ts");
const CACHE_FILE = ".optimize-cache.json";

const WEBP_WIDTHS = [480, 800, 1200] as const;
const AVIF_WIDTHS = [800, 1200] as const;
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 65;
const SOURCE_EXTS = [".png", ".jpeg", ".jpg", ".webp"] as const;

/** Bump when widths, formats, or quality settings change. */
const CONFIG_VERSION = 1;

type Role = "hero" | "mounted";

type RoleCacheEntry = {
  configVersion: number;
  sourceHash: string;
  entry: ImageManifestEntry;
};

type ProductCache = Partial<Record<Role, RoleCacheEntry>>;

const args = new Set(process.argv.slice(2));
const CHECK_MODE = args.has("--check");
const FORCE = args.has("--force");

function rolesForCategory(_category: ProductCategory): Role[] {
  return ["hero", "mounted"];
}

async function findSource(folder: string, role: Role): Promise<string | null> {
  for (const ext of SOURCE_EXTS) {
    const file = path.join(folder, `${role}${ext}`);
    try {
      await fs.access(file);
      return file;
    } catch {
      /* try next ext */
    }
  }
  return null;
}

async function hashFile(filePath: string): Promise<string> {
  const data = await fs.readFile(filePath);
  return crypto.createHash("sha256").update(data).digest("hex");
}

function expectedOutputNames(role: Role, origWidth: number): string[] {
  const names = new Set<string>();
  for (const w of WEBP_WIDTHS) {
    names.add(`${role}-${Math.min(w, origWidth)}.webp`);
  }
  for (const w of AVIF_WIDTHS) {
    names.add(`${role}-${Math.min(w, origWidth)}.avif`);
  }
  return [...names];
}

async function outputsExist(outDir: string, names: string[]): Promise<boolean> {
  for (const name of names) {
    try {
      await fs.access(path.join(outDir, name));
    } catch {
      return false;
    }
  }
  return true;
}

async function readProductCache(outDir: string): Promise<ProductCache> {
  try {
    const raw = await fs.readFile(path.join(outDir, CACHE_FILE), "utf8");
    return JSON.parse(raw) as ProductCache;
  } catch {
    return {};
  }
}

async function writeProductCache(outDir: string, cache: ProductCache): Promise<void> {
  await fs.writeFile(path.join(outDir, CACHE_FILE), `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

async function removeStaleOutputs(outDir: string, keepNames: Set<string>): Promise<void> {
  let entries: string[];
  try {
    entries = await fs.readdir(outDir);
  } catch {
    return;
  }

  for (const name of entries) {
    if (name === CACHE_FILE || keepNames.has(name)) continue;
    await fs.rm(path.join(outDir, name), { force: true });
  }
}

async function optimizeRole(
  slug: string,
  role: Role,
  sourcePath: string,
): Promise<ImageManifestEntry> {
  const outDir = path.join(PRODUCTS_ROOT, slug, "optimized");
  await fs.mkdir(outDir, { recursive: true });

  const meta = await sharp(sourcePath).metadata();
  const origWidth = meta.width ?? 1200;
  const origHeight = meta.height ?? 1500;

  const webpParts: string[] = [];
  const avifParts: string[] = [];
  let primaryWidth = Math.min(1200, origWidth);

  for (const w of WEBP_WIDTHS) {
    const width = Math.min(w, origWidth);
    const outName = `${role}-${width}.webp`;
    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(outDir, outName));
    webpParts.push(`/catalog/products/${slug}/optimized/${outName} ${width}w`);
    if (width === Math.min(1200, origWidth)) primaryWidth = width;
  }

  for (const w of AVIF_WIDTHS) {
    const width = Math.min(w, origWidth);
    const outName = `${role}-${width}.avif`;
    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: AVIF_QUALITY })
      .toFile(path.join(outDir, outName));
    avifParts.push(`/catalog/products/${slug}/optimized/${outName} ${width}w`);
  }

  const blurBuffer = await sharp(sourcePath).resize(10).jpeg({ quality: 40 }).toBuffer();
  const blurDataURL = `data:image/jpeg;base64,${blurBuffer.toString("base64")}`;

  const height = Math.round((origHeight / origWidth) * primaryWidth);

  return {
    src: `/catalog/products/${slug}/optimized/${role}-${primaryWidth}.webp`,
    width: primaryWidth,
    height,
    blurDataURL,
    srcSetWebp: webpParts.join(", "),
    srcSetAvif: avifParts.join(", "),
  };
}

async function resolveRoleEntry(
  slug: string,
  role: Role,
  sourcePath: string,
  cache: ProductCache,
): Promise<{ entry: ImageManifestEntry; cache: ProductCache; reused: boolean }> {
  const outDir = path.join(PRODUCTS_ROOT, slug, "optimized");
  const sourceHash = await hashFile(sourcePath);
  const meta = await sharp(sourcePath).metadata();
  const origWidth = meta.width ?? 1200;
  const expectedNames = expectedOutputNames(role, origWidth);
  const cached = cache[role];

  const canReuse =
    !FORCE &&
    cached?.configVersion === CONFIG_VERSION &&
    cached.sourceHash === sourceHash &&
    (await outputsExist(outDir, expectedNames));

  if (canReuse) {
    return { entry: cached.entry, cache, reused: true };
  }

  if (CHECK_MODE) {
    throw new Error(`stale: ${slug}/${role} — run pnpm images:optimize and commit the results`);
  }

  const entry = await optimizeRole(slug, role, sourcePath);
  const nextCache: ProductCache = {
    ...cache,
    [role]: { configVersion: CONFIG_VERSION, sourceHash, entry },
  };
  await writeProductCache(outDir, nextCache);

  return { entry, cache: nextCache, reused: false };
}

function writeManifest(manifest: CatalogImageManifest): string {
  return [
    `/** Generated by scripts/optimize-catalog-images.ts — do not edit manually. */`,
    `import type { CatalogImageManifest } from "./catalog-image-types";`,
    ``,
    `export const CATALOG_IMAGE_MANIFEST: CatalogImageManifest = ${JSON.stringify(manifest, null, 2)};`,
    ``,
  ].join("\n");
}

async function readCommittedManifest(): Promise<string> {
  try {
    return await fs.readFile(MANIFEST_OUT, "utf8");
  } catch {
    return "";
  }
}

function parseSrcSetUrls(srcSet: string): string[] {
  return srcSet
    .split(",")
    .map((part) => part.trim().split(/\s+/)[0])
    .filter((url): url is string => Boolean(url));
}

async function assertPublicFileExists(publicPath: string): Promise<void> {
  const filePath = path.join(ROOT, "public", publicPath);
  try {
    await fs.access(filePath);
  } catch {
    throw new Error(`missing file: ${publicPath}`);
  }
}

async function verifyManifestEntry(entry: ImageManifestEntry): Promise<void> {
  await assertPublicFileExists(entry.src);
  for (const url of parseSrcSetUrls(entry.srcSetWebp)) {
    await assertPublicFileExists(url);
  }
  for (const url of parseSrcSetUrls(entry.srcSetAvif)) {
    await assertPublicFileExists(url);
  }
}

async function loadCommittedManifest(): Promise<CatalogImageManifest> {
  const mod = await import(pathToFileURL(MANIFEST_OUT).href);
  return mod.CATALOG_IMAGE_MANIFEST as CatalogImageManifest;
}

async function runCheck(): Promise<void> {
  const manifest = await loadCommittedManifest();
  let verified = 0;

  for (const product of CATALOG_PAGES) {
    const slug = PRODUCT_FOLDER_SLUGS[product.page];
    if (!slug) continue;

    const productEntry = manifest[slug];
    if (!productEntry?.hero) {
      throw new Error(`[check] ${slug} missing from catalog-image-manifest.ts`);
    }

    const roles = rolesForCategory(product.category);
    const folder = path.join(PRODUCTS_ROOT, slug);
    const outDir = path.join(folder, "optimized");
    const cache = await readProductCache(outDir);

    for (const role of roles) {
      const imageEntry = productEntry[role];
      const source = await findSource(folder, role);

      if (!imageEntry) {
        if (role === "hero") {
          throw new Error(`[check] ${slug}/${role} missing from manifest`);
        }
        if (source) {
          throw new Error(
            `[check] ${slug}/${role} has local source but missing from manifest — run pnpm images:optimize`,
          );
        }
        continue;
      }

      await verifyManifestEntry(imageEntry);
      verified++;

      if (!source) continue;

      const sourceHash = await hashFile(source);
      const cached = cache[role];
      if (
        !cached ||
        cached.configVersion !== CONFIG_VERSION ||
        cached.sourceHash !== sourceHash
      ) {
        throw new Error(
          `stale: ${slug}/${role} — run pnpm images:optimize and commit optimized/ + manifest`,
        );
      }
    }
  }

  console.log(`Check passed: ${verified} image roles verified on disk`);
}

async function main() {
  if (CHECK_MODE) {
    await runCheck();
    return;
  }

  const manifest: CatalogImageManifest = {};
  let optimized = 0;
  let reused = 0;
  let skipped = 0;

  for (const product of CATALOG_PAGES) {
    const slug = PRODUCT_FOLDER_SLUGS[product.page];
    if (!slug) continue;

    const folder = path.join(PRODUCTS_ROOT, slug);
    const outDir = path.join(folder, "optimized");
    const roles = rolesForCategory(product.category);
    const entry: Partial<ProductImageManifest> = {};
    let cache = await readProductCache(outDir);
    const keepNames = new Set<string>([CACHE_FILE]);

    for (const role of roles) {
      const source = await findSource(folder, role);
      if (!source) {
        const cachedRole = cache[role];
        if (cachedRole?.entry) {
          entry[role] = cachedRole.entry;
          reused++;
          console.log(`[cache-only] ${slug}/${role} — no local source, using committed cache`);
          continue;
        }

        console.warn(`[skip] ${slug}/${role} — no source file`);
        skipped++;
        continue;
      }

      const sourceMeta = await sharp(source).metadata();
      const origWidth = sourceMeta.width ?? 1200;
      expectedOutputNames(role, origWidth).forEach((name) => keepNames.add(name));

      const result = await resolveRoleEntry(slug, role, source, cache);
      cache = result.cache;
      entry[role] = result.entry;

      if (result.reused) {
        reused++;
        console.log(`[cache] ${slug}/${role}`);
      } else {
        optimized++;
        console.log(`[ok] ${slug}/${role}`);
      }
    }

    if (!CHECK_MODE && Object.keys(cache).length > 0) {
      await writeProductCache(outDir, cache);
      await removeStaleOutputs(outDir, keepNames);
    }

    if (entry.hero) {
      manifest[slug] = entry as ProductImageManifest;
    } else {
      console.warn(`[warn] ${slug} — no hero image, excluded from manifest`);
    }
  }

  const manifestContent = writeManifest(manifest);
  const committedManifest = await readCommittedManifest();

  if (manifestContent !== committedManifest) {
    await fs.writeFile(MANIFEST_OUT, manifestContent, "utf8");
    console.log(`Manifest updated: ${path.relative(ROOT, MANIFEST_OUT)}`);
  } else {
    console.log(`Manifest unchanged: ${path.relative(ROOT, MANIFEST_OUT)}`);
  }

  console.log(`\nDone: ${optimized} optimized, ${reused} cached, ${skipped} skipped`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
