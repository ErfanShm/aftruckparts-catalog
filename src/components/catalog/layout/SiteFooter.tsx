import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Mail, Phone, Send } from "lucide-react";

import { PAGE_SECTION_INDEX } from "@/lib/page-sections";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { BrandMark } from "./BrandMark";
import { PageSection } from "./PageSection";
import { SectionRule } from "./SectionRule";

const ease = [0.22, 1, 0.36, 1] as const;

type ChannelLink = {
  key: string;
  label: string;
  href: string;
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function BaleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.48 2 2 5.82 2 10.5c0 2.55 1.35 4.83 3.47 6.35L4.5 21.5l5.2-2.72c.62.1 1.27.15 1.95.15 5.52 0 10-3.82 10-8.5S17.52 2 12 2zm-1.1 11.2l-2.8-3 5.6-3.2 2.8 3-5.6 3.2z" />
    </svg>
  );
}

function RubikaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1.2 5.2h2.4v11.6h-2.4V12.4l-3.2 4.1H8.8l3.6-4.5-3.4-4.4h2.2l2.8 3.6V7.2z" />
    </svg>
  );
}

const CHANNEL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  whatsapp: WhatsAppIcon,
  instagram: Instagram,
  telegram: Send,
  email: Mail,
  bale: BaleIcon,
  rubika: RubikaIcon,
};

function fadeUp(delay: number, reduced: boolean) {
  return reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.65, ease },
      };
}

function iconFade(i: number, reduced: boolean, baseDelay = 0.14) {
  return reduced
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: baseDelay + i * 0.05, duration: 0.5, ease },
      };
}

