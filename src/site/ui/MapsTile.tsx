import { DIRECTIONS_URL } from "../constants";
import { Arrow } from "./SplitButton";

function MapsIcon() {
  return (
    <svg viewBox="0 0 92.3 132.3" className="h-[22px] w-auto" aria-hidden="true">
      <path fill="#1A73E8" d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z" />
      <path fill="#EA4335" d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z" />
      <path fill="#4285F4" d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3" />
      <path fill="#FBBC04" d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3" />
      <path fill="#34A853" d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2z" />
    </svg>
  );
}

export function MapsTile({ className }: { className?: string }) {
  return (
    <a
      href={DIRECTIONS_URL}
      target="_blank"
      rel="noreferrer"
      className={`group flex items-center gap-3 rounded-xs border border-neutral-200 py-2 pl-2 pr-3.5 transition-colors hover:border-neutral-300 ${className ?? ""}`}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xs border border-neutral-200">
        <MapsIcon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] leading-[1.3]">ul. Kwiatkowskiego 17</span>
        <span className="mt-1 block text-[13px] leading-[1.35] text-neutral-500">52-326 Wrocław</span>
      </span>
      <span className="flex shrink-0 items-center gap-1 text-sm">
        Google Maps
        <Arrow className="size-4" />
      </span>
    </a>
  );
}
