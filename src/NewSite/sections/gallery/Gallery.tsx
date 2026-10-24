import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RevealLine } from "../../ui/RevealLine";
import { LINE_GAP } from "../../ui/reveal";

const SLIDES = [
  { src: "/photos/3.webp", tag: "Asortyment", title: "Tysiące produktów od ręki", desc: "Większość zamówień kompletujemy z półki, bez czekania na dostawę" },
  { src: "/photos/magazyn.webp", tag: "Magazyn", title: "Własny magazyn na miejscu", desc: "Kable, osprzęt i aparatura gotowe do wydania jeszcze tego samego dnia" },
  { src: "/photos/nowa/biuro-gora.webp", tag: "Zespół", title: "Handlowcy, którzy znają branżę", desc: "Doradzimy przy doborze i przygotujemy ofertę pod Twoją inwestycję" },
  { src: "/photos/4.webp", tag: "Odbiór", title: "Odbiór osobisty bez czekania", desc: "Zamawiasz telefonicznie lub mailowo, odbierasz gotowe zamówienie" },
  { src: "/photos/5.webp", tag: "Doświadczenie", title: "25 lat we Wrocławiu", desc: "Od ćwierć wieku zaopatrujemy instalatorów i firmy wykonawcze" },
];

const N = SLIDES.length;
const offsetOf = (i: number, active: number) => ((i - active + N + 2) % N) - 2;

export function Gallery() {
  const [[active, last], setState] = useState([0, 0]);
  const go = (d: number) => setState(([a]) => [(a + d + N) % N, a]);

  return (
    <section className="overflow-hidden pt-16 md:pt-24">
      <div className="maxw flex flex-col items-center gap-5 text-center md:gap-6">
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
              aria-label={off === 0 ? s.title : `Pokaż: ${s.title}`}
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
              <span className="absolute inset-0 [background-image:linear-gradient(to_top,rgb(0_0_0/0.72),rgb(0_0_0/0.25)_45%,rgb(0_0_0/0.08))]" />
              <span className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4 text-left text-white sm:p-6 md:p-8">
                {[
                  <span key="t" className="ns-mono flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-neutral-300 sm:text-[11px]">
                    <span className="size-1.5 bg-[#EA6100]" />
                    {s.tag}
                  </span>,
                  <span key="h" className="mt-2 text-[17px] leading-[1.2] tracking-[-0.02em] sm:mt-3 sm:text-[22px] md:text-[26px]">
                    {s.title}
                  </span>,
                  <span key="d" className="mt-1.5 hidden max-w-[40ch] text-balance text-sm leading-[1.45] text-neutral-300 sm:block">
                    {s.desc}
                  </span>,
                ].map((el, l) => (
                  <span
                    key={l}
                    className={cn(
                      "block transition-[transform,opacity,filter] ease-[cubic-bezier(.23,1,.32,1)]",
                      off === 0
                        ? "translate-y-0 opacity-100 blur-0 duration-[800ms]"
                        : "translate-y-2 opacity-0 blur-[2px] duration-200",
                    )}
                    style={{ transitionDelay: off === 0 ? `${300 + l * 80}ms` : "0ms" }}
                  >
                    {el}
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
