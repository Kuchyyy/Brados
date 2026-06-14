import { cn } from "@/lib/utils";

type NavToggleProps = {
  open: boolean;
  onClick: () => void;
  className?: string;
};

export default function NavToggle({ open, onClick, className }: NavToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Zamknij menu" : "Otwórz menu"}
      aria-expanded={open}
      className={cn(
        "relative flex size-8 items-center justify-center rounded-md hover:bg-blackk/5",
        className
      )}
    >
      <span className="relative block size-3.5">
        <span
          className={cn(
            "absolute top-1/2 left-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 bg-blackk transition-all duration-300 ease-out",
            open && "-translate-y-[3px]"
          )}
        />
        <span
          className={cn(
            "absolute top-1/2 left-1/2 h-0.5 w-3.5 origin-center -translate-x-1/2 -translate-y-1/2 bg-blackk transition-all duration-300 ease-out",
            open ? "translate-y-[3px] rotate-0" : "rotate-90"
          )}
        />
      </span>
    </button>
  );
}
