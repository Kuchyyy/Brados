import {
  Antenna,
  Box,
  Circle,
  Lightbulb,
  Plug,
  Settings,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { pages } from "./page";

export type OfertaNavItem = {
  id: string;
  slug: string;
  label: string;
  shortDescription: string;
  icon: LucideIcon;
};

const navMeta: Record<
  string,
  { label: string; shortDescription: string; icon: LucideIcon }
> = {
  "1": {
    label: "Aparatura modułowa i sterowanie",
    shortDescription:
      "Sterowniki, moduły i systemy automatyki do precyzyjnego zarządzania instalacjami.",
    icon: Settings,
  },
  "2": {
    label: "Narzędzia i mierniki",
    shortDescription:
      "Multimetry, testery i akcesoria pomiarowe do codziennej pracy instalatora.",
    icon: Wifi,
  },
  "3": {
    label: "Sieci niskoprądowe i okablowanie",
    shortDescription:
      "Rozwiązania do transmisji danych i sygnałów w biurach, przemyśle i domu.",
    icon: Zap,
  },
  "4": {
    label: "Rozdzielnice i obudowy",
    shortDescription:
      "Rozdzielnice i obudowy chroniące sprzęt i porządkujące instalację.",
    icon: Box,
  },
  "5": {
    label: "Osprzęt elektroinstalacyjny",
    shortDescription:
      "Gniazda, wyłączniki i złącza - trwałość, bezpieczeństwo i design.",
    icon: Plug,
  },
  "6": {
    label: "Technika świetlna",
    shortDescription:
      "Lampy, oprawy i LED - energooszczędne oświetlenie do każdego wnętrza.",
    icon: Lightbulb,
  },
  "7": {
    label: "System tras i mocowania",
    shortDescription:
      "Kanały, koryta i uchwyty do szybkiego i bezpiecznego montażu.",
    icon: Antenna,
  },
  "8": {
    label: "Kable i przewody",
    shortDescription:
      "Przewody energetyczne i sygnałowe do wymagających instalacji.",
    icon: Plug,
  },
  "9": {
    label: "Ochrona odgromowa",
    shortDescription:
      "Systemy ochrony przed wyładowaniami atmosferycznymi.",
    icon: Zap,
  },
  "10": {
    label: "Pozostałe",
    shortDescription:
      "Akcesoria i komponenty uzupełniające asortyment hurtowni.",
    icon: Circle,
  },
};

export const ofertaNavItems: OfertaNavItem[] = pages.map((page) => {
  const meta = navMeta[page.id];
  return {
    id: page.id,
    slug: page.slug,
    label: meta?.label ?? page.title,
    shortDescription: meta?.shortDescription ?? page.description.slice(0, 80),
    icon: meta?.icon ?? Circle,
  };
});
