"use client";

import { ArrowRight } from "lucide-react";
import ParallaxImage from "./ParallaxImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/RMxpxoWFV8upiwmM7";

const heroButtonBase =
  "group h-9 min-w-[9.5rem] rounded-full px-8 font-geist text-sm font-normal shadow-none transition-colors sm:min-w-[10.5rem] sm:px-12";

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

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <Button
            asChild
            className={cn(
              heroButtonBase,
              "bg-hero-btn text-white hover:bg-blackk/90"
            )}
          >
            <a href="#zespół" className="inline-flex items-center gap-1.5">
              Zespół
              <ArrowRight
                className="size-3 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                strokeWidth={3}
              />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className={cn(
              heroButtonBase,
              "border-0 bg-hero-btn-muted text-blackk hover:bg-[#deded9]"
            )}
          >
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              Google Maps
              <ArrowRight
                className="size-3 text-blackk/80  transition-transform group-hover:translate-x-0.5"
                strokeWidth={3}
              />
            </a>
          </Button>
        </div>
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
