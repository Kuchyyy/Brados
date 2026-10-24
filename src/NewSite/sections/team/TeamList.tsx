import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TEAM } from "../../data/team";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { PersonRow } from "./PersonRow";

export function TeamList({
  className,
  group,
  showSave = false,
}: {
  className?: string;
  group?: string;
  showSave?: boolean;
}) {
  const groups = group ? TEAM.filter((g) => g.label === group) : TEAM;
  const desktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    desktop ? { [TEAM[0].label]: true } : {},
  );

  if (group) {
    return (
      <div className={cn("ns-noscroll flex flex-col gap-10", className)}>
        {groups.map((g) => (
          <ul key={g.label} className="flex flex-col gap-2">
            {g.people.map((p) => (
              <PersonRow key={p.name} person={p} showSave={showSave} />
            ))}
          </ul>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("ns-noscroll flex flex-col gap-2", className)}>
      {groups.map((g) => {
        const isOpen = !!open[g.label];
        const id = `ns-team-${g.label}`;
        return (
          <div key={g.label}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen((o) => ({ ...o, [g.label]: !isOpen }))}
              className="flex h-11 w-full items-center justify-between rounded-xs bg-[#F5F5F5] px-3.5 text-left text-sm transition-colors hover:bg-neutral-200"
            >
              {g.label}
              <ChevronDown
                className={cn(
                  "size-4 text-neutral-500 transition-transform duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)]",
                  isOpen && "rotate-180",
                )}
                strokeWidth={1.5}
              />
            </button>
            <div
              id={id}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)]",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden" inert={!isOpen}>
                <ul className="flex flex-col gap-2 pt-2">
                  {g.people.map((p) => (
                    <PersonRow key={p.name} person={p} showSave={showSave} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
