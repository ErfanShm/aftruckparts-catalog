import type { LocaleMessages } from "./types";

export const en: LocaleMessages = {
  meta: {
    title: "Aftruckparts — Truck Parts Catalog",
    description:
      "B2B catalog of premium truck badges and hardware. Engineered finishes, 2-year warranty.",
    author: "Aftruckparts",
    ogTitle: "Aftruckparts — Truck Parts Catalog",
    ogDescription:
      "B2B catalog of premium truck badges and hardware. Engineered finishes, 2-year warranty.",
  },

  nav: {
    links: ["Catalog", "Brands", "Warranty", "Contact"],
    langFa: "فا",
    langEn: "EN",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  hero: {
    titleLine1: "Engineered",
    titleLine2: "hardware for the",
    titleAccent: "long haul.",
    subtitle: "Fleet-grade badges. Three finishes. Two-year warranty.",
    cta: "Browse catalog",
    ctaPdf: "Download PDF",
    dragHint: "Drag to inspect",
    zoomHint: "Pinch to zoom",
    scrollZoomHint: "Scroll to zoom",
    showcaseFinishes: {
      matte: "Matte",
      steel: "Chrome Steel",
      glossy: "Piano Black",
    },
    stats: {
      skus: { label: "SKUs", value: "26+" },
      brands: { label: "Brands", value: "3" },
      warranty: { label: "Warranty", value: "24 mo" },
    },
  },

  catalog: {
    sectionTag: "Catalog search",
    heading: "Filter the catalog",
    results: (count, total) =>
      `${String(count).padStart(3, "0")} / ${String(total).padStart(3, "0")} results`,
    searchPlaceholder: "Search brand / category / code / finish…",
    clearSearch: "Clear search",
    brandLabel: "Brand",
    categoryLabel: "Category",
    finishLabel: "Finish",
    clearFilters: "Clear",
    noResults: "No results — clear filters to try again.",
    openFilters: "Filters",
    applyFilters: "Apply filters",
    activeFilters: "Active filters",
    galleryTag: "Hardware vault",
    galleryHeading: "Engineered badges",
    curatedUnits: "Curated units",
  },

  categories: [
    { key: "model-badge", label: "Model badge" },
    { key: "horsepower", label: "Horsepower" },
    { key: "emissions", label: "Emissions" },
    { key: "technology", label: "Technology" },
    { key: "installation", label: "Installation" },
    { key: "accessory", label: "Accessory" },
  ],

  finishes: [
    { key: "matte", label: "Matte" },
    { key: "matte-glossy", label: "Matte & Glossy" },
    { key: "glossy", label: "Piano Black" },
    { key: "steel", label: "Chrome Steel" },
  ],

  product: {
    warranty: "2-year warranty",
    warrantyBadge: "24 mo",
    addToQuote: "Add to list",
    inQuote: "In list",
    increaseQty: "Increase quantity",
    decreaseQty: "Decrease quantity",
    detail: {
      close: "Close",
      spec: "Specification",
      category: "Category",
      compat: "Compatibility",
      euroNorm: "Euro norm",
      finish: "Finish",
      description: "About",
      variantLabel: "Finish",
      position: (current, total) => `${current} of ${total}`,
      prev: "Previous part",
      next: "Next part",
      swipeHint: "Use the index to browse parts",
      prevPhoto: "Previous photo",
      nextPhoto: "Next photo",
      photoPosition: (current, total) => `${current} / ${total}`,
      swipePhotosHint: "Swipe for more views",
      viewsLabel: "Views",
      browsePartsLabel: "Browse parts",
    },
  },

  quote: {
    fab: "Quote list",
    sessionTag: "Quote session",
    title: "Your quote list",
    close: "Close",
    empty: "List is empty — add parts to build your quote.",
    customerLabel: "Name / Company",
    customerPlaceholder: "Fleet name or contact",
    detailsLabel: "More details",
    detailsPlaceholder: "City, fleet size, urgency, notes…",
    sendWhatsApp: "Send via WhatsApp",
    sendWhatsAppArrow: "→",
    footerNote: "No checkout · B2B direct line",
  },

  warranty: {
    tag: "Warranty protocol",
    headline: "Two years. Every unit.",
    subline:
      "Fleet-grade hardware backed by a straight claim path — no tiers, no fine print buried in PDFs.",
    watermark: "24",
    pillars: [
      { label: "Coverage", value: "Full" },
      { label: "Term", value: "24 mo" },
      { label: "Claims", value: "Direct" },
    ],
    note: "Defects in finish or fit from normal fleet use are covered. Contact us with your order ref and part code.",
  },

  brands: {
    tag: "Partner marques",
    headline: "Fleet-ready brands",
    subline:
      "Select a marque to filter the catalog — every unit ships under the same warranty protocol.",
    units: (count) => `${count} SKU${count === 1 ? "" : "s"}`,
    unitsLabel: "SKUs",
    browse: "View in catalog →",
  },

  footer: {
    headline: "Direct line to our team",
    headlineLine1: "Direct line",
    headlineLine2: "to our team",
    tagline: "Premium truck hardware · B2B catalog · Fleet-ready finishes.",
    socialLabel: "Connect",
    watermark: "B2B",
    social: [
      { key: "whatsapp", label: "WhatsApp", short: "WA", href: "https://wa.me/" },
      { key: "instagram", label: "Instagram", short: "IG", href: "https://instagram.com/" },
      { key: "telegram", label: "Telegram", short: "TG", href: "https://t.me/" },
      { key: "email", label: "Email", short: "MAIL", href: "mailto:hello@aftruckparts.com" },
    ],
    copyright: "© 2026 Aftruckparts",
  },

  errors: {
    notFoundTitle: "Page not found",
    notFoundBody: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
    errorTitle: "This page didn't load",
    errorBody: "Something went wrong on our end. You can try refreshing or head back home.",
    tryAgain: "Try again",
  },

  whatsapp: {
    header: "📦 Aftruckparts — New Quote Request",
    customer: (name) => `👤 Customer: ${name}`,
    details: (text) => `📝 More details: ${text}`,
    itemsHeading: "Items:",
    line: (code, name, finish, qty) => `• ${qty}x | ${code} (${name} - ${finish})`,
    footer: "Please confirm pricing, availability, and lead time.",
    leadSource: "[Lead Source: Web-Catalog-26]",
  },
};
