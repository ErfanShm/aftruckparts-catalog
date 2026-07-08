import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useRef } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const SPRING = { mass: 0.1, stiffness: 400, damping: 34 } as const;

type DockMagnetProps = {
  mouseX: MotionValue<number>;
  magnetic: boolean;
  /** Peak scale at cursor center (1 = no growth). */
  peak?: number;
  /** Distance in px where magnification falls off to 1. */
  range?: number;
  /** Max lift in px toward cursor. */
  lift?: number;
  className?: string;
  children: ReactNode;
};

/** macOS-style segment that grows when the pointer is nearby. */
export function DockMagnet({
  mouseX,
  magnetic,
  peak = 1.08,
  range = 64,
  lift = 3,
  className,
  children,
}: DockMagnetProps) {
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
  const y = useSpring(
    useTransform(distance, [0, range], [-lift, 0]),
    SPRING,
  );

  return (
    <motion.span
      ref={ref}
      style={{ scale, y }}
      className={cn("inline-flex origin-bottom", className)}
    >
      {children}
    </motion.span>
  );
}

type DockItemBase = {
  label: string;
  mouseX: MotionValue<number>;
  magnetic: boolean;
  className?: string;
  children: ReactNode;
  peak?: number;
  range?: number;
  tooltip?: boolean;
};

type DockItemLink = DockItemBase & {
  href: string;
  external?: boolean;
  onClick?: never;
};

type DockItemButton = DockItemBase & {
  onClick: () => void;
  href?: never;
  external?: never;
};

export type DockItemProps = DockItemLink | DockItemButton;

function DockItemInner({
  label,
  mouseX,
  magnetic,
  className,
  children,
  peak = 1.1,
  range = 56,
  tooltip = true,
  ...rest
}: DockItemProps) {
  const content = (
    <DockMagnet
      mouseX={mouseX}
      magnetic={magnetic}
      peak={peak}
      range={range}
      className={className}
    >
      {children}
    </DockMagnet>
  );

  const trigger =
    "href" in rest && rest.href ? (
      <a
        href={rest.href}
        aria-label={label}
        target={rest.external ? "_blank" : undefined}
        rel={rest.external ? "noopener noreferrer" : undefined}
        className="inline-flex touch-manipulation items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
      >
        {content}
      </a>
    ) : (
      <button
        type="button"
        onClick={rest.onClick}
        aria-label={label}
        className="inline-flex touch-manipulation items-center justify-center rounded-xl border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
      >
        {content}
      </button>
    );

  if (!tooltip) return trigger;

  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent
        side="top"
        className="border border-brand/15 bg-void/95 text-[11px] text-foreground/85 shadow-lg backdrop-blur-sm"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function DockItem(props: DockItemProps) {
  return <DockItemInner {...props} />;
}

export function DockTooltipProvider({ children }: { children: ReactNode }) {
  return <TooltipProvider delayDuration={400}>{children}</TooltipProvider>;
}

export type DockShellProps = ComponentPropsWithoutRef<"div"> & {
  onPointerTrack?: (clientX: number) => void;
  onPointerRelease?: () => void;
};

export function DockShell({
  className,
  children,
  onPointerTrack,
  onPointerRelease,
  ...props
}: DockShellProps) {
  return (
    <div
      className={cn("quote-dock-glass flex items-end gap-1 px-2 py-2 [contain:layout_style]", className)}
      onPointerMove={(e) => onPointerTrack?.(e.clientX)}
      onPointerLeave={() => onPointerRelease?.()}
      {...props}
    >
      {children}
    </div>
  );
}
