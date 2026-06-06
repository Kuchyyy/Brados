"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { ArrowUpRight, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Map,
  MapMarker,
  MapControls,
  MarkerContent,
  type MapRef,
} from "@/components/ui/map";
import { cn } from "@/lib/utils";

const COORDS = {
  lat: 51.0679167,
  lng: 16.9576667,
};

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/dir//Brados,+Kwiatkowskiego+17,+52-326+Wroc%C5%82aw/@51.0680508,16.9550066,17z/data=!4m16!1m7!3m6!1s0x470fc2e855555555:0x51d44f2bef0f3100!2sBrados!8m2!3d51.0680475!4d16.9575815!16s%2Fg%2F11gf3p5wqp!4m7!1m0!1m5!1m1!1s0x470fc2e855555555:0x51d44f2bef0f3100!2m2!1d16.9575815!2d51.0680475?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D";

function GoogleMapsButton({ className = "" }: { className?: string }) {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "group h-11 w-full justify-between rounded-sm border-blackk/12 bg-neutral-100 px-4 font-geist text-sm font-normal tracking-tight text-blackk shadow-none hover:border-blackk/25 hover:bg-neutral-100",
        className
      )}
    >
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Google Maps
        <ArrowUpRight
          className="size-3.5 text-blackk/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange"
          strokeWidth={1.5}
        />
      </a>
    </Button>
  );
}

function LocationDetails() {
  return (
    <div>
      <h3 className="heading-h3 text-blackk">Lider w branży</h3>
      <p className="mt-3 text-sm font-inter font-normal leading-relaxed tracking-tight text-blackk/65">
        Dostarczamy sprawdzone rozwiązania, skalę dostępności i niezawodność,
        na której opiera się biznes naszych partnerów.
      </p>

      <div className="mt-6 border-t border-blackk/10 pt-6">
        <dl className="flex flex-col gap-4 text-sm">
          <div className="flex items-start justify-between gap-4">
            <dt className="shrink-0 text-blackk/45">Adres</dt>
            <dd className="text-right leading-snug text-blackk">
              ul. Eugeniusza Kwiatkowskiego 17
              <br />
              52-326 Wrocław
            </dd>
          </div>
          <div className="flex items-start justify-between gap-4">
            <dt className="shrink-0 text-blackk/45">Godziny</dt>
            <dd className="text-right leading-snug text-blackk">
              Poniedziałek – Piątek
              <br />
              07:30–16:00
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

const LocationMap = () => {
  const mapRef = useRef<MapRef | null>(null);
  const [isDetailedMap, setIsDetailedMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const mapBlock = (
    <div className="relative h-[50vh] overflow-hidden rounded-sm border border-blackk/10 md:h-[65vh]">
      <button
        type="button"
        onClick={handleToggleMapStyle}
        className="absolute top-2 right-2 z-20 flex cursor-pointer items-center gap-2 rounded-sm border border-blackk/15 bg-white px-3 py-2 text-sm tracking-tight text-blackk transition hover:bg-neutral-50"
        aria-label={
          isDetailedMap ? "Pokaż mapę uproszczoną" : "Pokaż mapę szczegółową"
        }
      >
        <MapIcon className="h-4 w-4" />
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
            <div className="group relative h-3 w-3 cursor-pointer">
              <span className="absolute inset-0 rounded-full bg-accent-orange animate-ripple" />
              <span className="absolute inset-0 rounded-full bg-accent-orange" />

              <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-blackk/10 bg-white px-3 py-1 text-xs font-medium text-blackk opacity-0 shadow-lg transition group-hover:opacity-100">
                Siedziba Brados
              </div>
            </div>
          </MarkerContent>
        </MapMarker>
      </Map>
    </div>
  );

  return (
    <section
      id="lokalizacja"
      className="w-full bg-white font-geist py-8 md:py-12"
    >
      <div className="maxw">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4 md:items-stretch md:gap-x-5 md:gap-y-8">
          <h2 className="heading-h2 py-8 md:col-span-3 md:col-start-2 md:row-start-1 md:py-20">
            Znajdź nas we Wrocławiu.
            <span className="text-blackk/45">
              {" "}
              Siedziba hurtowni i magazyn pod jednym adresem.
            </span>
          </h2>

          <aside className="flex flex-col gap-6 md:col-start-1 md:row-start-2 md:justify-between md:pr-4">
            <LocationDetails />
            <GoogleMapsButton className="hidden md:inline-flex" />
          </aside>

          <div className="md:col-span-3 md:col-start-2 md:row-start-2">
            {mapBlock}
          </div>

          <div className="-mt-3 md:hidden">
            <GoogleMapsButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
