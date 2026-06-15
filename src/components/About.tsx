"use client";

import type { ReactNode } from "react";
import { Ripple } from "./ui/shadcn-io/ripple";
import Numbers from "./Numbers";

type AboutTileData = {
  id: string;
  title: string;
  desc: string;
  variant: "elsigma" | "mission" | "stats";
};
const tiles: AboutTileData[] = [
  {
    id: "1",
    title: "El-Sigma",
    desc: "Partnerstwo z liderem dystrybucji elektrotechnicznej w Polsce to gwarancja stabilności i najwyższej jakości.",
    variant: "elsigma",
  },
  {
    id: "2",
    title: "Rozwiązania dla Twoich potrzeb",
    desc: "Dostarczamy niezawodne rozwiązania, które zwiększają efektywność i ułatwiają codzienną pracę naszych klientów.",
    variant: "mission",
  },
  {
    id: "3",
    title: "Satysfakcja naszych klientów",
    desc: "Setki pozytywnych opinii i zaufanie klientów to najlepszy dowód na jakość naszych usług.",
    variant: "stats",
  },
];

function AboutCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <article className="flex min-w-0 flex-col">
      <div className="flex h-[13.5rem] w-full items-center justify-center overflow-hidden rounded-sm border  border-blackk/10 bg-neutral-50 p-3 sm:h-[18rem] sm:p-4">
        {children}
      </div>

      <div className="mt-4">
        <h3 className="font-gesit leading-snug tracking-tight text-blackk sm:text-xl">
          {title}
        </h3>
        <p className="my-2 font-geist text-sm leading-relaxed text-blackk/55 ">
          {desc}
        </p>
      </div>
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
      className="w-full overflow-hidden  bg-white py-8 font-geist"
    >
      <div className="maxw flex flex-col gap-3">
        <div className="hidden md:block" aria-hidden />

        <h2 className="heading-h3 flex flex-col justify-between py-8 md:col-span-3 md:col-start-2 md:mb-0 ">
          <span className="text-blackk">Poznaj naszą firmę.</span>
          <span className="text-blackk/45">Zaplecze dla Twoich projektów</span>
        </h2>


        <div className="grid grid-cols-1 items-stretch gap-2 md:grid-cols-3">
          {tiles.map((tile) => (
            <AboutCard
              key={tile.id}
              title={tile.title}
              desc={tile.desc}
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
