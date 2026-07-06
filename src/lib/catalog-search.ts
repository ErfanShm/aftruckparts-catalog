import type { FinishKey, ProductCategory } from "@/data/products";
import { BRANDS } from "@/data/products";

const FINISH_KEYS: readonly FinishKey[] = ["matte", "matte-glossy", "glossy", "steel"];
const CATEGORY_KEYS: readonly ProductCategory[] = [
  "model-badge",
  "horsepower",
  "emissions",
  "technology",
  "installation",
  "accessory",
];

export type CatalogSearch = {
  brand?: string;
  category?: ProductCategory;
  finish?: FinishKey;
};

export function brandToSlug(brand: string): string {
  return brand.toLowerCase();
}

export function resolveBrand(slug: string | undefined): string | null {
  if (!slug) return null;
  return BRANDS.find((b) => b.toLowerCase() === slug.toLowerCase()) ?? null;
}

export function parseCatalogSearch(raw: Record<string, unknown>): CatalogSearch {
  const result: CatalogSearch = {};

  if (typeof raw.brand === "string") {
    const resolved = resolveBrand(raw.brand);
    if (resolved) result.brand = brandToSlug(resolved);
  }

  if (typeof raw.category === "string" && CATEGORY_KEYS.includes(raw.category as ProductCategory)) {
    result.category = raw.category as ProductCategory;
  }

  if (typeof raw.finish === "string" && FINISH_KEYS.includes(raw.finish as FinishKey)) {
    result.finish = raw.finish as FinishKey;
  }

  return result;
}

export function patchCatalogSearch(
  prev: CatalogSearch,
  patch: {
    brand?: string | null;
    category?: ProductCategory | null;
    finish?: FinishKey | null;
  },
): CatalogSearch {
  const next: CatalogSearch = { ...prev };

  if ("brand" in patch) {
    if (patch.brand) next.brand = brandToSlug(patch.brand);
    else delete next.brand;
  }

  if ("category" in patch) {
    if (patch.category) next.category = patch.category;
    else delete next.category;
  }

  if ("finish" in patch) {
    if (patch.finish) next.finish = patch.finish;
    else delete next.finish;
  }

  return next;
}
