export type BrandAsset = {
  /** Transparent PNG wordmark for brand band cards */
  mark: string;
  /** Wide wordmark — leader card gets larger sizing */
  wide?: boolean;
};

const BRAND_ASSETS: Record<string, BrandAsset> = {
  Volvo: {
    mark: "/brands/volvo.png",
    wide: true,
  },
  DAF: {
    mark: "/brands/daf.png",
    wide: true,
  },
  "AF Accessories": {
    mark: "/brands/af-accessories.png",
    wide: true,
  },
};

export function getBrandAsset(brand: string): BrandAsset {
  return (
    BRAND_ASSETS[brand] ?? {
      mark: "",
      wide: false,
    }
  );
}

export function brandMonogram(brand: string) {
  return brand
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
