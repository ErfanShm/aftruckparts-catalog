import { BRAND_NAME } from "@/locales";

const BRAND_LOGO = "/brand/hero/af-header-mark.png";

export function BrandMark({ height = 40 }: { height?: number }) {
  return (
    <img
      src={BRAND_LOGO}
      alt={BRAND_NAME}
      height={height}
      className="brand-logo-lockup w-auto shrink-0 object-contain"
      style={{ height }}
    />
  );
}

export { BRAND_NAME };
