import { Star } from "lucide-react";
import { GOOGLE_RATING, REVIEW_URL } from "../constants";
import { Arrow } from "./SplitButton";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export function ReviewTile() {
  return (
    <a
      href={REVIEW_URL}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-xs border border-neutral-200 py-2 pl-2 pr-3.5 transition-colors hover:border-neutral-300"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xs border border-neutral-200">
        <GoogleIcon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-[15px] leading-none">{GOOGLE_RATING}</span>
          <span className="flex gap-0.5" aria-label={`Ocena ${GOOGLE_RATING} na 5`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-3.5 fill-[#FBBC04] text-[#FBBC04]" strokeWidth={0} />
            ))}
          </span>
        </span>
        <span className="mt-1.5 block text-[13px] leading-[1.35] text-neutral-500">Opinie w Google</span>
      </span>
      <span className="flex shrink-0 items-center gap-1 text-sm">
        Wystaw opinię
        <Arrow className="size-4" />
      </span>
    </a>
  );
}
