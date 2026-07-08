import { forwardRef, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";

import type { ImageManifestEntry } from "@/data/catalog-image-types";
import { cn } from "@/lib/utils";

export const CATALOG_IMAGE_SIZES = {
  grid: "(max-width: 1024px) 50vw, 50vw",
  detailMain: "(max-width: 768px) 100vw, 1200px",
  thumb: "56px",
  quoteThumb: "64px",
  brandBand: "(max-width: 640px) 100vw, 33vw",
} as const;

export type CatalogImageProps = {
  manifest: ImageManifestEntry;
  alt: string;
  priority?: boolean;
  lazy?: boolean;
  /** Low-quality blur placeholder while loading. Off by default — grid cards show sharp images directly. */
  placeholder?: boolean;
  /** Detail modal: always load manifest.src (largest variant), skip responsive srcset downsizing. */
  fullResolution?: boolean;
  fill?: boolean;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  className?: string;
  wrapperClassName?: string;
  sizes?: string;
  style?: CSSProperties;
  onLoad?: () => void;
};

export const CatalogImage = forwardRef<HTMLImageElement, CatalogImageProps>(
  function CatalogImage(
    {
      manifest,
      alt,
      priority = false,
      lazy = true,
      placeholder = false,
      fullResolution = false,
      fill = false,
      objectPosition,
      objectFit = "cover",
      className,
      wrapperClassName,
      sizes,
      style,
      onLoad,
    },
    ref,
  ) {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [loaded, setLoaded] = useState(false);
    const eager = priority || lazy === false;
    const showPlaceholder = placeholder && Boolean(manifest.blurDataURL);

    const markLoaded = () => {
      setLoaded(true);
      onLoad?.();
    };

    useLayoutEffect(() => {
      const img = imgRef.current;
      if (img?.complete && img.naturalWidth > 0) {
        markLoaded();
      }
    }, [manifest.src]);

    if (!manifest.src) {
      return null;
    }

    const setRefs = (node: HTMLImageElement | null) => {
      imgRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    return (
      <div
        className={cn(
          "catalog-image-wrapper",
          fill ? "absolute inset-0" : "relative w-full overflow-hidden",
          !fill && manifest.width && manifest.height && "max-w-full",
          wrapperClassName,
        )}
        style={
          !fill && manifest.width && manifest.height
            ? { aspectRatio: `${manifest.width} / ${manifest.height}` }
            : undefined
        }
      >
        {showPlaceholder ? (
          <div
            className={cn(
              "catalog-image-blur pointer-events-none absolute inset-0 bg-cover bg-center",
              loaded && "catalog-image-blur-hidden",
            )}
            style={{ backgroundImage: `url(${manifest.blurDataURL})` }}
            aria-hidden
          />
        ) : null}
        <picture className={cn(fill && "absolute inset-0 block h-full w-full")}>
          {!fullResolution && manifest.srcSetAvif ? (
            <source type="image/avif" srcSet={manifest.srcSetAvif} sizes={sizes} />
          ) : null}
          {!fullResolution && manifest.srcSetWebp ? (
            <source type="image/webp" srcSet={manifest.srcSetWebp} sizes={sizes} />
          ) : null}
          <img
            ref={setRefs}
            src={manifest.src}
            alt={alt}
            width={manifest.width}
            height={manifest.height}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            sizes={sizes}
            onLoad={markLoaded}
            style={{ objectPosition, objectFit, ...style }}
            className={cn(
              "catalog-image-main",
              fill ? "absolute inset-0 h-full w-full" : "h-full w-full",
              showPlaceholder && !loaded && "catalog-image-pending",
              showPlaceholder && loaded && "catalog-image-loaded",
              className,
            )}
          />
        </picture>
      </div>
    );
  },
);

export const MotionCatalogImage = motion.create(CatalogImage);
