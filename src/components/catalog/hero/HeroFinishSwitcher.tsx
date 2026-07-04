import { cn } from "@/lib/utils";

import { HERO_FINISHES, type HeroFinish } from "./hero-finishes";

type HeroFinishSwitcherProps = {
  active: HeroFinish;
  labels: Record<HeroFinish, string>;
  onChange: (finish: HeroFinish) => void;
  className?: string;
};

export function HeroFinishSwitcher({
  active,
  labels,
  onChange,
  className,
}: HeroFinishSwitcherProps) {
  return (
    <div
      className={cn("finish-pill-group", className)}
      role="group"
      aria-label="Finish"
    >
      {HERO_FINISHES.map((finish) => (
        <button
          key={finish}
          type="button"
          onClick={() => onChange(finish)}
          className={cn("finish-pill", active === finish && "finish-pill-active")}
        >
          {labels[finish]}
        </button>
      ))}
    </div>
  );
}
