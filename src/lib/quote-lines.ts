import type { FinishKey } from "@/data/products";

const FINISH_KEYS = new Set<FinishKey>(["matte", "matte-glossy", "glossy", "steel"]);

export const QUOTE_QTY_STEP = 10;

export function addQuoteQty(current: number, step = QUOTE_QTY_STEP) {
  return current + step;
}

export function removeQuoteQty(current: number, step = QUOTE_QTY_STEP) {
  return Math.max(0, current - step);
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
