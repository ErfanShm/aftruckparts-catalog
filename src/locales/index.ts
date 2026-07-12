import { PRODUCT_CATALOG, resolveFinishOffers, type FinishKey } from "@/data/products";
import { parseQuoteLineKey } from "@/lib/quote-lines";

import { en } from "./en";
import { fa } from "./fa";
import type { Locale, LocaleMessages, Product } from "./types";

export type { Locale, LocaleMessages, Product } from "./types";
export { fa } from "./fa";
export { en } from "./en";

const messages: Record<Locale, LocaleMessages> = { fa, en };

export const DEFAULT_LOCALE: Locale = "fa";

/** Latin brand lockup — used in UI chrome and logos. */
export const BRAND_NAME = "Aftruckparts";

/** Persian spoken/search form of the brand (SEO + schema alternateName). */
export const BRAND_NAME_FA = "ای اف تراک پارتز";

/** Extra brand aliases Google/schema can associate with the same entity. */
export const BRAND_ALIASES = [
  BRAND_NAME_FA,
  "آف‌تراک‌پارتز",
  "AF Truck Parts",
] as const;

export function getMessages(locale: Locale): LocaleMessages {
  return messages[locale];
}

function productFinishLabel(
  finishKey: FinishKey,
  finishOffers: readonly FinishKey[],
  finishMap: Record<string, string>,
  finishBoth: string,
) {
  const offers = finishOffers.length ? finishOffers : resolveFinishOffers(finishKey);
  if (offers.includes("matte") && offers.includes("glossy")) return finishBoth;
  return finishMap[finishKey];
}

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
  const dastehMap = Object.fromEntries(msgs.dastehLines.map((d) => [d.key, d.label])) as Record<
    string,
    string
  >;

  return PRODUCT_CATALOG.map((p) => {
    const finishOffers = [...p.finishOffers];
    const showFinish = p.showFinish;
    return {
      id: p.id,
      code: p.code,
      brand: p.brand,
      dasteh: p.dasteh,
      dastehLabel: dastehMap[p.dasteh],
      finishKey: p.finishKey,
      finish: showFinish
        ? productFinishLabel(
            p.finishKey,
            finishOffers,
            finishMap,
            msgs.product.finishBoth,
          )
        : "",
      finishOffers,
      showFinish,
      name: p.names[locale],
      spec: p.spec,
      image: p.image,
      images: p.images,
      imageManifest: p.imageManifest,
      span: p.span,
      category: p.category,
      categoryLabel: categoryMap[p.category],
      catalogPage: p.catalogPage,
      description: p.description[locale],
      euroNorm: p.euroNorm,
      modelCompat: p.modelCompat,
    };
  });
}

export function buildWhatsAppMessage(
  locale: Locale,
  items: [string, number][],
  products: Product[],
  customer: string,
  details: string,
): string {
  const msgs = getMessages(locale);
  const finishMap = Object.fromEntries(msgs.finishes.map((f) => [f.key, f.label])) as Record<
    string,
    string
  >;
  const t = msgs.whatsapp;
  const lines = items.map(([key, qty]) => {
    const { productId, finishKey } = parseQuoteLineKey(key);
    const p = products.find((x) => x.id === productId)!;
    const finish = finishKey && p.showFinish ? finishMap[finishKey] : "";
    return t.line(p.code, p.name, finish, qty);
  });
  const headerLines = [t.header, t.customer(customer)];
  if (details) headerLines.push(t.details(details));

  return [...headerLines, "", t.itemsHeading, ...lines, "", t.footer].join("\n");
}

export { DASTEH_KEYS, PRODUCT_CATALOG } from "@/data/products";
