import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import {
  CatalogImage,
  CATALOG_IMAGE_SIZES,
  prefetchCatalogImage,
} from "@/components/catalog/CatalogImage";
import { type GalleryLayout } from "@/lib/gallery-collage";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";
import type { FinishKey } from "@/data/products";
import { productQuoteTotal } from "@/lib/quote-lines";
import type { Product } from "@/locales";

import { DualFinishQuoteActions, FinishQtyStepper } from "./FinishQtyStepper";

type ProductCardProps = {
  product: Product;
  index: number;
  layout: GalleryLayout;
  quote: Record<string, number>;
  onAdd: (id: string, finishKey?: FinishKey) => void;
  onRemove: (id: string, finishKey?: FinishKey) => void;
  onOpen: () => void;
};

function variantStyles(variant: GalleryLayout["variant"]) {
  const base = { showFinish: true, showMarks: false };
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

function finishTagClass(finishKey: Product["finishKey"], dualFinish: boolean) {
  if (dualFinish) return "finish-specimen-tag-matte-glossy";
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
  quote,
  onAdd,
  onRemove,
  onOpen,
}: ProductCardProps) {
  const { messages, locale, formatIndex } = useLocale();
  const dualFinish = product.finishOffers.length > 1;
  const finishMap = Object.fromEntries(messages.finishes.map((f) => [f.key, f.label]));
  const quantity = productQuoteTotal(quote, product.id, product.finishOffers);
  const inQuote = quantity > 0;
  const [dualActionsReady, setDualActionsReady] = useState(inQuote);
  const [singleActionsReady, setSingleActionsReady] = useState(inQuote);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (inQuote) {
      setDualActionsReady(true);
      setSingleActionsReady(true);
    }
  }, [inQuote]);

  const showDualActions = dualFinish && (inQuote || dualActionsReady || !canHover);
  const showSingleActions = !dualFinish && (inQuote || singleActionsReady || !canHover);
  const singleFinishKey = product.finishOffers[0]!;
  const revealOnHoverClass =
    "opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-75";
  const indexLabel = formatIndex(index + 1);
  const styles = variantStyles(layout.variant);
  const organicY = layout.organicY;

  return (
    <article
      style={organicY ? ({ "--gallery-y": `${organicY}px` } as CSSProperties) : undefined}
      className={cn(
        "specimen-frame specimen-corner group relative h-full overflow-hidden transition-all duration-500 hover-capable:group-hover:border-brand/20",
        layout.mobileClassName,
        layout.desktopClassName,
        inQuote && "specimen-frame-active",
        layout.variant === "hero" && "ring-1 ring-inset ring-foreground/[0.05]",
        organicY > 0 && "gallery-organic",
        "focus-within:ring-2 focus-within:ring-inset focus-within:ring-accent/40",
      )}
      onPointerEnter={() => {
        if (dualFinish) setDualActionsReady(true);
        if (!dualFinish) setSingleActionsReady(true);
        prefetchCatalogImage(product.imageManifest.hero);
        for (const entry of product.imageManifest.gallery) {
          prefetchCatalogImage(entry);
        }
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${product.name}, ${product.finish}`}
        className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-none"
      />

      <span className="pointer-events-none absolute start-3.5 top-3.5 z-[2] type-digits ltr-embed text-[10px] tabular-nums text-foreground/35 transition-colors duration-500 group-hover:text-terminal/70">
        {indexLabel}
      </span>

      {styles.showCategory && (
        <span className="pointer-events-none absolute end-3 top-3 z-[2] type-meta text-foreground/28">
          {product.categoryLabel}
        </span>
      )}

      {styles.showFinish && product.showFinish && (
        <span
          className={cn(
            "finish-specimen-tag pointer-events-none absolute end-3 top-3 z-[2]",
            finishTagClass(product.finishKey, dualFinish),
          )}
        >
          {product.finish}
        </span>
      )}


      <div className="absolute inset-0 overflow-hidden bg-brand-panel">
        <CatalogImage
          manifest={product.imageManifest.hero}
          alt={product.name}
          priority={index < 8}
          placeholder
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
          "specimen-strip absolute inset-x-0 bottom-0 z-20 flex gap-2",
          "flex-col items-stretch",
          "min-[380px]:flex-row min-[380px]:items-end min-[380px]:justify-between",
          styles.strip,
        )}
      >
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "type-ui truncate leading-snug transition-colors duration-500",
              styles.title,
              inQuote ? "text-foreground" : "text-foreground/90",
            )}
          >
            {product.name}
          </h3>
          <p className="type-code mt-0.5 truncate ltr-embed text-foreground/40">
            {product.code}
          </p>
        </div>

        <div className="relative z-[3] flex shrink-0 justify-end self-end pb-0.5">
          {dualFinish ? (
            showDualActions ? (
              <DualFinishQuoteActions
                productId={product.id}
                finishOffers={product.finishOffers}
                finishMap={finishMap}
                quote={quote}
                onAdd={onAdd}
                onRemove={onRemove}
                variant="grid"
                revealOnHover={canHover && !inQuote}
              />
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(product.id, product.finishOffers[0]);
                }}
                aria-label={messages.product.addToQuote}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border border-foreground/10 bg-void/45 text-foreground/35 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100 hover:text-foreground/65 active:scale-95 [@media(hover:none)]:opacity-75",
                  styles.addButton,
                )}
              >
                <Plus className="h-3 w-3" />
              </button>
            )
          ) : showSingleActions ? (
            <FinishQtyStepper
              productId={product.id}
              finishKey={singleFinishKey}
              finishLabel={finishMap[singleFinishKey] ?? singleFinishKey}
              hideFinishLabel={!product.showFinish}
              quote={quote}
              onAdd={onAdd}
              onRemove={onRemove}
              variant="grid"
              className={canHover && !inQuote ? revealOnHoverClass : undefined}
            />
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAdd(product.id, singleFinishKey);
              }}
              aria-label={messages.product.addToQuote}
              className={cn(
                "flex items-center justify-center rounded-full border border-foreground/10 bg-void/45 text-foreground/35 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100 hover:text-foreground/65 active:scale-95 [@media(hover:none)]:opacity-75",
                styles.addButton,
              )}
            >
              <Plus className={styles.showAddLabel ? "h-3.5 w-3.5" : "h-3 w-3"} />
              {styles.showAddLabel && (
                <span className={cn("text-[10px]", locale === "en" ? "tracking-wide" : "tracking-normal")}>
                  {messages.product.addToQuote}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
