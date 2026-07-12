/** Production site origin — override with VITE_SITE_URL when deploying. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "https://www.aftruckparts.com"
).replace(/\/$/, "");

export const THEME_COLOR = "#07070a";

export const SITE_EMAIL = "hello@aftruckparts.com";

export function siteUrl(path = "/") {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
