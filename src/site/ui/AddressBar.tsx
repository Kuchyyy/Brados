import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORANGE_FILL } from "../constants";
import { Arrow } from "./SplitButton";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Brados%2C+Eugeniusza+Kwiatkowskiego+17%2C+52-326+Wroc%C5%82aw";

export function AddressBar({ className }: { className?: string }) {
  return (
    <a
      href={DIRECTIONS_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Wyznacz trasę: ul. Kwiatkowskiego 17, Wrocław"
      className={cn(
        "group flex h-11 items-center justify-between gap-3 rounded-xs bg-[#F5F5F5] pl-3.5 pr-1.5 text-sm transition-colors hover:bg-neutral-200",
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <MapPin className="size-4 shrink-0 text-neutral-500" strokeWidth={1.5} />
        <span className="truncate">ul. Kwiatkowskiego 17, Wrocław</span>
      </span>
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-xs text-white group-hover:bg-right",
          ORANGE_FILL,
        )}
      >
        <Arrow className="size-4" />
      </span>
    </a>
  );
}
