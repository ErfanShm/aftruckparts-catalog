import { CATALOG_IMAGE_MANIFEST } from "./catalog-image-manifest";

export type ProductCategory =
  | "model-badge"
  | "horsepower"
  | "emissions"
  | "technology"
  | "installation"
  | "accessory";

export type FinishKey = "matte" | "matte-glossy" | "glossy" | "steel";

export type CatalogPageProduct = {
  page: number;
  code: string;
  spec: string;
  brand: string;
  finishKey: FinishKey;
  span: "sm" | "md" | "lg" | "xl";
  names: { fa: string; en: string };
  category: ProductCategory;
  description: { fa: string; en: string };
  euroNorm?: string;
  modelCompat?: string;
  variantGroup?: string;
};

type EntryOpts = {
  page: number;
  spec: string;
  brand: string;
  finishKey: FinishKey;
  category: ProductCategory;
  names: { fa: string; en: string };
  description: { fa: string; en: string };
  span?: CatalogPageProduct["span"];
  euroNorm?: string;
  modelCompat?: string;
  variantGroup?: string;
  code?: string;
};

function entry({
  page,
  spec,
  brand,
  finishKey,
  category,
  names,
  description,
  span = "md",
  euroNorm,
  modelCompat,
  variantGroup,
  code,
}: EntryOpts): CatalogPageProduct {
  return {
    page,
    code: code ?? `ATP-${spec.replace(/\s+/g, "-")}`,
    spec,
    brand,
    finishKey,
    span,
    names,
    category,
    description,
    euroNorm,
    modelCompat,
    variantGroup,
  };
}

