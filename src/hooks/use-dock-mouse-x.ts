import { useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/** Shared cursor X for dock-style magnetic magnification. */
export function useDockMouseX() {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setReady(true);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onPointerMove = useCallback(
    (clientX: number, magnetic: boolean) => {
      if (!magnetic) return;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(clientX);
        rafRef.current = null;
      });
    },
    [mouseX],
  );

  const onPointerLeave = useCallback(
    (magnetic: boolean) => {
      if (!magnetic) return;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      mouseX.set(Number.POSITIVE_INFINITY);
    },
    [mouseX],
  );

  return { mouseX, ready, onPointerMove, onPointerLeave };
}
