import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { WHY_TABS } from "../../data/why";
import { WhyBlock } from "./WhyBlock";

export function WhyScroll() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);

  const navTop = () => navRef.current?.getBoundingClientRect().top ?? 80;

  const scrollToBlock = (i: number) => {
    const el = blocks.current[i];
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - navTop(),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const update = () => {
      const focus = navTop() + 1;
      let idx = 0;
      blocks.current.forEach((el, i) => {
        if (!el) return;
        if (el.getBoundingClientRect().top <= focus) idx = i;
      });
      setActive(idx);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="firma" className="scroll-mt-12 bg-white py-14 md:py-24">
      <div className="maxw grid gap-12 lg:grid-cols-[200px_1fr]">
        <nav
          ref={navRef}
          className="sticky top-20 hidden flex-col gap-0.5 self-start lg:flex"
          aria-label="Co nas wyróżnia"
        >
          {WHY_TABS.map((t, i) => {
            const Icon = t.icon;
            const on = i === active;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => scrollToBlock(i)}
                className={cn(
                  "flex h-8 items-center gap-2.5 rounded-xs px-3 text-left text-[15px] transition-colors",
                  on ? "text-[#0A0A0A]" : "text-neutral-500 hover:text-[#0A0A0A]",
                )}
              >
                <Icon
                  className={cn("size-[18px]", on ? "text-[#EA6100]" : "text-current")}
                  strokeWidth={1.5}
                />
                {t.label}
              </button>
            );
          })}
        </nav>
        <div className="flex flex-col gap-16 md:gap-36">
          {WHY_TABS.map((t, i) => (
            <WhyBlock
              key={t.id}
              tab={t}
              blockRef={(el) => {
                blocks.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
