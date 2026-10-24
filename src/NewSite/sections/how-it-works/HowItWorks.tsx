import { MapPin, MessageCircleQuestion, Package } from "lucide-react";
import type { Point } from "../../data/why";
import { useOpenTeam } from "../../hooks/useOpenTeam";
import { RevealLine } from "../../ui/RevealLine";
import { LINE_GAP } from "../../ui/reveal";
import { SplitButton } from "../../ui/SplitButton";
import { IconBox } from "../../ui/IconBox";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { DotGlobe, type GlobeFrame } from "./DotGlobe";

const STEPS: Point[] = [
  {
    icon: MessageCircleQuestion,
    title: "Zapytaj o produkt",
    desc: "Wpisz pytanie albo zadzwoń do handlowca. Wystarczy nazwa, indeks albo opis.",
  },
  {
    icon: Package,
    title: "Ściągamy to, czego potrzebujesz",
    desc: "Nietypowy produkt sprowadzimy od producenta i podamy termin.",
  },
  {
    icon: MapPin,
    title: "Odbierz albo zamów dostawę",
    desc: "Odbiór przy ul. Kwiatkowskiego 17 albo transport prosto na budowę.",
  },
];

const WIDE: GlobeFrame = {
  r: 0.3,
  cx: 0.65,
  top: 0.07,
  plY: 0.4,
  lon: 12,
  dist: 2,
};
const NARROW: GlobeFrame = {
  r: 0.44,
  cx: 0.5,
  top: 0.08,
  plY: 0.44,
  lon: 15,
  dist: 2,
};

export function HowItWorks() {
  const openTeam = useOpenTeam();
  const wide = useMediaQuery("(min-width: 768px)");
  return (
    <section
      id="jak-to-dziala"
      className="bg-gradient-to-b from-white to-neutral-50"
    >
      <div className="maxw pb-14">
        <div className="relative pt-16 md:pt-10">
          <div className="relative z-10 mb-3 md:absolute md:left-0 md:top-[46%] md:mb-0 md:-translate-y-1/2">
            <div
              className="pointer-events-none absolute -left-40 -top-24 -z-10 hidden h-[340px] w-[620px] md:block"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,255,255,.9) 55%, rgba(255,255,255,0))",
              }}
              aria-hidden="true"
            />
            <h2 className="text-[5.2vw] leading-[1.1] tracking-[-0.025em] sm:text-[32px] md:text-[44px] md:leading-[1.08]">
              <RevealLine text="Załatwiamy to, czego" />
              <RevealLine text="inni nie mogą znaleźć" delay={LINE_GAP} />
            </h2>
            <div className="mt-6">
              <SplitButton label="Zadaj pytanie" onClick={openTeam} size="sm" />
            </div>
          </div>
          <DotGlobe
            frame={wide ? WIDE : NARROW}
            className="aspect-[4/3] w-full md:aspect-[1432/640]"
          />
        </div>
        <div className="mt-4 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-10">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="ns-hover md:pt-5">
                <div className="flex items-center gap-3">
                  <IconBox>
                    <Icon strokeWidth={1.5} />
                  </IconBox>
                  <h3 className="text-[17px] tracking-[-0.005em]">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-[1.55] text-neutral-600">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
