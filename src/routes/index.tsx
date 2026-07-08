import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";

import { CatalogHero } from "@/components/catalog/hero/CatalogHero";
import { OrderGuide } from "@/components/catalog/guide/OrderGuide";
import { SiteFooter } from "@/components/catalog/layout/SiteFooter";
import { SiteHeader, HeaderSpacer } from "@/components/catalog/layout/SiteHeader";
import { SiteShell } from "@/components/catalog/layout/SiteShell";
import { QuoteDock } from "@/components/catalog/quote/QuoteDock";
import { CatalogSection } from "@/components/catalog/section/CatalogSection";
import type { FinishKey } from "@/data/products";
import {
  parseCatalogSearch,
  patchCatalogSearch,
  resolveDasteh,
  type CatalogSearch,
} from "@/lib/catalog-search";
import { useLocale } from "@/lib/i18n";
import { addQuoteQty, quoteLineKey, removeQuoteQty } from "@/lib/quote-lines";
import { buildWhatsAppOrderUrl } from "@/data/contact";
import { buildWhatsAppMessage } from "@/locales";

export const Route = createFileRoute("/")({
  validateSearch: parseCatalogSearch,
  component: CatalogPage,
});

function CatalogPage() {
  const { locale, products } = useLocale();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const activeDasteh = resolveDasteh(search.dasteh);
  const [query, setQuery] = useState("");
  const [quote, setQuote] = useState<Record<string, number>>({});
  const [quoteOpen, setQuoteOpen] = useState(false);

  const updateFilters = (patch: Parameters<typeof patchCatalogSearch>[1]) => {
    navigate({
      search: (prev) => patchCatalogSearch(prev as CatalogSearch, patch),
      replace: true,
      resetScroll: false,
    });
  };

  const setActiveDasteh = (dasteh: typeof activeDasteh) => {
    updateFilters({ dasteh });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (activeDasteh && p.dasteh !== activeDasteh) return false;
      if (
        q &&
        !`${p.name} ${p.code} ${p.dastehLabel} ${p.brand} ${p.finish} ${p.categoryLabel} ${p.description}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [activeDasteh, query, products]);

  const quoteItems = useMemo(
    () => Object.entries(quote).filter(([, qty]) => qty > 0) as [string, number][],
    [quote],
  );

  const addToQuote = useCallback(
    (id: string, finishKey?: FinishKey) => {
      const product = products.find((p) => p.id === id);
      if (!product) return;
      const finish = finishKey ?? product.finishOffers[0]!;
      const key = quoteLineKey(id, finish);
      setQuote((q) => ({ ...q, [key]: addQuoteQty(q[key] ?? 0) }));
    },
    [products],
  );

  const removeOne = useCallback(
    (id: string, finishKey?: FinishKey) => {
      const product = products.find((p) => p.id === id);
      if (!product) return;
      const finish = finishKey ?? product.finishOffers[0]!;
      const key = quoteLineKey(id, finish);
      setQuote((q) => ({ ...q, [key]: removeQuoteQty(q[key] ?? 0) }));
    },
    [products],
  );

  const sendWhatsApp = (customer: string, details: string) => {
    window.open(
      buildWhatsAppOrderUrl(
        encodeURIComponent(
          buildWhatsAppMessage(locale, quoteItems, products, customer, details),
        ),
      ),
      "_blank",
    );
  };

  return (
    <SiteShell>
      <SiteHeader />
      <HeaderSpacer />
      <CatalogHero />
      <OrderGuide />

      <CatalogSection
        filtered={filtered}
        quote={quote}
        onAdd={addToQuote}
        onRemove={removeOne}
        activeDasteh={activeDasteh}
        setActiveDasteh={setActiveDasteh}
        query={query}
        setQuery={setQuery}
        productCount={products.length}
      />

      <SiteFooter />

      <QuoteDock
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        items={quoteItems}
        products={products}
        onAdd={addToQuote}
        onRemove={removeOne}
        onSend={sendWhatsApp}
      />
    </SiteShell>
  );
}
