import { catalogImagePath } from "./catalog-products";

export type BrandAsset = {
  logo: string;
  heroImage: string;
  accent: string;
};

const BRAND_ASSETS: Record<string, BrandAsset> = {
  Volvo: {
    logo: "/brands/volvo.svg",
    heroImage: catalogImagePath(17),
    accent: "from-brand/20 via-brand/5 to-transparent",
  },
  DAF: {
    logo: "/brands/daf.svg",
    heroImage: catalogImagePath(18),
    accent: "from-brand-highlight/15 via-transparent to-transparent",
  },
  Universal: {
    logo: "",
    heroImage: catalogImagePath(25),
    accent: "from-foreground/10 via-transparent to-transparent",
  },
};

export function getBrandAsset(brand: string, fallbackHero?: string): BrandAsset {
  const known = BRAND_ASSETS[brand];
  if (known) return known;

  return {
    logo: "",
    heroImage: fallbackHero ?? catalogImagePath(1),
    accent: "from-brand/12 via-transparent to-transparent",
  };
}

export function brandMonogram(brand: string) {
  return brand
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
