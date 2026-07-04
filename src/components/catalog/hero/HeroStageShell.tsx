import { cn } from "@/lib/utils";

const HERO_VAULT_VOID = "#020812";

type HeroStageShellProps = {
  fillHeight?: boolean;
  className?: string;
  overlay?: boolean;
};

/** Empty vault surface — matches the WebGL scene while the model loads. */
export function HeroStageShell({ fillHeight = false, className, overlay = false }: HeroStageShellProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        fillHeight ? "h-full min-h-0 w-full" : "h-[min(76vw,24rem)] w-full sm:h-[min(70vw,28rem)]",
        overlay && "absolute inset-0 z-10 transition-opacity duration-500",
        className,
      )}
      style={{ backgroundColor: HERO_VAULT_VOID }}
      aria-hidden
    >
      <div className="hero-stage-glow pointer-events-none absolute inset-[12%] rounded-full blur-[90px]" />
    </div>
  );
}
