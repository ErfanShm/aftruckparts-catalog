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
  variant?: "grid" | "detail";
  className?: string;
};

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
  className,
}: FinishQtyStepperProps) {
  const { messages, dir, formatDigits } = useLocale();
  const qty = quoteLineQty(quote, productId, finishKey);
  const isGrid = variant === "grid";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2",
        isGrid
          ? "rounded-full border border-foreground/10 bg-void/55 px-1 py-0.5 backdrop-blur-sm"
          : "rounded-xl border border-border-hair/40 glass-panel px-4 py-3",
        className,
      )}
    >
      <span
        className={cn(
          "finish-specimen-tag shrink-0",
          finishTagClass(finishKey),
          isGrid && "px-2 py-0.5 text-[9px]",
        )}
      >
        {finishLabel}
      </span>

      {qty === 0 ? (
        <button
          type="button"
          onClick={() => onAdd(productId, finishKey)}
          aria-label={`${messages.product.addToQuote} · ${finishLabel}`}
          className={cn(
            "flex touch-manipulation items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04] text-foreground/58 transition-colors hover:bg-foreground/[0.07] hover:text-foreground/88 active:scale-95",
            isGrid ? "h-7 w-7" : "h-11 w-11",
          )}
        >
          <Plus className={isGrid ? "h-3 w-3" : "h-4 w-4"} />
        </button>
      ) : (
        <div className={cn("flex items-center gap-1", dir === "rtl" && "flex-row-reverse")}>
          <button
            type="button"
            onClick={() => onRemove(productId, finishKey)}
            aria-label={messages.product.decreaseQty}
            className={cn(
              "flex touch-manipulation items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04] text-foreground/58 transition-colors hover:bg-foreground/[0.07] hover:text-foreground/88 active:scale-95",
              isGrid ? "h-7 w-7" : "h-11 w-11",
            )}
          >
            <Minus className={isGrid ? "h-3 w-3" : "h-4 w-4"} />
          </button>
          <span
            className={cn(
              "text-center tabular-nums type-digits text-foreground/78",
              isGrid ? "w-5 text-[11px]" : "w-8 text-[13px]",
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
              isGrid ? "h-7 w-7" : "h-11 w-11",
            )}
          >
            <Plus className={isGrid ? "h-3 w-3" : "h-4 w-4"} />
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
  variant?: "grid" | "detail";
  revealOnHover?: boolean;
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
  className,
}: DualFinishQuoteActionsProps) {
  const inQuote = finishOffers.some((finishKey) => quoteLineQty(quote, productId, finishKey) > 0);

  return (
    <div
      className={cn(
        variant === "detail"
          ? "divide-y divide-foreground/[0.06] overflow-hidden rounded-xl border border-border-hair/40 glass-panel"
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
          className={variant === "detail" ? "border-0 bg-transparent" : undefined}
        />
      ))}
    </div>
  );
}
