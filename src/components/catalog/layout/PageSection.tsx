import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Subtle top rule between major page blocks */
  borderTop?: boolean;
  clipX?: boolean;
  /** Vertical editorial line on the column edge (desktop) */
  spine?: boolean;
  as?: "section" | "footer" | "div";
};

export function PageSection({
  id,
  children,
  className,
  borderTop = false,
  clipX = false,
  spine = false,
  as: Tag = "section",
}: PageSectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "scroll-mt-header site-column relative py-[var(--section-py)] md:py-[calc(var(--section-py)+1rem)]",
        borderTop && "border-t border-brand/10",
        clipX && "overflow-x-clip",
        className,
      )}
    >
      {spine && (
        <div
          className="editorial-spine pointer-events-none absolute inset-y-[8%] start-0 hidden w-px lg:block"
          aria-hidden
        />
      )}
      {children}
    </Tag>
  );
}