/** Sourced from public/af_catalog-5.pdf — images in public/catalog/. */
export const CATALOG_PAGES: CatalogPageProduct[] = [
  entry({
    page: 1,
    spec: "NH 12",
    brand: "Volvo",
    finishKey: "matte",
    category: "model-badge",
    names: { fa: "نشان NH 12", en: "NH 12 Model Badge" },
    description: {
      fa: "آرم مدل NH 12 ولوو برای کامیون‌های کلاسیک دماغ‌دار. این نشان با پوشش مات، اصالت ظاهری ناوگان‌های قدیمی‌تر را حفظ می‌کند و برای بازسازی و تعویض قطعات آسیب‌دیده بسیار پرتقاضاست.",
      en: "Volvo NH 12 model badge for classic conventional trucks. The matte finish preserves the authentic look of older fleets and is in high demand for restoration and accident replacement.",
    },
    span: "lg",
    modelCompat: "NH 12",
  }),
  entry({
    page: 2,
    spec: "FM9",
    brand: "Volvo",
    finishKey: "matte",
    category: "model-badge",
    names: { fa: "نشان FM9", en: "FM9 Model Badge" },
    description: {
      fa: "نشان سری FM9 ولوو برای کاربری‌های توزیع منطقه‌ای، خدمات شهری و راه‌سازی. موتور ۹ لیتری این سری آن را به گزینه‌ای اقتصادی و کارآمد برای مسافت‌های کوتاه و متوسط تبدیل کرده است.",
      en: "Volvo FM9 series badge for regional distribution, urban services, and construction work. The 9-litre engine makes this series an efficient choice for short and medium haul routes.",
    },
    modelCompat: "FM9",
  }),
  entry({
    page: 3,
    spec: "420",
    brand: "Volvo",
    finishKey: "matte",
    category: "horsepower",
    names: { fa: "نشان قدرت 420", en: "420 HP Badge" },
    description: {
      fa: "نشان عددی 420 اسب بخار برای نصب روی درب‌های بغل کابین. یکی از رایج‌ترین توان‌های موتور برای حمل‌ونقل استاندارد جاده‌ای با طراحی آیرودینامیک مطابق استاندارد ولوو.",
      en: "420 horsepower numeric badge for cab-side mounting. One of the most common power ratings for standard road transport, styled to match Volvo's aerodynamic cab design.",
    },
  }),
  entry({
    page: 4,
    spec: "460",
    brand: "Volvo",
    finishKey: "matte",
    category: "horsepower",
    names: { fa: "نشان قدرت 460", en: "460 HP Badge" },
    description: {
      fa: "نشان 460 اسب بخار با پوشش مات — یکی از پرفروش‌ترین تیپ‌های موتور در ناوگان حمل‌ونقل. تعادل عالی بین قدرت کشندگی و مصرف سوخت برای مسیرهای متنوع جاده‌ای.",
      en: "460 horsepower badge in matte finish — one of the best-selling engine ratings in road freight. Excellent balance of pulling power and fuel economy for varied routes.",
    },
    variantGroup: "hp-460",
  }),
  entry({
    page: 5,
    spec: "440",
    brand: "Volvo",
    finishKey: "matte",
    category: "horsepower",
    names: { fa: "نشان قدرت 440", en: "440 HP Badge" },
    description: {
      fa: "نشان 440 اسب بخار یک پله بالاتر از مدل پایه قرار می‌گیرد و برای کاربری‌های متنوع جاده‌ای ایده‌آل است. فونت و انحنا دقیقاً مطابق استاندارد کابین‌های ولوو طراحی شده‌اند.",
      en: "440 horsepower badge sits one step above the base model and is ideal for diverse road applications. Font and curvature match Volvo cab standards precisely.",
    },
  }),
  entry({
    page: 6,
    spec: "480",
    brand: "Volvo",
    finishKey: "matte",
    category: "horsepower",
    names: { fa: "نشان قدرت 480", en: "480 HP Badge" },
    description: {
      fa: "نشان 480 اسب بخار برای کامیون‌هایی که به قدرت بیشتر برای حمل بارهای سنگین‌تر در مسیرهای کوهستانی یا ترانزیت نیاز دارند. پوشش مات ظاهری اسپرت و صنعتی ایجاد می‌کند.",
      en: "480 horsepower badge for trucks needing extra power for heavier loads on mountain routes or transit corridors. Matte finish delivers a sporty, industrial look.",
    },
    span: "xl",
  }),
  entry({
    page: 7,
    spec: "VOLVO",
    brand: "Volvo",
    finishKey: "matte",
    category: "model-badge",
    names: { fa: "نشان VOLVO (FH12)", en: "VOLVO Grille Badge (FH12)" },
    description: {
      fa: "آرم اصلی حروف VOLVO برای جلوپنجره کامیون. این نسخه مات مخصوص مدل FH12 کالیبره شده — ابعاد، انحنا و پایه‌های نصب دقیقاً برای قرارگیری روی جلوپنجره این مدل افسانه‌ای طراحی شده‌اند.",
      en: "Primary VOLVO lettering badge for the truck grille. This matte version is calibrated for the FH12 — dimensions, curvature, and mounting points match the legendary model's front grille exactly.",
    },
    span: "lg",
    modelCompat: "FH12",
    variantGroup: "volvo-grille",
  }),
  entry({
    page: 8,
    spec: "EEV",
    brand: "Volvo",
    finishKey: "matte-glossy",
    category: "emissions",
    names: { fa: "نشان EEV", en: "EEV Emissions Badge" },
    description: {
      fa: "نشان EEV (خودروی سازگار با محیط زیست پیشرفته) — استانداردی بین یورو ۵ و یورو ۶. موتورهای بسیار کم‌دود که برای مجوز تردد در مناطق سبز اروپایی اهمیت داشتند.",
      en: "EEV (Enhanced Environmentally friendly Vehicle) badge — a stepping-stone standard between Euro 5 and Euro 6. Marks very clean-running engines important for low-emission zone access in Europe.",
    },
    euroNorm: "EEV",
  }),
  entry({
    page: 9,
    spec: "I-Shift",
    brand: "Volvo",
    finishKey: "matte-glossy",
    category: "technology",
    names: { fa: "نشان I-Shift", en: "I-Shift Badge" },
    description: {
      fa: "نشان گیربکس اتوماتیک I-Shift ولوو — انقلابی در رانندگی ماشین‌های سنگین. تعویض دنده‌ها بر اساس شیب جاده و وزن بار تنظیم می‌شود و ارزش کامیون در بازار دست‌دوم را بالا می‌برد.",
      en: "Volvo I-Shift automated transmission badge — a revolution in heavy truck driving. Gear changes adapt to road grade and load weight, boosting resale value.",
    },
    span: "lg",
  }),
  entry({
    page: 10,
    spec: "500",
    brand: "Volvo",
    finishKey: "matte-glossy",
    category: "horsepower",
    names: { fa: "نشان قدرت 500", en: "500 HP Badge" },
    description: {
      fa: "نشان 500 اسب بخار — نقطه عطف در ماشین‌های سنگین (به‌ویژه Volvo FH 500). طراحی شده برای ترانزیت‌های بین‌المللی سنگین با ظرفیت کامل بار. پوشش دوگانه جلوه‌ای درخشان روی درب کابین ایجاد می‌کند.",
      en: "500 horsepower badge — a milestone in heavy trucks, especially the Volvo FH 500. Built for full-load international transit. Dual matte-glossy finish creates a striking cab-side presence.",
    },
    span: "xl",
  }),
  entry({
    page: 11,
    spec: "EURO 4",
    brand: "Volvo",
    finishKey: "matte",
    category: "emissions",
    names: { fa: "نشان EURO 4", en: "EURO 4 Emissions Badge" },
    description: {
      fa: "نشان استاندارد آلایندگی یورو ۴ برای نسل‌های قبلی کامیون‌ها. تامین قطعات یدکی برای ناوگان‌های قدیمی‌تر که نیاز دارند ظاهر فابریک کامیون خود را در تصادفات یا بازسازی حفظ کنند.",
      en: "Euro 4 emissions standard badge for earlier-generation trucks. Replacement supply for older fleets maintaining factory appearance after accidents or rebuilds.",
    },
    euroNorm: "EURO 4",
  }),
  entry({
    page: 12,
    spec: "EURO 5",
    brand: "Volvo",
    finishKey: "matte",
    category: "emissions",
    names: { fa: "نشان EURO 5", en: "EURO 5 Emissions Badge" },
    description: {
      fa: "نشان یورو ۵ — کامیون‌های یورو ۵ هنوز بخش عظیمی از ناوگان حمل‌ونقل در خاورمیانه و آسیا را تشکیل می‌دهند. حفظ این نشان برای عبور از مرزها و نمایش مشخصات فنی به ماموران راهداری کاربرد دارد.",
      en: "Euro 5 badge — Euro 5 trucks still form a large share of fleets in the Middle East and Asia. Keeping this badge aids border crossings and technical inspections.",
    },
    euroNorm: "EURO 5",
  }),
  entry({
    page: 13,
    spec: "EURO 6",
    brand: "Volvo",
    finishKey: "matte-glossy",
    category: "emissions",
    names: { fa: "نشان EURO 6", en: "EURO 6 Emissions Badge" },
    description: {
      fa: "جدیدترین و پاک‌ترین استاندارد آلایندگی دیزل در اروپا. طراحی مدرن‌تر نسبت به یورو ۴ و ۵ — نشان‌دهنده تکنولوژی روز و مجوز تردد در تمام شهرهای بزرگ اروپایی.",
      en: "The latest and cleanest diesel emissions standard in Europe. Modern design versus Euro 4/5 badges — signals current technology and access to all major European cities.",
    },
    euroNorm: "EURO 6",
  }),
  entry({
    page: 14,
    spec: "460",
    brand: "Volvo",
    finishKey: "matte-glossy",
    category: "horsepower",
    names: { fa: "نشان قدرت 460", en: "460 HP Badge" },
    description: {
      fa: "همان نشان 460 اسب بخار پرفروش با پوشش لوکس‌تر مات و براق. به رانندگان و شرکت‌های حمل‌ونقل اجازه می‌دهد ظاهر کامیون‌هایشان را شخصی‌سازی کنند در حالی که قدرت موتور یکسان باقی می‌ماند.",
      en: "The same best-selling 460 HP badge in a premium matte-glossy finish. Lets fleets personalize truck appearance while keeping the same engine rating.",
    },
    variantGroup: "hp-460",
    code: "ATP-460-MG",
  }),
  entry({
    page: 15,
    spec: "540",
    brand: "Volvo",
    finishKey: "matte-glossy",
    category: "horsepower",
    names: { fa: "نشان قدرت 540", en: "540 HP Badge" },
    description: {
      fa: "موتور 540 اسب بخاری برای کشیدن بارهای سنگین در مسیرهای کوهستانی و ترانزیت‌های پرفشار. پوشش دوگانه برای رانندگانی که ظاهر اسپرت و لوکس می‌خواهند بسیار جذاب است.",
      en: "540 horsepower for heavy loads on mountain routes and high-pressure transit. Dual finish appeals to drivers wanting a sporty yet premium look.",
    },
  }),
  entry({
    page: 16,
    spec: "FH",
    brand: "Volvo",
    finishKey: "matte-glossy",
    category: "model-badge",
    names: { fa: "نشان FH", en: "FH Model Badge" },
    description: {
      fa: "نشان سری FH — پرچمدار ماشین‌های سنگین ولوو (Forward control High cab). معمولاً در نمای جلوی کامیون نصب می‌شود. نسخه مات و براق برای فیس‌لیفت و بازسازی کامیون تا ظاهری نزدیک به مدل‌های روز.",
      en: "FH series badge — flagship of Volvo heavy trucks (Forward control High cab). Usually mounted on the truck front. Matte-glossy version for facelifts bringing trucks closer to current models.",
    },
    modelCompat: "FH",
  }),
  entry({
    page: 17,
    spec: "VOLVO",
    brand: "Volvo",
    finishKey: "matte-glossy",
    category: "model-badge",
    names: { fa: "نشان VOLVO", en: "VOLVO Grille Badge" },
    description: {
      fa: "مهم‌ترین هویت بصری یک کامیون ولوو. نسخه مات و براق با بازتاب نور زیبا ظاهر جلوی کابین را به‌شدت مدرن می‌کند — مناسب جلوپنجره تمام مدل‌های FH.",
      en: "The primary visual identity of a Volvo truck. Matte-glossy finish with beautiful light reflection modernizes the cab front — fits FH series grilles.",
    },
    span: "xl",
    modelCompat: "FH",
    variantGroup: "volvo-grille",
    code: "ATP-VOLVO-MG",
  }),
  entry({
    page: 18,
    spec: "XF",
    brand: "DAF",
    finishKey: "matte",
    category: "model-badge",
    names: { fa: "نشان XF (DAF)", en: "XF Model Badge (DAF)" },
    description: {
      fa: "نشان مدل XF داف — یکی از محبوب‌ترین کشنده‌های اروپایی در مصرف بهینه سوخت و کابین جادار. طراحی انحصاری برای قالب بدنه DAF XF با ظاهری قدرتمند و صنعتی.",
      en: "DAF XF model badge — one of Europe's most popular tractors for fuel efficiency and spacious cabs. Exclusively designed for the DAF XF body with a powerful industrial look.",
    },
    modelCompat: "DAF XF",
  }),
  entry({
    page: 19,
    spec: "I-SAVE",
    brand: "Volvo",
    finishKey: "matte-glossy",
    category: "technology",
    names: { fa: "نشان I-SAVE", en: "I-SAVE Badge" },
    description: {
      fa: "تکنولوژی I-Save — پکیج موتوری پیشرفته ولوو که مصرف سوخت را در مسافت‌های طولانی تا حدود ۱۰٪ کاهش می‌دهد. نصب این آرم ارزش ذاتی ماشین و صرفه‌جویی سوخت را نشان می‌دهد.",
      en: "I-Save engine technology package that cuts fuel consumption on long hauls by up to 10%. This badge signals fuel-saving equipment and boosts intrinsic truck value.",
    },
  }),
  entry({
    page: 20,
    spec: "750",
    brand: "Volvo",
    finishKey: "matte-glossy",
    category: "horsepower",
    names: { fa: "نشان قدرت 750", en: "750 HP Badge" },
    description: {
      fa: "نشان 750 اسب بخار — متعلق به Volvo FH16، یکی از قوی‌ترین کشنده‌های تولید انبوه جهان. برای حمل بارهای فوق‌سنگین و ترافیکی. نهایت پرستیژ با طراحی لوکس مات و براق.",
      en: "750 horsepower badge for the Volvo FH16 — one of the world's most powerful production tractors. For extreme heavy haulage. Ultimate prestige in matte-glossy finish.",
    },
    span: "lg",
  }),
  entry({
    page: 21,
    spec: "Installation L",
    brand: "Volvo",
    finishKey: "matte",
    category: "installation",
    names: { fa: "راهنمای نصب L (کم‌صدا)", en: "Installation Badge L (Low Noise)" },
    description: {
      fa: "برچسب دایره‌ای سبز با حرف L (Lärmarm / کم‌صدا) همراه با راهنمای نصب FH/FM Pc.24. تاییدیه تولید صدای کم موتور و اگزوز — در اتریش و برخی کشورهای اروپایی برای تردد شبانه الزامی است.",
      en: "Green circular L badge (Lärmarm / Low Noise) with FH/FM Pc.24 installation guide. Certifies low engine and exhaust noise — required for night driving in Austria and parts of Europe.",
    },
    modelCompat: "FH / FM",
  }),
  entry({
    page: 22,
    spec: "Installation V",
    brand: "Volvo",
    finishKey: "matte",
    category: "installation",
    names: { fa: "راهنمای نصب V", en: "Installation Badge V" },
    description: {
      fa: "نشان دایره‌ای سبز V با راهنمای نصب FH/FM Pc.24. در سیستم جاده‌ای اروپا، این نشانگرها به ماموران راهداری اجازه می‌دهند کلاس فنی و محدودیت‌های کامیون را در یک نگاه تشخیص دهند.",
      en: "Green circular V badge with FH/FM Pc.24 installation guide. In Europe's road system, these markers let inspectors identify technical class and restrictions at a glance.",
    },
    modelCompat: "FH / FM",
  }),
  entry({
    page: 23,
    spec: "Installation IV",
    brand: "Volvo",
    finishKey: "matte",
    category: "installation",
    names: { fa: "راهنمای نصب IV", en: "Installation Badge IV" },
    description: {
      fa: "نشان دایره‌ای سبز با عدد رومی IV (چهار) و راهنمای نصب FH/FM Pc.24. نصب دقیق طبق الگوی کارخانه پرستیژ و قانونی بودن ناوگان را در جاده‌های ترانزیتی نشان می‌دهد.",
      en: "Green circular badge with Roman numeral IV and FH/FM Pc.24 installation guide. Factory-pattern placement signals fleet compliance on international transit routes.",
    },
    modelCompat: "FH / FM",
  }),
  entry({
    page: 24,
    spec: "Installation VI",
    brand: "Volvo",
    finishKey: "matte",
    category: "installation",
    names: { fa: "راهنمای نصب VI", en: "Installation Badge VI" },
    description: {
      fa: "نشان دایره‌ای سبز VI (شش) مرتبط با استاندارد آلایندگی EURO 6. اعلام می‌کند ماشین مجهز به بالاترین سطح فیلتراسیون دود است و شامل معافیت‌های تردد در مناطق حفاظت‌شده زیست‌محیطی می‌شود.",
      en: "Green circular VI badge linked to EURO 6 emissions. Declares highest-level exhaust filtration and eligibility for access in protected environmental zones.",
    },
    modelCompat: "FH / FM",
  }),
  entry({
    page: 25,
    spec: "Hub Steel",
    brand: "AF Accessories",
    finishKey: "steel",
    category: "accessory",
    names: { fa: "درپوش هاب استیل", en: "Steel Hub Cap" },
    description: {
      fa: "کاور استیل براق برای توپی چرخ — محافظت از مهره‌ها و محور در برابر زنگ‌زدگی، گل و نمک جاده. محبوب‌ترین آپشن برای استایل کلاسیک با انعکاس نور فوق‌العاده در شب.",
      en: "Polished steel hub cap protecting wheel nuts and axles from rust, mud, and road salt. The most popular option for classic styling with striking night-time reflection.",
    },
    modelCompat: "Universal",
  }),
  entry({
    page: 26,
    spec: "Hub Black",
    brand: "AF Accessories",
    finishKey: "glossy",
    category: "accessory",
    names: { fa: "درپوش هاب مشکی براق", en: "Glossy Black Hub Cap" },
    description: {
      fa: "درپوش پیانو بلک (مشکی براق) برای تم‌های مدرن و Dark Edition. در ترکیب با رینگ‌های دودی ظاهر خشن و اسپرتی به چرخ‌های کامیون‌های ولوو و داف می‌بخشد.",
      en: "Piano black (glossy black) hub cap for modern and Dark Edition themes. Pairs with smoked wheels for a bold, sporty look on Volvo and DAF trucks.",
    },
    modelCompat: "Universal",
  }),
];

