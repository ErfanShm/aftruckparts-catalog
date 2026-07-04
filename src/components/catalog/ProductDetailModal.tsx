import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, type TouchEvent } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Product } from "@/locales";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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
          <span className="text-end font-mono text-[13px] text-foreground/80">{row.value}</span>
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
      <div className="inline-flex max-w-full flex-wrap rounded-full border border-foreground/[0.08] bg-foreground/[0.03] p-0.5">
        {variants.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => onSelect(v.id)}
            aria-pressed={v.id === product.id}
            className={cn(
              "rounded-full px-4 py-2 text-xs transition-colors md:px-3.5 md:py-1.5",
              v.id === product.id
                ? "bg-foreground text-background"
                : "text-foreground/50 hover:text-foreground/80",
            )}
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
          "w-full rounded-xl bg-foreground px-6 py-3.5 text-sm text-background active:scale-[0.98] transition-transform",
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
        "flex items-center justify-between gap-4 rounded-xl border border-foreground/[0.06] px-4 py-3",
        className,
      )}
    >
      <span className="text-sm text-foreground/40">{addLabel}</span>
      <div
        className={cn(
          "flex items-center gap-0.5",
          dir === "rtl" && "flex-row-reverse",
        )}
      >
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

function ThumbnailFilmstrip({
  products,
  activeIndex,
  onNavigate,
  compact = false,
  className,
}: {
  products: Product[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  compact?: boolean;
  className?: string;
}) {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  if (products.length <= 1) return null;

  return (
    <div
      ref={stripRef}
      className={cn(
        "flex snap-x snap-mandatory gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        compact ? "px-4 pb-1 pt-2.5" : "px-1 pb-1 pt-3",
        className,
      )}
    >
      {products.map((p, i) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onNavigate(i)}
          aria-current={i === activeIndex ? "true" : undefined}
          className={cn(
            "snap-center shrink-0 overflow-hidden rounded-lg border transition-all duration-300 touch-manipulation",
            compact
              ? i === activeIndex
                ? "h-12 w-12 border-accent/40 ring-1 ring-accent/25"
                : "h-10 w-10 border-foreground/[0.06] opacity-50 active:opacity-80"
              : i === activeIndex
                ? "h-14 w-14 border-accent/40 ring-1 ring-accent/25"
                : "h-12 w-12 border-foreground/[0.06] opacity-50 hover:opacity-80",
          )}
        >
          <img src={p.image} alt="" className="h-full w-full object-cover" />
        </button>
      ))}
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
  const touchStart = useRef<number | null>(null);
  const canPrev = activeIndex > 0;
  const canNext = activeIndex < products.length - 1;

  const goPrev = useCallback(() => {
    if (canPrev) onNavigate(activeIndex - 1);
  }, [activeIndex, canPrev, onNavigate]);

  const goNext = useCallback(() => {
    if (canNext) onNavigate(activeIndex + 1);
  }, [activeIndex, canNext, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") (dir === "rtl" ? goNext : goPrev)();
      if (e.key === "ArrowRight") (dir === "rtl" ? goPrev : goNext)();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dir, goNext, goPrev, onClose]);

  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - (e.changedTouches[0]?.clientX ?? touchStart.current);
    touchStart.current = null;
    if (Math.abs(delta) < 48) return;
    if (dir === "rtl") {
      delta > 0 ? goPrev() : goNext();
    } else {
      delta > 0 ? goNext() : goPrev();
    }
  };

  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;
  const positionLabel = messages.product.detail.position(activeIndex + 1, products.length);
  const showNav = products.length > 1;
  const navBtnClass =
    "absolute top-1/2 z-30 flex -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-void/70 p-2.5 text-foreground/50 backdrop-blur-sm transition-colors active:scale-95 active:text-foreground/80 md:bg-void/50 md:p-2 md:hover:text-foreground/80";

  return (
    <div className="relative flex min-h-0 flex-1 flex-col md:flex-row">
      <div className="relative flex min-h-0 shrink-0 flex-col md:w-[52%]">
        <div className="pointer-events-none absolute start-0 top-1/2 z-20 hidden -translate-y-1/2 md:block">
          <div className="rounded-e-sm border border-s-0 border-foreground/[0.06] bg-void/80 px-1.5 py-2.5">
            <span className="font-mono text-[9px] tracking-[0.2em] text-foreground/30 [writing-mode:vertical-lr]">
              {positionLabel}
            </span>
          </div>
        </div>

        <div
          className={cn(
            "relative flex flex-1 flex-col",
            isMobile ? "min-h-0 shrink-0" : "p-5 pb-2 md:p-6 md:pb-2",
          )}
        >
          {isMobile ? (
            <>
              <div
                className="relative min-h-[34vh] max-h-[42vh] flex-1 overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {showNav && canPrev && (
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={messages.product.detail.prev}
                    className={cn(navBtnClass, "start-2")}
                  >
                    <PrevIcon className="h-4 w-4" />
                  </button>
                )}
                {showNav && canNext && (
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={messages.product.detail.next}
                    className={cn(navBtnClass, "end-2")}
                  >
                    <NextIcon className="h-4 w-4" />
                  </button>
                )}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={product.id}
                    src={product.image}
                    alt={product.name}
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-void/60 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <span className="font-mono text-[10px] text-foreground/50">{positionLabel}</span>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={messages.product.detail.close}
                    className="rounded-full bg-void/50 p-2 text-foreground/40 transition-colors hover:text-foreground/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <ThumbnailFilmstrip
                products={products}
                activeIndex={activeIndex}
                onNavigate={onNavigate}
                compact
              />
            </>
          ) : (
            <div className="vault-glass relative flex min-h-[280px] flex-1 flex-col overflow-hidden rounded-2xl p-2.5 md:min-h-0 md:p-3">
              {showNav && canPrev && (
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label={messages.product.detail.prev}
                  className={cn(navBtnClass, "start-3")}
                >
                  <PrevIcon className="h-4 w-4" />
                </button>
              )}
              {showNav && canNext && (
                <button
                  type="button"
                  onClick={goNext}
                  aria-label={messages.product.detail.next}
                  className={cn(navBtnClass, "end-3")}
                >
                  <NextIcon className="h-4 w-4" />
                </button>
              )}
              <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-xl md:min-h-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={product.id}
                    src={product.image}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </AnimatePresence>
              </div>
              <ThumbnailFilmstrip
                products={products}
                activeIndex={activeIndex}
                onNavigate={onNavigate}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          !isMobile && "overflow-y-auto p-5 md:p-8 md:ps-6",
        )}
      >
        <div className="mb-4 hidden items-start justify-end md:flex">
          <button
            type="button"
            onClick={onClose}
            aria-label={messages.product.detail.close}
            className="rounded-full bg-foreground/[0.04] p-2 text-foreground/30 transition-colors hover:text-foreground/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          key={product.id}
          className={cn(
            "flex min-h-0 flex-1 flex-col",
            isMobile && "overflow-hidden",
          )}
        >
          <div
            className={cn(
              "flex flex-1 flex-col",
              isMobile && "min-h-0 overflow-y-auto overscroll-contain px-5 pt-5 pb-6",
            )}
          >
            <p className="font-mono text-[10px] tracking-wide text-foreground/30">
              {product.code}
              <span className="mx-2 text-foreground/15">·</span>
              {product.brand}
            </p>
            <h2 className="mt-2 text-[1.35rem] font-light leading-snug text-foreground md:text-3xl">
              {product.name}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mt-4">
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
          </div>

          {isMobile && (
            <div className="shrink-0 border-t border-foreground/[0.06] vault-glass px-5 pt-4 backdrop-blur-md safe-bottom">
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
            className="fixed inset-4 z-50 mx-auto flex max-h-[calc(100vh-2rem)] max-w-5xl flex-col overflow-hidden rounded-2xl border border-foreground/[0.06] bg-void md:inset-8 md:max-h-[calc(100vh-4rem)]"
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
