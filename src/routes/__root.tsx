import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import { DocumentLocale, LocaleProvider, useLocale } from "@/lib/i18n";
import { LOCALE_BOOTSTRAP_SCRIPT, localeDir } from "@/lib/locale-cookie";
import { resolveRequestLocale } from "@/lib/locale-request";
import { buildHead } from "@/lib/seo";
import { DEFAULT_LOCALE, getMessages, type Locale } from "@/locales";
import appCss from "../styles.css?url";

type RootContext = {
  queryClient: QueryClient;
  locale: Locale;
};

function NotFoundComponent() {
  const { messages } = useLocale();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="empty-state max-w-md">
        <span className="empty-state-icon" aria-hidden />
        <h1 className="type-digits ltr-embed text-6xl font-extralight text-foreground/90">۴۰۴</h1>
        <h2 className="type-ui text-lg text-foreground">{messages.errors.notFoundTitle}</h2>
        <p className="empty-state-hint">{messages.errors.notFoundBody}</p>
        <div className="mt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full btn-primary px-6 py-3 text-sm type-ui-strong"
          >
            {messages.errors.goHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { messages } = useLocale();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="empty-state max-w-md">
        <span className="empty-state-icon" aria-hidden />
        <h1 className="type-ui text-lg text-foreground">{messages.errors.errorTitle}</h1>
        <p className="empty-state-hint">{messages.errors.errorBody}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full btn-primary px-6 py-3 text-sm type-ui-strong"
          >
            {messages.errors.tryAgain}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border-hair/50 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand/25 hover:text-brand-readable"
          >
            {messages.errors.goHome}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<Pick<RootContext, "queryClient">>()({
  beforeLoad: async () => {
    const locale = await resolveRequestLocale();
    return { locale };
  },
  head: ({ match }) => {
    const locale = (match.context as RootContext).locale ?? DEFAULT_LOCALE;
    const head = buildHead(getMessages(locale), locale);

    return {
      meta: head.meta,
      links: [
        ...head.links,
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { rel: "icon", href: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
        { rel: "manifest", href: "/site.webmanifest" },
        {
          rel: "preload",
          href: "/brand/hero/af-logo.svg",
          as: "image",
          type: "image/svg+xml",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Vazirmatn:wght@100..900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@fontsource-variable/geist-mono@5.2.8/index.min.css",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const { locale } = Route.useRouteContext();

  return (
    <html
      lang={locale}
      dir={localeDir(locale)}
      className="locale-pending"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOTSTRAP_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <LocaleProvider initialLocale={locale}>
          <DocumentLocale />
          {children}
        </LocaleProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
