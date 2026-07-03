import { useMemo, useState } from "react";

import type { FinishKey } from "@/data/products";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";

import { FilterDock } from "./FilterDock";
import { FilterRail } from "./FilterRail";
import { PageSection } from "./PageSection";
import { ProductDetailModal } from "./ProductDetailModal";
import { ProductGrid } from "./ProductGrid";
import { SectionIntro } from "./SectionIntro";

type CatalogSectionProps = {
  filtered: Product[];
  quote: Record<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  activeBrand: string | null;
  setActiveBrand: (v: string | null) => void;
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
  activeBrand,
  setActiveBrand,
  activeFinish,
  setActiveFinish,
  query,
  setQuery,
  productCount,
}: CatalogSectionProps) {
  const { messages } = useLocale();
  const [detailId, setDetailId] = useState<string | null>(null);

  const detailIndex = useMemo(
    () => (detailId ? filtered.findIndex((p) => p.id === detailId) : -1),
    [detailId, filtered],
  );

  const detailOpen = detailIndex >= 0;
  const activeProduct = detailOpen ? filtered[detailIndex] : null;

  const filterKey = `${activeBrand ?? ""}-${activeFinish ?? ""}-${query}`;

  const filterProps = {
    activeBrand,
    setActiveBrand,
    activeFinish,
    setActiveFinish,
    query,
    setQuery,
    resultCount: filtered.length,
    productCount,
  };

  return (
    <PageSection id="catalog">
      <div className="mb-10 md:mb-12">
        <SectionIntro
          tag={messages.catalog.galleryTag}
          title={messages.catalog.galleryHeading}
        />
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(220px,260px)_1fr] lg:gap-10">
        <FilterDock {...filterProps} />

        <div className="min-w-0">
          <FilterRail {...filterProps} />
          <ProductGrid
            products={filtered}
            quote={quote}
            onAdd={onAdd}
            onRemove={onRemove}
            onSelect={(id) => setDetailId(id)}
            filterKey={filterKey}
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
          quantity={quote[activeProduct.id] ?? 0}
          onAdd={() => onAdd(activeProduct.id)}
          onRemove={() => onRemove(activeProduct.id)}
        />
      )}
    </PageSection>
  );
}
