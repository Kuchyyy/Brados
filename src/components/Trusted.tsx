"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useEffect } from "react";

type LogoItem = {
  src: string;
  alt: string;
  scale?: number;
  offsetY?: number;
};

const logos: LogoItem[] = [
  { src: "/photos/legrand.webp", alt: "Legrand", scale: 1 },
  { src: "/photos/noark.webp", alt: "Noark", scale: 1 },
  { src: "/photos/wago.webp", alt: "Wago", scale: 1.7 },
  {
    src: "https://www.etigroup.eu/images/eti-logo-safe-future-fb.png",
    alt: "ETI",
    scale: 0.6,
  },
  {
    src: "https://pl.traconelectric.com/static/images_original/CMS/LOG_23/Tracon_logo_4C.png",
    alt: "Tracon",
    scale: 1,
    offsetY: 7,
  },
  {
    src: "https://ckziu.kalisz.pl/wp-content/uploads/2021/10/Logo-Kontakt-Simon.png",
    alt: "Kontakt-Simon",
    scale: 1.4,
  },
  { src: "/photos/awex.webp", alt: "Awex", scale: 1.4 },
  { src: "/photos/kanlux.webp", alt: "Kanlux", scale: 1 },
  { src: "/photos/Kopos.webp", alt: "Kopos", scale: 1 },
  { src: "/photos/elektro.webp", alt: "Elektroplast", scale: 1 },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/11/ORNO_GROUP_wersja2_500px.png",
    alt: "ORNO",
    scale: 1,
  },
  {
    src: "https://elgra.com.pl/wp-content/uploads/2025/11/GTV-blue_PNG.png",
    alt: "GTV",
    scale: 1,
  },
  {
    src: "https://www.elt.si/wp-content/uploads/2015/06/FAMATEL-Logo-e1433236477181.png",
    alt: "Famatel",
    scale: 1,
  },
  { src: "/photos/dehn.webp", alt: "Dehn", scale: 1 },
  { src: "/photos/ospel.webp", alt: "Ospel", scale: 1 },
  { src: "/photos/koelner.webp", alt: "Koelner", scale: 1 },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/09/rawlplug-1.jpg",
    alt: "Rawlplug",
    scale: 1,
  },
  {
    src: "https://elsigma.pl/wp-content/uploads/2023/09/gromtor_logo_cmyk.png",
    alt: "Gromtor",
    scale: 1,
  },
  {
    src: "https://assets.sc.hager.com/uk/-/media/project/hagerdeep/united-kingdom/hager/b2b-uk/support/marketing-support/hager-logo-png.png",
    alt: "Hager",
    scale: 1,
  },
];

const TRUSTED_CAPTION =
  "Dostarczamy produkty czołowych producentów";

const carouselLogos = [...logos, ...logos];

function LogoCell({ logo }: { logo: LogoItem }) {
  const offsetY = logo.offsetY ?? 0;

  return (
    <div className="flex h-6 w-14 items-center justify-center sm:h-7 sm:w-16">
      <img
        src={logo.src}
        alt={logo.alt}
        className="h-full w-full origin-center object-contain object-center mix-blend-multiply grayscale contrast-[1.35]"
        style={{
          transform: `translateY(${offsetY}px) scale(${logo.scale ?? 1})`,
        }}
        loading="lazy"
      />
    </div>
  );
}

const Trusted = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [
      AutoScroll({
        speed: 0.8,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
        breakpoints: {
          "(min-width: 640px)": { speed: 1 },
        },
      }),
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      emblaApi.plugins()?.autoScroll?.stop();
    }
  }, [emblaApi]);

  return (
    <section className="relative bg-gradient-to-b from-background to-white w-full font-geist  py-10 pb-20">
      <div className="mx-auto flex maxw flex-col gap-8">
        <p className="text-center text-xs font-gesit tracking-tight text-black/50">
          {TRUSTED_CAPTION}
        </p>

        <div className="overflow-hidden mask-x-from-95% mask-x-to-100%" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-10">
            {carouselLogos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="min-w-0 shrink-0 grow-0 basis-1/3 sm:basis-1/7"
              >
                <LogoCell logo={logo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
