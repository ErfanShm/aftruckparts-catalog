import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Mail, Send } from "lucide-react";

import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { BrandMark, BRAND_NAME } from "./BrandMark";
import { PageSection } from "./PageSection";
import { SectionRule } from "./SectionRule";

const ease = [0.22, 1, 0.36, 1] as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  whatsapp: WhatsAppIcon,
  instagram: Instagram,
  telegram: Send,
  email: Mail,
} as const;

function fadeUp(delay: number, reduced: boolean) {
  return reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.65, ease },
      };
}

export function SiteFooter() {
  const { messages } = useLocale();
  const reduced = useReducedMotion() ?? false;
  const { footer } = messages;

  return (
    <footer id="contact" className="mt-auto scroll-mt-header">
      <PageSection
        as="div"
        borderTop
        spine
        className="relative !pt-16 !pb-8 md:!pt-24 md:!pb-20 lg:!pt-28"
      >
        <motion.div {...fadeUp(0, reduced)} className="relative">
          <SectionRule index="05" className="mb-10 md:mb-12" />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14 xl:gap-20">
            <div className="relative z-10 flex flex-col justify-between gap-10 md:gap-12">
              <div>
                <p className="section-tag">{footer.socialLabel}</p>

                <h2 className="mt-4 max-w-2xl text-[clamp(2rem,5.5vw,3.75rem)] font-extralight leading-[1.05] tracking-tight">
                  {footer.headlineLine1}
                  <br />
                  <span className="text-foreground/55">{footer.headlineLine2}</span>
                </h2>

                <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground md:mt-8 md:text-base">
                  {footer.tagline}
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-brand/12 pt-8">
                <BrandMark size={44} />
                <div>
                  <span className="font-mono-tech ltr-embed block text-lg tracking-[0.14em] text-foreground md:text-xl">
                    {BRAND_NAME}
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
                    {footer.tagline.split("·")[0]?.trim() ?? footer.socialLabel}
                  </span>
                </div>
              </div>
            </div>

            <motion.ul
              {...fadeUp(0.1, reduced)}
              className="relative grid grid-cols-2 gap-px border border-brand/12 bg-brand/12"
            >
              {footer.social.map((link, i) => {
                const Icon = SOCIAL_ICONS[link.key];
                return (
                  <li key={link.key} className="bg-void">
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                      className={cn(
                        "group relative flex min-h-[9rem] flex-col justify-between p-5 transition-colors duration-300 md:min-h-[10.5rem] md:p-6",
                        "hover:bg-brand/6 focus-visible:bg-brand/6 focus-visible:outline-none",
                      )}
                    >
                      <span
                        className="font-mono-tech ltr-embed text-[9px] tracking-[0.42em] text-brand-highlight/55"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="my-3">
                        <span className="font-mono-tech ltr-embed block text-xl tracking-[0.08em] text-foreground transition-colors group-hover:text-brand-highlight md:text-2xl">
                          {link.short}
                        </span>
                        <span className="mt-2 block text-[10px] tracking-[0.18em] text-foreground-muted uppercase">
                          {link.label}
                        </span>
                      </div>

                      <Icon className="h-3.5 w-3.5 text-brand-highlight/65 transition-colors group-hover:text-brand-highlight" />
                    </a>
                  </li>
                );
              })}
            </motion.ul>
          </div>

          <motion.p
            {...fadeUp(0.16, reduced)}
            className="mt-12 text-center font-mono text-[10px] tracking-[0.24em] text-foreground-muted md:mt-16 md:text-[11px]"
          >
            {footer.copyright}
          </motion.p>

          <div className="quote-dock-spacer md:hidden" aria-hidden />
        </motion.div>
      </PageSection>
    </footer>
  );
}
