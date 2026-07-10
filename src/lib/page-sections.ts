import { paddedIndexDigits } from "@/lib/locale-digits";
import type { Locale } from "@/locales";

/** Top-to-bottom section order on the catalog page (hero has no index) */
export const PAGE_SECTION_INDEX = {
  orderGuide: 1,
  catalog: 2,
  contact: 3,
} as const;

/** Zero-padded section index as separate digit characters (e.g. 0 + 1). */
export function sectionIndexDigits(index: number, locale: Locale): string[] {
  return paddedIndexDigits(index, locale);
}
