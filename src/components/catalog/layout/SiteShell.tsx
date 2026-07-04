import type { ReactNode } from "react";

import { AmbientCanvas } from "./AmbientCanvas";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <AmbientCanvas />
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}
