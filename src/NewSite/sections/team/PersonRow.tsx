import { useEffect, useState } from "react";
import { Check, Copy, Phone, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { telHref } from "../../constants";
import type { Person } from "../../data/team";
import { copyText } from "../../ui/copyText";
import { downloadVCard } from "../../ui/vcard";

const action =
  "flex h-10 w-full min-w-0 items-center justify-center gap-2 rounded-xs bg-[#F5F5F5] px-3 text-sm transition-colors hover:bg-neutral-200";

export function PersonRow({
  person,
  showSave = false,
}: {
  person: Person;
  showSave?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <li className="rounded-xs border border-neutral-200 bg-white p-4">
      <p className="text-[15px]">{person.name}</p>
      <p className="mt-0.5 text-xs text-neutral-500">{person.role}</p>
      <div className="mt-3 flex flex-col gap-2">
        <a
          href={telHref(person.phone)}
          className={action}
          aria-label={`Zadzwoń: ${person.phone}`}
        >
          <Phone className="size-4 shrink-0" strokeWidth={1.5} />
          {person.phone}
        </a>
        <button
          type="button"
          onClick={async () => setCopied(await copyText(person.email))}
          className={cn(action, "max-w-full")}
          aria-label={`Kopiuj e-mail: ${person.email}`}
        >
          {copied ? (
            <Check
              className="size-4 shrink-0 text-[#EA6100]"
              strokeWidth={1.5}
            />
          ) : (
            <Copy className="size-4 shrink-0" strokeWidth={1.5} />
          )}
          <span className="truncate">
            {copied ? "Skopiowano" : person.email}
          </span>
        </button>
      </div>
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(.23,1,.32,1)]",
          showSave
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden" inert={!showSave}>
          <button
            type="button"
            onClick={() => downloadVCard(person)}
            className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xs bg-[#0A0A0A] text-sm text-white transition-colors hover:bg-neutral-800"
          >
            <UserPlus className="size-4 shrink-0" strokeWidth={1.5} />
            Dodaj do kontaktów
          </button>
        </div>
      </div>
    </li>
  );
}
