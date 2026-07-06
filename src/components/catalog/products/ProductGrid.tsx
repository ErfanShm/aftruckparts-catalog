import { useMemo } from "react";

import { galleryLayoutForProduct } from "@/lib/gallery-collage";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";

import { ProductCard } from "./ProductCard";

const FILTERED_SHELL_MIN =
  "min-h-[min(55vh,calc(100svh-var(--header-offset)-10rem))]";

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

  const layouts = useMemo(
    () => products.map((product, index) => galleryLayoutForProduct(product, index, products.length)),
    [products],
  );

  return (
    <div
      className={cn(
        "catalog-results-shell [overflow-anchor:none]",
        isFiltered && FILTERED_SHELL_MIN,
      )}
    >
      {products.length === 0 ? (
        <div className="flex h-full min-h-[inherit] items-center justify-center">
          <p className="text-xs uppercase tracking-widest text-foreground/20">
            {messages.catalog.noResults}
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "grid grid-cols-2 auto-rows-[220px] items-stretch gap-3 lg:gap-4",
            compact
              ? "lg:grid-cols-6"
              : "grid-flow-dense lg:grid-cols-6 lg:auto-rows-[minmax(190px,auto)]",
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
