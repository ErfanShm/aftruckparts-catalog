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
      <div className={cn("flex items-center gap-2.5", hideTagMarker && "gap-0")}>
        {!hideTagMarker && (
          <span className="h-1 w-1 shrink-0 rotate-45 bg-brand/45" aria-hidden />
        )}
        <p className="section-tag">{tag}</p>
      </div>
      <h2 className="mt-3 text-2xl font-extralight tracking-tight md:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:mt-5 md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
