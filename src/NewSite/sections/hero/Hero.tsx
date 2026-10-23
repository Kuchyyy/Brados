import { RevealLine } from "../../ui/RevealLine";
import { LINE_GAP } from "../../ui/reveal";
import { BrandStrip } from "./BrandStrip";

export function Hero() {
  return (
    <section id="top">
      <div className="relative h-[calc(100svh-48px)] min-h-[480px] overflow-hidden">
        <picture>
          <source media="(max-width: 639px)" srcSet="/photos/bazatelefon.webp" />
          <img
            src="/photos/baza.webp"
            alt="Siedziba i magazyn Brados przy ul. Kwiatkowskiego 17 we Wrocławiu"
            className="absolute inset-0 size-full object-cover"
          />
        </picture>
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
          aria-hidden="true"
        />
        <div className="maxw relative flex h-full items-end pb-10 md:pb-14">
          <h1 className="text-[5.2vw] leading-[1.1] tracking-[-0.025em] text-white sm:text-[32px] md:text-[44px] md:leading-[1.08]">
            <RevealLine text="Hurtownia materiałów elektrycznych" margin="0px" />
            <RevealLine text="i teletechnicznych we Wrocławiu" delay={LINE_GAP} margin="0px" />
          </h1>
        </div>
      </div>
      <div className="maxw py-6">
        <BrandStrip />
      </div>
    </section>
  );
}
