"use client";
import React, { useState } from "react";
import { User, Phone, Mail } from "lucide-react";

const Team1 = () => {
  const [activeTab, setActiveTab] = useState("handlowcy");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const teams = {
    handlowcy: [
      {
        name: "Paweł Pawlak",
        phone: "691489111",
        email: "p.pawlak@brados.pl",
      },
      {
        name: "Krzysztof Kuchciński",
        phone: "691032975",
        email: "k.kuchcinski@brados.pl",
      },
      {
        name: "Łukasz Zboch",
        phone: "697466111",
        email: "l.zboch@brados.pl",
      },
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
          phone: "691 725 111",
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
      setTimeout(() => setCopiedEmail(null), 2000); // powiadomienie znika po 2s
    });
  };

  return (
    <div id="zespół" className="min-h-screen w-screen bg-stone-100">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* Napis wstępny */}
        <p className="font-general text-sm uppercase md:text-[16px]">
          Poznaj nasz zespół
        </p>

        {/* Tytuł */}
        <h2 className="font-robert-medium uppercase text-xl font-bold leading-tight md:text-5xl text-center">
          Ludzi tworzących <b>Brados</b>
        </h2>

        {/* Przełącznik */}
        <div className="flex gap-4 mt-8 flex-wrap justify-center cursor-none">
          <button
            onClick={() => setActiveTab("handlowcy")}
            className={`px-4 py-2 rounded-lg  cursor-none ${
              activeTab === "handlowcy"
                ? "bg-black text-white"
                : "bg-white border"
            }`}
          >
            Handlowcy
          </button>
          <button
            onClick={() => setActiveTab("magazyn")}
            className={`px-4 py-2 rounded-lg cursor-none ${
              activeTab === "magazyn"
                ? "bg-black text-white"
                : "bg-white border"
            }`}
          >
            Magazyn
          </button>
          <button
            onClick={() => setActiveTab("finanse")}
            className={`px-4 py-2 rounded-lg cursor-none ${
              activeTab === "finanse"
                ? "bg-black text-white"
                : "bg-white border"
            }`}
          >
            Rachunki i finanse
          </button>
        </div>

        {/* Karty */}
        <div
        className={`grid gap-6 mt-10 px-6 w-full
            ${activeTab === "handlowcy" ? "md:grid-cols-3 max-w-8xl" : "md:grid-cols-1 max-w-4xl justify-center"}
            grid-cols-1`}
        >
        {teams[activeTab].map((person, index) => (
            <div
            key={index}
            className="relative bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
            >
            {/* Ikonki w prawym górnym rogu */}
            {"phone" in person && "email" in person && (
                <div className="absolute top-4 right-4 flex gap-2">
                <a
                    href={`tel:${person.phone}`}
                    className="bg-orange-500 p-2 rounded-lg text-white hover:bg-orange-600 cursor-none"
                >
                    <Phone className="w-4 h-4 " />
                </a>
                <button
                    onClick={() => handleCopyEmail(person.email)}
                    className="bg-orange-500 p-2 rounded-lg text-white hover:bg-orange-600 cursor-none"
                >
                    <Mail className="w-4 h-4" />
                </button>
                </div>
            )}

            {/* Avatar */}
            <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-gray-600" />
            </div>

            <h3 className="font-semibold text-lg">{person.name}</h3>

            {/* Dane handlowców / magazyn / finanse */}
            {"phone" in person && (
                <>
                <p className="text-gray-700 text-sm mt-2">
                    {person.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}
                </p>
                <p className="text-orange-600 text-sm">{person.email}</p>
                </>
            )}
            {"role" in person && (
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
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm font-robert-medium">
          Skopiowano e-mail: {copiedEmail}
        </div>
      )}
    </div>
  );
};

export default Team1;
