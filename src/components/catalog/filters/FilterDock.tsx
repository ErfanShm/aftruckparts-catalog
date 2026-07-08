import type { ReactNode } from "react";
import { Search, X } from "lucide-react";

import type { FinishKey, ProductDasteh } from "@/data/products";
import { useStickyActive } from "@/hooks/use-sticky-active";
import { useLocale } from "@/lib/i18n";

import { FilterChips } from "./FilterChips";
import { FilterResultCount } from "./FilterResultCount";
import { FinishFilterPills } from "./FinishFilterPills";

type FilterDockProps = {
  activeDasteh: ProductDasteh | null;
  setActiveDasteh: (v: ProductDasteh | null) => void;
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
      <p className="filter-index-label mb-2.5 type-label-strong">{label}</p>
      {children}
    </div>
  );
}

export function FilterDock({
  activeDasteh,
  setActiveDasteh,
  activeFinish,
  setActiveFinish,
  query,
  setQuery,
  resultCount,
  productCount,
}: FilterDockProps) {
  const { messages } = useLocale();
  const { sentinelRef } = useStickyActive({ extraTop: 16 });

  const hasActiveConstraints = Boolean(activeDasteh || activeFinish || query);

  const clearAll = () => {
    setActiveDasteh(null);
    setActiveFinish(null);
    setQuery("");
  };

  return (
    <div className="relative hidden lg:block lg:self-stretch">
      <div
        ref={sentinelRef}
        className="pointer-events-none absolute start-0 top-0 h-px w-full"
        aria-hidden
      />
      <aside className="filter-sticky-dock w-full pe-1" aria-label={messages.catalog.heading}>
        <div className="filter-index-search">
          <Search className="h-3.5 w-3.5 shrink-0 text-brand/45" />
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
              className="text-muted-foreground transition-colors hover:text-brand-readable"
              aria-label={messages.catalog.clearSearch}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="mt-2 flex items-baseline justify-between gap-3">
          <span className="filter-index-label type-label-strong">{messages.catalog.heading}</span>
          <FilterResultCount count={resultCount} total={productCount} />
        </div>

        <div className="filter-index-rule" aria-hidden />

        <div className="space-y-7">
          <FilterGroup label={messages.catalog.dastehLabel}>
            <FilterChips
              orientation="vertical"
              showIndex
              items={messages.dastehLines.map((d) => ({ key: d.key, label: d.label }))}
              active={activeDasteh}
              onSelect={(key) =>
                setActiveDasteh(activeDasteh === key ? null : (key as ProductDasteh))
              }
            />
          </FilterGroup>

          <FilterGroup label={messages.catalog.finishLabel}>
            <FinishFilterPills
              items={messages.finishes.map((f) => ({ key: f.key, label: f.label }))}
              active={activeFinish}
              onSelect={(key) => setActiveFinish(activeFinish === key ? null : (key as FinishKey))}
            />
          </FilterGroup>

          {hasActiveConstraints && (
            <button type="button" onClick={clearAll} className="filter-index-clear">
              {messages.catalog.clearFilters}
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
