import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { LanguageSwitcher, useLocale } from "@/lib/i18n";
import { scrollToSection, navSectionId, getActiveNavSection, type ActiveNavSection } from "@/lib/scrollToCatalog";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { BrandMark, BRAND_NAME } from "./BrandMark";
import { SectionRule } from "./SectionRule";

export function HeaderSpacer() {
  return <div className="header-spacer" aria-hidden />;
}

export function SiteHeader() {
  const { messages } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveNavSection>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateActive = () => setActiveSection(getActiveNavSection());

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <header className={cn("header-fixed", scrolled ? "header-shell-scrolled" : "header-shell")}>
      <div className="site-column h-[var(--header-bar)]">
        <div className="flex h-full items-center gap-2 md:hidden">
          <div className="flex min-w-0 flex-1 items-center justify-start">
            <MobileMenuButton
              open={menuOpen}
              onOpenChange={setMenuOpen}
              activeSection={activeSection}
              label={messages.nav.menuOpen}
            />
          </div>

          <LanguageSwitcher className="header-lang-touch shrink-0" />

          <div className="flex min-w-0 flex-1 items-center justify-end">
            <a href="/" className="group shrink-0 transition-opacity hover:opacity-90">
              <BrandMark height={46} />
            </a>
          </div>
        </div>

        <div className="hidden h-full items-center gap-4 md:flex">
          <a href="/" className="group shrink-0 transition-opacity hover:opacity-90">
            <BrandMark height={46} />
          </a>

          <nav className="flex flex-1 items-center justify-center gap-9">
            {messages.nav.links.map((l, i) => {
              const sectionId = navSectionId(i);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={`${sectionId}-${i}`}
                  href={`#${sectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId);
                  }}
                  className={cn(
                    "nav-link type-label-strong text-[0.8125rem] tracking-[0.06em]",
                    isActive && "nav-link-active",
                  )}
                >
                  {l}
                </a>
              );
            })}
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
      <div className="header-brand-line absolute inset-x-0 bottom-0 h-px" aria-hidden />
    </header>
  );
}

function MobileMenuButton({
  open,
  onOpenChange,
  activeSection,
  label,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSection: ActiveNavSection;
  label: string;
}) {
  const { messages, dir } = useLocale();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-hair/30 glass-panel text-foreground/90"
          aria-label={label}
        >
          <Menu className="h-[1.125rem] w-[1.125rem]" />
        </button>
      </SheetTrigger>
      <SheetContent
        side={dir === "rtl" ? "right" : "left"}
        className="w-[min(100vw,20rem)] border-border-hair/40 glass-panel-strong [&>button]:end-4 [&>button]:start-auto"
      >
        <SheetHeader className="text-start">
          <SheetTitle className="type-code ltr-embed tracking-[0.1em]">{BRAND_NAME}</SheetTitle>
        </SheetHeader>
        <nav className="mt-10 flex flex-col gap-0.5">
          {messages.nav.links.map((l, i) => {
            const sectionId = navSectionId(i);
            const isActive = activeSection === sectionId;
            return (
              <div key={`${sectionId}-${i}`}>
                {i > 0 && <SectionRule className="my-4" />}
                <a
                  href={`#${sectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId);
                    onOpenChange(false);
                  }}
                  className={cn(
                    "type-ui-strong block rounded-xl px-3 py-3.5 text-[0.9375rem] transition-colors",
                    isActive
                      ? "text-terminal"
                      : "text-foreground/55 hover:text-terminal",
                  )}
                >
                  {l}
                </a>
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
