import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CatalogImage, CATALOG_IMAGE_SIZES } from "@/components/catalog/CatalogImage";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/locales";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { SectionRule } from "../layout/SectionRule";
import { QuoteDockFab } from "./QuoteDockFab";

type QuoteDockProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: [string, number][];
  products: Product[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onSend: (customer: string, details: string) => void;
};

function QuoteList({
  items,
  products,
  onAdd,
  onRemove,
}: {
  items: [string, number][];
  products: Product[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const { messages, dir } = useLocale();

  if (items.length === 0) {
    return (
      <div className="empty-state py-16">
        <span className="empty-state-icon" aria-hidden />
        <p className="empty-state-label">{messages.quote.empty}</p>
      </div>
    );
  }

  return (
    <ul>
      {items.map(([id, qty], index) => {
        const p = products.find((x) => x.id === id)!;
        return (
          <li key={id}>
            {index > 0 && <SectionRule className="my-4" />}
            <div className="flex items-center gap-4 py-1">
              <CatalogImage
                manifest={p.imageManifest.hero}
                alt=""
                placeholder={false}
                fill
                sizes={CATALOG_IMAGE_SIZES.quoteThumb}
                wrapperClassName="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"
                className="object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="font-mono-tech ltr-embed text-[10px] text-foreground-muted">
                  {p.code} · {p.brand}
                </div>
                <div className="type-ui truncate text-sm">{p.name}</div>
                <div className="truncate text-[10px] text-muted-foreground">{p.finish}</div>
              </div>
              <div
                className={[
                  "flex items-center gap-1 rounded-full glass-panel p-1",
                  dir === "rtl" && "flex-row-reverse",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button
                  type="button"
                  onClick={() => onRemove(id)}
                  className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-accent touch-manipulation"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-mono-tech ltr-embed w-6 text-center text-sm">{qty}</span>
                <button
                  type="button"
                  onClick={() => onAdd(id)}
                  className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-accent touch-manipulation"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function QuoteCustomerForm({
  customer,
  details,
  onCustomerChange,
  onDetailsChange,
}: {
  customer: string;
  details: string;
  onCustomerChange: (value: string) => void;
  onDetailsChange: (value: string) => void;
}) {
  const { messages } = useLocale();

  return (
    <div className="space-y-4 pb-5">
      <div className="space-y-2">
        <Label htmlFor="quote-customer" className="section-tag">
          {messages.quote.customerLabel}
        </Label>
        <Input
          id="quote-customer"
          value={customer}
          onChange={(e) => onCustomerChange(e.target.value)}
          placeholder={messages.quote.customerPlaceholder}
          className="glass-panel h-11 border-border-hair/50 bg-transparent px-4"
          autoComplete="organization"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="quote-details" className="section-tag">
          {messages.quote.detailsLabel}
        </Label>
        <Textarea
          id="quote-details"
          value={details}
          onChange={(e) => onDetailsChange(e.target.value)}
          placeholder={messages.quote.detailsPlaceholder}
          rows={3}
          className="glass-panel resize-none border-border-hair/50 bg-transparent px-4 py-3"
        />
      </div>
    </div>
  );
}

function QuoteFooter({
  items,
  customer,
  onSend,
}: {
  items: [string, number][];
  customer: string;
  onSend: () => void;
}) {
  const { messages } = useLocale();
  const canSend = items.length > 0 && customer.trim().length > 0;

  return (
    <div className="pt-4 safe-bottom">
      <SectionRule className="mb-5" />
      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        className="w-full rounded-full btn-primary px-6 py-4 text-sm type-ui-strong disabled:cursor-not-allowed disabled:opacity-30"
      >
        {messages.quote.sendWhatsApp} {messages.quote.sendWhatsAppArrow}
      </button>
      <p className="mt-3 text-center text-[10px] text-foreground-muted">
        {messages.quote.footerNote}
      </p>
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
  const { messages, dir } = useLocale();
  const isMobile = useIsMobile();
  const [customer, setCustomer] = useState("");
  const [details, setDetails] = useState("");
  const count = items.reduce((s, [, q]) => s + q, 0);
  const slideOff = dir === "rtl" ? "100%" : "-100%";

  const handleSend = () => {
    onSend(customer.trim(), details.trim());
  };

  return (
    <>
      <QuoteDockFab label={messages.quote.fab} count={count} onClick={() => onOpenChange(true)} />

      {isMobile ? (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent
            side="bottom"
            className="glass-panel-strong flex max-h-[92dvh] flex-col rounded-t-[1.25rem] border-border-hair/40 [&>button]:end-4 [&>button]:start-auto"
          >
            <SheetHeader className="text-start pb-2">
              <SheetTitle className="font-display tracking-tight">{messages.quote.title}</SheetTitle>
              <p className="section-tag">{messages.quote.sessionTag}</p>
            </SheetHeader>
            <div className="mt-5 flex-1 overflow-y-auto">
              <QuoteList items={items} products={products} onAdd={onAdd} onRemove={onRemove} />
            </div>
            <QuoteCustomerForm
              customer={customer}
              details={details}
              onCustomerChange={setCustomer}
              onDetailsChange={setDetails}
            />
            <QuoteFooter items={items} customer={customer} onSend={handleSend} />
          </SheetContent>
        </Sheet>
      ) : (
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => onOpenChange(false)}
                className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
              />
              <motion.aside
                initial={{ x: slideOff }}
                animate={{ x: 0 }}
                exit={{ x: slideOff }}
                transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel-strong fixed inset-y-0 start-0 z-50 flex w-full max-w-md flex-col border-e border-border-hair/40 p-7"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <p className="section-tag">{messages.quote.sessionTag}</p>
                    <h3 className="font-display mt-1 text-xl">{messages.quote.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="rounded-full p-2 glass-panel text-muted-foreground hover:text-accent"
                    aria-label={messages.quote.close}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <QuoteList items={items} products={products} onAdd={onAdd} onRemove={onRemove} />
                </div>
                <QuoteCustomerForm
                  customer={customer}
                  details={details}
                  onCustomerChange={setCustomer}
                  onDetailsChange={setDetails}
                />
                <QuoteFooter items={items} customer={customer} onSend={handleSend} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
