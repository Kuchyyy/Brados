"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useHomeScroll } from "@/hooks/useHomeScroll";
import NavCtaButtons from "./NavCtaButtons";
import NavToggle from "./NavToggle";
import OfertaMenuContent from "./OfertaMenuContent";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { goHomeAndScroll } = useHomeScroll(() => setOpen(false));

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] border-b border-blackk/10 bg-white/95 backdrop-blur-sm">
        <div className="maxw flex h-16 items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goHomeAndScroll()}
            className="shrink-0 cursor-pointer"
            aria-label="Strona główna"
          >
            <img src="/photos/logo.png" alt="Brados" className="h-9 w-auto" />
          </button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() => goHomeAndScroll("#zespół")}
              className="group h-9 rounded-full bg-hero-btn px-6 font-geist text-sm font-normal text-white shadow-none hover:bg-blackk/90"
            >
              <span className="inline-flex items-center gap-1.5">
                Zespół
                <ArrowRight
                  className="size-3 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                  strokeWidth={3}
                />
              </span>
            </Button>
            <NavToggle open={open} onClick={() => setOpen((prev) => !prev)} />
          </div>
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="top"
          showCloseButton={false}
          className="top-16 flex h-[calc(100dvh-4rem)] flex-col gap-0 border-blackk/10 p-0"
        >
          <SheetTitle className="sr-only">Menu nawigacji</SheetTitle>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <p className="mb-4 font-geist text-[11px] font-normal tracking-[0.12em] text-blackk/35 uppercase">
              Oferta
            </p>
            <OfertaMenuContent
              variant="mobile"
              onItemClick={() => setOpen(false)}
            />
          </div>

          <div className="sticky bottom-0 border-t border-blackk/10 bg-white px-4 py-4">
            <NavCtaButtons
              stacked
              onTeamClick={() => goHomeAndScroll("#zespół")}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
