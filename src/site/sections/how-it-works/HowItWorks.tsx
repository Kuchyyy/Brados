import { lazy, Suspense, useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { MapPin, MessageCircleQuestion, Package } from "lucide-react";
import type { Point } from "../../data/why";
import { useOpenTeam } from "../../hooks/useOpenTeam";
import { RevealLine } from "../../ui/RevealLine";
import { SplitButton } from "../../ui/SplitButton";
import { IconBox } from "../../ui/IconBox";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { LINE_GAP } from "../../ui/reveal";
import type { GlobeFrame } from "./DotGlobe";

const DotGlobe = lazy(() => import("./DotGlobe").then((m) => ({ default: m.DotGlobe })));

const STEPS: Point[] = [
  {
    icon: MessageCircleQuestion,
    title: "Zapytaj o produkt",
    desc: "Zadzwoń do handlowca. Wystarczy najmniejszy szczegół.",
  },
  {
    icon: Package,
    title: "Ściągamy to, czego potrzebujesz",
    desc: "Nietypowe zamówimy u producenta.",
  },
  {
    icon: MapPin,
    title: "Odbierz albo zamów dostawę",
    desc: "Odbiór albo transport prosto na budowę.",
  },
];

const EXPO = "cubic-bezier(.16,1,.3,1)";
const SMOOTH = "cubic-bezier(.65,0,.35,1)";

type Pose = { x?: number; y?: number; blur?: number; o?: number };

function motion({ x = 0, y = 0, blur = 0, o = 1 }: Pose, enter: boolean, delay = 0): CSSProperties {
  return {
    transform: `translate3d(${x}em, ${y}em, 0)`,
    filter: `blur(${blur}px)`,
    opacity: o,
    transition: enter
      ? `transform 1000ms ${EXPO} ${delay}ms, filter 800ms ${EXPO} ${delay}ms, opacity 600ms ${EXPO} ${delay}ms`
      : `transform 700ms ${SMOOTH} ${delay}ms, filter 700ms ${SMOOTH} ${delay}ms, opacity 450ms ease-in ${delay + 200}ms`,
    willChange: "transform, filter, opacity",
  };
}

const BELOW: Pose = { y: 0.5, blur: 12, o: 0 };
const GONE: Pose = { x: 2.5, blur: 14, o: 0 };

function IntroHeading({ onAsk }: { onAsk: () => void }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>("0px 0px -20% 0px", 0, true);
  const [phase, setPhase] = useState(reduced ? 3 : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const at = (ms: number, p: number) => window.setTimeout(() => setPhase(p), ms);
    const ids = [at(150, 1), at(1500, 2), at(2900, 3)];
    return () => ids.forEach(clearTimeout);
  }, [inView, reduced]);

  const shadow = "[text-shadow:0_0_24px_#fff,0_0_8px_#fff]";
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 top-[48%] z-10 h-[96px] -translate-y-1/2 text-[44px] leading-[1.08] tracking-[-0.025em]"
    >
      <p
        aria-hidden="true"
        className={cn("absolute inset-y-0 left-0 flex items-center", shadow)}
        style={phase < 2 ? motion(phase === 0 ? BELOW : {}, true) : motion(GONE, false)}
      >
        Trudno dostępne?
      </p>
      <p
        aria-hidden="true"
        className={cn("absolute inset-y-0 right-0 flex items-center", shadow)}
        style={
          phase < 2
            ? motion({ x: -2, blur: 12, o: 0 }, true)
            : phase === 2
              ? motion({}, true, 250)
              : motion(GONE, false)
        }
      >
        Załatwimy to
      </p>
      <div className="absolute left-0 top-0">
        <h2 className={shadow}>
          {["Załatwimy to, czego", "inni nie mogą znaleźć"].map((line, i) => (
            <span key={line} className="block" style={motion(phase === 3 ? {} : BELOW, true, 450 + i * 110)}>
              {line}
            </span>
          ))}
        </h2>
        <div
          inert={phase !== 3}
          className={cn("mt-6 w-fit text-base leading-normal tracking-normal", phase === 3 && "pointer-events-auto")}
          style={motion(phase === 3 ? {} : BELOW, true, 700)}
        >
          <SplitButton label="Zadaj pytanie" onClick={onAsk} size="sm" />
        </div>
      </div>
    </div>
  );
}

const WIDE: GlobeFrame = {
  r: 0.3,
  cx: 0.62,
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
          <div className="relative z-10 mb-3 md:hidden">
            <h2 className="text-[5.2vw] leading-[1.1] tracking-[-0.025em] sm:text-[32px]">
              <RevealLine text="Załatwimy to, czego" />
              <RevealLine text="inni nie mogą znaleźć" delay={LINE_GAP} />
            </h2>
            <div className="mt-6">
              <SplitButton label="Zadaj pytanie" onClick={openTeam} size="sm" />
            </div>
          </div>
          {wide && <IntroHeading onAsk={openTeam} />}
          <Suspense fallback={<div className="aspect-[4/3] w-full md:aspect-[1432/640]" />}>
            <DotGlobe
              frame={wide ? WIDE : NARROW}
              className="aspect-[4/3] w-full md:aspect-[1432/640]"
            />
          </Suspense>
        </div>
        <div className="relative z-10 mt-4 grid gap-6 md:-mt-20 md:grid-cols-3 md:gap-10">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="ns-hover md:pt-5">
                <div className="flex items-center gap-3">
                  <IconBox className="size-5 border-0! bg-transparent! text-[#0A0A0A]! [&_svg]:size-5">
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
