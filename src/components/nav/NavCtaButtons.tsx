import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GOOGLE_MAPS_URL } from "@/components/HeroCtaButtons";

const navButtonBase =
  "group h-8 rounded-full px-5 font-geist text-sm font-normal shadow-none transition-colors sm:h-9 sm:px-6";

type NavCtaButtonsProps = {
  onTeamClick?: () => void;
  className?: string;
  compact?: boolean;
  stacked?: boolean;
};

export default function NavCtaButtons({
  onTeamClick,
  className,
  compact = false,
  stacked = false,
}: NavCtaButtonsProps) {
  return (
    <div
      className={cn(
        stacked ? "flex w-full flex-col gap-2.5" : "flex items-center gap-2",
        className
      )}
    >
      <Button
        type="button"
        asChild={!onTeamClick}
        onClick={onTeamClick}
        className={cn(
          navButtonBase,
          "bg-hero-btn text-white hover:bg-blackk/90",
          compact && "h-8 px-4 text-xs sm:h-8 sm:px-4 sm:text-xs",
          stacked && "h-11 w-full rounded-full px-6 text-sm"
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
          navButtonBase,
          "border-0 bg-hero-btn-muted text-blackk hover:bg-[#deded9]",
          compact && "h-8 px-4 text-xs sm:h-8 sm:px-4 sm:text-xs",
          stacked && "h-11 w-full rounded-full px-6 text-sm"
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
