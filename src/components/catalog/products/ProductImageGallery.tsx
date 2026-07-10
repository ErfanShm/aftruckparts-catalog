import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, type TouchEvent } from "react";

import {
  CatalogImage,
  CATALOG_IMAGE_SIZES,
  prefetchCatalogImage,
} from "@/components/catalog/CatalogImage";
import { useLocale } from "@/lib/i18n";
import type { GallerySlide } from "@/lib/product-gallery";
import { cn } from "@/lib/utils";

type ProductImageGalleryProps = {
  slides: GallerySlide[];
  photoIndex: number;
  onPhotoChange: (index: number) => void;
  alt: string;
  isMobile: boolean;
  className?: string;
  showSwipeHint?: boolean;
};

function PhotoDotStrip({
  slides,
  photoIndex,
  onPhotoChange,
  overlay = false,
}: {
  slides: GallerySlide[];
  photoIndex: number;
  onPhotoChange: (index: number) => void;
  overlay?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1.5",
        overlay ? "absolute bottom-3 inset-x-0 z-20" : "shrink-0 px-4 pb-3 pt-2",
      )}
    >
      {slides.map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPhotoChange(i)}
          aria-current={i === photoIndex ? "true" : undefined}
          aria-label={`Photo ${i + 1}`}
          className={cn(
            "gallery-photo-dot touch-manipulation",
            overlay && "bg-foreground/25",
            i === photoIndex && "gallery-photo-dot-active",
          )}
        />
      ))}
    </div>
  );
}

export function ProductImageGallery({
  slides,
  photoIndex,
  onPhotoChange,
  alt,
  isMobile,
  className,
}: ProductImageGalleryProps) {
  const { messages, dir } = useLocale();
  const touchStart = useRef<number | null>(null);
  const slide = slides[photoIndex];
  const canPrev = photoIndex > 0;
  const canNext = photoIndex < slides.length - 1;
  const showPhotoNav = slides.length > 1;

  const goPrev = useCallback(() => {
    if (canPrev) onPhotoChange(photoIndex - 1);
  }, [canPrev, onPhotoChange, photoIndex]);

  const goNext = useCallback(() => {
    if (canNext) onPhotoChange(photoIndex + 1);
  }, [canNext, onPhotoChange, photoIndex]);

  // Prefetch current + adjacent slides so swipe/open feels instant.
  useEffect(() => {
    prefetchCatalogImage(slides[photoIndex]?.manifest);
    prefetchCatalogImage(slides[photoIndex + 1]?.manifest);
    prefetchCatalogImage(slides[photoIndex - 1]?.manifest);
  }, [photoIndex, slides]);

  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - (e.changedTouches[0]?.clientX ?? touchStart.current);
    touchStart.current = null;
    if (Math.abs(delta) < 48) return;
    if (dir === "rtl") {
      delta > 0 ? goPrev() : goNext();
    } else {
      delta > 0 ? goNext() : goPrev();
    }
  };

  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

  if (!slide) return null;

  const navBtnClass =
    "absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-border-hair/40 glass-panel text-foreground/50 transition-all hover:border-brand/25 hover:text-brand-readable active:scale-95";

  const stage = (
    <div
      className={cn(
        "gallery-stage relative flex w-full items-center justify-center overflow-hidden",
        isMobile ? "absolute inset-0" : "min-h-0 flex-1 rounded-[1.125rem]",
      )}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {showPhotoNav && canPrev && (
        <button
          type="button"
          onClick={goPrev}
          aria-label={messages.product.detail.prevPhoto}
          className={cn(navBtnClass, "start-3 md:start-4")}
        >
          <PrevIcon className="h-4 w-4" />
        </button>
      )}
      {showPhotoNav && canNext && (
        <button
          type="button"
          onClick={goNext}
          aria-label={messages.product.detail.nextPhoto}
          className={cn(navBtnClass, "end-3 md:end-4")}
        >
          <NextIcon className="h-4 w-4" />
        </button>
      )}

      {/* Keep all slides mounted so switching photos is instant (cached). */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 px-10 py-6 md:px-14 md:py-8",
            i === photoIndex ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0",
          )}
          aria-hidden={i !== photoIndex}
        >
          <CatalogImage
            manifest={s.manifest}
            alt={alt}
            priority={i === 0}
            placeholder
            lazy={false}
            fill
            objectFit="contain"
            sizes={CATALOG_IMAGE_SIZES.detailMain}
          />
        </div>
      ))}

      {showPhotoNav && isMobile && (
        <PhotoDotStrip
          slides={slides}
          photoIndex={photoIndex}
          onPhotoChange={onPhotoChange}
          overlay
        />
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className={cn("relative shrink-0", className)}>
        <div className="relative h-[min(24vh,210px)] min-h-[148px] w-full">{stage}</div>
      </div>
    );
  }

  return (
    <div className={cn("relative flex h-full w-full min-h-0 flex-col", className)}>
      {stage}
      {showPhotoNav && (
        <PhotoDotStrip
          slides={slides}
          photoIndex={photoIndex}
          onPhotoChange={onPhotoChange}
        />
      )}
    </div>
  );
}

export function usePhotoNavigation(
  slideCount: number,
  photoIndex: number,
  onPhotoChange: (index: number) => void,
  dir: "rtl" | "ltr",
) {
  const goPrevPhoto = useCallback(() => {
    if (photoIndex > 0) onPhotoChange(photoIndex - 1);
  }, [onPhotoChange, photoIndex]);

  const goNextPhoto = useCallback(() => {
    if (photoIndex < slideCount - 1) onPhotoChange(photoIndex + 1);
  }, [onPhotoChange, photoIndex, slideCount]);

  const handlePhotoKey = useCallback(
    (key: string) => {
      if (slideCount <= 1) return false;
      if (key === "ArrowLeft") {
        dir === "rtl" ? goNextPhoto() : goPrevPhoto();
        return true;
      }
      if (key === "ArrowRight") {
        dir === "rtl" ? goPrevPhoto() : goNextPhoto();
        return true;
      }
      return false;
    },
    [dir, goNextPhoto, goPrevPhoto, slideCount],
  );

  return { goPrevPhoto, goNextPhoto, handlePhotoKey };
}
