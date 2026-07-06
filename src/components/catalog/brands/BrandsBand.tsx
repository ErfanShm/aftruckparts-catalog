import { motion, useReducedMotion } from "framer-motion";

import { getBrandAsset } from "@/data/brand-assets";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";
import { scrollToSection } from "@/lib/scrollToCatalog";
import { cn } from "@/lib/utils";

import { BrandLogo } from "./BrandLogo";
import { PageSection } from "../layout/PageSection";
import { SectionRule } from "../layout/SectionRule";

const ease = [0.22, 1, 0.36, 1] as const;

type BrandsBandProps = {
  products: Product[];
  onSelectBrand: (brand: string) => void;
};

function formatBrandCount(count: number, locale: string) {
  return count.toLocaleString(locale === "fa" ? "fa-IR" : "en-US");
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

  const handleBrand = (brand: string) => {
    onSelectBrand(brand);
    scrollToSection("catalog");
  };

  return (
    <PageSection id="brands" borderTop clipX className="relative">
      <SectionRule index="3" className="mb-10 md:mb-12" />
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col items-center text-center"
      >
        <p className="section-tag">{brands.tag}</p>
        <h2 className="font-display mt-4 max-w-lg text-[1.75rem] tracking-tight md:text-[2rem]">
          {brands.headline}
        </h2>
        <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-foreground md:text-sm">
          {brands.subline}
        </p>

        <ul
          className={cn(
            "mt-16 flex w-full max-w-5xl flex-col items-stretch gap-16 md:mt-20",
            sortedBrands.length >= 2 &&
              "md:flex-row md:items-start md:justify-center md:gap-8 lg:gap-12",
          )}
        >
          {sortedBrands.map(([brand, count], i) => {
            const asset = getBrandAsset(brand);

            return (
              <motion.li
                key={brand}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.08, 0.24), duration: 0.5, ease }}
                className={cn(
                  "flex flex-1 flex-col items-center",
                  sortedBrands.length >= 2 && "md:min-w-0 md:max-w-[320px] md:flex-1",
                )}
              >
                <button
                  type="button"
                  onClick={() => handleBrand(brand)}
                  aria-label={`${brand}, ${brands.units(count)}`}
                  className={cn(
                    "brand-marque group flex w-full flex-col items-center gap-6",
                    "transition-transform duration-500 ease-out active:scale-[0.98]",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand/30 focus-visible:ring-offset-4 focus-visible:ring-offset-void",
                  )}
                >
                  <div className="brand-marque-slot flex h-20 w-full max-w-[280px] items-center justify-center sm:h-24 md:h-28 lg:h-32">
                    {asset.mark ? (
                      <BrandLogo
                        brand={brand}
                        className="max-h-full max-w-full opacity-70 transition-all duration-500 group-hover:opacity-95 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <span className="font-mono text-lg tracking-wide text-foreground/50">
                        {brand}
                      </span>
                    )}
                  </div>

                  <span
                    className={cn(
                      "flex items-center gap-2 text-[10px] text-foreground/30 transition-colors duration-300 group-hover:text-terminal/65",
                      locale === "en" ? "font-mono-tech ltr-embed tracking-[0.12em]" : "font-display font-light"
                    )}
                    dir={locale === "fa" ? "rtl" : "ltr"}
                  >
                    <span className="tabular-nums text-foreground/45">
                      {formatBrandCount(count, locale)}
                    </span>
                    <span className="opacity-70">{brands.unitsLabel}</span>
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
