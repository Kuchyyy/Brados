import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { RevealLine } from "../../ui/RevealLine";
import { LINE_GAP } from "../../ui/reveal";

const SLIDES = [
  { src: "/photos/3.webp", title: "Tysiące produktów od ręki" },
  { src: "/photos/magazyn.webp", title: "Własny magazyn na miejscu" },
  {
    src: "/photos/nowa/biuro-gora.webp",
    title: "Handlowcy, którzy znają branżę",
  },
  { src: "/photos/4.webp", title: "Odbiór osobisty bez czekania" },
  { src: "/photos/5.webp", title: "Nowa siedziba" },
];

const ARROW =
  "static size-9 translate-x-0 translate-y-0 rounded-xs border-0 bg-transparent text-neutral-600 shadow-none hover:bg-neutral-100 hover:text-black disabled:opacity-100 [&_svg]:size-[18px] [&_svg]:stroke-[1.5]";

export function Gallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!api) return;
    const on = () => setActive(api.selectedScrollSnap());
    on();
    api.on("select", on);
    return () => {
      api.off("select", on);
    };
  }, [api]);

  return (
    <section className="pt-16 md:pt-24">
      <Carousel opts={{ loop: true, align: "center" }} setApi={setApi}>
        <div className="maxw flex flex-col items-center gap-5 text-center md:gap-6">
          <h2 className="text-[5.2vw] leading-[1.1] tracking-[-0.025em] sm:text-[32px] sm:leading-[1.2]">
            <RevealLine text="Zobacz, jak wygląda nasza" />
            <RevealLine text="hurtownia od środka" delay={LINE_GAP} />
          </h2>
          <div className="flex items-center gap-1">
            <CarouselPrevious
              variant="ghost"
              aria-label="Poprzednie zdjęcie"
              className={ARROW}
            />
            <CarouselNext
              variant="ghost"
              aria-label="Następne zdjęcie"
              className={ARROW}
            />
          </div>
        </div>
        <CarouselContent className="mt-8 -ml-2 gap-0 md:mt-10 md:-ml-4">
          {SLIDES.map((s, i) => (
            <CarouselItem
              key={s.src}
              onClick={() => i !== active && api?.scrollTo(i)}
              className={cn(
                "basis-[90%] pl-2 sm:basis-[90%] md:basis-[min(836px,calc(55vw+16px))] md:pl-4",
                i !== active && "cursor-pointer",
              )}
            >
              <div
                className={cn(
                  "relative aspect-[16/10] overflow-hidden transition-[clip-path] duration-700 ease-[cubic-bezier(.65,0,.35,1)] sm:aspect-[16/9]",
                  i === active
                    ? "[clip-path:inset(0_round_2px)]"
                    : "[clip-path:inset(9%_0_round_2px)]",
                )}
              >
                <img
                  src={s.src}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
                <span className="absolute inset-0 [background-image:linear-gradient(to_top,rgb(0_0_0/0.6),rgb(0_0_0/0.15)_45%,rgb(0_0_0/0.05))]" />
                <h3
                  className={cn(
                    "absolute bottom-0 left-0 p-4 text-[17px] leading-[1.2] tracking-[-0.02em] text-white transition-[transform,opacity,filter] ease-[cubic-bezier(.23,1,.32,1)] sm:p-6 sm:text-[22px] md:p-8 md:text-[26px]",
                    i === active
                      ? "translate-y-0 opacity-100 blur-0 delay-300 duration-[800ms]"
                      : "translate-y-2 opacity-0 blur-[2px] duration-200",
                  )}
                >
                  {s.title}
                </h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
