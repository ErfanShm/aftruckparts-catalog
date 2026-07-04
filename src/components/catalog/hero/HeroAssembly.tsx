import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import { useEffect } from "react";

import { BadgeModel } from "./BadgeModel";
import { getFinishMaterialProps } from "./hero-finishes";
import type { HeroFinish } from "./hero-finishes";

const CHROME = getFinishMaterialProps("steel");

const CAB_PAINT = {
  color: "#12161e",
  roughness: 0.58,
  metalness: 0.14,
  clearcoat: 0.12,
  clearcoatRoughness: 0.35,
  envMapIntensity: 0.42,
} as const;

const GRILLE_RECESS = {
  color: "#080b10",
  roughness: 0.92,
  metalness: 0.05,
  envMapIntensity: 0.2,
} as const;

const GRILLE_SLATS = [-0.68, -0.44, -0.2, 0.04] as const;

type HeroAssemblyProps = {
  finish: HeroFinish;
  onReady?: () => void;
};

/** Badge mounted on a minimal truck cab grille — reads as fleet hardware, not abstract shapes. */
export function HeroAssembly({ finish, onReady }: HeroAssemblyProps) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <Float speed={0.85} rotationIntensity={0.12} floatIntensity={0.22}>
      <group scale={1.32} rotation={[0.05, -0.16, 0]}>
        <group position={[0, -0.12, -0.16]}>
          <RoundedBox args={[4.35, 2.55, 0.1]} radius={0.1} smoothness={6} receiveShadow castShadow>
            <meshPhysicalMaterial {...CAB_PAINT} />
          </RoundedBox>

          <RoundedBox args={[3.55, 1.45, 0.06]} radius={0.06} smoothness={4} position={[0, -0.28, 0.04]}>
            <meshPhysicalMaterial {...GRILLE_RECESS} />
          </RoundedBox>

          {GRILLE_SLATS.map((y, index) => (
            <mesh key={y} position={[0, y, 0.08]} castShadow receiveShadow>
              <boxGeometry args={[3.15 - index * 0.06, 0.05, 0.022]} />
              <meshPhysicalMaterial {...CHROME} roughness={0.22} envMapIntensity={1.35} />
            </mesh>
          ))}

          <mesh position={[0, 0.92, 0.075]}>
            <boxGeometry args={[3.5, 0.012, 0.008]} />
            <meshPhysicalMaterial color="#06080c" roughness={0.95} metalness={0} />
          </mesh>
        </group>

        <RoundedBox
          args={[2.05, 0.9, 0.035]}
          radius={0.05}
          smoothness={4}
          position={[0, 0.36, 0.01]}
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#0c1018"
            roughness={0.72}
            metalness={0.18}
            envMapIntensity={0.3}
          />
        </RoundedBox>

        <group position={[0, 0.38, 0.12]}>
          <BadgeModel finish={finish} />
        </group>

        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.35}
          scale={8}
          blur={2.4}
          far={4}
          color="#000000"
        />
      </group>
    </Float>
  );
}
