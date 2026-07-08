import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type GalleryGroupHeaderProps = {
  label: string;
  count: number;
  isFirst?: boolean;
  className?: string;
};

export function GalleryGroupHeader({
  label,
  count,
  isFirst = true,
  className,
}: GalleryGroupHeaderProps) {
  const { formatDigits } = useLocale();

  return (
    <div className={cn("mb-5 md:mb-6", !isFirst && "pt-7 md:pt-8", className)}>
      {!isFirst && (
        <div className="mb-5 flex items-center gap-3 md:mb-6" aria-hidden>
          <span className="section-rule-node" />
          <span className="section-rule-track min-w-0 flex-1" />
          <span className="section-rule-end" />
        </div>
      )}

      <header className="relative flex items-end justify-between gap-4 ps-3.5 md:gap-5 md:ps-4">
        <span
          className="absolute start-0 top-0.5 bottom-0.5 w-px bg-gradient-to-b from-brand/50 via-brand/22 to-transparent"
          aria-hidden
        />
        <h3 className="type-heading-display min-w-0 text-[1.125rem] leading-[1.15] tracking-tight text-foreground md:text-[1.3125rem]">
          {label}
        </h3>
        <span className="type-digits ltr-embed mb-0.5 shrink-0 tabular-nums text-muted-foreground/45">
          {formatDigits(count)}
        </span>
      </header>
    </div>
  );
}
