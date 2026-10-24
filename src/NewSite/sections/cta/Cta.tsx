import { MAPS_URL } from "../../constants";
import { RevealLine } from "../../ui/RevealLine";
import { LINE_GAP } from "../../ui/reveal";
import { SalesButton } from "../../ui/SalesButton";
import { SplitButton } from "../../ui/SplitButton";

export function Cta() {
  return (
    <section id="kontakt" className="py-16 md:py-24">
      <div className="maxw">
        <div className="flex flex-col items-center gap-6 text-center md:gap-8">
          <h2 className="text-[5.2vw] leading-[1.1] tracking-[-0.025em] sm:text-[32px] sm:leading-[1.2]">
            <RevealLine text="Powiedz, czego potrzebujesz," />
            <RevealLine text="a my zajmiemy się resztą" delay={LINE_GAP} />
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <SalesButton size="sm" tone="soft" label="Kontakt" />
            <SplitButton label="Google Maps" href={MAPS_URL} external size="sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
