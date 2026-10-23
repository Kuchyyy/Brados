import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Brados%2C+Eugeniusza+Kwiatkowskiego+17%2C+52-326+Wroc%C5%82aw";

export function AddressBar({ className }: { className?: string }) {
  return (
    <a
      href={DIRECTIONS_URL}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group flex h-11 items-center justify-between gap-3 rounded-xs bg-[#F5F5F5] px-3.5 text-sm transition-colors hover:bg-neutral-200",
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <MapPin className="size-4 shrink-0 text-neutral-500" strokeWidth={1.5} />
        <span className="truncate">ul. Kwiatkowskiego 17, Wrocław</span>
      </span>
      <span className="flex shrink-0 items-center gap-1 text-[13px] text-neutral-500 transition-colors group-hover:text-[#0A0A0A]">
        Trasa
        <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
      </span>
    </a>
  );
}
