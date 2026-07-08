import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, MousePointerClick, Plus } from "lucide-react";

import { PAGE_SECTION_INDEX } from "@/lib/page-sections";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { PageSection } from "../layout/PageSection";
import { SectionRule } from "../layout/SectionRule";

const ease = [0.22, 1, 0.36, 1] as const;
const STEP_ICONS = [MousePointerClick, Plus, MessageCircle] as const;

function fadeUp(delay: number, reduced: boolean) {
  return reduced
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { delay, duration: 0.55, ease },
      };
}

export function OrderGuide() {
  const { messages, formatDigits } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const { orderGuide } = messages;

  return (
    <PageSection id="how-to-order" borderTop className="py-10 md:py-12">
      <SectionRule index={PAGE_SECTION_INDEX.orderGuide} className="mb-6 md:mb-8" />

      <motion.div {...fadeUp(0, reduced)} className="mx-auto max-w-3xl text-center">
        <p className="section-tag">{orderGuide.tag}</p>
        <h2 className="type-heading-display mt-3 text-[1.375rem] tracking-tight md:text-2xl">
          {orderGuide.title}
        </h2>
      </motion.div>

      <ol className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3 sm:gap-5 md:mt-10">
        {orderGuide.steps.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? Plus;
          const stepNumber = formatDigits(index + 1);

          return (
            <motion.li
              key={step.title}
              {...fadeUp(0.06 + index * 0.06, reduced)}
              className="relative flex flex-col items-center rounded-2xl border border-brand/10 bg-void/30 px-5 py-6 text-center backdrop-blur-sm sm:px-4"
            >
              {index < orderGuide.steps.length - 1 && (
                <span
                  className="pointer-events-none absolute top-1/2 hidden h-px w-5 -translate-y-1/2 bg-brand/15 sm:block ltr:-end-2.5 rtl:-start-2.5"
                  aria-hidden
                />
              )}

              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border border-brand/15 bg-brand/8",
                  index === 2 && "border-brand/25 bg-brand/12",
                )}
                aria-hidden
              >
                <Icon className="h-5 w-5 text-brand-readable" strokeWidth={1.75} />
              </span>

              <span className="type-code mt-4 text-brand-readable/80">
                {stepNumber}
              </span>

              <h3 className="type-ui-strong mt-1.5 text-[0.9375rem] leading-snug text-foreground">
                {step.title}
              </h3>
              <p className="type-label mt-2 text-muted-foreground">
                {step.body}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </PageSection>
  );
}
