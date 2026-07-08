import type { Product } from "@/locales";

export type GalleryVariant = "hero" | "tall" | "wide" | "unit" | "sky" | "banner";

export type GalleryLayout = {
  /** < lg — 2-column uniform grid */
  mobileClassName: string;
  /** lg+ — same 2-column uniform grid */
  desktopClassName: string;
  variant: GalleryVariant;
  organicY: number;
  imagePosition: string;
};

function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function imagePosition(seed: number): string {
  const x = 47 + (seed % 9) - 4;
  const y = 45 + ((seed >> 4) % 9) - 4;
  return `${x}% ${y}%`;
}

function uniformLayout(product: Product): GalleryLayout {
  const layoutSeed = hashString(`${product.id}:${product.code}`);
  return {
    mobileClassName: "max-lg:col-span-1 max-lg:row-span-1",
    desktopClassName: "lg:col-span-1 lg:row-span-1",
    variant: "unit",
    organicY: 0,
    imagePosition: imagePosition(layoutSeed),
  };
}

export function galleryLayoutForProduct(
  product: Product,
  _index: number,
  _resultCount?: number,
): GalleryLayout {
  return uniformLayout(product);
}
