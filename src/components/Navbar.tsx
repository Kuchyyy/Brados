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
  ChevronLeft,
} from "lucide-react";
import { RippleButton } from "./ui/shadcn-io/ripple-button";
import { pages } from "../data/page";

const navItems = ["OFERTA", "ZESPÓŁ", "LOKALIZACJA"];

const ofertaItems = [
  {
    id: "1",
    icon: <Settings size={16} />,
    label: "Aparatura modułowa i sterowanie",
    description: "Sterowniki, moduły i automatyka",
  },
  {
    id: "2",
    icon: <Wifi size={16} />,
    label: "Narzędzia i mierniki",
    description: "Multimetry, testery i akcesoria",
  },
  {
    id: "3",
    icon: <Zap size={16} />,
    label: "Sieci niskoprądowe i okablowanie",
    description: "Instalacje i przewody",
  },
  {
    id: "4",
    icon: <Box size={16} />,
    label: "Rozdzielnice i obudowy",
    description: "Bezpieczne obudowy dla instalacji",
  },
  {
    id: "5",
    icon: <Plug size={16} />,
    label: "Osprzęt elektroinstalacyjny i siłowy",
    description: "Gniazda, wyłączniki i złącza",
  },
];

const ofertaItems2 = [
  {
    id: "6",
    icon: <Lightbulb size={16} />,
    label: "Technika świetlna",
    description: "Lampy, oprawy i oświetlenie LED",
  },
  {
    id: "7",
    icon: <Antenna size={16} />,
    label: "System tras i mocowania",
    description: "Kanały, koryta i uchwyty",
  },
  {
    id: "8",
    icon: <Plug size={16} />,
    label: "Kable i przewody",
    description: "Przewody energetyczne i sygnałowe",
  },
  {
    id: "9",
    icon: <Zap size={16} />,
    label: "Ochrona odgromowa",
    description: "Systemy ochrony przed wyładowaniami",
  },
  {
    id: "10",
    icon: <Circle size={16} />,
    label: "Pozostałe",
    description: "Dodatkowe akcesoria i komponenty",
  },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOfertaOpen, setMobileOfertaOpen] = useState(false);

  const { y: currentScrollY } = useWindowScroll();
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const slugs = pages.map((p) => `/${p.slug}`);
  const isSubpage = slugs.includes(location.pathname);

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
    setMobileOpen(false);
  };

  const handleNavClick = () => {
    setMobileOpen(false);
    setMobileOfertaOpen(false);
  };

  // scroll behavior
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

  // animate navbar show/hide
  useEffect(() => {
    if (!navContainerRef.current) return;

    gsap.to(navContainerRef.current, {
      duration: 0.3,
      y: mobileOpen || isVisible ? 0 : -100,
      ease: "power1.out",
    });
  }, [isVisible, mobileOpen]);

  // animate mobile menu + overlay
  useEffect(() => {
    if (!mobileMenuRef.current || !overlayRef.current) return;

    gsap.to(mobileMenuRef.current, {
      duration: 0.35,
      y: mobileOpen ? 0 : "-100%",
      opacity: mobileOpen ? 1 : 0,
      ease: "power2.out",
      pointerEvents: mobileOpen ? "auto" : "none",
      onStart: () => {
        if (mobileOpen) mobileMenuRef.current?.classList.remove("invisible");
      },
      onComplete: () => {
        if (!mobileOpen) mobileMenuRef.current?.classList.add("invisible");
      },
    });

    gsap.to(overlayRef.current, {
      duration: 0.3,
      opacity: mobileOpen ? 0.5 : 0,
      ease: "power2.out",
      pointerEvents: mobileOpen ? "auto" : "none",
      onStart: () => {
        if (mobileOpen) overlayRef.current?.classList.remove("invisible");
      },
      onComplete: () => {
        if (!mobileOpen) overlayRef.current?.classList.add("invisible");
      },
    });
  }, [mobileOpen]);

  return (
    <div className="fixed top-4 inset-x-0 z-50 pointer-events-none">
      <div className="w-[96%] max-w-[1440px] mx-auto flex justify-center items-center pointer-events-auto">
        <div
          ref={navContainerRef}
          className={`
        h-16 w-full rounded-md transition-all duration-500 ease-in-out
        ${
          mobileOpen
            ? "bg-white"
            : currentScrollY > 0
            ? "bg-stone-50 border border-zinc-700 backdrop-blur-lg"
            : "bg-transparent"
        }
      `}
        >
          <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex items-center justify-between w-full px-4">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => goHomeAndScroll()}
              >
                <img src="/photos/brados.webp" alt="Logo" className="w-10" />
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-3 mr-6">
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
                        <div className="absolute -left-40 mt-2 w-[600px] rounded-md bg-white text-black shadow-lg opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                          <div className="grid grid-cols-2 gap-4 p-4">
                            {[...ofertaItems, ...ofertaItems2].map(
                              ({ id, icon, label, description }) =>
                                (() => {
                                  const page = pages.find(
                                    (p) => p.id === id.toString()
                                  );
                                  return (
                                    <Link
                                      key={id}
                                      to={`/${page?.slug || ""}`}
                                      onClick={handleNavClick}
                                      className="flex items-start gap-2 p-2 rounded-md hover:bg-stone-100 transition-colors text-left w-full"
                                    >
                                      {icon}
                                      <div>
                                        <p className="font-medium text-sm">
                                          {label}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                          {description}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })()
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        key={item}
                        onClick={() =>
                          goHomeAndScroll(`#${item.toLowerCase()}`)
                        }
                        className="nav-hover-btn text-black cursor-pointer"
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>

                <button onClick={() => goHomeAndScroll("#zespół")}>
                  <RippleButton className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-md font-bold font-robert-medium transition-colors hover:bg-orange-600 hidden md:block">
                    ZADZWOŃ
                  </RippleButton>
                </button>

                {isSubpage ? (
                  <Link to="/" className="hidden md:flex">
                    <RippleButton className="px-4 py-2 flex items-center gap-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition-colors">
                      <ChevronLeft size={18} />{" "}
                      <span className="uppercase font-robert-medium font-bold">
                        Powrót
                      </span>
                    </RippleButton>
                  </Link>
                ) : (
                  <RippleButton
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="w-10 h-10 items-center justify-center bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition-colors hidden md:flex"
                  >
                    <ArrowUp size={18} />
                  </RippleButton>
                )}

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden p-2 rounded-md bg-orange-500 text-white"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </nav>
          </header>
        </div>

        {/* overlay */}
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black z-40 md:hidden opacity-0 invisible"
          onClick={() => setMobileOpen(false)}
        />

        {/* mobile menu */}
        <div
          ref={mobileMenuRef}
          className="fixed top-0 left-0 w-full h-full bg-white text-black z-50 md:hidden overflow-y-auto opacity-0 invisible -translate-y-full"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <img src="/photos/brados.webp" alt="Logo" className="w-10" />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-md bg-orange-500 text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col items-start pt-4 pb-8 gap-2 w-full">
            {navItems.map((item) =>
              item === "OFERTA" ? (
                <div key={item} className="w-full">
                  <button
                    onClick={() => setMobileOfertaOpen((prev) => !prev)}
                    className="flex justify-between items-center w-full text-lg font-robert-medium py-3 px-6 border-b border-stone-300"
                  >
                    {item}
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        mobileOfertaOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileOfertaOpen
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-4 py-2 space-y-2">
                      {[...ofertaItems, ...ofertaItems2].map(
                        ({ id, icon, label, description }) =>
                          (() => {
                            const page = pages.find(
                              (p) => p.id === id.toString()
                            );
                            return (
                              <Link
                                key={id}
                                to={`/${page?.slug || ""}`}
                                onClick={handleNavClick}
                                className="flex items-start gap-2 py-2 border-b border-stone-200 text-left w-full"
                              >
                                {icon}
                                <div>
                                  <p className="text-sm font-medium">{label}</p>
                                  <p className="text-xs text-gray-600">
                                    {description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })()
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  key={item}
                  onClick={() => goHomeAndScroll(`#${item.toLowerCase()}`)}
                  className="w-full text-left px-6 text-lg font-robert-medium hover:text-orange-500 border-b border-stone-300 py-3"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
