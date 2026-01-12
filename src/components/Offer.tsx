"use client";
import React, { useEffect, useRef, useState, type Key } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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
  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([null, null]);
  const [visible, setVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollProgress, setScrollProgress] = useState<[number, number]>([
    0, 0,
  ]);
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

  const updateScrollProgress = (index: number) => {
    const container = scrollContainerRefs.current[index];
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 1;
    setScrollProgress((prev) => {
      const next = [...prev] as [number, number];
      next[index] = progress;
      return next;
    });
  };

  const handleScroll = (direction: "left" | "right", index: number) => {
    if (isMobile) return;
    const container = scrollContainerRefs.current[index];
    if (!container) return;

    const scrollAmount = 400;
    const maxScroll = container.scrollWidth - container.clientWidth;

    container.scrollTo({
      left:
        direction === "right"
          ? Math.min(container.scrollLeft + scrollAmount, maxScroll)
          : Math.max(container.scrollLeft - scrollAmount, 0),
      behavior: "smooth",
    });
  };

  const renderCarousel = (
    items: {
      id: Key;
      icon: React.ReactNode;
      label: string;
      description?: string;
    }[],
    carouselIndex: number,
    isLast: boolean
  ) => (
    <div
      className={`
        relative w-full mt-2 py-4
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${isLast ? "rounded-b-4xl" : "rounded-t-4xl"}
      `}
    >
      <div
        ref={(el) => {
          scrollContainerRefs.current[carouselIndex] = el;
        }}
        onScroll={() => updateScrollProgress(carouselIndex)}
        className="
        grid grid-flow-col auto-cols-max gap-3 w-full px-3
  overflow-x-auto scroll-smooth scrollbar-hide
  snap-x snap-mandatory sm:snap-none
  touch-auto
        [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:rounded-md [&::-webkit-scrollbar-thumb]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:hover:bg-accent-orange"
      >
        {items.map((item) => {
          const page = pages.find((p) => p.id === item.id);
          return (
            <div
              key={item.id}
              className="
  aspect-square bg-stone-50 rounded-xl p-6
  border border-black/10 flex-shrink-0
  w-[85vw] sm:w-75
  flex flex-col justify-between
  snap-center snap-always sm:snap-none
              "
            >
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
          );
        })}
      </div>

      {isMobile && (
        <div className="flex justify-center items-center gap-2 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-300 h-1.5 rounded-full ${
                i / 5 <= scrollProgress[carouselIndex]
                  ? "bg-accent-orange w-6"
                  : "bg-black/20 w-2"
              }`}
            />
          ))}
        </div>
      )}

      {!isMobile && (
        <div className="justify-end items-center gap-3 mt-6 hidden sm:flex">
          <button
            onClick={() => handleScroll("left", carouselIndex)}
            className="p-2 border border-black/30 rounded-md hover:bg-black/5 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => handleScroll("right", carouselIndex)}
            className="p-2 border border-black/30 rounded-md hover:bg-black/5 transition"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );

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

        {renderCarousel(firstCarouselItems, 0, false)}
        {renderCarousel(secondCarouselItems, 1, true)}
      </section>
    </div>
  );
};

export default Offer;
