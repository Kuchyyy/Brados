"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ParallaxSlide = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
};

// Podmień ścieżki na swoje 3 zdjęcia parallax
const PARALLAX_SLIDES: ParallaxSlide[] = [
  {
    desktopSrc: "/photos/pokoj.JPG",
    mobileSrc: "/photos/pokoj.JPG",
    alt: "Hurtownia Brados — zdjęcie 1",
  },
  {
    desktopSrc: "/photos/magazyn.JPG",
    mobileSrc: "/photos/magazyn.JPG",
    alt: "Hurtownia Brados — zdjęcie 2",
  },

];

const ROTATE_MS = 6000;

type ParallaxImageProps = {
  enableParallax?: boolean;
  slides?: ParallaxSlide[];
  rotateMs?: number;
  className?: string;
};

export default function ParallaxImage({
  enableParallax = true,
  slides = PARALLAX_SLIDES,
  rotateMs = ROTATE_MS,
  className = "",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, rotateMs);

    return () => window.clearInterval(intervalId);
  }, [rotateMs, slides.length]);

  useEffect(() => {
    if (!enableParallax) return;

    const parallaxEl = parallaxRef.current;
    const trigger = containerRef.current;
    if (!parallaxEl || !trigger) return;

    gsap.set(parallaxEl, { yPercent: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const yPercent = -30 + self.progress * 60;
          gsap.set(parallaxEl, { yPercent });
        },
      });

      window.setTimeout(() => ScrollTrigger.refresh(), 100);
    }, trigger);

    return () => ctx.revert();
  }, [enableParallax, location.pathname, activeIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-sm ${className}`.trim()}
    >
      <div
        ref={parallaxRef}
        className="relative h-[min(62vh,560px)] w-full will-change-transform sm:h-[min(78vh,820px)]"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const mobileSrc = slide.mobileSrc ?? slide.desktopSrc;

          return (
            <div
              key={`${slide.desktopSrc}-${index}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100" : "opacity-0"
                }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.desktopSrc}
                alt={isActive ? slide.alt : ""}
                className="hidden h-full w-full scale-[1.2] rounded-sm object-cover sm:block"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <img
                src={mobileSrc}
                alt={isActive ? slide.alt : ""}
                className="block h-full w-full scale-[1.2] rounded-sm object-cover sm:hidden"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
