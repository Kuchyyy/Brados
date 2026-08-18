"use client";

import type { ParallaxSlide } from "@/data/parallax-slides";
import Team1 from "./Team1";

const PRZEBUDOWA_SLIDE: ParallaxSlide = {
  desktopSrc: "/photos/baza.webp",
  mobileSrc: "/photos/bazatelefon.webp",
  alt: "Hurtownia Brados — siedziba i magazyn",
};

export default function Przebudowa() {
  return (
    <>
      <section className="relative h-[60svh] min-h-[22rem] w-full overflow-hidden font-geist">
        <img
          src={PRZEBUDOWA_SLIDE.desktopSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 hidden h-full w-full object-cover object-center sm:block"
          loading="eager"
          decoding="async"
        />
        <img
          src={PRZEBUDOWA_SLIDE.mobileSrc ?? PRZEBUDOWA_SLIDE.desktopSrc}
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

        <div className="maxw relative z-10 flex h-full flex-col justify-end pb-10 md:pb-14">
          <img
            src="/photos/logo.webp"
            alt="Brados"
            className="h-9 w-auto self-start brightness-0 invert"
          />

          <h1 className="mt-5 text-left font-gesit font-normal leading-[1.1] tracking-tight text-white text-4xl md:text-5xl lg:text-[3.25rem]">
            Strona w przebudowie.
          </h1>
        </div>
      </section>

      <Team1 />
    </>
  );
}
