import type { ImageManifestEntry } from "@/data/catalog-image-types";

export type GallerySlide = {
  manifest: ImageManifestEntry;
};

export function gallerySlidesForProduct(entries: ImageManifestEntry[]): GallerySlide[] {
  return entries.map((manifest) => ({ manifest }));
}
