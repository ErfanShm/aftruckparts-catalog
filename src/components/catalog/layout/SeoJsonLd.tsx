import { useLocale } from "@/lib/i18n";
import { buildJsonLd } from "@/lib/seo";

export function SeoJsonLd() {
  const { locale, messages } = useLocale();
  const json = buildJsonLd(messages, locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
