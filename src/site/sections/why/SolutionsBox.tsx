import { AsciiStream } from "./AsciiStream";
import { RotatingPillContent } from "./RotatingPillContent";

export function SolutionsBox({
  w,
  h,
  lineY,
  headingSize,
  headingTop,
  pillWidth,
  pillShift = 0,
  play,
}: {
  w: number;
  h: number;
  lineY: number;
  headingSize: number;
  headingTop: number;
  pillWidth: number;
  pillShift?: number;
  play: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-xs bg-[#EA6100] text-white" style={{ width: w, height: h }}>
      <div className="ns-noise" aria-hidden="true" />
      <p
        className="absolute inset-x-8 text-center tracking-[-0.01em]"
        style={{ top: headingTop, fontSize: headingSize, lineHeight: 1.08 }}
      >
        Kompletujemy materiały
        <br />
        pod całe systemy
      </p>
      <svg className="absolute left-0" style={{ top: lineY - 2 }} width={w} height={4} aria-hidden="true">
        <line
          x1={0}
          x2={w}
          y1={2}
          y2={2}
          stroke="#fff"
          strokeOpacity={0.6}
          strokeWidth={1.5}
          strokeDasharray="2 4"
          className={play ? "ns-dash" : undefined}
        />
      </svg>
      <AsciiStream lineY={lineY} play={play} />
      <div
        className="absolute left-1/2 flex h-11 -translate-x-1/2 items-center justify-center rounded-xs border border-neutral-200 bg-white px-4 text-sm text-[#0A0A0A]"
        style={{
          width: pillWidth,
          top: lineY - 22,
          marginLeft: pillShift,
        }}
      >
        <RotatingPillContent play={play} />
      </div>
    </div>
  );
}
