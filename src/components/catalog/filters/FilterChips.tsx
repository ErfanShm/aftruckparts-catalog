import { cn } from "@/lib/utils";

type FilterChipsProps = {
  items: { key: string; label: string; mono?: boolean }[];
  active: string | null;
  onSelect: (key: string) => void;
  orientation?: "horizontal" | "vertical";
  compact?: boolean;
  dense?: boolean;
};

export function FilterChips({
  items,
  active,
  onSelect,
  orientation = "horizontal",
  compact = false,
  dense = false,
}: FilterChipsProps) {
  const vertical = orientation === "vertical";

  return (
    <div
      className={
        vertical
          ? "flex flex-col gap-0.5"
          : "flex flex-wrap gap-x-4 gap-y-1"
      }
    >
      {items.map((item) => {
        const isActive = active === item.key;

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            className={cn(
              "touch-manipulation transition-colors duration-200",
              vertical
                ? cn(
                    dense
                      ? "py-0.5 text-xs leading-snug"
                      : compact
                        ? "py-1 text-sm"
                        : "py-1.5 text-sm",
                    "w-full text-start",
                    isActive &&
                      "relative ps-3 before:absolute before:inset-y-1.5 before:start-0 before:w-px before:bg-accent/70",
                  )
                : cn(
                    compact ? "px-0 py-1 text-xs" : "px-0 py-1.5 text-sm",
                    "rounded-md",
                  ),
              isActive
                ? "font-medium text-accent"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className={item.mono ? "font-mono-tech ltr-embed" : undefined}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
