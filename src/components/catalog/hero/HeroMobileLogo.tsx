import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { BRAND_NAME } from "../layout/BrandMark";
import { HERO_MOBILE_ASSETS } from "./hero-assets";

/** AF lockup for mobile hero — black plate blends into the void. */
export function HeroMobileLogo({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className={cn("pointer-events-none relative", className)}>
      <div className="hero-mobile-mark-frame mx-auto w-[min(72vw,16.5rem)] sm:w-[min(64vw,18rem)]">
        <img
          src={HERO_MOBILE_ASSETS.mark}
          alt={BRAND_NAME}
          width={512}
          height={512}
          className={cn(
            "hero-mobile-mark mx-auto h-auto w-full object-contain",
            !reduced && "hero-mobile-mark-pulse",
          )}
          decoding="async"
        />
      </div>
    </div>
  );
}
