import type { LocaleMessages } from "./types";

export const fa: LocaleMessages = {
  meta: {
    title: "Aftruckparts — کاتالوگ قطعات کامیون",
    description:
      "کاتالوگ B2B آرم‌ها و یراق‌آلات درجه‌یک کامیون. روکش‌های مهندسی‌شده، گارانتی ۲ ساله.",
    author: "Aftruckparts",
    ogTitle: "Aftruckparts — کاتالوگ قطعات کامیون",
    ogDescription:
      "کاتالوگ B2B آرم‌ها و یراق‌آلات درجه‌یک کامیون. روکش‌های مهندسی‌شده، گارانتی ۲ ساله.",
  },

  nav: {
    links: ["کاتالوگ", "راهنمای خرید", "تماس"],
    langFa: "فا",
    langEn: "EN",
    menuOpen: "باز کردن منو",
    menuClose: "بستن منو",
  },

  hero: {
    titleLine1: "کیفیت ما",
    titleLine2: "",
    titleAccent: "هویت ماست.",
    subtitleLead: "سفارشی آسان از سایت",
    subtitleWarranty: "تمامی اجناس دارای گارانتی ۲ ساله می‌باشد",
    subtitleWarrantyHighlight: "گارانتی ۲ ساله",
    cta: "سفارش",
    ctaPdf: "دانلود کاتالوگ",
    dragHint: "بکشید و بررسی کنید",
    zoomHint: "نیشگون برای بزرگ‌نمایی",
    scrollZoomHint: "اسکرول برای بزرگ‌نمایی",
    showcaseFinishes: {
      matte: "مات",
      steel: "استیل کروم",
      glossy: "پیانو بلک",
    },
    stats: {
      skus: { label: "کد کالا", value: "۲۶+" },
      brands: { label: "برند", value: "۳" },
      warranty: { label: "گارانتی", value: "۲۴ ماه" },
    },
  },

  orderGuide: {
    tag: "راهنمای خرید",
    title: "سفارش در ۳ قدم ساده",
    steps: [
      { title: "قطعه را انتخاب کنید", body: "روی عکس قطعه بزنید." },
      { title: "به لیست اضافه کنید", body: "دکمه + را بزنید." },
      { title: "در واتساپ بفرستید", body: "لیست خرید را باز کنید و ارسال کنید." },
    ],
  },

  catalog: {
    sectionTag: "کاتالوگ",
    heading: "فیلتر",
    results: (count, total) => `${count} از ${total}`,
    searchPlaceholder: "جستجو…",
    clearSearch: "پاک کردن",
    brandLabel: "برند",
    dastehLabel: "دسته",
    categoryLabel: "نوع",
    finishLabel: "روکش",
    clearFilters: "پاک کردن فیلتر",
    noResults: "موردی پیدا نشد.",
    openFilters: "فیلتر",
    applyFilters: "اعمال",
    activeFilters: "فعال",
    galleryTag: "محصولات",
    galleryHeading: "کاتالوگ",
    curatedUnits: "منتخب",
  },

  categories: [
    { key: "model-badge", label: "مدل" },
    { key: "horsepower", label: "قدرت" },
    { key: "emissions", label: "آلایندگی" },
    { key: "technology", label: "تکنولوژی" },
    { key: "installation", label: "نصب" },
    { key: "accessory", label: "لوازم" },
  ],

  dastehLines: [
    { key: "volvo-fh12-fh13", label: "ولوو FH12 / FH13" },
    { key: "volvo-fh500", label: "ولوو FH500" },
    { key: "hub-caps", label: "قالپاق توپی · ولوو / رنو / C&C" },
    { key: "daf", label: "داف" },
  ],

  finishes: [
    { key: "matte", label: "مات" },
    { key: "matte-glossy", label: "مات‌براق" },
    { key: "glossy", label: "براق" },
    { key: "steel", label: "کروم" },
  ],

  product: {
    warranty: "گارانتی ۲ ساله",
    warrantyBadge: "۲۴ ماه",
    finishBoth: "مات و براق",
    addToQuote: "به لیست اضافه",
    inQuote: "در لیست",
    increaseQty: "افزایش تعداد",
    decreaseQty: "کاهش تعداد",
    detail: {
      close: "بستن",
      spec: "مشخصات",
      specValue: "مدل",
      category: "نوع",
      dasteh: "دسته",
      brand: "برند",
      compat: "سازگاری",
      euroNorm: "یورو",
      finish: "روکش",
      description: "توضیحات",
      position: (current, total) => `${current} از ${total}`,
      prev: "قطعه قبلی",
      next: "قطعه بعدی",
      swipeHint: "از فهرست برای مرور قطعات استفاده کنید",
      prevPhoto: "عکس قبلی",
      nextPhoto: "عکس بعدی",
      photoPosition: (current, total) => `${current} / ${total}`,
      swipePhotosHint: "برای نمای بیشتر بکشید",
      viewsLabel: "نماها",
      browsePartsLabel: "مرور قطعات",
    },
  },

  quote: {
    fab: "لیست خرید",
    sessionTag: "لیست شما",
    title: "لیست خرید",
    close: "بستن",
    empty: "لیست خالی است",
    emptyHint: "روی عکس قطعه بزنید، + را بزنید، بعد اینجا ارسال کنید.",
    itemsCount: (count) => `${count} عدد`,
    customerLabel: "نام",
    customerPlaceholder: "نام یا شرکت",
    detailsLabel: "یادداشت",
    detailsPlaceholder: "شهر، توضیح… (اختیاری)",
    nameRequired: "نام را بنویسید تا ارسال شود",
    qtyHint: "هر بار ۱۰ عدد",
    sendWhatsApp: "ارسال در واتساپ",
    sendWhatsAppArrow: "",
    footerNote: "بدون پرداخت آنلاین",
  },

  footer: {
    headline: "ارتباط مستقیم با تیم ما",
    headlineLine1: "ارتباط مستقیم",
    headlineLine2: "با تیم ما",
    tagline: "یراق‌آلات درجه‌یک کامیون · کاتالوگ B2B · روکش‌های آماده ناوگان.",
    socialLabel: "ارتباط",
    watermark: "B2B",
    social: [
      { key: "whatsapp", label: "واتساپ", short: "WA", href: "https://wa.me/" },
      { key: "instagram", label: "اینستاگرام", short: "IG", href: "https://instagram.com/" },
      { key: "telegram", label: "تلگرام", short: "TG", href: "https://t.me/" },
      { key: "email", label: "ایمیل", short: "MAIL", href: "mailto:hello@aftruckparts.com" },
    ],
    copyright: "© ۱۴۰۵ Aftruckparts",
  },

  errors: {
    notFoundTitle: "صفحه پیدا نشد",
    notFoundBody: "صفحه‌ای که دنبال آن هستید وجود ندارد یا جابه‌جا شده است.",
    goHome: "بازگشت به خانه",
    errorTitle: "این صفحه بارگذاری نشد",
    errorBody: "مشکلی از سمت ما پیش آمد. می‌توانید دوباره تلاش کنید یا به صفحه اصلی برگردید.",
    tryAgain: "تلاش مجدد",
  },

  whatsapp: {
    header: "📦 Aftruckparts — سفارش جدید",
    customer: (name) => `👤 مشتری: ${name}`,
    details: (text) => `📝 جزئیات بیشتر: ${text}`,
    itemsHeading: "اقلام:",
    line: (code, name, finish, qty) => `• ${qty.toLocaleString("fa-IR")} عدد | ${code} (${name} - ${finish})`,
    footer: "لطفاً قیمت، موجودی و زمان تحویل را اعلام کنید.",
    leadSource: "[Lead Source: Web-Catalog-26]",
  },
};
