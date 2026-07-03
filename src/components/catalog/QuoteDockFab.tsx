import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

import { useDockMouseX } from "@/hooks/use-dock-mouse-x";
import { cn } from "@/lib/utils";

const SPRING = { mass: 0.08, stiffness: 380, damping: 32 } as const;

function DockMagnet({
  mouseX,
  magnetic,
  peak,
  range = 72,
  className,
  children,
}: {
  mouseX: MotionValue<number>;
  magnetic: boolean;
  peak: number;
  range?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const distance = useTransform(mouseX, (x) => {
    if (!magnetic || !Number.isFinite(x)) return range;
    const el = ref.current;
    if (!el) return range;
    const b = el.getBoundingClientRect();
    return Math.abs(x - (b.left + b.width / 2));
  });

  const scale = useSpring(
    useTransform(distance, [0, range], [peak, 1]),
    SPRING,
  );

  return (
    <motion.span ref={ref} style={{ scale }} className={className}>
      {children}
    </motion.span>
  );
}

type QuoteDockFabProps = {
  label: string;
  count: number;
  onClick: () => void;
};

export function QuoteDockFab({ label, count, onClick }: QuoteDockFabProps) {
  const reduced = useReducedMotion() ?? false;
  const { mouseX, ready, onPointerMove, onPointerLeave } = useDockMouseX();
  const magnetic = ready && !reduced;
  const hasItems = count > 0;

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed bottom-6 left-1/2 z-40 max-w-[calc(100vw-2rem)] -translate-x-1/2 safe-bottom",
        "md:start-auto md:end-6 md:max-w-none md:translate-x-0",
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="block touch-manipulation"
        onPointerMove={(e) => onPointerMove(e.clientX, magnetic)}
        onPointerLeave={() => onPointerLeave(magnetic)}
      >
        <div
          className={cn(
            "liquid-glass flex items-center gap-3 rounded-full px-4 py-2.5",
            "[contain:layout_style]",
            hasItems && "ring-1 ring-brand/20",
          )}
        >
          <DockMagnet
            mouseX={mouseX}
            magnetic={magnetic}
            peak={1.04}
            className="whitespace-nowrap text-sm font-light leading-none text-foreground/90"
          >
            {label}
          </DockMagnet>

          <DockMagnet
            mouseX={mouseX}
            magnetic={magnetic}
            peak={1.1}
            range={56}
            className={cn(
              "font-mono-tech ltr-embed flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px]",
              "bg-brand/15 text-brand-highlight",
              hasItems && "text-foreground",
            )}
          >
            {String(count).padStart(2, "0")}
          </DockMagnet>
        </div>
      </button>
    </motion.div>
  );
}
