import { cn } from "@/lib/utils";
import { useInView } from "../hooks/useInView";

export function RevealLine({
  text,
  delay = 0,
  margin = "0px 0px -25% 0px",
}: {
  text: string;
  delay?: number;
  margin?: string;
}) {
  const [ref, shown] = useInView<HTMLSpanElement>(margin, 0, true);
  return (
    <span ref={ref} className="-mb-[0.18em] block overflow-hidden pb-[0.18em]">
      <span
        className={cn("ns-line block", shown && "ns-line-in")}
        style={{ transitionDelay: `${delay}s` }}
      >
        {text}
      </span>
    </span>
  );
}
