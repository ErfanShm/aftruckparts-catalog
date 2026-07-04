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

function buildVariantMap(): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  for (const p of PRODUCT_CATALOG) {
    if (!p.variantGroup) continue;
    const ids = groups.get(p.variantGroup) ?? [];
    ids.push(p.id);
    groups.set(p.variantGroup, ids);
  }
  return groups;
}

const VARIANT_MAP = buildVariantMap();

export function buildProducts(
  locale: Locale,
  msgs: LocaleMessages = getMessages(locale),
): Product[] {
  const finishMap = Object.fromEntries(msgs.finishes.map((f) => [f.key, f.label])) as Record<
    string,
    string
  >;
  const categoryMap = Object.fromEntries(msgs.categories.map((c) => [c.key, c.label])) as Record<
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
    image: p.image,
    span: p.span,
    category: p.category,
    categoryLabel: categoryMap[p.category],
    catalogPage: p.catalogPage,
    description: p.description[locale],
    euroNorm: p.euroNorm,
    modelCompat: p.modelCompat,
    variantGroup: p.variantGroup,
    variantIds: p.variantGroup ? (VARIANT_MAP.get(p.variantGroup) ?? [p.id]) : [p.id],
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
