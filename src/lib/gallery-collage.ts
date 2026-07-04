import type { Product } from "@/locales";

export type GalleryVariant = "hero" | "tall" | "wide" | "unit" | "sky" | "banner";

export type GalleryLayout = {
  /** < lg — 2-column phone/tablet bento */
  mobileClassName: string;
  /** lg+ — 6-column desktop collage (unchanged engine) */
  desktopClassName: string;
  variant: GalleryVariant;
  organicY: number;
  imagePosition: string;
};

type ShapeDef = {
  variant: GalleryVariant;
  lg: { col: 2 | 3 | 4 | 6; row: 1 | 2 | 3 };
  organicY: number;
  weight: number;
  spanBoost?: Partial<Record<Product["span"], number>>;
  spanPenalty?: Partial<Record<Product["span"], number>>;
};

const MAX_LG_COL: Record<1 | 2, string> = {
  1: "max-lg:col-span-1",
  2: "max-lg:col-span-2",
};
const MAX_LG_ROW: Record<1 | 2 | 3, string> = {
  1: "max-lg:row-span-1",
  2: "max-lg:row-span-2",
  3: "max-lg:row-span-3",
};
const LG_COL: Record<2 | 3 | 4 | 6, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
};
const LG_ROW: Record<1 | 2 | 3, string> = {
  1: "lg:row-span-1",
  2: "lg:row-span-2",
  3: "lg:row-span-3",
};

/** Phone/tablet bento on a 2-column grid — independent from desktop collage. */
function mobileSpans(variant: GalleryVariant): { col: 1 | 2; row: 1 | 2 | 3 } {
  switch (variant) {
    case "tall":
    case "sky":
      return { col: 1, row: 2 };
    case "wide":
    case "banner":
      return { col: 2, row: 1 };
    case "hero":
      return { col: 2, row: 2 };
    default:
      return { col: 1, row: 1 };
  }
}

const SHAPES: ShapeDef[] = [
  {
    variant: "unit",
    lg: { col: 2, row: 1 },
    organicY: 0,
    weight: 4,
    spanPenalty: { xl: 5, lg: 2 },
  },
  {
    variant: "unit",
    lg: { col: 2, row: 1 },
    organicY: 6,
    weight: 2,
    spanPenalty: { xl: 3 },
  },
  {
    variant: "unit",
    lg: { col: 3, row: 1 },
    organicY: 4,
    weight: 2,
    spanBoost: { lg: 2 },
    spanPenalty: { sm: 2 },
  },
  {
    variant: "tall",
    lg: { col: 2, row: 2 },
    organicY: 8,
    weight: 3,
    spanBoost: { lg: 3 },
  },
  {
    variant: "tall",
    lg: { col: 2, row: 3 },
    organicY: 10,
    weight: 1,
    spanBoost: { xl: 4, lg: 2 },
  },
  {
    variant: "wide",
    lg: { col: 4, row: 1 },
    organicY: 3,
    weight: 3,
    spanBoost: { lg: 4, xl: 2 },
  },
  {
    variant: "wide",
    lg: { col: 3, row: 1 },
    organicY: 0,
    weight: 2,
  },
  {
    variant: "hero",
    lg: { col: 4, row: 2 },
    organicY: 12,
    weight: 2,
    spanBoost: { xl: 8, lg: 5 },
    spanPenalty: { sm: 4 },
  },
  {
    variant: "hero",
    lg: { col: 4, row: 3 },
    organicY: 0,
    weight: 1,
    spanBoost: { xl: 10 },
    spanPenalty: { sm: 5 },
  },
  {
    variant: "sky",
    lg: { col: 2, row: 3 },
    organicY: 14,
    weight: 2,
    spanBoost: { xl: 3, lg: 1 },
    spanPenalty: { sm: 3 },
  },
  {
    variant: "banner",
    lg: { col: 6, row: 1 },
    organicY: 0,
    weight: 2,
    spanBoost: { xl: 6, lg: 3 },
    spanPenalty: { sm: 4 },
  },
  {
    variant: "banner",
    lg: { col: 6, row: 2 },
    organicY: 6,
    weight: 1,
    spanBoost: { xl: 5 },
    spanPenalty: { sm: 5 },
  },
];

function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickShape(product: Product): ShapeDef {
  const seed = hashString(`${product.id}:${product.code}`);
  let total = 0;

  const weights = SHAPES.map((shape, i) => {
    let w = shape.weight + ((seed >> (i % 10)) & 3);
    w += shape.spanBoost?.[product.span] ?? 0;
    w -= shape.spanPenalty?.[product.span] ?? 0;
    if (w < 0) w = 0;
    total += w;
    return w;
  });

  if (total === 0) return SHAPES[0]!;

  let roll = seed % total;
  for (let i = 0; i < SHAPES.length; i++) {
    roll -= weights[i]!;
    if (roll < 0) return SHAPES[i]!;
  }

  return SHAPES[0]!;
}

function layoutClasses(shape: ShapeDef): { mobile: string; desktop: string } {
  const mobile = mobileSpans(shape.variant);
  return {
    mobile: [MAX_LG_COL[mobile.col], MAX_LG_ROW[mobile.row]].join(" "),
    desktop: [LG_COL[shape.lg.col], LG_ROW[shape.lg.row]].join(" "),
  };
}

function imagePosition(seed: number): string {
  const x = 47 + (seed % 9) - 4;
  const y = 45 + ((seed >> 4) % 9) - 4;
  return `${x}% ${y}%`;
}

export function galleryLayoutForProduct(product: Product, index: number): GalleryLayout {
  const layoutSeed = hashString(`${product.id}:${product.code}`);
  const motionSeed = hashString(`${product.id}:${index}`);
  const shape = pickShape(product);
  const classes = layoutClasses(shape);

  return {
    mobileClassName: classes.mobile,
    desktopClassName: classes.desktop,
    variant: shape.variant,
    organicY:
      shape.organicY > 0
        ? shape.organicY
        : (motionSeed & 11) === 0
          ? 4 + (motionSeed % 6)
          : 0,
    imagePosition: imagePosition(layoutSeed),
  };
}
