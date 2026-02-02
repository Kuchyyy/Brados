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
      alt: "Tracon logo",
    },
  ];

  const logosPerPage = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const visibleLogos = Array.from({ length: logosPerPage }, (_, index) => {
    return logos[(currentIndex + index) % logos.length];
  });

  const isAnimating = isFadingOut || isFadingIn;
  const largerLogos = new Set(["Wago logo", "Awex logo", "Hager logo"]);

  const goToNext = () => {
    if (isAnimating) return;

    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + logosPerPage) % logos.length);
      setIsFadingOut(false);
      setIsFadingIn(true);
      setTimeout(() => {
        setIsFadingIn(false);
      }, 200);
    }, 200);
  };

  const goToPrev = () => {
    if (isAnimating) return;

    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - logosPerPage + logos.length) % logos.length
      );
      setIsFadingOut(false);
      setIsFadingIn(true);
      setTimeout(() => {
        setIsFadingIn(false);
      }, 200);
    }, 200);
  };

  useEffect(() => {
    autoplayRef.current = setInterval(goToNext, 5000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(goToNext, 5000);
  };

  return (
    <section className="mt-2">
      <div className="w-[95%] max-w-[1200px] mx-auto flex flex-col items-center pb-8 sm:p-2">
        <div className="hidden sm:grid grid-cols-2 sm:grid-cols-6 gap-2 w-full">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-32 grayscale hover:grayscale-0 hover:bg-stone-50 rounded-md transition-all duration-200"
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
          <div className="grid grid-cols-2 gap-2">
            {visibleLogos.map((logo, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className="flex items-center justify-center h-24 bg-white border border-black/10 rounded-md"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  draggable="false"
                  className={`object-contain transition-opacity duration-200 ease-out ${isFadingOut ? "opacity-0" : "opacity-100"} ${largerLogos.has(logo.alt) ? "max-w-[100%] max-h-[90%]" : "max-w-[80%] max-h-[70%]"
                    }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
