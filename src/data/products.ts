import {
  CATALOG_PAGES,
  resolveFinishOffers,
  type FinishKey,
  type ProductCategory,
  type ProductDasteh,
} from "./catalog-products";
import type { ImageManifestEntry } from "./catalog-image-types";
import { productImageManifestForPage } from "./catalog-images";

export type { FinishKey, ProductCategory, ProductDasteh } from "./catalog-products";

export type ProductBase = {
  id: string;
  code: string;
  brand: string;
  dasteh: ProductDasteh;
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
  finishOffers: readonly FinishKey[];
  showFinish: boolean;
};

export const PRODUCT_CATALOG: ProductBase[] = CATALOG_PAGES.map((p) => {
  const imageManifest = productImageManifestForPage(p.page, p.category);
  return {
    id: `cat-${p.page}`,
    code: p.code,
    brand: p.brand,
    dasteh: p.dasteh,
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
    finishOffers: resolveFinishOffers(p.finishKey, p.finishOffers),
    showFinish: p.showFinish ?? true,
  };
});

export { DASTEH_KEYS, resolveFinishOffers } from "./catalog-products";
