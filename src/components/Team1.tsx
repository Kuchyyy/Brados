"use client";
import { useState, useRef } from "react";
import { Phone, Mail } from "lucide-react";

type Person = {
  name: string;
  phone: string;
  email: string;
  role?: string;
  image: string;
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
        email: "p.pawlak@brados.pl",
        image: "photos/osoba.png",
      },
      {
        name: "Krzysztof Kuchciński",
        phone: "691032975",
        email: "k.kuchcinski@brados.pl",
        image: "photos/osoba.png",
      },
      {
        name: "Łukasz Zboch",
        phone: "697466111",
        email: "l.zboch@brados.pl",
        image: "photos/osoba.png",
      },
      {
        name: "Michał Wlaszczyk",
        phone: "691745111",
        email: "m.wlaszczyk@brados.pl",
        image: "photos/osoba.png",
      },
      {
        name: "Michał Kleczkowski",
        phone: "697277588",
        email: "m.kleczkowski@brados.pl",
        image: "photos/osoba.png",
      },
    ],
    magazyn: [
      {
        name: "Paweł Zawartko",
        phone: "691725111",
        email: "magazyn@brados.pl",
        image: "photos/osoba.png",
      },
      {
        name: "Artur Kozłowski",
        role: "Kierowca",
        phone: "669456111",
        email: "magazyn@brados.pl",
        image: "photos/osoba.png",
      },
    ],
    finanse: [
      {
        name: "Tomasz Grzesiak",
        phone: "691479111",
        email: "t.grzesiak@brados.pl",
        image: "photos/osoba.png",
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
        className="min-h-svh mx-auto  w-[95%] self-center border max-w-[1200px] border-black/30 shadow-[0_0_60px_rgba(255,255,255,0.1)] flex justify-center items-center relative rounded-xl overflow-hidden bg-white "
      >
        <div className="relative py-20 flex flex-col items-center gap-2 w-[95%] max-w-[1200px] mx-auto">
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
          <div className="mt-10 font-poppins tracking-tight z-20 flex flex-wrap justify-center xl:justify-start gap-3 w-full">
            {teams[activeTab].map((person, index) => (
              <div
                key={index}
                className="relative min-h-[550px] w-full max-w-[370px] rounded-md border border-black/30 overflow-hidden"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="absolute inset-0 w-full h-full object-cover object-top "
                />

                <div className="absolute inset-x-2 bottom-2 bg-stone-50 backdrop-blur-sm rounded-md p-2 flex flex-col justify-end gap-2 border border-black/30">
                  <h3 className=" text-lg text-center">
                    {person.name}
                  </h3>

                  <a
                    href={`tel:${person.phone}`}
                    className="flex justify-between items-center gap-4 border bg-white border-black/30 rounded-md pl-4 pr-2"
                  >
                    <div className="flex w-full items-center justify-center text-black py-4 rounded-md text-sm font-poppins tracking-tight">
                      {person.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}
                    </div>
                    <div className="bg-accent-orange text-white p-3 rounded-md flex justify-center items-center">
                      <Phone className="w-4 h-4" />
                    </div>
                  </a>

                  <button
                    onClick={() => handleCopyEmail(person.email)}
                    className="flex justify-between items-center gap-4 border border-black/30 bg-white rounded-md pl-4 pr-2"
                  >
                    <div className="flex w-full items-center justify-center text-black py-4 rounded-md text-sm font-poppins tracking-tight">
                      {person.email}
                    </div>
                    <div className="bg-accent-orange text-white p-3 rounded-md flex justify-center items-center">
                      <Mail className="w-4 h-4" />
                    </div>
                  </button>
                </div>
                {person.role && (
                  <p className="text-black text-sm text-center absolute right-1.5 top-2 bg-white rounded-md p-2">
                    {person.role}
                  </p>
                )}
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
