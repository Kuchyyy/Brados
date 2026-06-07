"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/RMxpxoWFV8upiwmM7";

const heroButtonBase =
  "group h-9 min-w-[9.5rem] rounded-full px-8 font-geist text-sm font-normal shadow-none transition-colors sm:min-w-[10.5rem] sm:px-12";

type HeroCtaButtonsProps = {
  onTeamClick?: () => void;
  className?: string;
  centered?: boolean;
};

export default function HeroCtaButtons({
  onTeamClick,
  className,
  centered = false,
}: HeroCtaButtonsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2.5",
        centered && "justify-center",
        className
      )}
    >
      <Button
        type="button"
        asChild={!onTeamClick}
        onClick={onTeamClick}
        className={cn(
          heroButtonBase,
          "bg-hero-btn text-white hover:bg-blackk/90"
        )}
      >
        {onTeamClick ? (
          <span className="inline-flex items-center gap-1.5">
            Zespół
            <ArrowRight
              className="size-3 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
              strokeWidth={3}
            />
          </span>
        ) : (
          <a href="#zespół" className="inline-flex items-center gap-1.5">
            Zespół
            <ArrowRight
              className="size-3 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
              strokeWidth={3}
            />
          </a>
        )}
      </Button>
      <Button
        asChild
        variant="outline"
        className={cn(
          heroButtonBase,
          "border-0 bg-hero-btn-muted text-blackk hover:bg-[#deded9]"
        )}
      >
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5"
        >
          Google Maps
          <ArrowRight
            className="size-3 text-blackk/80 transition-transform group-hover:translate-x-0.5"
            strokeWidth={3}
          />
        </a>
      </Button>
    </div>
  );
}
