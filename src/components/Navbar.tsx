"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Settings,
  Wifi,
  Zap,
  Box,
  Plug,
  Lightbulb,
  Antenna,
  Circle,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { pages } from "../data/page";

const navItems = ["Oferta", "Zespół", "Lokalizacja"];

const ofertaItems = [
  {
    id: "1",
    icon: <Settings size={16} />,
    label: "Aparatura modułowa i sterowanie",
  },
  { id: "2", icon: <Wifi size={16} />, label: "Narzędzia i mierniki" },
  {
    id: "3",
    icon: <Zap size={16} />,
    label: "Sieci niskoprądowe i okablowanie",
  },
  { id: "4", icon: <Box size={16} />, label: "Rozdzielnice i obudowy" },
  {
    id: "5",
    icon: <Plug size={16} />,
    label: "Osprzęt elektroinstalacyjny i siłowy",
  },
  { id: "6", icon: <Lightbulb size={16} />, label: "Technika świetlna" },
  { id: "7", icon: <Antenna size={16} />, label: "System tras i mocowania" },
  { id: "8", icon: <Plug size={16} />, label: "Kable i przewody" },
  { id: "9", icon: <Zap size={16} />, label: "Ochrona odgromowa" },
  { id: "10", icon: <Circle size={16} />, label: "Pozostałe" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeView, setActiveView] = useState<"menu" | "oferta">("menu");

  const isOfferta = activeView === "oferta";

  const navRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<HTMLDivElement | null>(null);
  const prevView = useRef<"menu" | "oferta">("menu");

  const navigate = useNavigate();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const closeNavbar = () => {
    setOpen(false);
    gsap.delayedCall(0.5, () => setActiveView("menu"));
  };

  const goHomeAndScroll = (hash?: string) => {
    navigate("/");
    setTimeout(() => {
      if (hash)
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
    closeNavbar();
  };

  useEffect(() => {
    if (!navRef.current || !contentRef.current) return;

    gsap.set(navRef.current, { width: isMobile ? "90%" : 400 });
    gsap.set(contentRef.current, {
      maxHeight: 0,
      opacity: 0,
      overflow: "hidden",
      pointerEvents: "none",
    });
  }, []);

  useEffect(() => {
    if (!navRef.current || !contentRef.current) return;

    gsap.to(contentRef.current, {
      maxHeight: open ? "70svh" : 0,
      opacity: open ? 1 : 0,
      duration: 0.4,
      ease: open ? "power3.out" : "power2.inOut",
      pointerEvents: open ? "auto" : "none",
    });

    gsap.to(navRef.current, {
      width: open ? (isMobile ? "96%" : 600) : isMobile ? "90%" : 400,
      duration: 0.45,
      ease: open ? "back.out(1.3)" : "power2.inOut",
    });
  }, [open, isMobile]);

  useEffect(() => {
    if (!viewRef.current) return;

    const fromX =
      prevView.current === "menu" && activeView === "oferta"
        ? -30
        : prevView.current === "oferta" && activeView === "menu"
        ? 30
        : 0;

    gsap.fromTo(
      viewRef.current,
      { opacity: 0, x: fromX },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
    );

    prevView.current = activeView;
  }, [activeView]);

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center">
      <div ref={navRef} className="rounded-xl bg-white border border-black/30">
        <div className="h-16 flex items-center justify-between px-4">
          <img
            src="/photos/brados.webp"
            className="w-10 cursor-pointer"
            onClick={() => goHomeAndScroll()}
          />
          <span className="uppercase text-2xl">brados</span>
          <button
            onClick={() => (open ? closeNavbar() : setOpen(true))}
            className="p-2 hover:bg-black/5 rounded-md cursor-pointer"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <div ref={contentRef} className="flex flex-col overflow-y-auto">
          <div className="grid py-5 px-2 gap-2">
            <div ref={viewRef} className="flex flex-col">
              {activeView === "menu" &&
                navItems.map((item) =>
                  item === "Oferta" ? (
                    <button
                      key={item}
                      onClick={() => setActiveView("oferta")}
                      className="p-2 flex justify-between text-xl hover:bg-black/5 rounded-md cursor-pointer"
                    >
                      {item}
                      <ArrowUpRight />
                    </button>
                  ) : (
                    <button
                      key={item}
                      onClick={() => goHomeAndScroll(`#${item.toLowerCase()}`)}
                      className="p-2 text-left text-xl hover:bg-black/5 rounded-md cursor-pointer"
                    >
                      {item}
                    </button>
                  )
                )}

              {activeView === "oferta" &&
                ofertaItems.map(({ id, icon, label }) => {
                  const page = pages.find((p) => p.id === id);
                  return (
                    <Link
                      key={id}
                      to={`/${page?.slug}`}
                      onClick={closeNavbar}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-black/5 rounded-md cursor-pointer"
                    >
                      {icon}
                      <span>{label}</span>
                    </Link>
                  );
                })}
            </div>

            <div
              className={`flex justify-center rounded-md ${
                isOfferta ? "border-0" : "border border-black/30"
              }`}
            >
              {activeView === "oferta" ? (
                <button
                  onClick={() => setActiveView("menu")}
                  className="inline-flex w-full justify-center items-center -m-1 gap-2 px-4 py-2 rounded-md border border-accent-orange bg-white hover:bg-accent-orange hover:text-white cursor-pointer"
                >
                  <ArrowLeft size={18} />
                  <span>Wróć</span>
                </button>
              ) : (
                <img src="/photos/logo3d.webp" className="h-32 " />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between px-3 mb-4 text-xs uppercase text-black/40">
            <span>Gwarancja</span>
            <span>Niezawodność</span>
            <span>Doświadczenie</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
