import { CATALOG_IMAGE_MANIFEST } from "./catalog-image-manifest";

export type ProductCategory =
  | "model-badge"
  | "horsepower"
  | "emissions"
  | "technology"
  | "installation"
  | "accessory";

export type ProductDasteh =
  | "volvo-fh12-fh13"
  | "volvo-fh500"
  | "hub-caps"
  | "daf";

export const DASTEH_KEYS: readonly ProductDasteh[] = [
  "volvo-fh12-fh13",
  "volvo-fh500",
  "daf",
  "hub-caps",
];

export type FinishKey = "matte" | "matte-glossy" | "glossy" | "steel";

export type CatalogPageProduct = {
  page: number;
  code: string;
  spec: string;
  brand: string;
  dasteh: ProductDasteh;
  finishKey: FinishKey;
  span: "sm" | "md" | "lg" | "xl";
  names: { fa: string; en: string };
  category: ProductCategory;
  description: { fa: string; en: string };
  euroNorm?: string;
  modelCompat?: string;
  finishOffers?: readonly FinishKey[];
};

type EntryOpts = {
  page: number;
  spec: string;
  brand: string;
  dasteh: ProductDasteh;
  finishKey: FinishKey;
  category: ProductCategory;
  names: { fa: string; en: string };
  description: { fa: string; en: string };
  span?: CatalogPageProduct["span"];
  euroNorm?: string;
  modelCompat?: string;
  finishOffers?: readonly FinishKey[];
  code?: string;
};

function entry({
  page,
  spec,
  brand,
  dasteh,
  finishKey,
  category,
  names,
  description,
  span = "md",
  euroNorm,
  modelCompat,
  finishOffers,
  code,
}: EntryOpts): CatalogPageProduct {
  return {
    page,
    code: code ?? `ATP-${spec.replace(/\s+/g, "-")}`,
    spec,
    brand,
    dasteh,
    finishKey,
    span,
    names,
    category,
    description,
    euroNorm,
    modelCompat,
    finishOffers,
  };
}

export function resolveFinishOffers(
  finishKey: FinishKey,
  finishOffers?: readonly FinishKey[],
): readonly FinishKey[] {
  if (finishOffers?.length) return finishOffers;
  if (finishKey === "matte-glossy") return ["matte", "glossy"];
  return [finishKey];
}

