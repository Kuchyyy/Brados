"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Phone } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { useCenteredHorizontalScroll } from "@/hooks/useCenteredHorizontalScroll";

type Person = {
  name: string;
  phone: string;
  email: string;
  role?: string;
};

type TeamKey = "handlowcy" | "magazyn" | "finanse";

const teamOrder: TeamKey[] = ["handlowcy", "magazyn", "finanse"];

const teamLabels: Record<TeamKey, string> = {
  handlowcy: "Handlowcy",
  magazyn: "Magazyn",
  finanse: "Księgowość",
};

const teams: Record<TeamKey, Person[]> = {
  handlowcy: [
    {
      name: "Paweł Pawlak",
      phone: "691489111",
      role: "Prezes",
      email: "p.pawlak@brados.pl",
    },
    {
      name: "Krzysztof Kuchciński",
      phone: "691032975",
      role: "Prezes",
      email: "k.kuchcinski@brados.pl",
    },
    {
      name: "Łukasz Zboch",
      phone: "697466111",
      role: "Specjalista ds. Sprzedaży",
      email: "l.zboch@brados.pl",
    },
    {
      name: "Michał Wlaszczyk",
      phone: "691745111",
      role: "Specjalista ds. Sprzedaży",
      email: "m.wlaszczyk@brados.pl",
    },
    {
      name: "Michał Kleczkowski",
      phone: "697277588",
      role: "Specjalista ds. Sprzedaży",
      email: "m.kleczkowski@brados.pl",
    },
    {
      name: "Jarosław Cegielski",
      phone: "691585111",
      role: "Specjalista ds. Sprzedaży",
      email: "j.cegielski@brados.pl",
    },
  ],
  magazyn: [
    {
      name: "Paweł Zawartko",
      phone: "691725111",
      role: "Kierownik magazynu",
      email: "magazyn@brados.pl",
    },
    {
      name: "Artur Kozłowski",
      role: "Kierowca",
      phone: "669456111",
      email: "magazyn@brados.pl",
    },
  ],
  finanse: [
    {
      name: "Tomasz Grzesiak",
      phone: "691479111",
      role: "Prezes",
      email: "t.grzesiak@brados.pl",
    },
  ],
};

function formatPersonCount(count: number) {
  if (count === 1) return "1 osoba";
  if (count >= 2 && count <= 4) return `${count} osoby`;
  return `${count} osób`;
}

