import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { BrandsBand } from "@/components/catalog/BrandsBand";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { CatalogSection } from "@/components/catalog/CatalogSection";
import { QuoteDock } from "@/components/catalog/QuoteDock";
import { SiteFooter } from "@/components/catalog/SiteFooter";
import { WarrantyBand } from "@/components/catalog/WarrantyBand";
import { SiteHeader, HeaderSpacer } from "@/components/catalog/SiteHeader";
import { SiteShell } from "@/components/catalog/SiteShell";
import type { FinishKey, ProductCategory } from "@/data/products";
import { useLocale } from "@/lib/i18n";
import { buildWhatsAppMessage } from "@/locales";

export const Route = createFileRoute("/")({
  component: CatalogPage,
});

function CatalogPage() {
  const { locale, products } = useLocale();
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
  const [activeFinish, setActiveFinish] = useState<FinishKey | null>(null);
  const [query, setQuery] = useState("");
  const [quote, setQuote] = useState<Record<string, number>>({});
  const [quoteOpen, setQuoteOpen] = useState(false);

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

  const brandCount = useMemo(() => new Set(products.map((p) => p.brand)).size, [products]);

  const sendWhatsApp = () => {
    const text = encodeURIComponent(buildWhatsAppMessage(locale, quoteItems, products));
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <SiteShell>
      <SiteHeader />
      <HeaderSpacer />
      <CatalogHero productCount={products.length} brandCount={brandCount} />

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
          setActiveCategory(null);
          setActiveFinish(null);
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
