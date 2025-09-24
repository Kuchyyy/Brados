'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, Package, ArrowUpRight, Clock } from 'lucide-react';

// 🔹 Hook do animacji liczb
const useCountUp = (end: number, inView: boolean, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
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
}: {
  icon: any;
  value: number;
  label: string;
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
        {label.includes('%') ? '' : '+'}
      </h4>
      <p className="text-sm md:text-base text-gray-600">{label}</p>
    </div>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="py-20 max-w-[96%] mx-auto bg-stone-100 font-robert-medium"
    >
      {/* Nagłówek */}
      <div className="mb-16 text-center flex flex-col gap-4">
        <p className="font-general text-sm uppercase md:text-[16px] tracking-wider text-black">
          Poznaj naszą firmę
        </p>
        <h2 className="uppercase text-2xl font-bold leading-tight md:text-5xl text-black">
          Dlaczego warto wybrać właśnie nas
        </h2>
      </div>

      {/* Grid główny */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
        {/* GÓRNY PROSTOKĄT */}
        <div className="col-span-1 md:col-span-2 relative overflow-hidden rounded-2xl bg-white border border-stone-200 p-8 shadow-lg flex items-end hover:scale-[1.01] transition-transform">
          <div className="z-10 relative">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-black">
              El-Sigma
            </h3>
            <p className="text-gray-600 text-sm md:text-base max-w-md leading-relaxed">
              Od lat wspieramy klientów w tworzeniu niezawodnych instalacji
              elektrycznych. Stawiamy na innowacje, jakość i rozwój.
            </p>
          </div>
          {/* Logo watermark */}
          <img
            src="/photos/elsigma.png"
            alt="Logo El-Sigma"
            className="absolute top-20 right-5 w-2/3 md:w-3/4 object-contain pointer-events-none"
          />
        </div>

        {/* GÓRNY KWADRAT – Statystyki */}
        <div className="rounded-2xl bg-white border border-stone-200 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-lg">
          <StatCard icon={Users} value={25} label="Lat doświadczenia" />
          <StatCard icon={Package} value={5000} label="Produktów" />
          <StatCard icon={ArrowUpRight} value={1000} label="Zadowolonych klientów" />
          <StatCard icon={Clock} value={99} label="Terminowości" />
        </div>

        {/* DOLNY KWADRAT – Misja */}
        <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-lg hover:scale-[1.02] transition-transform flex items-end">
          <div>
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
        <div className="col-span-1 md:col-span-2 relative overflow-hidden rounded-2xl bg-white border border-stone-200 p-8 shadow-lg flex items-end">
          <div className="relative z-10 max-w-xl">
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
