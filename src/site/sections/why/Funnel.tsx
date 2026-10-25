import { useEffect, useState } from "react";
import {
  Box,
  Cable,
  Lightbulb,
  Plug,
  ToggleRight,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ORANGE } from "../../constants";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { SolutionsBox } from "./SolutionsBox";

const SOLUTIONS: {
  label: string;
  icon: LucideIcon;
  right: number;
  top: number;
  turnX: number | null;
}[] = [
  { label: "Aparatura modułowa", icon: ToggleRight, right: 284, top: 24, turnX: 469 },
  { label: "Osprzęt elektroinstalacyjny", icon: Plug, right: 419, top: 92, turnX: 453 },
  { label: "Rozdzielnice i obudowy", icon: Box, right: 254, top: 160, turnX: 437 },
  { label: "Technika świetlna", icon: Lightbulb, right: 339, top: 228, turnX: null },
  { label: "Kable i przewody", icon: Cable, right: 206, top: 296, turnX: 437 },
  { label: "Ochrona odgromowa", icon: Zap, right: 352, top: 364, turnX: 453 },
];

const TY = 250;
const R = 8;

export function Funnel({ play }: { play: boolean }) {
  const reduced = useReducedMotion();
  const [hi, setHi] = useState(0);
  useEffect(() => {
    if (!play || reduced) return;
    const id = window.setInterval(() => setHi((v) => (v + 1) % SOLUTIONS.length), 1500);
    return () => window.clearInterval(id);
  }, [play, reduced]);
  return (
    <div className="relative h-[422px] w-[1128px]">
      <svg width={1128} height={422} className="absolute inset-0" aria-hidden="true">
        {SOLUTIONS.map((s, i) => {
          const sy = s.top + 22;
          const d =
            s.turnX === null
              ? `M ${s.right} ${sy} H 564`
              : (() => {
                  const dir = sy < TY ? 1 : -1;
                  const x = s.turnX;
                  return `M ${s.right} ${sy} H ${x - R} Q ${x} ${sy} ${x} ${sy + dir * R} V ${TY - dir * R} Q ${x} ${TY} ${x + R} ${TY}`;
                })();
          return (
            <path
              key={s.label}
              d={d}
              fill="none"
              stroke={ORANGE}
              strokeWidth={1.5}
              strokeDasharray="2 4"
              strokeOpacity={hi === i ? 1 : 0.55}
              className={cn(play && "ns-dash")}
              style={{ transition: "stroke-opacity .4s ease" }}
            />
          );
        })}
        {SOLUTIONS.map((s, i) => (
          <rect
            key={`m${i}`}
            x={s.right - 3}
            y={s.top + 19}
            width={6}
            height={6}
            fill={ORANGE}
            fillOpacity={hi === i ? 1 : 0.45}
            style={{ transition: "fill-opacity .4s ease" }}
          />
        ))}
        <rect x={492.5} y={245.5} width={8} height={8} fill={ORANGE} transform="rotate(45 496.5 249.5)" />
      </svg>
      {SOLUTIONS.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className={cn(
              "absolute flex h-11 items-center gap-2.5 whitespace-nowrap rounded-xs bg-white pl-3.5 pr-4 text-sm transition-colors duration-300",
              hi === i ? "text-[#0A0A0A]" : "text-neutral-700",
            )}
            style={{ right: 1128 - s.right, top: s.top }}
          >
            <Icon className="size-[18px] shrink-0" strokeWidth={1.5} />
            {s.label}
          </div>
        );
      })}
      <div className="absolute left-[564px] top-0">
        <SolutionsBox
          w={564}
          h={422}
          lineY={TY}
          headingSize={36}
          headingTop={56}
          pillWidth={380}
          play={play}
        />
      </div>
    </div>
  );
}
