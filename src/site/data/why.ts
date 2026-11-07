import type { LucideIcon } from "lucide-react";

export type Point = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type WhyTab = {
  id: "liczby" | "elsigma" | "rozwiazania";
  heading: string;
  text: string;
  lead: string;
};

export const WHY_TABS: WhyTab[] = [
  {
    id: "liczby",
    heading: "Rośniemy razem z inwestycjami naszych klientów",
    text: "Od ćwierć wieku poszerzamy asortyment, magazyn i zespół razem z rosnącymi projektami instalatorów i firm wykonawczych.",
    lead: "Rozwijamy się z naszymi klientami",
  },
  {
    id: "elsigma",
    heading: "Partner Grupy El-Sigma",
    text: "El-Sigma to grupa niezależnych polskich hurtowni elektrycznych. Wspólne zakupy dają nam ceny i dostępność dużej sieci, a Ty zostajesz z lokalnym handlowcem.",
    lead: "Siła grupy, kontakt\njak w lokalnej hurtowni",
  },
  {
    id: "rozwiazania",
    heading: "Całe zamówienie od jednej hurtowni",
    text: "Kompletujemy materiały pod całe instalacje: od aparatury modułowej, kabli i rozdzielnic po osprzęt, oświetlenie i ochronę odgromową.",
    lead: "Rozwiązania, nie tylko\npojedyncze produkty",
  },
];

