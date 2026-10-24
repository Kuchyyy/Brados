import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RevealLine } from "../../ui/RevealLine";
import { LINE_GAP } from "../../ui/reveal";

const SLIDES = [
  { src: "/photos/3.webp", title: "Tysiące produktów\nod ręki" },
  { src: "/photos/magazyn.webp", title: "Własny magazyn\nna miejscu" },
  { src: "/photos/nowa/biuro-gora.webp", title: "Handlowcy, którzy\nznają branżę" },
  { src: "/photos/4.webp", title: "Odbiór osobisty\nbez czekania" },
  { src: "/photos/5.webp", title: "25 lat\nwe Wrocławiu" },
];

const N = SLIDES.length;
const offsetOf = (i: number, active: number) => ((i - active + N + 2) % N) - 2;

export function Gallery() {
  const [[active, last], setState] = useState([0, 0]);
  const go = (d: number) => setState(([a]) => [(a + d + N) % N, a]);

  return (
    <section className="overflow-hidden pt-16 md:pt-24">
      <div className="maxw flex flex-col items-center gap-5 text-center md:gap-7">
        <h2 className="text-[5.2vw] leading-[1.1] tracking-[-0.025em] sm:text-[32px] sm:leading-[1.2]">
          <RevealLine text="Zobacz, jak wygląda nasza" />
          <RevealLine text="hurtownia od środka" delay={LINE_GAP} />
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Poprzednie zdjęcie"
            onClick={() => go(-1)}
            className="grid size-9 place-items-center rounded-xs text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black"
          >
            <ArrowLeft className="size-[18px]" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Następne zdjęcie"
            onClick={() => go(1)}
            className="grid size-9 place-items-center rounded-xs text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black"
          >
            <ArrowRight className="size-[18px]" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="relative mt-8 aspect-[16/10] w-[84vw] [--g:12px] [margin-inline:auto] sm:aspect-[16/9] md:mt-10 md:w-[min(1100px,78vw)] md:[--g:24px]">
        {SLIDES.map((s, i) => {
          const off = offsetOf(i, active);
          const jump = Math.abs(off - offsetOf(i, last)) > 1;
          return (
            <button
              key={s.src}
              type="button"
              tabIndex={off === 0 ? -1 : 0}
              aria-hidden={Math.abs(off) > 1}
              aria-label={off === 0 ? s.title.replace("\n", " ") : `Pokaż: ${s.title.replace("\n", " ")}`}
              onClick={() => off !== 0 && go(off)}
              style={{ transform: `translateX(calc(${off} * (100% + var(--g))))` }}
              className={cn(
                "absolute inset-0 overflow-hidden rounded-xs",
                off === 0 ? "cursor-default" : "cursor-pointer",
                !jump && "transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]",
              )}
            >
              <img
                src={s.src}
                alt=""
                loading={Math.abs(off) <= 1 ? "eager" : "lazy"}
                className="absolute inset-0 size-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/30" />
              <span
                className={cn(
                  "absolute inset-0 grid place-items-center whitespace-pre-line px-6 text-center text-[7.5vw] font-medium leading-[1.02] tracking-[-0.04em] text-white transition-opacity duration-500 sm:text-[min(6vw,80px)]",
                  off === 0 ? "opacity-100 delay-200" : "opacity-0",
                )}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
