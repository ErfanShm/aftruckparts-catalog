import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useLocale } from "@/lib/i18n";
import { gallerySlidesForProduct } from "@/lib/product-gallery";
import { cn } from "@/lib/utils";
import type { Product } from "@/locales";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { ProductImageGallery, usePhotoNavigation } from "./ProductImageGallery";
import { ProductIndexStrip } from "./ProductIndexStrip";

type ProductDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  allProducts: Product[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  onSelectProduct: (id: string) => void;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

function SpecList({
  product,
  labels,
  warrantyValue,
  className,
}: {
  product: Product;
  labels: {
    spec: string;
    category: string;
    compat: string;
    euroNorm: string;
    finish: string;
    warranty: string;
  };
  warrantyValue: string;
  className?: string;
}) {
  const rows: { label: string; value: string }[] = [
    { label: labels.spec, value: product.spec },
    { label: labels.category, value: product.categoryLabel },
  ];

  if (product.modelCompat) {
    rows.push({ label: labels.compat, value: product.modelCompat });
  }
  if (product.euroNorm) {
    rows.push({ label: labels.euroNorm, value: product.euroNorm });
  }
  if (product.category !== "installation") {
    rows.push({ label: labels.finish, value: product.finish });
  }
  rows.push({ label: labels.warranty, value: warrantyValue });

  return (
    <div className={cn("mt-5 border-t border-foreground/[0.06] md:mt-6", className)}>
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={cn(
            "spec-row max-md:gap-3 max-md:py-3.5",
            i === rows.length - 1 && "border-b-0",
          )}
        >
          <span className="section-tag shrink-0">{row.label}</span>
          <span className="text-end font-mono-tech ltr-embed text-[13px] text-foreground/80">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function VariantSwitcher({
  product,
  allProducts,
  variantLabel,
  onSelect,
}: {
  product: Product;
  allProducts: Product[];
  variantLabel: string;
  onSelect: (id: string) => void;
}) {
  if (product.variantIds.length <= 1) return null;

  const variants = product.variantIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <div className="mt-4 md:mt-5">
      <p className="section-tag mb-2.5">{variantLabel}</p>
      <div className="finish-pill-group inline-flex max-w-full flex-wrap">
        {variants.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => onSelect(v.id)}
            aria-pressed={v.id === product.id}
            className={cn("finish-pill", v.id === product.id && "finish-pill-active")}
          >
            {v.finish}
          </button>
        ))}
      </div>
    </div>
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
          {quantity}
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
  allProducts,
  activeIndex,
  quantity,
  onAdd,
  onRemove,
  onNavigate,
  onSelectProduct,
  onClose,
  isMobile,
}: {
  product: Product;
  products: Product[];
  allProducts: Product[];
  activeIndex: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onNavigate: (index: number) => void;
  onSelectProduct: (id: string) => void;
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
      {!isMobile && (
        <>
          <p className="font-mono-tech ltr-embed text-[10px] tracking-[0.12em] text-foreground/30">
            {product.code}
            <span className="mx-2 text-foreground/15">·</span>
            {product.brand}
          </p>
          <h2 className="font-display mt-2 text-[1.35rem] leading-snug text-foreground md:text-3xl">
            {product.name}
          </h2>
        </>
      )}

      <p
        className={cn("text-sm leading-relaxed text-muted-foreground", !isMobile && "mt-3 md:mt-4")}
      >
        {product.description}
      </p>

      <VariantSwitcher
        product={product}
        allProducts={allProducts}
        variantLabel={messages.product.detail.variantLabel}
        onSelect={onSelectProduct}
      />

      <SpecList
        product={product}
        labels={{
          spec: messages.product.detail.spec,
          category: messages.product.detail.category,
          compat: messages.product.detail.compat,
          euroNorm: messages.product.detail.euroNorm,
          finish: messages.product.detail.finish,
          warranty: messages.product.warranty,
        }}
        warrantyValue={messages.hero.stats.warranty.value}
        className={isMobile ? "mb-2" : undefined}
      />

      {!isMobile && (
        <div className="mt-auto pt-6">
          <QuoteStepper
            quantity={quantity}
            onAdd={onAdd}
            onRemove={onRemove}
            dir={dir}
            addLabel={messages.product.addToQuote}
            decreaseLabel={messages.product.decreaseQty}
            increaseLabel={messages.product.increaseQty}
          />
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

        <div className="shrink-0 border-b border-foreground/[0.05] px-5 py-3">
          <p className="font-mono-tech ltr-embed text-[10px] tracking-[0.12em] text-foreground/35">
            {product.code}
            <span className="mx-2 text-foreground/15">·</span>
            {product.brand}
          </p>
          <h2 className="type-ui mt-1 text-lg leading-snug text-foreground">{product.name}</h2>
        </div>

        <div
          key={product.id}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-3"
        >
          {specPanel}

          {products.length > 1 && (
            <ProductIndexStrip
              products={products}
              activeIndex={activeIndex}
              onNavigate={onNavigate}
              minimal
              className="mt-5 border-t border-foreground/[0.05] pt-4"
            />
          )}
        </div>

        <div className="shrink-0 border-t border-foreground/[0.06] vault-glass px-5 pt-3 backdrop-blur-md safe-bottom">
          <QuoteStepper
            quantity={quantity}
            onAdd={onAdd}
            onRemove={onRemove}
            dir={dir}
            addLabel={messages.product.addToQuote}
            decreaseLabel={messages.product.decreaseQty}
            increaseLabel={messages.product.increaseQty}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden md:flex-row">
      <div className="flex min-h-0 w-full min-w-0 flex-col justify-center bg-brand-panel/20 md:w-[min(100%,38rem)] md:shrink-0 md:border-e md:border-foreground/[0.05] md:px-6 md:py-6">
        <ProductImageGallery
          slides={slides}
          photoIndex={photoIndex}
          onPhotoChange={setPhotoIndex}
          alt={product.name}
          isMobile={false}
          className="min-h-0"
        />

        <ProductIndexStrip
          products={products}
          activeIndex={activeIndex}
          onNavigate={onNavigate}
          className="mt-5 w-full min-w-0"
        />
      </div>

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto md:p-8 md:ps-6">
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
  allProducts,
  activeIndex,
  onNavigate,
  onSelectProduct,
  quantity,
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
            allProducts={allProducts}
            activeIndex={activeIndex}
            quantity={quantity}
            onAdd={onAdd}
            onRemove={onRemove}
            onNavigate={onNavigate}
            onSelectProduct={onSelectProduct}
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
              allProducts={allProducts}
              activeIndex={activeIndex}
              quantity={quantity}
              onAdd={onAdd}
              onRemove={onRemove}
              onNavigate={onNavigate}
              onSelectProduct={onSelectProduct}
              onClose={close}
              isMobile={false}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
