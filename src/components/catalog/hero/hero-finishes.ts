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

/** Vault lighting tuned for the white AF monolith — cool key, cyan rim. */
export const HERO_VAULT_ATMOSPHERE: FinishAtmosphere = {
  void: "#07070a",
  fogColor: "#07070a",
  fogNear: 6,
  fogFar: 16,
  ambient: { color: "#c8d8ec", intensity: 0.42 },
  key: { color: "#f4f8ff", intensity: 1.2 },
  fill: { color: "#1a3050", intensity: 0.5 },
  rim: { color: "#06b6d4", intensity: 0.78 },
  floor: { color: "#040810", roughness: 0.88, metalness: 0.12 },
  glow: "color-mix(in oklch, #06b6d4 14%, #e2e8f0 10%, transparent)",
};
