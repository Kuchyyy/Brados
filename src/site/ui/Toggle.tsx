import { cn } from "@/lib/utils";

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-xs transition-colors duration-200",
        checked ? "bg-[#EA6100]" : "bg-neutral-300",
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 size-4 rounded-[1px] bg-white transition-transform duration-200 ease-[cubic-bezier(.23,1,.32,1)]",
          checked && "translate-x-4",
        )}
      />
    </button>
  );
}
