import { BRANDS } from "../../data/brands";

export function BrandStrip() {
  const list = [...BRANDS, ...BRANDS];
  return (
    <div className="flex flex-col gap-4 py-2 md:flex-row md:items-center md:gap-8">
      <p className="shrink-0 text-xs leading-[1.5] text-[#0A0A0A]">
        Dostarczamy produkty <br className="hidden md:block" />
        czołowych producentów
      </p>
      <span className="hidden h-8 w-px shrink-0 bg-neutral-200 md:block" aria-hidden="true" />
      <div className="relative h-10 min-w-0 md:flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_120px,black_calc(100%-120px),transparent)]">
        <div className="ns-marquee flex h-full w-max items-center">
          {list.map((b, i) => (
            <img
              key={`${b}-${i}`}
              src={`/photos/nowa/marki/${b}.png`}
              alt={i < BRANDS.length ? b : ""}
              aria-hidden={i >= BRANDS.length || undefined}
              loading="lazy"
              className="mr-16 h-3.5 w-auto opacity-35 transition-opacity duration-200 hover:opacity-70"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
