import {
  CATALOG_PAGES,
  type FinishKey,
  type ProductCategory,
} from "./catalog-products";
import type { ImageManifestEntry } from "./catalog-image-types";
import { productImageManifestForPage } from "./catalog-images";

export type { FinishKey, ProductCategory } from "./catalog-products";

export type ProductBase = {
  id: string;
  code: string;
  brand: string;
  finishKey: FinishKey;
  spec: string;
  image: string;
  images: string[];
  imageManifest: {
    hero: ImageManifestEntry;
    gallery: ImageManifestEntry[];
  };
  span: "sm" | "md" | "lg" | "xl";
  names: { fa: string; en: string };
  category: ProductCategory;
  catalogPage: number;
  description: { fa: string; en: string };
  euroNorm?: string;
  modelCompat?: string;
  variantGroup?: string;
};

export const PRODUCT_CATALOG: ProductBase[] = CATALOG_PAGES.map((p) => {
  const imageManifest = productImageManifestForPage(p.page, p.category);
  return {
    id: `cat-${p.page}`,
    code: p.code,
    brand: p.brand,
    finishKey: p.finishKey,
    spec: p.spec,
    image: imageManifest.hero.src,
    images: imageManifest.gallery.map((entry) => entry.src),
    imageManifest,
    span: p.span,
    names: p.names,
    category: p.category,
    catalogPage: p.page,
    description: p.description,
    euroNorm: p.euroNorm,
    modelCompat: p.modelCompat,
    variantGroup: p.variantGroup,
  };
});

export const BRANDS = [...new Set(PRODUCT_CATALOG.map((p) => p.brand))].sort();
