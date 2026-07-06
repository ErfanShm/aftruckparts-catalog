import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { getFinishAtmosphere } from "./hero-finishes";
import { HeroFinishSwitcher } from "./HeroFinishSwitcher";
import { HeroScanReveal } from "./HeroScanReveal";
import { HeroStageShell } from "./HeroStageShell";
import { HeroVaultScene } from "./HeroVaultScene";
import type { HeroFinish } from "./hero-finishes";

type Pointer = { x: number; y: number };

type HeroBadgeStageProps = {
  finish: HeroFinish;
  finishLabels: Record<HeroFinish, string>;
  dragHint: string;
  reduced: boolean;
  onFinishChange: (finish: HeroFinish) => void;
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
  fillHeight = false,
  className,
}: HeroBadgeStageProps) {
  const { locale } = useLocale();
  const isMobile = useIsMobile();
  const frameRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    setWebgl(hasWebGL());
    useGLTF.preload("/models/badge.glb");
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
  const atmosphere = useMemo(() => getFinishAtmosphere(finish), [finish]);

  /** Block page scroll while dragging/zooming the 3D viewport (needs non-passive listeners). */
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !canRender3d || !sceneReady) return;

    const blockScroll = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();
    };

    frame.addEventListener("wheel", blockScroll, { passive: false });
    frame.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      frame.removeEventListener("wheel", blockScroll);
      frame.removeEventListener("touchmove", blockScroll);
    };
  }, [canRender3d, sceneReady]);

  const frameClass = cn(
    "hero-vault-frame hero-stage-vignette relative w-full flex-1 touch-none select-none overscroll-contain overflow-hidden rounded-2xl md:rounded-3xl",
    fillHeight ? "min-h-0 h-full" : "h-[min(76vw,24rem)] sm:h-[min(70vw,28rem)]",
  );

  return (
    <div className={cn("relative flex h-full w-full min-h-0 flex-col", className)}>
      <div
        className="pointer-events-none absolute inset-[4%] -z-10 rounded-full blur-[100px] transition-[background] duration-700"
        style={{
          background: `radial-gradient(circle at center, ${atmosphere.glow}, transparent 62%)`,
        }}
        aria-hidden
      />

      <div ref={frameRef} className={frameClass} onPointerMove={onPointerMove}>
        <HeroStageShell
          fillHeight
          finish={finish}
          overlay
          className={cn(
            "!rounded-none z-0 transition-opacity duration-500",
            canRender3d && sceneReady ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        />

        {canRender3d && (
          <Canvas
            className={cn(
              "relative z-10 touch-none !h-full !w-full transition-opacity duration-500",
              sceneReady ? "opacity-100" : "opacity-0",
            )}
            style={{ touchAction: "none" }}
            camera={{ position: [0, 0, 3.65], fov: 38 }}
            dpr={isMobile ? 1 : [1, 1.5]}
            gl={{
              antialias: !isMobile,
              alpha: false,
              powerPreference: "high-performance",
            }}
          >
            <Suspense fallback={null}>
              <HeroVaultScene finish={finish} pointer={pointer} onReady={onSceneReady} />
            </Suspense>
          </Canvas>
        )}

        <HeroScanReveal active={canRender3d && sceneReady} reduced={reduced} />

        {canRender3d && sceneReady && (
          <div className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center px-3 md:top-4">
            <div className={cn(
              "rounded-full border border-border-hair/25 bg-void/60 px-3 py-1 text-[9px] text-foreground-muted/80 backdrop-blur-sm",
              locale === "en" ? "tracking-[0.16em]" : "tracking-normal"
            )}>
              <span>{dragHint}</span>
            </div>
          </div>
        )}
      </div>

      <div className="pointer-events-auto mt-3 flex justify-center md:mt-4">
        <HeroFinishSwitcher active={finish} labels={finishLabels} onChange={onFinishChange} />
      </div>
    </div>
  );
}