/** Folder slug per catalog page — images live in public/catalog/products/{slug}/ */
export const PRODUCT_FOLDER_SLUGS: Record<number, string> = {
  1: "01-nh-12",
  2: "02-fm9",
  3: "03-420",
  4: "04-460",
  5: "05-440",
  6: "06-480",
  7: "07-volvo-fh12",
  8: "08-eev",
  9: "09-i-shift",
  10: "10-500",
  11: "11-euro-4",
  12: "12-euro-5",
  13: "13-euro-6",
  14: "14-460-mg",
  15: "15-540",
  16: "16-fh",
  17: "17-volvo",
  18: "18-xf-daf",
  19: "19-i-save",
  20: "20-750",
  21: "21-install-l",
  22: "22-install-v",
  23: "23-install-iv",
  24: "24-install-vi",
  25: "25-hub-steel",
  26: "26-hub-black",
};

export function productFolderSlug(page: number): string {
  const slug = PRODUCT_FOLDER_SLUGS[page];
  if (!slug) throw new Error(`Unknown catalog page: ${page}`);
  return slug;
}

export function productFolderPath(page: number): string {
  return `/catalog/products/${productFolderSlug(page)}`;
}

export function productHeroImagePath(page: number): string {
  const slug = productFolderSlug(page);
  return CATALOG_IMAGE_MANIFEST[slug]?.hero.src ?? "";
}

export function productGalleryImagePaths(page: number, category: ProductCategory): string[] {
  const slug = productFolderSlug(page);
  const manifest = CATALOG_IMAGE_MANIFEST[slug];
  if (!manifest) return [];

  if (category === "installation") {
    return [manifest.hero, manifest.install].filter(Boolean).map((entry) => entry!.src);
  }

  return [manifest.hero, manifest.mounted, manifest.detail]
    .filter(Boolean)
    .map((entry) => entry!.src);
}

/** @deprecated Use productHeroImagePath */
export function catalogImagePath(page: number) {
  return productHeroImagePath(page);
}
