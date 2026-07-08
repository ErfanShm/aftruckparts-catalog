import { cn } from "@/lib/utils";

import { HERO_VAULT_ATMOSPHERE } from "./hero-finishes";

const HERO_VAULT_VOID = "#07070a";

type HeroStageShellProps = {
  fillHeight?: boolean;
  className?: string;
  overlay?: boolean;
};

/** Empty vault surface — matches the WebGL scene while the model loads. */
export function HeroStageShell({
  fillHeight = false,
  className,
  overlay = false,
}: HeroStageShellProps) {
  const atmosphere = HERO_VAULT_ATMOSPHERE;

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
        className="hero-stage-glow pointer-events-none absolute inset-[14%] rounded-full blur-[100px] transition-[background] duration-700"
        style={{
          background: `radial-gradient(circle at center, ${atmosphere.glow}, transparent 68%)`,
        }}
      />
    </div>
  );
}

export { HERO_VAULT_VOID };
