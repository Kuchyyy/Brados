"use client";
import React, { useEffect, useRef, useState, type Key } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const [siteAlert, setSiteAlert] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!siteAlert) return;
    const timer = setTimeout(() => setSiteAlert(null), 2000);
    return () => clearTimeout(timer);
  }, [siteAlert]);

  const renderCarousel = (
    items: {
      id: Key | null | undefined;
      icon: React.ReactNode;
      label: string;
      description?: string;
    }[],
    startIndex: number
  ) => (
    <div
      className={`
        relative w-full max-w-[100%] mx-auto mt-2
        transform transition-all duration-700 ease-out 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <Carousel
        opts={{
          loop: true,
          align: "start",
          skipSnaps: false,
          containScroll: "keepSnaps",
        }}
        className="w-full"
      >
        <div className="absolute right-20 top-[20px] flex items-center gap-2 z-10">
          <span className="text-sm font-medium">Przesuń</span>
          <CarouselPrevious className="p-2 bg-white rounded-md">
            <ArrowLeft />
          </CarouselPrevious>
          <CarouselNext className="p-2 bg-white rounded-md">
            <ArrowRight />
          </CarouselNext>
        </div>

        <CarouselContent className="flex gap-3 px-3 overflow-visible">
          {items.map((item, index) => {
            const page = pages.find((p) => p.id === item.id);
            return (
              <CarouselItem
                key={item.id}
                className="
                  flex flex-col justify-between aspect-square bg-white rounded-md p-8 relative mb-1 border border-zinc-200
                  sm:basis-1/2 md:basis-1/2 lg:basis-1/3 
                "
              >
                {/* Ikona */}
                <div className="absolute top-6 left-6 text-orange-600">
                  {item.icon}
                </div>

                {/* Środek */}
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="text-base md:text-lg lg:text-xl font-medium mt-8">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="text-sm md:text-base lg:text-lg text-gray-500 mt-1">
                      {item.description}
                    </div>
                  )}
                </div>

                {/* Numer itemu */}
                <div className="absolute bottom-4 left-4 text-xs md:text-sm font-bold text-gray-400">
                  {startIndex + index}
                </div>

                {page && (
                  <Link
                    to={`/${page.slug}`}
                    className="absolute bottom-4 right-4 text-sm md:text-base font-semibold text-orange-600 hover:underline"
                  >
                    Dowiedz się więcej →
                  </Link>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );

  return (
    <div className="bg-linear-to-b from-stone-100 to-neutral-200 w-full flex items-center justify-center">
      <section
        ref={sectionRef}
        id="oferta"
        className="py-20 w-[96%] max-w-[1440px] mx-auto overflow-hidden relative"
      >
        {/* ALERT FIXED */}
        {siteAlert && (
          <div className="fixed top-4 inset-x-0 flex justify-center z-[9999] px-4">
            <div className="bg-orange-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center gap-4 animate-fade-in">
              <span>{siteAlert}</span>
              <button
                onClick={() => setSiteAlert(null)}
                className="ml-4 text-white hover:text-black transition"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <h2 className="text-left text-2xl md:text-3xl font-robert-medium font-bold">
          NASZA OFERTA <br />
          NACIŚNIJ I DOWIEDZ SIĘ WIĘCEJ
        </h2>

        {/* Pierwsza karuzela 1–5 */}
        {renderCarousel(firstCarouselItems, 1)}

        {/* Druga karuzela 6–10 */}
        {renderCarousel(secondCarouselItems, 6)}
      </section>
    </div>
  );
};

export default Offer;
