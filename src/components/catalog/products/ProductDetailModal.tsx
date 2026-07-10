import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import type { FinishKey } from "@/data/products";
import { useLocale } from "@/lib/i18n";
import { productQtyRules, productQuoteTotal } from "@/lib/quote-lines";
import { gallerySlidesForProduct } from "@/lib/product-gallery";
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

function finishTagClass(finishKey: Product["finishKey"], dualFinish: boolean) {
  if (dualFinish) return "finish-specimen-tag-matte-glossy";
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
  dualFinish,
}: {
  label: string;
  value: string;
  codeLike?: boolean;
  finishKey?: Product["finishKey"];
  dualFinish?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-xs text-foreground/68">{label}</dt>
      <dd className="min-w-0 text-end">
        {finishKey ? (
          <span
            className={cn(
              "finish-specimen-tag inline-flex",
              finishTagClass(finishKey, dualFinish ?? false),
            )}
          >
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
  const dualFinish = product.finishOffers.length > 1;

  const rows: {
    key: string;
    label: string;
    value: string;
    codeLike?: boolean;
    finishKey?: Product["finishKey"];
    dualFinish?: boolean;
  }[] = [
    { key: "type", label: d.category, value: product.categoryLabel },
    { key: "dasteh", label: d.dasteh, value: product.dastehLabel },
    { key: "spec", label: d.specValue, value: product.spec, codeLike: true },
  ];

  if (product.showFinish) {
    rows.push({
      key: "finish",
      label: d.finish,
      value: product.finish,
      finishKey: product.finishKey,
      dualFinish,
    });
  }

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
      <h3 className="text-[11px] uppercase tracking-[0.14em] text-foreground/58">{d.spec}</h3>
      <dl className="mt-2 divide-y divide-foreground/[0.06] rounded-xl border border-foreground/[0.07] bg-foreground/[0.025] px-4">
        {rows.map((row) => (
          <SpecRow
            key={row.key}
            label={row.label}
            value={row.value}
            codeLike={row.codeLike}
            finishKey={row.finishKey}
            dualFinish={row.dualFinish}
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
  compact = false,
}: {
  product: Product;
  quote: Record<string, number>;
  onAdd: (id: string, finishKey?: FinishKey) => void;
  onRemove: (id: string, finishKey?: FinishKey) => void;
  className?: string;
  compact?: boolean;
}) {
  const { messages, formatDigits } = useLocale();
  const finishMap = Object.fromEntries(messages.finishes.map((f) => [f.key, f.label]));
  const { minOrder } = productQtyRules(product.dasteh);

  return (
    <div className={className}>
      <DualFinishQuoteActions
        productId={product.id}
        finishOffers={product.finishOffers}
        finishMap={finishMap}
        quote={quote}
        onAdd={onAdd}
        onRemove={onRemove}
        variant={compact ? "detail-mobile" : "detail"}
        hideFinishLabel={!product.showFinish}
      />
      <p
        className={cn(
          "text-center text-[11px] leading-relaxed text-brand-readable",
          compact ? "mt-2" : "mt-2.5",
        )}
      >
        {formatDigits(messages.product.detail.minOrderWarning(minOrder))}
      </p>
    </div>
  );
}

function QuoteConfirmBar({
  quantity,
  onConfirm,
  compact = false,
}: {
  quantity: number;
  onConfirm: () => void;
  compact?: boolean;
}) {
  const { messages, formatDigits } = useLocale();
  const d = messages.product.detail;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={cn("w-full", compact ? "pt-2" : "pt-2")}
    >
      <button
        type="button"
        onClick={onConfirm}
        aria-label={formatDigits(d.confirmLabel(quantity))}
        className={cn(
          "flex w-full touch-manipulation items-center justify-between gap-3 rounded-xl border border-brand/14 bg-brand/[0.05] text-sm text-brand-readable transition-colors",
          "hover:border-brand/28 hover:bg-brand/[0.09] active:scale-[0.99]",
          compact ? "min-h-11 px-3.5 py-2.5" : "min-h-11 px-4 py-3",
        )}
      >
        <span className="type-ui-strong leading-none">{d.confirm}</span>
        <span className="type-digits text-[11px] tabular-nums text-brand-readable/90">
          {formatDigits(messages.quote.itemsCount(quantity))}
        </span>
      </button>
    </motion.div>
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigatedInModalRef = useRef(false);

  const handleNavigate = useCallback(
    (index: number) => {
      navigatedInModalRef.current = true;
      onNavigate(index);
    },
    [onNavigate],
  );

  const slides = useMemo(
    () => gallerySlidesForProduct(product.imageManifest.gallery),
    [product.imageManifest.gallery],
  );

  useEffect(() => {
    setPhotoIndex(0);
  }, [product.id]);

  useLayoutEffect(() => {
    if (!isMobile || !scrollRef.current) return;
    if (!navigatedInModalRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    navigatedInModalRef.current = false;
  }, [isMobile, product.id]);

  useEffect(() => {
    if (photoIndex >= slides.length) setPhotoIndex(0);
  }, [photoIndex, slides.length]);

  const { handlePhotoKey } = usePhotoNavigation(slides.length, photoIndex, setPhotoIndex, dir);

  const quantity = productQuoteTotal(quote, product.id, product.finishOffers);

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
        <p className="type-code ltr-embed text-[11px] text-foreground/62">{product.code}</p>
        {isMobile && (
          <span className="rounded-full border border-brand/20 bg-brand/10 px-2.5 py-0.5 text-[10px] text-brand-readable">
            {messages.product.warrantyBadge}
          </span>
        )}
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
        <h3 className="text-[11px] uppercase tracking-[0.14em] text-foreground/58">
          {messages.product.detail.description}
        </h3>
        <p className="mt-2 text-sm leading-[1.75] text-foreground/78">{product.description}</p>
      </section>
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
            className="absolute end-3 top-3 z-40 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-void/70 text-foreground/62 transition-colors active:text-foreground/92"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-4 scrollbar-minimal"
        >
          {specPanel}
        </div>

        <div className="shrink-0 border-t border-foreground/[0.06] bg-void safe-bottom">
          {products.length > 1 && (
            <ProductIndexStrip
              products={products}
              activeIndex={activeIndex}
              onNavigate={handleNavigate}
              className="border-0 border-b border-foreground/[0.06] px-5 py-2 pt-2"
            />
          )}
          <div className="px-5 py-2">
            <ProductQuoteSection
              product={product}
              quote={quote}
              onAdd={onAdd}
              onRemove={onRemove}
              compact
            />
            <AnimatePresence mode="popLayout">
              {quantity > 0 && (
                <QuoteConfirmBar quantity={quantity} onConfirm={onClose} compact />
              )}
            </AnimatePresence>
          </div>
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

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="absolute end-6 top-6 z-10">
          <button
            type="button"
            onClick={onClose}
            aria-label={messages.product.detail.close}
            className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full text-foreground/58 transition-colors hover:bg-foreground/[0.04] hover:text-foreground/88"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          key={product.id}
          className="min-h-0 flex-1 overflow-y-auto scrollbar-minimal px-5 pt-2 md:px-8 md:ps-6 md:pt-8 md:pe-14"
        >
          {specPanel}
        </div>

        <div className="shrink-0 border-t border-foreground/[0.06] px-5 py-4 md:px-8 md:ps-6">
          <ProductQuoteSection
            product={product}
            quote={quote}
            onAdd={onAdd}
            onRemove={onRemove}
          />
          <AnimatePresence mode="popLayout">
            {quantity > 0 && (
              <QuoteConfirmBar quantity={quantity} onConfirm={onClose} />
            )}
          </AnimatePresence>
          <p className="mt-3 text-center text-[11px] text-brand-readable">
            {messages.product.warranty}
          </p>
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

  const close = () => onOpenChange(false);

  // Keep Sheet mounted while closed so open flips closed→open (reliable first tap on mobile).
  if (isMobile) {
    return (
      <Sheet open={Boolean(open && product)} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          overlayClassName="bg-void/70 data-[state=open]:duration-[320ms] data-[state=closed]:duration-[260ms]"
          className={cn(
            "flex h-[94dvh] max-h-[94dvh] flex-col rounded-t-2xl border-border-hair bg-void p-0 [&>button]:hidden",
            // iOS-like sheet: ease-out rise, slightly longer so it doesn’t feel like a shock.
            "ease-[cubic-bezier(0.32,0.72,0,1)] data-[state=open]:duration-[360ms] data-[state=closed]:duration-[280ms]",
          )}
        >
          {product ? (
            <>
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
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    );
  }

  if (!product) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-void/80"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
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
