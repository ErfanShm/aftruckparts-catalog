import { BRAND_NAME } from "@/locales";

const BRAND_LOGO = "/apple-touch-icon.png";

export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <img
      src={BRAND_LOGO}
      alt={BRAND_NAME}
      width={size}
      height={size}
      className="shrink-0 rounded-md"
    />
  );
}

export { BRAND_NAME };
