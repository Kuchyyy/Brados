"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import TextPressure from "@/components/ui/shadcn-io/text-pressure";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Jak złożyć zamówienie?",
      answer:
        "Przyjmujemy zamówienia w formie wiadomości e-mail, lub tradycyjnie drogą bezpośredniego kontaktu z naszym zespołem.",
    },
    {
      question: "Jakie metody płatności akceptujecie i jakie są terminy spłat?",
      answer:
        "Jesteśmy elastyczni, dlatego oferujemy różnorodne metody płatności dostosowane do Twojej sytuacji. Rozumiemy, że każda działalność ma swoje specyficzne potrzeby finansowe. Dlatego terminy płatności są u nas dostosowane do indywidualnych potrzeb.",
    },
    {
      question: "Jak odebrać zamówiony towar?",
      answer:
        "Zamówiony towar można odebrać osobiście w naszej firmie, skorzystać z dostawy za pośrednictwem firmy kurierskiej DPD lub, jeśli znajdujesz się we Wrocławiu, możemy dostarczyć zamówienie bezpośrednio na miejsce naszym transportem.",
    },
  ];

  return (
    <section

      className="max-w-[96%] mx-auto py-16 space-y-10"
    >
      {/* Nagłówek */}
      <div className="text-center flex flex-col gap-4 mb-10">
        <p className="font-medium text-sm uppercase md:text-[16px] tracking-wider text-black">
          Masz pytanie?
        </p>
        <h2 className="uppercase text-2xl font-extrabold font-robert-medium leading-tight md:text-5xl text-black">
          Razem możemy osiągnąć więcej
        </h2>
      </div>

      {/* Główna siatka */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* FAQ */}
        <div className="space-y-4 flex justify-around flex-col">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className=" rounded-xl overflow-hidden shadow-md/20 bg-white font-robert-medium"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-black"
                onClick={() => setOpenIndex(index)}
              >
                {faq.question}
                <ChevronDown
                  className={`transition-transform duration-300 min-w-6 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 pb-4 text-gray-600 transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        {/* BRADOS */}
        <div className="flex items-center justify-center rounded-xl p-6 font-bold text-zinc-900  mask-b-from-60% mask-b-to-90%">
          <div className="w-full h-full flex items-center justify-center">
            <TextPressure
              text="BRADOS"
              flex={false}
              width={false}
              weight={true}
              italic={false}
              textColor="currentColor"
              minFontSize={30}
              className="text-foreground text-center leading-none"
            />
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div id="lokalizacja"  className="w-full">
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.5896675485715!2d16.951754976705804!3d51.06066404324029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc2e855555555%3A0x51d44f2bef0f3100!2sBrados!5e0!3m2!1spl!2spl!4v1758895852751!5m2!1spl!2spl&z=100"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

        {/* Mobile */}
        <div className="flex flex-col w-full items-end">
          <div className="flex flex-col w-full lg:max-w-sm items-center gap-3 mt-4 bg-white p-4 rounded-xl shadow-md/20">
            <p className="font-medium text-black">Masz więcej pytań?</p>
            <a
              href="https://maps.app.goo.gl/nokuNXtSYTpPJjG28"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto px-4 py-2 bg-orange-500 text-white rounded-lg font-medium shadow-md hover:bg-orange-600 transition flex justify-center"
            >
              Prowadź do firmy Brados
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
