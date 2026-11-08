import { useEffect, useState } from "react";
import { LogoMark } from "../../ui/LogoMark";
import { SilkBg } from "../../ui/SilkBg";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const AREA = 634;
const STEP_MS = 2000;

const BRANDS: [name: string, ratio: number, ink: number, scale?: number][] = [
  ["hager", 2.991, 0.423],
  ["eti", 1.882, 0.663],
  ["wago", 2.941, 0.36],
  ["legrand", 4.082, 0.38],
  ["gtv", 3.951, 0.504],
  ["emos", 3.765, 1],
  ["ospel", 2.429, 0.489],
  ["kanlux", 4.395, 0.471],
  ["helukabel", 3.855, 0.317],
  ["tracon", 5.614, 0.289, 0.84],
  ["noark", 5.614, 0.547],
  ["awex", 2.657, 0.419],
];

const N = BRANDS.length;
const HALF = Math.floor(N / 2);

const height = (ratio: number, ink: number) => Math.sqrt(AREA / (ratio * Math.sqrt(ink)));

export function CategoryRail({ play }: { play: boolean }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!play || reduced) return;
    const id = window.setInterval(() => setStep((s) => s + 1), STEP_MS);
    return () => clearInterval(id);
  }, [play, reduced]);

  return (
    <div className="relative grid aspect-[564/422] w-full place-items-center [--s:1] [--slot:116px] lg:aspect-[3/2] lg:[--s:1.3] lg:[--slot:150px]">
      <div className="relative h-16 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
        {BRANDS.map(([name, ratio, ink, scale = 1], k) => {
          const pos = ((((k - step) % N) + N) % N) - HALF;
          return (
            <div
              key={name}
              aria-hidden="true"
              className="absolute left-1/2 top-0 ml-[calc(var(--slot)/-2)] flex h-full w-[var(--slot)] items-center justify-center"
              style={{
                transform: `translate3d(calc(${pos} * var(--slot)), 0, 0)`,
                transition: pos === N - 1 - HALF ? "none" : "transform 900ms cubic-bezier(.65,0,.35,1)",
              }}
            >
              <img
                src={`/photos/rail/${name}.webp`}
                alt=""
                className="w-auto max-w-none"
                style={{ height: `calc(var(--s) * ${(height(ratio, ink) * scale).toFixed(1)}px)` }}
              />
            </div>
          );
        })}
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
