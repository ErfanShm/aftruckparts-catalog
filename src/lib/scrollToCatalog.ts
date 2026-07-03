export const NAV_SECTION_IDS = ["catalog", "brands", "warranty", "contact"] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export function scrollToCatalog() {
  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function navSectionId(linkIndex: number): NavSectionId {
  return NAV_SECTION_IDS[linkIndex] ?? "catalog";
}

/** Which nav section is active based on scroll position (last passed section wins). */
export function getActiveNavSection(): NavSectionId {
  if (typeof document === "undefined") return "catalog";

  const headerOffset =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-offset")) ||
    72;
  const marker = window.scrollY + headerOffset + 64;

  let active: NavSectionId = NAV_SECTION_IDS[0];

  for (const id of NAV_SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    if (sectionTop <= marker) active = id;
  }

  const nearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
  if (nearBottom) return "contact";

  return active;
}
