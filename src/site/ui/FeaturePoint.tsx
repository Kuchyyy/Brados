import type { Point } from "../data/why";
import { IconBox } from "./IconBox";

export function FeaturePoint({ point }: { point: Point }) {
  const Icon = point.icon;
  return (
    <div className="ns-hover">
      <div className="flex items-center gap-3 md:block">
        <IconBox>
          <Icon strokeWidth={1.5} />
        </IconBox>
        <p className="text-[15px] leading-snug tracking-[-0.01em] md:mt-3">{point.title}</p>
      </div>
      <p className="mt-2 text-sm leading-[1.45] text-neutral-500 md:mt-1">{point.desc}</p>
    </div>
  );
}
