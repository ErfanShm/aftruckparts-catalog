import { motion } from "framer-motion";

import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";

import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  quote: Record<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  filterKey: string;
};

export function ProductGrid({
  products,
  quote,
  onAdd,
  onRemove,
  onSelect,
  filterKey,
}: ProductGridProps) {
  const { messages } = useLocale();

  if (products.length === 0) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <p className="text-xs uppercase tracking-widest text-foreground/20">
          {messages.catalog.noResults}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key={filterKey}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-12 lg:gap-5"
    >
      {products.map((p, i) => (
        <ProductCard
          key={p.id}
          product={p}
          index={i}
          span={p.span}
          quantity={quote[p.id] ?? 0}
          onAdd={() => onAdd(p.id)}
          onRemove={() => onRemove(p.id)}
          onOpen={() => onSelect(p.id)}
        />
      ))}
    </motion.div>
  );
}
