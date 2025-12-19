"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import useMeasure from "react-use-measure";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 50,
  duration = 20,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const translation = useMotionValue(0);
  const [ref, bounds] = useMeasure();
  const sizeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const size = direction === "horizontal" ? bounds.width : bounds.height;

    if (!size || sizeRef.current !== null) return;

    sizeRef.current = size + gap;

    const from = reverse ? -sizeRef.current / 2 : 0;
    const speed = sizeRef.current / duration;

    translation.set(from);

    const loop = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      let next = translation.get() - speed * (delta / 1600);

      if (sizeRef.current !== null && Math.abs(next) >= sizeRef.current) {
        next = from;
      }

      translation.set(next);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    bounds.width,
    bounds.height,
    direction,
    gap,
    duration,
    reverse,
    translation,
  ]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max will-change-transform"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
