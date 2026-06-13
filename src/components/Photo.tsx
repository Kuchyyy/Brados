"use client";

import ParallaxImage from "./ParallaxImage";

const Photo = () => (
  <section id="photo" className="w-full bg-background font-geist py-20">
    <div className="maxw flex flex-col gap-6 md:gap-8">
      <div>
        <p className="text-[11px] tracking-[0.02em] text-blackk/50 sm:text-xs">
          Nowa siedziba · Wrocław
        </p>

        <h2 className="mt-3 max-w-2xl text-left font-gesit text-xl font-normal leading-[1.15] tracking-tight text-blackk sm:text-2xl md:text-[1.75rem]">
          Rozwijamy się, aby utrzymać standardy i dostarczać klientom najlepsze
          rozwiązania.
        </h2>
      </div>

      <ParallaxImage />
    </div>
  </section>
);

export default Photo;
