import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import type { ProductDasteh } from "@/data/products";
import { useStickyActive } from "@/hooks/use-sticky-active";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { MobileFilterSheet } from "./MobileFilterSheet";

type FilterRailProps = {
  activeDasteh: ProductDasteh | null;
  setActiveDasteh: (v: ProductDasteh | null) => void;
  query: string;
  setQuery: (v: string) => void;
  resultCount: number;
  productCount: number;
};

export function FilterRail({
  activeDasteh,
  setActiveDasteh,
  query,
  setQuery,
  resultCount,
  productCount,
}: FilterRailProps) {
  const { messages, formatDigits } = useLocale();
  const [sheetOpen, setSheetOpen] = useState(false);
  const { sentinelRef, active: stuck } = useStickyActive();

  const activeCount = activeDasteh ? 1 : 0;

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none h-px w-full lg:hidden" aria-hidden />
      <div
        className={cn(
          "filter-sticky-rail -mx-[var(--column-px)] mb-7 px-[var(--column-px)] py-2.5 lg:hidden",
          stuck && "filter-sticky-rail-active",
        )}
      >
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-2">
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
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="relative inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full border border-border-hair/30 px-3 text-xs text-muted-foreground touch-manipulation transition-colors hover:border-brand/20 hover:text-foreground"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>{messages.catalog.openFilters}</span>
            {activeCount > 0 && (
              <span className="type-digits absolute -top-1 end-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent/20 text-[9px] text-accent">
                {formatDigits(activeCount)}
              </span>
            )}
          </button>
        </div>

        {activeDasteh && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <ActivePill
              label={
                messages.dastehLines.find((d) => d.key === activeDasteh)?.label ?? activeDasteh
              }
              onRemove={() => setActiveDasteh(null)}
            />
          </div>
        )}
      </div>

      <MobileFilterSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        activeDasteh={activeDasteh}
        setActiveDasteh={setActiveDasteh}
        query={query}
        setQuery={setQuery}
        resultCount={resultCount}
        productCount={productCount}
      />
    </>
  );
}

function ActivePill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-terminal/25 bg-terminal/8 px-2.5 py-1 type-label text-terminal touch-manipulation transition-colors hover:border-terminal/40"
    >
      <span className="type-label">{label}</span>
      <X className="h-3 w-3 opacity-60" />
    </button>
  );
}
