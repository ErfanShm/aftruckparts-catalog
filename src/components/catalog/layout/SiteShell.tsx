import type { ReactNode } from "react";

import { AmbientCanvas } from "./AmbientCanvas";
import { SeoJsonLd } from "./SeoJsonLd";
import { SiteEntrance } from "./SiteEntrance";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SeoJsonLd />
      <AmbientCanvas />
      <SiteEntrance>
        <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
      </SiteEntrance>
    </div>
  );
}
