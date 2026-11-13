import { RevealLine } from "../../ui/RevealLine";
import { RevealText } from "../../ui/RevealText";
import { LINE_GAP } from "../../ui/reveal";
import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import type { WhyTab } from "../../data/why";
import { useInView } from "../../hooks/useInView";
import { CategoryRail } from "./CategoryRail";
import { Img } from "../../ui/Img";
import { Haze } from "../../ui/Haze";

const OrderPhone = lazy(() => import("./OrderPhone").then((m) => ({ default: m.OrderPhone })));

export function WhyBlock({ tab }: { tab: WhyTab }) {
  const [ref, inView] = useInView<HTMLDivElement>("0px", 0.35);

  const left = tab.id !== "elsigma";

  const visual =
    tab.id === "liczby" ? (
      <Suspense fallback={<div className="aspect-[564/451] w-full rounded-xs border border-neutral-200 bg-neutral-100 lg:aspect-[3/2]" />}>
        <OrderPhone play={inView} />
      </Suspense>
    ) : tab.id === "rozwiazania" ? (
      <div className="relative isolate overflow-hidden rounded-xs border border-neutral-200 bg-neutral-100">
        <Haze tile="rozwiazania" />
        <CategoryRail play={inView} />
      </div>
    ) : (
      <div className="relative isolate flex aspect-[564/422] w-full items-center lg:aspect-[3/2] justify-center overflow-hidden rounded-xs border border-neutral-200 bg-neutral-100">
        <Haze tile="elsigma" />
        <Img
          skeletonClassName="aspect-[4/1] rounded-xs"
          src="/photos/elsigma-logo.webp"
          alt="Grupa El-Sigma, polskie hurtownie elektryczne"
          className="h-auto w-1/2 lg:w-2/5"
        />
      </div>
    );

  return (
    <div
      ref={ref}
      className={cn(
        "grid items-start gap-4 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-20 lg:gap-y-3",
        left ? "lg:grid-cols-[4fr_5fr]" : "lg:grid-cols-[5fr_4fr]",
      )}
    >
      <h3
        className={cn(
          "text-[17px] leading-[1.35] tracking-[-0.015em] md:text-[19px] lg:row-start-2 lg:px-10",
          left ? "lg:col-start-1" : "lg:col-start-2",
        )}
      >
        <RevealLine text={tab.heading} />
      </h3>
      <div
        className={cn(
          "lg:row-span-4 lg:row-start-1",
          left ? "lg:col-start-2" : "lg:col-start-1",
        )}
      >
        {visual}
      </div>
      <p
        className={cn(
          "text-[15px] leading-[1.4] text-neutral-600 lg:text-neutral-500 lg:row-start-3 lg:px-10",
          left ? "lg:col-start-1" : "lg:col-start-2",
        )}
      >
        <RevealText text={tab.text} delay={LINE_GAP} />
      </p>
    </div>
  );
}
