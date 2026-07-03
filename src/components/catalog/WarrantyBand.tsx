import { motion, useReducedMotion } from "framer-motion";

import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { PageSection } from "./PageSection";
import { SectionRule } from "./SectionRule";

const ease = [0.22, 1, 0.36, 1] as const;

function splitHeadline(headline: string): [string, string] {
  const breakAt = headline.indexOf(". ");
  if (breakAt === -1) return [headline, ""];
  return [headline.slice(0, breakAt + 1), headline.slice(breakAt + 2)];
}

function fadeUp(delay: number, reduced: boolean) {
  return reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { delay, duration: 0.7, ease },
      };
}

export function WarrantyBand() {
  const { messages } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const { warranty } = messages;
  const [headlinePrimary, headlineSecondary] = splitHeadline(warranty.headline);

  return (
    <PageSection
      id="warranty"
      borderTop
      clipX
      className="relative !py-20 md:!py-28 lg:!py-36"
    >
      <div
        className="wireframe-watermark pointer-events-none absolute end-[-2%] top-[8%] text-[clamp(9rem,22vw,18rem)] opacity-[0.18] lg:end-[4%] lg:top-[12%]"
        aria-hidden
      >
        {warranty.watermark}
      </div>

      <svg
        className="pointer-events-none absolute start-[-8%] top-[42%] hidden h-[min(42vh,360px)] w-[min(36vw,280px)] opacity-[0.07] lg:block"
        viewBox="0 0 280 280"
        fill="none"
        aria-hidden
      >
        <circle cx="140" cy="140" r="120" stroke="var(--brand)" strokeWidth="0.6" />
        <path
          d="M 20 140 A 120 120 0 0 1 260 140"
          stroke="var(--brand-highlight)"
          strokeWidth="0.8"
          strokeDasharray="4 8"
        />
      </svg>

      <motion.div {...fadeUp(0, reduced)} className="relative">
        <SectionRule index="03" className="mb-12 md:mb-16 lg:mb-20" />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-stretch lg:gap-16 xl:gap-24">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="mb-7 flex items-center gap-2.5 md:mb-9">
              <span className="h-1 w-1 shrink-0 rotate-45 bg-brand/45" aria-hidden />
              <p className="section-tag">{warranty.tag}</p>
            </div>

            <h2 className="max-w-2xl text-[clamp(2.75rem,7.5vw,5.75rem)] font-extralight leading-[0.9] tracking-tight">
              {headlinePrimary}
              {headlineSecondary && (
                <>
                  <br />
                  <span className="text-foreground/50">{headlineSecondary}</span>
                </>
              )}
            </h2>

            <p className="mt-8 max-w-md text-base leading-[1.75] text-muted-foreground md:mt-10 md:max-w-lg md:text-lg">
              {warranty.subline}
            </p>
          </div>

          <motion.ul
            {...fadeUp(0.1, reduced)}
            className="relative flex flex-col border border-brand/12 lg:border-0 lg:border-s lg:border-brand/12 lg:ps-10 xl:ps-14"
          >
            <div
              className="registration-marks pointer-events-none absolute inset-3 hidden lg:block"
              aria-hidden
            >
              <span />
              <span />
              <span />
              <span />
            </div>

            {warranty.pillars.map((pillar, i) => (
              <li
                key={pillar.label}
                className={cn(
                  "group relative flex flex-col justify-center py-10 md:py-12 lg:py-14 xl:py-16",
                  i > 0 && "border-t border-brand/12",
                )}
              >
                <span
                  className="font-mono-tech ltr-embed mb-5 text-[9px] tracking-[0.42em] text-brand/35"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="display-stat text-4xl text-foreground md:text-5xl lg:text-[3.25rem]">
                  {pillar.value}
                </div>
                <div className="mt-2.5 font-mono text-[10px] tracking-[0.3em] text-foreground-muted uppercase">
                  {pillar.label}
                </div>
                <span
                  className="absolute inset-y-6 start-0 w-px bg-gradient-to-b from-transparent via-brand/0 to-transparent transition-[background] duration-500 group-hover:via-brand/50 max-lg:hidden"
                  aria-hidden
                />
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          {...fadeUp(0.18, reduced)}
          className="mt-16 md:mt-24 lg:mt-28"
        >
          <div className="mb-7 flex items-center gap-4" aria-hidden>
            <span className="section-rule-node" />
            <span className="section-rule-track min-w-0 flex-1" />
            <span className="section-rule-end" />
          </div>
          <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground md:text-base">
            <span className="me-2 inline-block h-1.5 w-1.5 rotate-45 bg-warranty/80 align-middle shadow-[0_0_10px_color-mix(in_oklch,var(--warranty)_40%,transparent)]" />
            {warranty.note}
          </p>
        </motion.div>
      </motion.div>
    </PageSection>
  );
}
