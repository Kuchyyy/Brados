import { cn } from "@/lib/utils";
import { useOpenTeam } from "../hooks/useOpenTeam";

export function SalesButton({
  tone = "outline",
  size = "md",
  label = "Handlowcy",
}: {
  tone?: "outline" | "white" | "ghost" | "soft";
  size?: "sm" | "md";
  label?: string;
}) {
  const openTeam = useOpenTeam();
  return (
    <button
      type="button"
      onClick={openTeam}
      className={cn(
        "inline-flex shrink-0 items-center rounded-xs transition-colors",
        size === "sm" ? "h-8 px-3.5 text-sm" : "h-10 px-[18px] text-[15px]",
        tone === "outline" && "border border-neutral-300 hover:bg-neutral-100",
        tone === "white" && "bg-white hover:bg-neutral-100",
        tone === "ghost" && "hover:bg-neutral-100",
        tone === "soft" && "bg-neutral-100 hover:bg-neutral-200",
      )}
    >
      {label}
    </button>
  );
}
