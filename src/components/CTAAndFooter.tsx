"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const CTAAndFooter = () => {
  const [siteAlert, setSiteAlert] = useState<string | null>(null);

  // Automatyczne chowanie alertu po 4 sekundach
  useEffect(() => {
    if (!siteAlert) return;
    const timer = setTimeout(() => setSiteAlert(null), 2000);
    return () => clearTimeout(timer);
  }, [siteAlert]);

  const handleClick = (label: string) => {
    setSiteAlert(`Sekcja "${label}" pojawi się wkrótce 🚧`);
  };

  return (
    <div className="relative mt-20 mb-10">
      {/* ALERT FIXED */}
      {siteAlert && (
        <div className="fixed top-4 inset-x-0 flex justify-center z-[9999] px-4">
          <div className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
            <span>{siteAlert}</span>
            <button
              onClick={() => setSiteAlert(null)}
              className="ml-4 text-white hover:text-orange-500 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* CTA sekcja */}
      <section className="relative max-w-[96%] mx-auto py-6 rounded-3xl overflow-hidden">
        {/* Gradient tła – stone-300 -> stone-100 */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at 50% 100%,
                rgba(214,211,209,1) 0%,
                rgba(214,211,209,0.9) 20%,
                rgba(214,211,209,0.7) 40%,
                rgba(214,211,209,0.5) 55%,
                rgba(214,211,209,0.3) 70%,
                rgba(245,245,244,0.9) 85%,
                rgba(245,245,244,1) 100%
              )
            `,
          }}
        ></div>

        {/* Treść CTA */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10 px-6">
          <div className="flex flex-col gap-4 mb-6">
            <p className="font-general text-sm uppercase md:text-[16px] tracking-wider text-black">
              Gotowy na współpracę z nami?
            </p>
            <h2 className="uppercase text-2xl font-bold leading-tight md:text-5xl text-black">
              Dołącz do grona naszych klientów
            </h2>
          </div>

          <a
            href="#zespół"
            className="
              inline-block w-full sm:w-auto 
              px-6 sm:px-10 py-5 
              bg-black text-white font-general font-robert-medium 
              rounded-lg shadow-md hover:bg-stone-800 transition text-lg
            "
          >
            Nawiąż współpracę
          </a>
        </div>

        {/* FOOTER */}
        <div className="relative z-20 max-w-[96%] mx-auto mt-12 bg-stone-50 border border-stone-200 rounded-3xl overflow-hidden">
          <footer className="px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Logo + opis */}
            <div className="col-span-1 space-y-4 flex justify-center flex-col items-center">
              <img
                src="/brados.png"
                alt="BRADOS logo"
                className="w-28 md:w-32 object-contain"
              />
            </div>

            {/* Oferta 1 */}
            <div>
              <h3 className="font-semibold text-black mb-4 font-general uppercase">
                Oferta
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Aparatura modułowa i sterowanie",
                  "Narzędzia i mierniki",
                  "Sieci niskoprądowe i okablowanie strukturalne",
                  "Rozdzielnice i obudowy",
                  "Osprzęt elektroinstalacyjny i siłowy",
                ].map((label) => (
                  <li key={label}>
                    <button
                      onClick={() => handleClick(label)}
                      className="hover:text-orange-500 transition text-left w-full"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Oferta 2 */}
            <div>
              <h3 className="font-semibold text-black mb-4 font-general uppercase">
                Oferta
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Technika świetlna",
                  "System tras i mocowania",
                  "Kable i przewody",
                  "Ochrona odgromowa",
                  "Pozostałe",
                ].map((label) => (
                  <li key={label}>
                    <button
                      onClick={() => handleClick(label)}
                      className="hover:text-orange-500 transition text-left w-full"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Firma */}
            <div>
              <h3 className="font-semibold text-black mb-4 font-general uppercase">
                Firma
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <span className="font-medium">NIP:</span> 8992556301
                </li>
                <li>
                  <span className="font-medium">KRS:</span> 0000295667
                </li>
                <li>
                  <span className="font-medium">
                    ZABRODZIE 27, 52-327 ZABRODZIE
                  </span>
                </li>
                <li>
                  <span className="font-medium">Godziny otwarcia:</span> <br />
                  Poniedziałek – Piątek <br /> 7:00 – 16:00
                </li>
              </ul>
            </div>
          </footer>

          <div className="border-t border-stone-200 py-6 flex justify-center">
            <div className="px-3 flex flex-col items-center text-center gap-1 font-medium text-sm uppercase md:flex-row md:justify-between md:text-left w-full max-w-7xl">
              <p className="tracking-tight">
                © {new Date().getFullYear()} BRADOS Wszystkie prawa
                zastrzeżone.
              </p>
              <div className="flex items-center gap-1 text-sm font-medium">
                <span>MADE WITH</span>
                <Heart size={14} className="text-red-500 fill-red-500" />
                <span>BY</span>
                <a
                  href="https://github.com/Kuchyyy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition"
                >
                  @KHY
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTAAndFooter;
