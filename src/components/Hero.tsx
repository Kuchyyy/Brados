"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/RMxpxoWFV8upiwmM7";

export function HeroIntro() {
  return (
    <section className="w-full bg-white font-geist">
      <div className="maxw pt-28 pb-10 md:pt-32 md:pb-14">
        <h1 className="max-w-3xl text-left text-xl sm:text-[1.75rem]  leading-[1.12] tracking-[-0.02em] text-blackk ">
          Hurtownia materiałów elektrycznych we Wrocławiu, asortyment od
          producentów, dostawa i wsparcie dla instalatorów.
        </h1>

        <div className="mt-8 flex flex-wrap gap-2 font-geist">
          <a
            href="#zespół"
            className="inline-flex items-center justify-center font-medium rounded-none bg-orange px-6 py-1 text-sm text-white transition-opacity hover:opacity-90 "
          >
            Zespół
          </a>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border font-medium border-neutral-300 rounded-none bg-neutral-50 px-6 py-1 text-sm  text-blackk transition-colors hover:bg-neutral-100"
          >
            Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

type HeroMediaProps = {
  enableParallax?: boolean;
};

export function HeroMedia({ enableParallax = true }: HeroMediaProps) {
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
    <section className="w-full bg-white font-geist">
      <div className="maxw">
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-none"
        >
          <img
            ref={desktopImgRef}
            src="/photos/firma.webp"
            alt="Hurtownia Brados — siedziba i magazyn"
            className="hidden h-[min(78vh,820px)] w-full scale-[1.2] rounded-none object-cover will-change-transform sm:block"
          />
          <img
            ref={mobileImgRef}
            src="/photos/firmatel.webp"
            alt="Hurtownia Brados — siedziba i magazyn"
            className="block h-[min(62vh,560px)] w-full scale-[1.2] rounded-none object-cover will-change-transform sm:hidden"
          />
        </div>
      </div>
    </section>
  );
}

type HeroProps = {
  enableParallax?: boolean;
};

const Hero = ({ enableParallax = true }: HeroProps) => (
  <>
    <HeroIntro />
    <HeroMedia enableParallax={enableParallax} />
  </>
);

export default Hero;
