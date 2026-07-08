import { cn } from "@/lib/utils";

import { HERO_VAULT_ATMOSPHERE } from "./hero-finishes";

type HeroStageShellProps = {
  fillHeight?: boolean;
  className?: string;
  overlay?: boolean;
};

/** Dark vault mask above the canvas while WebGL loads. */
export function HeroStageShell({
  fillHeight = false,
  className,
  overlay = false,
}: HeroStageShellProps) {
  return (
    <div
      className={cn(
        "relative",
        fillHeight ? "h-full min-h-0 w-full" : "h-[min(76vw,24rem)] w-full sm:h-[min(70vw,28rem)]",
        overlay && "absolute inset-0 transition-opacity duration-500",
        className,
      )}
      style={{ backgroundColor: HERO_VAULT_ATMOSPHERE.void }}
      aria-hidden
    />
  );
}

export const HERO_VAULT_VOID = HERO_VAULT_ATMOSPHERE.void;
