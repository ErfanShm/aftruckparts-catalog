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

/** Vault lighting tuned for the white AF monolith — cool key, caravan rim. */
export const HERO_VAULT_ATMOSPHERE: FinishAtmosphere = {
  void: "#07070a",
  fogColor: "#07070a",
  fogNear: 6,
  fogFar: 16,
  ambient: { color: "#a8bdd8", intensity: 0.42 },
  key: { color: "#e8eef8", intensity: 1.2 },
  fill: { color: "#0f2a4a", intensity: 0.5 },
  rim: { color: "#2f74c0", intensity: 0.78 },
  floor: { color: "#040810", roughness: 0.88, metalness: 0.12 },
  glow: "color-mix(in oklch, #2f74c0 16%, #003d81 12%, transparent)",
};
