import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { HERO_LOGO_SVG } from "./hero-assets";
import { HERO_VAULT_ATMOSPHERE } from "./hero-finishes";
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

function preloadLogoSvg() {
  return fetch(HERO_LOGO_SVG).then((response) => {
    if (!response.ok) throw new Error("logo svg preload failed");
  });
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
  const [logoReady, setLogoReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [displayReady, setDisplayReady] = useState(false);
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    setWebgl(hasWebGL());
  }, []);

  const canRender3d = mounted && !reduced && webgl && logoReady;
  const showVaultMask = mounted && !reduced && webgl && !displayReady;
  const atmosphere = HERO_VAULT_ATMOSPHERE;

  useEffect(() => {
    if (!mounted || reduced || !webgl) {
      setLogoReady(false);
      return;
    }

    let cancelled = false;
    preloadLogoSvg()
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLogoReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [mounted, reduced, webgl]);

  useEffect(() => {
    if (!canRender3d) {
      setSceneReady(false);
      setDisplayReady(false);
    }
  }, [canRender3d]);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  }, []);

  const onSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  useEffect(() => {
    if (!sceneReady) return;

    let frame2 = 0;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => setDisplayReady(true));
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [sceneReady]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !canRender3d || !displayReady) return;

    const blockScroll = (event: WheelEvent | TouchEvent) => {
      event.preventDefault();
    };

    frame.addEventListener("wheel", blockScroll, { passive: false });
    frame.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      frame.removeEventListener("wheel", blockScroll);
      frame.removeEventListener("touchmove", blockScroll);
    };
  }, [canRender3d, displayReady]);

  return (
    <div
      className={cn(
        "hero-logo-stage pointer-events-none relative h-full w-full min-h-0",
        fillHeight ? "min-h-0" : "min-h-[min(76vw,24rem)] sm:min-h-[min(70vw,28rem)]",
        className,
      )}
    >
      <div
        className="absolute inset-[-18%_-28%_-18%_-12%] -z-10 blur-[130px]"
        style={{
          background: `radial-gradient(ellipse 62% 54% at 44% 46%, ${atmosphere.glow}, transparent 74%)`,
        }}
        aria-hidden
      />

      <div
        ref={frameRef}
        className="pointer-events-auto absolute inset-0 touch-none select-none overscroll-contain"
        onPointerMove={onPointerMove}
      >
        {canRender3d && (
          <Canvas
            className={cn(
              "hero-logo-canvas absolute inset-0 z-0 !h-full !w-full touch-none transition-opacity duration-500",
              displayReady ? "visible opacity-100" : "invisible opacity-0",
            )}
            style={{ touchAction: "none", background: "transparent" }}
            camera={{ position: [0, 0, 3.65], fov: 38 }}
            dpr={isMobile ? 1 : [1, 1.5]}
            gl={{
              antialias: !isMobile,
              alpha: true,
              premultipliedAlpha: true,
              powerPreference: "high-performance",
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
              gl.domElement.style.background = "transparent";
            }}
          >
            <Suspense fallback={null}>
              <HeroVaultScene pointer={pointer} onReady={onSceneReady} />
            </Suspense>
          </Canvas>
        )}

        <HeroStageShell
          overlay
          className={cn(
            "absolute inset-0 z-10 transition-opacity duration-500",
            showVaultMask ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
      </div>
    </div>
  );
}