function TeamCategoryButton({
  label,
  isActive,
  onClick,
  layout = "nav",
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  layout?: "nav" | "scroll";
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      animate={{ x: isActive && layout === "nav" ? 10 : 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={[
        "inline-flex min-w-0 text-left font-medium transition-colors",
        layout === "scroll"
          ? "shrink-0 snap-center flex-col items-center whitespace-nowrap pb-3 text-sm leading-snug tracking-[0.02em]"
          : "items-start gap-1.5 text-xs leading-snug tracking-[0.01em]",
        layout === "scroll"
          ? isActive
            ? "border-b-2 border-orange text-blackk"
            : "border-b-2 border-transparent text-blackk/35 hover:text-blackk/55"
          : isActive
            ? "text-blackk"
            : "text-blackk/40 hover:text-blackk/65",
      ].join(" ")}
    >
      {layout !== "scroll" && (
        <span
          className="inline-flex h-[1.15em] w-4 shrink-0 items-center justify-start overflow-hidden"
          aria-hidden
        >
          <AnimatePresence mode="wait" initial={false}>
            {isActive && (
              <motion.span
                key="dash"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="block leading-none text-orange"
              >
                —
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      )}
      <span>{label}</span>
    </motion.button>
  );
}

function formatPhone(phone: string) {
  return phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
}

function TeamPersonMobile({
  person,
  copiedEmail,
  onCopyEmail,
  isLast = false,
}: {
  person: Person;
  copiedEmail: string | null;
  onCopyEmail: (email: string) => void;
  isLast?: boolean;
}) {
  const isCopied = copiedEmail === person.email;

  return (
    <article
      className={["py-6", !isLast && "border-b border-blackk/8"].join(" ")}
    >
      <div>
        <p className="text-lg font-medium leading-snug tracking-[-0.01em] text-blackk">
          {person.name}
        </p>
        {person.role && (
          <p className="mt-0.5 text-xs leading-snug text-blackk/50">
            {person.role}
          </p>
        )}
      </div>

      <a
        href={`tel:${person.phone}`}
        className="mt-4 flex min-h-12 items-center justify-between gap-3 py-3 text-xl font-medium tracking-[-0.02em] text-blackk transition-colors active:text-orange"
      >
        <span>{formatPhone(person.phone)}</span>
        <Phone className="h-5 w-5 shrink-0 text-orange" strokeWidth={1.5} />
      </a>

      <button
        type="button"
        onClick={() => onCopyEmail(person.email)}
        className="mt-1 flex w-full cursor-pointer items-center justify-between gap-2 py-2 text-left text-xs text-blackk/55 transition-colors active:text-blackk"
      >
        <span className="truncate">{person.email}</span>
        {isCopied ? (
          <Check className="h-3.5 w-3.5 shrink-0 text-green-600" />
        ) : (
          <Mail className="h-3.5 w-3.5 shrink-0 text-blackk/35" />
        )}
      </button>
    </article>
  );
}

function TeamPersonCard({
  person,
  copiedEmail,
  onCopyEmail,
}: {
  person: Person;
  copiedEmail: string | null;
  onCopyEmail: (email: string) => void;
}) {
  const isCopied = copiedEmail === person.email;

  return (
    <article className="tile-surface flex aspect-[3/4] h-full min-w-0 flex-col justify-between p-5">
      <div>
        <p className="text-lg font-medium leading-snug tracking-[-0.01em] text-blackk">
          {person.name}
        </p>
        {person.role && (
          <p className="mt-0.5 text-xs leading-snug text-blackk/50">
            {person.role}
          </p>
        )}
      </div>

      <div>
        <a
          href={`tel:${person.phone}`}
          className="flex min-h-12 items-center justify-between gap-3 py-3 text-xl font-medium tracking-[-0.02em] text-blackk transition-colors hover:text-orange"
        >
          <span>{formatPhone(person.phone)}</span>
          <Phone className="h-5 w-5 shrink-0 text-orange" strokeWidth={1.5} />
        </a>

        <button
          type="button"
          onClick={() => onCopyEmail(person.email)}
          className="flex w-full cursor-pointer items-center justify-between gap-2 py-2 text-left text-xs text-blackk/55 transition-colors hover:text-blackk"
        >
          <span className="truncate">{person.email}</span>
          {isCopied ? (
            <Check className="h-3.5 w-3.5 shrink-0 text-green-600" />
          ) : (
            <Mail className="h-3.5 w-3.5 shrink-0 text-blackk/35" />
          )}
        </button>
      </div>
    </article>
  );
}

const Team1 = () => {
  const [activeTeam, setActiveTeam] = useState<TeamKey>("handlowcy");
  const [activeSection, setActiveSection] = useState<TeamKey>("handlowcy");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const titlesScrollRef = useRef<HTMLDivElement | null>(null);
  const skipTitleSyncRef = useRef(false);
  const sectionRefs = useRef<Record<TeamKey, HTMLElement | null>>({
    handlowcy: null,
    magazyn: null,
    finanse: null,
  });

  const scrollTitleIntoView = useCallback(
    (team: TeamKey, behavior: ScrollBehavior = "smooth") => {
      const container = titlesScrollRef.current;
      const chip = container?.querySelector<HTMLElement>(
        `[data-team-title="${team}"]`
      );

      if (!container || !chip || container.clientWidth === 0) return;

      skipTitleSyncRef.current = true;
      container.scrollTo({
        left:
          chip.offsetLeft + chip.offsetWidth / 2 - container.clientWidth / 2,
        behavior,
      });
      window.setTimeout(() => {
        skipTitleSyncRef.current = false;
      }, behavior === "smooth" ? 400 : 0);
    },
    []
  );

  const activeTeamRef = useRef<TeamKey>(activeTeam);
  activeTeamRef.current = activeTeam;

  const handleMobileTeamChange = useCallback((team: TeamKey) => {
    if (activeTeamRef.current === team) return;
    activeTeamRef.current = team;
    setActiveTeam(team);
  }, []);

  useCenteredHorizontalScroll<TeamKey>(
    titlesScrollRef,
    "[data-team-title]",
    handleMobileTeamChange,
    (element) => element.dataset.teamTitle as TeamKey,
    { enabled: true, skipSyncRef: skipTitleSyncRef }
  );

  const scrollToSection = useCallback((team: TeamKey) => {
    const section = sectionRefs.current[team];
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(team);
  }, []);

  const handleCopyEmail = useCallback((email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      window.setTimeout(() => setCopiedEmail(null), 2000);
    });
  }, []);

  useLayoutEffect(() => {
    scrollTitleIntoView("handlowcy", "auto");
  }, [scrollTitleIntoView]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    teamOrder.forEach((team) => {
      const el = sectionRefs.current[team];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(team);
            scrollTitleIntoView(team);
          }
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [scrollTitleIntoView]);

  return (
    <section
      id="zespół"
      className="w-full bg-white py-8 font-geist md:py-12"
    >
      <div className="maxw relative flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:items-stretch md:gap-x-5 md:gap-y-8">
          <div
            className="hidden md:block md:col-start-1 md:row-start-1"
            aria-hidden
          />

          <h2 className="heading-h2 flex flex-col justify-between py-8 text-blackk md:col-span-3 md:col-start-2 md:row-start-1 md:mb-0 md:py-20">
            <TextAnimate
              as="span"
              animation="fadeIn"
              by="text"
              once
              className="block"
            >
              Poznaj nasz zespół.
            </TextAnimate>
            <TextAnimate
              as="span"
              animation="fadeIn"
              by="text"
              once
              delay={0.2}
              className="hidden text-blackk/45 md:block"
            >
              Ludzie, którzy tworzą Brados na co dzień.
            </TextAnimate>
            <TextAnimate
              as="span"
              animation="fadeIn"
              by="text"
              once
              delay={0.2}
              className="block text-blackk/45 md:hidden"
            >
              Ludzie, którzy tworzą Brados
            </TextAnimate>
            <TextAnimate
              as="span"
              animation="fadeIn"
              by="text"
              once
              delay={0.3}
              className="block text-blackk/45 md:hidden"
            >
              na co dzień.
            </TextAnimate>
          </h2>

          <aside className="flex min-h-0 flex-col gap-4 md:col-start-1 md:row-start-2 md:min-h-full md:pr-4">
            <div className="shrink-0">
              <h3 className="heading-h3 text-blackk">Struktura naszego zespołu</h3>
              <p className="mt-3 mb-6 text-sm font-gesit font-normal leading-relaxed tracking-tight text-blackk/65">
                Wybierz dział i skontaktuj się bezpośrednio z właściwą osobą.
              </p>
            </div>

            <nav
              className="z-10 hidden w-full shrink-0 flex-col gap-2.5 self-start md:sticky md:top-28 md:flex"
              aria-label="Działy zespołu"
            >
              {teamOrder.map((team) => (
                <TeamCategoryButton
                  key={team}
                  label={teamLabels[team]}
                  isActive={team === activeSection}
                  onClick={() => scrollToSection(team)}
                />
              ))}
            </nav>
          </aside>

          <div className="relative left-1/2 w-screen -translate-x-1/2 border-b border-blackk/10 md:hidden">
            <div
              ref={titlesScrollRef}
              className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-[50vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {teamOrder.map((team) => (
                <span key={team} data-team-title={team} className="snap-center">
                  <TeamCategoryButton
                    label={teamLabels[team]}
                    isActive={team === activeTeam}
                    onClick={() => {
                      activeTeamRef.current = team;
                      setActiveTeam(team);
                      scrollTitleIntoView(team);
                    }}
                    layout="scroll"
                  />
                </span>
              ))}
            </div>
          </div>

          <p className="text-[11px] tracking-[0.02em] text-blackk/45 md:hidden">
            {teamLabels[activeTeam]} ·{" "}
            {formatPersonCount(teams[activeTeam].length)}
          </p>

          <div className="border-t border-blackk/10 md:hidden">
            {teams[activeTeam].map((person, index, list) => (
              <TeamPersonMobile
                key={`${activeTeam}-${person.email}-${person.name}`}
                person={person}
                copiedEmail={copiedEmail}
                onCopyEmail={handleCopyEmail}
                isLast={index === list.length - 1}
              />
            ))}
          </div>

          <div className="hidden flex-col gap-12 md:col-span-3 md:col-start-2 md:row-start-2 md:flex">
            {teamOrder.map((team) => (
              <div
                key={team}
                ref={(el) => {
                  sectionRefs.current[team] = el;
                }}
                id={`team-${team}`}
                className="scroll-mt-28"
              >
                <h3 className="heading-h3 mb-4 text-blackk">{teamLabels[team]}</h3>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
                  {teams[team].map((person) => (
                    <TeamPersonCard
                      key={`${team}-${person.email}-${person.name}`}
                      person={person}
                      copiedEmail={copiedEmail}
                      onCopyEmail={handleCopyEmail}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {copiedEmail && (
          <div className="fixed bottom-6 right-6 z-50 rounded-sm bg-orange border border-blackk/10 px-4 py-2 text-sm text-white shadow-lg">
            Skopiowano e-mail: {copiedEmail}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team1;
