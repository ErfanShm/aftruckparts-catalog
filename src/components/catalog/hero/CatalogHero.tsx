import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

import type { HeroFinish } from "./hero-finishes";
import { HeroBadgeStage } from "./HeroBadgeStage";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/locales";
import { scrollToCatalog } from "@/lib/scrollToCatalog";
import { cn } from "@/lib/utils";

import { SectionRule } from "../layout/SectionRule";
import type { HeroHudStat } from "./hero-hud-types";

const PDF_CATALOG = "/af_catalog-5.pdf";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number, reduced: boolean) {
  return reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.65, ease },
      };
}

function stageEntrance(reduced: boolean) {
  return reduced
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.14, duration: 0.75, ease },
      };
}

function formatCount(n: number, locale: Locale) {
  return n.toLocaleString(locale === "fa" ? "fa-IR" : "en-US");
}

type CatalogHeroProps = {
  productCount: number;
  brandCount: number;
};

function HeroCtas({
  cta,
  ctaPdf,
  className,
}: {
  cta: string;
  ctaPdf: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center", className)}>
      <a
        href="#catalog"
        onClick={(e) => {
          e.preventDefault();
          scrollToCatalog();
        }}
        className="group inline-flex w-fit items-center gap-3 rounded-full btn-primary px-7 py-3.5 text-sm font-medium"
      >
        <span>{cta}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </a>
      <a
        href={PDF_CATALOG}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-border-hair/40 px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-brand/30 hover:text-foreground"
      >
        <Download className="h-3.5 w-3.5 opacity-70" />
        <span>{ctaPdf}</span>
      </a>
    </div>
  );
}

export function CatalogHero({ productCount, brandCount }: CatalogHeroProps) {
  const { messages, locale } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const [showScrollCue, setShowScrollCue] = useState(true);
  const [activeFinish, setActiveFinish] = useState<HeroFinish>("steel");

  const finishLabels = messages.hero.showcaseFinishes;
  const interactionHint = isMobile
    ? `${messages.hero.dragHint} · ${messages.hero.zoomHint}`
    : `${messages.hero.dragHint} · ${messages.hero.scrollZoomHint}`;

  const hudStats = useMemo<HeroHudStat[]>(
    () => [
      {
        id: "warranty",
        label: messages.hero.stats.warranty.label,
        value: messages.hero.stats.warranty.value,
      },
      {
        id: "brands",
        label: messages.hero.stats.brands.label,
        value: formatCount(brandCount, locale),
      },
      {
        id: "skus",
        label: messages.hero.stats.skus.label,
        value: `${formatCount(productCount, locale)}+`,
      },
    ],
    [brandCount, locale, messages.hero.stats, productCount],
  );

  const stageProps = {
    finish: activeFinish,
    finishLabels,
    dragHint: interactionHint,
    reduced,
    onFinishChange: setActiveFinish,
    stats: hudStats,
    showHud: true,
    fillHeight: true,
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 48) setShowScrollCue(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <section className="site-column relative flex min-h-[calc(100svh-var(--header-offset))] flex-col justify-center overflow-x-clip pb-16 pt-6 md:pb-20 md:pt-8">
      <div
        className="editorial-spine pointer-events-none absolute inset-y-[12%] start-0 hidden w-px lg:block"
        aria-hidden
      />

      <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 xl:gap-14">
        {/* Copy — first in DOM / reading order */}
        <div className="relative z-20 flex flex-col justify-center lg:pe-2">
          <motion.div {...fadeUp(0, reduced)} className="mb-6 md:mb-8">
            <SectionRule index="01" />
          </motion.div>

          <motion.h1
            {...fadeUp(0.06, reduced)}
            className="max-w-xl text-[2.35rem] font-extralight leading-[1.05] sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] xl:text-[3.75rem]"
          >
            {messages.hero.titleLine1}
            <br />
            {messages.hero.titleLine2}{" "}
            <span className="font-mono-tech font-normal gradient-text">
              {messages.hero.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.12, reduced)}
            className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground md:mt-6 md:text-base lg:text-[1.0625rem]"
          >
            {messages.hero.subtitle}
          </motion.p>

          {/* Desktop: action sits with copy */}
          <motion.div {...fadeUp(0.18, reduced)} className="mt-7 hidden lg:block md:mt-8">
            <HeroCtas cta={messages.hero.cta} ctaPdf={messages.hero.ctaPdf} />
          </motion.div>
        </div>

        {/* Specimen — large, but never before context */}
        <motion.div
          {...stageEntrance(reduced)}
          className="relative flex min-h-[min(76vw,24rem)] flex-col justify-center sm:min-h-[min(70vw,28rem)] lg:min-h-[min(calc(100svh-var(--header-offset)-6rem),38rem)] lg:h-[min(calc(100svh-var(--header-offset)-6rem),38rem)]"
        >
          <HeroBadgeStage {...stageProps} />
        </motion.div>

        {/* Mobile: action after specimen — explore, then commit */}
        <motion.div {...fadeUp(0.22, reduced)} className="lg:hidden">
          <HeroCtas cta={messages.hero.cta} ctaPdf={messages.hero.ctaPdf} />
        </motion.div>
      </div>

      <div
        className={cn(
          "absolute bottom-6 start-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500 md:bottom-8",
          showScrollCue ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="scroll-cue-node scroll-cue" />
        <div className="h-8 w-px origin-top bg-gradient-to-b from-brand/30 to-transparent scroll-cue" />
      </div>
    </section>
  );
}
