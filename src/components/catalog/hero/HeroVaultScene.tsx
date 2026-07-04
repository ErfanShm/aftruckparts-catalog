import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

import { HeroAssembly } from "./HeroAssembly";
import type { HeroFinish } from "./hero-finishes";

type Pointer = { x: number; y: number };

type HeroVaultSceneProps = {
  finish: HeroFinish;
  pointer: Pointer;
  onReady?: () => void;
};

const VOID = "#020812";

export function HeroVaultScene({ finish, pointer, onReady }: HeroVaultSceneProps) {
  const keyX = pointer.x * 1.8 + 4;
  const keyY = pointer.y * 1.4 + 3;
  const fillX = pointer.x * -1.2 - 3;
  const fillY = pointer.y * -0.8 + 2;

  return (
    <>
      <color attach="background" args={[VOID]} />
      <fog attach="fog" args={[VOID, 6, 16]} />

      <ambientLight intensity={0.42} color="#c4c4cc" />
      <directionalLight position={[4, 6, 5]} intensity={1.05} color="#fafafa" castShadow />
      <spotLight
        position={[keyX, keyY, 8]}
        angle={0.22}
        penumbra={0.9}
        intensity={1.8}
        color="#e8eef5"
      />
      <spotLight
        position={[fillX, fillY, -3]}
        angle={0.28}
        penumbra={1}
        intensity={0.55}
        color="#003d81"
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]} receiveShadow>
        <circleGeometry args={[5.5, 64]} />
        <meshStandardMaterial color="#050810" roughness={0.95} metalness={0.05} />
      </mesh>

      <HeroAssembly finish={finish} onReady={onReady} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={2.8}
        maxDistance={7}
        minPolarAngle={0.82}
        maxPolarAngle={1.48}
        minAzimuthAngle={-0.65}
        maxAzimuthAngle={0.65}
        dampingFactor={0.07}
        rotateSpeed={0.7}
        zoomSpeed={0.8}
      />

      <Environment preset="studio" />
    </>
  );
}

export { VOID as HERO_VAULT_VOID };
