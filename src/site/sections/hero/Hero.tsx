import { RevealLine } from "../../ui/RevealLine";
import { LINE_GAP } from "../../ui/reveal";
import { BrandStrip } from "./BrandStrip";
import { Img } from "../../ui/Img";
import { HERO_PHONE_WIDTHS, HERO_WIDTHS, photo, photoSet } from "../../ui/responsive";
import { useStableViewportHeight } from "../../hooks/useStableViewportHeight";

export function Hero() {
  const height = useStableViewportHeight();
  return (
    <section id="top">
      <div className="relative h-screen min-h-[520px] overflow-hidden" style={{ height }}>
        <picture>
          <source
            media="(max-width: 639px)"
            srcSet={photoSet("bazatelefon", HERO_PHONE_WIDTHS)}
            sizes="100vw"
          />
          <Img
            tone="dark"
            src={photo("baza", 1440)}
            srcSet={photoSet("baza", HERO_WIDTHS)}
            sizes="100vw"
            fetchPriority="high"
            alt="Siedziba i magazyn Brados przy ul. Kwiatkowskiego 17 we Wrocławiu"
            className="absolute inset-0 size-full object-cover"
          />
        </picture>
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent"
          aria-hidden="true"
        />
        <div className="maxw relative flex h-full items-end pb-10 md:pb-14">
          <h1 className="text-[5.2vw] leading-[1.1] tracking-[-0.025em] text-white sm:text-[32px] md:text-[44px] md:leading-[1.08]">
            <RevealLine text="Hurtownia materiałów elektrycznych" margin="0px" />
            <RevealLine text="i teletechnicznych we Wrocławiu" delay={LINE_GAP} margin="0px" />
          </h1>
        </div>
      </div>
      <div className="maxw pb-6 pt-10 md:py-6">
        <BrandStrip />
      </div>
    </section>
  );
}
