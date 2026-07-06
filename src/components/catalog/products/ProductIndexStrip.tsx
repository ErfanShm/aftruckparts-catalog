import { useEffect, useRef } from "react";

import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Product } from "@/locales";

type ProductIndexStripProps = {
  products: Product[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  compact?: boolean;
  minimal?: boolean;
  className?: string;
};

export function ProductIndexStrip({
  products,
  activeIndex,
  onNavigate,
  compact = false,
  minimal = false,
  className,
}: ProductIndexStripProps) {
  const { messages } = useLocale();
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  if (products.length <= 1) return null;

  return (
    <div
      className={cn(
        "min-w-0 shrink-0",
        minimal
          ? "py-1"
          : "rounded-xl border border-foreground/[0.06] bg-void/45 backdrop-blur-sm",
        !minimal && (compact ? "mx-0 px-3 py-2.5" : "px-3 py-3"),
        className,
      )}
    >
      <div className={cn("flex min-w-0 items-center gap-3", minimal ? "mb-1.5" : "mb-2")}>
        <span className={cn("section-tag min-w-0 truncate", minimal && "text-[9px]")}>
          {messages.product.detail.browsePartsLabel}
        </span>
        <span
          className="ms-auto shrink-0 font-mono text-[9px] tabular-nums text-foreground/35"
          dir="ltr"
        >
          {activeIndex + 1}/{products.length}
        </span>
      </div>
      <div
        ref={stripRef}
        className="flex min-w-0 max-w-full flex-nowrap gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="listbox"
        aria-label={messages.product.detail.browsePartsLabel}
      >
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="option"
            aria-selected={i === activeIndex}
            onClick={() => onNavigate(i)}
            className={cn(
              "finish-pill shrink-0 snap-center touch-manipulation whitespace-nowrap border border-transparent font-mono",
              minimal ? "px-2 py-1 text-[10px]" : "text-[11px]",
              i === activeIndex && "finish-pill-active border-foreground/[0.08]",
            )}
          >
            {p.spec}
          </button>
        ))}
      </div>
    </div>
  );
}
