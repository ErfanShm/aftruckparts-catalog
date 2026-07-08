import type { Locale } from "@/locales/types";

export const LOCALE_STORAGE_KEY = "aftruckparts-locale";
export const LOCALE_COOKIE_NAME = "aftruckparts-locale";
export const LOCALE_COOKIE_MAX_AGE = 31_536_000;

export function localeDir(locale: Locale): "rtl" | "ltr" {
  return locale === "fa" ? "rtl" : "ltr";
}

export function parseLocaleCookie(cookieHeader: string): Locale {
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE_NAME}=(fa|en)(?:;|$)`),
  );
  return match?.[1] === "en" ? "en" : "fa";
}

export function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

/** Blocking head script — runs before paint to set lang/dir and hide body until React is ready. */
export const LOCALE_BOOTSTRAP_SCRIPT = `(function(){try{var k=${JSON.stringify(LOCALE_STORAGE_KEY)};var l=localStorage.getItem(k);if(l!=="en"&&l!=="fa")l="fa";document.documentElement.classList.add("locale-pending");document.documentElement.dataset.locale=l;document.documentElement.lang=l;document.documentElement.dir=l==="en"?"ltr":"rtl"}catch(e){document.documentElement.classList.add("locale-pending");document.documentElement.dataset.locale="fa"}})();`;
