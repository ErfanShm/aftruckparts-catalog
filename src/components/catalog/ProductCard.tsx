import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";

type ProductCardProps = {
  product: Product;
  index: number;
  span: Product["span"];
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onOpen: () => void;
};

function bentoLayout(span: Product["span"]) {
  switch (span) {
    case "xl":
      return "md:col-span-2 md:row-span-2 lg:col-span-8 lg:row-span-2 min-h-[360px] lg:min-h-[500px]";
    case "lg":
      return "md:col-span-2 lg:col-span-6 lg:row-span-2 min-h-[320px] lg:min-h-[440px]";
    case "sm":
      return "lg:col-span-4 min-h-[260px] lg:min-h-[300px]";
    default:
      return "lg:col-span-4 min-h-[280px] lg:min-h-[320px]";
  }
}

function nameSize(span: Product["span"]) {
  switch (span) {
    case "xl":
      return "text-[15px]";
    case "lg":
      return "text-[14px]";
    case "sm":
      return "text-[12px]";
    default:
      return "text-[13px]";
  }
}

const ORGANIC_OFFSETS = [0, 4, 0, 8];

export function ProductCard({
  product,
  index,
  span,
  quantity,
  onAdd,
  onRemove,
  onOpen,
}: ProductCardProps) {
  const { messages, dir } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const inQuote = quantity > 0;
  const indexLabel = String(index + 1).padStart(2, "0");
  const organicY = reduced ? 0 : ORGANIC_OFFSETS[index % ORGANIC_OFFSETS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: Math.min(index * 0.025, 0.12),
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      }}
      style={
        organicY ? ({ "--gallery-y": `${organicY}px` } as CSSProperties) : undefined
      }
      className={cn("group gallery-organic", bentoLayout(span))}
    >
      <div
        className={cn(
          "specimen-frame specimen-corner relative h-full w-full transition-all duration-500",
          inQuote && "specimen-frame-active",
          "focus-within:ring-2 focus-within:ring-inset focus-within:ring-accent/40",
        )}
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={product.name}
          className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-none"
        />

        <span className="pointer-events-none absolute start-3 top-3 z-20 font-mono text-[10px] tabular-nums text-brand/20 transition-colors duration-500 group-hover:text-brand/40">
          {indexLabel}
        </span>

        {span === "xl" && (
          <span className="pointer-events-none absolute end-3 top-3 z-20 font-mono text-[9px] uppercase tracking-widest text-foreground/10">
            {product.euro}
          </span>
        )}

        <div className="absolute inset-0 overflow-hidden">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-[0.85] mix-blend-luminosity transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:mix-blend-normal group-focus-within:opacity-100 group-focus-within:mix-blend-normal"
          />
        </div>

        <div className="specimen-strip absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-2 px-3 pb-2.5 pt-12 transition-opacity duration-500">
          <div className="min-w-0">
            <h3
              className={cn(
                "truncate leading-snug transition-colors duration-500",
                nameSize(span),
                inQuote ? "text-foreground" : "text-foreground/90",
              )}
            >
              {product.name}
            </h3>
            <p className="mt-0.5 font-mono text-[10px] tracking-wider text-foreground/40">
              {product.code}
              <span className="mx-1.5 opacity-40">·</span>
              {product.brand}
            </p>
          </div>

          <div className="relative z-30 shrink-0 pb-0.5">
            {inQuote ? (
              <div
                className={cn(
                  "flex items-center rounded-full border border-foreground/10 bg-void/50 px-0.5 backdrop-blur-sm",
                  dir === "rtl" && "flex-row-reverse",
                )}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                  aria-label={messages.product.decreaseQty}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/40 hover:text-foreground/70 active:scale-95 transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center text-[11px] tabular-nums text-foreground/70">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd();
                  }}
                  aria-label={messages.product.increaseQty}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/40 hover:text-foreground/70 active:scale-95 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd();
                }}
                aria-label={messages.product.addToQuote}
                className={cn(
                  "flex items-center justify-center rounded-full border border-foreground/10 bg-void/40 text-foreground/30 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100 hover:text-foreground/60 active:scale-95 [@media(hover:none)]:opacity-70",
                  span === "sm" ? "h-7 w-7" : "gap-1 px-2.5 py-1.5",
                )}
              >
                <Plus className="h-3.5 w-3.5" />
                {span !== "sm" && (
                  <span className="text-[10px] tracking-wide">{messages.product.addToQuote}</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
