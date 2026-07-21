import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Mail, Phone, Send } from "lucide-react";

import { openWhatsAppChat } from "@/data/contact";
import { PAGE_SECTION_INDEX } from "@/lib/page-sections";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { BrandMark } from "./BrandMark";
import { PageSection } from "./PageSection";
import { SectionRule } from "./SectionRule";

const ease = [0.22, 1, 0.36, 1] as const;

const channelButtonClass = cn(
  "group flex min-h-11 w-full items-center gap-2 rounded-xl border border-brand/14 bg-brand/[0.05] px-3 py-2.5",
  "touch-manipulation transition-[color,background-color,border-color,transform] duration-200",
  "hover:border-brand/28 hover:bg-brand/[0.09]",
  "focus-visible:border-brand/28 focus-visible:bg-brand/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25",
  "active:scale-[0.98]",
);

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
      <path d="M11.425 23.987a12.218 12.218 0 0 1-2.95-.514 6.578 6.578 0 0 0-.336-.116C4.936 22.303 2.22 19.763.913 16.599a11.92 11.92 0 0 1-.9-4.063C.005 12.377.001 10.246 0 6.74 0 .71-.005 1.137.07.903.23.394.673.05 1.224.005c.421-.034.7.088 1.603.699.562.38 1.119.78 1.796 1.289.315.237.353.261.376.247l.35-.23c.58-.381 1.11-.677 1.7-.945A11.913 11.913 0 0 1 9.766.21a11.19 11.19 0 0 1 2.041-.2c1.14-.016 2.077.091 3.152.36 3.55.888 6.538 3.411 8.028 6.78.492 1.113.845 2.43.945 3.522.033.366.039.43.053.611.008.105.015.406.015.669 0 .783-.065 1.57-.169 2.064a5.474 5.474 0 0 0-.046.26c-.056.378-.214.987-.399 1.535-.205.613-.367.999-.684 1.633a11.95 11.95 0 0 1-2.623 3.436c-.44.396-.829.705-1.26 1.003-.647.445-1.307.812-2.039 1.134-.6.265-1.44.539-2.101.686a11.165 11.165 0 0 1-1.178.202 12.28 12.28 0 0 1-2.076.082zm-.61-5.92c.294-.06.678-.209.864-.337.144-.099.428-.376 2.064-2.013a161.8 161.8 0 0 1 1.764-1.753c.017 0 1.687-1.67 1.687-1.689 0-.02 1.64-1.648 1.661-1.648.01 0 .063-.047.118-.106.467-.495.682-.957.716-1.547.026-.433-.06-.909-.217-1.196a2.552 2.552 0 0 0-.983-1.024c-.281-.163-.512-.233-.888-.27-.306-.031-.688 0-.948.075-.243.07-.603.274-.853.481-.042.035-1.279 1.265-2.748 2.733l-2.671 2.67-1.093-1.09c-.6-.6-1.12-1.114-1.155-1.142a2.419 2.419 0 0 0-1.338-.51c-.404-.013-.91.09-1.224.25a2.89 2.89 0 0 0-.659.526c-.108.12-.287.357-.29.385-.003.03-.009.044-.065.16a2.312 2.312 0 0 0-.224.91c-.011.229-.01.265.019.491.045.353.24.781.51 1.115.05.063.97.992 2.044 2.064 1.507 1.505 1.98 1.97 2.074 2.039.327.24.683.388 1.101.456.182.03.5.016.734-.03z" />
    </svg>
  );
}

function RubikaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="830 0 449 543" fill="currentColor" className={className} aria-hidden>
      <g transform="translate(-494 -579.79)">
        <path d="M1523.57,579.8h1.76c.48,42.73-.25,128.44-.25,128.44-40.86-22.92-82-45.3-122.84-68.29q40.13-22.82,80.32-45.51c12.69-7.16,26.33-13.31,41-14.64Z" />
        <path d="M1525.23,579.79h3c15.89,1.43,30.25,9,43.94,16.68q38.24,21.57,76.38,43.34c-41,22.73-82.45,45.82-123.51,68.48-.35-42.73.63-85.77.15-128.5Z" />
        <path d="M1402.27,639.9l122.84,68.29-123.69,72.26s-.06-45.85.08-68.71C1401.39,688,1402.27,639.9,1402.27,639.9Z" />
        <path d="M1648.69,639.82l.35.19c-.1,42.59,0,85.18,0,127.77-.07,4.17-.11,12.77-.11,12.77l-123.81-72.31s82.58-45.69,123.61-68.42Z" />
        <path d="M1648.94,640c27.28,15.51,54.37,31.36,81.47,47.17,13.11,7.36,27,15.52,34.16,29.39-38.38,21.25-115.68,64-115.68,64s-.06-8.61,0-12.78c0-42.59-.06-85.18,0-127.77Z" />
        <path d="M1324,684.82c25.65-15,78.19-44.88,78.19-44.88l-.72,140.51s-77-42.45-115.26-63.71c8.34-14.82,23.4-23.83,37.79-31.92Z" />
        <path d="M1525,708.23l123.81,72.3s-39.84,22.05-59.62,32.64c-21.14,12-64.09,35.82-64.09,35.82l-123.66-68.54Z" />
        <path d="M1277.5,772.82c.11-18.86-.23-38.88,8.66-56.08,38.29,21.26,115.26,63.71,115.26,63.71-41.37,23.92-82.54,48.2-123.89,72.15-.06-26.6,0-53.19,0-79.78Z" />
        <path d="M1764.57,716.56c7.54,14.1,8.64,30.5,8.22,46.19,0,29.81,0,90.11,0,90.11l-123.88-72.31S1726.19,737.81,1764.57,716.56Z" />
        <path d="M1401.42,780.45c.19-.08,123.66,68.54,123.66,68.54s.05,71.69.07,106.76c.2,11.29-.07,34.11-.07,34.11-41.27-22.78-82.32-45.76-123.6-68.54l-.07-.31q0-70.28,0-140.56Z" />
        <path d="M1277.53,852.6c41.35-24,82.52-48.23,123.89-72.15q-.06,70.29,0,140.56c-6.35-2.65-12.13-6.43-18.19-9.64C1348,892,1312.88,872.18,1277.52,853v-.37Z" />
        <path d="M1648.89,780.55q0,43.1,0,86.18c-.13,18.27.46,36.47,0,54.73-41.21,22.4-123.82,68.4-123.82,68.4s.27-22.82.07-34.11c0-35.07-.07-106.76-.07-106.76Z" />
        <path d="M1648.89,780.55s123.88,72.14,123.88,72.31c-41.17,22.82-123.87,68.6-123.87,68.6h0c.46-18.26-.13-36.46,0-54.73q0-43.1,0-86.18Z" />
        <path d="M1277.52,853c35.36,19.21,70.43,39,105.7,58.4,6.06,3.21,11.84,7,18.19,9.64l.07.31q-57,33.23-113.94,66.49c-4-6.09-6-13.19-7.51-20.25-2.39-11.77-2.52-23.83-2.52-35.79q0-39.4,0-78.8Z" />
        <path d="M1772.77,852.86c.06,27.65,0,55.3,0,82.95.4,17.73-.12,36.62-9.57,52.25-34.2-20-114.33-66.6-114.33-66.6S1731.6,875.68,1772.77,852.86Z" />
        <path d="M1287.54,987.81q56.94-33.3,113.94-66.49c-.25,46.83.08,93.67-.16,140.49q-40.35-22.75-80.49-45.86c-12.51-7.4-25.32-15.63-33.29-28.14Z" />
        <path d="M1401.48,921.32c41.28,22.78,82.33,45.76,123.6,68.54-41.2,24-123.7,72-123.76,71.95.24-46.82-.09-93.66.16-140.49Z" />
        <path d="M1648.7,921.55l.2-.09c.12,46.84-.25,93.69.19,140.53l-.31.15c-32.66-19.51-65.71-38.4-98.52-57.68-8.26-4.7-25.18-14.6-25.18-14.6S1607.49,944,1648.7,921.55Z" />
        <path d="M1648.9,921.46h0c3.65,2.49,80.13,46.62,114.33,66.6-4.86,8.3-12.56,14.39-20.32,19.84-12.52,8.42-25.88,15.47-38.9,23.05-18.31,10.35-36.5,20.91-54.92,31-.44-46.84-.07-93.69-.19-140.53Z" />
        <path d="M1525.08,989.86v132.93c-10.25-1.51-21.42-3.87-30.5-9.08-31.11-17.26-62.27-34.42-93.26-51.9C1442.52,1037.76,1483.88,1013.91,1525.08,989.86Z" />
        <path d="M1525.08,989.86s16.92,9.9,25.18,14.6c32.81,19.28,65.86,38.17,98.52,57.68q-47.79,26.44-95.57,53a62.48,62.48,0,0,1-25.87,7.69c-.56,0-2.26,0-2.26,0Z" />
      </g>
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

