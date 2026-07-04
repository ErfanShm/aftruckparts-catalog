import { cn } from "@/lib/utils";

import type { HeroHudStat } from "./hero-hud-types";

type HeroHudOverlayProps = {
  stats: HeroHudStat[];
  className?: string;
};

/** Compact stat pills overlaid on the vault — desktop only. */
export function HeroHudOverlay({ stats, className }: HeroHudOverlayProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 via-void/45 to-transparent px-4 pb-3 pt-10 md:px-5 md:pb-4",
        className,
      )}
    >
      <div className="grid grid-cols-3 gap-2 md:gap-2.5">
        {stats.map((stat) => (
          <div key={stat.id} className="hero-hud-pill">
            <div className="hero-hud-pill-value display-stat">{stat.value}</div>
            <div className="hero-hud-pill-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Stat row below the stage — mobile, outside the canvas. */
export function HeroStatRow({ stats, className }: HeroHudOverlayProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-2", className)}>
      {stats.map((stat) => (
        <div key={stat.id} className="stat-chip">
          <div className="display-stat text-lg leading-none md:text-xl">{stat.value}</div>
          <div className="mt-1 text-[10px] tracking-wide text-foreground-muted">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
