import type { CSSProperties } from "react";
import { Minus, Plus } from "lucide-react";

import { CatalogImage, CATALOG_IMAGE_SIZES } from "@/components/catalog/CatalogImage";
import { type GalleryLayout } from "@/lib/gallery-collage";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";

type ProductCardProps = {
  product: Product;
  index: number;
  layout: GalleryLayout;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onOpen: () => void;
};

function variantStyles(variant: GalleryLayout["variant"]) {
  const base = { showFinish: true, showBrandRail: false, showMarks: false };
  switch (variant) {
    case "hero":
      return {
        ...base,
        title: "text-[15px] md:text-[16px]",
        strip: "px-4 pb-4 pt-20",
        showCategory: false,
        hoverScale: "group-hover:scale-[1.03]",
        addButton: "gap-1.5 px-3 py-2",
        showAddLabel: true,
      };
    case "banner":
      return {
        ...base,
        title: "text-[14px]",
        strip: "px-5 pb-3 pt-12",
        showCategory: false,
        hoverScale: "group-hover:scale-[1.02]",
        addButton: "gap-1 px-2.5 py-1.5",
        showAddLabel: true,
      };
    case "sky":
      return {
        ...base,
        title: "text-[13px]",
        strip: "px-3 pb-3 pt-16",
        showCategory: false,
        showBrandRail: true,
        hoverScale: "group-hover:scale-[1.04]",
        addButton: "h-7 w-7",
        showAddLabel: false,
      };
    case "tall":
      return {
        ...base,
        title: "text-[13px]",
        strip: "px-3 pb-3 pt-14",
        showCategory: false,
        showBrandRail: true,
        hoverScale: "group-hover:scale-[1.04]",
        addButton: "h-7 w-7",
        showAddLabel: false,
      };
    case "wide":
      return {
        ...base,
        title: "text-[14px]",
        strip: "px-4 pb-3 pt-12",
        showCategory: false,
        hoverScale: "group-hover:scale-[1.035]",
        addButton: "h-7 w-7",
        showAddLabel: false,
      };
    default:
      return {
        ...base,
        title: "text-[12px]",
        strip: "px-3 pb-2.5 pt-12",
        showCategory: false,
        hoverScale: "group-hover:scale-[1.04]",
        addButton: "h-7 w-7",
        showAddLabel: false,
      };
  }
}

function finishTagClass(finishKey: Product["finishKey"]) {
  switch (finishKey) {
    case "matte":
      return "finish-specimen-tag-matte";
    case "matte-glossy":
      return "finish-specimen-tag-matte-glossy";
    case "glossy":
      return "finish-specimen-tag-glossy";
    case "steel":
      return "finish-specimen-tag-steel";
  }
}

export function ProductCard({
  product,
  index,
  layout,
  quantity,
  onAdd,
  onRemove,
  onOpen,
}: ProductCardProps) {
  const { messages, dir } = useLocale();
  const inQuote = quantity > 0;
  const indexLabel = String(index + 1).padStart(2, "0");
  const styles = variantStyles(layout.variant);
  const organicY = layout.organicY;

  return (
    <article
      style={organicY ? ({ "--gallery-y": `${organicY}px` } as CSSProperties) : undefined}
      className={cn(
        "specimen-frame specimen-corner group relative h-full overflow-hidden transition-all duration-500",
        layout.mobileClassName,
        layout.desktopClassName,
        inQuote && "specimen-frame-active",
        layout.variant === "hero" && "ring-1 ring-inset ring-foreground/[0.05]",
        organicY > 0 && "gallery-organic",
        "focus-within:ring-2 focus-within:ring-inset focus-within:ring-accent/40",
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${product.name}, ${product.finish}`}
        className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-none"
      />

      <span className="pointer-events-none absolute start-3 top-3 z-[2] font-mono text-[10px] tabular-nums text-foreground/40 transition-colors duration-500 group-hover:text-foreground/60">
        {indexLabel}
      </span>

      {styles.showCategory && (
        <span className="pointer-events-none absolute end-3 top-3 z-[2] font-mono text-[9px] uppercase tracking-widest text-foreground/20">
          {product.categoryLabel}
        </span>
      )}

      {styles.showFinish && (
        <span
          className={cn(
            "finish-specimen-tag pointer-events-none absolute end-3 top-3 z-[2]",
            finishTagClass(product.finishKey),
          )}
        >
          {product.finish}
        </span>
      )}

      {styles.showBrandRail && (
        <span className="pointer-events-none absolute start-3 top-1/2 z-[2] -translate-y-1/2 font-mono text-[8px] uppercase tracking-[0.35em] text-foreground/12 [writing-mode:vertical-lr]">
          {product.brand}
        </span>
      )}

      <div className="absolute inset-0 overflow-hidden bg-brand-panel">
        <CatalogImage
          manifest={product.imageManifest.hero}
          alt=""
          priority={index < 4}
          placeholder={false}
          fill
          objectPosition={layout.imagePosition}
          sizes={CATALOG_IMAGE_SIZES.grid}
          className={cn(
            "brand-specimen-photo transition-all duration-500",
            styles.hoverScale,
            "group-hover:saturate-100 group-hover:brightness-100",
          )}
        />
        <div className="brand-specimen-scrim pointer-events-none absolute inset-0" aria-hidden />
      </div>

      <div
        className={cn(
          "specimen-strip absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-2",
          styles.strip,
        )}
      >
        <div className="min-w-0">
          <h3
            className={cn(
              "truncate leading-snug transition-colors duration-500",
              styles.title,
              inQuote ? "text-foreground" : "text-foreground/90",
            )}
          >
            {product.name}
          </h3>
          <p className="mt-0.5 font-mono text-[10px] tracking-wider text-foreground/45">
            {product.code}
            <span className="mx-1.5 opacity-40">·</span>
            {product.brand}
          </p>
        </div>

        <div className="relative z-[3] shrink-0 pb-0.5">
          {inQuote ? (
            <div
              className={cn(
                "flex items-center rounded-full border border-foreground/10 bg-void/55 px-0.5 backdrop-blur-sm",
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
                className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/40 transition-colors hover:text-foreground/70 active:scale-95"
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
                className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/40 transition-colors hover:text-foreground/70 active:scale-95"
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
                "flex items-center justify-center rounded-full border border-foreground/10 bg-void/45 text-foreground/35 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100 hover:text-foreground/65 active:scale-95 [@media(hover:none)]:opacity-75",
                styles.addButton,
              )}
            >
              <Plus className={styles.showAddLabel ? "h-3.5 w-3.5" : "h-3 w-3"} />
              {styles.showAddLabel && (
                <span className="text-[10px] tracking-wide">{messages.product.addToQuote}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
