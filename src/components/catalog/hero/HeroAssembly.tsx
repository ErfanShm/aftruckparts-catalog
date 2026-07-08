import { useEffect } from "react";

import { AfLogoModel } from "./AfLogoModel";

type HeroAssemblyProps = {
  onReady?: () => void;
};

/** Static AF monolith — only moves when the user drags the vault camera. */
export function HeroAssembly({ onReady }: HeroAssemblyProps) {
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
      <AfLogoModel />
    </group>
  );
}
