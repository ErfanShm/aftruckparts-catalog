import type { FinishKey, ProductDasteh } from "@/data/products";

const FINISH_KEYS = new Set<FinishKey>(["matte", "matte-glossy", "glossy", "steel"]);

type QuoteProductRef = {
  id: string;
  dasteh: ProductDasteh;
  finishOffers: readonly FinishKey[];
};

/** Shared increment for every category. */
export const QUOTE_QTY_STEP = 2;

export type QtyRules = {
  /** First tap quantity. */
  startQty: number;
  /** Amount added/removed on each subsequent tap. */
  step: number;
  /**
   * Minimum required to place an order.
   * For hub-caps this is a combined total across all hub-cap lines.
   * For other categories it is per product (sum of finishes).
   */
  minOrder: number;
  /** When true, minOrder applies to the sum of all products in this dasteh. */
  minOrderIsCategoryTotal: boolean;
};

export function productQtyRules(dasteh: ProductDasteh): QtyRules {
  switch (dasteh) {
    case "volvo-fh500":
      return { startQty: 2, step: QUOTE_QTY_STEP, minOrder: 12, minOrderIsCategoryTotal: false };
    case "hub-caps":
      return { startQty: 2, step: QUOTE_QTY_STEP, minOrder: 30, minOrderIsCategoryTotal: true };
    case "volvo-fh12-fh13":
    case "daf":
    default:
      return { startQty: 2, step: QUOTE_QTY_STEP, minOrder: 10, minOrderIsCategoryTotal: false };
  }
}

export function addQuoteQty(current: number, startQty: number, step: number) {
  if (current <= 0) return startQty;
  return current + step;
}

export function removeQuoteQty(current: number, startQty: number, step: number) {
  const next = current - step;
  if (next < startQty) return 0;
  return next;
}

export function quoteLineKey(productId: string, finishKey: FinishKey) {
  return `${productId}:${finishKey}`;
}

export function parseQuoteLineKey(key: string): { productId: string; finishKey?: FinishKey } {
  const sep = key.indexOf(":");
  if (sep === -1) return { productId: key };

  const productId = key.slice(0, sep);
  const finishKey = key.slice(sep + 1);
  if (FINISH_KEYS.has(finishKey as FinishKey)) {
    return { productId, finishKey: finishKey as FinishKey };
  }
  return { productId: key };
}

export function quoteLineQty(
  quote: Record<string, number>,
  productId: string,
  finishKey: FinishKey,
) {
  return quote[quoteLineKey(productId, finishKey)] ?? 0;
}

export function productQuoteTotal(
  quote: Record<string, number>,
  productId: string,
  finishOffers: readonly FinishKey[],
) {
  return finishOffers.reduce((sum, finishKey) => sum + quoteLineQty(quote, productId, finishKey), 0);
}

export function dastehQuoteTotal(
  items: readonly [string, number][],
  products: readonly QuoteProductRef[],
  dasteh: ProductDasteh,
) {
  const byId = new Map(products.map((p) => [p.id, p]));
  return items.reduce((sum, [key, qty]) => {
    const { productId } = parseQuoteLineKey(key);
    const product = byId.get(productId);
    if (!product || product.dasteh !== dasteh) return sum;
    return sum + qty;
  }, 0);
}

export function hubCapQuoteTotal(
  items: readonly [string, number][],
  products: readonly QuoteProductRef[],
) {
  return dastehQuoteTotal(items, products, "hub-caps");
}

/** True when every quoted product / category meets its minimum order rule. */
export function meetsQuoteMinimums(
  items: readonly [string, number][],
  products: readonly QuoteProductRef[],
) {
  if (items.length === 0) return true;

  const byId = new Map(products.map((p) => [p.id, p]));
  const productTotals = new Map<string, number>();

  for (const [key, qty] of items) {
    const { productId } = parseQuoteLineKey(key);
    productTotals.set(productId, (productTotals.get(productId) ?? 0) + qty);
  }

  const checkedCategoryTotals = new Set<ProductDasteh>();

  for (const [productId, total] of productTotals) {
    const product = byId.get(productId);
    if (!product) continue;
    const rules = productQtyRules(product.dasteh);

    if (rules.minOrderIsCategoryTotal) {
      if (checkedCategoryTotals.has(product.dasteh)) continue;
      checkedCategoryTotals.add(product.dasteh);
      const categoryTotal = dastehQuoteTotal(items, products, product.dasteh);
      if (categoryTotal > 0 && categoryTotal < rules.minOrder) return false;
      continue;
    }

    if (total > 0 && total < rules.minOrder) return false;
  }

  return true;
}

/** Returns the first unmet minimum order count, or null if all rules pass. */
export function unmetMinOrder(
  items: readonly [string, number][],
  products: readonly QuoteProductRef[],
): number | null {
  if (items.length === 0) return null;

  const byId = new Map(products.map((p) => [p.id, p]));
  const productTotals = new Map<string, number>();

  for (const [key, qty] of items) {
    const { productId } = parseQuoteLineKey(key);
    productTotals.set(productId, (productTotals.get(productId) ?? 0) + qty);
  }

  const checkedCategoryTotals = new Set<ProductDasteh>();

  for (const [productId, total] of productTotals) {
    const product = byId.get(productId);
    if (!product) continue;
    const rules = productQtyRules(product.dasteh);

    if (rules.minOrderIsCategoryTotal) {
      if (checkedCategoryTotals.has(product.dasteh)) continue;
      checkedCategoryTotals.add(product.dasteh);
      const categoryTotal = dastehQuoteTotal(items, products, product.dasteh);
      if (categoryTotal > 0 && categoryTotal < rules.minOrder) return rules.minOrder;
      continue;
    }

    if (total > 0 && total < rules.minOrder) return rules.minOrder;
  }

  return null;
}
