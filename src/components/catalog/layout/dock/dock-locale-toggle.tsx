import type { MotionValue } from "framer-motion";

import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { DockItem } from "./dock-item";

type DockLocaleToggleProps = {
  mouseX: MotionValue<number>;
  magnetic: boolean;
};

export function DockLocaleToggle({ mouseX, magnetic }: DockLocaleToggleProps) {
  const { locale, setLocale, messages } = useLocale();
  const next = locale === "fa" ? "en" : "fa";
  const label = next === "fa" ? messages.nav.langFa : messages.nav.langEn;

  return (
    <DockItem
      label={`${messages.nav.langFa} / ${messages.nav.langEn}`}
      mouseX={mouseX}
      magnetic={magnetic}
      onClick={() => setLocale(next)}
      className={cn(
        "text-[10px] font-semibold",
        next === "en" ? "font-mono-tech ltr-embed tracking-wide" : "tracking-normal",
      )}
    >
      <span>{label}</span>
    </DockItem>
  );
}
