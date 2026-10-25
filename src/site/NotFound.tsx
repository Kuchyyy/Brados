import { useLocation } from "react-router-dom";
import { INK, ORANGE } from "./constants";
import { Layout } from "./Layout";
import { RevealLine } from "./ui/RevealLine";
import { LINE_GAP } from "./ui/reveal";
import { SplitButton } from "./ui/SplitButton";

type P = [number, number];

const LEFT: P[] = [
  [164, 0],
  [101, 240],
  [0, 175],
  [164, 383],
];
const RIGHT: P[] = LEFT.map(([x, y]) => [364 - x, y]);
const XS = [0, 101, 164, 200, 263, 364];
const YS = [0, 175, 240, 383];
const VIEW = { x: -330, y: -290, w: 1024, h: 963 };

const extend = ([ax, ay]: P, [bx, by]: P, k = 6): [P, P] => [
  [ax - (bx - ax) * k, ay - (by - ay) * k],
  [bx + (bx - ax) * k, by + (by - ay) * k],
];

const DIAGONALS = [LEFT, RIGHT].flatMap((pts) => [
  extend(pts[0], pts[1]),
  extend(pts[1], pts[2]),
  extend(pts[2], pts[3]),
]);

const points = (pts: P[]) => pts.map((p) => p.join(",")).join(" ");

const LINES: [P, P][] = [
  ...XS.map((x): [P, P] => [
    [x, VIEW.y],
    [x, VIEW.y + VIEW.h],
  ]),
  ...YS.map((y): [P, P] => [
    [VIEW.x, y],
    [VIEW.x + VIEW.w, y],
  ]),
  ...DIAGONALS,
];

function LogoGrid() {
  return (
    <div className="w-[min(78vw,340px)] overflow-hidden rounded-xs bg-neutral-100">
      <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} className="block w-full" aria-hidden="true">
        <defs>
          <mask
            id="ns-nf-draw"
            maskUnits="userSpaceOnUse"
            x={VIEW.x}
            y={VIEW.y}
            width={VIEW.w}
            height={VIEW.h}
          >
            {LINES.map(([[x1, y1], [x2, y2]], i) => (
              <line
                key={i}
                className="ns-nf-draw"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#FFFFFF"
                strokeWidth={24}
                pathLength={1}
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </mask>
        </defs>
        <g className="ns-nf-guides" mask="url(#ns-nf-draw)" stroke="#DCDCDC" strokeWidth={1} strokeDasharray="4 4">
          {LINES.map(([[x1, y1], [x2, y2]], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        <g className="ns-nf-lift">
          <g fill="none" strokeWidth={1.25} strokeLinejoin="round">
            <polygon
              className="ns-nf-draw"
              points={points(LEFT)}
              stroke={INK}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: "1100ms", animationDuration: "1300ms" }}
            />
            <polygon
              className="ns-nf-draw"
              points={points(RIGHT)}
              stroke={ORANGE}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: "1300ms", animationDuration: "1300ms" }}
            />
          </g>
          <g className="ns-nf-logo">
            <polygon points={points(LEFT)} fill={INK} />
            <polygon points={points(RIGHT)} fill={ORANGE} />
          </g>
        </g>
        <image
          className="ns-nf-word"
          href="/photos/brados-napis.webp"
          x={-8}
          y={395}
          width={380}
          height={52}
        />
      </svg>
    </div>
  );
}

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <Layout
      title="Nie znaleziono strony | Brados"
      description="Ta strona nie istnieje. Wróć do strony głównej hurtowni Brados."
      path={pathname}
      noindex
      bare
    >
      <section className="maxw flex min-h-svh flex-col items-center justify-center gap-6 py-16 text-center md:gap-8">
        <LogoGrid />
        <h1 className="mt-2 text-[5.2vw] leading-[1.1] tracking-[-0.025em] sm:text-[32px] sm:leading-[1.2]">
          <RevealLine text="Ups, źle trafiłeś," margin="0px" />
          <RevealLine text="tej strony tu nie ma" delay={LINE_GAP} margin="0px" />
        </h1>
        <SplitButton label="Wróć do strony głównej" to="/" size="sm" />
      </section>
    </Layout>
  );
}
