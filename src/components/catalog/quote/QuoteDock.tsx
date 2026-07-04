import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";

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
  onSend: () => void;
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
      <div className="py-12 text-center">
        <p className="text-sm text-muted-foreground">{messages.quote.empty}</p>
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
              <img src={p.image} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="font-mono-tech ltr-embed text-[10px] text-foreground-muted">
                  {p.code} · {p.brand}
                </div>
                <div className="truncate text-sm font-light">{p.name}</div>
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

function QuoteFooter({ items, onSend }: { items: [string, number][]; onSend: () => void }) {
  const { messages } = useLocale();

  return (
    <div className="pt-4 safe-bottom">
      <SectionRule className="mb-5" />
      <button
        type="button"
        onClick={onSend}
        disabled={items.length === 0}
        className="w-full rounded-full btn-primary px-6 py-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-30"
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
  const count = items.reduce((s, [, q]) => s + q, 0);
  const slideOff = dir === "rtl" ? "100%" : "-100%";

  return (
    <>
      <QuoteDockFab
        label={messages.quote.fab}
        count={count}
        onClick={() => onOpenChange(true)}
      />

      {isMobile ? (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent
            side="bottom"
            className="glass-panel flex max-h-[90vh] flex-col rounded-t-2xl border-border-hair [&>button]:end-4 [&>button]:start-auto"
          >
            <SheetHeader className="text-start">
              <SheetTitle className="font-light">{messages.quote.title}</SheetTitle>
              <p className="section-tag">{messages.quote.sessionTag}</p>
            </SheetHeader>
            <div className="mt-4 flex-1 overflow-y-auto">
              <QuoteList items={items} products={products} onAdd={onAdd} onRemove={onRemove} />
            </div>
            <QuoteFooter items={items} onSend={onSend} />
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
                className="glass-panel fixed inset-y-0 start-0 z-50 flex w-full max-w-md flex-col border-e border-border-hair p-6"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <p className="section-tag">{messages.quote.sessionTag}</p>
                    <h3 className="mt-1 text-xl font-light">{messages.quote.title}</h3>
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
                <QuoteFooter items={items} onSend={onSend} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
