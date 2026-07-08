import { AfLogoModel } from "./AfLogoModel";

/** Static AF monolith — only moves when the user drags the vault camera. */
export function HeroAssembly() {
  return (
    <group rotation={[0.04, -0.14, 0]} scale={1.34}>
      <AfLogoModel />
    </group>
  );
}
