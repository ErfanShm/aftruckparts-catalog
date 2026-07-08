import type { FinishKey, ProductDasteh } from "@/data/products";
import { DASTEH_KEYS } from "@/data/products";

const FINISH_KEYS: readonly FinishKey[] = ["matte", "matte-glossy", "glossy", "steel"];

export type CatalogSearch = {
  dasteh?: ProductDasteh;
  finish?: FinishKey;
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

  if (typeof raw.finish === "string" && FINISH_KEYS.includes(raw.finish as FinishKey)) {
    result.finish = raw.finish as FinishKey;
  }

  return result;
}

export function patchCatalogSearch(
  prev: CatalogSearch,
  patch: {
    dasteh?: ProductDasteh | null;
    finish?: FinishKey | null;
  },
): CatalogSearch {
  const next: CatalogSearch = { ...prev };

  if ("dasteh" in patch) {
    if (patch.dasteh) next.dasteh = patch.dasteh;
    else delete next.dasteh;
  }

  if ("finish" in patch) {
    if (patch.finish) next.finish = patch.finish;
    else delete next.finish;
  }

  return next;
}
