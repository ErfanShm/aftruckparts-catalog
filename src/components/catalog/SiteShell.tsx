import type { ReactNode } from "react";

import { AmbientCanvas } from "./AmbientCanvas";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <AmbientCanvas />
      <div
        className="page-spine pointer-events-none fixed inset-y-0 start-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] z-[1] hidden w-px lg:block"
        aria-hidden
      />
      <div
        className="page-spine pointer-events-none fixed inset-y-0 end-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] z-[1] hidden w-px opacity-60 lg:block"
        aria-hidden
      />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </div>
  );
}
