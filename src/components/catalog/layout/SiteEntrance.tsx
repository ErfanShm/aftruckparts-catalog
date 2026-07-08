import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { useLocale } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

export function SiteEntrance({ children }: { children: ReactNode }) {
  const { localeReady } = useLocale();
  const reduced = useReducedMotion() ?? false;

  if (!localeReady) {
    return <div className="min-h-screen bg-background" aria-busy="true" />;
  }

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease }}
    >
      {children}
    </motion.div>
  );
}
