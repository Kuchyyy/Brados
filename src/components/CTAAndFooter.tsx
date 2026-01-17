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
    if (!ctaBlockRef.current || !fillRef.current) return;

    gsap.set(fillRef.current, {
      width: "0%",
      height: "0%",
    });

    const fillTl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaBlockRef.current,
        start: "top 70%",
        end: "bottom 20%",
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: -1,
      },
    });

    fillTl.to(fillRef.current, {
      width: "320%",
      height: "320%",
      ease: "none",
    });

    return () => {
      fillTl.scrollTrigger?.kill();
      fillTl.kill();
    };
  }, []);

  useEffect(() => {
    if (!ctaBlockRef.current) return;

    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaBlockRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: -1,
      },
    });

    textTl.to(textRefs.current, {
      color: "#ffffff",
      ease: "none",
    });

    return () => {
      textTl.scrollTrigger?.kill();
      textTl.kill();
    };
  }, []);


  useEffect(() => {
    const refreshScrollTrigger = () => {

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };


    if (document.readyState === "complete") {
      refreshScrollTrigger();
    } else {
      window.addEventListener("load", refreshScrollTrigger);
    }

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);


    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", refreshScrollTrigger);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
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
              className="absolute -bottom-50 left-1/2 -translate-x-1/2 w-0 h-0 rounded-full bg-black border-20 border-accent-orange blur-smooth pointer-events-none"
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

          <div className="relative z-20 mx-auto mt-2 bg-stone-50 border border-black/30 rounded-xl">
            <footer className="px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-x-14 gap-y-8 text-sm font-poppins tracking-tight">
                <div className="md:col-span-2 flex flex-col gap-4">
                  <div className="flex items-center gap-6  text-sm tracking-tight ">
                    <img
                      src="/photos/brados.webp"
                      alt="BRADOS logo"
                      className="w-10 h-10 object-contain"
                    />

                    <div className="flex items-center gap-3 ">
                      <div className="relative flex items-center justify-center">
                        <span
                          className="
          absolute inline-flex h-4 w-4 rounded-full
          bg-accent-orange opacity-75
          animate-[ripple_2s_ease-out_infinite]
        "
                        />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-orange" />
                      </div>

                      <span className="text-sm font-poppins text-soft-black/60 whitespace-nowrap">
                        zawsze dostępni dla{" "}
                        <span className="text-accent-orange">Ciebie</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-black/80 max-w-xs leading-relaxed">
                    Kompleksowe zaopatrzenie w materiały elektryczne i
                    telekomunikacyjne dla firm wykonawczych oraz klientów
                    biznesowych.
                  </p>

                  <div className="flex flex-col gap-2 text-xs text-zinc-500">
                    <span>© {new Date().getFullYear()} Brados</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-zinc-900 font-medium">Oferta</h3>
                  <ul className="space-y-2 text-zinc-600">
                    {oferta1.map((page) => (
                      <li key={page.id} className="group">
                        <Link
                          to={`/${page.slug}`}
                          className="relative hover:text-accent-orange transition"
                        >
                          {page.title}
                          <div className="absolute bottom-0 -left-2 w-0.5 h-0 bg-accent-orange transition-all duration-300 group-hover:h-full" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-zinc-900 font-medium">Oferta</h3>
                  <ul className="space-y-2 text-zinc-600">
                    {oferta2.map((page) => (
                      <li key={page.id} className="group">
                        <Link
                          to={`/${page.slug}`}
                          className="relative hover:text-accent-orange transition"
                        >
                          {page.title}
                          <div className="absolute bottom-0 -left-2 w-0.5 h-0 bg-accent-orange transition-all duration-300 group-hover:h-full" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-zinc-900 font-medium">Siedziba</h3>
                  <ul className="space-y-2 text-zinc-600 leading-relaxed">
                    <li>Zabrodzie 27</li>
                    <li>52-327 Zabrodzie</li>
                    <li>biuro@brados.pl</li>
                    <li>+48 000 000 000</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-zinc-900 font-medium">Dane</h3>
                  <ul className="space-y-2 text-zinc-600">
                    <li>NIP: 8992556301</li>
                    <li>KRS: 0000295667</li>
                  </ul>
                </div>
              </div>
            </footer>

            <div className="border-t border-stone-200 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-poppins">
              <span>BRADOS sp. z o.o.</span>

              <span>
                Made with{" "}
                <Heart
                  size={12}
                  className="inline-block mb-0.5 fill-red-500 text-red-500"
                />{" "}
                by{" "}
                <a
                  href="tel:+48724788884"
                  className="hover:text-accent-orange transition"
                >
                  Kuchy
                </a>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CTAAndFooter;
