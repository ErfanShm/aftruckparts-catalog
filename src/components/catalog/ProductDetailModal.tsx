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
  activeIndex: number;
  onNavigate: (index: number) => void;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

function SpecList({
  product,
  specLabel,
  euroLabel,
  finishLabel,
  warrantyLabel,
  warrantyValue,
}: {
  product: Product;
  specLabel: string;
  euroLabel: string;
  finishLabel: string;
  warrantyLabel: string;
  warrantyValue: string;
}) {
  const rows = [
    { label: specLabel, value: product.spec },
    { label: euroLabel, value: product.euro },
    { label: finishLabel, value: product.finish },
    { label: warrantyLabel, value: warrantyValue },
  ];

  return (
    <div className="mt-6 border-t border-foreground/[0.06]">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={cn("spec-row", i === rows.length - 1 && "border-b-0")}
        >
          <span className="section-tag shrink-0">{row.label}</span>
          <span className="text-end font-mono text-[13px] text-foreground/80">{row.value}</span>
        </div>
      ))}
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
}: {
  products: Product[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  return (
    <div
      ref={stripRef}
      className="hidden snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 pt-3 [-ms-overflow-style:none] [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden"
    >
      {products.map((p, i) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onNavigate(i)}
          aria-current={i === activeIndex ? "true" : undefined}
          className={cn(
            "snap-center shrink-0 overflow-hidden rounded-lg border transition-all duration-300",
            i === activeIndex
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
  activeIndex,
  quantity,
  onAdd,
  onRemove,
  onNavigate,
  onClose,
  isMobile,
}: {
  product: Product;
  products: Product[];
  activeIndex: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onNavigate: (index: number) => void;
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

  return (
    <div className="relative flex min-h-0 flex-1 flex-col md:flex-row">
      {canPrev && (
        <button
          type="button"
          onClick={goPrev}
          aria-label={messages.product.detail.prev}
          className="absolute start-3 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-void/50 p-2 text-foreground/40 transition-colors hover:text-foreground/80 md:flex"
        >
          <PrevIcon className="h-4 w-4" />
        </button>
      )}
      {canNext && (
        <button
          type="button"
          onClick={goNext}
          aria-label={messages.product.detail.next}
          className="absolute end-3 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-void/50 p-2 text-foreground/40 transition-colors hover:text-foreground/80 md:flex"
        >
          <NextIcon className="h-4 w-4" />
        </button>
      )}

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
            isMobile ? "min-h-[40vh]" : "p-5 pb-2 md:p-6 md:pb-2",
          )}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {isMobile ? (
            <div className="relative min-h-[40vh] flex-1 overflow-hidden">
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
          ) : (
            <div className="vault-glass relative flex min-h-[280px] flex-1 flex-col overflow-hidden rounded-2xl p-2.5 md:min-h-0 md:p-3">
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

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5 md:p-8 md:ps-6">
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

        <div key={product.id} className="flex min-h-0 flex-1 flex-col">
          <p className="font-mono text-[10px] tracking-wide text-foreground/30">
            {product.code}
            <span className="mx-2 text-foreground/15">·</span>
            {product.brand}
          </p>
          <h2 className="mt-2 text-2xl font-light leading-snug text-foreground md:text-3xl">
            {product.name}
          </h2>

          <SpecList
            product={product}
            specLabel={messages.product.detail.spec}
            euroLabel={messages.product.detail.euroNorm}
            finishLabel={messages.product.detail.finish}
            warrantyLabel={messages.product.warranty}
            warrantyValue={messages.hero.stats.warranty.value}
          />

          <div
            className={cn(
              "mt-auto pt-6 safe-bottom",
              isMobile && "sticky bottom-0 vault-glass -mx-5 border-t border-foreground/[0.06] px-5 py-4 backdrop-blur-md",
            )}
          >
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
          className="flex h-[92vh] max-h-[92vh] flex-col rounded-t-2xl border-border-hair bg-void p-0 [&>button]:hidden"
        >
          <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-foreground/10" />
          <ProductDetailBody
            product={product}
            products={products}
            activeIndex={activeIndex}
            quantity={quantity}
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
            className="fixed inset-4 z-50 mx-auto flex max-h-[calc(100vh-2rem)] max-w-5xl flex-col overflow-hidden rounded-2xl border border-foreground/[0.06] bg-void md:inset-8 md:max-h-[calc(100vh-4rem)]"
            role="dialog"
            aria-modal="true"
          >
            <ProductDetailBody
              product={product}
              products={products}
              activeIndex={activeIndex}
              quantity={quantity}
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
