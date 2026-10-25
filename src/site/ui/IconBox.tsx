import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function IconBox({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    ref.current
      ?.querySelectorAll("path,circle,rect,line,polyline,polygon,ellipse")
      .forEach((n) => n.setAttribute("pathLength", "1"));
  }, [children]);
  return (
    <span ref={ref} className={cn("ns-ibox size-8 shrink-0 [&_svg]:size-4", className)}>
      {children}
    </span>
  );
}
