"use client";
import React, { useEffect, useRef, useState, type Key } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Settings,
  Wifi,
  Box,
  Plug,
  Lightbulb,
  Antenna,
  Zap,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { pages } from "../data/page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const firstCarouselItems = [
  {
    id: "1",
    icon: <Settings />,
    label: "Aparatura modułowa i sterowanie",
    description: "Sterowniki, moduły i automatyka",
  },
  {
    id: "2",
    icon: <Wifi />,
    label: "Narzędzia i mierniki",
    description: "Multimetry, testery i akcesoria",
  },
  {
    id: "3",
    icon: <Zap />,
    label: "Sieci niskoprądowe i okablowanie strukturalne",
    description: "Instalacje i przewody",
  },
  {
    id: "4",
    icon: <Box />,
    label: "Rozdzielnice i obudowy",
    description: "Bezpieczne obudowy dla instalacji",
  },
  {
    id: "5",
    icon: <Plug />,
    label: "Osprzęt elektroinstalacyjny i siłowy",
    description: "Gniazda, wyłączniki i złącza",
  },
];

const secondCarouselItems = [
  {
    id: "6",
    icon: <Lightbulb />,
    label: "Technika świetlna",
    description: "Lampy, oprawy i oświetlenie LED",
  },
  {
    id: "7",
    icon: <Antenna />,
    label: "System tras i mocowania",
    description: "Kanały, koryta i uchwyty",
  },
  {
    id: "8",
    icon: <Plug />,
    label: "Kable i przewody",
    description: "Przewody energetyczne i sygnałowe",
  },
  {
    id: "9",
    icon: <Zap />,
    label: "Ochrona odgromowa",
    description: "Systemy ochrony przed wyładowaniami",
  },
  {
    id: "10",
    icon: <Circle />,
    label: "Pozostałe",
    description: "Dodatkowe akcesoria i komponenty",
  },
];

const Offer = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);


  const CarouselSection = ({
    items,
    isLast,
  }: {
    items: {
      id: Key;
      icon: React.ReactNode;
      label: string;
      description?: string;
    }[];
    isLast: boolean;
  }) => {
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
      api?.scrollPrev();
    };

    const scrollNext = () => {
      api?.scrollNext();
    };

    return (
      <div
        className={`
          relative w-full mt-2 py-4
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          ${isLast ? "rounded-b-4xl" : "rounded-t-4xl"}
        `}
      >
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: isMobile ? "center" : "start",
            containScroll: "trimSnaps"
          }}
        >
          <CarouselContent className="gap-0">
            {items.map((item) => {
              const page = pages.find((p) => p.id === item.id);
              return (
                <CarouselItem
                  key={item.id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 gap-3 "
                >
                  <div className="aspect-square bg-white rounded-xl p-6 border border-black/20 flex flex-col justify-between h-full mx-3 sm:mx-1">
                    <div>
                      <div className="text-accent-orange mb-3 text-2xl">
                        {item.icon}
                      </div>
                      <h3 className="text-base font-medium mb-2">{item.label}</h3>
                      {item.description && (
                        <p className="text-xs text-black/60">{item.description}</p>
                      )}
                    </div>

                    {page && (
                      <Link
                        to={`/${page.slug}`}
                        className="text-sm font-medium text-accent-orange hover:underline"
                      >
                        Dowiedz się więcej
                        <ArrowUpRight className="inline-block w-4 h-4 ml-1" />
                      </Link>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="flex justify-between items-center mt-4">
            {isMobile && (
              <div className="flex justify-center items-center gap-2 w-full">
                {items.map((_, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-300 rounded-full ${index === current
                      ? "bg-accent-orange w-8 h-1.5"
                      : "bg-black/20 w-1.5 h-1.5"
                      }`}
                  />
                ))}
              </div>
            )}

            {!isMobile && (
              <div className="flex justify-end items-center gap-2 w-full mr-1">
                <button
                  onClick={scrollPrev}
                  className="p-2 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 transition"
                  aria-label="Poprzednie"
                >
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                <button
                  onClick={scrollNext}
                  className="p-2 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 transition"
                  aria-label="Następne"
                >
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>
              </div>
            )}
          </div>
        </Carousel>
      </div>
    );
  };

  return (
    <div className="w-full flex items-center justify-center pb-20">
      <section
        ref={sectionRef}
        id="oferta"
        className="w-full sm:w-[95%] max-w-[1200px] mx-auto overflow-hidden relative mb-2"
      >
        <h2 className="text-center text-sm font-poppins tracking-tight mt-2 p-8">
          Nasza oferta
          <div className="text-black/60">naciśnij i dowiedz się więcej</div>
        </h2>

        <CarouselSection items={firstCarouselItems} isLast={false} />
        <CarouselSection items={secondCarouselItems} isLast={true} />
      </section>
    </div>
  );
};

export default Offer;
