import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOpenNow } from "../hooks/useOpenNow";

export function OpenStatus({ className, force }: { className?: string; force?: boolean }) {
  const live = useOpenNow();
  const open = force ?? live;
  return (
    <div
      className={cn(
        "flex h-11 items-center justify-between gap-3 rounded-xs bg-[#F5F5F5] px-3.5 text-sm",
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <Clock className="size-4 shrink-0 text-neutral-500" strokeWidth={1.5} />
        <span className="truncate">Pon – Pt, 07:30–16:00</span>
      </span>
      <span className="flex shrink-0 items-center gap-2 text-[13px] text-neutral-500">
        {open ? "Otwarte" : "Zamknięte"}
        <span className="relative size-[7px]" aria-hidden="true">
          {open && (
            <>
              <span className="ns-wave absolute inset-0 rounded-full border border-emerald-500" />
              <span
                className="ns-wave absolute inset-0 rounded-full border border-emerald-500"
                style={{ animationDelay: "1.2s" }}
              />
            </>
          )}
          <span
            className={cn(
              "absolute inset-0 rounded-full",
              open ? "bg-emerald-500" : "bg-red-500",
            )}
          />
        </span>
      </span>
    </div>
  );
}
