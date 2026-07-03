import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Subtle top rule between major page blocks */
  borderTop?: boolean;
  clipX?: boolean;
  as?: "section" | "footer";
};

export function PageSection({
  id,
  children,
  className,
  borderTop = false,
  clipX = false,
  as: Tag = "section",
}: PageSectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "scroll-mt-header mx-auto w-full max-w-6xl px-5 py-16 md:px-6 md:py-24",
        borderTop && "border-t border-brand/15",
        clipX && "overflow-x-clip",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
