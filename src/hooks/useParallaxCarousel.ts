import { useCallback, useEffect, useRef, useState } from "react";
import { PARALLAX_ROTATE_MS } from "@/data/parallax-slides";

export function useParallaxCarousel(
  slideCount: number,
  rotateMs = PARALLAX_ROTATE_MS,
  autoPlay = true
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount]
  );

  const goToPrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (!autoPlay || slideCount <= 1) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, rotateMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, rotateMs, slideCount, activeIndex]);

  return { activeIndex, goToSlide, goToPrev, goToNext };
}
