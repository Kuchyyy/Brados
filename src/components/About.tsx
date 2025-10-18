"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Package, ArrowUpRight, Star } from "lucide-react";
import { Ripple } from "./ui/shadcn-io/ripple";
import { AnimatedBeam } from "@/components/ui/shadcn-io/animated-beam";

// 🔹 Hook do animacji liczb
const useCountUp = (end: number, inView: boolean, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * end);
      setCount(value);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [end, inView, duration]);

  return count;
};

// 🔹 Komponent kafelka ze statystyką
const StatCard = ({
  icon: Icon,
  value,
  label,
  suffix = "+",
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(value, inView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex flex-col justify-end rounded-xl bg-stone-100 p-4 hover:bg-stone-200 transition h-32 sm:h-40"
    >
      <Icon className="absolute top-3 right-3 text-orange-500 w-6 h-6" />
      <h4 className="text-2xl md:text-3xl text-black">
        {count}
        {inView && suffix}
      </h4>
      <p className="text-sm md:text-base text-gray-600">{label}</p>
    </div>
  );
};

const About = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="about"
      className="py-20 max-w-[96%] mx-auto bg-stone-100"
    >
      {/* Nagłówek */}
      <div className="mb-8 text-center flex flex-col gap-4">
        <p className="font-medium text-sm uppercase md:text-[16px] tracking-wider text-black">
          Poznaj naszą firmę
        </p>
        <h2 className="uppercase text-2xl font-extrabold font-robert-medium leading-tight md:text-5xl text-black">
          Dlaczego warto wybrać  <br />
          właśnie nas
        </h2>
      </div>

      {/* Grid główny */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto font-robert-medium">
      {/* GÓRNY PROSTOKĄT */}
      <div className="col-span-1 md:col-span-2 relative overflow-hidden 
                      rounded-2xl bg-white p-4 md:p-8 
                      shadow-md/20 hover:scale-[1.01] transition-transform 
                      flex flex-col justify-between h-full min-h-[250px]">

        {/* Logo – góra prawa */}
        <div className="flex justify-end">
          <img
            src="/photos/elsigma.png"
            alt="Logo El-Sigma"
            className=" object-contain pointer-events-none w-[100%] md:w-[80%] select-none pt-2"
          />
        </div>

        {/* Tekst – dół lewa */}
        <div className="mt-3 md:mt-0">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">
            El-Sigma
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md">
            Od lat wspieramy klientów w tworzeniu niezawodnych instalacji
            elektrycznych. Stawiamy na innowacje, jakość i rozwój.
          </p>
        </div>
      </div>



      {/* GÓRNY KWADRAT – Statystyki */}
      <div
        className="rounded-2xl bg-white 
                  p-4 sm:p-6 
                  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 shadow-md/20 hover:scale-[1.01] transition-transform"
      >
        <StatCard icon={Users} value={25} label="Lat doświadczenia" />
        <StatCard icon={Package} value={5000} label="Produktów" />
        <StatCard icon={ArrowUpRight} value={1000} label="Zadowolonych klientów" />
        <StatCard icon={Star} value={100} label="Satysfakcji" suffix="%" />
      </div>


        {/* DOLNY KWADRAT – Misja */}
        <div className="relative overflow-hidden min-h-[300px] md:min-h-[386px] rounded-2xl bg-white  p-6 shadow-md/20 hover:scale-[1.02] transition-transform flex items-end">
          {/* Ripple efekt w tle */}
          <Ripple className="z-0" />

          {/* Treść na wierzchu */}
          <div className="relative z-10">
            <h4 className="text-xl md:text-2xl font-bold mb-2 text-black">
              Nasza Misja
            </h4>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Łączymy technologię i doświadczenie, aby dostarczać klientom
              rozwiązania, które inspirują i wspierają codzienną pracę.
            </p>
          </div>
        </div>

        {/* DOLNY PROSTOKĄT */}
        <div
          ref={containerRef}
          className="col-span-1 md:col-span-2 relative overflow-hidden pt-14 md:pt-20
                    rounded-2xl bg-white  p-6 min-h-[300px] shadow-md/20
                    flex flex-col justify-between hover:scale-[1.01] transition-transform"
        >
          {/* GÓRA – animacja */}
          <div className="relative flex items-start justify-between">
            {/* Punkt startowy – ludzik */}
            <div
              ref={startRef}
              className="z-20 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full 
                        bg-white shadow-md border"
            >
              <Users className="w-6 h-6 md:w-7 md:h-7 text-black" />
            </div>

            {/* Punkt końcowy – logo Brados */}
            <div
              ref={endRef}
              className="z-20 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full 
                        bg-white shadow-md border"
            >
              <img src="/brados.png" alt="Logo Brados" className="w-8 h-8 md:w-10 md:h-10" />
            </div>
          </div>

          {/* BEAM – 90% szerokości */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={startRef}
            toRef={endRef}
            curvature={0}
            startXOffset={0}   // przesunięcie początkowe
            endXOffset={-0}    // przesunięcie końcowe
            gradientStartColor="#ff7e5f"
            gradientStopColor="#ffb347"
            pathWidth={3}
            pathOpacity={0.9}
            className="z-10"
          />

          {/* DÓŁ – tekst */}
          <div className="relative z-20 max-w-md mt-6">
            <h4 className="text-xl md:text-2xl font-bold mb-3 text-black">
              Komunikacja i Rozwój
            </h4>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              Wierzymy, że skuteczna komunikacja z klientem to fundament każdej
              udanej współpracy. Dlatego rozwój i innowacje stawiamy w centrum
              naszej działalności.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
