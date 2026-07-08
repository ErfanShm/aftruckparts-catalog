import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import type { FinishKey } from "@/data/products";
import { useLocale } from "@/lib/i18n";
import { gallerySlidesForProduct } from "@/lib/product-gallery";
import { quoteLineQty } from "@/lib/quote-lines";
import { cn } from "@/lib/utils";
import type { Product } from "@/locales";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { DualFinishQuoteActions } from "./FinishQtyStepper";
import { ProductImageGallery, usePhotoNavigation } from "./ProductImageGallery";
import { ProductIndexStrip } from "./ProductIndexStrip";

type ProductDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  quote: Record<string, number>;
  onAdd: (id: string, finishKey?: FinishKey) => void;
  onRemove: (id: string, finishKey?: FinishKey) => void;
};

function isCodeLikeValue(value: string) {
  return !/[\u0600-\u06FF]/.test(value);
}

function finishTagClass(finishKey: Product["finishKey"]) {
  switch (finishKey) {
    case "matte":
      return "finish-specimen-tag-matte";
    case "matte-glossy":
      return "finish-specimen-tag-matte-glossy";
    case "glossy":
      return "finish-specimen-tag-glossy";
    case "steel":
      return "finish-specimen-tag-steel";
  }
}

function SpecRow({
  label,
  value,
  codeLike,
  finishKey,
}: {
  label: string;
  value: string;
  codeLike?: boolean;
  finishKey?: Product["finishKey"];
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-xs text-foreground/42">{label}</dt>
      <dd className="min-w-0 text-end">
        {finishKey ? (
          <span className={cn("finish-specimen-tag inline-flex", finishTagClass(finishKey))}>
            {value}
          </span>
        ) : (
          <span
            className={cn(
              "text-sm text-foreground/78",
              codeLike && "type-code ltr-embed",
            )}
          >
            {value}
          </span>
        )}
      </dd>
    </div>
  );
}

function ProductSpecSheet({ product }: { product: Product }) {
  const { messages } = useLocale();
  const d = messages.product.detail;

  const rows: {
    key: string;
    label: string;
    value: string;
    codeLike?: boolean;
    finishKey?: Product["finishKey"];
  }[] = [
    { key: "type", label: d.category, value: product.categoryLabel },
    { key: "dasteh", label: d.dasteh, value: product.dastehLabel },
    { key: "spec", label: d.specValue, value: product.spec, codeLike: true },
    { key: "finish", label: d.finish, value: product.finish, finishKey: product.finishOffers.length > 1 ? undefined : product.finishKey },
  ];

  if (product.modelCompat) {
    rows.push({
      key: "compat",
      label: d.compat,
      value: product.modelCompat,
      codeLike: isCodeLikeValue(product.modelCompat),
    });
  }

  if (product.euroNorm) {
    rows.push({
      key: "euro",
      label: d.euroNorm,
      value: product.euroNorm,
      codeLike: true,
    });
  }

  return (
    <section className="mt-4" aria-label={d.spec}>
      <h3 className="text-[11px] uppercase tracking-[0.14em] text-foreground/32">{d.spec}</h3>
      <dl className="mt-2 divide-y divide-foreground/[0.06] rounded-xl border border-foreground/[0.07] bg-foreground/[0.025] px-4">
        {rows.map((row) => (
          <SpecRow
            key={row.key}
            label={row.label}
            value={row.value}
            codeLike={row.codeLike}
            finishKey={row.finishKey}
          />
        ))}
      </dl>
    </section>
  );
}

function ProductQuoteSection({
  product,
  quote,
  onAdd,
  onRemove,
  className,
}: {
  product: Product;
  quote: Record<string, number>;
  onAdd: (id: string, finishKey?: FinishKey) => void;
  onRemove: (id: string, finishKey?: FinishKey) => void;
  className?: string;
}) {
  const { messages, dir } = useLocale();
  const finishMap = Object.fromEntries(messages.finishes.map((f) => [f.key, f.label]));

  if (product.finishOffers.length > 1) {
    return (
      <DualFinishQuoteActions
        productId={product.id}
        finishOffers={product.finishOffers}
        finishMap={finishMap}
        quote={quote}
        onAdd={onAdd}
        onRemove={onRemove}
        variant="detail"
        className={className}
      />
    );
  }

  const finishKey = product.finishOffers[0]!;
  const quantity = quoteLineQty(quote, product.id, finishKey);

  return (
    <QuoteStepper
      quantity={quantity}
      onAdd={() => onAdd(product.id, finishKey)}
      onRemove={() => onRemove(product.id, finishKey)}
      dir={dir}
      addLabel={messages.product.addToQuote}
      decreaseLabel={messages.product.decreaseQty}
      increaseLabel={messages.product.increaseQty}
      className={className}
    />
  );
}

