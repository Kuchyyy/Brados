"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
              <div className="rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt={`Zdjęcie ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
