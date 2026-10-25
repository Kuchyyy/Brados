export type CategoryIcon =
  | "aparatura"
  | "kable"
  | "rozdzielnice"
  | "osprzet"
  | "swiatlo"
  | "trasy"
  | "sieci"
  | "mierniki"
  | "odgromowa";

export const MENU_CATEGORIES: {
  title: string;
  desc: string;
  slug: string;
  icon: CategoryIcon;
}[] = [
  {
    title: "Aparatura modułowa",
    desc: "Wyłączniki i styczniki",
    slug: "aparatura-modulowa",
    icon: "aparatura",
  },
  {
    title: "Kable i przewody",
    desc: "Energetyczne i sygnałowe",
    slug: "kable-i-przewody",
    icon: "kable",
  },
  {
    title: "Rozdzielnice i obudowy",
    desc: "Skrzynki, także na wymiar",
    slug: "rozdzielnice-i-obudowy",
    icon: "rozdzielnice",
  },
  {
    title: "Osprzęt elektroinstalacyjny",
    desc: "Gniazda, łączniki i puszki",
    slug: "osprzet-elektroinstalacyjny-i-silowy",
    icon: "osprzet",
  },
  {
    title: "Technika świetlna",
    desc: "Oprawy LED i awaryjne",
    slug: "technika-swietlna",
    icon: "swiatlo",
  },
  {
    title: "System tras i mocowania",
    desc: "Koryta, kanały i drabinki",
    slug: "systemy-tras-i-mocowania",
    icon: "trasy",
  },
  {
    title: "Sieci i okablowanie",
    desc: "Szafy rack i światłowody",
    slug: "sieci-niskoprzadowe-i-okablowanie-strukturalne",
    icon: "sieci",
  },
  {
    title: "Narzędzia i mierniki",
    desc: "Mierniki i testery dla instalatora",
    slug: "narzedzia-i-mierniki",
    icon: "mierniki",
  },
  {
    title: "Ochrona odgromowa",
    desc: "Odgromówka i przepięcia",
    slug: "ochrona-odgromowa",
    icon: "odgromowa",
  },
];

export const FOOTER_OFFER: { label: string; slug: string }[] = [
  { label: "Aparatura modułowa", slug: "aparatura-modulowa" },
  { label: "Narzędzia i mierniki", slug: "narzedzia-i-mierniki" },
  {
    label: "Sieci niskoprądowe i okablowanie strukturalne",
    slug: "sieci-niskoprzadowe-i-okablowanie-strukturalne",
  },
  { label: "Rozdzielnice i obudowy", slug: "rozdzielnice-i-obudowy" },
  {
    label: "Osprzęt elektroinstalacyjny i siłowy",
    slug: "osprzet-elektroinstalacyjny-i-silowy",
  },
  { label: "Technika świetlna", slug: "technika-swietlna" },
  { label: "System tras i mocowania", slug: "systemy-tras-i-mocowania" },
  { label: "Kable i przewody", slug: "kable-i-przewody" },
  { label: "Ochrona odgromowa", slug: "ochrona-odgromowa" },
];
