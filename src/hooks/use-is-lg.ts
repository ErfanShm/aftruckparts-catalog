import * as React from "react";

const LG_BREAKPOINT = 1024;
const LG_QUERY = `(min-width: ${LG_BREAKPOINT}px)`;

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(LG_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(LG_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** True at lg (1024px) and above — matches Tailwind `lg:` breakpoint. */
export function useIsLg() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
