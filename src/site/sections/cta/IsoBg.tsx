import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const S = 58;
const U = S * Math.cos(Math.PI / 6);
const GAP = 1.15;
const A: [number, number] = [2 * U * GAP, -S * GAP];
const B: [number, number] = [2 * U * GAP, S * GAP];
const C: [number, number] = [860, 215];
const EASE = "cubic-bezier(.65,0,.35,1)";

const cubePath = (s: number) => {
  const u = s * Math.cos(Math.PI / 6);
  const p = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  return `M${p(0, -s)}L${p(u, -s / 2)}L${p(u, s / 2)}L${p(0, s)}L${p(-u, s / 2)}L${p(-u, -s / 2)}L${p(0, -s)}M${p(-u, -s / 2)}L${p(0, 0)}L${p(u, -s / 2)}M${p(0, 0)}L${p(0, s)}`;
};

const CUBE = cubePath(S);

const CUBES = Array.from({ length: 9 }, (_, i) => i - 4)
  .flatMap((a) => [-1, 0, 1].map((b) => ({ a, b, x: C[0] + a * A[0] + b * B[0], y: C[1] + a * A[1] + b * B[1] })))
  .filter((c) => c.x > 440 && c.x < 1280 && c.y > -80 && c.y < 500);

const K = 0.46;
const LP = (x: number, y: number): [number, number] => [C[0] + (x - 182) * K, C[1] + (y - 191.5) * K];
const LOGO = [
  [[164, 0], [101, 240], [0, 175], [164, 383]],
  [[200, 0], [263, 240], [364, 175], [200, 383]],
]
  .map((poly) => {
    const pts = [...poly, poly[0]].map(([x, y]) => LP(x, y).map((n) => n.toFixed(1)).join(" "));
    return `M${pts.join("L")}`;
  })
  .join("");

const norm = (x: number, y: number): [number, number] => {
  const l = Math.hypot(x, y);
  return [x / l, y / l];
};
const RAYS: { from: [number, number]; dir: [number, number] }[] = [
  { from: LP(0, 175), dir: norm(-164, -208) },
  { from: LP(364, 175), dir: norm(164, -208) },
  { from: LP(164, 383), dir: norm(164, 208) },
  { from: LP(200, 383), dir: norm(-164, 208) },
  { from: LP(164, 0), dir: norm(63, -240) },
  { from: LP(200, 0), dir: norm(-63, -240) },
];
const RAY = 700;

const COMETS = [
  { ray: 0, t: 4.6, d: 0 },
  { ray: 3, t: 5.2, d: 1.3 },
  { ray: 5, t: 4.8, d: 2.6 },
  { ray: 1, t: 5.6, d: 3.4 },
  { ray: 2, t: 5, d: 4.5 },
];

export function IsoBg({ play, wide, className }: { play: boolean; wide: boolean; className?: string }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 3 : 0);

  useEffect(() => {
    if (!play || reduced) return;
    const at = (ms: number, p: number) => window.setTimeout(() => setPhase(p), ms);
    const ids = [at(50, 1), at(1900, 2), at(3000, 3)];
    return () => ids.forEach(clearTimeout);
  }, [play, reduced]);

  return (
    <div aria-hidden="true" className={cn("absolute inset-0 -z-10 overflow-hidden bg-[#1E120B]", className)}>
      <svg
        viewBox={wide ? "0 0 1200 420" : "600 0 520 430"}
        preserveAspectRatio={wide ? "xMidYMid slice" : "xMidYMax meet"}
        overflow="visible"
        className="absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,transparent_30%,black_58%)] md:[mask-image:none]"
      >
        <defs>
          <linearGradient id="ns-iso-tail" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#EA6100" stopOpacity="0" />
            <stop offset="1" stopColor="#FF8A3D" />
          </linearGradient>
          {RAYS.map((r, i) => (
            <linearGradient
              key={i}
              id={`ns-iso-ray-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={r.from[0]}
              y1={r.from[1]}
              x2={r.from[0] + r.dir[0] * RAY}
              y2={r.from[1] + r.dir[1] * RAY}
            >
              <stop offset="0" stopColor="#EA6100" stopOpacity="0.7" />
              <stop offset="1" stopColor="#EA6100" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {RAYS.map((r, i) => (
          <path
            key={i}
            d={`M${r.from[0]} ${r.from[1]}l${r.dir[0] * RAY} ${r.dir[1] * RAY}`}
            pathLength={1}
            fill="none"
            stroke={`url(#ns-iso-ray-${i})`}
            strokeWidth="1"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: phase === 3 ? 0 : 1,
              transition: `stroke-dashoffset 1.4s ${EASE} ${200 + i * 60}ms`,
            }}
          />
        ))}

        {CUBES.map(({ a, b, x, y }) => {
          const chosen = a === 0 && b === 0;
          const order = (a + 4) * 90 + (b + 1) * 45;
          return (
            <g key={`${a}${b}`} transform={`translate(${x} ${y})`}>
              <g
                style={{
                  transformOrigin: "0px 0px",
                  transform: phase === 0 || (chosen && phase === 3) ? "scale(.92)" : "none",
                  opacity: phase === 0 || (!chosen && phase >= 2) || (chosen && phase === 3) ? 0 : 1,
                  transition: chosen
                    ? phase === 3
                      ? `transform .9s ${EASE}, opacity .7s ease`
                      : `transform .9s ${EASE} ${order}ms, opacity .6s ease ${order}ms`
                    : phase >= 2
                      ? `opacity .5s ease ${Math.abs(a) * 50}ms`
                      : `opacity .6s ease ${order}ms, transform .9s ${EASE} ${order}ms`,
                }}
              >
                <path
                  d={CUBE}
                  fill="none"
                  stroke="#fff"
                  strokeOpacity={chosen && phase >= 2 ? 0 : 0.32}
                  strokeDasharray="3 4"
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "stroke-opacity .5s ease" }}
                />
                {chosen && (
                  <path
                    d={CUBE}
                    pathLength={1}
                    fill="none"
                    stroke="#EA6100"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: phase >= 2 ? 0 : 1,
                      transition: `stroke-dashoffset 1.2s ${EASE}`,
                    }}
                  />
                )}
              </g>
            </g>
          );
        })}

        <path
          d={LOGO}
          pathLength={1}
          fill="#EA6100"
          fillOpacity={phase === 3 ? 0.08 : 0}
          stroke="#EA6100"
          strokeWidth="1.2"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: phase === 3 ? 0 : 1,
            transition: `stroke-dashoffset 1.4s ${EASE} 150ms, fill-opacity 1s ease 900ms`,
          }}
        />

        {phase === 3 &&
          !reduced &&
          COMETS.map((c) => {
            const r = RAYS[c.ray];
            const angle = (Math.atan2(-r.dir[1], -r.dir[0]) * 180) / Math.PI;
            return (
              <g key={c.ray} transform={`translate(${r.from[0]} ${r.from[1]}) rotate(${angle.toFixed(1)})`}>
                <g className="ns-comet" style={{ "--t": `${c.t}s`, "--d": `${c.d}s` } as CSSProperties}>
                  <rect x="-110" y="-1" width="110" height="2" rx="1" fill="url(#ns-iso-tail)" />
                  <circle r="2.2" fill="#FFB27A" />
                </g>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
