"use client";
import { useEffect, useState, useRef } from "react";

export default function Trusted() {
  const logos = [
    { src: "/photos/awex.webp", alt: "Awex logo" },
    { src: "/photos/dehn.webp", alt: "Dehn logo" },
    { src: "/photos/elektro.webp", alt: "Elektroplast logo" },
    { src: "/photos/hager.webp", alt: "Hager logo" },
    { src: "/photos/kanlux.webp", alt: "Kanlux logo" },
    { src: "/photos/koelner.webp", alt: "Koelner logo" },
    { src: "/photos/Kopos.webp", alt: "Kopos logo" },
    { src: "/photos/legrand.webp", alt: "Legrand logo" },
    { src: "/photos/noark.webp", alt: "Noark logo" },
    { src: "/photos/ospel.webp", alt: "Ospel logo" },
    { src: "/photos/wago.webp", alt: "Wago logo" },
    {
      src: "https://cdn.traconelectric.com/o/tracon-liferay-theme/images/tracon_logo.png",
      alt: "tracon logo",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 2) % logos.length);
      }, 5000);
    };

    startAutoplay();
    return () => {
      if (autoplayRef.current !== null) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [logos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentIndex((prev) => (prev + 2) % logos.length);
    }
    if (touchEnd - touchStart > 50) {
      setCurrentIndex((prev) => (prev - 2 + logos.length) % logos.length);
    }

    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % logos.length);
    }, 5000);
  };

  const visibleLogos = [
    logos[currentIndex],
    logos[(currentIndex + 1) % logos.length],
  ];

  return (
    <section className="mt-2">
      <div className="w-[95%] max-w-[1440px] mx-auto flex flex-col items-center  pb-8 sm:p-2">
        <div className="hidden sm:grid grid-cols-2 sm:grid-cols-6 gap-2 w-full">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-32 grayscale-100 hover:grayscale-0 hover:bg-stone-50 rounded-md transition-all duration-200"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                draggable="false"
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
          ))}
        </div>

        <div
          className="sm:hidden w-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-2 gap-2 mb-4">
            {visibleLogos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-32 rounded-md "
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  draggable="false"
                  className="max-w-[80%] max-h-[80%] object-contain"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: Math.ceil(logos.length / 2) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === Math.floor(currentIndex / 2)
                        ? "bg-accent-orange w-4"
                        : "bg-black/20 w-1.5"
                    }`}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
