import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { TOUCH } from "three";

import { useIsMobile } from "@/hooks/use-mobile";

import { HeroAssembly } from "./HeroAssembly";
import { getFinishAtmosphere, type HeroFinish } from "./hero-finishes";

type Pointer = { x: number; y: number };

type HeroVaultSceneProps = {
  finish: HeroFinish;
  pointer: Pointer;
  onReady?: () => void;
};

/** Lightweight procedural env for mobile — physical materials need reflections to read as metal. */
function HeroEnvironment({ mobile }: { mobile: boolean }) {
  if (mobile) {
    return (
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2.8} color="#e8f0fa" position={[0, 4, 5]} scale={[12, 12, 1]} />
        <Lightformer
          intensity={1.4}
          color="#b8c8dc"
          rotation={[0, Math.PI / 2, 0]}
          position={[-5, 2, 3]}
          scale={[10, 4, 1]}
        />
        <Lightformer
          intensity={0.65}
          color="#8a8f98"
          rotation={[0, -Math.PI / 2, 0]}
          position={[5, 1, -2]}
          scale={[8, 3, 1]}
        />
      </Environment>
    );
  }

  return <Environment preset="studio" />;
}

export function HeroVaultScene({ finish, pointer, onReady }: HeroVaultSceneProps) {
  const isMobile = useIsMobile();
  const atmosphere = getFinishAtmosphere(finish);
  const ambientIntensity = isMobile ? atmosphere.ambient.intensity * 1.35 : atmosphere.ambient.intensity;

  const keyX = pointer.x * 1.6 + 2.5;
  const keyY = pointer.y * 1.2 + 4.5;
  const fillX = pointer.x * -1.1 - 2.5;
  const fillY = pointer.y * -0.7 + 1.5;

  return (
    <>
      <color attach="background" args={[atmosphere.void]} />
      <fog attach="fog" args={[atmosphere.fogColor, atmosphere.fogNear, atmosphere.fogFar]} />

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
        castShadow={!isMobile}
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

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0]} receiveShadow>
        <circleGeometry args={[3.2, isMobile ? 32 : 48]} />
        <meshStandardMaterial
          color={atmosphere.floor.color}
          roughness={atmosphere.floor.roughness}
          metalness={atmosphere.floor.metalness}
        />
      </mesh>

      <HeroAssembly finish={finish} onReady={onReady} />

      <OrbitControls
        enablePan={false}
        enableZoom
        touches={{
          ONE: TOUCH.ROTATE,
          TWO: TOUCH.DOLLY,
        }}
        minDistance={2.2}
        maxDistance={6.5}
        minPolarAngle={0.62}
        maxPolarAngle={1.58}
        minAzimuthAngle={-1.35}
        maxAzimuthAngle={1.35}
        dampingFactor={0.08}
        rotateSpeed={0.85}
        zoomSpeed={0.75}
      />

      <HeroEnvironment mobile={isMobile} />
    </>
  );
}
