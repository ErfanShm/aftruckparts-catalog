import { useLayoutEffect, useRef, type RefObject } from "react";

function scrollToY(y: number) {
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const target = Math.min(Math.max(0, y), max);
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: target, left: 0, behavior: "auto" });
  root.style.scrollBehavior = previousBehavior;
}

function getHeaderOffset() {
  return (
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-offset")) || 72
  );
}

function isViewingCatalog() {
  const catalog = document.getElementById("catalog");
  if (!catalog) return false;
  return catalog.getBoundingClientRect().top < window.innerHeight * 0.6;
}

function stabilizeCatalogViewport(results: HTMLElement) {
  const catalog = document.getElementById("catalog");
  const headerOffset = getHeaderOffset();
  const resultsRect = results.getBoundingClientRect();
  const catalogRect = catalog?.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const targetTop = headerOffset + (isDesktop ? 24 : 12);

  const pastCatalog = catalogRect !== undefined && catalogRect.bottom < viewportHeight * 0.35;
  const resultsFarBelow = resultsRect.top > viewportHeight * 0.55;
  const resultsAboveView = resultsRect.bottom < headerOffset + 48;

  if (pastCatalog || resultsFarBelow || resultsAboveView) {
    scrollToY(window.scrollY + resultsRect.top - targetTop);
  }
}

function applyCatalogScroll(el: HTMLElement, prepared: boolean) {
  if (prepared) {
    alignResultsToViewport(el);
    return;
  }

  if (isViewingCatalog()) {
    stabilizeCatalogViewport(el);
  }
}

function alignResultsToViewport(results: HTMLElement) {
  const headerOffset = getHeaderOffset();
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const targetTop = headerOffset + (isDesktop ? 24 : 12);
  const resultsRect = results.getBoundingClientRect();

  scrollToY(window.scrollY + resultsRect.top - targetTop);
}

/**
 * After a structural filter change, keep the user inside the catalog viewport.
 * - Temporarily reserves the pre-filter results height so the page cannot collapse under them.
 * - Repositions scroll when the viewport would otherwise land in later page sections.
 */
export function useStableFilterScroll<T extends HTMLElement>(
  resultsRef: RefObject<T | null>,
  signature: string,
) {
  const prevHeightRef = useRef(0);
  const preparedRef = useRef(false);

  const prepareForFilterChange = () => {
    const el = resultsRef.current;
    if (!el) return;

    preparedRef.current = true;
    prevHeightRef.current = Math.max(prevHeightRef.current, el.offsetHeight);
    el.style.minHeight = `${prevHeightRef.current}px`;
  };

  useLayoutEffect(() => {
    const el = resultsRef.current;
    if (!el) return;

    const prepared = preparedRef.current;
    const prevHeight = prevHeightRef.current;
    const naturalHeight = el.offsetHeight;
    const shrunk = prevHeight > 0 && naturalHeight < prevHeight * 0.65;

    if (shrunk) {
      el.style.minHeight = `${prevHeight}px`;
    }

    applyCatalogScroll(el, prepared);

    let releaseTimer = 0;
    const frame1 = requestAnimationFrame(() => {
      applyCatalogScroll(el, prepared);

      releaseTimer = window.setTimeout(() => {
        if (prepared) {
          alignResultsToViewport(el);
        }

        el.style.minHeight = "";
        preparedRef.current = false;
        prevHeightRef.current = el.offsetHeight;

        if (isViewingCatalog()) {
          stabilizeCatalogViewport(el);
        }
      }, 320);
    });

    if (!shrunk) {
      prevHeightRef.current = naturalHeight;
    }

    return () => {
      cancelAnimationFrame(frame1);
      window.clearTimeout(releaseTimer);
    };
  }, [signature, resultsRef]);

  return { prepareForFilterChange };
}
