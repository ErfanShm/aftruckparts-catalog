import { cn } from "@/lib/utils";

type SectionRuleProps = {
  className?: string;
  /** Whispered mono index — e.g. "01" */
  index?: string;
};

export function SectionRule({ className, index }: SectionRuleProps) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden>
      {index && (
        <span className="font-mono-tech ltr-embed shrink-0 text-[9px] tracking-[0.35em] text-brand/40">
          {index}
        </span>
      )}
      <span className="section-rule-node" />
      <span className="section-rule-track min-w-0 flex-1" />
      <span className="section-rule-end" />
    </div>
  );
}
