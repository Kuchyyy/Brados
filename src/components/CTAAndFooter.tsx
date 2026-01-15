"use client";

import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { pages } from "../data/page";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTAAndFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ctaBlockRef = useRef(null);
  const fillRef = useRef(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  const handleClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector("#zespół")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 250);
    } else {
      document.querySelector("#zespół")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const buttonRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    gsap
      .timeline({
        repeat: -1,
        defaults: { ease: "power2.out" },
      })
      .fromTo(
        rippleRef.current,

        {
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
        },
        {
          scaleX: 1.45,
          scaleY: 1.8,
          opacity: 0,
          duration: 3,
          ease: "power2.out",
        }
      );
  }, []);

  useEffect(() => {
    gsap.set(fillRef.current, {
      width: "0%",
      height: "0%",
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ctaBlockRef.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: true,
          markers: true,
        },
      })

      .to(fillRef.current, {
        width: "320%",
        height: "320%",
        ease: "none",
      })
      .to(textRefs.current, { color: "#ffffff" }, 0);
  }, []);

  const oferta1 = pages.slice(0, 5);
  const oferta2 = pages.slice(5);

  return (
    <div className="w-full flex justify-center items-center border border-black/30 rounded-t-4xl relative overflow-hidden">
      <div className="mt-20 pb-2 sm:pb-10 max-w-[1200px] w-[95%] z-40">
        <section className="relative w-full py-2 rounded-md">
          <div
            ref={ctaBlockRef}
            className="relative sm:overflow-hidden flex flex-col justify-center items-center z-10 text-start sm:text-center w-full py-5 min-h-100 rounded-xl gap-3"
          >
            <div
              ref={fillRef}
              className="absolute -bottom-50 left-1/2 -translate-x-1/2 w-0 h-0 rounded-full bg-black  pointer-events-none"
            />

            <div className=" z-10 flex flex-col justify-center items-center gap-2 text-center">
              <p
                ref={(el) => {
                  textRefs.current[0] = el;
                }}
                className="font-poppins text-sm  tracking-tight text-black"
              >
                Gotowy na współpracę?
              </p>

              <h2
                ref={(el) => {
                  textRefs.current[1] = el;
                }}
                className="font-poppins text-2xl tracking-tight text-black"
              >
                Dołącz do grona <br /> naszych{" "}
                <p className="inline-flex text-accent-orange">klientów</p>
              </h2>
            </div>
            <button
              ref={buttonRef}
              onClick={handleClick}
              className="
    relative w-auto
    px-6 py-2 rounded-md cursor-pointer
    text-black text-xl font-robert-medium
    bg-white
    border border-orange-500/60
    overflow-visible 
  "
            >
              <span className="relative z-10 text-sm">Zadzwoń do nas</span>

              <span
                ref={rippleRef}
                className="
      absolute inset-0 rounded-md
      border border-orange-500
      pointer-events-none
    "
              />
            </button>
          </div>

          <div className="relative z-20 mx-auto mt-2 bg-stone-50 border border-stone-200 rounded-md overflow-hidden">
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
