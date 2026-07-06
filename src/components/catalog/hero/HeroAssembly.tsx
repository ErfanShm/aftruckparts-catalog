import { ContactShadows, RoundedBox } from "@react-three/drei";
import { useEffect } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import { BadgeModel } from "./BadgeModel";
import { getFinishMaterialProps } from "./hero-finishes";
import type { HeroFinish } from "./hero-finishes";

const CHROME = getFinishMaterialProps("steel");

const MOUNT_BOLTS = [
  [-0.58, 0.42],
  [0.58, 0.42],
  [-0.58, -0.42],
  [0.58, -0.42],
] as const;

type HeroAssemblyProps = {
  finish: HeroFinish;
  onReady?: () => void;
};

/** Gallery specimen — badge on a minimal mount plate, no truck geometry. */
export function HeroAssembly({ finish, onReady }: HeroAssemblyProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    let frame2 = 0;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => onReady?.());
    });
    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [onReady]);

  return (
    <group rotation={[0.04, -0.14, 0]} scale={1.34}>
      {/* Dark mount plate */}
      <RoundedBox
        args={[1.82, 1.82, 0.028]}
        radius={0.045}
        smoothness={isMobile ? 2 : 4}
        position={[0, 0, -0.012]}
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#0a0e14"
          roughness={0.84}
          metalness={0.1}
          envMapIntensity={0.22}
        />
      </RoundedBox>

      {/* Chrome mount ring */}
      <mesh position={[0, 0, 0.002]}>
        <torusGeometry args={[0.94, 0.011, 8, isMobile ? 36 : 56]} />
        <meshPhysicalMaterial {...CHROME} roughness={0.16} envMapIntensity={1.45} />
      </mesh>

      {/* Corner bolts */}
      {MOUNT_BOLTS.map(([x, y]) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.014]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.01, isMobile ? 6 : 8]} />
          <meshPhysicalMaterial {...CHROME} roughness={0.1} envMapIntensity={1.55} />
        </mesh>
      ))}

      {/* Badge — flush on mount plate */}
      <group position={[0, 0, 0.018]}>
        <BadgeModel finish={finish} />
      </group>

      {!isMobile && (
        <ContactShadows
          position={[0, -0.92, 0]}
          opacity={0.3}
          scale={4.5}
          blur={2}
          far={3}
          resolution={384}
        />
      )}
    </group>
  );
}
