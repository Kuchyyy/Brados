"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

type LogoItem = {
  src: string;
  alt: string;
  mt?: string;
  scale?: number;
};

const logos: LogoItem[] = [
  { src: "/photos/awex.webp", alt: "Awex logo", scale: 1.4 },
  { src: "/photos/dehn.webp", alt: "Dehn logo", scale: 1.3 },
  { src: "/photos/elektro.webp", alt: "Elektroplast logo", scale: 1 },
  { src: "/photos/hager.webp", alt: "Hager logo", scale: 1.5 },
  { src: "/photos/kanlux.webp", alt: "Kanlux logo", scale: 1 },
  { src: "/photos/koelner.webp", alt: "Koelner logo", scale: 1 },
  { src: "/photos/Kopos.webp", alt: "Kopos logo", scale: 1 },
  { src: "/photos/legrand.webp", alt: "Legrand logo", scale: 1 },
  { src: "/photos/noark.webp", alt: "Noark logo", scale: 1 },
  { src: "/photos/ospel.webp", alt: "Ospel logo", scale: 1 },
  { src: "/photos/wago.webp", alt: "Wago logo", scale: 1.5 },
  {
    src: "https://cdn.traconelectric.com/o/tracon-liferay-theme/images/tracon_logo.png",
    alt: "Tracon logo",
    scale: 1,
  },
];

const Trusted = () => {
  const autoScroll = React.useRef(
    AutoScroll({
      speed: 1.0,
      stopOnInteraction: false,
    })
  );

  return (
    <section className="w-full flex justify-center bg-white py-10">
      <div className="w-[95%] max-w-[1200px] mx-auto flex flex-col items-center gap-5">
        <p className="text-[11px] sm:text-xs font-poppins tracking-wide uppercase text-soft-black/60 text-center">
          Dostarczamy produkty firm
        </p>

        <div className="relative w-full flex justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-linear-to-r from-white via-white/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-linear-to-l from-white via-white/70 to-transparent" />

          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            plugins={[autoScroll.current]}
            className="w-full max-w-[1200px] mask-x-from-75% mask-x-to-95%"
          >
            <CarouselContent className="items-center">
              {[...logos, ...logos].map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/5 flex justify-center"
                >
                  <div className="flex items-center justify-center h-10 sm:h-16 w-32 sm:w-40">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-full w-[100px] object-contain sm:grayscale sm:opacity-60 sm:hover:grayscale-0 sm:hover:opacity-100 transition"
                      style={{ transform: `scale(${logo.scale ?? 1})` }}
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
