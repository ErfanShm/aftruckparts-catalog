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
