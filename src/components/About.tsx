"use client";

import type { ReactNode } from "react";
import { Ripple } from "./ui/shadcn-io/ripple";
import Numbers from "./Numbers";

type AboutTileData = {
  id: string;
  title: string;
  desc: string;
  variant: "elsigma" | "mission" | "stats";
  frameBg: string;
};
const tiles: AboutTileData[] = [
  {
    id: "1",
    title: "El-Sigma",
    desc: "Partnerstwo z liderem dystrybucji elektrotechnicznej w Polsce to gwarancja stabilności i najwyższej jakości.",
    variant: "elsigma",
    frameBg: "#e8e8e3",
  },
  {
    id: "2",
    title: "Rozwiązania dla Twoich potrzeb",
    desc: "Dostarczamy niezawodne rozwiązania, które zwiększają efektywność i ułatwiają codzienną pracę naszych klientów.",
    variant: "mission",
    frameBg: "#e8e8e3",
  },
  {
    id: "3",
    title: "Satysfakcja naszych klientów",
    desc: "Setki pozytywnych opinii i zaufanie klientów to najlepszy dowód na jakość naszych usług.",
    variant: "stats",
    frameBg: "#e8e8e3",
  },
];

const aboutWindowClassName =
  "relative mt-8 w-full shrink-0 overflow-hidden rounded-sm border border-blackk/10 h-[15rem] md:mt-auto h-[26rem]";

function AboutCardWindow({
  children,
  frameBg,
}: {
  children: ReactNode;
  frameBg: string;
}) {
  return (
    <div
      className={aboutWindowClassName}
      style={{ backgroundColor: frameBg }}
    >
      <div className="absolute inset-y-6 right-0 left-6 overflow-hidden rounded-l-xl bg-white">
        <div className="relative flex h-full items-center justify-center overflow-hidden border border-r-0 border-blackk/10 p-4 sm:p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

function AboutCard({
  title,
  desc,
  frameBg,
  children,
}: {
  title: string;
  desc: string;
  frameBg: string;
  children: ReactNode;
}) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-sm border border-blackk/[0.07] bg-neutral-100 p-4 shadow-[0_1px_0_rgba(26,26,26,0.03)] min-h-140">
      <div className="text-left">
        <h3 className="font-inter leading-snug tracking-tight text-blackk sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 max-w-none text-left font-geist text-sm leading-relaxed text-blackk/55 sm:text-[0.95rem]">
          {desc}
        </p>
      </div>

      <AboutCardWindow frameBg={frameBg}>{children}</AboutCardWindow>
    </article>
  );
}

function TileVisual({ variant }: { variant: AboutTileData["variant"] }) {
  if (variant === "elsigma") {
    return (
      <img
        src="/photos/logo-elsigma.webp"
        alt="Logo El-Sigma"
        className="pointer-events-none max-h-full w-full max-w-[320px] select-none object-contain"
      />
    );
  }

  if (variant === "mission") {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <Ripple className="z-0 opacity-35" />
        <img
          src="/photos/logo3d.webp"
          alt="Logo Brados"
          className="relative z-[1] max-h-[75%] w-auto max-w-[9rem] object-contain sm:max-w-[10rem]"
        />
      </div>
    );
  }

  return <Numbers hideHeader className="h-full w-full min-h-0" />;
}

const About = () => (
  <div className="bg-background">
    <section
      id="about"
      className="w-full overflow-hidden rounded-t-4xl border border-b-0 border-blackk/10 bg-white py-8 font-geist md:py-12"
    >
      <div className="maxw flex flex-col gap-3">
        <div className="hidden md:block" aria-hidden />

        <h2 className="heading-h3 flex flex-col justify-between py-8 md:col-span-3 md:col-start-2 md:mb-0 md:pt-20">
          <span className="text-blackk">Poznaj naszą firmę.</span>
          <span className="text-blackk/45">Zaplecze dla Twoich projektów</span>
        </h2>


        <div className="grid grid-cols-1 items-stretch gap-2 md:grid-cols-3">
          {tiles.map((tile) => (
            <AboutCard
              key={tile.id}
              title={tile.title}
              desc={tile.desc}
              frameBg={tile.frameBg}
            >
              <TileVisual variant={tile.variant} />
            </AboutCard>
          ))}
        </div>
      </div>
    </section>

  </div>
);

export default About;
