import { useEffect, useMemo, useRef, useState } from "react";

import type { FinishKey, ProductCategory } from "@/data/products";
import { usePreserveScrollOnChange } from "@/hooks/use-preserve-scroll";
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
  allProducts: Product[];
  quote: Record<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  activeBrand: string | null;
  setActiveBrand: (v: string | null) => void;
  activeCategory: ProductCategory | null;
  setActiveCategory: (v: ProductCategory | null) => void;
  activeFinish: FinishKey | null;
  setActiveFinish: (v: FinishKey | null) => void;
  query: string;
  setQuery: (v: string) => void;
  productCount: number;
};

export function CatalogSection({
  filtered,
  allProducts,
  quote,
  onAdd,
  onRemove,
  activeBrand,
  setActiveBrand,
  activeCategory,
  setActiveCategory,
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
    Boolean(activeBrand || activeCategory || activeFinish || query.trim());

  const filterSignature = `${filtered.length}-${activeBrand ?? ""}-${activeCategory ?? ""}-${activeFinish ?? ""}-${query.trim()}`;

  /** Structural changes only — avoids per-keystroke scroll fights on mobile. */
  const scrollSignature = `${filtered.length}-${activeBrand ?? ""}-${activeCategory ?? ""}-${activeFinish ?? ""}`;

  const resultsRef = useRef<HTMLDivElement>(null);
  usePreserveScrollOnChange(resultsRef, scrollSignature);

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
    products: allProducts,
    activeBrand,
    setActiveBrand,
    activeCategory,
    setActiveCategory,
    activeFinish,
    setActiveFinish,
    query,
    setQuery,
    resultCount: filtered.length,
    productCount,
  };

  return (
    <PageSection id="catalog" spine className="[overflow-anchor:none]">
      <div className="mb-8 md:mb-10">
        <SectionRule index="02" className="mb-6 md:mb-8" />
        <SectionIntro
          tag={messages.catalog.galleryTag}
          title={messages.catalog.galleryHeading}
          hideTagMarker
        />
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-10">
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
          allProducts={allProducts}
          activeIndex={detailIndex}
          onNavigate={(index) => setDetailId(filtered[index]?.id ?? null)}
          onSelectProduct={(id) => setDetailId(id)}
          quantity={quote[activeProduct.id] ?? 0}
          onAdd={() => onAdd(activeProduct.id)}
          onRemove={() => onRemove(activeProduct.id)}
        />
      )}
    </PageSection>
  );
}
