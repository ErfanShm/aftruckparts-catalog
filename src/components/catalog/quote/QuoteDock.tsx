import { Minus, Plus, X } from "lucide-react";
import { memo, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CatalogImage, CATALOG_IMAGE_SIZES } from "@/components/catalog/CatalogImage";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import type { FinishKey } from "@/data/products";
import { useLocale } from "@/lib/i18n";
import { parseQuoteLineKey } from "@/lib/quote-lines";
import { cn } from "@/lib/utils";
import type { Product } from "@/locales";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { QuoteDockFab } from "./QuoteDockFab";

type QuoteDockProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: [string, number][];
  products: Product[];
  onAdd: (id: string, finishKey?: FinishKey) => void;
  onRemove: (id: string, finishKey?: FinishKey) => void;
  onSend: (customer: string, details: string) => void;
};

function QuoteListHeader({ count }: { count: number }) {
  const { messages, formatDigits } = useLocale();
  if (count === 0) return null;
  return (
    <p className="mb-3 text-xs text-foreground/68">
      {formatDigits(messages.quote.itemsCount(count))}
      <span className="mx-2 opacity-30">·</span>
      {messages.quote.qtyHint}
    </p>
  );
}

function QuoteEmptyState() {
  const { messages, formatDigits } = useLocale();

  return (
    <div className="flex flex-col items-center px-2 py-12 text-center">
      <p className="text-sm text-foreground/78">{messages.quote.empty}</p>
      <p className="mt-3 max-w-[16rem] text-xs leading-relaxed text-foreground/62">
        {messages.quote.emptyHint}
      </p>
      <ol className="mt-8 w-full max-w-[15rem] space-y-2.5 text-start text-xs text-foreground/68">
        {messages.orderGuide.steps.map((step, i) => (
          <li key={step.title} className="flex gap-2.5">
            <span className="type-digits shrink-0 text-foreground/52">{formatDigits(i + 1)}.</span>
            <span>{step.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function QuoteQtyStepper({
  qty,
  onAdd,
  onRemove,
}: {
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const { messages, dir, formatDigits } = useLocale();

  return (
    <div
      className={cn(
        "flex shrink-0 items-center rounded-full border border-foreground/[0.08] bg-void/50 px-0.5",
        dir === "rtl" && "flex-row-reverse",
      )}
    >
      <button
        type="button"
        onClick={onRemove}
        aria-label={messages.product.decreaseQty}
        className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-foreground/58 transition-colors hover:bg-foreground/[0.07] hover:text-foreground/88 active:scale-95"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="type-digits w-9 text-center text-[12px] tabular-nums text-foreground/78">{formatDigits(qty)}</span>
      <button
        type="button"
        onClick={onAdd}
        aria-label={messages.product.increaseQty}
        className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-foreground/58 transition-colors hover:bg-foreground/[0.07] hover:text-foreground/88 active:scale-95"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

const QuoteList = memo(function QuoteList({
  items,
  productMap,
  finishMap,
  onAdd,
  onRemove,
}: {
  items: [string, number][];
  productMap: Map<string, Product>;
  finishMap: Record<string, string>;
  onAdd: (id: string, finishKey?: FinishKey) => void;
  onRemove: (id: string, finishKey?: FinishKey) => void;
}) {
  const count = useMemo(() => items.reduce((sum, [, qty]) => sum + qty, 0), [items]);

  if (items.length === 0) return <QuoteEmptyState />;

  return (
    <>
      <QuoteListHeader count={count} />
      <ul className="divide-y divide-foreground/[0.06]">
        {items.map(([key, qty]) => {
          const { productId, finishKey } = parseQuoteLineKey(key);
          const p = productMap.get(productId);
          if (!p) return null;
          const finish = finishKey ? (finishMap[finishKey] ?? finishKey) : p.finish;

          return (
            <li key={key} className="flex items-center gap-3 py-3 first:pt-0">
              <CatalogImage
                manifest={p.imageManifest.hero}
                alt=""
                placeholder={false}
                fill
                sizes={CATALOG_IMAGE_SIZES.quoteThumb}
                wrapperClassName="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-foreground/[0.06]"
                className="object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] text-foreground/88">{p.name}</p>
                <p className="mt-0.5 truncate text-[11px] text-foreground/62">
                  {finish}
                  <span className="mx-1 opacity-30">·</span>
                  <span className="type-code ltr-embed">{p.code}</span>
                </p>
              </div>
              <QuoteQtyStepper
                qty={qty}
                onAdd={() => onAdd(productId, finishKey)}
                onRemove={() => onRemove(productId, finishKey)}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
});

function QuoteCheckout({
  customer,
  details,
  items,
  onCustomerChange,
  onDetailsChange,
  onSend,
}: {
  customer: string;
  details: string;
  items: [string, number][];
  onCustomerChange: (value: string) => void;
  onDetailsChange: (value: string) => void;
  onSend: () => void;
}) {
  const { messages } = useLocale();
  const hasItems = items.length > 0;
  const canSend = hasItems && customer.trim().length > 0;

  return (
    <div className="shrink-0 border-t border-foreground/[0.06] pt-4 safe-bottom">
      <div className="space-y-2.5">
        <Input
          id="quote-customer"
          value={customer}
          onChange={(e) => onCustomerChange(e.target.value)}
          placeholder={messages.quote.customerPlaceholder}
          aria-label={messages.quote.customerLabel}
          className="h-11 rounded-xl border-foreground/[0.08] bg-foreground/[0.03] px-3.5 text-sm"
          autoComplete="organization"
        />
        <Textarea
          id="quote-details"
          value={details}
          onChange={(e) => onDetailsChange(e.target.value)}
          placeholder={messages.quote.detailsPlaceholder}
          aria-label={messages.quote.detailsLabel}
          rows={2}
          className="resize-none rounded-xl border-foreground/[0.08] bg-foreground/[0.03] px-3.5 py-2.5 text-sm"
        />
      </div>

      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        className="mt-4 w-full rounded-xl btn-primary px-5 py-3.5 text-sm type-ui-strong disabled:cursor-not-allowed disabled:opacity-30"
      >
        {messages.quote.sendWhatsApp}
      </button>

      {hasItems && !canSend && (
        <p className="mt-2 text-center text-[11px] text-foreground/58">{messages.quote.nameRequired}</p>
      )}

      <p className="mt-2 text-center text-[10px] text-foreground/52">{messages.quote.footerNote}</p>
    </div>
  );
}

function QuotePanelHeader({ onClose }: { onClose: () => void }) {
  const { messages } = useLocale();

  return (
    <div className="flex items-center justify-between gap-3 pb-4">
      <h2 className="type-heading-display text-lg tracking-tight text-foreground">
        {messages.quote.title}
      </h2>
      <button
        type="button"
        onClick={onClose}
        className="rounded-full p-2 text-foreground/30 transition-colors hover:bg-foreground/[0.04] hover:text-foreground/60"
        aria-label={messages.quote.close}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function QuotePanelBody({
  items,
  productMap,
  finishMap,
  customer,
  details,
  onClose,
  onAdd,
  onRemove,
  onCustomerChange,
  onDetailsChange,
  onSend,
  className,
}: {
  items: [string, number][];
  productMap: Map<string, Product>;
  finishMap: Record<string, string>;
  customer: string;
  details: string;
  onClose: () => void;
  onAdd: (id: string, finishKey?: FinishKey) => void;
  onRemove: (id: string, finishKey?: FinishKey) => void;
  onCustomerChange: (value: string) => void;
  onDetailsChange: (value: string) => void;
  onSend: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <QuotePanelHeader onClose={onClose} />
      <div className="scrollbar-minimal min-h-0 flex-1 overflow-y-auto overscroll-contain pe-0.5">
        <QuoteList
          items={items}
          productMap={productMap}
          finishMap={finishMap}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      </div>
      <QuoteCheckout
        customer={customer}
        details={details}
        items={items}
        onCustomerChange={onCustomerChange}
        onDetailsChange={onDetailsChange}
        onSend={onSend}
      />
    </div>
  );
}

export function QuoteDock({
  open,
  onOpenChange,
  items,
  products,
  onAdd,
  onRemove,
  onSend,
}: QuoteDockProps) {
  const { messages } = useLocale();
  const isMobile = useIsMobile();
  const [customer, setCustomer] = useState("");
  const [details, setDetails] = useState("");

  const productMap = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const finishMap = useMemo(
    () => Object.fromEntries(messages.finishes.map((f) => [f.key, f.label])) as Record<string, string>,
    [messages.finishes],
  );
  const count = useMemo(() => items.reduce((s, [, q]) => s + q, 0), [items]);

  const handleSend = () => {
    onSend(customer.trim(), details.trim());
  };

  const close = () => onOpenChange(false);

  useBodyScrollLock(open && !isMobile);

  const panelProps = {
    items,
    productMap,
    finishMap,
    customer,
    details,
    onClose: close,
    onAdd,
    onRemove,
    onCustomerChange: setCustomer,
    onDetailsChange: setDetails,
    onSend: handleSend,
  };

  return (
    <>
      <QuoteDockFab label={messages.quote.fab} count={count} onClick={() => onOpenChange(true)} />

      {isMobile ? (
        open && (
          <Sheet open onOpenChange={onOpenChange}>
            <SheetContent
              side="bottom"
              className="flex max-h-[88dvh] flex-col rounded-t-2xl border-border-hair/40 bg-void p-5 [&>button]:hidden"
            >
              <div className="mx-auto mb-3 h-1 w-10 shrink-0 rounded-full bg-foreground/10" />
              <QuotePanelBody {...panelProps} />
            </SheetContent>
          </Sheet>
        )
      ) : (
        open && (
          <>
            <div
              role="presentation"
              onClick={close}
              className="quote-backdrop-enter fixed inset-0 z-50 bg-void/70"
            />
            <aside className="quote-sidebar-enter fixed inset-y-0 start-0 z-50 flex h-dvh w-full max-w-[22rem] flex-col overflow-hidden border-e border-foreground/[0.06] bg-void p-5 shadow-[24px_0_64px_-32px_rgba(0,0,0,0.5)]">
              <QuotePanelBody {...panelProps} />
            </aside>
          </>
        )
      )}
    </>
  );
}
