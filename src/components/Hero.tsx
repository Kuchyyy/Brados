"use client";

import type { ParallaxSlide } from "@/data/parallax-slides";
import HeroCtaButtons from "./HeroCtaButtons";
import { TextAnimate } from "@/components/ui/text-animate";

const HERO_SLIDE: ParallaxSlide = {
  desktopSrc: "/photos/baza.png",
  mobileSrc: "/photos/bazatelefon.png",
  alt: "Hurtownia Brados — siedziba i magazyn",
};

export function HeroIntro() {
  return (
    <section className="w-full bg-white font-geist">
      <div className="maxw pt-38 pb-6 md:pt-42">
        <TextAnimate
          as="h1"
          animation="slideLeft"
          by="word"
          once
          className="text-[11px] tracking-[0.02em] text-blackk/50 sm:text-xs"
        >
          Wszystko dla Twoich inwestycji
        </TextAnimate>

        <div className="mt-1 max-w-xl space-y-1">
          <p className="text-left font-gesit text-xl font-normal leading-[1.15] tracking-tight text-blackk sm:text-2xl md:text-[1.75rem]">
            Hurtownia materiałów elektrycznych
          </p>
          <p className="text-left font-gesit text-xl font-normal leading-[1.15] tracking-tight text-blackk sm:text-2xl md:text-[1.75rem]">
            i teletechnicznych we Wrocławiu.
          </p>
        </div>

        <HeroCtaButtons className="mt-5" />
      </div>
    </section>
  );
}

export function HeroMedia() {
  return (
    <section className="-mt-1 w-full bg-gradient-to-t from-background to-white pb-8 font-geist md:-mt-3 md:pb-8">
      <div className="maxw mt-2">
        <img
          src={HERO_SLIDE.desktopSrc}
          alt={HERO_SLIDE.alt}
          className="hidden h-auto w-full max-w-full rounded-sm sm:block"
          loading="eager"
          decoding="async"
        />
        <img
          src={HERO_SLIDE.mobileSrc ?? HERO_SLIDE.desktopSrc}
          alt={HERO_SLIDE.alt}
          className="block aspect-square w-full object-cover object-center rounded-sm sm:hidden"
          loading="eager"
          decoding="async"
        />
      </div>
    </section>
  );
}

const Hero = () => (
  <>
    <HeroIntro />
    <HeroMedia />
  </>
);

export default Hero;