function ChannelGrid({
  links,
  ariaLabel,
  locale,
  reduced,
  baseDelay = 0.14,
}: {
  links: ChannelLink[];
  ariaLabel: string;
  locale: string;
  reduced: boolean;
  baseDelay?: number;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:gap-x-10">
        {links.map((link, i) => {
          const Icon = CHANNEL_ICONS[link.key];
          const isWhatsApp = link.key === "whatsapp";
          const isExternal = link.href.startsWith("http");
          // WhatsApp: same-tab / native scheme opens the app on phones; _blank often stays in browser.
          const openInNewTab = isExternal && !isWhatsApp;

          return (
            <motion.li key={link.key} {...iconFade(i, reduced, baseDelay)} className="min-w-0">
              <a
                href={link.href}
                target={openInNewTab ? "_blank" : undefined}
                rel={openInNewTab ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className={channelButtonClass}
                onClick={
                  isWhatsApp
                    ? (e) => {
                        e.preventDefault();
                        openWhatsAppChat();
                      }
                    : undefined
                }
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/[0.08] transition-colors group-hover:bg-brand/14 group-focus-visible:bg-brand/14"
                  aria-hidden
                >
                  <Icon
                    className="h-[1.125rem] w-[1.125rem] text-foreground/62 transition-colors group-hover:text-brand-readable group-focus-visible:text-brand-readable"
                    aria-hidden
                  />
                </span>
                <span
                  className={cn(
                    "type-meta min-w-0 truncate text-foreground/84 transition-colors duration-200",
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
        <motion.div {...fadeUp(0, reduced)} className="relative flex flex-col">
          <SectionRule index={PAGE_SECTION_INDEX.contact} className="mb-10 md:mb-12" />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:items-start lg:gap-16 xl:gap-20">
            <div className="max-w-xl text-start">
              <div className="flex items-center gap-3">
                <span className="h-1 w-1 shrink-0 rotate-45 bg-brand/35" aria-hidden />
                <p className="section-tag text-foreground/78">{footer.socialLabel}</p>
              </div>

              <h2
                className={cn(
                  "type-heading-display type-billboard mt-4 tracking-tight",
                  locale === "fa" ? "leading-[1.18]" : "leading-[1.05]",
                )}
              >
                {footer.headlineLine1}
                <br />
                <span className="text-foreground-secondary">{footer.headlineLine2}</span>
              </h2>

              <p className="type-ui mt-5 text-[0.9375rem] leading-relaxed text-foreground/78 md:mt-6">
                {footer.tagline}
              </p>

              <motion.a
                {...fadeUp(0.16, reduced)}
                href={footer.phone.href}
                className={cn(
                  channelButtonClass,
                  "mt-8 w-full max-w-sm md:mt-10 lg:max-w-none",
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/[0.08] transition-colors group-hover:bg-brand/14 group-focus-visible:bg-brand/14">
                  <Phone
                    className="h-4 w-4 text-foreground/62 transition-colors group-hover:text-brand-readable"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </span>
                <span className="min-w-0 text-start">
                  <span className="type-code ltr-embed block truncate text-[0.9375rem] tracking-wide text-foreground/92 transition-colors group-hover:text-brand-readable">
                    {footer.phone.display}
                  </span>
                  <span className="type-meta mt-0.5 block truncate text-foreground/72">
                    {footer.phone.label}
                  </span>
                </span>
              </motion.a>
            </div>

            <motion.div {...fadeUp(0.1, reduced)} className="lg:pt-1">
              <ChannelGrid
                links={footer.social}
                ariaLabel={footer.socialLabel}
                locale={locale}
                reduced={reduced}
              />

              {footer.iranianMessengers && (
                <div className="mt-8 border-t border-brand/10 pt-7 md:mt-9">
                  <p className="type-meta mb-4 text-foreground/72">
                    {footer.iranianMessengers.label}
                  </p>
                  <ChannelGrid
                    links={footer.iranianMessengers.links}
                    ariaLabel={footer.iranianMessengers.label}
                    locale={locale}
                    reduced={reduced}
                    baseDelay={0.2}
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
            <p className="type-meta text-foreground/68">{footer.copyright}</p>

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
                  "hover:underline hover:text-[#2f74c0]",
                  "focus-visible:underline focus-visible:outline-none",
                  "hover:[text-shadow:0_0_18px_color-mix(in_oklch,#2f74c0_28%,transparent)]",
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
