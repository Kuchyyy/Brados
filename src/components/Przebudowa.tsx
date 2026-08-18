"use client";

import Team1 from "./Team1";

export default function Przebudowa() {
  return (
    <>
      <section className="relative h-[20svh] min-h-[11rem] w-full overflow-hidden bg-gradient-to-b from-hero-surface via-background to-white font-geist">
        <div
          className="absolute inset-0 "
          aria-hidden
        />

        <div className="maxw relative z-10 flex h-full flex-col justify-between pt-6 pb-7 md:pt-7 md:pb-9">
          <img
            src="/photos/logo.webp"
            alt="Brados"
            className="h-10 w-auto self-start md:h-12"
          />

          <h1 className="text-left font-gesit font-normal leading-[1.05] tracking-tight text-blackk text-4xl md:text-5xl lg:text-[3.25rem]">
            Strona w przebudowie.
          </h1>
        </div>
      </section>

      <Team1 showHeading={false} />
    </>
  );
}
