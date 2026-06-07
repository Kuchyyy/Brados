"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
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
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-white">
      <section className="w-full bg-background py-16 font-geist md:py-24 rounded-t-4xl border border-b-0 border-blackk/10">
        <div className="maxw grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
          <h2 className="font-inter text-xl font-normal tracking-tight text-blackk md:text-2xl">
            Pytania i odpowiedzi
          </h2>

          <div>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-blackk/10"
                >
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-geist text-sm font-normal text-blackk md:text-base"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-blackk/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                      aria-hidden
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <p className="pb-5 font-geist text-sm leading-relaxed text-blackk/55">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
