"use client";

import { useEffect, useState } from "react";

type LogoItem = {
  src: string;
  alt: string;
  scale?: number;
};

const logos: LogoItem[] = [
  { src: "/photos/awex.webp", alt: "Awex logo", scale: 1.4 },
  { src: "/photos/dehn.webp", alt: "Dehn logo", scale: 1.3 },
  { src: "/photos/elektro.webp", alt: "Elektroplast logo" },
  { src: "/photos/hager.webp", alt: "Hager logo", scale: 1.9 },
  { src: "/photos/kanlux.webp", alt: "Kanlux logo", scale: 0.7 },
  { src: "/photos/koelner.webp", alt: "Koelner logo", scale: 0.7 },
  { src: "/photos/Kopos.webp", alt: "Kopos logo", scale: 1.1 },
  { src: "/photos/legrand.webp", alt: "Legrand logo", scale: 0.8 },
  { src: "/photos/noark.webp", alt: "Noark logo", scale: 0.6 },
  { src: "/photos/ospel.webp", alt: "Ospel logo", scale: 1 },
  { src: "/photos/wago.webp", alt: "Wago logo", scale: 1.6 },
];

const TRUSTED_VISIBLE = 8;
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

function rotateVisible(current: LogoItem[]): LogoItem[] {
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

const Trusted = () => {
  const [visibleLogos, setVisibleLogos] = useState(() =>
    logos.slice(0, TRUSTED_VISIBLE)
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setVisibleLogos((current) => rotateVisible(current));
    }, ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="w-full bg-white pt-6 pb-1 font-geist">
      <div className="mx-auto flex maxw flex-col gap-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-[11px] tracking-[0.02em] text-blackk sm:text-xs">
            + Dostarczamy produkty czołowych producentów
          </p>
          <div className="flex flex-col gap-0.5 text-[11px] tracking-[0.02em] text-blackk sm:text-right sm:text-xs">
            <span>+ Duży asortyment</span>
            <span>+ Materiały elektryczne i oświetlenie</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 sm:grid-cols-8">
          {visibleLogos.map((logo, index) => (
            <div
              key={index}
              className="flex aspect-square min-h-[4.5rem] items-center justify-center bg-neutral-100 p-3 sm:min-h-[5.5rem] sm:p-4"
            >
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="trusted-logo-swap max-h-7 w-auto max-w-full object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:max-h-8"
                style={{ transform: `scale(${logo.scale ?? 1})` }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trusted;
