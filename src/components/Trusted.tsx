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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [renderIndex, setRenderIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "pre-in" | "in">("idle");
  const [touchStart, setTouchStart] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const visibleLogos = [
    logos[renderIndex],
    logos[(renderIndex + 1) % logos.length],
  ];

  const changeIndex = (nextIndex: number) => {
    if (phase !== "idle") return;

    setPhase("out");

    setTimeout(() => {
      setRenderIndex(nextIndex);
      setPhase("pre-in");
    }, 350);

    setTimeout(() => {
      setPhase("in");
    }, 380);

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setPhase("idle");
    }, 800);
  };

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      changeIndex((currentIndex + 2) % logos.length);
    }, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;

    if (touchStart - touchEnd > 50) {
      changeIndex((currentIndex + 2) % logos.length);
    }

    if (touchEnd - touchStart > 50) {
      changeIndex((currentIndex - 2 + logos.length) % logos.length);
    }
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
          className="sm:hidden w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-2 gap-2 mb-4">
            {visibleLogos.map((logo) => (
              <div
                key={logo.src}
                className={`flex items-center justify-center h-32  transition-all duration-300 ease-out
                  ${phase === "out"
                    ? "opacity-0 -translate-y-8"
                    : phase === "pre-in"
                      ? "opacity-0 translate-y-8"
                      : phase === "in"
                        ? "opacity-100 translate-y-0"
                        : "opacity-100 translate-y-0"
                  }
                `}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  draggable="false"
                  className={`max-w-[80%] max-h-[80%] object-contain transition-all duration-300 ease-out
                    ${phase === "out"
                      ? "opacity-0 -translate-y-4"
                      : phase === "pre-in"
                        ? "opacity-0 translate-y-4"
                        : phase === "in"
                          ? "opacity-100 translate-y-0"
                          : "opacity-100 translate-y-0"
                    }
                  `}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
