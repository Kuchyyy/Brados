export type ParallaxSlide = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
};

export const PARALLAX_SLIDES: ParallaxSlide[] = [
  {
    desktopSrc: "/photos/1.png",
    mobileSrc: "/photos/1.png",
    alt: "Hurtownia Brados — zdjęcie 1",
  },
  {
    desktopSrc: "/photos/2.png",
    mobileSrc: "/photos/2.png",
    alt: "Hurtownia Brados — zdjęcie 2",
  },
  {
    desktopSrc: "/photos/3.png",
    mobileSrc: "/photos/3.png",
    alt: "Hurtownia Brados — zdjęcie 3",
  },
  {
    desktopSrc: "/photos/4.png",
    mobileSrc: "/photos/4.png",
    alt: "Hurtownia Brados — zdjęcie 4",
  },
  {
    desktopSrc: "/photos/5.png",
    mobileSrc: "/photos/5.png",
    alt: "Hurtownia Brados — zdjęcie 5",
  },
];

export const PARALLAX_ROTATE_MS = 6000;
