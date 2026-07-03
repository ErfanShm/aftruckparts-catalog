import type { FinishKey } from "./products";

export type CatalogPageProduct = {
  page: number;
  code: string;
  spec: string;
  brand: string;
  finishKey: FinishKey;
  finishFa: string;
  finishEn: string;
  euro: string;
  span: "sm" | "md" | "lg" | "xl";
  names: { fa: string; en: string };
};

const FINISH = {
  matte: { fa: "مات", en: "Matte" },
  glossy: { fa: "براق", en: "Glossy" },
  both: { fa: "مات و براق", en: "Matte & Glossy" },
  steel: { fa: "استیل", en: "Steel" },
} as const;

function entry(
  page: number,
  code: string,
  brand: string,
  finish: keyof typeof FINISH,
  euro: string,
  span: CatalogPageProduct["span"] = "md",
  nameFa?: string,
  nameEn?: string,
): CatalogPageProduct {
  const f = FINISH[finish];
  const finishKey: FinishKey =
    finish === "steel" ? "steel" : finish === "matte" ? "matte" : "glossy";
  return {
    page,
    code: `ATP-${code.replace(/\s+/g, "-")}`,
    spec: code,
    brand,
    finishKey,
    finishFa: f.fa,
    finishEn: f.en,
    euro,
    span,
    names: {
      fa: nameFa ?? `نشان ${code} — ${f.fa}`,
      en: nameEn ?? `${code} Emblem — ${f.en}`,
    },
  };
}

/** Sourced from public/af_catalog-5.pdf — replace images in public/catalog/ as needed. */
export const CATALOG_PAGES: CatalogPageProduct[] = [
  entry(1, "NH12", "Volvo", "matte", "EURO 5", "lg"),
  entry(2, "FM9", "Volvo", "matte", "EURO 5"),
  entry(3, "420", "Volvo", "matte", "EURO 5"),
  entry(4, "460", "Volvo", "matte", "EURO 5"),
  entry(5, "440", "Volvo", "matte", "EURO 5"),
  entry(6, "480", "Volvo", "matte", "EURO 6", "xl"),
  entry(
    7,
    "FH12",
    "Volvo",
    "matte",
    "EURO 6",
    "lg",
    "نشان ولوو FH12 — مات",
    "Volvo FH12 Emblem — Matte",
  ),
  entry(8, "EEV", "Volvo", "both", "EURO 6"),
  entry(9, "I-Shift", "Volvo", "both", "EURO 6", "lg"),
  entry(10, "500", "Volvo", "both", "EURO 6"),
  entry(11, "EURO 4", "Volvo", "matte", "EURO 4"),
  entry(12, "EURO 5", "Volvo", "matte", "EURO 5"),
  entry(13, "EURO 6", "Volvo", "both", "EURO 6", "lg"),
  entry(14, "460", "Volvo", "both", "EURO 6"),
  entry(15, "540", "Volvo", "both", "EURO 6", "lg"),
  entry(16, "FH", "Volvo", "both", "EURO 6"),
  entry(17, "VOLVO", "Volvo", "both", "EURO 6", "xl"),
  entry(18, "XF", "DAF", "matte", "EURO 6"),
  entry(19, "I-SAVE", "Volvo", "both", "EURO 6"),
  entry(20, "750", "Volvo", "both", "EURO 6", "lg"),
  entry(21, "L", "Volvo", "glossy", "EURO 6"),
  entry(22, "V", "Volvo", "glossy", "EURO 6"),
  entry(23, "IV", "Volvo", "matte", "EURO 6"),
  entry(24, "VI", "Volvo", "glossy", "EURO 6"),
  entry(
    25,
    "Hub Steel",
    "Volvo",
    "steel",
    "EURO 6",
    "md",
    "درپوش هاب استیل — براق",
    "Steel Hub Cap — Glossy",
  ),
  entry(
    26,
    "Hub Black",
    "Volvo",
    "glossy",
    "EURO 6",
    "md",
    "درپوش هاب مشکی براق",
    "Glossy Black Hub Cap",
  ),
];

export function catalogImagePath(page: number) {
  return `/catalog/page-${String(page).padStart(2, "0")}.jpeg`;
}
