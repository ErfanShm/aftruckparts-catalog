import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { HeroBadgeStage } from "./HeroBadgeStage";
import { HeroMobileLogo } from "./HeroMobileLogo";
import { useLocale } from "@/lib/i18n";
import { scrollToCatalog } from "@/lib/scrollToCatalog";
import { cn } from "@/lib/utils";

import { PAGE_SECTION_INDEX } from "@/lib/page-sections";

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

function splitWarrantyHighlight(text: string, highlight: string) {
  const index = text.indexOf(highlight);
  if (index === -1) return { before: text, highlight: "", after: "" };
  return {
    before: text.slice(0, index),
    highlight,
    after: text.slice(index + highlight.length),
  };
}

function HeroCtas({ cta, ctaPdf, className }: { cta: string; ctaPdf: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-7 lg:items-start", className)}>
      <a
        href="#catalog"
        onClick={(e) => {
          e.preventDefault();
          scrollToCatalog();
        }}
        className="group inline-flex w-fit items-center gap-3 rounded-full btn-primary px-10 py-4 text-base type-ui-strong md:px-12 md:py-5 md:text-lg"
      >
        <span className="leading-none">{cta}</span>
        <ArrowUpRight
          strokeWidth={2.25}
          className="size-[1.125rem] shrink-0 translate-y-px transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
        />
      </a>
      <a
        href={PDF_CATALOG}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-[0.875rem] text-foreground/62 underline-offset-[5px] transition-colors hover:text-brand-readable hover:underline lg:ps-3 lg:text-start"
      >
        {ctaPdf}
      </a>
    </div>
  );
}

export function CatalogHero() {
  const { messages, locale } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const [showScrollCue, setShowScrollCue] = useState(true);
  const warrantyLine = splitWarrantyHighlight(
    messages.hero.subtitleWarranty,
    messages.hero.subtitleWarrantyHighlight,
  );

  const stageProps = {
    reduced,
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
    <section className="site-column relative flex min-h-0 flex-col justify-center overflow-visible pb-16 pt-8 lg:min-h-[calc(100svh-var(--header-offset))] lg:pb-24 lg:pt-10">
      <div
        className="editorial-spine pointer-events-none absolute inset-y-[14%] start-0 hidden w-px lg:block"
        aria-hidden
      />

      <div className="relative z-10 grid flex-1 items-center gap-6 lg:max-w-xl">
        <div className="relative flex flex-col justify-center lg:pe-2 xl:pe-0">
          <div
            className="pointer-events-none absolute -end-6 top-1/2 hidden h-[55%] w-28 -translate-y-1/2 bg-gradient-to-r from-transparent via-brand/8 to-brand-highlight/12 blur-2xl lg:block"
            aria-hidden
          />
          <motion.div {...fadeUp(0, reduced)} className="mb-7 self-center md:mb-9 lg:self-start">
            <SectionRule index={PAGE_SECTION_INDEX.hero} />
          </motion.div>

          <motion.div
            {...fadeUp(0.04, reduced)}
            className="mb-6 flex justify-center lg:hidden"
          >
            <HeroMobileLogo className="scale-110 sm:scale-125" />
          </motion.div>

          <div className="relative lg:max-w-xl">
            <motion.h1
              {...fadeUp(0.06, reduced)}
              className={cn(
                "relative z-10 mx-auto max-w-xl font-display type-billboard text-center lg:mx-0 lg:text-start",
                locale === "fa" ? "leading-[1.18]" : "leading-[1.05]",
              )}
            >
              {messages.hero.titleLine1}
              {(messages.hero.titleLine2 || messages.hero.titleAccent) && (
                <>
                  <br />
                  {messages.hero.titleLine2}{" "}
                  {messages.hero.titleAccent && (
                    <span
                      className={cn(
                        "gradient-text",
                        locale === "en"
                          ? "font-mono-tech font-normal tracking-[0.1em]"
                          : "type-heading-display",
                      )}
                    >
                      {messages.hero.titleAccent}
                    </span>
                  )}
                </>
              )}
            </motion.h1>

          <motion.p
            {...fadeUp(0.12, reduced)}
            className="type-hero-subtitle relative z-10 mx-auto mt-6 max-w-md text-center md:mt-7 lg:mx-0 lg:text-start"
          >
            {messages.hero.subtitleLead}
            <br />
            <span className="text-foreground/76 max-lg:text-foreground/84">
              {warrantyLine.before}
              {warrantyLine.highlight && (
                <span className="text-foreground/92 max-lg:text-foreground/96">{warrantyLine.highlight}</span>
              )}
              {warrantyLine.after}
            </span>
          </motion.p>
          </div>

          <motion.div {...fadeUp(0.18, reduced)} className="mt-8 flex justify-center md:mt-10 lg:justify-start">
            <HeroCtas cta={messages.hero.cta} ctaPdf={messages.hero.ctaPdf} />
          </motion.div>
        </div>
      </div>

      <motion.div
        {...stageEntrance(reduced)}
        className="pointer-events-none absolute inset-y-[4%] end-0 z-0 hidden w-[min(62vw,54rem)] lg:block"
        style={{ marginInlineEnd: "calc(-1 * var(--column-px))" }}
      >
        <HeroBadgeStage {...stageProps} fillHeight />
      </motion.div>

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
