import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Minus,
  Plus,
  Search,
  Shield,
  Terminal,
  X,
} from "lucide-react";

import part1 from "@/assets/part-1.jpg";
import part2 from "@/assets/part-2.jpg";
import part3 from "@/assets/part-3.jpg";
import part4 from "@/assets/part-4.jpg";
import part5 from "@/assets/part-5.jpg";
import part6 from "@/assets/part-6.jpg";

export const Route = createFileRoute("/")({
  component: CatalogPage,
});

type Product = {
  id: string;
  code: string;
  name: string;
  brand: string;
  finish: string;
  spec: string;
  euro: string;
  image: string;
  span: "sm" | "md" | "lg" | "xl";
};

const PRODUCTS: Product[] = [
  { id: "p1", code: "ATP-480", name: "Cabin Emblem — Chrome", brand: "Volvo", finish: "Glossy", spec: "480", euro: "EURO 6", image: part1, span: "lg" },
  { id: "p2", code: "ATP-750", name: "Grille Plate — Matte", brand: "DAF",   finish: "Matte",  spec: "750", euro: "EURO 6", image: part2, span: "md" },
  { id: "p3", code: "ATP-620", name: "Exhaust Tip — Twin", brand: "Scania", finish: "Glossy", spec: "620", euro: "EURO 5", image: part3, span: "md" },
  { id: "p4", code: "ATP-540", name: "Mirror Housing — Steel", brand: "MAN",   finish: "Steel",  spec: "540", euro: "EURO 6", image: part4, span: "xl" },
  { id: "p5", code: "ATP-460", name: "Hub Cap — Radial", brand: "Volvo", finish: "Steel",  spec: "460", euro: "EURO 5", image: part5, span: "sm" },
  { id: "p6", code: "ATP-880", name: "Air Horn — Polished", brand: "DAF",   finish: "Glossy", spec: "880", euro: "EURO 6", image: part6, span: "md" },
];

const BRANDS = ["Volvo", "DAF", "Scania", "MAN", "Mercedes"] as const;
const FINISHES = ["Matte", "Glossy", "Steel"] as const;

const BRAND_LOGO = "/apple-touch-icon.png";