/** Sourced from public/af_catalog-5.pdf — images in public/catalog/. */
export const CATALOG_PAGES: CatalogPageProduct[] = [
  entry({ page: 1, spec: "NH 12", brand: "Volvo", dasteh: "volvo-fh12-fh13", finishKey: "matte", category: "model-badge", code: "ATP-NH-12", names: { fa: "آرم NH 12", en: "NH 12" }, description: { fa: "آرم مدل NH 12 ولوو با روکش مات، برای کامیون‌های دماغ‌دار.", en: "Volvo NH 12 model badge with matte finish for conventional cabs." }, modelCompat: "NH 12" }),
  entry({ page: 2, spec: "FM9", brand: "Volvo", dasteh: "volvo-fh12-fh13", finishKey: "matte", category: "model-badge", code: "ATP-FM9", names: { fa: "آرم FM9", en: "FM9" }, description: { fa: "آرم مدل FM9 ولوو با روکش مات.", en: "Volvo FM9 model badge with matte finish." }, modelCompat: "FM9" }),
  entry({ page: 3, spec: "420", brand: "Volvo", dasteh: "volvo-fh12-fh13", finishKey: "matte", category: "horsepower", code: "ATP-420", names: { fa: "آرم 420", en: "420" }, description: { fa: "آرم توان 420 اسب برای درب کناری کابین، روکش مات.", en: "420 HP cab-side badge with matte finish." }, modelCompat: "FH12 / FM" }),
  entry({ page: 4, spec: "460", brand: "Volvo", dasteh: "volvo-fh12-fh13", finishKey: "matte", category: "horsepower", code: "ATP-460-M", names: { fa: "آرم 460", en: "460" }, description: { fa: "آرم توان 460 اسب برای درب کناری کابین، روکش مات.", en: "460 HP cab-side badge with matte finish." }, modelCompat: "FH12 / FM" }),
  entry({ page: 5, spec: "440", brand: "Volvo", dasteh: "volvo-fh12-fh13", finishKey: "matte", category: "horsepower", code: "ATP-440", names: { fa: "آرم 440", en: "440" }, description: { fa: "آرم توان 440 اسب برای درب کناری کابین، روکش مات.", en: "440 HP cab-side badge with matte finish." }, modelCompat: "FH12 / FM" }),
  entry({ page: 6, spec: "480", brand: "Volvo", dasteh: "volvo-fh12-fh13", finishKey: "matte", category: "horsepower", code: "ATP-480", names: { fa: "آرم 480", en: "480" }, description: { fa: "آرم توان 480 اسب برای درب کناری کابین، روکش مات.", en: "480 HP cab-side badge with matte finish." }, modelCompat: "FH12 / FM" }),
  entry({ page: 7, spec: "VOLVO FH12", brand: "Volvo", dasteh: "volvo-fh12-fh13", finishKey: "matte", category: "model-badge", code: "ATP-VOLVO-FH12", names: { fa: "آرم VOLVO · FH12", en: "VOLVO · FH12" }, description: { fa: "آرم حروف VOLVO برای جلوپنجره FH12، روکش مات.", en: "VOLVO grille lettering for FH12 with matte finish." }, modelCompat: "FH12" }),
  entry({ page: 8, spec: "EEV", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte-glossy", category: "emissions", code: "ATP-EEV", names: { fa: "آرم EEV", en: "EEV" }, description: { fa: "آرم استاندارد EEV (بین Euro 5 و Euro 6)، روکش مات‌براق.", en: "EEV emissions badge with matte-glossy finish." }, euroNorm: "EEV", modelCompat: "FH / FM" }),
  entry({ page: 9, spec: "I-Shift", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte-glossy", category: "technology", code: "ATP-I-SHIFT", names: { fa: "آرم I-Shift", en: "I-Shift" }, description: { fa: "آرم گیربکس اتوماتیک I-Shift، روکش مات‌براق.", en: "I-Shift transmission badge with matte-glossy finish." }, modelCompat: "FH / FM" }),
  entry({ page: 10, spec: "500", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte-glossy", category: "horsepower", code: "ATP-500", names: { fa: "آرم 500", en: "500" }, description: { fa: "آرم توان 500 اسب برای سری FH500، روکش مات‌براق.", en: "500 HP badge for FH500 series with matte-glossy finish." }, modelCompat: "FH 500" }),
  entry({ page: 11, spec: "Euro 4", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte", category: "emissions", code: "ATP-EURO-4", names: { fa: "آرم Euro 4", en: "Euro 4" }, description: { fa: "آرم استاندارد آلایندگی Euro 4، روکش مات.", en: "Euro 4 emissions badge with matte finish." }, euroNorm: "Euro 4", modelCompat: "FH / FM" }),
  entry({ page: 12, spec: "Euro 5", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte", category: "emissions", code: "ATP-EURO-5", names: { fa: "آرم Euro 5", en: "Euro 5" }, description: { fa: "آرم استاندارد آلایندگی Euro 5، روکش مات.", en: "Euro 5 emissions badge with matte finish." }, euroNorm: "Euro 5", modelCompat: "FH / FM" }),
  entry({ page: 13, spec: "Euro 6", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte-glossy", category: "emissions", code: "ATP-EURO-6", names: { fa: "آرم Euro 6", en: "Euro 6" }, description: { fa: "آرم استاندارد آلایندگی Euro 6، روکش مات‌براق.", en: "Euro 6 emissions badge with matte-glossy finish." }, euroNorm: "Euro 6", modelCompat: "FH / FM" }),
  entry({ page: 14, spec: "460", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte-glossy", category: "horsepower", code: "ATP-460-MG", names: { fa: "آرم 460", en: "460" }, description: { fa: "آرم توان 460 اسب برای درب کناری کابین، مات و براق.", en: "460 HP cab-side badge, available in matte and gloss." }, modelCompat: "FH / FM" }),
  entry({ page: 15, spec: "540", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte-glossy", category: "horsepower", code: "ATP-540", names: { fa: "آرم 540", en: "540" }, description: { fa: "آرم توان 540 اسب برای درب کناری کابین، روکش مات‌براق.", en: "540 HP cab-side badge with matte-glossy finish." }, modelCompat: "FH / FM" }),
  entry({ page: 16, spec: "FH", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte-glossy", category: "model-badge", code: "ATP-FH", names: { fa: "آرم FH", en: "FH" }, description: { fa: "آرم مدل FH برای نمای جلوی کابین، روکش مات‌براق.", en: "FH front badge with matte-glossy finish." }, modelCompat: "FH" }),
  entry({ page: 17, spec: "VOLVO", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte-glossy", category: "model-badge", code: "ATP-VOLVO", names: { fa: "آرم VOLVO", en: "VOLVO" }, description: { fa: "آرم حروف VOLVO برای جلوپنجره سری FH، مات و براق.", en: "VOLVO grille lettering for FH series, available in matte and gloss." }, modelCompat: "FH" }),
  entry({ page: 18, spec: "XF", brand: "DAF", dasteh: "daf", finishKey: "matte", category: "model-badge", code: "ATP-XF-DAF", names: { fa: "آرم XF", en: "DAF XF" }, description: { fa: "آرم مدل XF برای کامیون‌های DAF، روکش مات.", en: "DAF XF model badge with matte finish." }, modelCompat: "DAF XF" }),
  entry({ page: 19, spec: "I-Save", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte-glossy", category: "technology", code: "ATP-I-SAVE", names: { fa: "آرم I-Save", en: "I-Save" }, description: { fa: "آرم پکیج موتوری I-Save، روکش مات‌براق.", en: "I-Save engine package badge with matte-glossy finish." }, modelCompat: "FH / FM" }),
  entry({ page: 20, spec: "750", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte-glossy", category: "horsepower", code: "ATP-750", names: { fa: "آرم 750", en: "750" }, description: { fa: "آرم توان 750 اسب برای FH16، روکش مات‌براق.", en: "750 HP badge for FH16 with matte-glossy finish." }, modelCompat: "FH16" }),
  entry({ page: 21, spec: "L", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte", category: "installation", code: "ATP-INST-L", names: { fa: "آرم L", en: "L" }, description: { fa: "آرم دایره‌ای L (کم‌صدا) با راهنمای نصب FH/FM.", en: "Low-noise L installation badge with FH/FM fitting guide." }, modelCompat: "FH / FM" }),
  entry({ page: 22, spec: "V", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte", category: "installation", code: "ATP-INST-V", names: { fa: "آرم V", en: "V" }, description: { fa: "آرم دایره‌ای V با راهنمای نصب FH/FM.", en: "V installation badge with FH/FM fitting guide." }, modelCompat: "FH / FM" }),
  entry({ page: 23, spec: "IV", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte", category: "installation", code: "ATP-INST-IV", names: { fa: "آرم IV", en: "IV" }, description: { fa: "آرم دایره‌ای IV با راهنمای نصب FH/FM.", en: "IV installation badge with FH/FM fitting guide." }, modelCompat: "FH / FM" }),
  entry({ page: 24, spec: "VI", brand: "Volvo", dasteh: "volvo-fh500", finishKey: "matte", category: "installation", code: "ATP-INST-VI", names: { fa: "آرم VI", en: "VI" }, description: { fa: "آرم دایره‌ای VI (Euro 6) با راهنمای نصب FH/FM.", en: "VI (Euro 6) installation badge with FH/FM fitting guide." }, modelCompat: "FH / FM" }),
  entry({ page: 25, spec: "Steel", brand: "AF Accessories", dasteh: "hub-caps", finishKey: "steel", category: "accessory", code: "ATP-HUB-STEEL", names: { fa: "قالپاق استیل", en: "Steel hub cap" }, description: { fa: "قالپاق وسط توپی استیل براق، مناسب ولوو، رنو و C&C.", en: "Polished steel center hub cap for Volvo, Renault and C&C." }, modelCompat: "Volvo / Renault / C&C" }),
  entry({ page: 26, spec: "Black", brand: "AF Accessories", dasteh: "hub-caps", finishKey: "glossy", category: "accessory", code: "ATP-HUB-BLACK", names: { fa: "قالپاق مشکی", en: "Black hub cap" }, description: { fa: "قالپاق وسط توپی مشکی براق، مناسب ولوو، رنو و C&C.", en: "Glossy black center hub cap for Volvo, Renault and C&C." }, modelCompat: "Volvo / Renault / C&C" }),
];

/** Folder slug per catalog page — images live in public/catalog/products/{slug}/ */
export const PRODUCT_FOLDER_SLUGS: Record<number, string> = {
  1: "01-nh-12",
  2: "02-fm9",
  3: "03-420",
  4: "04-460",
  5: "05-440",
  6: "06-480",
  7: "07-volvo-fh12",
  8: "08-eev",
  9: "09-i-shift",
  10: "10-500",
  11: "11-euro-4",
  12: "12-euro-5",
  13: "13-euro-6",
  14: "14-460-mg",
  15: "15-540",
  16: "16-fh",
  17: "17-volvo",
  18: "18-xf-daf",
  19: "19-i-save",
  20: "20-750",
  21: "21-install-l",
  22: "22-install-v",
  23: "23-install-iv",
  24: "24-install-vi",
  25: "25-hub-steel",
  26: "26-hub-black",
};

export function productFolderSlug(page: number): string {
  const slug = PRODUCT_FOLDER_SLUGS[page];
  if (!slug) throw new Error(`Unknown catalog page: ${page}`);
  return slug;
}

export function productFolderPath(page: number): string {
  return `/catalog/products/${productFolderSlug(page)}`;
}

export function productHeroImagePath(page: number): string {
  const slug = productFolderSlug(page);
  return CATALOG_IMAGE_MANIFEST[slug]?.hero.src ?? "";
}

export function productGalleryImagePaths(page: number, category: ProductCategory): string[] {
  const slug = productFolderSlug(page);
  const manifest = CATALOG_IMAGE_MANIFEST[slug];
  if (!manifest) return [];

  if (category === "installation") {
    return [manifest.hero, manifest.install].filter(Boolean).map((entry) => entry!.src);
  }

  return [manifest.hero, manifest.mounted, manifest.detail]
    .filter(Boolean)
    .map((entry) => entry!.src);
}

/** @deprecated Use productHeroImagePath */
export function catalogImagePath(page: number) {
  return productHeroImagePath(page);
}
