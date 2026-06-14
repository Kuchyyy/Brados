"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BOTTOM_THRESHOLD = 24;

export default function BottomScrollBlur() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const isScrollable = scrollHeight > clientHeight + 1;
      const atBottom =
        scrollTop + clientHeight >= scrollHeight - BOTTOM_THRESHOLD;

      setVisible(isScrollable && !atBottom);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 h-28 transition-opacity duration-500 ease-out",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="absolute inset-0 backdrop-blur-[10px] [mask-image:linear-gradient(to_top,black_30%,transparent)] [-webkit-mask-image:linear-gradient(to_top,black_30%,transparent)]" />
    </div>
  );
}
