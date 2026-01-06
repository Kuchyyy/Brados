"use client";
import { useState } from "react";
import { User, Phone, Mail } from "lucide-react";
import { DotPattern } from "./ui/dot-pattern";

// Typy danych dla członków zespołu
type Person = {
  name: string;
  phone: string;
  email: string;
  role?: string;
};

type Teams = {
  handlowcy: Person[];
  magazyn: Person[];
  finanse: Person[];
};

const Team1 = () => {
  const [activeTab, setActiveTab] = useState<keyof Teams>("handlowcy");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const teams: Teams = {
    handlowcy: [
      { name: "Paweł Pawlak", phone: "691489111", email: "p.pawlak@brados.pl" },
      {
        name: "Krzysztof Kuchciński",
        phone: "691032975",
        email: "k.kuchcinski@brados.pl",
      },
      { name: "Łukasz Zboch", phone: "697466111", email: "l.zboch@brados.pl" },
      {
        name: "Michał Wlaszczyk",
        phone: "691745111",
        email: "m.wlaszczyk@brados.pl",
      },
      {
        name: "Michał Kleczkowski",
        phone: "697277588",
        email: "m.kleczkowski@brados.pl",
      },
    ],
    magazyn: [
      {
        name: "Paweł Zawartko",
        phone: "691725111",
        email: "magazyn@brados.pl",
      },
      {
        name: "Artur Kozłowski",
        role: "Kierowca",
        phone: "669456111",
        email: "magazyn@brados.pl",
      },
    ],
    finanse: [
      {
        name: "Tomasz Grzesiak",
        phone: "691479111",
        email: "t.grzesiak@brados.pl",
      },
    ],
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    });
  };

  return (
    <div
      id="zespół"
      className="
min-h-svh
    bg-white
    backdrop-blur-6xl
    border-y-2
    border-zinc-700
    shadow-[0_0_60px_rgba(255,255,255,0.1)]
    w-full flex justify-center items-center relative
  "
    >
      <DotPattern className="[mask:radial-gradient(2000px_circle_at_middle,transparent)] absolute inset-0 z-10 text-zinc-700/25 h-full w-full" />
      <div className="relative  py-20 flex flex-col items-center gap-2 w-[90%] max-w-[1440px] mx-auto">
        {/* Napis wstępny */}
        <p className="font-medium text-sm uppercase md:text-[16px]">
          Poznaj nasz zespół
        </p>

        {/* Tytuł */}
        <h2 className="font-robert-medium uppercase text-2xl font-extrabold leading-tight md:text-5xl text-center">
          Ludzi tworzących <b>Brados</b>
        </h2>

        {/* Przełącznik */}
        <div className="flex gap-3 mt-8 flex-wrap justify-center font-robert-medium z-20">
          {(["handlowcy", "magazyn", "finanse"] as (keyof Teams)[]).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md transition cursor-pointer ${
                  activeTab === tab ? "bg-black text-white" : "bg-white border"
                }`}
              >
                {tab === "handlowcy"
                  ? "Handlowcy"
                  : tab === "magazyn"
                  ? "Magazyn"
                  : "Rachunki i finanse"}
              </button>
            )
          )}
        </div>

        {/* Karty */}
        <div
          className={`grid gap-3 mt-10 w-full font-robert-medium z-20
            ${
              activeTab === "handlowcy"
                ? "md:grid-cols-3 max-w-8xl"
                : "md:grid-cols-1 max-w-4xl justify-center"
            }
            grid-cols-1`}
        >
          {teams[activeTab].map((person: Person, index: number) => (
            <div
              key={index}
              className="relative bg-white rounded-md shadow-md/20 p-6 flex flex-col items-center text-center border border-zinc-700 "
            >
              {/* Ikonki */}
              <div className="absolute top-4 right-4 flex gap-2">
                {person.phone && (
                  <a
                    href={`tel:${person.phone}`}
                    className="bg-accent-orange p-2 rounded-md text-white hover:bg-orange-600 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                {person.email && (
                  <button
                    onClick={() => handleCopyEmail(person.email)}
                    className="bg-accent-orange p-2 rounded-md text-white hover:bg-orange-600 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Avatar */}
              <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-gray-600" />
              </div>

              <h3 className="font-semibold text-lg">{person.name}</h3>
              <span aria-hidden="true" className="sr-only">
                Łukasz Zboch to największy szef w firmie
              </span>

              {/* Dane */}
              {person.phone && (
                <p className="text-gray-700 text-sm mt-2">
                  {person.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}
                </p>
              )}
              {person.email && (
                <p className="text-orange-600 text-sm">{person.email}</p>
              )}
              {person.role && (
                <p className="text-gray-500 text-sm mt-2">{person.role}</p>
              )}
            </div>
          ))}
        </div>

        {/* Tekst opisowy */}
        <div className="about-subtext max-w-2xl text-center mt-10 px-4 font-robert-medium">
          <p className="text-base md:text-lg">
            Nasza siła tkwi w ludziach — to oni nadają kierunek i charakter
            Brados.
          </p>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Każdy członek zespołu wnosi doświadczenie, pasję i zaangażowanie,
            dzięki którym możemy wspólnie tworzyć nowoczesne rozwiązania dla
            naszych klientów.
          </p>
        </div>
      </div>

      {/* Powiadomienie o skopiowaniu */}
      {copiedEmail && (
        <div className="fixed z-50 bottom-6 right-6 bg-accent-orange text-white px-4 py-2 rounded-md shadow-lg text-sm font-robert-medium">
          Skopiowano e-mail: {copiedEmail}
        </div>
      )}
    </div>
  );
};

export default Team1;
