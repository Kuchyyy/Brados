import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MAPS_URL } from "../../constants";
import { useInView } from "../../hooks/useInView";
import { LogoMark } from "../../ui/LogoMark";
import { LINE_GAP } from "../../ui/reveal";
import { RevealLine } from "../../ui/RevealLine";
import { SilkBg } from "../../ui/SilkBg";
import { SalesButton } from "../../ui/SalesButton";
import { SplitButton } from "../../ui/SplitButton";

export function Cta() {
  const [ref, inView] = useInView<HTMLDivElement>("0px", 0.4);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);
  const enter = shown ? "ns-fade-up" : "opacity-0";
  const delay = (i: number) => ({ animationDuration: "700ms", animationDelay: `${i * 100}ms` });

  return (
    <section id="kontakt" className="pb-2 pt-24 md:pb-4 md:pt-36">
      <div className="maxw">
        <div className="relative isolate overflow-hidden rounded-xs px-5 py-20 text-white md:py-28">
          <SilkBg />
          <div ref={ref} className="flex flex-col items-center gap-6 text-center md:gap-8">
            <div className={enter} style={delay(0)}>
              <LogoMark white className="h-7 w-auto md:h-8" />
            </div>
            <h2 className="text-[5.2vw] leading-[1.1] tracking-[-0.025em] sm:text-[32px] sm:leading-[1.2]">
              <RevealLine text="Powiedz, czego potrzebujesz," />
              <RevealLine text="a my zajmiemy się resztą" delay={LINE_GAP} />
            </h2>
            <div
              className={cn("flex flex-wrap items-center justify-center gap-3 text-[#0A0A0A]", enter)}
              style={delay(2)}
            >
              <SalesButton size="sm" tone="white" label="Kontakt" />
              <SplitButton label="Google Maps" href={MAPS_URL} external size="sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
