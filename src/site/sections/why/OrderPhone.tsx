import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORANGE_FILL } from "../../constants";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { LogoMark } from "../../ui/LogoMark";
import { Scaled } from "../../ui/Scaled";
import { Haze } from "../../ui/Haze";

const W = 564;
const H = 451;
const ANCHOR = 318;
const DEPTH = [
  { y: 0, scale: 1, autoAlpha: 1 },
  { y: -40, scale: 0.94, autoAlpha: 1 },
  { y: -76, scale: 0.88, autoAlpha: 1 },
];

type Step = { title: string; sub: string; icon: ReactNode };

const STEPS: Step[] = [
  {
    title: "Zamówienie wysłane",
    sub: "ZA/10/2026/418 · 200 m YDYp 3×2,5",
    icon: (
      <span
        className={cn("grid size-9 place-items-center rounded-xs", ORANGE_FILL)}
      >
        <LogoMark white className="h-[18px] w-auto" />
      </span>
    ),
  },
  {
    title: "Faktura wysłana",
    sub: "FV/10/2026/418 · na e-mail firmy",
    icon: (
      <span className="grid h-9 w-[30px] place-items-end rounded-xs border border-neutral-200 bg-[#FAFAFA] pb-1">
        <span className="mx-auto rounded-[2px] bg-[#EA6100] px-1 text-[7px] leading-[1.6] text-white">
          PDF
        </span>
      </span>
    ),
  },
  {
    title: "Gotowe do odbioru",
    sub: "Jutro od 7:30 · ul. Kwiatkowskiego 17",
    icon: (
      <span className="grid size-9 place-items-center rounded-xs bg-[#0A0A0A] text-white">
        <Store className="size-[18px]" strokeWidth={1.5} />
      </span>
    ),
  },
];

function Status() {
  return (
    <span className="relative size-5 shrink-0">
      <svg
        data-spin
        viewBox="0 0 20 20"
        className="absolute inset-0 size-full animate-spin"
        fill="none"
      >
        <circle cx="10" cy="10" r="8" stroke="#DCFCE7" strokeWidth="2" />
        <path
          d="M10 2a8 8 0 0 1 8 8"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <svg
        data-check
        viewBox="0 0 20 20"
        className="invisible absolute inset-0 size-full"
        fill="none"
      >
        <circle cx="10" cy="10" r="10" fill="#16A34A" />
        <path
          data-tick
          d="M6 10.4l2.6 2.6L14 7.6"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1 1"
        />
      </svg>
    </span>
  );
}

function Phone() {
  return (
    <div className="absolute left-1/2 top-[124px] h-[540px] w-[256px] -translate-x-1/2 rounded-[44px] bg-[#0A0A0A] p-[9px]">
      <div className="size-full rounded-[36px] bg-white px-4 pt-3">
        <div className="mx-auto h-[22px] w-[74px] rounded-full bg-[#0A0A0A]" />
        <div className="pt-6">
          <p className="text-[15px] leading-[1.25] tracking-[-0.01em]">
            Potwierdzenie zamówienia
          </p>
          <div className="mt-3 flex items-center gap-2.5 border-b border-neutral-100 pb-3">
            <span
              className={cn(
                "grid size-7 place-items-center rounded-xs",
                ORANGE_FILL,
              )}
            >
              <LogoMark white className="h-3 w-auto" />
            </span>
            <span className="min-w-0 text-[10.5px] leading-[1.35]">
              <span className="block">Brados</span>
              <span className="block text-neutral-500">
                do: biuro@twojafirma.pl
              </span>
            </span>
          </div>
          <div className="mt-3 space-y-2">
            {[92, 100, 84, 96, 60, 0, 88, 100, 70].map((w, i) =>
              w ? (
                <span
                  key={i}
                  className="block h-[6px] rounded-full bg-neutral-100"
                  style={{ width: `${w}%` }}
                />
              ) : (
                <span key={i} className="block h-2" />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderPhone({ play }: { play: boolean }) {
  const reduced = useReducedMotion();
  const big = useMediaQuery("(max-width: 639px)") ? 1.32 : 1;
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-card]", el);
    const n = cards.length;
    gsap.set(cards, { xPercent: -50, transformOrigin: "50% 0%" });
    const depth = (d: number) => ({
      ...DEPTH[d],
      y: DEPTH[d].y * big,
      scale: DEPTH[d].scale * big,
    });

    const done = (card: HTMLElement) => {
      gsap.set(card.querySelector("[data-spin]"), { autoAlpha: 0 });
      gsap.set(card.querySelector("[data-check]"), { autoAlpha: 1 });
      gsap.set(card.querySelector("[data-tick]"), { strokeDashoffset: 0 });
    };

    if (reduced) {
      cards.forEach((c, i) => {
        gsap.set(c, depth(n - 1 - i));
        done(c);
      });
      return;
    }
    gsap.set(cards, { autoAlpha: 0, y: 28, scale: big });
    gsap.set(el.querySelectorAll("[data-tick]"), { strokeDashoffset: 1 });

    const tl = gsap.timeline({ paused: true, delay: 0.3 });
    cards.forEach((card, i) => {
      const at = `step${i}`;
      tl.addLabel(at);
      cards.slice(0, i).forEach((prev, j) => {
        tl.to(
          prev,
          { ...depth(i - j), duration: 0.6, ease: "power3.inOut" },
          at,
        );
      });
      tl.to(card, { ...depth(0), duration: 0.6, ease: "power3.out" }, at)
        .to({}, { duration: 1.1 })
        .to(card.querySelector("[data-spin]"), {
          autoAlpha: 0,
          scale: 0.6,
          duration: 0.18,
          ease: "power2.in",
        })
        .fromTo(
          card.querySelector("[data-check]"),
          { autoAlpha: 0, scale: 0.4 },
          { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2)" },
          "<0.1",
        )
        .to(
          card.querySelector("[data-tick]"),
          { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" },
          "<0.08",
        )
        .to({}, { duration: 0.55 });
    });
    timeline.current = tl;
    return () => {
      tl.kill();
      timeline.current = null;
    };
  }, [reduced, big]);

  useEffect(() => {
    const tl = timeline.current;
    if (play && tl && !tl.isActive()) tl.restart(true);
  }, [play]);

  return (
    <Scaled w={W} h={H} className="overflow-hidden rounded-xs">
      <div
        ref={root}
        className="relative isolate size-full overflow-hidden bg-neutral-100"
      >
        <Haze tile="rozwoj" />
        <Phone />
        {STEPS.map((s) => (
          <div
            key={s.title}
            data-card
            className="absolute left-1/2 flex w-[330px] items-center gap-3 rounded-xs border border-neutral-200 bg-white px-3.5 py-3"
            style={{ top: ANCHOR }}
          >
            {s.icon}
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] leading-[1.3] tracking-[-0.005em]">
                {s.title}
              </span>
              <span className="block truncate text-[11.5px] leading-[1.35] text-neutral-500">
                {s.sub}
              </span>
            </span>
            <Status />
          </div>
        ))}
      </div>
    </Scaled>
  );
}
