import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "../hooks/useInView";
import { LINE_GAP } from "./reveal";

export function RevealText({
  text,
  delay = 0,
  margin = "0px 0px -25% 0px",
}: {
  text: string;
  delay?: number;
  margin?: string;
}) {
  const [ref, shown] = useInView<HTMLSpanElement>(margin, 0, true);
  const measure = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[]>([text]);
  const words = text.split(" ").reduce<string[]>((acc, w) => {
    const last = acc[acc.length - 1];
    if (last !== undefined && last.length === 1) acc[acc.length - 1] = `${last} ${w}`;
    else acc.push(w);
    return acc;
  }, []);

  useLayoutEffect(() => {
    const el = measure.current;
    if (!el) return;
    const run = () => {
      const out: string[] = [];
      let top = -1;
      Array.from(el.children).forEach((w, i) => {
        const t = (w as HTMLElement).offsetTop;
        if (t !== top) {
          out.push(words[i]);
          top = t;
        } else out[out.length - 1] += ` ${words[i]}`;
      });
      setLines((prev) => (prev.join("\n") === out.join("\n") ? prev : out));
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(el);
    document.fonts?.ready.then(run);
    return () => ro.disconnect();
  }, [text]);

  return (
    <span ref={ref} className="relative block">
      <span ref={measure} aria-hidden="true" className="invisible absolute inset-x-0 top-0">
        {words.map((w, i) => (
          <span key={i}>{`${w} `}</span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="-mb-[0.18em] block overflow-hidden pb-[0.18em]">
          <span
            className={cn("ns-line block", shown && "ns-line-in")}
            style={{ transitionDelay: `${delay + i * LINE_GAP}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
