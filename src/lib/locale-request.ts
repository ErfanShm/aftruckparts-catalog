import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

import { DEFAULT_LOCALE, type Locale } from "@/locales";
import { LOCALE_STORAGE_KEY, parseLocaleCookie } from "@/lib/locale-cookie";

function readDomLocale(): Locale {
  const fromDom = document.documentElement.dataset.locale;
  if (fromDom === "en" || fromDom === "fa") return fromDom;
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  return saved === "en" ? "en" : DEFAULT_LOCALE;
}

export const resolveRequestLocale = createIsomorphicFn()
  .server((): Locale => {
    const cookie = getRequestHeader("cookie") ?? "";
    return parseLocaleCookie(cookie);
  })
  .client((): Locale => readDomLocale());
