"use client";

import { useState, useRef, useEffect } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUp,
  Menu,
  X,
  ChevronDown,
  Settings,
  Wifi,
  Zap,
  Box,
  Plug,
  Lightbulb,
  Antenna,
  Circle,
} from "lucide-react";
import { RippleButton } from "./ui/shadcn-io/ripple-button";

const navItems = ["OFERTA", "ZESPÓŁ", "LOKALIZACJA"];

// 🔹 Kategorie powiązane z page.ts (1–10)
const ofertaItems = [
  { id: "1", icon: <Settings size={16} />, label: "Aparatura modułowa i sterowanie", description: "Sterowniki, moduły i automatyka" },
  { id: "2", icon: <Wifi size={16} />, label: "Narzędzia i mierniki", description: "Multimetry, testery i akcesoria" },
  { id: "3", icon: <Zap size={16} />, label: "Sieci niskoprądowe i okablowanie", description: "Instalacje i przewody" },
  { id: "4", icon: <Box size={16} />, label: "Rozdzielnice i obudowy", description: "Bezpieczne obudowy dla instalacji" },
  { id: "5", icon: <Plug size={16} />, label: "Osprzęt elektroinstalacyjny i siłowy", description: "Gniazda, wyłączniki i złącza" },
];

const ofertaItems2 = [
  { id: "6", icon: <Lightbulb size={16} />, label: "Technika świetlna", description: "Lampy, oprawy i oświetlenie LED" },
  { id: "7", icon: <Antenna size={16} />, label: "System tras i mocowania", description: "Kanały, koryta i uchwyty" },
  { id: "8", icon: <Plug size={16} />, label: "Kable i przewody", description: "Przewody energetyczne i sygnałowe" },
  { id: "9", icon: <Zap size={16} />, label: "Ochrona odgromowa", description: "Systemy ochrony przed wyładowaniami" },
  { id: "10", icon: <Circle size={16} />, label: "Pozostałe", description: "Dodatkowe akcesoria i komponenty" },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, setMobileOfertaOpen] = useState(false);

  const { y: currentScrollY } = useWindowScroll();
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isSubpage = location.pathname.startsWith("/page/");

  // 🔹 Funkcja: przejdź na home i przewiń do góry lub do sekcji
  const goHomeAndScroll = (hash?: string) => {
    navigate("/"); 
    setTimeout(() => {
      if (hash) {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const handleNavClick = () => {
    setMobileOpen(false);
    setMobileOfertaOpen(false);
  };

  // Obsługa widoczności navbara przy scrollu
  useEffect(() => {
    if (!navContainerRef.current || mobileOpen) return;

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

  // Animacja navbara
  useEffect(() => {
    if (!navContainerRef.current) return;

    if (mobileOpen) {
      gsap.to(navContainerRef.current, { y: 0, duration: 0.2 });
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
        className={`pointer-events-auto h-16 lg:inset-x-16 top-4 z-50 fixed rounded-xl inset-x-2
          transition-all duration-500 ease-in-out
          ${
            mobileOpen
              ? "bg-white"
              : currentScrollY > 0
              ? "bg-stone-200 backdrop-blur-lg"
              : "bg-transparent"
          }
        `}
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex items-center justify-between w-full px-4">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => goHomeAndScroll()}>
              <img src="/brados.png" alt="Logo" className="w-10" />
            </div>

            {/* Desktop nav */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 mr-3">
                {navItems.map((item) =>
                  item === "OFERTA" ? (
                    <div key={item} className="relative group inline-block">
                      <span className="flex items-center gap-1 nav-hover-btn text-black cursor-pointer">
                        {item}
                        <ChevronDown
                          size={16}
                          className="transition-transform duration-300 group-hover:rotate-180"
                        />
                      </span>
                      <div className="absolute -left-40 mt-2 w-[600px] rounded-lg bg-white text-black shadow-lg opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                        <div className="grid grid-cols-2 gap-4 p-4">
                          {[...ofertaItems, ...ofertaItems2].map(
                            ({ id, icon, label, description }) => (
                              <Link
                                key={id}
                                to={`/page/${id}`}
                                onClick={handleNavClick}
                                className="flex items-start gap-2 p-2 rounded-md hover:bg-stone-100 transition-colors text-left w-full"
                              >
                                {icon}
                                <div>
                                  <p className="font-medium text-sm">{label}</p>
                                  <p className="text-xs text-gray-600">{description}</p>
                                </div>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      key={item}
                      onClick={() => goHomeAndScroll(`#${item.toLowerCase()}`)}
                      className="nav-hover-btn text-black"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              {/* Buttons desktop */}
              <button onClick={() => goHomeAndScroll("#zespół")}>
                <RippleButton className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md font-bold font-robert-medium transition-colors hover:bg-orange-600 hidden md:block">
                  ZADZWOŃ
                </RippleButton>
              </button>

              {isSubpage ? (
                <Link to="/" className="hidden md:flex">
                  <RippleButton className="px-4 py-2 flex items-center gap-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors">
                    ← <span className="uppercase font-robert-medium font-bold">Powrót</span>
                  </RippleButton>
                </Link>
              ) : (
                <RippleButton
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="w-10 h-10 items-center justify-center bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors hidden md:flex"
                >
                  <ArrowUp size={18} />
                </RippleButton>
              )}

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg bg-orange-500 text-white"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navbar;
