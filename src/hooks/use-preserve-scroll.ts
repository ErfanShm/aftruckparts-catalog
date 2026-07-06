import { useLayoutEffect, useRef, type RefObject } from "react";

function scrollToY(y: number) {
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const target = Math.min(Math.max(0, y), max);
  window.scrollTo(0, target);
}

/**
 * One-shot scroll compensation when `signature` changes (e.g. filter state).
 * Keeps the anchor element at the same viewport Y — no ResizeObserver.
 */
export function usePreserveScrollOnChange<T extends HTMLElement>(
  ref: RefObject<T | null>,
  signature: string,
) {
  const prevTopRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prevTop = prevTopRef.current;
    let top = el.getBoundingClientRect().top;

    if (prevTop !== null) {
      const delta = top - prevTop;
      if (Math.abs(delta) > 2) {
        scrollToY(window.scrollY + delta);
        top = el.getBoundingClientRect().top;
      }
    }

    prevTopRef.current = top;

    // Mobile Safari may reflow after the first pass (sticky bar, address bar).
    const frame = requestAnimationFrame(() => {
      if (prevTopRef.current === null || !ref.current) return;
      const nextTop = ref.current.getBoundingClientRect().top;
      const drift = nextTop - prevTopRef.current;
      if (Math.abs(drift) > 2) {
        scrollToY(window.scrollY + drift);
        prevTopRef.current = ref.current.getBoundingClientRect().top;
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [signature]);
}
