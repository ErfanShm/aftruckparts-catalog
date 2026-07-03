import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { LanguageSwitcher, useLocale } from "@/lib/i18n";
import { scrollToSection, navSectionId, getActiveNavSection } from "@/lib/scrollToCatalog";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { BrandMark, BRAND_NAME } from "./BrandMark";
import { SectionRule } from "./SectionRule";

export function HeaderSpacer() {
  return <div className="header-spacer" aria-hidden />;
}

export function SiteHeader() {
  const { messages, dir } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("catalog");

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
    <header
      className={cn("header-fixed", scrolled ? "header-shell-scrolled" : "header-shell")}
    >
      <div className="mx-auto flex h-[var(--header-bar)] max-w-6xl items-center justify-between gap-4 px-5 md:px-6">
        <a href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
          <span className="hidden h-3.5 w-px bg-brand/50 sm:block" aria-hidden />
          <BrandMark size={34} />
          <span className="font-mono-tech ltr-embed text-sm tracking-[0.12em] text-foreground/85">
            {BRAND_NAME}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
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
                className={cn("nav-link text-sm tracking-[0.04em]", isActive && "nav-link-active")}
              >
                {l}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-hair/40 bg-void/80 text-foreground backdrop-blur-sm md:hidden"
                aria-label={messages.nav.menuOpen}
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent
              side={dir === "rtl" ? "right" : "left"}
              className="w-[min(100vw,20rem)] border-border-hair bg-void/95 backdrop-blur-xl [&>button]:end-4 [&>button]:start-auto"
            >
              <SheetHeader className="text-start">
                <SheetTitle className="font-light">{BRAND_NAME}</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                {messages.nav.links.map((l, i) => {
                  const sectionId = navSectionId(i);
                  const isActive = activeSection === sectionId;
                  return (
                    <div key={`${sectionId}-${i}`}>
                      {i > 0 && <SectionRule className="my-3" />}
                      <a
                        href={`#${sectionId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(sectionId);
                          setMenuOpen(false);
                        }}
                        className={cn(
                          "block rounded-lg px-3 py-3 text-base transition-colors",
                          isActive ? "text-accent" : "text-foreground hover:text-accent",
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
        </div>
      </div>
      <div className="header-brand-line absolute inset-x-0 bottom-0 h-px" aria-hidden />
    </header>
  );
}
