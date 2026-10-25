import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MENU_CATEGORIES } from "../../data/categories";
import { CategoryGlyph } from "../../ui/CategoryGlyph";
import { IconBox } from "../../ui/IconBox";
import { MenuBanner } from "./MenuBanner";

export function MegaMenu({
  open,
  onEnter,
  onClose,
}: {
  open: boolean;
  onEnter: () => void;
  onClose: () => void;
}) {
  return (
    <div className="maxw pointer-events-none absolute inset-x-0 top-full hidden md:block">
      <div
        id="ns-oferta"
        onMouseEnter={onEnter}
        inert={!open}
        className={cn(
          "absolute right-0 top-2 flex gap-8 rounded-xs border border-neutral-200 bg-white p-6",
          open ? "pointer-events-auto visible" : "invisible",
        )}
      >
        <div>
          <p className="text-xs text-neutral-800">Kategorie produktów</p>
          <div className="mt-4 grid grid-flow-col grid-cols-[repeat(3,240px)] grid-rows-3 gap-x-6 gap-y-5 [&:has(a.ns-cat:hover)_a.ns-cat:not(:hover)]:opacity-35">
            {MENU_CATEGORIES.map((c, i) => (
              <Link
                key={c.slug}
                to={`/nowa/${c.slug}`}
                onClick={onClose}
                className={cn(
                  "ns-cat ns-hover flex items-center gap-3.5 transition-opacity duration-200",
                  open && "ns-fade-up",
                )}
                style={{ animationDelay: `${(Math.floor(i / 3) + (i % 3)) * 45}ms` }}
              >
                <IconBox className="size-10 border-transparent! [&_svg]:size-[18px]">
                  <CategoryGlyph name={c.icon} />
                </IconBox>
                <span className="min-w-0">
                  <span className="block truncate text-sm leading-[1.35]">
                    {c.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[13px] leading-[1.4] text-neutral-500">
                    {c.desc}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div
          className={cn("flex w-[400px] flex-col", open && "ns-fade-up")}
          style={{ animationDelay: "225ms" }}
        >
          <p className="text-xs text-neutral-800">
            Znajdziesz tu wszystko, czego potrzebujesz
          </p>
          <div className="relative mt-4 flex-1">
            <MenuBanner play={open} />
          </div>
        </div>
      </div>
    </div>
  );
}
