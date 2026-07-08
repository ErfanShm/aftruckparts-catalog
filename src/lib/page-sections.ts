import { paddedIndexDigits } from "@/lib/locale-digits";
import type { Locale } from "@/locales";

/** Top-to-bottom section order on the catalog page */
export const PAGE_SECTION_INDEX = {
  hero: 1,
  orderGuide: 2,
  catalog: 3,
  contact: 4,
} as const;

/** Zero-padded section index as separate digit characters (e.g. 0 + 1). */
export function sectionIndexDigits(index: number, locale: Locale): string[] {
  return paddedIndexDigits(index, locale);
}
