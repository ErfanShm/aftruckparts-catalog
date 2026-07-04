import { Search, X } from "lucide-react";

import type { FinishKey, ProductCategory } from "@/data/products";
import { useStickyActive } from "@/hooks/use-sticky-active";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";

import { FilterChips } from "./FilterChips";

type FilterDockProps = {
  products: Product[];
  activeBrand: string | null;
  setActiveBrand: (v: string | null) => void;
  activeCategory: ProductCategory | null;
  setActiveCategory: (v: ProductCategory | null) => void;
  activeFinish: FinishKey | null;
  setActiveFinish: (v: FinishKey | null) => void;
  query: string;
  setQuery: (v: string) => void;
  resultCount: number;
  productCount: number;
};

export function FilterDock({
  products,
  activeBrand,
  setActiveBrand,
  activeCategory,
  setActiveCategory,
  activeFinish,
  setActiveFinish,
  query,
  setQuery,
  resultCount,
  productCount,
}: FilterDockProps) {
  const { messages } = useLocale();
  const { sentinelRef } = useStickyActive({ extraTop: 16 });

  const catalogBrands = [...new Set(products.map((p) => p.brand))].sort();

  const clearAll = () => {
    setActiveBrand(null);
    setActiveCategory(null);
    setActiveFinish(null);
  };

  return (
    <div className="relative hidden min-h-full lg:block">
      <div ref={sentinelRef} className="pointer-events-none absolute start-0 top-0 h-px w-full" aria-hidden />
      <aside
        className="filter-sticky-dock w-full px-1"
        aria-label={messages.catalog.heading}
      >
        <div className="flex items-center gap-2 pb-4">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={messages.catalog.searchPlaceholder}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-accent"
              aria-label={messages.catalog.clearSearch}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <p className="font-mono-tech ltr-embed text-[10px] text-foreground-muted/40">
          {messages.catalog.results(resultCount, productCount)}
        </p>

        <div className="mt-8 space-y-6">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-widest text-foreground-muted/35">
              {messages.catalog.brandLabel}
            </p>
            <FilterChips
              orientation="vertical"
              compact
              items={catalogBrands.map((b) => ({ key: b, label: b, mono: true }))}
              active={activeBrand}
              onSelect={(key) => setActiveBrand(activeBrand === key ? null : key)}
            />
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-widest text-foreground-muted/35">
              {messages.catalog.categoryLabel}
            </p>
            <FilterChips
              orientation="vertical"
              compact
              items={messages.categories.map((c) => ({ key: c.key, label: c.label }))}
              active={activeCategory}
              onSelect={(key) =>
                setActiveCategory(activeCategory === key ? null : (key as ProductCategory))
              }
            />
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-widest text-foreground-muted/35">
              {messages.catalog.finishLabel}
            </p>
            <FilterChips
              orientation="vertical"
              compact
              items={messages.finishes.map((f) => ({ key: f.key, label: f.label }))}
              active={activeFinish}
              onSelect={(key) => setActiveFinish(activeFinish === key ? null : (key as FinishKey))}
            />
          </div>
          {(activeBrand || activeCategory || activeFinish) && (
            <button
              type="button"
              onClick={clearAll}
              className="text-[10px] text-muted-foreground transition-colors hover:text-accent"
            >
              {messages.catalog.clearFilters}
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
