import { useLocale } from "@/lib/i18n";

export function AmbientCanvas() {
  const { dir } = useLocale();
  const isRtl = dir === "rtl";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 ambient-base" />
      <div className="absolute inset-0 ambient-horizon opacity-50" />
      <div className="absolute inset-[-8%] ambient-ribbon ambient-ribbon-shift" />
      <div className="absolute -top-40 left-1/2 h-[min(85vw,680px)] w-[min(85vw,680px)] -translate-x-1/2 ambient-orb-well ambient-breathe" />
      <div className="absolute top-[20%] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-brand/5 blur-[130px] ambient-pulse" />
      <div
        className={[
          "absolute top-[32%] h-[420px] w-[420px] ambient-orb-sky ambient-drift",
          isRtl ? "start-[-16%]" : "end-[-16%]",
        ].join(" ")}
      />
      <div className="absolute inset-0 ambient-grid opacity-18" />
      <div className="absolute inset-0 grain-overlay opacity-10" />
      <div className="absolute inset-0 ambient-vignette" />
    </div>
  );
}
