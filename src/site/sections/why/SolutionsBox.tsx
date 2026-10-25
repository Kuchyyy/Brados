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
        className="absolute left-1/2 flex h-[52px] -translate-x-1/2 items-center justify-center rounded-xs border border-white/35 bg-[#ef7927] px-5 text-[17px]"
        style={{
          width: pillWidth,
          top: lineY - 26,
          marginLeft: pillShift,
        }}
      >
        <RotatingPillContent play={play} />
      </div>
    </div>
  );
}
