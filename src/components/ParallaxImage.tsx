"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ParallaxImageProps = {
  enableParallax?: boolean;
  desktopSrc?: string;
  mobileSrc?: string;
  alt?: string;
  className?: string;
};

export default function ParallaxImage({
  enableParallax = true,
  desktopSrc = "/photos/firma.webp",
  mobileSrc = "/photos/firmatel.webp",
  alt = "Hurtownia Brados — siedziba i magazyn",
  className = "",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const desktopImgRef = useRef<HTMLImageElement | null>(null);
  const mobileImgRef = useRef<HTMLImageElement | null>(null);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enableParallax) return;

    const imgRef = isMobile ? mobileImgRef.current : desktopImgRef.current;
    const trigger = containerRef.current;
    if (!imgRef || !trigger) return;

    gsap.set(imgRef, { yPercent: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const yPercent = -30 + self.progress * 60;
          gsap.set(imgRef, { yPercent });
        },
      });

      window.setTimeout(() => ScrollTrigger.refresh(), 100);
    }, trigger);

    return () => ctx.revert();
  }, [enableParallax, isMobile, location.pathname]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-sm ${className}`.trim()}
    >
      <img
        ref={desktopImgRef}
        src={desktopSrc}
        alt={alt}
        className="hidden h-[min(78vh,820px)] w-full scale-[1.2] rounded-sm object-cover will-change-transform sm:block"
      />
      <img
        ref={mobileImgRef}
        src={mobileSrc}
        alt={alt}
        className="block h-[min(62vh,560px)] w-full scale-[1.2] rounded-sm object-cover will-change-transform sm:hidden"
      />
    </div>
  );
}
