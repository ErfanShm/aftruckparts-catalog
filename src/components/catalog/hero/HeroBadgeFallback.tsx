import { cn } from "@/lib/utils";

import type { HeroFinish } from "./hero-finishes";
import { HeroStageShell } from "./HeroStageShell";

const HERO_BADGE_IMAGE = "/catalog/page-26.jpeg";

const FINISH_FILTER: Record<HeroFinish, string> = {
  matte: "brightness(0.72) contrast(0.92) saturate(0.35)",
  steel: "brightness(1.15) contrast(1.05) saturate(0.2)",
  glossy: "brightness(0.55) contrast(1.25) saturate(0.15)",
};

type HeroBadgeFallbackProps = {
  finish: HeroFinish;
  fillHeight?: boolean;
  className?: string;
};

/** Static image — only when WebGL or motion is unavailable. */
export function HeroBadgeFallback({ finish, fillHeight = false, className }: HeroBadgeFallbackProps) {
  return (
    <div
      className={cn(
        "hero-vault-frame relative flex w-full items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl",
        fillHeight ? "h-full min-h-0" : "h-[min(76vw,24rem)] sm:h-[min(70vw,28rem)]",
        className,
      )}
    >
      <HeroStageShell fillHeight className="absolute inset-0" />
      <img
        src={HERO_BADGE_IMAGE}
        alt=""
        className="relative z-[1] max-h-[78%] max-w-[88%] object-contain opacity-80 mix-blend-luminosity transition-[filter] duration-500"
        style={{ filter: FINISH_FILTER[finish] }}
      />
    </div>
  );
}
