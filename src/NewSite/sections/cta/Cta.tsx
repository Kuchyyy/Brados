import { MAPS_URL } from "../../constants";
import { RevealLine } from "../../ui/RevealLine";
import { LINE_GAP } from "../../ui/reveal";
import { SalesButton } from "../../ui/SalesButton";
import { SplitButton } from "../../ui/SplitButton";

export function Cta() {
  return (
    <section id="kontakt" className="py-16 md:py-24">
      <div className="maxw">
        <div className="relative isolate flex flex-col items-start gap-6 overflow-hidden rounded-xs bg-neutral-100 p-4 md:gap-8 md:px-16 md:py-24">
          <h2 className="px-2 text-[5.2vw] leading-[1.1] md:px-0 tracking-[-0.025em] sm:text-[32px] sm:leading-[1.2]">
            <RevealLine text="Powiedz, czego potrzebujesz," />
            <RevealLine text="a my zajmiemy się resztą" delay={LINE_GAP} />
          </h2>
          <div className="flex flex-wrap items-center gap-3 px-2 pb-2 md:p-0">
            <SalesButton size="sm" tone="white" label="Kontakt" />
            <SplitButton label="Google Maps" href={MAPS_URL} external size="sm" />
          </div>
          <img
            src="/photos/nowa/biuro-gora.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="order-first -mx-4 -mt-4 aspect-[16/10] w-[calc(100%+2rem)] max-w-none object-cover [mask-image:linear-gradient(to_top,transparent,black_22%)] md:order-none md:absolute md:inset-y-0 md:right-0 md:-z-10 md:m-0 md:aspect-auto md:h-full md:w-[70%] md:[mask-image:linear-gradient(100deg,transparent_8%,black_62%)]"
          />
        </div>
      </div>
    </section>
  );
}
