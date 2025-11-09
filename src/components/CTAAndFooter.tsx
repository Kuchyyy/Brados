"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { pages } from "../data/page";
import { ShineBorder } from "./ui/shine-border";

const CTAAndFooter = () => {
  const [siteAlert, setSiteAlert] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector("#zespół");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 250);
    } else {
      const el = document.querySelector("#zespół");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!siteAlert) return;
    const timer = setTimeout(() => setSiteAlert(null), 2000);
    return () => clearTimeout(timer);
  }, [siteAlert]);

  const oferta1 = pages.slice(0, 5);
  const oferta2 = pages.slice(5);

  return (
    <div className="relative mt-20 pb-2 sm:pb-10 bg-radial-[at_50%_50%] from-stone-400 via-stone-100 to-stone-100">
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

      <section className="relative max-w-[100%] mx-auto py-6 rounded-3xl">
        <div className="relative z-10 max-w-3xl mx-auto text-start sm:text-center space-y-10 w-[96%]">
          <div className="flex flex-col gap-2 mb-6 ml-1">
            <p className="font-medium text-sm uppercase md:text-[16px] tracking-wider text-black">
              Gotowy na współpracę z nami?
            </p>
            <h2 className="uppercase font-extrabold font-robert-medium text-2xl leading-tight md:text-5xl text-black">
              Dołącz do grona <br />naszych klientów
            </h2>
          </div>

          <button
            onClick={handleClick}
            className="relative overflow-hidden w-full sm:w-auto px-6 py-3 rounded-xl text-black text-xl bg-white font-robert-medium hover:scale-[1.02] transition-transform"
          >
            ZADZWOŃ DO NAS
            <ShineBorder shineColor={["#C2410C", "#F97316", "#FDBA74"]} />
          </button>
        </div>

        <div className="relative z-20 max-w-[96%] mx-auto mt-12 bg-stone-50 border border-stone-200 rounded-3xl overflow-hidden">
          <footer className="px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10 min-h-[400px]">
            <div className="col-span-1 space-y-4 flex justify-center flex-col items-center">
              <img src="/brados.png" alt="BRADOS logo" className="w-28 md:w-32 object-contain" />
            </div>

            <div className="flex items-start flex-col justify-center">
              <h3 className="font-robert-medium text-black mb-4 font-bold uppercase">
                Oferta
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 font-robert-medium">
                {oferta1.map((page) => (
                  <li key={page.id}>
                    <Link to={`/${page.slug}`} className="hover:text-orange-500 transition text-left w-full block">
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start flex-col justify-center">
              <h3 className="font-bold text-black mb-4 font-robert-medium uppercase">
                Oferta
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 font-robert-medium">
                {oferta2.map((page) => (
                  <li key={page.id}>
                    <Link to={`/${page.slug}`} className="hover:text-orange-500 transition text-left w-full block">
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start flex-col justify-center">
              <h3 className="font-bold text-black mb-4 font-robert-medium uppercase">
                Firma
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 font-robert-medium">
                <li><span className="font-medium">NIP:</span> 8992556301</li>
                <li><span className="font-medium">KRS:</span> 0000295667</li>
                <li><span className="font-medium">ZABRODZIE 27, 52-327 ZABRODZIE</span></li>
                <li><span className="font-medium">Godziny otwarcia:</span><br />Poniedziałek – Piątek <br />7:00 – 16:00</li>
              </ul>
            </div>
          </footer>

          <div className="border-t border-stone-200 py-6 flex justify-center">
            <div className="px-3 flex flex-col items-center text-center gap-1 font-medium text-sm uppercase md:flex-row md:justify-between md:text-left w-full max-w-7xl">
              <p className="tracking-tight">
                © {new Date().getFullYear()} BRADOS Wszystkie prawa zastrzeżone.
              </p>
              <div className="flex items-center gap-1 text-sm font-medium">
                <span>MADE WITH</span>
                <Heart size={14} className="text-red-500 fill-red-500" />
                <span>BY</span>
                <a href="https://github.com/Kuchyyy" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
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
