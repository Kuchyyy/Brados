"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import useMeasure from "react-use-measure";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 50,
  duration = 20,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const sizeRef = useRef<number | null>(null);

  useEffect(() => {
    const measuredSize = direction === "horizontal" ? width : height;
    if (!measuredSize) return;

    if (sizeRef.current === null) {
      sizeRef.current = measuredSize;
    }

    const size = sizeRef.current;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const controls = animate(translation, [from, to], {
      ease: "linear",
      duration: currentDuration,
      repeat: Infinity,
      repeatType: "loop",
      onRepeat: () => {
        translation.set(from);
      },
    });

    return () => controls.stop();
  }, [translation, currentDuration, gap, direction, reverse, width, height]);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const hoverProps =
    !isMobile && durationOnHover
      ? {
          onHoverStart: () => setCurrentDuration(durationOnHover),
          onHoverEnd: () => setCurrentDuration(duration),
        }
      : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
