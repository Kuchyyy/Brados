import {
  Award,
  Calendar,
  ChartColumn,
  ClipboardCheck,
  History,
  Layers,
  LayoutGrid,
  MapPin,
  Receipt,
  Search,
  Tag,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type Point = {
  icon: LucideIcon;
  title: string;
  desc: string;
  value?: number;
  suffix?: string;
  shuffle?: boolean;
};

export type WhyTab = {
  id: "liczby" | "elsigma" | "rozwiazania";
  label: string;
  icon: LucideIcon;
  heading: string;
  text: string;
  lead: string;
  points: Point[];
};

export const WHY_TABS: WhyTab[] = [
  {
    id: "liczby",
    label: "Rozwój",
    icon: ChartColumn,
    heading: "Rośniemy razem z inwestycjami naszych klientów",
    text: "Od ćwierć wieku poszerzamy asortyment, magazyn i zespół razem z rosnącymi projektami instalatorów i firm wykonawczych z Wrocławia i okolic.",
    lead: "Rozwijamy się z naszymi klientami",
    points: [
      { icon: Calendar, title: "25 lat na rynku", value: 25, suffix: " lat na rynku", desc: "Od ćwierć wieku zaopatrujemy instalatorów i firmy z Wrocławia." },
      { icon: Receipt, title: "1 000 000+ transakcji", value: 1000000, suffix: "+ transakcji", shuffle: true, desc: "Ponad milion zrealizowanych sprzedaży w naszej historii." },
      { icon: Tag, title: "19 producentów", value: 19, suffix: " producentów", desc: "Sprawdzone marki, z którymi współpracujemy na stałe." },
    ],
  },
  {
    id: "elsigma",
    label: "Grupa El-Sigma",
    icon: LayoutGrid,
    heading: "Partner Grupy El-Sigma",
    text: "El-Sigma to grupa niezależnych polskich hurtowni elektrycznych. Wspólne zakupy dają nam ceny i dostępność dużej sieci, a Ty zostajesz z lokalnym handlowcem.",
    lead: "Siła grupy, kontakt\njak w lokalnej hurtowni",
    points: [
      { icon: History, title: "20 lat grupy", value: 20, suffix: " lat grupy", desc: "Grupa El-Sigma działa na rynku od dwóch dekad." },
      { icon: MapPin, title: "120+ punktów sprzedaży", value: 120, suffix: "+ punktów sprzedaży", desc: "Hurtownie grupy w całej Polsce, wspólne zaplecze." },
      { icon: Award, title: "Nagradzana marka", desc: "Forbes Diamenty 2024 i Gazele Biznesu 2023 dla grupy." },
    ],
  },
  {
    id: "rozwiazania",
    label: "Rozwiązania",
    icon: Layers,
    heading: "Rozwiązania, nie tylko pojedyncze produkty",
    text: "Kompletujemy materiały pod całe instalacje: od fotowoltaiki i ładowania aut po sieci, automatykę i ochronę przepięciową.",
    lead: "Rozwiązania, nie tylko\npojedyncze produkty",
    points: [
      { icon: Search, title: "Dobór", desc: "Pomożemy dobrać komponenty do Twojej instalacji." },
      { icon: ClipboardCheck, title: "Kompletacja", desc: "Całe zamówienie przygotujemy w jednym miejscu." },
      { icon: Truck, title: "Dostawa", desc: "Odbiór osobisty albo transport prosto na budowę." },
    ],
  },
];

export const BOX_W = 564;
export const BOX_H = 422;
