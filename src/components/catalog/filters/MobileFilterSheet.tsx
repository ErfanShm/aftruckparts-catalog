import type { FinishKey, ProductCategory } from "@/data/products";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { FilterChips } from "./FilterChips";
import { FinishFilterPills } from "./FinishFilterPills";

type MobileFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function MobileFilterSheet({
  open,
  onOpenChange,
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
}: MobileFilterSheetProps) {
  const { messages } = useLocale();

  const catalogBrands = [...new Set(products.map((p) => p.brand))].sort();

  const clearAll = () => {
    setActiveBrand(null);
    setActiveCategory(null);
    setActiveFinish(null);
    setQuery("");
  };

  const hasActiveConstraints = Boolean(activeBrand || activeCategory || activeFinish || query);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="glass-panel max-h-[85vh] rounded-t-2xl border-border-hair safe-bottom [&>button]:end-4 [&>button]:start-auto"
      >
        <SheetHeader className="text-start">
          <SheetTitle className="font-light">{messages.catalog.heading}</SheetTitle>
          <p className="filter-index-count ltr-embed mt-1">
            {messages.catalog.results(resultCount, productCount)}
          </p>
        </SheetHeader>

        <div className="filter-index-rule" aria-hidden />

        <div className="mt-6 space-y-7 overflow-y-auto pb-4">
          <div>
            <p className="filter-index-label mb-2.5">{messages.catalog.finishLabel}</p>
            <FinishFilterPills
              items={messages.finishes.map((f) => ({ key: f.key, label: f.label }))}
              active={activeFinish}
              onSelect={(key) => setActiveFinish(activeFinish === key ? null : (key as FinishKey))}
            />
          </div>
          <div>
            <p className="filter-index-label mb-2.5">{messages.catalog.brandLabel}</p>
            <FilterChips
              orientation="vertical"
              showIndex
              items={catalogBrands.map((b) => ({ key: b, label: b, mono: true }))}
              active={activeBrand}
              onSelect={(key) => setActiveBrand(activeBrand === key ? null : key)}
            />
          </div>
          <div>
            <p className="filter-index-label mb-2.5">{messages.catalog.categoryLabel}</p>
            <FilterChips
              orientation="vertical"
              showIndex
              items={messages.categories.map((c) => ({ key: c.key, label: c.label }))}
              active={activeCategory}
              onSelect={(key) =>
                setActiveCategory(activeCategory === key ? null : (key as ProductCategory))
              }
            />
          </div>
        </div>

        <SheetFooter className="mt-4 flex-row gap-2 sm:justify-between">
          {hasActiveConstraints && (
            <button type="button" onClick={clearAll} className="filter-index-clear flex-1 py-3">
              {messages.catalog.clearFilters}
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-full btn-primary px-4 py-3 text-sm font-medium"
          >
            {messages.catalog.applyFilters}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
