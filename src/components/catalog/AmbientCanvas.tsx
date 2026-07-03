import { useLocale } from "@/lib/i18n";

export function AmbientCanvas() {
  const { dir } = useLocale();
  const isRtl = dir === "rtl";

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 ambient-base" />
      <div className="absolute inset-0 ambient-aurora" />
      <div className="absolute inset-0 ambient-mesh" />
      <div className="absolute inset-0 ambient-grid opacity-20" />

      <div
        className={[
          "absolute top-0 h-[min(55vh,420px)] w-[min(38vw,300px)] -rotate-12 bg-brand/5 blur-[90px]",
          isRtl ? "end-[8%]" : "start-[8%]",
        ].join(" ")}
      />
      <div className="absolute top-0 start-1/2 h-[min(42vh,380px)] w-[min(72vw,560px)] -translate-x-1/2 rounded-full bg-brand/14 blur-[130px] ambient-drift" />
      <div
        className={[
          "absolute top-[28%] h-[min(36vh,300px)] w-[min(40vw,320px)] rounded-full bg-brand/6 blur-[100px]",
          isRtl ? "end-[-6%]" : "start-[-6%]",
        ].join(" ")}
      />

      <div className="absolute top-[36%] start-[58%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]">
        <div className="absolute inset-x-0 top-1/2 h-px bg-brand-highlight" />
        <div className="absolute inset-y-0 start-1/2 w-px bg-brand-highlight" />
      </div>

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.09]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="720" cy="380" r="280" stroke="var(--brand)" strokeWidth="0.5" />
        <path
          d="M 0 520 C 360 340 720 420 1080 360 S 1440 300 1440 300"
          stroke="var(--brand)"
          strokeWidth="0.55"
        />
        <path
          d="M 120 0 L 120 900 M 1320 0 L 1320 900"
          stroke="var(--brand)"
          strokeWidth="0.3"
          opacity="0.6"
        />
      </svg>

      <svg
        className={[
          "absolute top-[16vh] h-[min(42vh,360px)] w-[min(26vw,200px)] opacity-[0.08] lg:opacity-[0.12]",
          isRtl ? "start-[4%]" : "end-[4%]",
        ].join(" ")}
        viewBox="0 0 280 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 20 360 Q 140 40 260 20" stroke="var(--brand-highlight)" strokeWidth="0.75" />
      </svg>

      <div className="absolute inset-0 grain-overlay opacity-18" />
      <div className="absolute inset-0 ambient-vignette" />
    </div>
  );
}
