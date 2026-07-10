import { Minus, Plus } from "lucide-react";

import type { FinishKey } from "@/data/products";
import { useLocale } from "@/lib/i18n";
import { quoteLineQty } from "@/lib/quote-lines";
import { cn } from "@/lib/utils";

type FinishQtyStepperProps = {
  productId: string;
  finishKey: FinishKey;
  finishLabel: string;
  quote: Record<string, number>;
  onAdd: (productId: string, finishKey: FinishKey) => void;
  onRemove: (productId: string, finishKey: FinishKey) => void;
  variant?: "grid" | "detail" | "detail-mobile";
  hideFinishLabel?: boolean;
  className?: string;
};

function detailButtonClass(isGrid: boolean, isDetailMobile: boolean) {
  if (isGrid) return "h-7 w-7";
  if (isDetailMobile) return "h-9 w-9";
  return "h-11 w-11";
}

function detailIconClass(isGrid: boolean, isDetailMobile: boolean) {
  if (isGrid) return "h-3 w-3";
  if (isDetailMobile) return "h-3.5 w-3.5";
  return "h-4 w-4";
}

function finishTagClass(finishKey: FinishKey) {
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

export function FinishQtyStepper({
  productId,
  finishKey,
  finishLabel,
  quote,
  onAdd,
  onRemove,
  variant = "grid",
  hideFinishLabel = false,
  className,
}: FinishQtyStepperProps) {
  const { messages, dir, formatDigits } = useLocale();
  const qty = quoteLineQty(quote, productId, finishKey);
  const isGrid = variant === "grid";
  const isDetailMobile = variant === "detail-mobile";

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        hideFinishLabel ? "justify-end" : "justify-between",
        isGrid
          ? "rounded-full border border-foreground/10 bg-void/55 px-1 py-0.5 backdrop-blur-sm"
          : isDetailMobile
            ? "px-3 py-2"
            : "rounded-xl border border-border-hair/40 glass-panel px-4 py-3",
        className,
      )}
    >
      {!hideFinishLabel && (
        <span
          className={cn(
            "finish-specimen-tag shrink-0",
            finishTagClass(finishKey),
            isGrid && "px-2 py-0.5 text-[9px]",
          )}
        >
          {finishLabel}
        </span>
      )}

      {qty === 0 ? (
        <button
          type="button"
          onClick={() => onAdd(productId, finishKey)}
          aria-label={`${messages.product.addToQuote}${hideFinishLabel ? "" : ` · ${finishLabel}`}`}
          className={cn(
            "flex touch-manipulation items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04] text-foreground/58 transition-colors hover:bg-foreground/[0.07] hover:text-foreground/88 active:scale-95",
            detailButtonClass(isGrid, isDetailMobile),
          )}
        >
          <Plus className={detailIconClass(isGrid, isDetailMobile)} />
        </button>
      ) : (
        <div className={cn("flex items-center gap-1", dir === "rtl" && "flex-row-reverse")}>
          <button
            type="button"
            onClick={() => onRemove(productId, finishKey)}
            aria-label={messages.product.decreaseQty}
            className={cn(
              "flex touch-manipulation items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04] text-foreground/58 transition-colors hover:bg-foreground/[0.07] hover:text-foreground/88 active:scale-95",
              detailButtonClass(isGrid, isDetailMobile),
            )}
          >
            <Minus className={detailIconClass(isGrid, isDetailMobile)} />
          </button>
          <span
            className={cn(
              "text-center tabular-nums type-digits text-foreground/78",
              isGrid ? "w-5 text-[11px]" : isDetailMobile ? "w-7 text-xs" : "w-8 text-[13px]",
            )}
          >
            {formatDigits(qty)}
          </span>
          <button
            type="button"
            onClick={() => onAdd(productId, finishKey)}
            aria-label={messages.product.increaseQty}
            className={cn(
              "flex touch-manipulation items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04] text-foreground/58 transition-colors hover:bg-foreground/[0.07] hover:text-foreground/88 active:scale-95",
              detailButtonClass(isGrid, isDetailMobile),
            )}
          >
            <Plus className={detailIconClass(isGrid, isDetailMobile)} />
          </button>
        </div>
      )}
    </div>
  );
}

type DualFinishQuoteActionsProps = {
  productId: string;
  finishOffers: readonly FinishKey[];
  finishMap: Record<string, string>;
  quote: Record<string, number>;
  onAdd: (productId: string, finishKey: FinishKey) => void;
  onRemove: (productId: string, finishKey: FinishKey) => void;
  variant?: "grid" | "detail" | "detail-mobile";
  revealOnHover?: boolean;
  hideFinishLabel?: boolean;
  className?: string;
};

export function DualFinishQuoteActions({
  productId,
  finishOffers,
  finishMap,
  quote,
  onAdd,
  onRemove,
  variant = "grid",
  revealOnHover = false,
  hideFinishLabel = false,
  className,
}: DualFinishQuoteActionsProps) {
  const inQuote = finishOffers.some((finishKey) => quoteLineQty(quote, productId, finishKey) > 0);
  const isDetail = variant === "detail" || variant === "detail-mobile";
  const isDetailMobile = variant === "detail-mobile";

  return (
    <div
      className={cn(
        isDetail
          ? cn(
              "divide-y divide-foreground/[0.06] overflow-hidden rounded-xl border border-border-hair/40 glass-panel",
              isDetailMobile && "rounded-lg",
            )
          : "flex flex-col gap-1",
        variant === "grid" && "w-[min(100%,8.75rem)]",
        revealOnHover &&
          !inQuote &&
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-75",
        className,
      )}
    >
      {finishOffers.map((finishKey) => (
        <FinishQtyStepper
          key={finishKey}
          productId={productId}
          finishKey={finishKey}
          finishLabel={finishMap[finishKey] ?? finishKey}
          quote={quote}
          onAdd={onAdd}
          onRemove={onRemove}
          variant={variant}
          hideFinishLabel={hideFinishLabel}
          className={isDetail ? "border-0 bg-transparent" : undefined}
        />
      ))}
    </div>
  );
}
