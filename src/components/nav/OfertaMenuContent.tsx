import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ofertaNavItems } from "@/data/oferta-nav";

type OfertaMenuContentProps = {
  variant?: "desktop" | "mobile";
  onItemClick?: () => void;
  className?: string;
};

export default function OfertaMenuContent({
  variant = "desktop",
  onItemClick,
  className,
}: OfertaMenuContentProps) {
  const isDesktop = variant === "desktop";

  return (
    <div
      className={cn(
        isDesktop
          ? "grid w-full grid-cols-2 gap-1"
          : "flex flex-col mb-4",
        className
      )}
    >
      {ofertaNavItems.map(({ id, slug, label, shortDescription, icon: Icon }) =>
        isDesktop ? (
          <Link
            key={id}
            to={`/${slug}`}
            onClick={onItemClick}
            className="group flex h-24 items-start gap-3 rounded-lg p-3 transition-colors hover:bg-blackk/5"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-tile text-blackk/70">
              <Icon className="size-4" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-geist text-sm font-medium leading-snug text-blackk">
                {label}
              </p>
              <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-blackk/55">
                {shortDescription}
              </p>
            </div>
          </Link>
        ) : (
          <Link
            key={id}
            to={`/${slug}`}
            onClick={onItemClick}
            className="group flex items-center justify-between gap-4 border-b border-blackk/[0.06] py-3.5 last:border-b-0"
          >
            <span className="font-geist text-[15px] font-normal leading-snug text-blackk/85">
              {label}
            </span>
            <ArrowUpRight
              className="size-3.5 shrink-0 text-blackk/25 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blackk/45"
              strokeWidth={1.75}
            />
          </Link>
        )
      )}
    </div>
  );
}
