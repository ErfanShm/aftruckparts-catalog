import { useEffect, useMemo, useRef, useState } from "react";

import type { FinishKey, ProductDasteh } from "@/data/products";
import { PAGE_SECTION_INDEX } from "@/lib/page-sections";
import { useStableFilterScroll } from "@/hooks/use-stable-filter-scroll";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";

import { FilterDock } from "../filters/FilterDock";
import { FilterRail } from "../filters/FilterRail";
import { PageSection } from "../layout/PageSection";
import { SectionIntro } from "../layout/SectionIntro";
import { SectionRule } from "../layout/SectionRule";
import { ProductDetailModal } from "../products/ProductDetailModal";
import { ProductGrid } from "../products/ProductGrid";

type CatalogSectionProps = {
  filtered: Product[];
  quote: Record<string, number>;
  onAdd: (id: string, finishKey?: FinishKey) => void;
  onRemove: (id: string, finishKey?: FinishKey) => void;
  activeDasteh: ProductDasteh | null;
  setActiveDasteh: (v: ProductDasteh | null) => void;
  activeFinish: FinishKey | null;
  setActiveFinish: (v: FinishKey | null) => void;
  query: string;
  setQuery: (v: string) => void;
  productCount: number;
};

export function CatalogSection({
  filtered,
  quote,
  onAdd,
  onRemove,
  activeDasteh,
  setActiveDasteh,
  activeFinish,
  setActiveFinish,
  query,
  setQuery,
  productCount,
}: CatalogSectionProps) {
  const { messages } = useLocale();
  const [detailId, setDetailId] = useState<string | null>(null);

  const isFiltered =
    filtered.length < productCount ||
    Boolean(activeDasteh || activeFinish || query.trim());

  const filterSignature = `${filtered.length}-${activeDasteh ?? ""}-${activeFinish ?? ""}-${query.trim()}`;

  /** Structural changes only — avoids per-keystroke scroll fights on mobile. */
  const scrollSignature = `${filtered.length}-${activeDasteh ?? ""}-${activeFinish ?? ""}`;

  const resultsRef = useRef<HTMLDivElement>(null);
  const { prepareForFilterChange } = useStableFilterScroll(resultsRef, scrollSignature);

  const detailIndex = useMemo(
    () => (detailId ? filtered.findIndex((p) => p.id === detailId) : -1),
    [detailId, filtered],
  );

  const detailOpen = detailIndex >= 0;
  const activeProduct = detailOpen ? filtered[detailIndex] : null;

  useEffect(() => {
    if (detailId && !filtered.some((p) => p.id === detailId)) {
      setDetailId(null);
    }
  }, [detailId, filtered]);

  const filterProps = {
    activeDasteh,
    setActiveDasteh: (value: ProductDasteh | null) => {
      prepareForFilterChange();
      setActiveDasteh(value);
    },
    activeFinish,
    setActiveFinish: (value: FinishKey | null) => {
      prepareForFilterChange();
      setActiveFinish(value);
    },
    query,
    setQuery,
    resultCount: filtered.length,
    productCount,
  };

  return (
    <PageSection id="catalog" spine className="[overflow-anchor:none]">
      <div className="mb-10 md:mb-12">
        <SectionRule index={PAGE_SECTION_INDEX.catalog} className="mb-4 md:mb-5" />
        <SectionIntro
          tag={messages.catalog.galleryTag}
          title={messages.catalog.galleryHeading}
          hideTagMarker
        />
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-12">
        <FilterDock {...filterProps} />

        <div ref={resultsRef} className="min-w-0 [overflow-anchor:none]">
          <FilterRail {...filterProps} />
          <ProductGrid
            products={filtered}
            quote={quote}
            isFiltered={isFiltered}
            filterSignature={filterSignature}
            onAdd={onAdd}
            onRemove={onRemove}
            onSelect={(id) => setDetailId(id)}
          />
        </div>
      </div>

      {activeProduct && (
        <ProductDetailModal
          open={detailOpen}
          onOpenChange={(open) => !open && setDetailId(null)}
          products={filtered}
          activeIndex={detailIndex}
          onNavigate={(index) => setDetailId(filtered[index]?.id ?? null)}
          quote={quote}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      )}
    </PageSection>
  );
}
