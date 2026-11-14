import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type P2 = [number, number];

const BG = "#F5F5F5";
const INK = "#0A0A0A";
const OR = "#EA6100";
const EASE = "cubic-bezier(.65,0,.35,1)";
const C: P2 = [860, 215];

const W = 100;
const H = W * 0.45;
const SIDE = 44;
const STEP = 1.2;
const V1: P2 = [STEP * W, -STEP * H];
const V2: P2 = [STEP * W, STEP * H];
const LIFT = 72;

const f = (n: number) => n.toFixed(1);
const clamp = (t: number) => Math.min(1, Math.max(0, t));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeIn = (t: number) => t ** 3;

function slab(lift: number) {
  const t = -lift;
  const pt: Record<string, P2> = {
    T: [0, -H + t],
    R: [W, t],
    B: [0, H + t],
    L: [-W, t],
    Rb: [W, SIDE],
    Bb: [0, H + SIDE],
    Lb: [-W, SIDE],
  };
  const p = (k: string) => `${f(pt[k][0])} ${f(pt[k][1])}`;
  return {
    fill: `M${p("T")}L${p("R")}L${p("Rb")}L${p("Bb")}L${p("Lb")}L${p("L")}Z`,
    top: `M${p("T")}L${p("R")}L${p("B")}L${p("L")}Z`,
    left: `M${p("L")}L${p("B")}L${p("Bb")}L${p("Lb")}Z`,
    right: `M${p("B")}L${p("R")}L${p("Rb")}L${p("Bb")}Z`,
    line: `M${p("T")}L${p("R")}L${p("B")}L${p("L")}ZM${p("L")}L${p("Lb")}M${p("B")}L${p("Bb")}M${p("R")}L${p("Rb")}M${p("Lb")}L${p("Bb")}L${p("Rb")}`,
  };
}

const FLAT = slab(0);
const RISE = 10;
const REPLAY_MS = 20000;

const GREY = { top: "#FBFBFB", left: "#EEEEEE", right: "#E6E6E6" };
const BLOCK = { top: OR, left: "#C95300", right: "#A84500" };

