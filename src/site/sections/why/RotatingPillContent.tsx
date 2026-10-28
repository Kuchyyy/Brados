import { useEffect, useState } from "react";
import { ClipboardCheck, Search, Truck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PILL_ITEMS: { text: string; icon: LucideIcon }[] = [
  { text: "Całe zamówienie w jednym miejscu", icon: ClipboardCheck },
  { text: "Dobór pod Twoją instalację", icon: Search },
  { text: "Dostawa prosto na budowę", icon: Truck },
];
const EVERY = 3200;

export function RotatingPillContent({ play }: { play: boolean }) {
  const reduced = useReducedMotion();
  const [[cur, prev], setState] = useState<[number, number | null]>([0, null]);

  useEffect(() => {
    if (!play || reduced) return;
    let id = 0;
    const start = () => {
      window.clearInterval(id);
      id = window.setInterval(() => {
        if (document.hidden) return;
        setState(([c]) => [(c + 1) % PILL_ITEMS.length, c]);
      }, EVERY);
    };
    start();
    const onVisible = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [play, reduced]);

  return (
    <span className="grid place-items-center">
      {PILL_ITEMS.map((item, k) => {
        const Icon = item.icon;
        const state = k === cur ? "in" : k === prev ? "out" : "idle";
        return (
          <span
            key={k}
            aria-hidden={state !== "in"}
            className={cn(
              "col-start-1 row-start-1 inline-flex items-center gap-2.5 whitespace-nowrap",
              state === "in" && prev !== null && "ns-pill-in",
              state === "out" && "ns-pill-out",
              state === "idle" && "invisible",
            )}
          >
            <Icon className="size-[18px] shrink-0" strokeWidth={1.5} />
            {item.text}
          </span>
        );
      })}
    </span>
  );
}
