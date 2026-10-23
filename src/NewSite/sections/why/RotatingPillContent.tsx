import { useEffect, useState } from "react";
import { ClipboardCheck, Search, Truck, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PILL_ITEMS: { text: string; icon: LucideIcon }[] = [
  { text: "Całe zamówienie w jednym miejscu", icon: ClipboardCheck },
  { text: "Dobór pod Twoją instalację", icon: Search },
  { text: "Dostawa prosto na budowę", icon: Truck },
];
const PILL_ROW_H = 24;

export function RotatingPillContent({ play }: { play: boolean }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    if (!play || reduced) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setI((v) => v + 1);
    }, 3000);
    return () => window.clearInterval(id);
  }, [play, reduced]);
  const list = [...PILL_ITEMS, PILL_ITEMS[0]];
  return (
    <span
      className="relative inline-block overflow-hidden align-middle"
      style={{ height: PILL_ROW_H }}
    >
      <span
        className="flex flex-col items-center"
        style={{
          transform: `translateY(${-i * PILL_ROW_H}px)`,
          transition: animate ? "transform .5s cubic-bezier(.23,1,.32,1)" : "none",
        }}
        onTransitionEnd={() => {
          if (i >= PILL_ITEMS.length) {
            setAnimate(false);
            setI(0);
          }
        }}
      >
        {list.map((item, k) => {
          const Icon = item.icon;
          return (
            <span
              key={k}
              className="inline-flex w-max items-center justify-center gap-3 whitespace-nowrap"
              style={{ height: PILL_ROW_H }}
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={1.5} />
              {item.text}
            </span>
          );
        })}
      </span>
    </span>
  );
}
