import type { ProductDasteh } from "@/data/products";
import { useLocale } from "@/lib/i18n";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { FilterChips } from "./FilterChips";
import { FilterResultCount } from "./FilterResultCount";

type MobileFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeDasteh: ProductDasteh | null;
  setActiveDasteh: (v: ProductDasteh | null) => void;
  query: string;
  setQuery: (v: string) => void;
  resultCount: number;
  productCount: number;
};

export function MobileFilterSheet({
  open,
  onOpenChange,
  activeDasteh,
  setActiveDasteh,
  query,
  setQuery,
  resultCount,
  productCount,
}: MobileFilterSheetProps) {
  const { messages } = useLocale();

  const clearAll = () => {
    setActiveDasteh(null);
    setQuery("");
  };

  const hasActiveConstraints = Boolean(activeDasteh || query);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="glass-panel max-h-[85vh] rounded-t-2xl border-border-hair safe-bottom [&>button]:end-4 [&>button]:start-auto"
      >
        <SheetHeader className="text-start">
          <SheetTitle className="type-heading-display text-lg">{messages.catalog.heading}</SheetTitle>
          <FilterResultCount count={resultCount} total={productCount} className="mt-1" />
        </SheetHeader>

        <div className="filter-index-rule" aria-hidden />

        <div className="mt-6 space-y-7 overflow-y-auto pb-4 scrollbar-minimal">
          <div>
            <p className="filter-index-label mb-2.5 type-label-strong">{messages.catalog.dastehLabel}</p>
            <FilterChips
              orientation="vertical"
              showIndex
              items={messages.dastehLines.map((d) => ({ key: d.key, label: d.label }))}
              active={activeDasteh}
              onSelect={(key) =>
                setActiveDasteh(activeDasteh === key ? null : (key as ProductDasteh))
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
            className="flex-1 rounded-full btn-primary px-4 py-3 text-sm type-ui-strong"
          >
            {messages.catalog.applyFilters}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
