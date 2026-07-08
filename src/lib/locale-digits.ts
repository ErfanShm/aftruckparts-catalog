import type { Locale } from "@/locales";

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;

/** Convert Western digits in a value to Persian when locale is fa. */
export function toLocaleDigits(value: string | number, locale: Locale): string {
  const str = String(value);
  if (locale === "en") return str;
  return str.replace(/\d/g, (d) => FA_DIGITS[Number(d)]!);
}

/** Zero-padded two-digit index, localized (1 → 01 or ۰۱). */
export function formatPaddedIndex(index: number, locale: Locale): string {
  return toLocaleDigits(String(index).padStart(2, "0"), locale);
}

/** Separate digit characters for editorial index display. */
export function paddedIndexDigits(index: number, locale: Locale): string[] {
  return formatPaddedIndex(index, locale).split("");
}
