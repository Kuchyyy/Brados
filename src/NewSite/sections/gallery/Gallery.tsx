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
      <div className="maxw flex items-end justify-between gap-6">
        <h2 className="text-[5.2vw] leading-[1.1] tracking-[-0.025em] sm:text-[32px] sm:leading-[1.2]">
          <RevealLine text="Zobacz, jak wygląda nasza" />
          <RevealLine text="hurtownia od środka" delay={LINE_GAP} />
        </h2>
        <div className="-mr-2 flex shrink-0 items-center gap-1">
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
      <div className="relative mx-auto mt-8 aspect-[16/10] w-[90%] [--g:8px] sm:aspect-[16/9] md:mt-10 md:w-[min(820px,55vw)] md:[--g:16px]">
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
              <span className="absolute inset-0 bg-black/30 [background-image:linear-gradient(to_top,rgb(0_0_0/0.55),transparent_60%)]" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-left text-[5vw] font-normal leading-[1.05] tracking-[-0.035em] text-white sm:p-6 sm:text-[min(2vw,28px)] md:p-7">
                {s.title.split("\n").map((line, l) => (
                  <span key={l} className="block">
                    <span
                      className={cn(
                        "block transition-[transform,opacity] ease-[cubic-bezier(.23,1,.32,1)]",
                        off === 0
                          ? "translate-y-0 opacity-100 duration-[900ms]"
                          : "translate-y-3 opacity-0 duration-300",
                      )}
                      style={{ transitionDelay: off === 0 ? `${350 + l * 90}ms` : "0ms" }}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
