import { motion, useReducedMotion } from "framer-motion";

import { getBrandAsset } from "@/data/brand-assets";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";
import { scrollToSection } from "@/lib/scrollToCatalog";
import { cn } from "@/lib/utils";

import { BrandLogo } from "./BrandLogo";
import { PageSection } from "./PageSection";
import { SectionRule } from "./SectionRule";

const ease = [0.22, 1, 0.36, 1] as const;

type BrandsBandProps = {
  products: Product[];
  onSelectBrand: (brand: string) => void;
};

function formatCount(n: number, locale: string) {
  return n.toLocaleString(locale === "fa" ? "fa-IR" : "en-US");
}

export function BrandsBand({ products, onSelectBrand }: BrandsBandProps) {
  const { messages, locale } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const { brands } = messages;

  const brandCounts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.brand] = (acc[p.brand] ?? 0) + 1;
    return acc;
  }, {});

  const sortedBrands = Object.entries(brandCounts).sort(([, a], [, b]) => b - a || 0);
  const leader = sortedBrands[0]?.[0];

  const handleBrand = (brand: string) => {
    onSelectBrand(brand);
    scrollToSection("catalog");
  };

  return (
    <PageSection id="brands" borderTop clipX className="relative !py-16 md:!py-24 lg:!py-28">
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease }}
      >
        <SectionRule index="02" className="mb-10 md:mb-12" />

        <div className="mb-10 max-w-xl md:mb-12">
          <p className="section-tag">{brands.tag}</p>
          <h2 className="mt-3 text-2xl font-extralight tracking-tight md:text-3xl lg:text-4xl">
            {brands.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {brands.subline}
          </p>
        </div>

        <ul
          className={cn(
            "grid gap-3 sm:gap-4",
            sortedBrands.length === 1 && "max-w-lg",
            sortedBrands.length >= 2 && "md:grid-cols-12",
          )}
        >
          {sortedBrands.map(([brand, count], i) => {
            const asset = getBrandAsset(brand);
            const isLeader = brand === leader;
            const indexLabel = String(i + 1).padStart(2, "0");
            const skuLabel = locale === "fa" ? "کد کالا" : count === 1 ? "SKU" : "SKUs";

            return (
              <motion.li
                key={brand}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: Math.min(i * 0.08, 0.2), duration: 0.55, ease }}
                className={cn(
                  sortedBrands.length >= 2 && (isLeader ? "md:col-span-7" : "md:col-span-5"),
                )}
              >
                <button
                  type="button"
                  onClick={() => handleBrand(brand)}
                  className={cn(
                    "brand-specimen group relative flex h-full w-full overflow-hidden rounded-2xl text-start",
                    "min-h-[220px] sm:min-h-[260px]",
                    isLeader && "sm:min-h-[280px] md:min-h-[300px]",
                    "border border-brand/15 transition-[border-color,box-shadow,transform] duration-500",
                    "hover:border-brand/35 hover:shadow-[0_20px_56px_-24px_color-mix(in_oklch,var(--brand)_50%,transparent)]",
                    "active:scale-[0.99]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
                  )}
                >
                  <img
                    src={asset.heroImage}
                    alt=""
                    aria-hidden
                    className="brand-specimen-photo absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  <div className="brand-specimen-scrim pointer-events-none absolute inset-0" />

                  <span className="absolute start-4 top-4 z-10 font-mono text-[9px] tracking-[0.35em] text-foreground/30">
                    {indexLabel}
                  </span>

                  <span className="absolute end-4 top-4 z-10 rounded-full border border-brand/15 bg-void/55 px-3 py-1.5 text-center backdrop-blur-sm">
                    <span className="font-mono-tech ltr-embed block text-sm font-light leading-none text-foreground/85">
                      {formatCount(count, locale)}
                    </span>
                    <span className="mt-0.5 block text-[8px] tracking-wide text-foreground-muted">
                      {skuLabel}
                    </span>
                  </span>

                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 py-14 sm:px-8">
                    <div
                      className={cn(
                        "flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.04]",
                        isLeader ? "px-4 py-2" : "px-3 py-2",
                      )}
                    >
                      <BrandLogo
                        brand={brand}
                        className={cn(
                          isLeader
                            ? "h-16 w-16 sm:h-20 sm:w-20"
                            : "h-10 w-28 sm:h-12 sm:w-36",
                          brand === "DAF" && "h-11 w-32 sm:h-12 sm:w-40",
                        )}
                        markClassName={cn(isLeader ? "h-16 w-16 text-xl" : "h-12 w-12 text-base")}
                      />
                    </div>
                  </div>

                  <span
                    className={cn(
                      "specimen-strip absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-1.5",
                      "px-4 pb-3 pt-10 text-[10px] tracking-wide",
                      "text-foreground/55 transition-colors duration-300",
                      "group-hover:text-brand-highlight",
                    )}
                  >
                    {brands.browse}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </PageSection>
  );
}
