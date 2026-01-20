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
    description:
      "Nowoczesne sterowniki, moduły i systemy automatyki. Idealne do precyzyjnego zarządzania instalacjami i procesami.",
  },
  {
    id: "2",
    icon: <Wifi />,
    label: "Narzędzia i mierniki",
    description:
      "Profesjonalne multimetry, testery i akcesoria pomiarowe. Niezawodne wsparcie w codziennej pracy instalatora.",
  },
  {
    id: "3",
    icon: <Zap />,
    label: "Sieci niskoprądowe i okablowanie strukturalne",
    description:
      "Kompleksowe rozwiązania do transmisji danych i sygnałów. Stabilne instalacje dla biur, przemysłu i domu.",
  },
  {
    id: "4",
    icon: <Box />,
    label: "Rozdzielnice i obudowy",
    description:
      "Bezpieczne rozdzielnice i obudowy do każdej instalacji. Ochrona sprzętu i estetyczne wykończenie systemów.",
  },
  {
    id: "5",
    icon: <Plug />,
    label: "Osprzęt elektroinstalacyjny i siłowy",
    description:
      "Gniazda, wyłączniki i złącza najwyższej jakości. Trwałość, bezpieczeństwo i nowoczesny design.",
  },
];

const secondCarouselItems = [
  {
    id: "6",
    icon: <Lightbulb />,
    label: "Technika świetlna",
    description:
      "Lampy, oprawy i oświetlenie LED do każdego wnętrza. Energooszczędne rozwiązania i nowoczesny styl.",
  },
  {
    id: "7",
    icon: <Antenna />,
    label: "System tras i mocowania",
    description:
      "Kanały, koryta i uchwyty montażowe do kabli. Porządek, bezpieczeństwo i szybki montaż.",
  },
  {
    id: "8",
    icon: <Plug />,
    label: "Kable i przewody",
    description:
      "Przewody energetyczne i sygnałowe o wysokiej jakości. Niezawodne w każdej instalacji.",
  },
  {
    id: "9",
    icon: <Zap />,
    label: "Ochrona odgromowa",
    description:
      "Systemy ochrony przed wyładowaniami atmosferycznymi. Bezpieczeństwo budynków i instalacji.",
  },
  {
    id: "10",
    icon: <Circle />,
    label: "Pozostałe",
    description:
      "Dodatkowe akcesoria i komponenty do instalacji. Wszystko, czego potrzebujesz w jednym miejscu.",
  },
];

const Offer = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
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
    startIndex,
  }: {
    items: {
      id: Key;
      icon: React.ReactNode;
      label: string;
      description?: string;
    }[];
    startIndex: number;
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
      <div className="relative w-full mt-2 py-4 transition-all duration-700 ease-out">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: isMobile ? "center" : "start",
            containScroll: "trimSnaps",
          }}
        >
          <CarouselContent className="gap-0">
            {items.map((item, index) => {
              const page = pages.find((p) => p.id === item.id);
              const number = String(startIndex + index + 1).padStart(2, "0");

              return (
                <CarouselItem
                  key={item.id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 gap-3"
                >
                  <div className="relative aspect-square bg-white rounded-xl p-6 border border-black/20 flex flex-col justify-between h-full mx-3 sm:mx-1">
                    <div className="
  absolute top-4 left-5 px-2 py-1 rounded-md
  text-[10px] font-medium tracking-widest
  text-black/70
  bg-white/60 backdrop-blur-sm
  border border-black/20
">
                      {number}
                    </div>




                    <div className="relative top-10">
                      <div className="text-accent-orange mb-3 text-2xl">
                        {item.icon}
                      </div>
                      <h3 className="text-base font-medium mb-2">
                        {item.label}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-black/60">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {page && (
                      <Link
                        to={`/${page.slug}`}
                        className="group text-sm text-black border border-black/20 rounded-md px-3 py-2 pr-2 flex justify-between items-center gap-2 hover:border-accent-orange transition-colors duration-300"
                      >
                        Dowiedz się więcej

                        <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-orange">
                          <ArrowUpRight className="w-4 h-4 text-white group-hover:rotate-45 duration-300 transition-all" />
                        </span>
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

        <CarouselSection items={firstCarouselItems} startIndex={0} />
        <CarouselSection items={secondCarouselItems} startIndex={5} />
      </section>
    </div>
  );
};

export default Offer;
