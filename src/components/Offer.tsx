'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Settings,
  Wifi,
  Box,
  Plug,
  Lightbulb,
  Antenna,
  Zap,
  Circle,
} from 'lucide-react';

const firstCarouselItems = [
  { icon: <Settings />, label: 'Aparatura modułowa i sterowanie', description: 'Sterowniki, moduły i automatyka' },
  { icon: <Wifi />, label: 'Narzędzia i mierniki', description: 'Multimetry, testery i akcesoria' },
  { icon: <Zap />, label: 'Sieci niskoprądowe i okablowanie strukturalne', description: 'Instalacje i przewody' },
  { icon: <Box />, label: 'Rozdzielnice i obudowy', description: 'Bezpieczne obudowy dla instalacji' },
  { icon: <Plug />, label: 'Osprzęt elektroinstalacyjny i siłowy', description: 'Gniazda, wyłączniki i złącza' },
];

const secondCarouselItems = [
  { icon: <Lightbulb />, label: 'Technika świetlna', description: 'Lampy, oprawy i oświetlenie LED' },
  { icon: <Antenna />, label: 'System tras i mocowania', description: 'Kanały, koryta i uchwyty' },
  { icon: <Plug />, label: 'Kable i przewody', description: 'Przewody energetyczne i sygnałowe' },
  { icon: <Zap />, label: 'Ochrona odgromowa', description: 'Systemy ochrony przed wyładowaniami' },
  { icon: <Circle />, label: 'Pozostałe', description: 'Dodatkowe akcesoria i komponenty' },
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

  // automatyczne zamykanie komunikatu po 4s
  useEffect(() => {
    if (!siteAlert) return;
    const timer = setTimeout(() => setSiteAlert(null), 2000);
    return () => clearTimeout(timer);
  }, [siteAlert]);

  const handleLearnMore = (label: string) => {
    setSiteAlert(`Sekcja "${label}" pojawi się wkrótce  🚧`);
  };

  const renderCarousel = (
    items: { icon: React.ReactNode; label: string; description?: string }[],
    startIndex: number
  ) => (
    <div
      className={`
        relative w-full max-w-[100%] mx-auto mt-6
        transform transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <Carousel
        opts={{
          loop: true,
          align: 'start',
          skipSnaps: false,
          containScroll: 'keepSnaps',
        }}
        className="w-full"
      >
        <div className="absolute right-20 top-[20px] flex items-center gap-2 z-10">
          <span className="text-sm font-medium">Przesuń</span>
          <CarouselPrevious className="p-2 bg-white rounded-full">
            <ArrowLeft />
          </CarouselPrevious>
          <CarouselNext className="p-2 bg-white rounded-full">
            <ArrowRight />
          </CarouselNext>
        </div>

        <CarouselContent className="flex gap-4 px-4 overflow-visible">
          {items.map((item, index) => (
           <CarouselItem
           key={index}
           className="
             flex flex-col justify-between aspect-square bg-white rounded-lg p-4 relative
              sm:basis-1/2 md:basis-1/3 lg:basis-1/4 
           "
         >
         
          
              {/* Ikona */}
              <div className="absolute top-6 left-6 text-orange-600">{item.icon}</div>

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

              {/* Przycisk */}
              <button
                onClick={() => handleLearnMore(item.label)}
                className="absolute bottom-4 right-4 text-sm md:text-base font-semibold text-orange-600 hover:underline"
              >
                Dowiedz się więcej →
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="oferta"
      className="py-12 bg-stone-100 max-w-[96%] mx-auto overflow-hidden relative"
    >
      {/* ALERT FIXED */}
      {siteAlert && (
        <div className="fixed top-4 inset-x-0 flex justify-center z-[9999] px-4">
          <div className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 animate-fade-in">
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
        NASZA OFERTA <br />NACIŚNIJ I DOWIEDZ SIĘ WIĘCEJ
      </h2>

      {/* Pierwsza karuzela 1–5 */}
      {renderCarousel(firstCarouselItems, 1)}

      {/* Druga karuzela 6–10 */}
      {renderCarousel(secondCarouselItems, 6)}
    </section>
  );
};

export default Offer;
