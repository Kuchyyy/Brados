import { cn } from "@/lib/utils";
import { MAPS_URL } from "../../constants";

export function MenuPhoto({ play = false }: { play?: boolean }) {
  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noreferrer"
      className="group absolute inset-0 block overflow-hidden rounded-xs bg-neutral-100"
    >
      <img
        src="/photos/nowa/menu-biuro.webp"
        alt="Biuro Brados w słońcu"
        className="absolute inset-0 size-full object-cover object-[center_78%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <div className="absolute inset-0 grid place-items-center">
        <img
          src="/photos/nowa/logo-poziome-biale.webp"
          alt="Brados"
          className={cn("h-20 w-auto", play && "ns-fade-up")}
          style={{ animationDelay: "420ms" }}
        />
      </div>
    </a>
  );
}
