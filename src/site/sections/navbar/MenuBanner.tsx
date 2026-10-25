import { cn } from "@/lib/utils";
import { MAPS_URL } from "../../constants";
import { SilkBg } from "../../ui/SilkBg";

export function MenuBanner({ play = false }: { play?: boolean }) {
  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noreferrer"
      className="group absolute inset-0 isolate block overflow-hidden rounded-xs"
    >
      <SilkBg className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      <div className="absolute inset-0 grid place-items-center">
        <img
          src="/photos/logo-poziome-biale.webp"
          alt="Brados"
          className={cn("h-15 w-auto", play && "ns-fade-up")}
          style={{ animationDelay: "420ms" }}
        />
      </div>
    </a>
  );
}
