import { useEffect, useRef, useState } from "react";
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
import { Img } from "../../ui/Img";
import { GALLERY_WIDTHS, photo, photoSet } from "../../ui/responsive";

const SLIDES = [
  {
    stem: "biuro-gora",
    title: "Handlowcy, którzy znają branżę",
  },
  { stem: "3", title: "Tysiące produktów od ręki" },
  { stem: "magazyn", title: "Własny magazyn na miejscu" },
  { stem: "4", title: "Odbiór osobisty bez czekania" },
  { stem: "5", title: "Nowa siedziba" },
];

const ARROW =
  "static size-9 translate-x-0 translate-y-0 rounded-xs border-0 bg-transparent text-neutral-600 shadow-none hover:bg-neutral-100 hover:text-black disabled:opacity-100 [&_svg]:size-[18px] [&_svg]:stroke-[1.5]";

const INSET = 9;
const BLUR = 2;

export function Gallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const frames = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!api) return;
    const on = () => setActive(api.selectedScrollSnap());
    const tween = () => {
      const engine = api.internalEngine();
      const progress = api.scrollProgress();
      const snaps = api.scrollSnapList();
      snaps.forEach((snap, i) => {
        let diff = snap - progress;
        engine.slideLooper.loopPoints.forEach((point) => {
          const target = point.target();
          if (point.index !== i || target === 0) return;
          diff =
            Math.sign(target) === -1
              ? snap - (1 + progress)
              : snap + (1 - progress);
        });
        const t = Math.min(1, Math.abs(diff * snaps.length));
        const el = frames.current[i];
        if (!el) return;
        el.style.clipPath = `inset(${(t * INSET).toFixed(2)}% 0 round 2px)`;
        el.style.setProperty("--blur", `${(t * BLUR).toFixed(2)}px`);
      });
    };
    on();
    tween();
    api.on("select", on).on("scroll", tween).on("reInit", tween);
    return () => {
      api.off("select", on).off("scroll", tween).off("reInit", tween);
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
              key={s.stem}
              onClick={() => i !== active && api?.scrollTo(i)}
              className={cn(
                "basis-[90%] pl-2 sm:basis-[90%] md:basis-[min(1016px,calc(66vw+16px))] md:pl-4",
                i !== active && "cursor-pointer",
              )}
            >
              <div
                ref={(el) => {
                  frames.current[i] = el;
                }}
                className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]"
              >
                <Img
                  src={photo(s.stem, 1024)}
                  srcSet={photoSet(s.stem, GALLERY_WIDTHS)}
                  sizes="(min-width: 768px) min(1000px, 66vw), 90vw"
                  loading="lazy"
                  decoding="async"
                  alt=""
                  className="absolute -left-1 -top-1 h-[calc(100%+8px)] w-[calc(100%+8px)] max-w-none object-cover [filter:blur(var(--blur,0px))]"
                />
                <span className="absolute inset-0 [background-image:linear-gradient(to_top,rgb(0_0_0/0.6),rgb(0_0_0/0.15)_45%,rgb(0_0_0/0.05))]" />
                <h3
                  className={cn(
                    "absolute bottom-0 left-0 p-4 text-[17px] leading-[1.2] tracking-[-0.02em] text-white transition-opacity ease-[cubic-bezier(.23,1,.32,1)] sm:p-6 sm:text-[22px] md:p-8 md:text-[26px]",
                    i === active
                      ? "opacity-100 delay-300 duration-[800ms]"
                      : "opacity-0 duration-200",
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
