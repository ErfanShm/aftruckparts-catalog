import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, type TouchEvent } from "react";

import { CatalogImage, CATALOG_IMAGE_SIZES } from "@/components/catalog/CatalogImage";
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

function PhotoThumbStrip({
  slides,
  photoIndex,
  onPhotoChange,
  viewsLabel,
}: {
  slides: GallerySlide[];
  photoIndex: number;
  onPhotoChange: (index: number) => void;
  viewsLabel: string;
}) {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripRef.current?.children[photoIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [photoIndex]);

  return (
    <div className="shrink-0 px-4 pb-4 pt-3">
      <p className="section-tag mb-3 text-center">{viewsLabel}</p>
      <div
        ref={stripRef}
        className="flex snap-x snap-mandatory justify-center gap-2.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onPhotoChange(i)}
            aria-current={i === photoIndex ? "true" : undefined}
            aria-label={`${viewsLabel} ${i + 1}`}
            className={cn(
              "gallery-thumb relative snap-center shrink-0 touch-manipulation overflow-hidden rounded-xl border border-border-hair/30 bg-brand-panel/30 transition-all duration-300",
              i === photoIndex
                ? "gallery-thumb-active h-16 w-16"
                : "h-14 w-14 opacity-50 hover:opacity-80",
            )}
          >
            <CatalogImage
              manifest={slide.manifest}
              alt=""
              placeholder={false}
              fill
              objectFit="contain"
              sizes={CATALOG_IMAGE_SIZES.thumb}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

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
        overlay ? "absolute bottom-3 inset-x-0 z-20" : "px-4 pb-3 pt-1",
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
  const photoLabel = messages.product.detail.photoPosition(photoIndex + 1, slides.length);

  if (!slide) return null;

  const navBtnClass =
    "absolute top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-border-hair/40 glass-panel text-foreground/50 transition-all hover:border-brand/25 hover:text-brand-readable active:scale-95";

  const stage = (
    <div
      className={cn(
        "gallery-stage relative flex w-full items-center justify-center overflow-hidden",
        isMobile ? "absolute inset-0" : "min-h-[min(58vh,520px)] rounded-[1.125rem]",
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

      <AnimatePresence mode="wait">
        <motion.div
          key={photoIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 px-10 py-6 md:px-14 md:py-8"
        >
          <CatalogImage
            manifest={slide.manifest}
            alt={alt}
            priority={photoIndex === 0}
            placeholder={false}
            fullResolution
            lazy={false}
            fill
            objectFit="contain"
            sizes={CATALOG_IMAGE_SIZES.detailMain}
          />
        </motion.div>
      </AnimatePresence>

      {showPhotoNav && !isMobile && (
        <div
          className="pointer-events-none absolute bottom-3 inset-x-0 z-20 mx-auto w-fit rounded-full border border-foreground/[0.06] bg-void/50 px-2.5 py-0.5 font-mono text-[10px] tabular-nums text-foreground/45 backdrop-blur-sm"
          dir="ltr"
        >
          {photoLabel}
        </div>
      )}

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
        <div className="relative h-[min(30vh,260px)] min-h-[180px] w-full">{stage}</div>
      </div>
    );
  }

  return (
    <div className={cn("relative flex w-full min-h-0 flex-col", className)}>
      {stage}
      {showPhotoNav && (
        <PhotoThumbStrip
          slides={slides}
          photoIndex={photoIndex}
          onPhotoChange={onPhotoChange}
          viewsLabel={messages.product.detail.viewsLabel}
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
