import type { MotionValue } from "framer-motion";

import { useLocale } from "@/lib/i18n";

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
      className="font-mono-tech ltr-embed text-[10px] font-semibold tracking-wide"
    >
      <span>{label}</span>
    </DockItem>
  );
}
