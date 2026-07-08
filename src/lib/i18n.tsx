import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  buildProducts,
  getMessages,
  type Locale,
  type LocaleMessages,
  type Product,
} from "@/locales";
import { formatPaddedIndex, toLocaleDigits } from "@/lib/locale-digits";

const STORAGE_KEY = "aftruckparts-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: LocaleMessages;
  products: Product[];
  dir: "rtl" | "ltr";
  lang: Locale;
  /** Localize digits in any string or number (fa → ۰۱۲۳). */
  formatDigits: (value: string | number) => string;
  /** Zero-padded two-digit index (01 / ۰۱). */
  formatIndex: (index: number) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "fa";
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "en" ? "en" : "fa";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fa");

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const messages = getMessages(locale);
    return {
      locale,
      setLocale,
      messages,
      products: buildProducts(locale, messages),
      dir: locale === "fa" ? "rtl" : "ltr",
      lang: locale,
      formatDigits: (value) => toLocaleDigits(value, locale),
      formatIndex: (index) => formatPaddedIndex(index, locale),
    };
  }, [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function DocumentLocale() {
  const { lang, dir, messages } = useLocale();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = messages.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", messages.meta.description);
  }, [lang, dir, messages]);

  return null;
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, messages } = useLocale();

  return (
    <div
      className={[
        "inline-flex items-center hair-border rounded-full bg-surface/60 p-0.5 text-xs",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-label={`${messages.nav.langFa} / ${messages.nav.langEn}`}
    >
      <button
        type="button"
        onClick={() => setLocale("fa")}
        className={[
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "fa"
            ? "bg-surface-2 text-foreground ring-accent"
            : "text-muted-foreground hover:text-foreground",
        ].join(" ")}
        aria-pressed={locale === "fa"}
      >
        {messages.nav.langFa}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={[
          "rounded-full px-2.5 py-1 font-mono-tech ltr-embed transition-colors",
          locale === "en"
            ? "bg-surface-2 text-foreground ring-accent"
            : "text-muted-foreground hover:text-foreground",
        ].join(" ")}
        aria-pressed={locale === "en"}
      >
        {messages.nav.langEn}
      </button>
    </div>
  );
}