function ChannelOrbit({
  links,
  ariaLabel,
  locale,
  reduced,
  baseDelay = 0.14,
  compact = false,
}: {
  links: ChannelLink[];
  ariaLabel: string;
  locale: string;
  reduced: boolean;
  baseDelay?: number;
  compact?: boolean;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <ul
        className={cn(
          "flex flex-wrap items-start",
          compact ? "gap-x-7 gap-y-4 sm:gap-x-9" : "gap-x-6 gap-y-6 sm:gap-x-10 md:gap-x-12",
        )}
      >
        {links.map((link, i) => {
          const Icon = CHANNEL_ICONS[link.key];
          const isExternal = link.href.startsWith("http");

          return (
            <motion.li key={link.key} {...iconFade(i, reduced, baseDelay)}>
              <a
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className={cn(
                  "group flex items-center gap-2.5 rounded-full py-1 pe-3 ps-1",
                  "transition-colors duration-300",
                  "hover:bg-brand/[0.06] focus-visible:bg-brand/[0.06] focus-visible:outline-none",
                )}
              >
                <span
                  className={cn(
                    "relative flex shrink-0 items-center justify-center rounded-full transition-transform duration-300",
                    "group-hover:-translate-y-px group-focus-visible:-translate-y-px",
                    compact ? "h-8 w-8" : "h-9 w-9 sm:h-10 sm:w-10",
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full bg-brand/[0.05] transition-all duration-300",
                      "group-hover:bg-brand/10 group-focus-visible:bg-brand/10",
                    )}
                    aria-hidden
                  />
                  <Icon
                    className={cn(
                      "relative text-foreground/38 transition-colors duration-300",
                      compact ? "h-[1.05rem] w-[1.05rem]" : "h-[1.15rem] w-[1.15rem] sm:h-[1.2rem] sm:w-[1.2rem]",
                      "group-hover:text-brand-readable group-focus-visible:text-brand-readable",
                    )}
                    aria-hidden
                  />
                </span>

                <span
                  className={cn(
                    "type-meta text-foreground-muted transition-colors duration-300",
                    "group-hover:text-brand-readable group-focus-visible:text-brand-readable",
                    locale === "en" && "uppercase tracking-[0.1em]",
                  )}
                >
                  {link.label}
                </span>
              </a>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const { messages, locale } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const { footer } = messages;

  return (
    <footer id="contact" className="mt-auto scroll-mt-header">
      <PageSection
        as="div"
        borderTop
        spine
        className="relative !pt-[var(--section-py)] !pb-8 md:!pb-14"
      >
        <motion.div {...fadeUp(0, reduced)} className="relative">
          <SectionRule index={PAGE_SECTION_INDEX.contact} className="mb-10 md:mb-12" />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:items-end lg:gap-16 xl:gap-20">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="h-1 w-1 shrink-0 rotate-45 bg-brand/35" aria-hidden />
                <p className="section-tag">{footer.socialLabel}</p>
              </div>

              <h2
                className={cn(
                  "type-heading-display type-billboard mt-4 tracking-tight",
                  locale === "fa" ? "leading-[1.18]" : "leading-[1.05]",
                )}
              >
                {footer.headlineLine1}
                <br />
                <span className="text-foreground/45">{footer.headlineLine2}</span>
              </h2>

              <p className="type-ui mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground md:mt-6">
                {footer.tagline}
              </p>

              <motion.a
                {...fadeUp(0.16, reduced)}
                href={footer.phone.href}
                className={cn(
                  "group mt-8 inline-flex items-center gap-3 transition-colors duration-300 md:mt-10",
                  "text-muted-foreground hover:text-brand-readable focus-visible:text-brand-readable focus-visible:outline-none",
                )}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/[0.05] transition-colors group-hover:bg-brand/10">
                  <Phone
                    className="h-4 w-4 text-foreground/35 transition-colors group-hover:text-brand-readable"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </span>
                <span>
                  <span className="type-code ltr-embed block text-[0.9375rem] tracking-wide text-foreground/82 transition-colors group-hover:text-brand-readable">
                    {footer.phone.display}
                  </span>
                  <span className="type-meta mt-0.5 block text-foreground-muted/70">
                    {footer.phone.label}
                  </span>
                </span>
              </motion.a>
            </div>

            <motion.div {...fadeUp(0.1, reduced)} className="lg:pb-1">
              <ChannelOrbit
                links={footer.social}
                ariaLabel={footer.socialLabel}
                locale={locale}
                reduced={reduced}
              />

              {footer.iranianMessengers && (
                <div className="mt-8 border-t border-brand/10 pt-7 md:mt-9">
                  <p className="type-meta mb-4 text-foreground-muted/80">
                    {footer.iranianMessengers.label}
                  </p>
                  <ChannelOrbit
                    links={footer.iranianMessengers.links}
                    ariaLabel={footer.iranianMessengers.label}
                    locale={locale}
                    reduced={reduced}
                    baseDelay={0.2}
                    compact
                  />
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            {...fadeUp(0.22, reduced)}
            className="mt-12 flex flex-col items-center gap-2 border-t border-brand/10 pt-7 text-center sm:mt-14"
          >
            <BrandMark height={34} />
            <p className="type-meta text-foreground-muted">{footer.copyright}</p>

            {/* Designed-by credit — uncomment to show publicly
            <p className="type-meta text-foreground-muted">
              {footer.copyright}
              <span className="mx-1.5 text-foreground/18" aria-hidden>·</span>
              <span className="text-foreground-muted/55">{footer.designedBy.prefix}</span>{" "}
              <a
                href={footer.designedBy.href}
                target="_blank"
                rel="noopener noreferrer"
                title={footer.designedBy.title}
                className={cn(
                  "ltr-embed text-terminal underline-offset-[4px] transition-[color,text-shadow] duration-300",
                  "hover:underline hover:text-[#06b6d4]",
                  "focus-visible:underline focus-visible:outline-none",
                  "hover:[text-shadow:0_0_18px_color-mix(in_oklch,#06b6d4_28%,transparent)]",
                )}
              >
                {footer.designedBy.name}
              </a>
            </p>
            */}

            <a
              href={footer.designedBy.href}
              target="_blank"
              rel="noopener noreferrer"
              title={footer.designedBy.title}
              className="sr-only"
            >
              {footer.designedBy.prefix} {footer.designedBy.name}
            </a>
          </motion.div>

          <div className="quote-dock-spacer md:hidden" aria-hidden />
        </motion.div>
      </PageSection>
    </footer>
  );
}
