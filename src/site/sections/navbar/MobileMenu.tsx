import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  ChevronDown,
  ChevronRight,
  Handshake,
  Warehouse,
  type LucideIcon,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MENU_CATEGORIES } from "../../data/categories";
import { TEAM } from "../../data/team";
import { CategoryGlyph } from "../../ui/CategoryGlyph";
import { IconBox } from "../../ui/IconBox";
import { TeamList } from "../team/TeamList";
import { AddressBar } from "../../ui/AddressBar";
import { OpenStatus } from "../../ui/OpenStatus";
import { Toggle } from "../../ui/Toggle";

const EASE = "duration-500 ease-[cubic-bezier(.23,1,.32,1)]";

const DEPTS: Record<string, { icon: LucideIcon; desc: string }> = {
  Handlowcy: { icon: Handshake, desc: "Oferty, wyceny i zamówienia" },
  Magazyn: { icon: Warehouse, desc: "Odbiór i dostawy na budowę" },
  Księgowość: { icon: Calculator, desc: "Faktury i rozliczenia" },
};

const itemClass = "ns-hover flex w-full items-center gap-3.5 py-2 text-left";
const boxClass = "size-10 border-transparent! [&_svg]:size-[18px]";

function ItemText({ title, desc }: { title: string; desc: string }) {
  return (
    <span className="min-w-0">
      <span className="block truncate text-sm leading-[1.35]">{title}</span>
      <span className="mt-0.5 block truncate text-[13px] leading-[1.4] text-neutral-500">
        {desc}
      </span>
    </span>
  );
}

function Section({
  id,
  label,
  open,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex h-11 w-full items-center justify-between text-left text-[17px] tracking-[-0.01em]"
      >
        {label}
        <ChevronDown
          className={cn(
            "size-5 transition-transform duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)]",
            open && "rotate-180",
          )}
          strokeWidth={1.5}
        />
      </button>
      <div
        id={id}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <ul className="min-h-0 overflow-hidden" inert={!open}>
          {children}
        </ul>
      </div>
    </>
  );
}

export function MobileMenu({
  top,
  onClose,
  teamOnly = false,
  dept,
  onDept,
}: {
  top: number;
  onClose: () => void;
  teamOnly?: boolean;
  dept: string | null;
  onDept: (label: string) => void;
}) {
  const [shown, setShown] = useState(TEAM[0].label);
  const [saveMode, setSaveMode] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const openDept = (label: string) => {
    setShown(label);
    onDept(label);
  };

  const deptItems = TEAM.map((g) => {
    const d = DEPTS[g.label] ?? { icon: Handshake, desc: "" };
    const Icon = d.icon;
    return (
      <li key={g.label}>
        <button
          type="button"
          onClick={() => openDept(g.label)}
          className={itemClass}
        >
          <IconBox className={boxClass}>
            <Icon strokeWidth={1.5} />
          </IconBox>
          <ItemText title={g.label} desc={d.desc} />
          <ChevronRight
            className="ml-auto size-4 text-neutral-400"
            strokeWidth={1.5}
          />
        </button>
      </li>
    );
  });

  return (
    <div
      id="ns-mobile-menu"
      role="dialog"
      aria-label="Menu"
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col bg-white md:hidden"
      style={{ top }}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className={cn(
            "ns-noscroll absolute inset-0 flex flex-col overflow-y-auto transition-transform",
            EASE,
            dept ? "-translate-x-full" : "translate-x-0",
          )}
          inert={!!dept}
        >
          {teamOnly ? (
            <div className="maxw pt-4">
              <div className="flex flex-col gap-2">
                <AddressBar />
                <OpenStatus />
              </div>
              <ul className="mt-3">{deptItems}</ul>
            </div>
          ) : (
            <div className="maxw pt-4">
              <div className="flex flex-col gap-2">
                <AddressBar />
                <OpenStatus />
              </div>
              <div className="h-3" />
              <Section
                id="ns-mobile-offer"
                label="Oferta"
                open={offerOpen}
                onToggle={() => setOfferOpen((v) => !v)}
              >
                {MENU_CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/${c.slug}`}
                      onClick={onClose}
                      className={itemClass}
                    >
                      <IconBox className={boxClass}>
                        <CategoryGlyph name={c.icon} />
                      </IconBox>
                      <ItemText title={c.title} desc={c.desc} />
                    </Link>
                  </li>
                ))}
              </Section>

              <div>
                <Section
                  id="ns-mobile-team"
                  label="Zespół"
                  open={teamOpen}
                  onToggle={() => setTeamOpen((v) => !v)}
                >
                  {deptItems}
                </Section>
              </div>
            </div>
          )}
          <p className="mt-auto pb-6 pt-10 text-center text-xs text-neutral-400">
            © {new Date().getFullYear()} Brados sp. z o.o.
          </p>
        </div>

        <div
          className={cn(
            "ns-noscroll absolute inset-0 flex flex-col overflow-y-auto transition-transform",
            EASE,
            dept ? "translate-x-0" : "translate-x-full",
          )}
          inert={!dept}
        >
          <div className="maxw pt-4">
            <div className="flex h-11 items-center justify-between gap-3 rounded-xs bg-[#F5F5F5] px-3.5 text-sm">
              <span className="flex items-center gap-2.5">
                <UserPlus
                  className="size-4 shrink-0 text-neutral-500"
                  strokeWidth={1.5}
                />
                Dodaj do kontaktów
              </span>
              <Toggle
                checked={saveMode}
                onChange={setSaveMode}
                label="Pokaż przyciski dodawania do kontaktów"
              />
            </div>
          </div>
          <TeamList
            group={shown}
            showSave={saveMode}
            className="maxw pb-10 pt-3"
          />
        </div>
      </div>
    </div>
  );
}
