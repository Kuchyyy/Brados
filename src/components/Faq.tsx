"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? index : index);
  };

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
    <div className="w-full flex justify-center items-center bg-stone-100">
      <section className="w-[90%] max-w-[1440px] mx-auto py-20 space-y-10 min-h-svh">
        <div className="text-left flex flex-col gap-2 mb-2 ml-1">
          <p className="font-medium text-sm uppercase md:text-[16px] tracking-wider text-black">
            Masz pytanie?
          </p>
          <h2 className="uppercase text-2xl font-extrabold font-robert-medium leading-tight md:text-3xl text-black">
            Razem możemy osiągnąć więcej
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="gap-3 flex justify-around flex-col">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className=" rounded-md overflow-hidden shadow-md/20 bg-white font-robert-medium border border-zinc-200 "
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-black cursor-pointer gap-3"
                  onClick={() => toggle(index)}
                >
                  {faq.question}
                  <Plus
                    className={`transition-transform duration-300 min-w-6 shrink-0   ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-6 pb-4 text-gray-600 transition-all duration-500 ease-in-out max-w-2xl ${
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

          <div className="flex items-start justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/photos/logo3d.webp"
                alt="BRADOS 3D logo"
                className="w-[300px] object-contain"
              />
            </div>
          </div>
        </div>

        <div id="lokalizacja" className="w-full">
          <div className="relative w-full h-[400px] rounded-md overflow-hidden shadow-lg border-zinc-700 border-1">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.5896675485715!2d16.951754976705804!3d51.06066404324029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc2e855555555%3A0x51d44f2bef0f3100!2sBrados!5e0!3m2!1spl!2spl!4v1758895852751!5m2!1spl!2spl&z=100"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex flex-col w-full items-end">
            <div className="flex flex-col w-full lg:max-w-sm items-center gap-3 mt-4 bg-white p-4 rounded-md shadow-md/20 border border-zinc-200">
              <p className="font-medium text-black">Masz więcej pytań?</p>
              <a
                href="https://maps.app.goo.gl/nokuNXtSYTpPJjG28"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:mx-auto w-full px-4 py-2 bg-accent-orange text-white rounded-md font-medium shadow-md hover:bg-orange-600 transition flex justify-center"
              >
                Prowadź do firmy Brados
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
