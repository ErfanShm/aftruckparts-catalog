import { ChevronLeft, ChevronRight } from "lucide-react";

import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Product } from "@/locales";

type ProductIndexStripProps = {
  products: Product[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  className?: string;
};

function partNavLabel(product: Product) {
  return product.spec.replace(/^Installation\s+/i, "");
}

export function ProductIndexStrip({
  products,
  activeIndex,
  onNavigate,
  className,
}: ProductIndexStripProps) {
  const { dir, formatDigits } = useLocale();

  if (products.length <= 1) return null;

  const prev = activeIndex > 0 ? products[activeIndex - 1] : null;
  const next = activeIndex < products.length - 1 ? products[activeIndex + 1] : null;
  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <nav
      className={cn("flex min-w-0 items-center gap-2 border-t border-foreground/[0.06] pt-3", className)}
      aria-label="Part navigation"
    >
      <button
        type="button"
        disabled={!prev}
        onClick={() => prev && onNavigate(activeIndex - 1)}
        className={cn(
          "flex min-w-0 max-w-[38%] items-center gap-1 rounded-lg py-1.5 text-xs text-foreground/45 transition-colors touch-manipulation",
          prev && "hover:text-foreground/75",
          !prev && "opacity-30",
        )}
      >
        <PrevIcon className="h-3.5 w-3.5 shrink-0" />
        <span className="type-code ltr-embed truncate">{prev ? partNavLabel(prev) : "—"}</span>
      </button>

      <span className="type-code mx-auto shrink-0 tabular-nums text-foreground/30" dir="ltr">
        {formatDigits(`${activeIndex + 1}/${products.length}`)}
      </span>

      <button
        type="button"
        disabled={!next}
        onClick={() => next && onNavigate(activeIndex + 1)}
        className={cn(
          "flex min-w-0 max-w-[38%] items-center justify-end gap-1 rounded-lg py-1.5 text-xs text-foreground/45 transition-colors touch-manipulation",
          next && "hover:text-foreground/75",
          !next && "opacity-30",
        )}
      >
        <span className="type-code ltr-embed truncate">{next ? partNavLabel(next) : "—"}</span>
        <NextIcon className="h-3.5 w-3.5 shrink-0" />
      </button>
    </nav>
  );
}