function QuoteStepper({
  quantity,
  onAdd,
  onRemove,
  dir,
  addLabel,
  decreaseLabel,
  increaseLabel,
  className,
}: {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  dir: "rtl" | "ltr";
  addLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
  className?: string;
}) {
  const { formatDigits } = useLocale();
  const inQuote = quantity > 0;

  if (!inQuote) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className={cn(
          "w-full rounded-xl btn-primary px-6 py-3.5 text-sm type-ui-strong active:scale-[0.98] transition-transform",
          className,
        )}
      >
        {addLabel}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl border border-border-hair/40 glass-panel px-4 py-3",
        className,
      )}
    >
      <span className="text-sm text-foreground/40">{addLabel}</span>
      <div className={cn("flex items-center gap-0.5", dir === "rtl" && "flex-row-reverse")}>
        <button
          type="button"
          onClick={onRemove}
          aria-label={decreaseLabel}
          className="flex h-8 w-8 touch-manipulation items-center justify-center rounded-lg text-foreground/25 transition-colors hover:text-foreground/60 active:scale-95"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-[13px] tabular-nums text-foreground/60">
          {formatDigits(quantity)}
        </span>
        <button
          type="button"
          onClick={onAdd}
          aria-label={increaseLabel}
          className="flex h-8 w-8 touch-manipulation items-center justify-center rounded-lg text-foreground/25 transition-colors hover:text-foreground/60 active:scale-95"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function ProductDetailBody({
  product,
  products,
  activeIndex,
  quote,
  onAdd,
  onRemove,
  onNavigate,
  onClose,
  isMobile,
}: {
  product: Product;
  products: Product[];
  activeIndex: number;
  quote: Record<string, number>;
  onAdd: (id: string, finishKey?: FinishKey) => void;
  onRemove: (id: string, finishKey?: FinishKey) => void;
  onNavigate: (index: number) => void;
  onClose: () => void;
  isMobile: boolean;
}) {
  const { messages, dir } = useLocale();
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides = useMemo(
    () => gallerySlidesForProduct(product.imageManifest.gallery),
    [product.imageManifest.gallery],
  );

  useEffect(() => {
    setPhotoIndex(0);
  }, [product.id]);

  useEffect(() => {
    if (photoIndex >= slides.length) setPhotoIndex(0);
  }, [photoIndex, slides.length]);

  const { handlePhotoKey } = usePhotoNavigation(slides.length, photoIndex, setPhotoIndex, dir);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      handlePhotoKey(e.key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePhotoKey, onClose]);

  const specPanel = (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="type-code ltr-embed text-[11px] text-foreground/35">{product.code}</p>
        <span className="rounded-full border border-brand/20 bg-brand/10 px-2.5 py-0.5 text-[10px] text-brand/80">
          {messages.product.warrantyBadge}
        </span>
      </div>
      <h2
        className={cn(
          "type-heading-display leading-snug text-foreground",
          isMobile ? "mt-2 text-lg" : "mt-2 text-[1.35rem] md:text-2xl",
        )}
      >
        {product.name}
      </h2>

      <ProductSpecSheet product={product} />

      <section className="mt-5">
        <h3 className="text-[11px] uppercase tracking-[0.14em] text-foreground/32">
          {messages.product.detail.description}
        </h3>
        <p className="mt-2 text-sm leading-[1.75] text-muted-foreground">{product.description}</p>
      </section>

      {!isMobile && (
        <div className="mt-auto space-y-3 pt-6">
          <ProductQuoteSection
            product={product}
            quote={quote}
            onAdd={onAdd}
            onRemove={onRemove}
          />
          <p className="text-center text-[11px] text-foreground/30">{messages.product.warranty}</p>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="relative shrink-0">
          <ProductImageGallery
            slides={slides}
            photoIndex={photoIndex}
            onPhotoChange={setPhotoIndex}
            alt={product.name}
            isMobile
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={messages.product.detail.close}
            className="absolute end-3 top-3 z-40 rounded-full bg-void/60 p-2 text-foreground/50 backdrop-blur-sm transition-colors active:text-foreground/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          key={product.id}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 scrollbar-minimal"
        >
          {specPanel}

          {products.length > 1 && (
            <ProductIndexStrip
              products={products}
              activeIndex={activeIndex}
              onNavigate={onNavigate}
              className="mt-5"
            />
          )}
        </div>

        <div className="shrink-0 border-t border-foreground/[0.06] vault-glass px-5 pt-3 backdrop-blur-md safe-bottom">
          <ProductQuoteSection
            product={product}
            quote={quote}
            onAdd={onAdd}
            onRemove={onRemove}
          />
          <p className="pb-1 pt-2 text-center text-[11px] text-foreground/30">
            {messages.product.warranty}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden md:flex-row">
      <div className="flex min-h-0 w-full min-w-0 flex-col bg-brand-panel/20 md:w-[min(100%,38rem)] md:shrink-0 md:border-e md:border-foreground/[0.05] md:px-6 md:py-6">
        <ProductImageGallery
          slides={slides}
          photoIndex={photoIndex}
          onPhotoChange={setPhotoIndex}
          alt={product.name}
          isMobile={false}
          className="min-h-0 flex-1"
        />

        <ProductIndexStrip
          products={products}
          activeIndex={activeIndex}
          onNavigate={onNavigate}
          className="mt-5 w-full min-w-0 shrink-0"
        />
      </div>

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto scrollbar-minimal md:p-8 md:ps-6">
        <div className="mb-2 flex items-start justify-end md:absolute md:end-6 md:top-6">
          <button
            type="button"
            onClick={onClose}
            aria-label={messages.product.detail.close}
            className="rounded-full p-2 text-foreground/25 transition-colors hover:bg-foreground/[0.04] hover:text-foreground/60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div key={product.id} className="flex min-h-0 flex-1 flex-col px-5 pt-2 md:px-0 md:pt-0">
          {specPanel}
        </div>
      </div>
    </div>
  );
}

export function ProductDetailModal({
  open,
  onOpenChange,
  products,
  activeIndex,
  onNavigate,
  quote,
  onAdd,
  onRemove,
}: ProductDetailModalProps) {
  const isMobile = useIsMobile();
  const product = products[activeIndex];

  // Desktop uses a custom modal — lock page scroll. Mobile Sheet (Radix) handles this itself.
  useBodyScrollLock(open && !isMobile);

  if (!product) return null;

  const close = () => onOpenChange(false);

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="flex h-[92dvh] max-h-[92dvh] flex-col rounded-t-2xl border-border-hair bg-void p-0 [&>button]:hidden"
        >
          <div className="mx-auto mt-2.5 mb-1 h-1 w-10 shrink-0 rounded-full bg-foreground/10" />
          <ProductDetailBody
            product={product}
            products={products}
            activeIndex={activeIndex}
            quote={quote}
            onAdd={onAdd}
            onRemove={onRemove}
            onNavigate={onNavigate}
            onClose={close}
            isMobile
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-void/80"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-4 z-50 mx-auto flex max-h-[calc(100vh-2rem)] max-w-5xl flex-col overflow-hidden rounded-2xl border border-foreground/[0.06] bg-void shadow-[0_32px_80px_-24px_rgba(0,0,0,0.65)] md:inset-8 md:max-h-[calc(100vh-4rem)]"
            role="dialog"
            aria-modal="true"
          >
            <ProductDetailBody
              product={product}
              products={products}
              activeIndex={activeIndex}
              quote={quote}
              onAdd={onAdd}
              onRemove={onRemove}
              onNavigate={onNavigate}
              onClose={close}
              isMobile={false}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
