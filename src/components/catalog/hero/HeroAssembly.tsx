import { AfLogoModel } from "./AfLogoModel";

/** AF monolith — camera idle-drifts and yields to user orbit. */
export function HeroAssembly() {
  return (
    <group rotation={[0.04, -0.14, 0]} scale={1.34}>
      <AfLogoModel />
    </group>
  );
}
