"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PARALLAX_ROTATE_MS,
  PARALLAX_SLIDES,
  type ParallaxSlide,
} from "@/data/parallax-slides";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const PARALLAX_START = -5;
const PARALLAX_END = 5;
const PARALLAX_RANGE = PARALLAX_END - PARALLAX_START;

type ParallaxImageProps = {
  enableParallax?: boolean;
  slides?: ParallaxSlide[];
  rotateMs?: number;
  className?: string;
  objectFocus?: "top" | "center";
  objectFit?: "cover" | "contain";
  activeIndex?: number;
  autoPlay?: boolean;
  showDesktopDots?: boolean;
  onGoToSlide?: (index: number) => void;
};

const objectFocusClass = {
  top: "object-[center_20%]",
  center: "object-center",
} as const;

export default function ParallaxImage({
  enableParallax = true,
  slides = PARALLAX_SLIDES,
  rotateMs = PARALLAX_ROTATE_MS,
  className = "",
  objectFocus = "center",
  objectFit = "cover",
  activeIndex: controlledIndex,
  autoPlay = true,
  showDesktopDots = false,
  onGoToSlide,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const location = useLocation();
  const [internalIndex, setInternalIndex] = useState(0);

  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    if (isControlled || !autoPlay || !hasMultipleSlides) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setInternalIndex((current) => (current + 1) % slides.length);
    }, rotateMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isControlled,
    autoPlay,
    hasMultipleSlides,
    rotateMs,
    slides.length,
    activeIndex,
  ]);

  useEffect(() => {
    if (!enableParallax) return;

    const trigger = containerRef.current;
    if (!trigger) return;

    const images = trigger.querySelectorAll<HTMLElement>("[data-parallax-image]");
    if (!images.length) return;

    gsap.set(images, { yPercent: PARALLAX_START, scale: 1 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const yPercent = PARALLAX_START + self.progress * PARALLAX_RANGE;
          gsap.set(images, { yPercent, scale: 1 });
        },
      });

      window.setTimeout(() => ScrollTrigger.refresh(), 100);
    }, trigger);

    return () => ctx.revert();
  }, [enableParallax, location.pathname, activeIndex]);

  const objectClass = objectFocusClass[objectFocus];
  const isContain = objectFit === "contain";
  const parallaxImageClass = cn(
    !isContain &&
    "absolute inset-x-0 -top-[17.5%] h-[135%] w-full max-w-none will-change-transform object-cover",
    isContain && "block h-auto w-full rounded-sm object-contain",
    !isContain && objectClass
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-sm",
        isContain
          ? "h-auto"
          : "h-[min(56vh,640px)] sm:h-[min(86vh,900px)]",
        className
      )}
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        const mobileSrc = slide.mobileSrc ?? slide.desktopSrc;

        return (
          <div
            key={`${slide.desktopSrc}-${index}`}
            className={cn(
              isContain ? "relative" : "absolute inset-0 overflow-hidden",
              !isContain &&
              "transition-opacity duration-700 ease-in-out",
              !isContain && (isActive ? "opacity-100" : "opacity-0"),
              isContain && !isActive && "hidden"
            )}
            aria-hidden={!isActive}
          >
            <img
              {...(!isContain && { "data-parallax-image": true })}
              src={slide.desktopSrc}
              alt={isActive ? slide.alt : ""}
              className={cn("hidden sm:block", parallaxImageClass)}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <img
              {...(!isContain && { "data-parallax-image": true })}
              src={mobileSrc}
              alt={isActive ? slide.alt : ""}
              className={cn("block sm:hidden", parallaxImageClass)}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        );
      })}

      {showDesktopDots && hasMultipleSlides && onGoToSlide && (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-36 [mask-image:linear-gradient(to_left,black,transparent)] md:block"
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-l from-blackk/90 via-blackk/50 to-transparent backdrop-blur-md" />
          </div>
          <div
            className="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex"
            role="tablist"
            aria-label="Galeria zdjęć"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Zdjęcie ${index + 1}`}
                onClick={() => onGoToSlide(index)}
                className={cn(
                  "w-1.5 rounded-full bg-white/90 shadow-sm transition-all duration-300",
                  index === activeIndex ? "h-5" : "h-1.5 opacity-70"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
