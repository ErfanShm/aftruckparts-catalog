import { cn } from "@/lib/utils";

import { getFinishAtmosphere, type HeroFinish } from "./hero-finishes";

const HERO_VAULT_VOID = "#020812";

type HeroStageShellProps = {
  fillHeight?: boolean;
  className?: string;
  overlay?: boolean;
  finish?: HeroFinish;
};

/** Empty vault surface — matches the WebGL scene while the model loads. */
export function HeroStageShell({
  fillHeight = false,
  className,
  overlay = false,
  finish = "steel",
}: HeroStageShellProps) {
  const atmosphere = getFinishAtmosphere(finish);

  return (
    <div
      className={cn(
        "relative overflow-hidden transition-[background-color] duration-700",
        fillHeight ? "h-full min-h-0 w-full" : "h-[min(76vw,24rem)] w-full sm:h-[min(70vw,28rem)]",
        overlay && "absolute inset-0 z-10 transition-opacity duration-500",
        className,
      )}
      style={{ backgroundColor: atmosphere.void }}
      aria-hidden
    >
      <div
        className="hero-stage-glow pointer-events-none absolute inset-[12%] rounded-full blur-[90px] transition-[background] duration-700"
        style={{
          background: `radial-gradient(circle at center, ${atmosphere.glow}, transparent 62%)`,
        }}
      />
    </div>
  );
}

export { HERO_VAULT_VOID };
