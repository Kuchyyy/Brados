"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <section className="relative w-full bg-linear-to-t from-stone-100 to-white">
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
      </section>
    </div>


  );
};

export default Faq;
