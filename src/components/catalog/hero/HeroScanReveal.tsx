import { useEffect, useState } from "react";

type HeroScanRevealProps = {
  active: boolean;
  reduced?: boolean;
};

/** One-shot QC scan sweep when the 3D specimen first appears. */
export function HeroScanReveal({ active, reduced }: HeroScanRevealProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active || reduced) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timer);
  }, [active, reduced]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden>
      <div className="hero-scan-line" />
    </div>
  );
}
