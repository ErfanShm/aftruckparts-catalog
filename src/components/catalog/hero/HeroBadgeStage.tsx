import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { HERO_VAULT_ATMOSPHERE } from "./hero-finishes";
import { HeroScanReveal } from "./HeroScanReveal";
import { HeroStageShell } from "./HeroStageShell";
import { HeroVaultScene } from "./HeroVaultScene";

type Pointer = { x: number; y: number };

type HeroBadgeStageProps = {
  reduced: boolean;
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
  reduced,
  fillHeight = false,
  className,
}: HeroBadgeStageProps) {
  const isMobile = useIsMobile();
  const frameRef = useRef<HTMLDivElement>(null);
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
  const atmosphere = HERO_VAULT_ATMOSPHERE;

  /** Block page scroll while dragging/zooming the 3D viewport. */
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
              <HeroVaultScene pointer={pointer} onReady={onSceneReady} />
            </Suspense>
          </Canvas>
        )}

        <HeroScanReveal active={canRender3d && sceneReady} reduced={reduced} />
      </div>
    </div>
  );
}
