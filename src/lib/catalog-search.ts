import type { ProductDasteh } from "@/data/products";
import { DASTEH_KEYS } from "@/data/products";

export type CatalogSearch = {
  dasteh?: ProductDasteh;
};

export function resolveDasteh(slug: string | undefined): ProductDasteh | null {
  if (!slug) return null;
  return DASTEH_KEYS.find((key) => key === slug) ?? null;
}

export function parseCatalogSearch(raw: Record<string, unknown>): CatalogSearch {
  const result: CatalogSearch = {};

  if (typeof raw.dasteh === "string") {
    const resolved = resolveDasteh(raw.dasteh);
    if (resolved) result.dasteh = resolved;
  }

  return result;
}

export function patchCatalogSearch(
  prev: CatalogSearch,
  patch: {
    dasteh?: ProductDasteh | null;
  },
): CatalogSearch {
  const next: CatalogSearch = { ...prev };

  if ("dasteh" in patch) {
    if (patch.dasteh) next.dasteh = patch.dasteh;
    else delete next.dasteh;
  }

  return next;
}
