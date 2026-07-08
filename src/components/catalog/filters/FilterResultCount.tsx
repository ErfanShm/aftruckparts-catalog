import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FilterResultCountProps = {
  count: number;
  total: number;
  className?: string;
};

/** Result tally — keeps Persian reading order (۱۶ از ۲۶) with stable digit runs. */
export function FilterResultCount({ count, total, className }: FilterResultCountProps) {
  const { locale, messages, formatDigits } = useLocale();

  if (locale === "fa") {
    return (
      <span className={cn("filter-index-count", className)}>
        <span dir="ltr" className="type-digits tabular-nums">
          {formatDigits(count)}
        </span>
        <span aria-hidden>{" از "}</span>
        <span dir="ltr" className="type-digits tabular-nums">
          {formatDigits(total)}
        </span>
      </span>
    );
  }

  return (
    <span className={cn("filter-index-count ltr-embed", className)}>
      {messages.catalog.results(count, total)}
    </span>
  );
}
