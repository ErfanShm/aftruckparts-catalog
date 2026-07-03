import { PRODUCT_CATALOG } from "@/data/products";

import { en } from "./en";
import { fa } from "./fa";
import type { Locale, LocaleMessages, Product } from "./types";

export type { Locale, LocaleMessages, Product } from "./types";
export { fa } from "./fa";
export { en } from "./en";

const messages: Record<Locale, LocaleMessages> = { fa, en };

export const DEFAULT_LOCALE: Locale = "fa";

/** Brand name is always Latin — not translated per locale. */
export const BRAND_NAME = "Aftruckparts";

export function getMessages(locale: Locale): LocaleMessages {
  return messages[locale];
}

export function buildProducts(
  locale: Locale,
  msgs: LocaleMessages = getMessages(locale),
): Product[] {
  const finishMap = Object.fromEntries(msgs.finishes.map((f) => [f.key, f.label])) as Record<
    string,
    string
  >;

  return PRODUCT_CATALOG.map((p) => ({
    id: p.id,
    code: p.code,
    brand: p.brand,
    finishKey: p.finishKey,
    finish: finishMap[p.finishKey],
    name: p.names[locale],
    spec: p.spec,
    euro: p.euro,
    image: p.image,
    span: p.span,
  }));
}

export function buildWhatsAppMessage(
  locale: Locale,
  items: [string, number][],
  products: Product[],
): string {
  const t = getMessages(locale).whatsapp;
  const lines = items.map(([id, qty]) => {
    const p = products.find((x) => x.id === id)!;
    return t.line(p.code, p.name, qty);
  });
  return `${t.header}\n\n${lines.join("\n")}\n\n${t.footer}`;
}

export { BRANDS, PRODUCT_CATALOG } from "@/data/products";
