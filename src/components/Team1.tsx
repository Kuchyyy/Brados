"use client";
import { useState, useRef } from "react";
import { Phone, Mail, Check } from "lucide-react";

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
  const sectionRef = useRef<HTMLDivElement>(null);

  const teams: Teams = {
    handlowcy: [
      {
        name: "Paweł Pawlak",
        phone: "691489111",
        role: "Prezes",
        email: "p.pawlak@brados.pl",
      },
      {
        name: "Krzysztof Kuchciński",
        phone: "691032975",
        role: "Prezes",
        email: "k.kuchcinski@brados.pl",
      },
      {
        name: "Łukasz Zboch",
        phone: "697466111",
        role: "Specjalista ds. Sprzedaży",
        email: "l.zboch@brados.pl",
      },
      {
        name: "Michał Wlaszczyk",
        phone: "691745111",
        role: "Specjalista ds. Sprzedaży",
        email: "m.wlaszczyk@brados.pl",
      },
      {
        name: "Michał Kleczkowski",
        phone: "697277588",
        role: "Specjalista ds. Sprzedaży",
        email: "m.kleczkowski@brados.pl",
      },
    ],
    magazyn: [
      {
        name: "Paweł Zawartko",
        phone: "691725111",
        role: "Kierownik magazynu",
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
        role: "Prezes",
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
    <div className="w-full h-full bg-linear-to-t from-stone-100 to-white pb-20">

      <div
        ref={sectionRef}
        id="zespół"
        className="min-h-svh mx-auto  w-[95%] self-center max-w-[1200px] flex justify-center items-center relative rounded-xl overflow-hidden"
      >
        <div className="relative py-20 flex flex-col items-center gap-2 w-full max-w-[1200px] mx-auto">
          <h2 className="text-sm leading-tight text-center font-poppins tracking-tight">
            Poznaj nasz zespół <br />
            <p className="inline-flex text-black/60"> Ludzi tworzących Brados</p>
          </h2>

          <div className="flex gap-3 mt-8 flex-wrap justify-center font-poppins tracking-tight z-20 text-sm">
            {(Object.keys(teams) as (keyof Teams)[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md transition cursor-pointer ${activeTab === tab ? "bg-black text-white" : "bg-white border"
                  }`}
              >
                {tab === "handlowcy"
                  ? "Handlowcy"
                  : tab === "magazyn"
                    ? "Magazyn"
                    : "Rachunki i finanse"}
              </button>
            ))}
          </div>
          <div className="mt-10 font-poppins tracking-tight z-20 flex flex-col gap-3 w-full max-w-[800px]">
            {teams[activeTab].map((person, index) => (
              <div
                key={index}
                className="group bg-white border border-black/20 rounded-lg p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 ml-0.5">
                    <h3 className="text-xl font-medium text-black">
                      {person.name}
                    </h3>
                    {person.role && (
                      <p className="text-sm text-black/50 mt-0.5">
                        {person.role}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${person.phone}`}
                      className="text-sm text-black border border-black/20 rounded-md px-3 py-2 pr-2 flex justify-between items-center gap-2 ring-0 hover:ring hover:ring-accent-orange hover:ring-offset-2 ring-offset-0 transition-all duration-300 bg-white"
                    >
                      {person.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}
                      <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-orange">
                        <Phone className="w-4 h-4 text-white" />
                      </span>
                    </a>

                    <button
                      onClick={() => handleCopyEmail(person.email)}
                      className="text-sm text-black border border-black/20 rounded-md px-3 py-2 pr-2 flex justify-between items-center gap-2 ring-0 hover:ring hover:ring-accent-orange hover:ring-offset-2 ring-offset-0 transition-all duration-300 bg-white cursor-pointer"
                    >
                      {person.email}
                      <span className={`flex items-center justify-center w-8 h-8 rounded-md ${copiedEmail === person.email ? 'bg-green-500' : 'bg-accent-orange'} transition-colors`}>
                        {copiedEmail === person.email ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <Mail className="w-4 h-4 text-white" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="about-subtext max-w-2xl text-center mt-10 px-4 font-poppins tracking-tight">
            <p className="text-sm">
              Nasza siła tkwi w ludziach - to oni nadają kierunek i charakter
              Brados.
            </p>
            <p className="text-gray-500 mt-2 text-sm">
              Każdy członek zespołu wnosi doświadczenie, pasję i zaangażowanie,
              dzięki którym możemy wspólnie tworzyć nowoczesne rozwiązania dla
              naszych klientów.
            </p>
          </div>
        </div>

        {copiedEmail && (
          <div className="fixed z-50 bottom-6 right-6 bg-accent-orange text-white px-4 py-2 rounded-md shadow-lg text-sm font-poppins tracking-tight">
            Skopiowano e-mail: {copiedEmail}
          </div>
        )}
      </div>
    </div>
  );
};

export default Team1;
