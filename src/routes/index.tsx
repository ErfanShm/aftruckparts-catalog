import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { BrandsBand } from "@/components/catalog/brands/BrandsBand";
import { CatalogHero } from "@/components/catalog/hero/CatalogHero";
import { SiteFooter } from "@/components/catalog/layout/SiteFooter";
import { SiteHeader, HeaderSpacer } from "@/components/catalog/layout/SiteHeader";
import { SiteShell } from "@/components/catalog/layout/SiteShell";
import { QuoteDock } from "@/components/catalog/quote/QuoteDock";
import { CatalogSection } from "@/components/catalog/section/CatalogSection";
import { WarrantyBand } from "@/components/catalog/warranty/WarrantyBand";
import type { FinishKey, ProductCategory } from "@/data/products";
import {
  parseCatalogSearch,
  patchCatalogSearch,
  resolveBrand,
  type CatalogSearch,
} from "@/lib/catalog-search";
import { useLocale } from "@/lib/i18n";
import { buildWhatsAppMessage } from "@/locales";

export const Route = createFileRoute("/")({
  validateSearch: parseCatalogSearch,
  component: CatalogPage,
});

function CatalogPage() {
  const { locale, products } = useLocale();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const activeBrand = resolveBrand(search.brand);
  const activeCategory = search.category ?? null;
  const activeFinish = search.finish ?? null;
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

  const setActiveBrand = (brand: string | null) => {
    updateFilters({ brand, category: null, finish: null });
  };

  const setActiveCategory = (category: ProductCategory | null) => {
    updateFilters({ category });
  };

  const setActiveFinish = (finish: FinishKey | null) => {
    updateFilters({ finish });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (activeBrand && p.brand !== activeBrand) return false;
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeFinish && p.finishKey !== activeFinish) return false;
      if (
        q &&
        !`${p.name} ${p.code} ${p.brand} ${p.finish} ${p.categoryLabel} ${p.description}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [activeBrand, activeCategory, activeFinish, query, products]);

  const quoteItems = Object.entries(quote).filter(([, qty]) => qty > 0) as [string, number][];

  const addToQuote = (id: string) => setQuote((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  const removeOne = (id: string) =>
    setQuote((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) }));

  const sendWhatsApp = (customer: string, details: string) => {
    const text = encodeURIComponent(
      buildWhatsAppMessage(locale, quoteItems, products, customer, details),
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <SiteShell>
      <SiteHeader />
      <HeaderSpacer />
      <CatalogHero />

      <CatalogSection
        filtered={filtered}
        allProducts={products}
        quote={quote}
        onAdd={addToQuote}
        onRemove={removeOne}
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeFinish={activeFinish}
        setActiveFinish={setActiveFinish}
        query={query}
        setQuery={setQuery}
        productCount={products.length}
      />

      <BrandsBand
        products={products}
        onSelectBrand={(brand) => {
          setActiveBrand(brand);
        }}
      />

      <WarrantyBand />
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
