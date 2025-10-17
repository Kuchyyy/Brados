import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const ScrollLoader: React.FC = () => {
  const location = useLocation();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const prevPathRef = useRef<string | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (isHome && prevPathRef.current && prevPathRef.current !== "/") {
      setShouldAnimate(true);
    } else {
      setShouldAnimate(false);
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname, isHome]);

  useEffect(() => {
    if (!shouldAnimate) return;

    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "instant" });

    gsap.set(".loader-logo", { opacity: 0, scale: 0.8, y: 30 });
    gsap.set(".loader-title", { opacity: 0, y: 50 });
    gsap.set(loaderRef.current, { opacity: 1, pointerEvents: "all" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.6,
          pointerEvents: "none",
          onComplete: () => {
            document.body.style.overflow = "auto";
          },
        });
      },
    });

    tl.to(".loader-logo", { opacity: 1, scale: 1, y: 0, duration: 0.8 })
      .to(".loader-title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .to({}, { duration: 0.8 });

    return () => {
      gsap.killTweensOf("*");
      document.body.style.overflow = "auto";
    };
  }, [shouldAnimate]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white opacity-0 pointer-events-none"
    >
      <img src="/brados.png" alt="Logo" className="loader-logo w-20 mb-6" />
      <h1 className="loader-title text-2xl md:text-4xl font-bold font-robert-medium text-gray-800 text-center">
        Lider w branży elektrycznej i telekomunikacyjnej
      </h1>
    </div>
  );
};

export default ScrollLoader;
