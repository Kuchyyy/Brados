"use client";

import { useCallback, useEffect, useState } from "react";

type LogoItem = {
  src: string;
  alt: string;
  scale?: number;
};

const logos: LogoItem[] = [
  { src: "/photos/hager.webp", alt: "Hager", scale: 1.9 },
  { src: "/photos/legrand.webp", alt: "Legrand", scale: 0.8 },
  { src: "/photos/noark.webp", alt: "Noark", scale: 0.6 },
  { src: "/photos/wago.webp", alt: "Wago", scale: 1.6 },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/09/ETI-Logo-CMYK-1.png",
    alt: "ETI",
    scale: 0.9,
  },
  {
    src: "https://elsigma.pl/wp-content/uploads/2024/04/tracon.jpg",
    alt: "Tracon",
    scale: 0.85,
  },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/09/Scame-1.jpg",
    alt: "Scame",
    scale: 0.8,
  },
  {
    src: "https://ckziu.kalisz.pl/wp-content/uploads/2021/10/Logo-Kontakt-Simon.png",
    alt: "Kontakt-Simon",
    scale: 0.85,
  },
  { src: "/photos/awex.webp", alt: "Awex", scale: 1.4 },
  { src: "/photos/kanlux.webp", alt: "Kanlux", scale: 0.7 },
  { src: "/photos/Kopos.webp", alt: "Kopos", scale: 1.1 },
  { src: "/photos/elektro.webp", alt: "Elektroplast", scale: 1 },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/09/Breve-500x239-1.jpg",
    alt: "Breve",
    scale: 0.75,
  },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/11/ORNO_GROUP_wersja2_500px.png",
    alt: "ORNO",
    scale: 0.8,
  },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/09/GTV-blue-1.png",
    alt: "GTV",
    scale: 0.65,
  },
  {
    src: "https://www.elt.si/wp-content/uploads/2015/06/FAMATEL-Logo-e1433236477181.png",
    alt: "Famatel",
    scale: 0.8,
  },
  { src: "/photos/dehn.webp", alt: "Dehn", scale: 1.3 },
  { src: "/photos/ospel.webp", alt: "Ospel", scale: 1 },
  { src: "/photos/koelner.webp", alt: "Koelner", scale: 0.7 },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/09/rawlplug-1.jpg",
    alt: "Rawlplug",
    scale: 0.85,
  },
  {
    src: "https://ce8dc832c.cloudimg.io/cdn/n/n@048143ddd2a844b41fb21ce70e039b725c3edb90/_cs_/2022/01/61e960cb5a965/sonel_logo.png",
    alt: "Sonel",
    scale: 0.9,
  },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/11/haupa-1-1024x398.jpg",
    alt: "Haupa",
    scale: 0.7,
  },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/09/gromtor_logo_cmyk.png",
    alt: "Gromtor",
    scale: 0.85,
  },
];

const TRUSTED_CAPTION =
  "Dostarczamy produkty czołowych producentów";

const LOGOS_PER_ROW = 8;
const DESKTOP_VISIBLE = LOGOS_PER_ROW * 2;
const MOBILE_VISIBLE = 8;
const ROTATE_MS = 5000;
const SWAP_COUNT = 2;

function pickRandomIndices(total: number, count: number): number[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
}

function pickRandomItems<T>(items: T[], count: number): T[] {
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function rotateSlots(current: LogoItem[]): LogoItem[] {
  const hidden = logos.filter(
    (logo) => !current.some((visible) => visible.alt === logo.alt)
  );
  if (hidden.length === 0) return current;

  const swapCount = Math.min(SWAP_COUNT, hidden.length);
  const slotIndices = pickRandomIndices(current.length, swapCount);
  const replacements = pickRandomItems(hidden, swapCount);
  const next = [...current];

  slotIndices.forEach((slot, i) => {
    next[slot] = replacements[i];
  });

  return next;
}

function LogoCell({
  logo,
  animate = false,
}: {
  logo: LogoItem;
  animate?: boolean;
}) {
  return (
    <div className="tile-surface isolate flex aspect-[5/3] min-h-[3.5rem] items-center justify-center bg-neutral-200/80 p-3 sm:min-h-[4rem] sm:p-4">
      <img
        key={animate ? `${logo.alt}-${logo.src}` : undefined}
        src={logo.src}
        alt={logo.alt}
        className={[
          "max-h-7 w-auto max-w-full object-contain mix-blend-multiply grayscale contrast-[1.35] sm:max-h-8",
          animate ? "trusted-logo-swap" : "",
        ].join(" ")}
        style={{ transform: `scale(${logo.scale ?? 1})` }}
        loading="lazy"
      />
    </div>
  );
}

const Trusted = () => {
  const [mobileLogos, setMobileLogos] = useState(() =>
    logos.slice(0, MOBILE_VISIBLE)
  );
  const [desktopLogos, setDesktopLogos] = useState(() =>
    logos.slice(0, DESKTOP_VISIBLE)
  );

  const tickRotation = useCallback(() => {
    setMobileLogos((current) => rotateSlots(current));
    setDesktopLogos((current) => rotateSlots(current));
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(tickRotation, ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, [tickRotation]);

  return (
    <section className="relative w-full bg-background pt-6 pb-12 font-geist md:pt-8 md:pb-16">
      <div className="mx-auto flex maxw flex-col gap-4">
        <p className="text-center text-sm font-inter tracking-tight text-black">
          {TRUSTED_CAPTION}
        </p>

        <div className="overflow-hidden rounded-sm bg-neutral-100 p-2">
          <div className="grid grid-cols-4 gap-2 sm:hidden">
            {mobileLogos.map((logo, index) => (
              <LogoCell key={`${logo.alt}-${index}`} logo={logo} animate />
            ))}
          </div>

          <div className="hidden grid-cols-8 gap-2 sm:grid">
            {desktopLogos.map((logo, index) => (
              <LogoCell
                key={`${logo.alt}-${index}`}
                logo={logo}
                animate
              />
            ))}
          </div>
        </div>
      </div>


    </section>
  );
};

export default Trusted;
