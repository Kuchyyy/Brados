"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const titleWrapperRef = useRef<HTMLDivElement | null>(null);

  const [maskHeight, setMaskHeight] = useState(0);
  const [textH, setTextH] = useState(0);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  useEffect(() => {
    if (isMobile) {
      setMaskHeight(0);
    }
  }, [isMobile]);

  useEffect(() => {
    const measure = () => {
      if (!textRef.current) return;
      setTextH(textRef.current.getBoundingClientRect().height);
    };

    const onScroll = () => {
      if (!textRef.current || !imageRef.current) return;

      const textRect = textRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();

      if (imageRect.top >= window.innerHeight) {
        setMaskHeight(0);
        return;
      }

      const overlap = textRect.bottom - imageRect.top;
      const h = Math.min(Math.max(overlap, 0), textRect.height);

      setMaskHeight(h);
    };

    measure();
    onScroll();

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      if (!titleWrapperRef.current || !imageRef.current) return;

      gsap.set(titleWrapperRef.current, {
        opacity: 1,
        scale: 1,
        transformOrigin: "center top",
      });

      const ctx = gsap.context(() => {
        requestAnimationFrame(() => {
          gsap.fromTo(
            titleWrapperRef.current,
            {
              opacity: 1,
              scale: 1,
            },
            {
              opacity: 0,
              scale: 0.9,
              ease: "none",
              scrollTrigger: {
                trigger: imageRef.current,
                start: "80% 60%",
                end: "100% 40%",
                scrub: true,
              },
            }
          );
        });
      });

      return () => ctx.revert();
    }
  }, [isMobile]);

  const topInset = Math.max(textH - maskHeight, 0);

  return (
    <section className="w-full pt-40 relative">
      <div className="flex flex-col justify-center items-center font-poppins text-sm tracking-tight">
        <div>Lider w branży</div>
        <div className="text-black/60">
          Tutaj znajdziesz wszysko czego potrzebujesz
        </div>
      </div>
      <div
        className={`${isMobile ? "" : "sticky top-50 z-30"
          } flex flex-col justify-center w-full`}
      >
        <div
          ref={titleWrapperRef}
          className="font-poppins tracking-tight text-[2.5rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] text-center"
        >
          <h1 ref={textRef} className="relative inline-block font-medium">
            <span className="text-black">Hurtownia Brados</span>

            {!isMobile && (
              <span
                className="absolute inset-0 text-white pointer-events-none overflow-hidden"
                style={{ clipPath: `inset(${topInset}px 0 0 0)` }}
              >
                Hurtownia Brados
              </span>
            )}
          </h1>
        </div>
        <a
          href="#zespół"
          className="flex sm:hidden justify-between items-center  self-center mt-2 pl-4 pr-2 gap-4 border border-black/30 rounded-md "
        >
          <div className="flex w-full items-center justify-center text-black py-4 rounded-md text-sm font-poppins tracking-tight">
            Zadzwoń do nas
          </div>
          <div className="bg-accent-orange text-white p-2 rounded-md flex justify-center items-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </a>
      </div>

      <div
        ref={imageRef}
        className="relative w-[95%] max-w-[1200px] mx-auto rounded-xl overflow-hidden mt-2"
      >
        <img
          src="/photos/firma.webp"
          alt="firma"
          className="hidden sm:block w-full h-[90dvh] object-cover"
        />
        <img
          src="/photos/firmatel.webp"
          alt="firma mobile"
          className="sm:hidden w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
