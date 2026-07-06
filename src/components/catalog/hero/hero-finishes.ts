export type HeroFinish = "matte" | "steel" | "glossy";

export const HERO_FINISHES: HeroFinish[] = ["matte", "steel", "glossy"];

export type FinishMaterialProps = {
  color: string;
  roughness: number;
  metalness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  envMapIntensity?: number;
};

export type FinishAtmosphere = {
  void: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  ambient: { color: string; intensity: number };
  key: { color: string; intensity: number };
  fill: { color: string; intensity: number };
  rim: { color: string; intensity: number };
  floor: { color: string; roughness: number; metalness: number };
  /** CSS radial-gradient color for the stage glow */
  glow: string;
};

export function getFinishAtmosphere(finish: HeroFinish): FinishAtmosphere {
  switch (finish) {
    case "matte":
      return {
        void: "#050810",
        fogColor: "#050810",
        fogNear: 5,
        fogFar: 14,
        ambient: { color: "#8a8f98", intensity: 0.55 },
        key: { color: "#d4d8de", intensity: 0.95 },
        fill: { color: "#3d4550", intensity: 0.45 },
        rim: { color: "#6b7280", intensity: 0.35 },
        floor: { color: "#060a10", roughness: 0.96, metalness: 0.02 },
        glow: "color-mix(in oklch, #71717a 20%, transparent)",
      };
    case "steel":
      return {
        void: "#020812",
        fogColor: "#020812",
        fogNear: 6,
        fogFar: 16,
        ambient: { color: "#b8c8dc", intensity: 0.4 },
        key: { color: "#e8f0fa", intensity: 1.2 },
        fill: { color: "#1a3050", intensity: 0.5 },
        rim: { color: "#7eb8ff", intensity: 0.75 },
        floor: { color: "#040810", roughness: 0.88, metalness: 0.12 },
        glow: "color-mix(in oklch, #94a3b8 24%, transparent)",
      };
    case "glossy":
      return {
        void: "#010408",
        fogColor: "#010408",
        fogNear: 4,
        fogFar: 12,
        ambient: { color: "#404048", intensity: 0.28 },
        key: { color: "#fafafa", intensity: 1.35 },
        fill: { color: "#0a0a12", intensity: 0.35 },
        rim: { color: "#ffffff", intensity: 1.1 },
        floor: { color: "#020206", roughness: 0.72, metalness: 0.28 },
        glow: "color-mix(in oklch, #fafafa 14%, transparent)",
      };
  }
}

export function getFinishMaterialProps(finish: HeroFinish): FinishMaterialProps {
  switch (finish) {
    case "matte":
      return {
        color: "#52525b",
        roughness: 0.78,
        metalness: 0.42,
        envMapIntensity: 0.62,
      };
    case "steel":
      return {
        color: "#f4f4f5",
        roughness: 0.15,
        metalness: 1,
        envMapIntensity: 1.9,
        clearcoat: 0.35,
        clearcoatRoughness: 0.08,
      };
    case "glossy":
      return {
        color: "#080808",
        roughness: 0.16,
        metalness: 0.38,
        clearcoat: 1,
        clearcoatRoughness: 0.035,
        envMapIntensity: 1.15,
      };
  }
}
