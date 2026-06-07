"use client";

import ParallaxImage from "./ParallaxImage";
import HeroCtaButtons from "./HeroCtaButtons";

export function HeroIntro() {
  return (
    <section className="w-full bg-background font-geist">
      <div className="maxw pt-28 pb-6 md:pt-32 md:pb-8">
        <p className="text-[11px] tracking-[0.02em] text-blackk/50 sm:text-xs">
          Hurtownia materiałów elektrycznych i teletechnicznych · Wrocław
        </p>

        <h1 className="mt-3 max-w-2xl text-left font-inter text-xl font-normal leading-[1.15] tracking-tight text-blackk sm:text-2xl md:text-[1.75rem]">
          Zaopatrzenie instalacji elektrycznych dla firm i instalatorów.
        </h1>

        <HeroCtaButtons className="mt-5" />
      </div>
    </section>
  );
}

type HeroMediaProps = {
  enableParallax?: boolean;
};

export function HeroMedia({ enableParallax = true }: HeroMediaProps) {
  return (
    <section className="w-full bg-background pb-8 font-geist md:pb-8">
      <div className="maxw">
        <ParallaxImage enableParallax={enableParallax} />
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
