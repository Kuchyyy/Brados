export type Person = { name: string; role: string; phone: string; email: string };

export const TEAM: { label: string; people: Person[] }[] = [
  {
    label: "Handlowcy",
    people: [
      { name: "Paweł Pawlak", role: "Prezes", phone: "691 489 111", email: "p.pawlak@brados.pl" },
      { name: "Krzysztof Kuchciński", role: "Prezes", phone: "691 032 975", email: "k.kuchcinski@brados.pl" },
      { name: "Łukasz Zboch", role: "Specjalista ds. sprzedaży", phone: "697 466 111", email: "l.zboch@brados.pl" },
      { name: "Michał Wlaszczyk", role: "Specjalista ds. sprzedaży", phone: "691 745 111", email: "m.wlaszczyk@brados.pl" },
      { name: "Michał Kleczkowski", role: "Specjalista ds. sprzedaży", phone: "697 277 588", email: "m.kleczkowski@brados.pl" },
      { name: "Jarosław Cegielski", role: "Specjalista ds. sprzedaży", phone: "691 585 111", email: "j.cegielski@brados.pl" },
    ],
  },
  {
    label: "Magazyn",
    people: [
      { name: "Paweł Zawartko", role: "Kierownik magazynu", phone: "691 725 111", email: "magazyn@brados.pl" },
      { name: "Artur Kozłowski", role: "Kierowca", phone: "669 456 111", email: "magazyn@brados.pl" },
    ],
  },
  {
    label: "Księgowość",
    people: [
      { name: "Tomasz Grzesiak", role: "Prezes", phone: "691 479 111", email: "t.grzesiak@brados.pl" },
    ],
  },
];
