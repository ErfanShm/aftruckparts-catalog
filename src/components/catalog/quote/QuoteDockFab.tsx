import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type QuoteDockFabProps = {
  label: string;
  count: number;
  onClick: () => void;
};

export function QuoteDockFab({ label, count, onClick }: QuoteDockFabProps) {
  const { formatDigits } = useLocale();
  const showCount = count > 0;

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-40",
        "bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))]",
        "max-md:inset-x-4 max-md:flex max-md:justify-center",
        "md:bottom-6 md:end-6 md:start-auto",
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="pointer-events-auto block max-w-full touch-manipulation"
      >
        <div
          className={cn(
            "flex max-w-full items-center rounded-full border border-foreground/[0.08] bg-void/90 py-2.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)]",
            showCount ? "gap-2 px-3.5 sm:px-4" : "px-4",
            showCount && "border-brand/25",
          )}
        >
          <span className="min-w-0 truncate text-[13px] text-foreground/85">{label}</span>
          {showCount && (
            <span
              className="shrink-0 rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-medium tabular-nums text-brand-highlight"
              aria-label={formatDigits(count)}
            >
              {formatDigits(count)}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