const hex = (c: string) =>
  [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const [x, y] = [hex(a), hex(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`;
};

const MK = 0.0016;
const EMBOSS_H = 5;
const onTop = ([x, y]: P2): P2 => {
  const u = MK * (x - 182) + 0.5;
  const v = MK * (y - 191.5) + 0.5;
  return [W * (u - v), -H + H * (u + v)];
};
const pathOf = (pts: P2[], dy = 0) =>
  `M${pts.map(([x, y]) => `${f(x)} ${f(y + dy)}`).join("L")}Z`;

const MARK = [
  {
    poly: [
      [164, 0],
      [101, 240],
      [0, 175],
      [164, 383],
    ] as P2[],
    top: "#FFFFFF",
    lit: "#F4E6DC",
    dark: "#DFC6B3",
  },
  {
    poly: [
      [200, 0],
      [263, 240],
      [364, 175],
      [200, 383],
    ] as P2[],
    top: "#FFFFFF",
    lit: "#F4E6DC",
    dark: "#DFC6B3",
  },
]
  .map(({ poly, top, lit, dark }) => {
    const area = poly.reduce((acc, [x, y], i) => {
      const [nx, ny] = poly[(i + 1) % poly.length];
      return acc + x * ny - nx * y;
    }, 0);
    const sgn = Math.sign(area);
    const sides = poly
      .map((a, i) => {
        const b = poly[(i + 1) % poly.length];
        const nu = sgn * (b[1] - a[1]);
        const nv = sgn * (a[0] - b[0]);
        const len = Math.hypot(nu, nv);
        const face = (nu + nv) / len;
        if (face <= 0.02) return null;
        const t = clamp((nu / len - nv / len + 1) / 2);
        const [p, q] = [onTop(a), onTop(b)];
        return {
          d: pathOf([p, q, [q[0], q[1] - EMBOSS_H], [p[0], p[1] - EMBOSS_H]]),
          fill: mix(lit, dark, t),
          depth: (a[0] + b[0] + a[1] + b[1]) / 4,
        };
      })
      .filter((x) => x !== null)
      .sort((x, y) => x.depth - y.depth);
    const base = poly.map(onTop);
    return {
      sides,
      top: pathOf(base, -EMBOSS_H),
      fill: top,
      depth: poly.reduce((acc, [x, y]) => acc + x + y, 0) / poly.length,
    };
  })
  .sort((x, y) => x.depth - y.depth);

const WORD_FW = 0.72;
const WORD_FH = (WORD_FW * Math.hypot(W, H) * 33) / 240 / SIDE;
const ON_LEFT = `matrix(${f(W)} ${f(H)} 0 ${SIDE} ${f(-W)} 0) translate(${(1 - WORD_FW) / 2} 0.22) scale(${WORD_FW / 240} ${WORD_FH / 33})`;

const wave = (x: number, y: number) =>
  Math.round(Math.max(0, x * 0.5 - (y - C[1]) * 0.4));

const CELLS: { key: string; x: number; y: number; delay: number; o: number }[] =
  [];
for (let i = -9; i <= 9; i++)
  for (let j = -7; j <= 7; j++) {
    if (i === 0 && j === 0) continue;
    const x = C[0] + i * V1[0] + j * V2[0];
    const y = C[1] + i * V1[1] + j * V2[1];
    if (x + W < 0 || x - W > 1200 || y + H + SIDE < -20 || y - H > 440)
      continue;
    if (j < -1) continue;
    const haze = 1 - 0.6 * clamp(Math.hypot(x - C[0], y - C[1]) / 720);
    CELLS.push({ key: `${i}_${j}`, x, y, delay: wave(x, y), o: haze });
  }
CELLS.sort((a, b) => a.y - b.y);
const AO = [...CELLS, { x: C[0], y: C[1] }]
  .map(({ x, y }) => {
    const k = 1.06;
    return `M${f(x)} ${f(y + SIDE - H * k)}L${f(x + W * k)} ${f(y + SIDE)}L${f(x)} ${f(y + SIDE + H * k)}L${f(x - W * k)} ${f(y + SIDE)}Z`;
  })
  .join("");
const BACK = CELLS.filter((c) => c.y <= C[1]);
const FRONT = CELLS.filter((c) => c.y > C[1]);

const K = 0.46;
const LIFT_LOGO = 16;
const LP = (x: number, y: number): P2 => [
  C[0] + (x - 182) * K,
  C[1] - LIFT_LOGO + (y - 191.5) * K,
];
const POLYS: P2[][] = [
  [
    [164, 0],
    [101, 240],
    [0, 175],
    [164, 383],
  ],
  [
    [200, 0],
    [263, 240],
    [364, 175],
    [200, 383],
  ],
].map((poly) => poly.map(([x, y]) => LP(x, y)));
const LOGO = POLYS.map(
  (poly) =>
    `M${[...poly, poly[0]].map(([x, y]) => `${f(x)} ${f(y)}`).join("L")}`,
);
const LOGO_COLORS = [INK, OR];

const WORD_W = 112;
const WORD_H = (WORD_W * 33) / 240;
const WORD_X = C[0] - WORD_W / 2;
const WORD_Y = C[1] - LIFT_LOGO + 191.5 * K + 22;

export function IsoBg({
  play,
  wide,
  story = true,
  className,
}: {
  play: boolean;
  wide: boolean;
  story?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? (story ? 3 : 1) : 0);
  const slabs = !story || !reduced;
  const fillRef = useRef<SVGPathElement>(null);
  const whiteRef = useRef<SVGPathElement>(null);
  const orangeRef = useRef<SVGPathElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const raf = useRef(0);
  const [wrapRef, visible] = useInView<HTMLDivElement>("0px", 0);

  useEffect(() => {
    if (!play || reduced) return;
    const at = (ms: number, p: number) =>
      window.setTimeout(() => setPhase(p), ms);
    const ids = story ? [at(50, 1), at(1700, 2), at(3150, 3)] : [at(50, 1)];
    return () => ids.forEach(clearTimeout);
  }, [play, reduced, story]);

  useEffect(() => {
    if (phase !== 2) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = now - t0;
      const rise = easeOut(clamp(t / 900));
      const col = clamp(t / 450);
      const k = 1 - easeIn(clamp((t - 1150) / 650));
      const g = slab(LIFT * rise);
      fillRef.current?.setAttribute("d", g.fill);
      whiteRef.current?.setAttribute("d", g.line);
      orangeRef.current?.setAttribute("d", g.line);
      whiteRef.current?.setAttribute(
        "stroke-opacity",
        String(0.28 * (1 - col)),
      );
      orangeRef.current?.setAttribute("stroke-opacity", String(col));
      const cy = f((SIDE - LIFT * rise) / 2);
      bodyRef.current?.setAttribute(
        "transform",
        `translate(0 ${cy}) scale(${Math.max(k, 0.001)}) translate(0 ${-cy})`,
      );
      if (t < 1850) raf.current = requestAnimationFrame(tick);
      else bodyRef.current?.setAttribute("visibility", "hidden");
    };
    raf.current = requestAnimationFrame(tick);
  }, [phase]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const net = phase === 3;
  const swell = phase >= 1 && !reduced;
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!swell || !visible || story) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setRound((r) => r + 1);
    }, REPLAY_MS);
    return () => clearInterval(id);
  }, [swell, visible, story]);

  const swellCls = swell
    ? cn("ns-swell", round % 2 === 1 && "ns-swell-b")
    : undefined;
  const frame = {
    viewBox: wide ? "0 0 1200 420" : "600 0 520 430",
    preserveAspectRatio: wide ? "xMidYMid slice" : "xMidYMax meet",
    overflow: "visible",
    className: "absolute inset-0 size-full",
  };

  const cell = (c: (typeof CELLS)[number]) => (
    <g key={c.key} transform={`translate(${f(c.x)} ${f(c.y)})`}>
      <g
        className={story ? undefined : swellCls}
        style={
          story
            ? {
                opacity: phase === 1 ? 1 : 0,
                transform: phase === 0 ? "translateY(14px)" : "none",
                transition:
                  phase >= 2
                    ? `opacity .6s ease ${Math.round(Math.hypot(c.x - C[0], c.y - C[1]) * 0.6)}ms`
                    : `opacity .7s ease ${c.delay}ms, transform 1s ${EASE} ${c.delay}ms`,
              }
            : { animationDelay: `${c.delay}ms` }
        }
      >
        <path d={FLAT.top} fill={mix(BG, GREY.top, c.o)} />
        <path d={FLAT.left} fill={mix(BG, GREY.left, c.o)} />
        <path d={FLAT.right} fill={mix(BG, GREY.right, c.o)} />
        <path
          d={FLAT.line}
          fill="none"
          stroke={INK}
          strokeOpacity={f(0.3 * c.o)}
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </g>
  );

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
      style={{ background: BG }}
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_30%,black_58%)] md:[mask-image:none]">
        <svg {...frame}>
          {!story && (
            <>
              <defs>
                <filter
                  id="ns-iso-shadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <path
                d={AO}
                fill={INK}
                fillOpacity="0.09"
                filter="url(#ns-iso-shadow)"
              />
            </>
          )}
          {slabs && BACK.map(cell)}
          {story && slabs && FRONT.map(cell)}

          {story && slabs && (
            <g transform={`translate(${C[0]} ${C[1]})`}>
              <g
                style={{
                  opacity: phase === 0 ? 0 : 1,
                  transform: phase === 0 ? "translateY(14px)" : "none",
                  transition: `opacity .7s ease ${wave(C[0], C[1])}ms, transform 1s ${EASE} ${wave(C[0], C[1])}ms`,
                }}
              >
                <g ref={bodyRef}>
                  <path ref={fillRef} d={FLAT.fill} fill={BG} />
                  <path
                    ref={whiteRef}
                    d={FLAT.line}
                    fill="none"
                    stroke={INK}
                    strokeOpacity={story ? 0.28 : 0}
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    ref={orangeRef}
                    d={FLAT.line}
                    fill="none"
                    stroke={OR}
                    strokeOpacity={story ? 0 : 1}
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </g>
            </g>
          )}

          {story && (
            <>
              {LOGO.map((d, i) => (
                <path
                  key={d}
                  d={d}
                  pathLength={1}
                  fill={LOGO_COLORS[i]}
                  fillOpacity={net ? 1 : 0}
                  stroke={LOGO_COLORS[i]}
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: net ? 0 : 1,
                    transition: `stroke-dashoffset 1.3s ${EASE} 250ms, fill-opacity .8s ease 1200ms`,
                  }}
                />
              ))}

              <defs>
                <clipPath id="ns-brados-clip">
                  <rect
                    x={f(WORD_X - 4)}
                    y={f(WORD_Y - 4)}
                    width={WORD_W + 8}
                    height={f(WORD_H + 8)}
                  />
                </clipPath>
              </defs>
              <g clipPath="url(#ns-brados-clip)">
                <g
                  style={{
                    transform: net
                      ? "none"
                      : `translateY(${f(WORD_H * 1.4)}px)`,
                    transition: `transform .9s cubic-bezier(.22,1,.36,1) 1300ms`,
                  }}
                >
                  <image
                    href="/photos/brados-napis.webp"
                    x={f(WORD_X)}
                    y={f(WORD_Y)}
                    width={WORD_W}
                    height={f(WORD_H)}
                  />
                </g>
              </g>
            </>
          )}
        </svg>

        {!story && (
          <>
            <div
              className={cn("absolute inset-0", swellCls)}
              style={{ animationDelay: `${wave(C[0], C[1])}ms` }}
            >
              <div className="absolute inset-0 will-change-transform">
                <svg {...frame}>
                  <defs>
                    <filter id="ns-white" x="0" y="0" width="1" height="1">
                      <feFlood floodColor="#fff" />
                      <feComposite in2="SourceAlpha" operator="in" />
                    </filter>
                    <clipPath id="ns-wall">
                      <path d={FLAT.left} />
                    </clipPath>
                  </defs>
                  <g>
                    <g transform={`translate(${C[0]} ${C[1] - RISE})`}>
                      <g
                        className={reduced ? undefined : "ns-bob"}
                        style={{
                          animationPlayState: visible ? "running" : "paused",
                        }}
                      >
                        <path d={FLAT.top} fill={BLOCK.top} />
                        <path d={FLAT.left} fill={BLOCK.left} />
                        <path d={FLAT.right} fill={BLOCK.right} />
                        {MARK.map((m, i) => (
                          <g key={i}>
                            {m.sides.map((sd) => (
                              <path
                                key={sd.d}
                                d={sd.d}
                                fill={sd.fill}
                                stroke={sd.fill}
                                strokeWidth="0.4"
                                strokeLinejoin="round"
                              />
                            ))}
                            <path d={m.top} fill={m.fill} />
                          </g>
                        ))}
                        <g clipPath="url(#ns-wall)">
                          <g>
                            <image
                              href="/photos/brados-napis.webp"
                              width="240"
                              height="33"
                              transform={ON_LEFT}
                              filter="url(#ns-white)"
                            />
                          </g>
                        </g>
                        <path
                          d={FLAT.line}
                          fill="none"
                          stroke={INK}
                          strokeOpacity="0.3"
                          strokeDasharray="4 4"
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <svg {...frame}>{FRONT.map(cell)}</svg>
          </>
        )}
      </div>
    </div>
  );
}
