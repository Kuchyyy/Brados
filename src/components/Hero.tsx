"use client";

import type { ParallaxSlide } from "@/data/parallax-slides";
import HeroCtaButtons from "./HeroCtaButtons";
import { TextAnimate } from "@/components/ui/text-animate";

const HERO_SLIDE: ParallaxSlide = {
  desktopSrc: "/photos/baza.webp",
  mobileSrc: "/photos/bazatelefon.webp",
  alt: "Hurtownia Brados — siedziba i magazyn",
};

export default function Hero() {
  return (
    <section className="relative min-h-svh w-full overflow-hidden font-geist">
      <img
        src={HERO_SLIDE.desktopSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 hidden h-full w-full object-cover object-center sm:block"
        loading="eager"
        decoding="async"
      />
      <img
        src={HERO_SLIDE.mobileSrc ?? HERO_SLIDE.desktopSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 block h-full w-full object-cover object-center sm:hidden"
        loading="eager"
        decoding="async"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25"
        aria-hidden
      />

      <div className="relative z-10 w-full">
        <div className="maxw flex min-h-svh flex-col justify-end pb-12 pt-28 md:pb-16 md:pt-32">
          <TextAnimate
            as="p"
            animation="slideLeft"
            by="word"
            once
            className="text-[11px] tracking-loose text-white sm:text-xs font-geist"
          >
            Wszystko dla Twoich inwestycji
          </TextAnimate>

          <div className="mt-3">
            <p className="text-left font-gesit text-2xl font-normal leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Hurtownia materiałów elektrycznych
            </p>
            <p className="text-left font-gesit text-2xl font-normal leading-[1.1] tracking-tight text-white/90 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              i teletechnicznych we Wrocławiu.
            </p>
          </div>

          <HeroCtaButtons className="mt-6" />
        </div>
      </div>
    </section>
  );
}
