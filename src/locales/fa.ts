import type { LocaleMessages } from "./types";

export const fa: LocaleMessages = {
  meta: {
    title: "Aftruckparts — کاتالوگ قطعات کامیون",
    description:
      "کاتالوگ B2B نشان‌ها و یراق‌آلات درجه‌یک کامیون. روکش‌های مهندسی‌شده، گارانتی ۲ ساله.",
    author: "Aftruckparts",
    ogTitle: "Aftruckparts — کاتالوگ قطعات کامیون",
    ogDescription:
      "کاتالوگ B2B نشان‌ها و یراق‌آلات درجه‌یک کامیون. روکش‌های مهندسی‌شده، گارانتی ۲ ساله.",
  },

  nav: {
    links: ["کاتالوگ", "برندها", "گارانتی", "تماس"],
    langFa: "فا",
    langEn: "EN",
    menuOpen: "باز کردن منو",
    menuClose: "بستن منو",
  },

  hero: {
    titleLine1: "سخت‌افزار",
    titleLine2: "مهندسی‌شده برای",
    titleAccent: "مسیرهای طولانی.",
    subtitle:
      "مجموعه‌ای منتخب از نشان‌ها و یراق‌آلات کامیون با روکش کروم، مات و استیل. مناسب ناوگان‌ها. پشتیبانی با گارانتی دو ساله.",
    cta: "ورود به کاتالوگ",
    ctaPdf: "دانلود PDF",
    stats: {
      skus: { label: "کد کالا", value: "۲۶+" },
      brands: { label: "برند", value: "۳" },
      warranty: { label: "گارانتی", value: "۲۴ ماه" },
    },
  },

  catalog: {
    sectionTag: "جستجوی کاتالوگ",
    heading: "فیلتر کاتالوگ",
    results: (count, total) =>
      `${String(count).padStart(3, "0")} / ${String(total).padStart(3, "0")} نتیجه`,
    searchPlaceholder: "جستجو برند / دسته / کد / روکش…",
    clearSearch: "پاک کردن جستجو",
    brandLabel: "برند",
    categoryLabel: "دسته",
    finishLabel: "روکش",
    clearFilters: "پاک کردن",
    noResults: "نتیجه‌ای یافت نشد — فیلترها را پاک کنید.",
    openFilters: "فیلترها",
    applyFilters: "اعمال فیلتر",
    activeFilters: "فیلترهای فعال",
    galleryTag: "گالری سخت‌افزار",
    galleryHeading: "نشان‌های مهندسی‌شده",
    curatedUnits: "واحد منتخب",
  },

  categories: [
    { key: "model-badge", label: "نشان مدل" },
    { key: "horsepower", label: "قدرت موتور" },
    { key: "emissions", label: "استاندارد آلایندگی" },
    { key: "technology", label: "تکنولوژی" },
    { key: "installation", label: "راهنمای نصب" },
    { key: "accessory", label: "اکسسوری" },
  ],

  finishes: [
    { key: "matte", label: "مات" },
    { key: "matte-glossy", label: "مات و براق" },
    { key: "glossy", label: "مشکی براق" },
    { key: "steel", label: "استیل" },
  ],

  product: {
    warranty: "گارانتی ۲ ساله",
    addToQuote: "افزودن به لیست",
    inQuote: "در لیست",
    increaseQty: "افزایش تعداد",
    decreaseQty: "کاهش تعداد",
    detail: {
      close: "بستن",
      spec: "مشخصات فنی",
      category: "دسته",
      compat: "سازگاری",
      euroNorm: "استاندارد اروپایی",
      finish: "پرداخت سطح",
      description: "توضیحات",
      variantLabel: "روکش",
      position: (current, total) => `${current} از ${total}`,
      prev: "قطعه قبلی",
      next: "قطعه بعدی",
      swipeHint: "برای مرور قطعات بکشید",
    },
  },

  quote: {
    fab: "لیست پیش‌فاکتور",
    sessionTag: "جلسه پیش‌فاکتور",
    title: "لیست پیش‌فاکتور شما",
    close: "بستن",
    empty: "لیست خالی است — قطعات را اضافه کنید.",
    sendWhatsApp: "ارسال از طریق واتساپ",
    sendWhatsAppArrow: "←",
    footerNote: "بدون پرداخت آنلاین · خط مستقیم B2B",
  },

  warranty: {
    tag: "پروتکل گارانتی",
    headline: "دو سال. هر واحد.",
    subline:
      "سخت‌افزار درجه ناوگان با مسیر ادعای ساده — بدون سطح‌بندی و بدون جزئیات پنهان در پی‌دی‌اف.",
    watermark: "۲۴",
    pillars: [
      { label: "پوشش", value: "کامل" },
      { label: "مدت", value: "۲۴ ماه" },
      { label: "ادعا", value: "مستقیم" },
    ],
    note: "نقص در روکش یا تناسب در استفاده عادی ناوگان تحت پوشش است. با شماره سفارش و کد قطعه تماس بگیرید.",
  },

  brands: {
    tag: "برندهای همکار",
    headline: "برندهای آماده ناوگان",
    subline:
      "برای فیلتر کاتالوگ یک برند را انتخاب کنید — همه واحدها تحت همان پروتکل گارانتی ارسال می‌شوند.",
    units: (count) => `${count.toLocaleString("fa-IR")} کد کالا`,
    browse: "مشاهده در کاتالوگ ←",
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
    header: "درخواست پیش‌فاکتور Aftruckparts",
    line: (code, name, qty) => `• ${code} — ${name} × ${qty}`,
    footer: "لطفاً قیمت و زمان تحویل را اعلام کنید.",
  },
};
