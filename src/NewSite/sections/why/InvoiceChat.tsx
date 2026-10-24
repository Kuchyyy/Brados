import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Msg = { side: "client" | "brados"; text?: string; invoice?: boolean };

const SCRIPT: Msg[] = [
  {
    side: "client",
    text: "Dzień dobry, potrzebuję 200 m YDYp 3×2,5. Da radę na jutro?",
  },
  {
    side: "brados",
    text: "Wszystko jest na stanie. Zamówienie będzie gotowe na 7:30",
  },
  { side: "client", text: "Super, poproszę fakturę na firmę" },
  { side: "brados", invoice: true },
];

const DOTS_W = 60;
const DOTS_H = 40;
const ORANGE = "#EA6100";
const WHITE = "#FFFFFF";
const BORDER = "#E5E5E5";

const SHAPE = {
  client: "rounded-lg rounded-bl-xs bg-white text-[#0A0A0A]",
  brados: "ml-auto rounded-lg rounded-br-xs bg-[#EA6100] text-white",
  invoice:
    "ml-auto rounded-lg rounded-br-xs border border-neutral-200 bg-white text-[#0A0A0A]",
};

function Dots({ side }: { side: Msg["side"] }) {
  return (
    <span
      data-dots
      className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-[4px]"
    >
      {[0, 1, 2].map((d) => (
        <span
          key={d}
          className={cn(
            "ns-typing size-[5px] rounded-full",
            side === "client" ? "bg-neutral-400" : "bg-white",
          )}
          style={{ animationDelay: `${d * 160}ms` }}
        />
      ))}
    </span>
  );
}

function InvoiceBody() {
  return (
    <span className="flex w-[218px] items-center gap-3 px-3 py-2.5">
      <span className="grid h-10 w-8 shrink-0 place-items-end rounded-[2px] border border-neutral-200 bg-[#FAFAFA] pb-1">
        <span className="mx-auto rounded-[2px] bg-[#EA6100] px-1 text-[7.5px] leading-[1.6] text-white">
          PDF
        </span>
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] leading-[1.35]">
          Faktura FV/10/2026/418
        </span>
        <span className="block text-[11.5px] text-neutral-500">
          Wysłano na e-mail firmy
        </span>
      </span>
    </span>
  );
}

export function InvoiceChat({ play }: { play: boolean }) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const bubbles = gsap.utils.toArray<HTMLElement>("[data-bubble]", el);
    if (reduced) {
      gsap.set(bubbles, { autoAlpha: 1 });
      gsap.set(el.querySelectorAll("[data-dots]"), { autoAlpha: 0 });
      return;
    }
    if (played.current || !play) return;
    played.current = true;

    const slots = bubbles.map((b) => b.parentElement as HTMLElement);
    gsap.set(slots, {
      height: (i: number) => slots[i].getBoundingClientRect().height,
    });
    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        gsap.set(slots, { clearProps: "height" });
      },
    });
    bubbles.forEach((b, i) => {
      const m = SCRIPT[i];
      const dots = b.querySelector("[data-dots]");
      const body = b.querySelector("[data-body]");
      const { width, height } = b.getBoundingClientRect();
      const typingBg = m.side === "client" ? WHITE : ORANGE;
      const finalBg = m.invoice ? WHITE : typingBg;

      tl.set(b, {
        width: DOTS_W,
        height: DOTS_H,
        backgroundColor: typingBg,
        ...(m.invoice && { borderColor: ORANGE }),
      })
        .set(body, { autoAlpha: 0, width })
        .set(dots, { autoAlpha: 1 })
        .fromTo(
          b,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.3, ease: "power3.out" },
        )
        .to({}, { duration: 0.45 })
        .to(dots, { autoAlpha: 0, duration: 0.1, ease: "power1.out" })
        .to(
          b,
          {
            width,
            height,
            backgroundColor: finalBg,
            ...(m.invoice && { borderColor: BORDER }),
            duration: 0.32,
            ease: "power3.inOut",
          },
          "<",
        )
        .fromTo(
          body,
          { autoAlpha: 0, y: 4 },
          { autoAlpha: 1, y: 0, duration: 0.22, ease: "power2.out" },
          "-=0.14",
        )
        .set(b, { clearProps: "width,height,backgroundColor,borderColor" })
        .set(body, { clearProps: "width" })
        .to({}, { duration: 0.15 });
    });
  }, [play, reduced]);

  return (
    <div
      ref={root}
      className="flex aspect-[5/4] w-full flex-col justify-center gap-2 rounded-xs bg-neutral-100 p-6 text-[13.5px] leading-[1.45] tracking-[-0.003em] sm:px-12 sm:py-10"
    >
      {SCRIPT.map((m, i) => (
        <div key={i} className="flex flex-col">
          <div
            data-bubble
            className={cn(
              "invisible relative w-fit max-w-[78%] overflow-hidden",
              m.invoice ? SHAPE.invoice : SHAPE[m.side],
            )}
          >
            <Dots side={m.side} />
            <span data-body className="block">
              {m.invoice ? (
                <InvoiceBody />
              ) : (
                <span className="block px-3.5 py-2.5">{m.text}</span>
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
