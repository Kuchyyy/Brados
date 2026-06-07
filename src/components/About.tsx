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
    desc: "Współpraca z największą siecią dystrybucji materiałów elektrotechnicznych w Polsce.",
    variant: "elsigma",
    frameBg: "#e8e8e6",
  },
  {
    id: "2",
    title: "Nasza Misja",
    desc: "Dostarczamy rozwiązania, które wspierają codzienną pracę naszych klientów.",
    variant: "mission",
    frameBg: "#e6e1d9",
  },
  {
    id: "3",
    title: "Liczby Brados",
    desc: "Twoja satysfakcja to nasz priorytet.",
    variant: "stats",
    frameBg: "#d4d6da",
  },
];

function AboutCardWindow({
  children,
  frameBg,
}: {
  children: ReactNode;
  frameBg: string;
}) {
  return (
    <div
      className="relative mt-8 min-h-[14rem] flex-1 overflow-hidden rounded-2xl sm:min-h-[16rem] md:min-h-[17rem]"
      style={{ backgroundColor: frameBg }}
    >
      <div className="absolute right-0 bottom-0 left-6 top-8 flex flex-col overflow-hidden rounded-tl-xl bg-white shadow-[0_4px_24px_rgba(26,26,26,0.08)] sm:left-8 sm:top-10">
        <div className="flex items-center gap-1.5 border-b border-blackk/5 bg-[#f3f3f1] px-4 py-3">
          <span className="size-2 rounded-full bg-blackk/12" aria-hidden />
          <span className="size-2 rounded-full bg-blackk/12" aria-hidden />
          <span className="size-2 rounded-full bg-blackk/12" aria-hidden />
        </div>

        <div className="relative flex min-h-[11rem] flex-1 items-center justify-center overflow-hidden p-5 sm:min-h-[12rem] sm:p-7">
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
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-blackk/[0.07] bg-[#f7f7f5] p-6 shadow-[0_1px_0_rgba(26,26,26,0.03)] sm:p-7">
      <div className="text-left">
        <h3 className="font-geist text-lg font-semibold leading-snug tracking-tight text-blackk sm:text-xl">
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
        className="pointer-events-none w-full max-w-[220px] select-none object-contain"
      />
    );
  }

  if (variant === "mission") {
    return (
      <>
        <Ripple className="z-0 opacity-35" />
        <img
          src="/photos/logo3d.webp"
          alt="Logo Brados"
          className="relative z-[1] w-20 object-contain sm:w-24"
        />
      </>
    );
  }

  return <Numbers hideHeader className="h-full w-full max-w-[280px]" />;
}

const About = () => (
  <section
    id="about"
    className="w-full overflow-hidden rounded-t-4xl border border-b-0 border-blackk/10 bg-background py-8 font-geist md:py-12"
  >
    <div className="maxw flex flex-col gap-3 md:gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-5">
        <div className="hidden md:block" aria-hidden />

        <h2 className="heading-h2 flex flex-col justify-between py-8 md:col-span-3 md:col-start-2 md:mb-0 md:py-20">
          <span className="text-blackk">Poznaj naszą firmę.</span>
          <span className="text-blackk/45">Zaplecze dla Twoich projektów</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-3 md:gap-4">
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
);

export default About;
