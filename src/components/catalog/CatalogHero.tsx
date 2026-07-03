import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/locales";
import { scrollToCatalog } from "@/lib/scrollToCatalog";
import { cn } from "@/lib/utils";

import { SectionRule } from "./SectionRule";

const HERO_THUMBS = ["/catalog/page-26.jpeg", "/catalog/page-12.jpeg", "/catalog/page-08.jpeg"];
const PDF_CATALOG = "/af_catalog-5.pdf";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number, reduced: boolean) {
  return reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.7, ease },
      };
}

function vaultEntrance(reduced: boolean) {
  return reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: 0.2, duration: 0.8, ease },
      };
}

function formatCount(n: number, locale: Locale) {
  return n.toLocaleString(locale === "fa" ? "fa-IR" : "en-US");
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-chip">
      <div className="display-stat text-xl text-foreground md:text-2xl">{value}</div>
      <div className="mt-1.5 text-[10px] tracking-wide text-foreground-muted">{label}</div>
    </div>
  );
}

type CatalogHeroProps = {
  productCount: number;
  brandCount: number;
};

export function CatalogHero({ productCount, brandCount }: CatalogHeroProps) {
  const { messages, locale } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const [showScrollCue, setShowScrollCue] = useState(true);
  const [watermarkY, setWatermarkY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!reduced) setWatermarkY(window.scrollY * 0.12);
      if (window.scrollY > 48) setShowScrollCue(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  useEffect(() => {
    const catalog = document.getElementById("catalog");
    if (!catalog) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowScrollCue(false);
      },
      { threshold: 0.05 },
    );
    observer.observe(catalog);
    return () => observer.disconnect();
  }, []);

  const skuValue = `${formatCount(productCount, locale)}+`;
  const brandValue = formatCount(brandCount, locale);
  const watermark = formatCount(productCount, locale);

  return (
    <section className="relative mx-auto flex min-h-[calc(100svh-var(--header-offset))] max-w-6xl flex-col justify-center overflow-x-clip px-5 pb-20 pt-6 md:px-6 md:pb-28 md:pt-10">
      <div
        className="editorial-spine pointer-events-none absolute inset-y-[10%] start-0 hidden w-px lg:block"
        aria-hidden
      />
      <div
        className="wireframe-watermark pointer-events-none absolute bottom-[18%] start-[-8%] text-[clamp(8rem,18vw,14rem)] opacity-30"
        style={reduced ? undefined : { transform: `translateY(${watermarkY}px)` }}
        aria-hidden
      >
        {watermark}
      </div>

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="relative z-10 max-w-3xl">
          <motion.div {...fadeUp(0, reduced)} className="mb-8 md:mb-10">
            <SectionRule index="01" />
          </motion.div>

          <motion.h1
            {...fadeUp(0.08, reduced)}
            className="text-5xl font-extralight leading-[1.02] md:text-7xl lg:text-[5.5rem]"
          >
            {messages.hero.titleLine1}
            <br />
            {messages.hero.titleLine2}{" "}
            <span className="font-mono-tech font-normal gradient-text">
              {messages.hero.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16, reduced)}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg"
          >
            {messages.hero.subtitle}
          </motion.p>

          <motion.div
            {...fadeUp(0.24, reduced)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-10"
          >
            <a
              href="#catalog"
              onClick={(e) => {
                e.preventDefault();
                scrollToCatalog();
              }}
              className="group inline-flex w-fit items-center gap-3 rounded-full btn-primary px-7 py-3.5 text-sm font-medium"
            >
              <span>{messages.hero.cta}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </a>
            <a
              href={PDF_CATALOG}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border-hair/40 px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-brand/30 hover:text-foreground"
            >
              <Download className="h-3.5 w-3.5 opacity-70" />
              <span>{messages.hero.ctaPdf}</span>
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(0.28, reduced)}
            className="mt-10 grid grid-cols-3 gap-2 md:mt-12 md:gap-3 lg:hidden"
          >
            <div className="vault-glass relative col-span-3 aspect-[16/9] overflow-hidden rounded-2xl">
              <div className="absolute inset-0 flex gap-1.5 p-2">
                {HERO_THUMBS.map((src) => (
                  <div key={src} className="min-w-0 flex-1 overflow-hidden rounded-xl">
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover opacity-50 mix-blend-luminosity"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.32, reduced)}
            className="mt-8 grid grid-cols-3 gap-2 md:mt-10 md:gap-3"
          >
            <StatChip label={messages.hero.stats.skus.label} value={skuValue} />
            <StatChip label={messages.hero.stats.brands.label} value={brandValue} />
            <StatChip
              label={messages.hero.stats.warranty.label}
              value={messages.hero.stats.warranty.value}
            />
          </motion.div>
        </div>

        <motion.div
          {...vaultEntrance(reduced)}
          className="relative z-10 hidden lg:block"
          aria-hidden
        >
          <div className="vault-glass relative aspect-[4/5] overflow-hidden rounded-3xl">
            <div className="registration-marks absolute inset-0 z-10" aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-void/70 ambient-drift" />
            <div className="absolute inset-0 grid grid-cols-2 gap-2 p-3">
              {HERO_THUMBS.map((src, i) => (
                <div
                  key={src}
                  className={cn(
                    "overflow-hidden rounded-2xl",
                    i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square",
                  )}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover opacity-45 mix-blend-luminosity"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-void/95 via-void/30 to-transparent" />
          </div>
        </motion.div>
      </div>

      <div
        className={cn(
          "absolute bottom-8 start-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500",
          showScrollCue ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="scroll-cue-node scroll-cue" />
        <div className="h-8 w-px origin-top bg-gradient-to-b from-brand/30 to-transparent scroll-cue" />
      </div>
    </section>
  );
}
