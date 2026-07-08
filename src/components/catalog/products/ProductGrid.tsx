import { useMemo } from "react";

import type { FinishKey } from "@/data/products";
import { galleryLayoutForProduct } from "@/lib/gallery-collage";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";

import { ProductCard } from "./ProductCard";

/** Stable shell when filtered — separate mobile/desktop floors to reduce collapse jumps. */
const FILTERED_SHELL_MIN =
  "min-h-[min(48vh,calc(100svh-var(--header-offset)-11rem))] lg:min-h-[min(58vh,calc(100svh-var(--header-offset)-7rem))]";
const FILTERED_EMPTY_MIN =
  "min-h-[min(52vh,calc(100svh-var(--header-offset)-10rem))] lg:min-h-[min(62vh,calc(100svh-var(--header-offset)-6rem))]";

type ProductGridProps = {
  products: Product[];
  quote: Record<string, number>;
  isFiltered: boolean;
  filterSignature: string;
  onAdd: (id: string, finishKey?: FinishKey) => void;
  onRemove: (id: string, finishKey?: FinishKey) => void;
  onSelect: (id: string) => void;
};

export function ProductGrid({
  products,
  quote,
  isFiltered,
  filterSignature,
  onAdd,
  onRemove,
  onSelect,
}: ProductGridProps) {
  const { messages } = useLocale();
  const isEmpty = products.length === 0;

  const layouts = useMemo(
    () =>
      products.map((product, index) => galleryLayoutForProduct(product, index, products.length)),
    [products],
  );

  return (
    <div
      className={cn(
        "catalog-results-shell [overflow-anchor:none]",
        isFiltered && (isEmpty ? FILTERED_EMPTY_MIN : FILTERED_SHELL_MIN),
      )}
    >
      {products.length === 0 ? (
        <div className="empty-state h-full min-h-[inherit]">
          <span className="empty-state-icon" aria-hidden />
          <p className="empty-state-label">{messages.catalog.noResults}</p>
          <p className="empty-state-hint">{messages.catalog.clearFilters}</p>
        </div>
      ) : (
        <div
          className={cn(
            "grid grid-cols-2 auto-rows-[228px] items-stretch gap-3.5 sm:gap-4 lg:gap-5",
            isFiltered && "auto-rows-[248px] lg:auto-rows-[268px]",
          )}
        >
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              layout={layouts[i]!}
              quote={quote}
              onAdd={onAdd}
              onRemove={onRemove}
              onOpen={() => onSelect(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
