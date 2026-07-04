import { motion, useReducedMotion } from "framer-motion";

import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { PageSection } from "../layout/PageSection";
import { SectionRule } from "../layout/SectionRule";

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
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { delay, duration: 0.65, ease },
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
      spine
      className="relative !py-16 md:!py-24 lg:!py-28"
    >
      <motion.div {...fadeUp(0, reduced)} className="relative">
        <SectionRule index="04" className="mb-10 md:mb-12" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:items-stretch lg:gap-14 xl:gap-20">
          <div className="relative z-10 flex flex-col justify-center">
            <p className="section-tag">{warranty.tag}</p>

            <h2 className="mt-4 max-w-xl text-[clamp(2rem,5.5vw,3.75rem)] font-extralight leading-[1.05] tracking-tight">
              {headlinePrimary}
              {headlineSecondary && (
                <>
                  <br />
                  <span className="text-foreground/55">{headlineSecondary}</span>
                </>
              )}
            </h2>

            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground md:mt-8 md:text-base">
              {warranty.subline}
            </p>
          </div>

          <motion.ul
            {...fadeUp(0.1, reduced)}
            className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0 lg:border-s lg:border-brand/12 lg:ps-10 xl:ps-12"
          >
            {warranty.pillars.map((pillar, i) => (
              <li
                key={pillar.label}
                className={cn(
                  "stat-chip text-start lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-10 lg:shadow-none xl:py-12",
                  i > 0 && "lg:border-t lg:border-brand/12",
                )}
              >
                <div className="display-stat text-2xl leading-none md:text-3xl lg:text-4xl">
                  {pillar.value}
                </div>
                <div className="mt-2 text-[10px] tracking-wide text-foreground-muted">
                  {pillar.label}
                </div>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.p
          {...fadeUp(0.16, reduced)}
          className="mt-12 max-w-2xl text-sm leading-relaxed text-muted-foreground md:mt-16 md:text-[0.9375rem]"
        >
          <span className="me-2 inline-block h-1.5 w-1.5 rotate-45 bg-warranty/80 align-middle" />
          {warranty.note}
        </motion.p>
      </motion.div>
    </PageSection>
  );
}
