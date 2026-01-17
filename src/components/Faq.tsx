"use client";

import { useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus, Locate } from "lucide-react";
import {
  Map,
  MapMarker,
  MapControls,
  MarkerContent,
  type MapRef,
} from "@/components/ui/map";

gsap.registerPlugin(ScrollTrigger);

const COORDS = {
  lat: 51.0679167,
  lng: 16.9576667,
};

const faqs = [
  {
    question: "Jak złożyć zamówienie?",
    answer:
      "Zamówienia przyjmujemy w formie wiadomości e-mail lub poprzez bezpośredni kontakt z naszym zespołem. Pomagamy na każdym etapie – od zapytania po realizację.",
  },
  {
    question: "Jakie metody płatności akceptujecie i jakie są terminy spłat?",
    answer:
      "Oferujemy elastyczne metody płatności dostosowane do charakteru współpracy. Terminy spłat ustalane są indywidualnie, w zależności od zakresu i formy zamówienia.",
  },
  {
    question: "Jak odebrać zamówiony towar?",
    answer:
      "Zamówiony towar można odebrać osobiście w naszej siedzibie, skorzystać z dostawy kurierskiej DPD lub – na terenie Wrocławia – z transportu realizowanego przez nasz zespół.",
  },
  {
    question: "Czy współpracujecie wyłącznie z firmami?",
    answer:
      "Specjalizujemy się w obsłudze klientów biznesowych. Współpracujemy z firmami instalacyjnymi, wykonawcami oraz partnerami B2B, oferując warunki dopasowane do ich działalności.",
  },
  {
    question: "Jak szybko realizowane są zamówienia?",
    answer:
      "Czas realizacji zależy od dostępności produktów oraz wybranej formy dostawy. O terminie realizacji informujemy już na etapie składania zamówienia.",
  },
  {
    question: "Czy oferujecie doradztwo techniczne przy doborze produktów?",
    answer:
      "Tak. Zapewniamy wsparcie techniczne i pomagamy w doborze odpowiednich rozwiązań do konkretnych potrzeb oraz realizowanych inwestycji.",
  },
];


const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  const handleShowLocation = useCallback(() => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: [COORDS.lng, COORDS.lat],
      zoom: 15,
      duration: 1500,
    });
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const leaderSpan = textRef.current.querySelector(
      ".text-accent-orange"
    );

    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      textRef.current,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) =>
          node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
      }
    );

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode as Text);
    }

    const wordSpans: HTMLSpanElement[] = [];

    textNodes.forEach((node) => {
      if (leaderSpan && leaderSpan.contains(node)) return;

      const words = node.textContent!.split(" ");
      words.forEach((word) => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word + " ";
        wordSpans.push(span);
        node.parentNode?.insertBefore(span, node);
      });
      node.parentNode?.removeChild(node);
    });

    gsap.set(wordSpans, { color: "rgba(0,0,0,0.15)" });

    const ctx = gsap.context(() => {
      gsap.to(wordSpans, {
        color: "rgba(0,0,0,1)",
        stagger: 0.05,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <div className="w-full flex justify-center items-center ">
      <section
        ref={sectionRef}
        id="lokalizacja"
        className="relative w-full bg-white overflow-hidden"
      >
        <div className="mx-auto max-w-[1200px] w-[95%] py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] gap-4">
            <div className="relative h-[50vh] lg:h-full rounded-md overflow-hidden border border-zinc-200">
              <Map
                ref={mapRef}
                center={[COORDS.lng, COORDS.lat]}
                zoom={10}
                projection={{ type: "globe" }}
                styles={{
                  light:
                    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
                  dark:
                    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
                }}
              >
                <MapControls showZoom />

                <MapMarker longitude={COORDS.lng} latitude={COORDS.lat}>
                  <MarkerContent>
                    <div className="group relative w-3 h-3 cursor-pointer">
                      <span className="absolute inset-0 rounded-full bg-accent-orange animate-ripple" />
                      <span className="absolute inset-0 rounded-full bg-accent-orange" />

                      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-3 py-1 text-xs font-medium text-black opacity-0 shadow-lg transition group-hover:opacity-100">
                        Siedziba zespołu
                      </div>
                    </div>
                  </MarkerContent>
                </MapMarker>
              </Map>

              <div className="absolute bottom-2 left-2 z-10 flex flex-col gap-2">
                <button
                  onClick={handleShowLocation}
                  className="bg-white rounded-md px-4 py-2 shadow-lg border border-zinc-200 hover:bg-zinc-50 transition flex items-center gap-2 text-sm font-poppins tracking-tight text-black cursor-pointer"
                >
                  <Locate className="w-4 h-4" />
                  Pokaż lokalizację


                </button>

                <a
                  href="https://maps.app.goo.gl/RMxpxoWFV8upiwmM7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <a
                    href="https://maps.app.goo.gl/RMxpxoWFV8upiwmM7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 border border-zinc-200 hover:bg-zinc-50 bg-white rounded-md pl-4 pr-1.5 shadow-lg  transition font-poppins tracking-tight"
                  >
                    <div className="flex w-full items-center justify-center text-black py-2 text-sm">
                      Prowadź do firmy
                    </div>

                    <div className="bg-accent-orange text-white p-1.5 rounded-md flex justify-center items-center transition ">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45" />
                    </div>
                  </a>

                </a>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <h2
                ref={textRef}
                className="text-2xl  leading-tight tracking-tight max-w-xl mt-1 font-poppins text-black"
              >
                Jesteśmy{" "}
                <span className="no-split text-accent-orange">liderem w branży</span>{" "}
                , dostarczając sprawdzone
                rozwiązania, skalę dostępności i niezawodność, na której opiera się
                biznes naszych partnerów.
              </h2>
            </div>


          </div>
        </div>

        <div className="w-full bg-linear-to-t from-stone-100 to-white">
          <div className="mx-auto max-w-[800px] w-[95%] py-10">
            <h2 className="text-sm leading-tight text-center font-poppins tracking-tight mb-10">
              Najczęściej zadawane pytania <br />
              <span className="text-black/60">
                Może właśnie tutaj jest odpowiedź, której szukasz
              </span>
            </h2>

            <div className="rounded-xl overflow-hidden bg-white border border-black/30">
              {faqs.map((faq, index) => (
                <div key={index}>
                  {index !== 0 && (
                    <hr className="border-t border-dashed border-zinc-300" />
                  )}

                  <button
                    className="w-full flex justify-between items-center px-6 py-4 text-left text-md font-medium text-black cursor-pointer"
                    onClick={() => toggle(index)}
                  >
                    {faq.question}
                    <Plus
                      className={`transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-45" : ""
                        }`}
                    />
                  </button>

                  <div
                    className={`px-6 pb-4 text-black/60 transition-all text-sm duration-500 ${openIndex === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Faq;
