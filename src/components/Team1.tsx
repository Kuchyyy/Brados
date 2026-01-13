"use client";
import { useState, useEffect, useRef } from "react";
import { Phone, Mail } from "lucide-react";
import { DotPattern } from "./ui/dot-pattern";

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

  useEffect(() => {
    if (!sectionRef.current) return;
    document.body.style.transition = "background-color 0.5s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.style.backgroundColor = "#e5e5e5";
        } else {
          if (entry.boundingClientRect.top > 0) {
            document.body.style.backgroundColor = "#ffffff";
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      document.body.style.backgroundColor = "#ffffff";
    };
  }, []);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    });
  };

  return (
    <div
      ref={sectionRef}
      id="zespół"
      className="min-h-svh mx-auto backdrop-blur-6xl w-[95%] self-center border max-w-[1200px] border-black/30 shadow-[0_0_60px_rgba(255,255,255,0.1)] flex justify-center items-center relative rounded-xl overflow-hidden bg-white mb-20"
    >
      <DotPattern className="[mask:radial-gradient(2000px_circle_at_middle,transparent)] absolute inset-0 z-10 text-zinc-700/25 h-full w-full" />

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
          ))}
        </div>

        <div
          className={`grid gap-3 mt-10 w-full font-poppins tracking-tight z-20 ${
            activeTab === "handlowcy"
              ? "md:grid-cols-3 max-w-8xl"
              : "md:grid-cols-1 max-w-4xl justify-center"
          } grid-cols-1`}
        >
          {teams[activeTab].map((person, index) => (
            <div
              key={index}
              className="relative bg-white rounded-md shadow-md/20 p-2 pt-6 border border-black/30 flex flex-col justify-between"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-semibold text-lg">{person.name}</h3>
                {person.role && (
                  <p className="text-gray-500 text-sm mt-1">{person.role}</p>
                )}
              </div>

              <a
                href={`tel:${person.phone}`}
                className="flex justify-between items-center gap-4 border border-black/30 rounded-md pl-4 pr-2"
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
                className="flex justify-between items-center gap-4 border border-black/30 rounded-md pl-4 pr-2 mt-2"
              >
                <div className="flex w-full items-center justify-center text-black py-4 rounded-md text-sm font-poppins tracking-tight">
                  {person.email}
                </div>
                <div className="bg-accent-orange text-white p-3 rounded-md flex justify-center items-center">
                  <Mail className="w-4 h-4" />
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="about-subtext max-w-2xl text-center mt-10 px-4 font-poppins tracking-tight">
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

      {copiedEmail && (
        <div className="fixed z-50 bottom-6 right-6 bg-accent-orange text-white px-4 py-2 rounded-md shadow-lg text-sm font-poppins tracking-tight">
          Skopiowano e-mail: {copiedEmail}
        </div>
      )}
    </div>
  );
};

export default Team1;
