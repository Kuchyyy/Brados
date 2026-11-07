import { cn } from "@/lib/utils";
import { useOpenNow } from "../hooks/useOpenNow";

export function OpenStatus() {
  const open = useOpenNow();
  return (
    <p className="flex items-center gap-2">
      Pon – Pt, 07:30–16:00
      <span
        className={cn(
          "flex items-center gap-1.5",
          open ? "text-emerald-700" : "text-red-700",
        )}
      >
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
        {open ? "Otwarte" : "Zamknięte"}
      </span>
    </p>
  );
}
