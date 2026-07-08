import {
  PRODUCT_FOLDER_SLUGS,
  productFolderSlug,
  type ProductCategory,
} from "./catalog-products";
import { CATALOG_IMAGE_MANIFEST } from "./catalog-image-manifest";
import type { ImageManifestEntry, ProductImageManifest } from "./catalog-image-types";

export type { ImageManifestEntry, ProductImageManifest, CatalogImageManifest } from "./catalog-image-types";

const FALLBACK_ENTRY: ImageManifestEntry = {
  src: "",
  width: 1200,
  height: 1500,
  blurDataURL: "",
  srcSetWebp: "",
  srcSetAvif: "",
};

export function getManifestForSlug(slug: string): ProductImageManifest | undefined {
  return CATALOG_IMAGE_MANIFEST[slug];
}

export function getManifestForPage(page: number): ProductImageManifest | undefined {
  return getManifestForSlug(productFolderSlug(page));
}

export function galleryEntriesForProduct(
  page: number,
  category: ProductCategory,
): ImageManifestEntry[] {
  const manifest = getManifestForPage(page);
  if (!manifest) return [];

  return [manifest.hero, manifest.mounted].filter(
    (e): e is ImageManifestEntry => Boolean(e),
  );
}

export function heroImageForPage(page: number): string {
  return getManifestForPage(page)?.hero.src ?? "";
}

export function heroEntryForPage(page: number): ImageManifestEntry {
  return getManifestForPage(page)?.hero ?? FALLBACK_ENTRY;
}

export function heroEntryForSlug(slug: string): ImageManifestEntry {
  return getManifestForSlug(slug)?.hero ?? FALLBACK_ENTRY;
}

export function productImageManifestForPage(
  page: number,
  category: ProductCategory,
): { hero: ImageManifestEntry; gallery: ImageManifestEntry[] } {
  const manifest = getManifestForPage(page);
  const gallery = galleryEntriesForProduct(page, category);
  return {
    hero: manifest?.hero ?? FALLBACK_ENTRY,
    gallery,
  };
}

/** All slugs that have a manifest entry (for scripts / diagnostics). */
export function manifestSlugs(): string[] {
  return Object.keys(CATALOG_IMAGE_MANIFEST);
}

export function isManifestLoaded(): boolean {
  return Object.keys(CATALOG_IMAGE_MANIFEST).length > 0;
}

export { PRODUCT_FOLDER_SLUGS };
