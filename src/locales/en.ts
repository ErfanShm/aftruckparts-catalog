import {
  CONTACT_INSTAGRAM_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_HREF,
} from "@/data/contact";
import type { LocaleMessages } from "./types";

export const en: LocaleMessages = {
  meta: {
    title: "Aftruckparts | Volvo & DAF Truck Badges",
    description:
      "Catalog of Volvo and DAF cab badges, hub caps, and truck accessories. Easy online ordering with a 2-year warranty.",
    author: "Aftruckparts",
  },

  nav: {
    links: ["How to order", "Catalog", "Contact"],
    langFa: "فا",
    langEn: "EN",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  hero: {
    titleLine1: "Quality is",
    titleLine2: "",
    titleAccent: "our identity.",
    subtitleLead: "Easy ordering from the website",
    subtitleWarranty: "All products include a 2-year warranty",
    subtitleWarrantyHighlight: "2-year warranty",
    cta: "Order",
    ctaPdf: "Download catalog",
    dragHint: "Drag to inspect",
    zoomHint: "Pinch to zoom",
    scrollZoomHint: "Scroll to zoom",
    stats: {
      skus: { label: "SKUs", value: "26+" },
      brands: { label: "Brands", value: "3" },
      warranty: { label: "Warranty", value: "24 mo" },
    },
  },

  orderGuide: {
    tag: "How to order",
    title: "Order in 3 simple steps",
    steps: [
      { title: "Pick a part", body: "Tap the product image." },
      { title: "Add to your list", body: "Press the + button." },
      { title: "Send on WhatsApp", body: "Open your list and send." },
    ],
  },

  catalog: {
    sectionTag: "Catalog",
    heading: "Filters",
    results: (count, total) => `${count} of ${total}`,
    searchPlaceholder: "Search…",
    clearSearch: "Clear",
    brandLabel: "Brand",
    dastehLabel: "Category",
    categoryLabel: "Type",
    clearFilters: "Clear filters",
    noResults: "No matches.",
    openFilters: "Filter",
    applyFilters: "Apply",
    activeFilters: "Active",
    galleryTag: "Products",
    galleryHeading: "Catalog",
    curatedUnits: "Featured",
  },

  categories: [
    { key: "model-badge", label: "Model" },
    { key: "horsepower", label: "Power" },
    { key: "emissions", label: "Emissions" },
    { key: "technology", label: "Tech" },
    { key: "installation", label: "Install" },
    { key: "accessory", label: "Accessory" },
  ],

  dastehLines: [
    { key: "volvo-fh12-fh13", label: "Volvo FH12 / FH13" },
    { key: "volvo-fh500", label: "Volvo FH500" },
    { key: "daf", label: "DAF" },
    { key: "hub-caps", label: "Hub caps · Volvo / Renault / C&C" },
  ],

  finishes: [
    { key: "matte", label: "Matte" },
    { key: "matte-glossy", label: "Matte gloss" },
    { key: "glossy", label: "Gloss" },
    { key: "steel", label: "Chrome" },
  ],

  product: {
    warranty: "2-year warranty",
    warrantyBadge: "24 mo",
    finishBoth: "Matte & gloss",
    addToQuote: "Add to list",
    inQuote: "In list",
    increaseQty: "Increase quantity",
    decreaseQty: "Decrease quantity",
    detail: {
      close: "Close",
      spec: "Details",
      specValue: "Model",
      category: "Type",
      dasteh: "Category",
      brand: "Brand",
      compat: "Fit",
      euroNorm: "Euro",
      finish: "Finish",
      description: "About",
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
    fab: "List",
    sessionTag: "Your list",
    title: "Shopping list",
    close: "Close",
    empty: "Your list is empty",
    emptyHint: "Tap a part, press +, then send from here.",
    itemsCount: (count) => `${count} pcs`,
    customerLabel: "Name",
    customerPlaceholder: "Name or company",
    detailsLabel: "Notes",
    detailsPlaceholder: "City, notes… (optional)",
    nameRequired: "Enter your name to send",
    qtyHint: "±10 per tap",
    sendWhatsApp: "Send on WhatsApp",
    sendWhatsAppArrow: "",
    footerNote: "No online payment",
  },

  footer: {
    headline: "Get in touch with us",
    headlineLine1: "Get in touch",
    headlineLine2: "with us",
    tagline:
      "For quotes, orders, or technical guidance — reach our team on whichever channel works best for you.",
    socialLabel: "Contact channels",
    watermark: "B2B",
    social: [
      { key: "whatsapp", label: "WhatsApp", short: "WA", href: CONTACT_WHATSAPP_HREF },
      { key: "instagram", label: "Instagram", short: "IG", href: CONTACT_INSTAGRAM_HREF },
      { key: "telegram", label: "Telegram", short: "TG", href: "https://t.me/" },
      { key: "email", label: "Email", short: "MAIL", href: "mailto:hello@aftruckparts.com" },
    ],
    phone: {
      label: "We answer during business hours",
      display: CONTACT_PHONE_DISPLAY,
      href: CONTACT_PHONE_TEL,
    },
    copyright: "© 2026 Aftruckparts",
    designedBy: {
      prefix: "by",
      name: "erfanshm",
      href: "https://erfanshm.com/",
      title: "Erfan Shafiee Moghaddam — AI Systems Architect",
    },
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
    header: "📦 Aftruckparts — New Order",
    customer: (name) => `👤 Customer: ${name}`,
    details: (text) => `📝 More details: ${text}`,
    itemsHeading: "Items:",
    line: (code, name, finish, qty) => `• ${qty}x | ${code} (${name} - ${finish})`,
    footer: "Please confirm pricing, availability, and lead time.",
  },
};
