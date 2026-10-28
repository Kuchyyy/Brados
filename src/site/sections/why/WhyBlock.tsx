import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { BOX_H, BOX_W, type WhyTab } from "../../data/why";
import { useInView } from "../../hooks/useInView";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { FeaturePoint } from "../../ui/FeaturePoint";
import { Scaled } from "../../ui/Scaled";
import { Funnel } from "./Funnel";
import { SolutionsBox } from "./SolutionsBox";
import { Img } from "../../ui/Img";
import { Haze } from "../../ui/Haze";

const OrderPhone = lazy(() => import("./OrderPhone").then((m) => ({ default: m.OrderPhone })));

function BlockHeading({ tab }: { tab: WhyTab }) {
  return (
    <>
      <h3 className="text-[17px] leading-[1.35] tracking-[-0.015em] md:text-[19px]">
        {tab.heading}
      </h3>
      <p className="mt-3 max-w-[440px] text-[15px] leading-[1.45] text-neutral-600 lg:leading-[1.6] lg:text-neutral-500">
        {tab.text}
      </p>
    </>
  );
}

export function WhyBlock({
  tab,
  blockRef,
}: {
  tab: WhyTab;
  blockRef: (el: HTMLDivElement | null) => void;
}) {
  const [ref, inView] = useInView<HTMLDivElement>("0px", 0.35);
  const wide = useMediaQuery("(min-width: 768px)");

  const setRefs = (el: HTMLDivElement | null) => {
    ref.current = el;
    blockRef(el);
  };

  if (tab.id === "rozwiazania") {
    return (
      <div ref={setRefs} data-id={tab.id}>
        {wide ? (
          <>
            <BlockHeading tab={tab} />
            <div className="mt-10 grid place-items-center relative isolate overflow-hidden rounded-xs bg-neutral-100 px-6 py-10 lg:px-16 lg:py-[72px]">
              <Haze tile="rozwiazania" />
              <Scaled w={1128} h={422}>
                <Funnel play={inView} />
              </Scaled>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-[17px] leading-[1.35] tracking-[-0.015em]">
              {tab.heading}
            </h3>
            <div className="mt-4 overflow-hidden rounded-xs">
              <Scaled w={BOX_W} h={BOX_H}>
                <SolutionsBox
                  w={BOX_W}
                  h={BOX_H}
                  lineY={250}
                  headingSize={36}
                  headingTop={56}
                  pillWidth={420}
                  play={inView}
                />
              </Scaled>
            </div>
            <p className="mt-4 max-w-[440px] text-[15px] leading-[1.45] text-neutral-600 lg:leading-[1.6] lg:text-neutral-500">
              {tab.text}
            </p>
          </>
        )}
        <div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-3 md:gap-y-5">
          {tab.points.map((p) => (
            <FeaturePoint key={p.title} point={p} />
          ))}
        </div>
      </div>
    );
  }

  const left = tab.id !== "elsigma";

  const visual =
    tab.id === "liczby" ? (
      <Suspense fallback={<div className="aspect-[564/451] w-full rounded-xs bg-neutral-100" />}>
        <OrderPhone play={inView} />
      </Suspense>
    ) : (
      <div className="relative isolate flex aspect-[564/422] w-full items-center justify-center overflow-hidden rounded-xs bg-neutral-100">
        <Haze tile="elsigma" />
        <Img
          skeletonClassName="aspect-[4/1] rounded-xs"
          src="/photos/elsigma-logo.webp"
          alt="Grupa El-Sigma, polskie hurtownie elektryczne"
          className="h-auto w-1/2"
        />
      </div>
    );

  return (
    <div
      ref={setRefs}
      data-id={tab.id}
      className="grid items-start gap-4 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] lg:gap-x-16 lg:gap-y-3"
    >
      <h3
        className={cn(
          "text-[17px] leading-[1.35] tracking-[-0.015em] md:text-[19px] lg:row-start-1",
          left ? "lg:col-start-1" : "lg:col-start-2",
        )}
      >
        {tab.heading}
      </h3>
      <div
        className={cn(
          "lg:row-span-3 lg:row-start-1",
          left ? "lg:col-start-2" : "lg:col-start-1",
        )}
      >
        {visual}
      </div>
      <p
        className={cn(
          "max-w-[440px] text-[15px] leading-[1.45] text-neutral-600 lg:leading-[1.6] lg:text-neutral-500 lg:row-start-2",
          left ? "lg:col-start-1" : "lg:col-start-2",
        )}
      >
        {tab.text}
      </p>
      <div
        className={cn(
          "mt-2 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:mt-3 lg:row-start-3 lg:gap-y-5",
          left ? "lg:col-start-1" : "lg:col-start-2",
        )}
      >
        {tab.points.map((p) => (
          <FeaturePoint key={p.title} point={p} />
        ))}
      </div>
    </div>
  );
}
