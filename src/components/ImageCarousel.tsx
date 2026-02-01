"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = () => {
    if (current === 0) {
      api?.scrollTo(images.length - 1);
    } else {
      api?.scrollPrev();
    }
  };

  const scrollNext = () => {
    if (current === images.length - 1) {
      api?.scrollTo(0);
    } else {
      api?.scrollNext();
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-end mb-2 ">
        <h3 className="text-sm font-poppins text-black tracking-tight ml-1">
          rozwijamy się dla Ciebie
        </h3>
        <div className="flex gap-2 ">
          <button
            onClick={scrollPrev}
            className="p-2 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 transition"
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 transition"
            aria-label="Następne zdjęcie"
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>


      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ loop: false }}
      >
        <CarouselContent className="gap-3">
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-full md:basis-full">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt={`Zdjęcie ${index + 1}`}
                  className="w-full h-full object-cover blur-sm scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                  <p className="text-white text-lg sm:text-xl font-medium font-poppins tracking-tight mb-4">
                    Wkrótce pojawią się tutaj zdjęcia nowej siedziby
                  </p>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-poppins">
                    <MapPin className="w-4 h-4" />
                    <span>Odwiedź nas</span>
                  </div>
                  <p className="text-white text-sm mt-2 font-poppins">
                    ul. Eugeniusza Kwiatkowskiego 17, 52-326 Wrocław
                  </p>
                  <p className="text-white/70 text-xs mt-1 font-poppins">
                    Poniedziałek - Piątek 07:30-16:00
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
