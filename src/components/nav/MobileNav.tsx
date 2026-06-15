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
          className="top-16 z-[59] flex h-[calc(100dvh-4rem)] flex-col gap-0 border-blackk/10 p-0"
          overlayClassName="z-[58]"
        >
          <SheetTitle className="sr-only">Menu nawigacji</SheetTitle>

          <div className="flex-1 overflow-y-auto px-5 py-5 pb-36">
            <div className="mb-6">

              <p className="mt-2 max-w-sm font-geist text-sm leading-relaxed text-blackk/70">
                Kompleksowa oferta materiałów elektrycznych i teletechnicznych
                dla instalatorów, wykonawców i inwestorów.
              </p>
            </div>
            <OfertaMenuContent
              variant="mobile"
              onItemClick={() => setOpen(false)}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-blackk/10 bg-white px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
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
