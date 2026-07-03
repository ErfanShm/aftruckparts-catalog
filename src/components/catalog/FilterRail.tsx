import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import type { FinishKey } from "@/data/products";
import { useStickyActive } from "@/hooks/use-sticky-active";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { MobileFilterSheet } from "./MobileFilterSheet";

type FilterRailProps = {
  activeBrand: string | null;
  setActiveBrand: (v: string | null) => void;
  activeFinish: FinishKey | null;
  setActiveFinish: (v: FinishKey | null) => void;
  query: string;
  setQuery: (v: string) => void;
  resultCount: number;
  productCount: number;
};

export function FilterRail({
  activeBrand,
  setActiveBrand,
  activeFinish,
  setActiveFinish,
  query,
  setQuery,
  resultCount,
  productCount,
}: FilterRailProps) {
  const { messages } = useLocale();
  const [sheetOpen, setSheetOpen] = useState(false);
  const { sentinelRef, active: stuck } = useStickyActive();

  const activeCount = (activeBrand ? 1 : 0) + (activeFinish ? 1 : 0);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none h-px w-full lg:hidden" aria-hidden />
      <div
        className={cn(
          "filter-sticky-rail -mx-5 mb-6 px-5 py-3 lg:hidden",
          stuck && "filter-sticky-rail-active",
        )}
      >
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-2 pb-1">
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
            className="relative inline-flex h-10 shrink-0 items-center justify-center gap-1.5 px-2 text-xs text-muted-foreground touch-manipulation hover:text-foreground"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>{messages.catalog.openFilters}</span>
            {activeCount > 0 && (
              <span className="absolute -top-1 end-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent/20 text-[9px] text-accent">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {(activeBrand || activeFinish) && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {activeBrand && (
              <ActivePill label={activeBrand} onRemove={() => setActiveBrand(null)} mono />
            )}
            {activeFinish && (
              <ActivePill
                label={messages.finishes.find((f) => f.key === activeFinish)?.label ?? activeFinish}
                onRemove={() => setActiveFinish(null)}
              />
            )}
          </div>
        )}
      </div>

      <MobileFilterSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
        activeFinish={activeFinish}
        setActiveFinish={setActiveFinish}
        resultCount={resultCount}
        productCount={productCount}
      />
    </>
  );
}

function ActivePill({
  label,
  onRemove,
  mono,
}: {
  label: string;
  onRemove: () => void;
  mono?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex min-h-8 items-center gap-1 text-xs text-accent touch-manipulation"
    >
      <span className={mono ? "font-mono-tech ltr-embed" : undefined}>{label}</span>
      <X className="h-3 w-3 opacity-60" />
    </button>
  );
}
