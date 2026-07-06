import { motion } from "framer-motion";

import { useDockMouseX } from "@/hooks/use-dock-mouse-x";
import { cn } from "@/lib/utils";

type QuoteDockFabProps = {
  label: string;
  count: number;
  onClick: () => void;
};

export function QuoteDockFab({ label, count, onClick }: QuoteDockFabProps) {
  const { onPointerMove, onPointerLeave } = useDockMouseX();
  const hasItems = count > 0;

  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
        onPointerMove={(e) => onPointerMove(e.clientX, false)}
        onPointerLeave={() => onPointerLeave(false)}
      >
        <div
          className={cn(
            "flex max-w-full items-center gap-2.5 rounded-full glass-panel px-4 py-3 sm:gap-3 sm:px-5",
            hasItems && "border-brand/22",
          )}
        >
          <span className="type-ui-strong min-w-0 text-[0.8125rem] leading-tight text-foreground/90 sm:text-sm">
            {label}
          </span>
          <span
            className={cn(
              "font-mono-tech ltr-embed flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px]",
              hasItems ? "bg-brand/18 text-brand-highlight" : "bg-brand/8 text-brand-readable/70",
            )}
          >
            {String(count).padStart(2, "0")}
          </span>
        </div>
      </button>
    </motion.div>
  );
}
