import { CATALOG_PAGES, catalogImagePath } from "./catalog-products";

export type FinishKey = "matte" | "glossy" | "steel";

export type ProductBase = {
  id: string;
  code: string;
  brand: string;
  finishKey: FinishKey;
  spec: string;
  euro: string;
  image: string;
  span: "sm" | "md" | "lg" | "xl";
  names: { fa: string; en: string };
};

export const BRANDS = ["Volvo", "DAF", "Scania", "MAN", "Mercedes"] as const;

export const PRODUCT_CATALOG: ProductBase[] = CATALOG_PAGES.map((p) => ({
  id: `cat-${p.page}`,
  code: p.code,
  brand: p.brand,
  finishKey: p.finishKey,
  spec: p.spec,
  euro: p.euro,
  image: catalogImagePath(p.page),
  span: p.span,
  names: p.names,
}));
