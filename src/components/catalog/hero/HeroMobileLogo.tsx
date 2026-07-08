import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { BRAND_NAME } from "../layout/BrandMark";
import { HERO_MOBILE_ASSETS } from "./hero-assets";

/** Compact AF mark for mobile hero. */
export function HeroMobileLogo({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className={cn("pointer-events-none relative", className)} aria-hidden>
      <div className="relative h-20 w-20 sm:h-[5.25rem] sm:w-[5.25rem]">
        <img
          src={HERO_MOBILE_ASSETS.glow}
          alt=""
          className={cn(
            "hero-mobile-glow hero-mobile-glow--inline absolute inset-[-22%] h-[144%] w-[144%] object-cover object-center",
            !reduced && "hero-mobile-glow-pulse",
          )}
          decoding="async"
        />

        <div
          className={cn(
            "hero-mobile-well hero-mobile-well--inline absolute inset-0",
            !reduced && "hero-mobile-well-pulse",
          )}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={HERO_MOBILE_ASSETS.mark}
            alt=""
            className="hero-mobile-mark-ghost hero-mobile-mark-ghost--inline absolute h-14 w-14 object-contain sm:h-16 sm:w-16"
            decoding="async"
          />

          <img
            src={HERO_MOBILE_ASSETS.mark}
            alt={BRAND_NAME}
            width={48}
            height={48}
            className="hero-mobile-mark hero-mobile-mark--inline relative h-12 w-12 object-contain sm:h-[3.25rem] sm:w-[3.25rem]"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
