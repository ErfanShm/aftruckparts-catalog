import { BRAND_NAME } from "@/locales";
import { fa } from "@/locales/fa";
import type { Locale, LocaleMessages } from "@/locales/types";

import { SITE_URL, SITE_EMAIL, THEME_COLOR, siteUrl } from "./site";

const OG_IMAGE = "/android-chrome-512x512.png";

export function ogImageUrl() {
  return siteUrl(OG_IMAGE);
}

function ogLocale(locale: Locale) {
  return locale === "fa" ? "fa_IR" : "en_US";
}

export function buildHead(messages: LocaleMessages = fa, locale: Locale = "fa") {
  const { title, description, author } = messages.meta;
  const url = siteUrl("/");
  const image = ogImageUrl();

  return {
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title },
      { name: "description", content: description },
      { name: "author", content: author },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: BRAND_NAME },
      { property: "og:image", content: image },
      { property: "og:locale", content: ogLocale(locale) },
      {
        property: "og:locale:alternate",
        content: locale === "fa" ? "en_US" : "fa_IR",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "theme-color", content: THEME_COLOR },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

function setMeta(selector: string, content: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute("content", content);
}

/** Keep head tags in sync after client-side locale changes. */
export function syncDocumentMeta(messages: LocaleMessages, locale: Locale) {
  if (typeof document === "undefined") return;

  const { title, description } = messages.meta;
  const url = siteUrl("/");
  const image = ogImageUrl();

  document.title = title;
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[property="og:image"]', image);
  setMeta('meta[property="og:locale"]', ogLocale(locale));
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', description);
  setMeta('meta[name="twitter:image"]', image);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", url);
}

export function buildJsonLd(messages: LocaleMessages, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BRAND_NAME,
        url: SITE_URL,
        logo: ogImageUrl(),
        email: SITE_EMAIL,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND_NAME,
        description: messages.meta.description,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}
