import { useMemo } from "react";

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
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
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
  const compact = products.length > 0 && products.length <= 6;
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
            compact
              ? cn(
                  "lg:grid-cols-6",
                  isFiltered && "auto-rows-[248px] lg:auto-rows-[minmax(268px,32vh)]",
                )
              : "grid-flow-dense lg:grid-cols-6 lg:auto-rows-[minmax(196px,auto)]",
          )}
        >
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              layout={layouts[i]!}
              quantity={quote[p.id] ?? 0}
              onAdd={() => onAdd(p.id)}
              onRemove={() => onRemove(p.id)}
              onOpen={() => onSelect(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
