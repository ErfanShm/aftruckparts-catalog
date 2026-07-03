import { useEffect, useRef, useState } from "react";

function headerOffsetPx(extraTop = 0) {
  const spacer = document.querySelector(".header-spacer");
  const base = spacer?.getBoundingClientRect().height ?? 72;
  return base + extraTop;
}

type UseStickyActiveOptions = {
  /** Additional px below the header before "stuck" activates (e.g. desktop dock gap). */
  extraTop?: number;
};

export function useStickyActive({ extraTop = 0 }: UseStickyActiveOptions = {}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let observer: IntersectionObserver | null = null;

    const connect = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => setActive(!entry.isIntersecting),
        {
          threshold: 0,
          rootMargin: `-${headerOffsetPx(extraTop)}px 0px 0px 0px`,
        },
      );
      observer.observe(sentinel);
    };

    connect();
    window.addEventListener("resize", connect);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", connect);
    };
  }, [extraTop]);

  return { sentinelRef, active };
}
