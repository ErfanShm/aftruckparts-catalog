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
  DEFAULT_LOCALE,
  getMessages,
  type Locale,
  type LocaleMessages,
  type Product,
} from "@/locales";
import { formatPaddedIndex, toLocaleDigits } from "@/lib/locale-digits";
import {
  LOCALE_STORAGE_KEY,
  localeDir,
  writeLocaleCookie,
} from "@/lib/locale-cookie";
import { syncDocumentMeta } from "@/lib/seo";

export { LOCALE_STORAGE_KEY };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: LocaleMessages;
  products: Product[];
  dir: "rtl" | "ltr";
  lang: Locale;
  localeReady: boolean;
  /** Localize digits in any string or number (fa → ۰۱۲۳). */
  formatDigits: (value: string | number) => string;
  /** Zero-padded two-digit index (01 / ۰۱). */
  formatIndex: (index: number) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  return saved === "en" ? "en" : DEFAULT_LOCALE;
}

function readDomLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const fromDom = document.documentElement.dataset.locale;
  if (fromDom === "en" || fromDom === "fa") return fromDom;
  return readStoredLocale();
}

function applyDocumentLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = localeDir(locale);
  document.documentElement.dataset.locale = locale;
}

type LocaleProviderProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

export function LocaleProvider({ children, initialLocale = DEFAULT_LOCALE }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof document !== "undefined" ? readDomLocale() : initialLocale,
  );
  const [localeReady, setLocaleReady] = useState(() => typeof window === "undefined");

  useEffect(() => {
    const resolved = readDomLocale();
    setLocaleState(resolved);
    applyDocumentLocale(resolved);
    document.documentElement.classList.remove("locale-pending");
    setLocaleReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
    writeLocaleCookie(next);
    applyDocumentLocale(next);
    syncDocumentMeta(getMessages(next), next);
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const messages = getMessages(locale);
    return {
      locale,
      setLocale,
      messages,
      products: buildProducts(locale, messages),
      dir: localeDir(locale),
      lang: locale,
      localeReady,
      formatDigits: (value) => toLocaleDigits(value, locale),
      formatIndex: (index) => formatPaddedIndex(index, locale),
    };
  }, [locale, localeReady, setLocale]);

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
    applyDocumentLocale(lang);
    syncDocumentMeta(messages, lang);
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
