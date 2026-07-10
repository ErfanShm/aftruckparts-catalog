import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { BRAND_NAME } from "../layout/BrandMark";
import { HERO_MOBILE_ASSETS } from "./hero-assets";

/** Atmospheric truck emblem for mobile hero — fades into the headline. */
export function HeroMobileLogo({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className={cn("pointer-events-none relative", className)} aria-hidden>
      <div className="hero-mobile-truck-frame mx-auto w-[min(78vw,18.5rem)]">
        <img
          src={HERO_MOBILE_ASSETS.truck}
          alt=""
          width={512}
          height={512}
          className={cn(
            "hero-mobile-truck mx-auto h-auto w-full object-contain",
            !reduced && "hero-mobile-truck-pulse",
          )}
          decoding="async"
        />
      </div>
      <span className="sr-only">{BRAND_NAME}</span>
    </div>
  );
}
