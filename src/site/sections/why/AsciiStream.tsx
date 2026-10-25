import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const ASCII_CELLS = (() => {
  const rnd = lcg(23);
  const offs: number[] = [];
  for (let d = 11; d <= 110; d += 12) offs.push(-d, d);
  const xs: number[] = [];
  for (let x = 2; x <= 82; x += 9) xs.push(x);
  const cells: { x: number; y: number; ch: string; o: number }[] = [];
  const free = (x: number, y: number) =>
    Math.abs(y) >= 7 &&
    cells.every((c) => Math.abs(c.x - x) >= 8 || Math.abs(c.y - y) >= 11);
  for (const dy of offs) {
    let gap = 0;
    for (const x of xs) {
      const t = x / 86;
      const y = Math.round(dy * (1 - 0.5 * t));
      if (gap > 0) {
        gap--;
        continue;
      }
      if (rnd() < 0.12 + Math.abs(dy) / 400) {
        gap = Math.floor(rnd() * 2);
        continue;
      }
      const o =
        0.95 * Math.exp(-Math.pow(dy / 70, 2)) * (0.55 + 0.45 * t) * (0.5 + rnd() * 0.5);
      if (o < 0.06 || !free(x, y)) continue;
      const r = rnd();
      const ch = r < 0.45 ? "0" : r < 0.9 ? "1" : r < 0.95 ? ":" : "/";
      cells.push({ x, y, ch, o: Math.min(1, o) });
    }
  }
  return cells;
})();

export function AsciiStream({ lineY, play }: { lineY: number; play: boolean }) {
  const reduced = useReducedMotion();
  const [chars, setChars] = useState(() => ASCII_CELLS.map((c) => c.ch));
  useEffect(() => {
    if (!play || reduced) return;
    const id = window.setInterval(() => {
      setChars((prev) =>
        prev.map((ch, i) =>
          ASCII_CELLS[i].ch === ":" || ASCII_CELLS[i].ch === "/" || Math.random() > 0.18
            ? ch
            : ch === "0"
              ? "1"
              : "0",
        ),
      );
    }, 220);
    return () => window.clearInterval(id);
  }, [play, reduced]);
  return (
    <div className="ns-mono pointer-events-none absolute left-0 top-0 text-[9px] leading-[11px]" aria-hidden="true">
      {ASCII_CELLS.map((c, i) => (
        <span
          key={i}
          className={cn("absolute", play && "ns-drift")}
          style={{
            left: c.x,
            top: lineY + c.y - 5.5,
            color: `rgba(255,255,255,${c.o})`,
            animationDelay: `${(-c.x / 86) * 2.6}s`,
          }}
        >
          {chars[i]}
        </span>
      ))}
    </div>
  );
}
