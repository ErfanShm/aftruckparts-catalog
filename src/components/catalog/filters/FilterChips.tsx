import { cn } from "@/lib/utils";

type FilterChipsProps = {
  items: { key: string; label: string; mono?: boolean }[];
  active: string | null;
  onSelect: (key: string) => void;
  orientation?: "horizontal" | "vertical";
  showIndex?: boolean;
};

export function FilterChips({
  items,
  active,
  onSelect,
  orientation = "horizontal",
  showIndex = false,
}: FilterChipsProps) {
  const vertical = orientation === "vertical";

  return (
    <div className={vertical ? "flex flex-col" : "flex flex-wrap gap-x-4 gap-y-1"}>
      {items.map((item, index) => {
        const isActive = active === item.key;

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            className={cn(
              "touch-manipulation transition-colors duration-200",
              vertical
                ? cn("filter-index-row", isActive && "filter-index-row-active")
                : cn(
                    "rounded-md px-0 py-1 text-xs",
                    isActive ? "filter-index-toggle-active" : "filter-index-toggle",
                  ),
            )}
          >
            {vertical && showIndex && (
              <span className="filter-index-num ltr-embed flex items-center justify-center">
                {isActive ? (
                  <span className="h-[3px] w-[3px] rotate-45 bg-brand-highlight" aria-hidden />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
            )}
            <span
              className={cn(
                "min-w-0 text-start",
                item.mono ? "font-mono-tech ltr-embed whitespace-nowrap text-[11px]" : "leading-snug",
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
