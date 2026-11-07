import { LogoMark } from "../../ui/LogoMark";
import { SilkBg } from "../../ui/SilkBg";

const AREA = 634;

const BRANDS: [name: string, ratio: number, ink: number][] = [
  ["hager", 2.991, 0.423],
  ["eti", 1.882, 0.663],
  ["wago", 2.941, 0.36],
  ["legrand", 4.082, 0.38],
  ["gtv", 3.951, 0.504],
  ["emos", 3.765, 1],
  ["ospel", 2.429, 0.489],
  ["kanlux", 4.395, 0.471],
  ["helukabel", 3.855, 0.317],
  ["tracon", 5.614, 0.289],
  ["noark", 5.614, 0.547],
  ["awex", 2.657, 0.419],
];

const height = (ratio: number, ink: number) => Math.sqrt(AREA / (ratio * Math.sqrt(ink)));

export function CategoryRail({ play }: { play: boolean }) {
  return (
    <div className="relative grid aspect-[564/422] w-full place-items-center [--s:1] lg:aspect-[3/2] lg:[--s:1.3]">
      <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
        <div
          className="ns-marquee flex w-max items-center"
          style={{ animationDuration: `${BRANDS.length * 3}s`, animationPlayState: play ? "running" : "paused" }}
        >
          {[0, 1].map((k) =>
            BRANDS.map(([name, ratio, ink]) => (
              <div key={`${k}-${name}`} aria-hidden="true" className="flex h-16 items-center pr-9 lg:pr-12">
                <img
                  src={`/photos/rail/${name}.webp`}
                  alt=""
                  className="w-auto max-w-none"
                  style={{ height: `calc(var(--s) * ${height(ratio, ink).toFixed(1)}px)` }}
                />
              </div>
            )),
          )}
        </div>
      </div>
      <div className="absolute isolate size-20 overflow-hidden rounded-xs p-[2px] lg:size-[100px]">
        <SilkBg />
        <div className="grid size-full place-items-center rounded-[1px] bg-white">
          <LogoMark className="h-10 w-auto lg:h-[50px]" />
        </div>
      </div>
    </div>
  );
}
