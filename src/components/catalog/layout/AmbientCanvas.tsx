import { useLocale } from "@/lib/i18n";

export function AmbientCanvas() {
  const { dir } = useLocale();
  const isRtl = dir === "rtl";

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 ambient-base" />
      <div className="absolute inset-0 ambient-grid opacity-40" />
      <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-brand/10 blur-[140px] ambient-pulse" />
      <div
        className={[
          "absolute bottom-0 h-[500px] w-[500px] rounded-full bg-brand/5 blur-[120px]",
          isRtl ? "start-0" : "end-0",
        ].join(" ")}
      />
      <div className="absolute inset-0 grain-overlay opacity-20" />
      <div className="absolute inset-0 ambient-vignette" />
    </div>
  );
}
