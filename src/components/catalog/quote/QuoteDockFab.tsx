import { motion, useReducedMotion } from "framer-motion";

import { DockMagnet, DockShell } from "@/components/catalog/layout/dock/dock-item";
import { useDockMouseX } from "@/hooks/use-dock-mouse-x";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type QuoteDockFabProps = {
  label: string;
  count: number;
  onClick: () => void;
};

export function QuoteDockFab({ label, count, onClick }: QuoteDockFabProps) {
  const { formatDigits } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const { mouseX, ready, onPointerMove, onPointerLeave } = useDockMouseX();
  const magnetic = ready && !reduced;
  const hasItems = count > 0;

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-40 w-full md:w-fit",
        "bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))]",
        "inset-x-0 flex justify-center",
        "md:inset-x-auto md:bottom-6 md:end-6 md:start-auto",
      )}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="w-fit"
      >
        <div className="quote-dock-anchor">
          <span
            className={cn("quote-dock-halo", hasItems && "quote-dock-halo-active")}
            aria-hidden
          />

          <button
            type="button"
            onClick={onClick}
            aria-label={hasItems ? `${label}, ${formatDigits(count)}` : label}
            className="pointer-events-auto touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-brand-highlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
            onPointerMove={(e) => onPointerMove(e.clientX, magnetic)}
            onPointerLeave={() => onPointerLeave(magnetic)}
          >
            <DockShell
              className={cn(
                "px-4 py-2.5 sm:px-5",
                hasItems && "quote-dock-glass-active",
              )}
            >
              <DockMagnet
                mouseX={mouseX}
                magnetic={magnetic}
                peak={1.06}
                range={80}
                lift={3}
              >
                <span className="quote-dock-label flex items-center gap-2 whitespace-nowrap">
                  <span>{label}</span>
                  {hasItems && (
                    <>
                      <span className="text-brand-highlight/40" aria-hidden>
                        ·
                      </span>
                      <span className="quote-dock-count-inline type-digits ltr-embed tabular-nums">
                        {formatDigits(count)}
                      </span>
                    </>
                  )}
                </span>
              </DockMagnet>
            </DockShell>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
