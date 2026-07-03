import type { FinishKey } from "@/data/products";
import { BRANDS } from "@/locales";
import { useLocale } from "@/lib/i18n";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { FilterChips } from "./FilterChips";

type MobileFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeBrand: string | null;
  setActiveBrand: (v: string | null) => void;
  activeFinish: FinishKey | null;
  setActiveFinish: (v: FinishKey | null) => void;
  resultCount: number;
  productCount: number;
};

export function MobileFilterSheet({
  open,
  onOpenChange,
  activeBrand,
  setActiveBrand,
  activeFinish,
  setActiveFinish,
  resultCount,
  productCount,
}: MobileFilterSheetProps) {
  const { messages } = useLocale();

  const clearAll = () => {
    setActiveBrand(null);
    setActiveFinish(null);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="glass-panel max-h-[85vh] rounded-t-2xl border-border-hair safe-bottom [&>button]:end-4 [&>button]:start-auto"
      >
        <SheetHeader className="text-start">
          <SheetTitle className="font-light">{messages.catalog.heading}</SheetTitle>
          <p className="text-xs text-muted-foreground">
            {messages.catalog.results(resultCount, productCount)}
          </p>
        </SheetHeader>

        <div className="mt-6 space-y-6 overflow-y-auto pb-4">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-widest text-foreground-muted/35">
              {messages.catalog.brandLabel}
            </p>
            <FilterChips
              items={BRANDS.map((b) => ({ key: b, label: b, mono: true }))}
              active={activeBrand}
              onSelect={(key) => setActiveBrand(activeBrand === key ? null : key)}
            />
          </div>
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-widest text-foreground-muted/35">
              {messages.catalog.finishLabel}
            </p>
            <FilterChips
              items={messages.finishes.map((f) => ({ key: f.key, label: f.label }))}
              active={activeFinish}
              onSelect={(key) => setActiveFinish(activeFinish === key ? null : (key as FinishKey))}
            />
          </div>
        </div>

        <SheetFooter className="mt-4 flex-row gap-2 sm:justify-between">
          {(activeBrand || activeFinish) && (
            <button
              type="button"
              onClick={clearAll}
              className="flex-1 rounded-full hair-border px-4 py-3 text-sm text-muted-foreground"
            >
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
