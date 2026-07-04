import type { ReactNode } from "react";
import { Search, X } from "lucide-react";

import type { FinishKey, ProductCategory } from "@/data/products";
import { useStickyActive } from "@/hooks/use-sticky-active";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";

import { FilterChips } from "./FilterChips";
import { FinishFilterPills } from "./FinishFilterPills";

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

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[9px] uppercase tracking-[0.2em] text-foreground-muted/35">
        {label}
      </p>
      {children}
    </div>
  );
}

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
      <aside className="filter-sticky-dock w-full px-1" aria-label={messages.catalog.heading}>
        <div className="flex items-center gap-2 pb-3">
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

        <div className="mt-4 space-y-4">
          <FilterGroup label={messages.catalog.finishLabel}>
            <FinishFilterPills
              compact
              items={messages.finishes.map((f) => ({ key: f.key, label: f.label }))}
              active={activeFinish}
              onSelect={(key) => setActiveFinish(activeFinish === key ? null : (key as FinishKey))}
            />
          </FilterGroup>

          <div className="grid grid-cols-2 gap-x-3">
            <FilterGroup label={messages.catalog.brandLabel}>
              <FilterChips
                orientation="vertical"
                compact
                dense
                items={catalogBrands.map((b) => ({ key: b, label: b, mono: true }))}
                active={activeBrand}
                onSelect={(key) => setActiveBrand(activeBrand === key ? null : key)}
              />
            </FilterGroup>

            <FilterGroup label={messages.catalog.categoryLabel}>
              <FilterChips
                orientation="vertical"
                compact
                dense
                items={messages.categories.map((c) => ({ key: c.key, label: c.label }))}
                active={activeCategory}
                onSelect={(key) =>
                  setActiveCategory(activeCategory === key ? null : (key as ProductCategory))
                }
              />
            </FilterGroup>
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
