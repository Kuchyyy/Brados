"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const [clip, setClip] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    ScrollTrigger.getAll().forEach((t) => t.kill());

    if (textRef.current) {
      const h = textRef.current.offsetHeight;
      setClip(h);
      gsap.set(textRef.current, { opacity: 1, scale: 1 });
    }

    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!textRef.current || !imageRef.current) return;

      const textRect = textRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();

      const overlap = textRect.bottom - imageRect.top;
      const height = textRect.height;

      const value = Math.min(Math.max(overlap, 0), height);
      setClip(height - value);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!textRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "80% 60%",
            end: "90% 40%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white w-full pt-24 relative">
      <div className="sticky top-40 z-30 flex justify-center">
        <div
          ref={textRef}
          className="relative font-poppins font-medium tracking-normal hero-heading text-center"
        >
          <span className="text-black">Hurtownia Brados</span>

          <span
            className="absolute inset-0 text-white pointer-events-none overflow-hidden"
            style={{
              clipPath:
                clip !== null ? `inset(${clip}px 0 0 0)` : "inset(100% 0 0 0)",
            }}
          >
            Hurtownia Brados
          </span>
        </div>
      </div>

      <div
        ref={imageRef}
        className="relative w-[90%] md:h-[86dvh] max-w-[1440px] mx-auto mt-24 rounded-md overflow-hidden shadow-lg"
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