function CatalogPage() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [activeFinish, setActiveFinish] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [quote, setQuote] = useState<Record<string, number>>({});
  const [quoteOpen, setQuoteOpen] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (activeBrand && p.brand !== activeBrand) return false;
      if (activeFinish && p.finish !== activeFinish) return false;
      if (query && !`${p.name} ${p.code} ${p.brand}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [activeBrand, activeFinish, query]);

  const quoteItems = Object.entries(quote).filter(([, q]) => q > 0);
  const quoteCount = quoteItems.reduce((s, [, q]) => s + q, 0);

  const addToQuote = (id: string) =>
    setQuote((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  const removeOne = (id: string) =>
    setQuote((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) }));

  const sendWhatsApp = () => {
    const lines = quoteItems.map(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id)!;
      return `• ${p.code} — ${p.name} × ${qty}`;
    });
    const text = encodeURIComponent(
      `AFTRUCKPARTS — Quote Request\n\n${lines.join("\n")}\n\nPlease confirm pricing & lead time.`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 grid-noise opacity-40" />
        <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px] ambient-pulse" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      {/* Nav */}
      <Nav />

      {/* Hero */}
      <Hero />

      {/* Filter terminal */}
      <FilterBar
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
        activeFinish={activeFinish}
        setActiveFinish={setActiveFinish}
        query={query}
        setQuery={setQuery}
        resultCount={filtered.length}
      />

      {/* Product bento */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-40">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] gap-3 md:gap-4">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              inQuote={(quote[p.id] ?? 0) > 0}
              onAdd={() => addToQuote(p.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <p className="font-mono-tech text-sm text-muted-foreground">
                // no_results — clear filters to reset the vault
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Floating quote FAB */}
      <QuoteFab count={quoteCount} onClick={() => setQuoteOpen(true)} />

      {/* Quote drawer */}
      <AnimatePresence>
        {quoteOpen && (
          <QuoteDrawer
            items={quoteItems}
            onClose={() => setQuoteOpen(false)}
            onAdd={addToQuote}
            onRemove={removeOne}
            onSend={sendWhatsApp}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------ NAV ------------------------------ */

function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <img
      src={BRAND_LOGO}
      alt="Aftruckparts"
      width={size}
      height={size}
      className="shrink-0 rounded-sm"
    />
  );
}

function Nav() {
  return (
    <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 pt-8">
      <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
        <BrandMark size={28} />
        <span className="font-mono-tech text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          aftruckparts
        </span>
      </a>
      <nav className="hidden gap-8 md:flex">
        {["Catalog", "Brands", "Warranty", "Contact"].map((l) => (
          <a
            key={l}
            href="#"
            className="font-mono-tech text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-accent"
          >
            {l}
          </a>
        ))}
      </nav>
      <div className="font-mono-tech text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        <span className="text-accent">●</span> vault_online
      </div>
    </header>
  );
}

/* ----------------------------- HERO ------------------------------ */

function Hero() {
  return (
    <section className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pt-16">
      {/* Massive wireframe number */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none"
      >
        <span
          className="block font-mono-tech text-[26rem] font-bold leading-none tracking-tighter md:text-[34rem]"
          style={{
            WebkitTextStroke: "1px oklch(0.78 0.14 210 / 20%)",
            color: "transparent",
          }}
        >
          480
        </span>
      </div>

      <div className="relative max-w-4xl">
        <div className="mb-8 inline-flex items-center gap-2 hair-border rounded-full bg-surface/40 px-3 py-1.5 backdrop-blur">
          <Terminal className="h-3 w-3 text-accent" />
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            catalog_v2.4 / b2b_only
          </span>
        </div>

        <h1 className="text-5xl font-light leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
          Engineered
          <br />
          hardware for the
          <br />
          <span className="italic text-accent">long haul.</span>
        </h1>

        <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          A curated vault of chrome, matte and steel-finished truck badges.
          Sourced for fleets. Backed by a two-year warranty.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <a
            href="#catalog"
            className="group inline-flex items-center gap-3 hair-border-cyan rounded-full bg-surface/60 px-6 py-3 backdrop-blur transition-all hover:bg-surface"
          >
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.24em] text-foreground">
              enter_the_vault
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="flex items-center gap-6 border-l border-border-hair pl-6">
            <StatCell label="SKUs" value="480+" />
            <StatCell label="Brands" value="12" />
            <StatCell label="Warranty" value="24mo" accent />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className={`font-mono-tech text-lg ${accent ? "text-accent" : "text-foreground"}`}>
        {value}
      </div>
      <div className="font-mono-tech text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/* --------------------------- FILTER BAR --------------------------- */

function FilterBar({
  activeBrand, setActiveBrand,
  activeFinish, setActiveFinish,
  query, setQuery,
  resultCount,
}: {
  activeBrand: string | null;
  setActiveBrand: (v: string | null) => void;
  activeFinish: string | null;
  setActiveFinish: (v: string | null) => void;
  query: string;
  setQuery: (v: string) => void;
  resultCount: number;
}) {
  return (
    <section id="catalog" className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="font-mono-tech text-[10px] uppercase tracking-[0.28em] text-accent">
            // catalog.query
          </div>
          <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">
            Filter the vault.
          </h2>
        </div>
        <div className="hidden md:block font-mono-tech text-xs text-muted-foreground">
          <span className="text-accent">{String(resultCount).padStart(3, "0")}</span> / {String(PRODUCTS.length).padStart(3, "0")} results
        </div>
      </div>

      {/* Search */}
      <div className="mb-5 flex items-center gap-3 hair-border rounded-full bg-surface/40 px-5 py-2.5 backdrop-blur focus-within:hair-border-cyan">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="font-mono-tech text-xs text-accent">$</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search brand / code / finish…"
          className="w-full bg-transparent font-mono-tech text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-muted-foreground hover:text-accent"
            aria-label="clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Chips row */}
      <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ChipGroupLabel>brand</ChipGroupLabel>
        {BRANDS.map((b) => (
          <Chip
            key={b}
            active={activeBrand === b}
            onClick={() => setActiveBrand(activeBrand === b ? null : b)}
          >
            {b}
          </Chip>
        ))}
        <div className="mx-2 w-px shrink-0 self-stretch bg-border-hair" />
        <ChipGroupLabel>finish</ChipGroupLabel>
        {FINISHES.map((f) => (
          <Chip
            key={f}
            active={activeFinish === f}
            onClick={() => setActiveFinish(activeFinish === f ? null : f)}
          >
            {f}
          </Chip>
        ))}
        {(activeBrand || activeFinish) && (
          <button
            onClick={() => { setActiveBrand(null); setActiveFinish(null); }}
            className="ml-2 shrink-0 rounded-full px-3 py-1.5 font-mono-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground hover:text-accent"
          >
            clear ✕
          </button>
        )}
      </div>
    </section>
  );
}

function ChipGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 self-center pr-1 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
      {children} —
    </span>
  );
}

function Chip({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={[
        "shrink-0 rounded-full px-4 py-1.5 font-mono-tech text-xs transition-all",
        active
          ? "hair-border-cyan bg-surface-2 text-foreground"
          : "hair-border bg-surface/40 text-muted-foreground hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* -------------------------- PRODUCT CARD -------------------------- */

const SPAN_CLASS: Record<Product["span"], string> = {
  sm: "col-span-1 row-span-1",
  md: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  lg: "col-span-2 row-span-2",
  xl: "col-span-2 row-span-2 md:col-span-2 md:row-span-3",
};

function ProductCard({
  product, index, inQuote, onAdd,
}: { product: Product; index: number; inQuote: boolean; onAdd: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ y: -4 }}
      className={[
        "group relative overflow-hidden hair-border rounded-lg bg-surface/60 backdrop-blur-xl",
        "transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_oklch(0.78_0.14_210/0.25)]",
        SPAN_CLASS[product.span],
      ].join(" ")}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Warranty badge */}
      <div className="absolute right-3 top-3 z-10">
        <div className="flex items-center gap-1.5 rounded-sm bg-warranty px-2 py-1 shadow-[0_0_20px_-4px_oklch(0.62_0.22_25/0.6)]">
          <Shield className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
          <span className="font-mono-tech text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
            2y warranty
          </span>
        </div>
      </div>

      {/* Corner code */}
      <div className="absolute left-3 top-3 z-10 font-mono-tech text-[10px] tracking-[0.16em] text-muted-foreground">
        {product.code}
      </div>

      {/* Info */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
        <div className="mb-2 flex items-center gap-2 font-mono-tech text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>{product.brand}</span>
          <span className="h-px w-4 bg-border-hair" />
          <span>{product.finish}</span>
        </div>
        <h3 className="text-base font-medium leading-tight tracking-tight text-foreground md:text-lg">
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono-tech text-[10px] text-muted-foreground">
            <span className="text-foreground">{product.spec}</span>
            <span className="text-border-hair">/</span>
            <span>{product.euro}</span>
          </div>

          {/* Hover Add-to-Quote */}
          <motion.button
            initial={false}
            onClick={onAdd}
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono-tech text-[10px] uppercase tracking-[0.2em]",
              "opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0",
              inQuote
                ? "hair-border-cyan bg-accent text-primary-foreground"
                : "hair-border-cyan bg-surface-2 text-accent hover:bg-accent hover:text-primary-foreground",
            ].join(" ")}
          >
            {inQuote ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            {inQuote ? "in_quote" : "add_to_quote"}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------- QUOTE FAB / DRAWER ------------------------- */

function QuoteFab({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0"
    >
      <div className="group relative flex items-center gap-3 hair-border-cyan rounded-full bg-surface/80 px-5 py-3 backdrop-blur-xl">
        <div className="relative">
          <div className="h-2 w-2 rounded-full bg-accent" />
          <div className="absolute inset-0 h-2 w-2 rounded-full bg-accent blur-[6px]" />
        </div>
        <span className="font-mono-tech text-[11px] uppercase tracking-[0.24em] text-foreground">
          quote_list
        </span>
        <span className="font-mono-tech text-xs text-accent">
          [{String(count).padStart(2, "0")}]
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.button>
  );
}

function QuoteDrawer({
  items, onClose, onAdd, onRemove, onSend,
}: {
  items: [string, number][];
  onClose: () => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onSend: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
      />
      <motion.aside
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col hair-border bg-surface/95 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-border-hair px-6 py-5">
          <div>
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.28em] text-accent">
              // quote.session
            </div>
            <h3 className="mt-1 text-xl font-light tracking-tight">Your Quote List</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hair-border text-muted-foreground hover:text-accent"
            aria-label="close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-mono-tech text-xs text-muted-foreground">
                // vault_empty — add parts to build your quote
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(([id, qty]) => {
                const p = PRODUCTS.find((x) => x.id === id)!;
                return (
                  <li key={id} className="flex items-center gap-4 hair-border rounded-md bg-surface p-3">
                    <img src={p.image} alt="" className="h-14 w-14 rounded object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {p.code} · {p.brand}
                      </div>
                      <div className="truncate text-sm">{p.name}</div>
                    </div>
                    <div className="flex items-center gap-2 hair-border rounded-full px-2 py-1">
                      <button onClick={() => onRemove(id)} className="text-muted-foreground hover:text-accent">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-mono-tech text-xs w-4 text-center">{qty}</span>
                      <button onClick={() => onAdd(id)} className="text-muted-foreground hover:text-accent">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-border-hair p-6">
          <button
            onClick={onSend}
            disabled={items.length === 0}
            className="w-full hair-border-cyan rounded-full bg-accent px-6 py-4 font-mono-tech text-xs uppercase tracking-[0.24em] text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            send_via_whatsapp →
          </button>
          <p className="mt-3 text-center font-mono-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            no_checkout · b2b_direct_line
          </p>
        </div>
      </motion.aside>
    </>
  );
}

/* ---------------------------- FOOTER ---------------------------- */

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-hair">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark size={24} />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.28em]">aftruckparts</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A digital chrome vault of premium truck hardware for fleet operators.
          </p>
        </div>
        {[
          { h: "vault", items: ["Catalog", "Brands", "New Arrivals"] },
          { h: "trust", items: ["2-Year Warranty", "Returns", "B2B Terms"] },
          { h: "contact", items: ["WhatsApp", "Email", "Distributors"] },
        ].map((col) => (
          <div key={col.h}>
            <div className="mb-4 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-accent">
              // {col.h}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.items.map((i) => (
                <li key={i}><a href="#" className="hover:text-foreground">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border-hair py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 font-mono-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <span>© 2026 aftruckparts</span>
          <span>vault.build_2.4.0</span>
        </div>
      </div>
    </footer>
  );
}
