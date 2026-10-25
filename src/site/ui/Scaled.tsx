import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

export function Scaled({
  w,
  h,
  children,
  className,
  innerRef,
}: {
  w: number;
  h: number;
  children: ReactNode;
  className?: string;
  innerRef?: RefObject<HTMLDivElement | null>;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const ref = innerRef ?? localRef;
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setScale(el.getBoundingClientRect().width / w);
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, w]);
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: w, height: h, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
