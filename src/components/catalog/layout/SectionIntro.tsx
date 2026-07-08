import { cn } from "@/lib/utils";

type SectionIntroProps = {
  tag: string;
  title: string;
  subtitle?: string;
  /** Omit the diamond when a SectionRule sits above */
  hideTagMarker?: boolean;
  className?: string;
};

export function SectionIntro({
  tag,
  title,
  subtitle,
  hideTagMarker = false,
  className,
}: SectionIntroProps) {
  return (
    <div className={cn("max-w-xl", className)}>
      <div className={cn("flex items-center gap-3", hideTagMarker && "gap-0")}>
        {!hideTagMarker && <span className="h-1 w-1 shrink-0 rotate-45 bg-brand/35" aria-hidden />}
        <p className="section-tag">{tag}</p>
      </div>
      <h2 className="type-heading-display mt-4 text-[1.75rem] tracking-tight md:text-[2rem] lg:text-[2.125rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="type-ui mt-5 text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-[0.9375rem]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
