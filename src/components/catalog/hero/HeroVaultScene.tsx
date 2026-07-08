import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useLayoutEffect, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { TOUCH, type Mesh } from "three";

import { useIsMobile } from "@/hooks/use-mobile";

import { HeroAssembly } from "./HeroAssembly";
import { HERO_VAULT_ATMOSPHERE } from "./hero-finishes";

type Pointer = { x: number; y: number };

type HeroVaultSceneProps = {
  pointer: Pointer;
  onReady?: () => void;
};

/** Keep the canvas transparent and reveal only after env lighting + a clean frame. */
function HeroSceneReadyGate({ onReady }: { onReady?: () => void }) {
  const { gl, scene } = useThree();
  const notifiedRef = useRef(false);
  const stableFramesRef = useRef(0);
  const cancelledRef = useRef(false);
  const onReadyRef = useRef(onReady);
  const sampleRef = useRef(new Uint8Array(4));

  onReadyRef.current = onReady;

  useLayoutEffect(() => {
    scene.background = null;
    gl.setClearColor(0x000000, 0);
    gl.domElement.style.background = "transparent";
  }, [gl, scene]);

  useEffect(() => {
    cancelledRef.current = false;
    notifiedRef.current = false;
    stableFramesRef.current = 0;

    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useFrame(() => {
    if (cancelledRef.current || notifiedRef.current) return;

    scene.background = null;
    gl.setClearColor(0x000000, 0);

    if (!scene.environment) return;

    let hasLogoMesh = false;
    scene.traverse((object) => {
      if ((object as Mesh).isMesh) hasLogoMesh = true;
    });
    if (!hasLogoMesh) return;

    stableFramesRef.current += 1;
    if (stableFramesRef.current < 4) return;

    // Opaque corners mean the canvas flashed white instead of clearing transparent.
    const context = gl.getContext();
    const sample = sampleRef.current;
    context.readPixels(8, 8, 1, 1, context.RGBA, context.UNSIGNED_BYTE, sample);
    if (sample[3] > 32) {
      stableFramesRef.current = 2;
      return;
    }

    notifiedRef.current = true;
    onReadyRef.current?.();
  });

  return null;
}

function HeroEnvironment() {
  return (
    <Environment resolution={256} frames={2} background={false}>
      <Lightformer intensity={2.6} color="#e8f0fa" position={[0, 4, 5]} scale={[12, 12, 1]} />
      <Lightformer
        intensity={1.35}
        color="#b8c8dc"
        rotation={[0, Math.PI / 2, 0]}
        position={[-5, 2, 3]}
        scale={[10, 4, 1]}
      />
      <Lightformer
        intensity={0.85}
        color="#06b6d4"
        rotation={[0, -Math.PI / 2, 0]}
        position={[5, 1, -2]}
        scale={[8, 3, 1]}
      />
    </Environment>
  );
}

export function HeroVaultScene({ pointer, onReady }: HeroVaultSceneProps) {
  const isMobile = useIsMobile();
  const atmosphere = HERO_VAULT_ATMOSPHERE;
  const ambientIntensity = isMobile ? atmosphere.ambient.intensity * 1.35 : atmosphere.ambient.intensity;

  const keyX = pointer.x * 1.6 + 2.5;
  const keyY = pointer.y * 1.2 + 4.5;
  const fillX = pointer.x * -1.1 - 2.5;
  const fillY = pointer.y * -0.7 + 1.5;

  return (
    <>
      <HeroSceneReadyGate onReady={onReady} />

      <HeroEnvironment />

      <ambientLight intensity={ambientIntensity} color={atmosphere.ambient.color} />

      <directionalLight
        position={[2, 5, 4]}
        intensity={isMobile ? 1.1 : 0}
        color={atmosphere.key.color}
      />

      <spotLight
        position={[0, 6.5, 1.8]}
        angle={0.16}
        penumbra={0.9}
        intensity={atmosphere.key.intensity * 0.7}
        color={atmosphere.key.color}
      />

      <spotLight
        position={[keyX, keyY, 6]}
        angle={0.2}
        penumbra={0.95}
        intensity={atmosphere.key.intensity}
        color={atmosphere.key.color}
      />

      <spotLight
        position={[fillX, fillY, -2.5]}
        angle={0.32}
        penumbra={1}
        intensity={atmosphere.fill.intensity}
        color={atmosphere.fill.color}
      />

      <spotLight
        position={[0, 0.4, -3.8]}
        angle={0.42}
        penumbra={0.85}
        intensity={atmosphere.rim.intensity}
        color={atmosphere.rim.color}
      />

      <HeroAssembly />

      <OrbitControls
        enablePan={false}
        enableZoom
        touches={{
          ONE: TOUCH.ROTATE,
          TWO: TOUCH.DOLLY_PAN,
        }}
        minDistance={2.2}
        maxDistance={6.5}
        dampingFactor={0.08}
        rotateSpeed={0.85}
        zoomSpeed={0.75}
      />
    </>
  );
}
