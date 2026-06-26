"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import ParallaxImage from "./ParallaxImage";
import { PARALLAX_SLIDES } from "@/data/parallax-slides";
import { useParallaxCarousel } from "@/hooks/useParallaxCarousel";
import { cn } from "@/lib/utils";

const carouselNavButtonClass =
  "flex size-10 items-center justify-center rounded-sm border border-blackk/15 bg-neutral-100 text-blackk transition";

function CarouselNavButtons({
  onPrev,
  onNext,
  className,
  prevLabel = "Poprzednie zdjęcie",
  nextLabel = "Następne zdjęcie",
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
  prevLabel?: string;
  nextLabel?: string;
}) {
  return (
    <div className={cn("flex gap-1", className)}>
      <button
        type="button"
        onClick={onPrev}
        aria-label={prevLabel}
        className={carouselNavButtonClass}
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className={carouselNavButtonClass}
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </div>
  );
}

function CarouselSlideDots({
  slideCount,
  activeIndex,
  onGoTo,
  className,
}: {
  slideCount: number;
  activeIndex: number;
  onGoTo: (index: number) => void;
  className?: string;
}) {
  if (slideCount <= 1) return null;

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="tablist"
      aria-label="Galeria zdjęć"
    >
      {Array.from({ length: slideCount }, (_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Zdjęcie ${index + 1}`}
          onClick={() => onGoTo(index)}
          className={cn(
            "h-1.5 rounded-full bg-blackk/20 transition-all duration-300 z-30",
            index === activeIndex ? "w-5 bg-blackk/70" : "w-1.5 opacity-60"
          )}
        />
      ))}
    </div>
  );
}

const Photo = () => {
  const { activeIndex, goToSlide, goToPrev, goToNext } = useParallaxCarousel(
    PARALLAX_SLIDES.length
  );

  return (
    <section id="photo" className="w-full bg-background font-geist py-20">
      <div className="maxw flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <p className="text-[11px] tracking-[0.02em] text-blackk/50 sm:text-xs">
              Nowa siedziba · Wrocław
            </p>

            <h2 className="mt-3 max-w-2xl text-left font-gesit text-xl font-normal leading-[1.15] tracking-tight text-blackk sm:text-2xl md:text-[1.75rem]">
              Rozwijamy się, aby utrzymać standardy i dostarczać klientom
              najlepsze rozwiązania.
            </h2>
          </div>

          <CarouselNavButtons
            onPrev={goToPrev}
            onNext={goToNext}
            className="hidden md:flex"
          />
        </div>

        <ParallaxImage
          slides={PARALLAX_SLIDES}
          activeIndex={activeIndex}
          autoPlay={false}
          showDesktopDots
          onGoToSlide={goToSlide}
        />

        <div className="flex items-center justify-between gap-4 md:hidden">
          <CarouselSlideDots
            slideCount={PARALLAX_SLIDES.length}
            activeIndex={activeIndex}
            onGoTo={goToSlide}
          />
          <CarouselNavButtons onPrev={goToPrev} onNext={goToNext} />
        </div>
      </div>
    </section>
  );
};

export default Photo;
