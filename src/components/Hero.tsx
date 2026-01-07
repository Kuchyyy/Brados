"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const titleWrapperRef = useRef<HTMLDivElement | null>(null);

  const [maskHeight, setMaskHeight] = useState(0);
  const [textH, setTextH] = useState(0);

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
  }, []);

  const topInset = Math.max(textH - maskHeight, 0);

  return (
    <section className="bg-white w-full pt-30 relative">
      <div className="flex flex-col justify-center items-center font-poppins text-sm tracking-tight">
        <div>tutaj moze byc jakis element na gorce np. navbar</div>
        <div className="text-blackk/60">siemka naklejka </div>
      </div>
      <div className="sticky top-40 z-30 flex justify-center">
        <div
          ref={titleWrapperRef}
          className="font-poppins tracking-tight         text-[2.2rem]
          sm:text-[3.2rem]
          md:text-[4rem]
          lg:text-[5rem]
          xl:text-[6rem] text-center"
        >
          <h1 ref={textRef} className="relative inline-block font-medium">
            <span className="text-black">Hurtownia Brados</span>

            <span
              className="absolute inset-0 text-white pointer-events-none overflow-hidden"
              style={{ clipPath: `inset(${topInset}px 0 0 0)` }}
            >
              Hurtownia Brados
            </span>
          </h1>
        </div>
      </div>

      <div
        ref={imageRef}
        className="relative w-[90%] md:h-[90dvh] max-w-[1440px] mx-auto rounded-md overflow-hidden shadow-lg"
      >
        <img
          src="/photos/firma.webp"
          alt="firma"
          className="hidden sm:block w-full h-full object-cover"
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
