import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAPS_URL } from "../../constants";
import { Img } from "../../ui/Img";
import { LogoMark } from "../../ui/LogoMark";
import { SalesButton } from "../../ui/SalesButton";
import { SplitButton } from "../../ui/SplitButton";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function Navbar({ solid: forced = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mobileTop, setMobileTop] = useState<number | null>(null);
  const [dept, setDept] = useState<string | null>(null);
  const closeMobile = useCallback(() => {
    setMobileTop(null);
    setDept(null);
  }, []);
  const headerRef = useRef<HTMLElement>(null);
  const mobileOpen = mobileTop !== null;
  const [scrolled, setScrolled] = useState(false);
  const solid = forced || scrolled || open || mobileOpen;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const [teamOnly, setTeamOnly] = useState(false);
  const openMobile = (team: boolean) => {
    setTeamOnly(team);
    setDept(null);
    setMobileTop(headerRef.current?.getBoundingClientRect().bottom ?? 48);
  };
  const toggleMobile = () => (mobileOpen ? closeMobile() : openMobile(false));
  const contactMobile = () =>
    mobileOpen && teamOnly ? closeMobile() : openMobile(true);
  const timer = useRef<number | undefined>(undefined);

  const openMenu = () => {
    window.clearTimeout(timer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("wheel", close, { passive: true });
    window.addEventListener("touchmove", close, { passive: true });
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("wheel", close);
      window.removeEventListener("touchmove", close);
    };
  }, [open]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 hidden bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ease-[cubic-bezier(.23,1,.32,1)] md:block",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={closeSoon}
      >
        <div
          className={cn(
            "relative z-10 border-b",
            !open && !mobileOpen && "transition-colors duration-300",
            solid
              ? "border-neutral-200 bg-white"
              : "border-transparent bg-transparent",
          )}
        >
          <div className="maxw flex h-12 items-center justify-between">
            {mobileOpen && dept ? (
              <button
                type="button"
                onClick={() => setDept(null)}
                className="-ml-1 flex h-8 items-center gap-2.5 pr-2 text-[15px] md:hidden"
              >
                <ChevronLeft
                  className="size-4 text-neutral-400"
                  strokeWidth={1.5}
                />
                {dept}
              </button>
            ) : (
              <Link
                to="/"
                aria-label="Brados, strona główna"
                className="flex shrink-0 items-center gap-2.5"
                onMouseEnter={closeSoon}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <LogoMark white={!solid} className="h-6 w-auto" />
                <Img
                  skeletonClassName="w-[74px] rounded-xs"
                  src="/photos/brados-napis.webp"
                  alt=""
                  className={cn(
                    "h-[11px] w-auto translate-y-px",
                    !solid && "brightness-0 invert",
                  )}
                />
              </Link>
            )}

            <div className="flex h-full items-center gap-2">
              <nav className="hidden items-center md:flex" aria-label="Główna">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls="ns-oferta"
                  onMouseEnter={openMenu}
                  onClick={() => setOpen((o) => !o)}
                  className={cn(
                    "inline-flex h-8 items-center gap-1 rounded-xs pl-3.5 pr-2.5 text-sm outline-none transition-colors",
                    solid
                      ? "hover:bg-neutral-100"
                      : "text-white hover:bg-white/15",
                    open && "bg-neutral-100",
                  )}
                >
                  Oferta
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform duration-300",
                      open && "rotate-180",
                    )}
                    strokeWidth={1.5}
                  />
                </button>
              </nav>
              <span className="hidden md:inline-flex" onMouseEnter={closeSoon}>
                <SalesButton
                  size="sm"
                  tone={solid ? "soft" : "white"}
                  label="Kontakt"
                />
              </span>
              <span className="hidden md:inline-flex" onMouseEnter={closeSoon}>
                <SplitButton
                  label="Google Maps"
                  href={MAPS_URL}
                  external
                  size="sm"
                />
              </span>
              <span className="inline-flex md:hidden">
                <SplitButton
                  label="Kontakt"
                  onClick={contactMobile}
                  size="sm"
                />
              </span>
              <button
                type="button"
                aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
                aria-expanded={mobileOpen}
                aria-controls="ns-mobile-menu"
                onClick={toggleMobile}
                className="relative grid size-8 place-items-center rounded-xs bg-neutral-100 transition-colors hover:bg-neutral-200 md:hidden"
              >
                {mobileOpen ? (
                  <X className="size-5" strokeWidth={1.5} />
                ) : (
                  <>
                    <span className="absolute left-2 top-[13px] h-[1.5px] w-4 rounded-full bg-[#0A0A0A]" />
                    <span className="absolute left-2 top-[18px] h-[1.5px] w-4 rounded-full bg-[#0A0A0A]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <MegaMenu
          open={open}
          onEnter={openMenu}
          onClose={() => setOpen(false)}
        />
      </header>

      {mobileTop !== null && (
        <MobileMenu
          top={mobileTop}
          onClose={closeMobile}
          teamOnly={teamOnly}
          dept={dept}
          onDept={setDept}
        />
      )}
    </>
  );
}
