import { brandMonogram, getBrandAsset } from "@/data/brand-assets";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  brand: string;
  className?: string;
  markClassName?: string;
};

export function BrandLogo({ brand, className, markClassName }: BrandLogoProps) {
  const asset = getBrandAsset(brand);

  if (asset.mark) {
    return (
      <img
        src={asset.mark}
        alt=""
        aria-hidden
        draggable={false}
        className={cn(
          "brand-mark h-full w-full max-h-full max-w-full object-contain object-center",
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
