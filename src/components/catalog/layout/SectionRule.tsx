import { sectionIndexDigits } from "@/lib/page-sections";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type SectionRuleProps = {
  className?: string;
  /** Section index — 1, 2, 3… */
  index?: number;
};

export function SectionRule({ className, index }: SectionRuleProps) {
  const { locale } = useLocale();
  const digits = index != null ? sectionIndexDigits(index, locale) : null;

  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden>
      {digits && (
        <span className="type-digits ltr-embed flex shrink-0 gap-0.5 tabular-nums text-brand/32">
          {digits.map((digit, i) => (
            <span key={`${digit}-${i}`}>{digit}</span>
          ))}
        </span>
      )}
      <span className="section-rule-node" />
      <span className="section-rule-track min-w-0 flex-1" />
      <span className="section-rule-end" />
    </div>
  );
}
