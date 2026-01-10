"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { pages } from "../data/page";
import { ShineBorder } from "./ui/shine-border";
import { BorderBeam } from "./ui/border-beam";
import { DotPattern } from "./ui/dot-pattern";

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
    <div className="w-full flex justify-center items-center bg-white border-t-2 border-zinc-700 relative">
      <DotPattern className="[mask:radial-gradient(1000px_circle_at_middle,transparent)] absolute inset-0 z-20 text-zinc-700/25 h-full w-full" />
      <div className=" mt-20 pb-2 sm:pb-10 max-w-[1440px] w-[95%] z-40">
        <section className="relative w-full py-6 rounded-md">
          <div className="relative z-10 max-w-3xl mx-auto text-start sm:text-center space-y-10 w-[95%] ">
            <div className="flex flex-col gap-2 mb-2 ml-1">
              <p className="font-medium text-sm uppercase md:text-[16px] tracking-wider text-black">
                Gotowy na współpracę z nami?
              </p>
              <h2 className="uppercase font-extrabold font-robert-medium text-2xl leading-tight md:text-5xl text-black">
                Dołącz do grona <br />
                naszych klientów
              </h2>
            </div>

            <button
              onClick={handleClick}
              className="
    relative overflow-hidden w-full sm:w-auto
    px-6 py-3 rounded-md cursor-pointer
    text-black text-xl font-robert-medium
    bg-white border border-white/30
    hover:scale-[1.02] transition-transform  
  "
            >
              ZADZWOŃ DO NAS
              <ShineBorder shineColor={["#F97316", "#F97316"]} />
              <BorderBeam duration={8} size={30} />
            </button>
          </div>

          <div className="relative z-20 mx-auto mt-12 bg-stone-50 border border-stone-200 rounded-md overflow-hidden">
            <footer className="px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10 min-h-[400px]">
              <div className="col-span-1 space-y-4 flex justify-center flex-col items-center">
                <img
                  src="/photos/brados.webp"
                  alt="BRADOS logo"
                  className="w-28 md:w-32 object-contain"
                />
              </div>

              <div className="flex items-start flex-col justify-center">
                <h3 className="font-robert-medium text-black mb-4 font-bold uppercase">
                  Oferta
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 font-robert-medium">
                  {oferta1.map((page) => (
                    <li key={page.id}>
                      <Link
                        to={`/${page.slug}`}
                        className="hover:text-accent-orange transition text-left w-full block"
                      >
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
                      <Link
                        to={`/${page.slug}`}
                        className="hover:text-accent-orange transition text-left w-full block cursor-pointer"
                      >
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
                    <span className="font-medium">Godziny otwarcia:</span>
                    <br />
                    Poniedziałek – Piątek <br />
                    7:00 – 16:00
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
                    className="hover:text-accent-orange transition"
                  >
                    @KHY
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CTAAndFooter;
