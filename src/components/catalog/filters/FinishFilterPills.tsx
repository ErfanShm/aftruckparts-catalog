import { Fragment } from "react";

import { cn } from "@/lib/utils";

type FinishFilterPillsProps = {
  items: { key: string; label: string }[];
  active: string | null;
  onSelect: (key: string) => void;
  className?: string;
};

export function FinishFilterPills({ items, active, onSelect, className }: FinishFilterPillsProps) {
  return (
    <div className={cn("filter-index-line", className)} role="group">
      {items.map((item, index) => {
        const isActive = active === item.key;

        return (
          <Fragment key={item.key}>
            {index > 0 && (
              <span className="filter-index-sep" aria-hidden>
                ·
              </span>
            )}
            <button
              type="button"
              onClick={() => onSelect(item.key)}
              className={cn(
                "filter-index-toggle touch-manipulation",
                isActive && "filter-index-toggle-active",
              )}
            >
              {item.label}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
