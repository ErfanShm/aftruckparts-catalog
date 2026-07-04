import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { HeroBadgeFallback } from "./HeroBadgeFallback";
import { HeroFinishSwitcher } from "./HeroFinishSwitcher";
import { HeroHudOverlay, HeroStatRow } from "./HeroHudOverlay";
import { HeroStageShell } from "./HeroStageShell";
import { HeroVaultScene } from "./HeroVaultScene";
import type { HeroFinish } from "./hero-finishes";
import type { HeroHudStat } from "./hero-hud-types";

type Pointer = { x: number; y: number };

type HeroBadgeStageProps = {
  finish: HeroFinish;
  finishLabels: Record<HeroFinish, string>;
  dragHint: string;
  reduced: boolean;
  onFinishChange: (finish: HeroFinish) => void;
  stats?: HeroHudStat[];
  showHud?: boolean;
  fillHeight?: boolean;
  className?: string;
};

function hasWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") ?? canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

export function HeroBadgeStage({
  finish,
  finishLabels,
  dragHint,
  reduced,
  onFinishChange,
  stats,
  showHud = false,
  fillHeight = false,
  className,
}: HeroBadgeStageProps) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    setWebgl(hasWebGL());
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  }, []);

  const onSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  const canRender3d = mounted && !reduced && webgl;
  const showOverlayHud = showHud && canRender3d && sceneReady && !isMobile && stats && stats.length > 0;
  const showExternalStats = showHud && isMobile && stats && stats.length > 0;

  const frameClass = cn(
    "hero-vault-frame hero-stage-vignette relative w-full flex-1 touch-none overflow-hidden rounded-2xl md:rounded-3xl",
    fillHeight ? "min-h-0 h-full" : "h-[min(76vw,24rem)] sm:h-[min(70vw,28rem)]",
  );

  return (
    <div className={cn("relative flex h-full w-full min-h-0 flex-col", className)}>
      <div
        className="hero-stage-glow pointer-events-none absolute inset-[4%] -z-10 rounded-full blur-[100px]"
        aria-hidden
      />

      <div className={frameClass} onPointerMove={onPointerMove}>
        {!canRender3d ? (
          <HeroBadgeFallback finish={finish} fillHeight className="!h-full !max-h-none !rounded-none !border-0 !shadow-none" />
        ) : (
          <>
            <Canvas
              className={cn(
                "!h-full !w-full transition-opacity duration-500",
                sceneReady ? "opacity-100" : "opacity-0",
              )}
              camera={{ position: [0, 0.06, 4.2], fov: 40 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: false }}
            >
              <Suspense fallback={null}>
                <HeroVaultScene finish={finish} pointer={pointer} onReady={onSceneReady} />
              </Suspense>
            </Canvas>

            {!sceneReady && <HeroStageShell fillHeight overlay className="!rounded-none" />}

            {showOverlayHud && <HeroHudOverlay stats={stats} />}
          </>
        )}

        {canRender3d && sceneReady && (
          <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center px-3 md:top-4">
            <div className="rounded-full border border-border-hair/25 bg-void/60 px-3 py-1 text-[9px] tracking-[0.16em] text-foreground-muted/80 backdrop-blur-sm">
              <span>{dragHint}</span>
            </div>
          </div>
        )}
      </div>

      <div className="pointer-events-auto mt-3 flex justify-center md:mt-4">
        <HeroFinishSwitcher active={finish} labels={finishLabels} onChange={onFinishChange} />
      </div>

      {showExternalStats && isMobile && (
        <HeroStatRow stats={stats} className="mt-3 md:mt-4" />
      )}
    </div>
  );
}
