"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Ripple } from "./ui/shadcn-io/ripple";
import Numbers from "./Numbers";

type AboutTileData = {
  id: string;
  title: string;
  desc: string;
  variant: "elsigma" | "mission" | "stats";
};

const tiles: AboutTileData[] = [
  {
    id: "1",
    title: "El-Sigma",
    desc: "Współpraca z największą siecią dystrybucji materiałów elektrotechnicznych w Polsce.",
    variant: "elsigma",
  },
  {
    id: "2",
    title: "Nasza Misja",
    desc: "Dostarczamy rozwiązania, które wspierają codzienną pracę naszych klientów.",
    variant: "mission",
  },
  {
    id: "3",
    title: "Liczby Brados",
    desc: "Twoja satysfakcja to nasz priorytet.",
    variant: "stats",
  },
];

const tileShell =
  "tile-surface group relative block min-h-[430px] w-[340px] shrink-0 overflow-hidden lg:w-auto lg:min-h-[520px]";

function ElSigmaTile({ title, desc }: { title: string; desc: string }) {
  return (
    <article className={tileShell}>
      <div className="flex h-full min-h-[430px] flex-col justify-between p-4 sm:p-5 lg:min-h-[520px]">
        <div>
          <h3 className="text-xl font-geist leading-[1.06] tracking-tight text-blackk">
            {title}
          </h3>
          <p className="mt-3 text-sm font-geist leading-tight text-blackk/70">
            {desc}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <img
            src="/photos/logo-elsigma.webp"
            alt="Logo El-Sigma"
            className="pointer-events-none w-full select-none object-contain "
          />
        </div>
      </div>
    </article>
  );
}

function MissionTile({ title, desc }: { title: string; desc: string }) {
  return (
    <article className={`${tileShell}`}>
      <Ripple className="z-0 opacity-40" />
      <img
        src="/photos/logo3d.webp"
        alt="Logo Brados"
        className="absolute top-1/2 left-1/2 z-[1] w-24 -translate-x-1/2 -translate-y-1/2 sm:w-38"
      />
      <div className="relative z-10 flex h-full min-h-[430px] flex-col justify-end p-4 sm:p-5 lg:min-h-[520px]">
        <div className="max-w-sm">
          <h3 className="text-xl font-geist leading-[1.06] tracking-tight text-blackk">
            {title}
          </h3>
          <p className="mt-3 text-sm font-geist  leading-tight text-blackk/70">
            {desc}
          </p>
        </div>
      </div>
    </article>
  );
}

function StatsTile({ children }: { children: ReactNode }) {
  return (
    <article className={`${tileShell} `}>
      <div className="relative z-10 flex h-full min-h-[430px] flex-col items-start justify-start p-4 sm:p-5 lg:min-h-[520px]">
        {children}
      </div>
    </article>
  );
}

const About = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTiles = useCallback((direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;

    const firstTile = container.querySelector<HTMLElement>("[data-about-tile]");
    const gap = 4;
    const step = firstTile
      ? firstTile.offsetWidth + gap
      : container.clientWidth * 0.9;

    container.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  }, []);

  return (
    <section id="about" className="w-full bg-white py-8 font-geist md:py-12">
      <div className="maxw flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-x-5 md:gap-y-8">
          <div className="hidden md:block md:col-start-1 md:row-start-1" aria-hidden />

          <h2 className="heading-h2 flex flex-col justify-between py-8 md:col-span-3 md:col-start-2 md:row-start-1 md:mb-0 md:py-20">
            <span className="text-blackk">Poznaj naszą firmę.</span>{" "}
            <span className="text-blackk/45">
              Dlaczego warto wybrać właśnie nas
            </span>
          </h2>

          <aside className="flex flex-col gap-4 md:col-start-1 md:row-start-2 md:self-start md:pr-4">
            <div>
              <h3 className="heading-h3 text-blackk">
                Zaplecze dla Twoich projektów
              </h3>
              <p className="mt-3 text-sm font-inter font-normal leading-relaxed tracking-tight text-blackk/65">
                Łączymy sprawdzoną dystrybucję z doradztwem na każdym etapie
                projektu.
              </p>
            </div>
          </aside>

          <div className="mt-3 flex justify-start gap-1 md:hidden">
            <button
              type="button"
              onClick={() => scrollTiles("prev")}
              className="flex size-10 items-center justify-center rounded-sm border border-blackk/15 bg-neutral-100 text-blackk transition"
              aria-label="Poprzedni kafelek"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollTiles("next")}
              className="flex size-10 items-center justify-center rounded-sm border border-blackk/15 bg-neutral-100 text-blackk transition"
              aria-label="Następny kafelek"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>

          <div className="md:col-span-3 md:col-start-2 md:row-start-2 md:grid md:grid-cols-2 md:gap-x-1 md:gap-y-3 xl:grid-cols-3">
            <div
              ref={scrollRef}
              className="flex snap-x snap-mandatory gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:contents md:overflow-visible"
            >
              {tiles.map((tile) => (
                <div
                  key={tile.id}
                  data-about-tile
                  className="shrink-0 snap-start md:shrink"
                >
                  {tile.variant === "elsigma" && (
                    <ElSigmaTile title={tile.title} desc={tile.desc} />
                  )}
                  {tile.variant === "mission" && (
                    <MissionTile title={tile.title} desc={tile.desc} />
                  )}
                  {tile.variant === "stats" && (
                    <StatsTile>
                      <Numbers />
                    </StatsTile>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
