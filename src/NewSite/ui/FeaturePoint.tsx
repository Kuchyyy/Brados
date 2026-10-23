import NumberFlow from "@number-flow/react";
import type { Point } from "../data/why";
import { useInView } from "../hooks/useInView";
import { IconBox } from "./IconBox";
import { ShuffleNumber } from "./ShuffleNumber";

export function FeaturePoint({ point }: { point: Point }) {
  const Icon = point.icon;
  const [ref, inView] = useInView<HTMLDivElement>("0px", 0.6);
  return (
    <div ref={ref} className="ns-hover">
      <div className="flex items-center gap-3 md:block">
        <IconBox>
          <Icon strokeWidth={1.5} />
        </IconBox>
        <p
          className="text-[15px] leading-snug tracking-[-0.01em] md:mt-3"
          aria-label={point.value === undefined ? undefined : point.title}
        >
          {point.value === undefined ? (
            point.title
          ) : (
            <>
              {point.shuffle ? (
                <span aria-hidden="true">
                  <ShuffleNumber text={point.value.toLocaleString("pl-PL")} play={inView} />
                </span>
              ) : (
                <NumberFlow
                  value={inView ? point.value : 0}
                  locales="pl-PL"
                  willChange
                  aria-hidden="true"
                />
              )}
              {point.suffix}
            </>
          )}
        </p>
      </div>
      <p className="mt-2 text-sm leading-[1.45] text-neutral-500 md:mt-1">{point.desc}</p>
    </div>
  );
}
