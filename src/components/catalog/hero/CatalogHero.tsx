import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { HeroFinish } from "./hero-finishes";
import { HeroBadgeStage } from "./HeroBadgeStage";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale } from "@/lib/i18n";
import { scrollToCatalog } from "@/lib/scrollToCatalog";
import { cn } from "@/lib/utils";

import { SectionRule } from "../layout/SectionRule";

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

function HeroCtas({ cta, ctaPdf, className }: { cta: string; ctaPdf: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-start gap-5", className)}>
      <a
        href="#catalog"
        onClick={(e) => {
          e.preventDefault();
          scrollToCatalog();
        }}
        className="group inline-flex w-fit items-center gap-3 rounded-full btn-primary px-8 py-3.5 text-sm type-ui-strong"
      >
        <span>{cta}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </a>
      <a
        href={PDF_CATALOG}
        target="_blank"
        rel="noopener noreferrer"
        className="ps-1 text-[0.8125rem] text-muted-foreground underline-offset-[5px] transition-colors hover:text-brand-readable hover:underline"
      >
        {ctaPdf}
      </a>
    </div>
  );
}

export function CatalogHero() {
  const { messages, locale } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const [showScrollCue, setShowScrollCue] = useState(true);
  const [activeFinish, setActiveFinish] = useState<HeroFinish>("steel");

  const finishLabels = messages.hero.showcaseFinishes;
  const interactionHint = isMobile
    ? `${messages.hero.dragHint} · ${messages.hero.zoomHint}`
    : `${messages.hero.dragHint} · ${messages.hero.scrollZoomHint}`;

  const stageProps = {
    finish: activeFinish,
    finishLabels,
    dragHint: interactionHint,
    reduced,
    onFinishChange: setActiveFinish,
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
    <section className="site-column relative flex min-h-[calc(100svh-var(--header-offset))] flex-col justify-center overflow-x-clip pb-20 pt-8 md:pb-24 md:pt-10">
      <div
        className="editorial-spine pointer-events-none absolute inset-y-[14%] start-0 hidden w-px lg:block"
        aria-hidden
      />

      <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
        <div className="relative z-20 flex flex-col justify-center lg:max-w-xl lg:pe-4">
          <motion.div {...fadeUp(0, reduced)} className="mb-7 md:mb-9">
            <SectionRule index="1" />
          </motion.div>

          <motion.h1
            {...fadeUp(0.06, reduced)}
            className={cn(
              "font-display type-billboard max-w-xl",
              locale === "fa" ? "leading-[1.18]" : "leading-[1.05]"
            )}
          >
            {messages.hero.titleLine1}
            <br />
            {messages.hero.titleLine2}{" "}
            <span
              className={cn(
                "gradient-text",
                locale === "en"
                  ? "font-mono-tech font-normal tracking-[0.1em]"
                  : "font-display font-light"
              )}
            >
              {messages.hero.titleAccent}
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.12, reduced)}
            className="type-ui mt-6 max-w-sm text-[0.9375rem] leading-[1.65] text-muted-foreground md:mt-7 md:text-base"
          >
            {messages.hero.subtitle}
          </motion.p>

          <motion.div {...fadeUp(0.18, reduced)} className="mt-8 hidden lg:block md:mt-10">
            <HeroCtas cta={messages.hero.cta} ctaPdf={messages.hero.ctaPdf} />
          </motion.div>
        </div>

        <motion.div
          {...stageEntrance(reduced)}
          className="relative flex min-h-[min(76vw,24rem)] flex-col justify-center sm:min-h-[min(70vw,28rem)] lg:min-h-[min(calc(100svh-var(--header-offset)-6rem),38rem)] lg:h-[min(calc(100svh-var(--header-offset)-6rem),38rem)]"
        >
          <HeroBadgeStage {...stageProps} />
        </motion.div>

        <motion.div {...fadeUp(0.22, reduced)} className="mt-2 lg:hidden">
          <HeroCtas cta={messages.hero.cta} ctaPdf={messages.hero.ctaPdf} />
        </motion.div>
      </div>

      <div
        className={cn(
          "absolute bottom-8 start-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 transition-opacity duration-500 md:bottom-10",
          showScrollCue ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="scroll-cue-node scroll-cue" />
        <div className="h-9 w-px origin-top bg-gradient-to-b from-brand/22 to-transparent scroll-cue" />
      </div>
    </section>
  );
}
