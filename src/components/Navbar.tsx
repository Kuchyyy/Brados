import { useState, useRef, useEffect } from 'react'
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { ArrowUp, Menu, X } from "lucide-react";
import { RippleButton } from './ui/shadcn-io/ripple-button';

const navItems = ['OFERTA', 'ZESPÓŁ', 'LOKALIZACJA'];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { y: currentScrollY } = useWindowScroll();
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = () => {
    setMobileOpen(false); // zamyka panel po kliknięciu linku
  };

  // Obsługa widoczności navbara przy scrollu
  useEffect(() => {
    if (!navContainerRef.current || mobileOpen) return; // 🚫 nie chowaj navbaru gdy menu otwarte

    if (currentScrollY === 0) {
      setIsVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScroll) {
      setIsVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScroll) {
      setIsVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScroll(currentScrollY);
  }, [currentScrollY, lastScroll, mobileOpen]);

  // Animacja navbara (wysuwanie góra/dół) — ale nie gdy menu otwarte
  useEffect(() => {
    if (!navContainerRef.current) return;

    if (mobileOpen) {
      gsap.to(navContainerRef.current, { y: 0, duration: 0.2 }); // trzyma navbar na stałe
    } else {
      gsap.to(navContainerRef.current, {
        duration: 0.3,
        y: isVisible ? 0 : -100,
        ease: "power1.out",
      });
    }
  }, [isVisible, mobileOpen]);

  // Animacja panelu mobilnego + overlay
  useEffect(() => {
    if (!mobileMenuRef.current || !overlayRef.current) return;

    gsap.to(mobileMenuRef.current, {
      duration: 0.35,
      y: mobileOpen ? 0 : "-100%",
      opacity: mobileOpen ? 1 : 0,
      ease: "power2.out",
      display: mobileOpen ? "block" : "none",
    });

    gsap.to(overlayRef.current, {
      duration: 0.3,
      opacity: mobileOpen ? 0.5 : 0,
      display: mobileOpen ? "block" : "none",
    });
  }, [mobileOpen]);

  return (
    <>
      {/* NAVBAR */}
      <div
        ref={navContainerRef}
        className={`h-16 inset-x-2 top-4 z-50 fixed rounded-xl sm:inset-x-8
          transition-all duration-500 ease-in-out
          ${
            mobileOpen
              ? "bg-white border border-black/10 shadow-lg"
              : currentScrollY > 0
              ? "bg-black backdrop-blur-lg border border-white/10 shadow-lg"
              : "bg-transparent"
          }
        `}
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex items-center justify-between w-full p-4">
            <div className="flex items-center gap-3">
              <img src="brados.png" alt="Logo" className="w-10" />
            </div>
            <div className="flex items-center h-full gap-2 cursor-none">
              {/* Linki desktop */}
              <div className="hidden md:flex mr-3">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={handleNavClick}
                    className={`
                      nav-hover-btn cursor-none
                      ${
                        mobileOpen
                          ? "text-black after:bg-black"
                          : currentScrollY > 0
                          ? "text-white after:bg-white"
                          : "text-black after:bg-black"
                      }
                    `}
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Desktop przyciski */}
              <RippleButton className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md font-bold transition-colors hover:bg-orange-600 hidden md:block cursor-none font-robert-medium">
                ZADZWOŃ
              </RippleButton>

              <RippleButton
                onClick={handleScrollTop}
                className="w-10 h-10 items-center justify-center bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors hidden md:flex cursor-none"
              >
                <ArrowUp size={18} />
              </RippleButton>

              {/* Hamburger dla mobile */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2 rounded-lg ${
                  mobileOpen ? "bg-orange-500 text-white" : "bg-orange-500 text-white"
                }`}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-40 md:hidden"
        style={{ opacity: 0, display: "none" }}
        onClick={() => setMobileOpen(false)}
      />

      {/* PANEL MOBILE */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 left-0 w-full bg-white text-black z-40 md:hidden shadow-lg"
        style={{ display: "none", transform: "translateY(-100%)" }}
      >
        <div className="flex flex-col items-center pt-30 pb-8 gap-6">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={handleNavClick}
              className="text-lg font-general hover:text-orange-500 transition-colors"
            >
              {item}
            </a>
          ))}
          <RippleButton className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md font-bold transition-colors hover:bg-orange-600 cursor-none">
            ZADZWOŃ
          </RippleButton>
        </div>
      </div>
    </>
  );
};

export default Navbar;
