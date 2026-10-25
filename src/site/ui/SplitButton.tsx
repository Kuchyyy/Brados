import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ORANGE_FILL } from "../constants";

const EASE = "duration-300 ease-[cubic-bezier(.23,1,.32,1)]";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 overflow-visible", className)}
      aria-hidden="true"
    >
      <g className={cn("-translate-x-[3px] transition-transform group-hover:translate-x-0", EASE)}>
        <path
          d="M12 8H3"
          pathLength={1}
          strokeDasharray="1 1"
          className={cn(
            "[stroke-dashoffset:1] transition-[stroke-dashoffset] group-hover:[stroke-dashoffset:0]",
            EASE,
          )}
        />
        <path d="M8.5 4L12.5 8L8.5 12" />
      </g>
    </svg>
  );
}

export function SplitButton({
  label,
  href,
  to,
  onClick,
  external,
  size = "md",
}: {
  label: string;
  href?: string;
  to?: string;
  onClick?: () => void;
  external?: boolean;
  size?: "sm" | "md";
}) {
  const sm = size === "sm";
  const cls = cn(
    "group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xs text-white outline-none hover:bg-right focus-visible:ring-2 focus-visible:ring-[#EA6100] focus-visible:ring-offset-2",
    ORANGE_FILL,
    sm ? "h-8 pl-3.5 pr-3 text-sm" : "h-10 pl-[18px] pr-4 text-[15px]",
  );
  const body = (
    <>
      {label}
      <Arrow className={sm ? "size-4" : "size-[18px]"} />
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {body}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {body}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {body}
    </button>
  );
}
