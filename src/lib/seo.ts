import { BRAND_ALIASES, BRAND_NAME, BRAND_NAME_FA } from "@/locales";
import { fa } from "@/locales/fa";
import type { Locale, LocaleMessages } from "@/locales/types";

import { SITE_URL, SITE_EMAIL, THEME_COLOR, siteUrl } from "./site";

/** Landscape brand lockup for social previews (summary_large_image). */
const OG_IMAGE = "/og-share.png";
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";
const OG_IMAGE_TYPE = "image/png";

export function ogImageUrl() {
  return siteUrl(OG_IMAGE);
}

function ogLocale(locale: Locale) {
  return locale === "fa" ? "fa_IR" : "en_US";
}

export function buildHead(messages: LocaleMessages = fa, locale: Locale = "fa") {
  const { title, description, author, keywords } = messages.meta;
  const url = siteUrl("/");
  const image = ogImageUrl();
  const siteName =
    locale === "fa" ? `${BRAND_NAME} | ${BRAND_NAME_FA}` : BRAND_NAME;

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
      { name: "keywords", content: keywords },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: siteName },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: title },
      { property: "og:image:type", content: OG_IMAGE_TYPE },
      { property: "og:image:width", content: OG_IMAGE_WIDTH },
      { property: "og:image:height", content: OG_IMAGE_HEIGHT },
      { property: "og:locale", content: ogLocale(locale) },
      {
        property: "og:locale:alternate",
        content: locale === "fa" ? "en_US" : "fa_IR",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: title },
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

  const { title, description, keywords } = messages.meta;
  const url = siteUrl("/");
  const image = ogImageUrl();
  const siteName =
    locale === "fa" ? `${BRAND_NAME} | ${BRAND_NAME_FA}` : BRAND_NAME;

  document.title = title;
  setMeta('meta[name="description"]', description);
  setMeta('meta[name="keywords"]', keywords);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[property="og:site_name"]', siteName);
  setMeta('meta[property="og:image"]', image);
  setMeta('meta[property="og:image:alt"]', title);
  setMeta('meta[property="og:locale"]', ogLocale(locale));
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', description);
  setMeta('meta[name="twitter:image"]', image);
  setMeta('meta[name="twitter:image:alt"]', title);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", url);
}

export function buildJsonLd(messages: LocaleMessages, locale: Locale) {
  const siteName =
    locale === "fa" ? `${BRAND_NAME} | ${BRAND_NAME_FA}` : BRAND_NAME;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BRAND_NAME,
        alternateName: [...BRAND_ALIASES],
        url: SITE_URL,
        logo: siteUrl("/android-chrome-512x512.png"),
        email: SITE_EMAIL,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: siteName,
        alternateName: [...BRAND_ALIASES],
        description: messages.meta.description,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}
