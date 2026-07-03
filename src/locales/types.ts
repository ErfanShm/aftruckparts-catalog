import type { FinishKey } from "@/data/products";

export type Locale = "fa" | "en";

export type LocaleMessages = {
  meta: {
    title: string;
    description: string;
    author: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    links: readonly string[];
    langFa: string;
    langEn: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
    ctaPdf: string;
    stats: {
      skus: { label: string; value: string };
      brands: { label: string; value: string };
      warranty: { label: string; value: string };
    };
  };
  catalog: {
    sectionTag: string;
    heading: string;
    results: (count: number, total: number) => string;
    searchPlaceholder: string;
    clearSearch: string;
    brandLabel: string;
    finishLabel: string;
    clearFilters: string;
    noResults: string;
    openFilters: string;
    applyFilters: string;
    activeFilters: string;
    galleryTag: string;
    galleryHeading: string;
    curatedUnits: string;
  };
  finishes: { key: FinishKey; label: string }[];
  product: {
    warranty: string;
    addToQuote: string;
    inQuote: string;
    increaseQty: string;
    decreaseQty: string;
    detail: {
      close: string;
      spec: string;
      euroNorm: string;
      finish: string;
      position: (current: number, total: number) => string;
      prev: string;
      next: string;
      swipeHint: string;
    };
  };
  quote: {
    fab: string;
    sessionTag: string;
    title: string;
    close: string;
    empty: string;
    sendWhatsApp: string;
    sendWhatsAppArrow: string;
    footerNote: string;
  };
  warranty: {
    tag: string;
    headline: string;
    subline: string;
    watermark: string;
    pillars: { label: string; value: string }[];
    note: string;
  };
  brands: {
    tag: string;
    headline: string;
    subline: string;
    units: (count: number) => string;
    browse: string;
  };
  footer: {
    headline: string;
    headlineLine1: string;
    headlineLine2: string;
    tagline: string;
    socialLabel: string;
    watermark: string;
    social: { key: "whatsapp" | "instagram" | "telegram" | "email"; label: string; short: string; href: string }[];
    copyright: string;
  };
  errors: {
    notFoundTitle: string;
    notFoundBody: string;
    goHome: string;
    errorTitle: string;
    errorBody: string;
    tryAgain: string;
  };
  whatsapp: {
    header: string;
    line: (code: string, name: string, qty: number) => string;
    footer: string;
  };
};

export type Product = {
  id: string;
  code: string;
  name: string;
  brand: string;
  finish: string;
  finishKey: FinishKey;
  spec: string;
  euro: string;
  image: string;
  span: "sm" | "md" | "lg" | "xl";
};
