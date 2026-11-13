import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MAPS_URL } from "../../constants";
import { useInView } from "../../hooks/useInView";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { IsoBg } from "./IsoBg";
import { LINE_GAP } from "../../ui/reveal";
import { RevealLine } from "../../ui/RevealLine";
import { SalesButton } from "../../ui/SalesButton";
import { SplitButton } from "../../ui/SplitButton";

export function Cta() {
  const [ref, inView] = useInView<HTMLDivElement>("0px", 0.4);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);
  const wide = useMediaQuery("(min-width: 768px)");
  const enter = shown ? "ns-fade-up" : "opacity-0";
  const delay = (i: number) => ({ animationDuration: "700ms", animationDelay: `${i * 100}ms` });

  return (
    <section id="kontakt" className="pb-2 pt-24 md:pb-4 md:pt-36">
      <div className="maxw">
        <div className="relative isolate overflow-hidden rounded-xs px-5 pb-[82%] pt-12 text-white md:px-14 md:py-28">
          <IsoBg play={shown} wide={wide} />
          <div ref={ref} className="flex flex-col items-start gap-6 md:gap-8">
            <h2 className="text-[5.2vw] leading-[1.1] tracking-[-0.025em] sm:text-[32px] sm:leading-[1.2]">
              <RevealLine text="Powiedz, czego potrzebujesz," />
              <RevealLine text="a my zajmiemy się resztą" delay={LINE_GAP} />
            </h2>
            <div
              className={cn("flex flex-wrap items-center gap-3 text-[#0A0A0A]", enter)}
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
