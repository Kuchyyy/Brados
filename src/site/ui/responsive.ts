export const photo = (stem: string, width: number) => `/photos/${stem}-${width}.webp`;

export const photoSet = (stem: string, widths: number[]) =>
  widths.map((w) => `${photo(stem, w)} ${w}w`).join(", ");

export const GALLERY_WIDTHS = [640, 1024, 1440];
export const HERO_WIDTHS = [960, 1440, 1672];
export const HERO_PHONE_WIDTHS = [480, 720, 941];
