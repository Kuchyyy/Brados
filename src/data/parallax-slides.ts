export type ParallaxSlide = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
};

export const PARALLAX_SLIDES: ParallaxSlide[] = [
  {
    desktopSrc: "/photos/1.webp",
    mobileSrc: "/photos/1tel.webp",
    alt: "Hurtownia Brados — zdjęcie 1",
  },
  {
    desktopSrc: "/photos/2.webp",
    mobileSrc: "/photos/2tel.webp",
    alt: "Hurtownia Brados — zdjęcie 2",
  },
  {
    desktopSrc: "/photos/3.webp",
    mobileSrc: "/photos/3tel.webp",
    alt: "Hurtownia Brados — zdjęcie 3",
  },
  {
    desktopSrc: "/photos/4.webp",
    mobileSrc: "/photos/4tel.webp",
    alt: "Hurtownia Brados — zdjęcie 4",
  },
  {
    desktopSrc: "/photos/5.webp",
    mobileSrc: "/photos/5tel.webp",
    alt: "Hurtownia Brados — zdjęcie 5",
  },
];

export const PARALLAX_ROTATE_MS = 6000;
