import type { FinishKey, ProductCategory } from "@/data/products";
import type { ImageManifestEntry } from "@/data/catalog-image-types";

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
    dragHint: string;
    zoomHint: string;
    scrollZoomHint: string;
    showcaseFinishes: {
      matte: string;
      steel: string;
      glossy: string;
    };
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
    categoryLabel: string;
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
  categories: { key: ProductCategory; label: string }[];
  finishes: { key: FinishKey; label: string }[];
  product: {
    warranty: string;
    warrantyBadge: string;
    addToQuote: string;
    inQuote: string;
    increaseQty: string;
    decreaseQty: string;
    detail: {
      close: string;
      spec: string;
      category: string;
      compat: string;
      euroNorm: string;
      finish: string;
      description: string;
      variantLabel: string;
      position: (current: number, total: number) => string;
      prev: string;
      next: string;
      swipeHint: string;
      prevPhoto: string;
      nextPhoto: string;
      photoPosition: (current: number, total: number) => string;
      swipePhotosHint: string;
      viewsLabel: string;
      browsePartsLabel: string;
    };
  };
  quote: {
    fab: string;
    sessionTag: string;
    title: string;
    close: string;
    empty: string;
    customerLabel: string;
    customerPlaceholder: string;
    detailsLabel: string;
    detailsPlaceholder: string;
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
    unitsLabel: string;
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
    customer: (name: string) => string;
    details: (text: string) => string;
    itemsHeading: string;
    line: (code: string, name: string, finish: string, qty: number) => string;
    footer: string;
    leadSource: string;
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
  image: string;
  images: string[];
  imageManifest: {
    hero: ImageManifestEntry;
    gallery: ImageManifestEntry[];
  };
  span: "sm" | "md" | "lg" | "xl";
  category: ProductCategory;
  categoryLabel: string;
  catalogPage: number;
  description: string;
  euroNorm?: string;
  modelCompat?: string;
  variantGroup?: string;
  variantIds: string[];
};
