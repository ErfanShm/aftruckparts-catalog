import { brandMonogram, getBrandAsset } from "@/data/brand-assets";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  brand: string;
  className?: string;
  markClassName?: string;
};

export function BrandLogo({ brand, className, markClassName }: BrandLogoProps) {
  const asset = getBrandAsset(brand);

  if (asset.logo) {
    return (
      <img
        src={asset.logo}
        alt=""
        aria-hidden
        className={cn(
          "w-auto max-w-full object-contain",
          "drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]",
          className,
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "font-mono-tech ltr-embed flex items-center justify-center rounded-full border border-brand/25 bg-brand/12 text-brand-highlight",
        markClassName,
      )}
      aria-hidden
    >
      {brandMonogram(brand)}
    </span>
  );
}
