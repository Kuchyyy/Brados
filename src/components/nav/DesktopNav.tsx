import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHomeScroll } from "@/hooks/useHomeScroll";
import NavCtaButtons from "./NavCtaButtons";
import OfertaMenuContent from "./OfertaMenuContent";

const CLOSE_DELAY_MS = 200;

type DesktopNavProps = {
  overlay?: boolean;
};

export default function DesktopNav({ overlay = false }: DesktopNavProps) {
  const [ofertaOpen, setOfertaOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { goHomeAndScroll } = useHomeScroll(() => setOfertaOpen(false));

  const openOferta = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOfertaOpen(true);
  };

  const closeOferta = () => {
    closeTimerRef.current = setTimeout(() => {
      setOfertaOpen(false);
    }, CLOSE_DELAY_MS);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        overlay
          ? "border-b border-transparent bg-transparent"
          : "border-b border-blackk/10 bg-white/95 backdrop-blur-sm"
      )}
    >
      <div className="maxw relative">
        <div className="flex h-16 items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => goHomeAndScroll()}
            className="shrink-0 cursor-pointer"
            aria-label="Strona główna"
          >
            <img src="/photos/logo.webp" alt="Brados" className="h-9 w-auto" />
          </button>

          <div className="flex items-center gap-4">
            <div
              className="relative"
              onMouseEnter={openOferta}
              onMouseLeave={closeOferta}
            >
              <span
                aria-expanded={ofertaOpen}
                aria-haspopup="true"
                className={cn(
                  "inline-flex h-9 cursor-default items-center gap-1 rounded-md px-3 font-geist text-sm font-normal transition-colors",
                  overlay
                    ? "text-white hover:bg-white/10"
                    : "text-blackk hover:bg-blackk/5",
                  !overlay && ofertaOpen && "bg-blackk/5"
                )}
              >
                Oferta
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    ofertaOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </span>

              <div
                className={cn(
                  "fixed left-1/2 z-50 w-[90%] max-w-[1400px] -translate-x-1/2 pt-7 transition-all duration-200 ease-out",
                  ofertaOpen
                    ? "pointer-events-auto top-12 translate-y-0 opacity-100"
                    : "pointer-events-none top-12 -translate-y-1 opacity-0"
                )}
              >
                <div className="rounded-md bg-white p-5 shadow-[0_16px_48px_rgba(0,0,0,0.1)] border border-blackk/10">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <OfertaMenuContent
                        variant="desktop"
                        onItemClick={() => setOfertaOpen(false)}
                      />
                    </div>
                    <div className="flex items-center justify-center rounded-md border border-blackk/10 bg-neutral-50 p-2">
                      <img
                        src="/photos/logo3d.webp"
                        alt=""
                        aria-hidden
                        className="h-full max-h-56 w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <NavCtaButtons onTeamClick={() => goHomeAndScroll("#zespół")} />
          </div>
        </div>
      </div>
    </header>
  );
}
