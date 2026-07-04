import { cn } from "@/lib/utils";

type FinishFilterPillsProps = {
  items: { key: string; label: string }[];
  active: string | null;
  onSelect: (key: string) => void;
  className?: string;
  vertical?: boolean;
  compact?: boolean;
};

export function FinishFilterPills({
  items,
  active,
  onSelect,
  className,
  vertical = false,
  compact = false,
}: FinishFilterPillsProps) {
  return (
    <div
      className={cn(
        vertical ? "flex flex-col items-start gap-1" : "flex flex-wrap gap-1",
        compact && "finish-pill-group",
        className,
      )}
      role="group"
    >
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            className={cn(
              "finish-pill touch-manipulation",
              compact && "px-2 py-1 text-[10px]",
              isActive && "finish-pill-active",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
