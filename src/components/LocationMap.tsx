"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { ArrowUpRight, Locate, Map as MapIcon } from "lucide-react";
import {
  Map,
  MapMarker,
  MapControls,
  MarkerContent,
  type MapRef,
} from "@/components/ui/map";
import ImageCarousel from "./ImageCarousel";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const COORDS = {
  lat: 51.0679167,
  lng: 16.9576667,
};

const LocationMap = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const [isDetailedMap, setIsDetailedMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleShowLocation = useCallback(() => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: [COORDS.lng, COORDS.lat],
      zoom: 15,
      duration: 1500,
    });
  }, []);

  const handleToggleMapStyle = useCallback(() => {
    if (!mapRef.current) return;

    setIsDetailedMap((prev) => {
      const newStyle = prev
        ? "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        : "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

      mapRef.current?.setStyle(newStyle, { diff: true });
      return !prev;
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);



  useLayoutEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current!, {
        type: "words",
        wordsClass: "word",
        ignore: ".no-split",
      });

      gsap.set(split.words, {
        color: "rgba(0,0,0,0.1)",
      });

      gsap.to(split.words, {
        color: "rgba(0,0,0,1)",
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          end: "bottom 50%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <section
        ref={sectionRef}
        id="lokalizacja"
        className="relative w-full bg-white overflow-hidden"
      >
        <div className="mx-auto max-w-[1200px] w-[95%] py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] gap-4">
            <div className="relative h-[50vh] lg:h-full rounded-xl overflow-hidden border border-zinc-200 order-2 md:order-1 z-30">
              <button
                onClick={handleToggleMapStyle}
                className="absolute top-2 right-2 z-20 bg-white rounded-md px-3 py-2 shadow-lg border border-zinc-200 hover:bg-zinc-50 transition flex items-center gap-2 text-sm font-poppins tracking-tight text-black cursor-pointer"
                aria-label={isDetailedMap ? "Pokaż mapę uproszczoną" : "Pokaż mapę szczegółową"}
              >
                <MapIcon className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isDetailedMap ? "Uproszczona" : "Szczegółowa"}
                </span>
              </button>

              <Map
                ref={mapRef}
                center={[COORDS.lng, COORDS.lat]}
                zoom={10}
                projection={{ type: "globe" }}
                cooperativeGestures={true}
                styles={{
                  light:
                    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
                  dark:
                    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
                }}
              >
                {!isMobile && <MapControls showZoom />}

                <MapMarker longitude={COORDS.lng} latitude={COORDS.lat}>
                  <MarkerContent>
                    <div className="group relative w-3 h-3 cursor-pointer">
                      <span className="absolute inset-0 rounded-full bg-accent-orange animate-ripple" />
                      <span className="absolute inset-0 rounded-full bg-accent-orange" />

                      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-3 py-1 text-xs font-medium text-black opacity-0 shadow-lg transition group-hover:opacity-100">
                        Siedziba Brados
                      </div>
                    </div>
                  </MarkerContent>
                </MapMarker>
              </Map>

              <div className="absolute bottom-2 left-2 z-10 flex flex-col gap-2">
                <button
                  onClick={handleShowLocation}
                  className="bg-white rounded-md px-4 py-3.5 shadow-lg border border-zinc-200 hover:bg-zinc-50 transition flex items-center gap-2 text-sm font-poppins tracking-tight text-black cursor-pointer"
                >
                  <Locate className="w-4 h-4" />
                  Pokaż lokalizację
                </button>

                <a
                  href="https://maps.app.goo.gl/RMxpxoWFV8upiwmM7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-zinc-200 hover:bg-zinc-50 bg-white rounded-md pl-4 pr-1.5 shadow-lg transition font-poppins tracking-tight"
                >
                  <div className="flex w-full items-center justify-center text-black py-3.5 text-sm">
                    Prowadź do firmy
                  </div>

                  <div className="bg-accent-orange text-white p-2 mr-0.5 rounded-md flex justify-center items-center transition">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45" />
                  </div>
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-between order-1 md:order-2">
              <h2
                ref={textRef}
                className="text-xl leading-tight tracking-tight max-w-xl mt-1 font-poppins text-black mb-6"
              >
                Jesteśmy{" "}
                <span className="no-split text-accent-orange">liderem w branży</span>{" "}
                , dostarczając sprawdzone
                rozwiązania, skalę dostępności i niezawodność, na której opiera się
                biznes naszych partnerów.
              </h2>
              <ImageCarousel images={["photos/firma.webp", "photos/firma.webp", "photos/firma.webp"]} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationMap;
