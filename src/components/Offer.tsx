"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Settings,
  Wifi,
  Box,
  Plug,
  Lightbulb,
  Antenna,
  Zap,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { pages } from "../data/page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type OfferItem = {
  id: string;
  icon: ReactNode;
  label: string;
  description: string;
};

const offerItems: OfferItem[] = [
  {
    id: "1",
    icon: <Settings className="h-7 w-7" strokeWidth={1.25} />,
    label: "Aparatura modułowa i sterowanie",
    description:
      "Sterowniki, moduły i systemy automatyki do precyzyjnego zarządzania instalacjami.",
  },
  {
    id: "2",
    icon: <Wifi className="h-7 w-7" strokeWidth={1.25} />,
    label: "Narzędzia i mierniki",
    description:
      "Multimetry, testery i akcesoria pomiarowe do codziennej pracy instalatora.",
  },
  {
    id: "3",
    icon: <Zap className="h-7 w-7" strokeWidth={1.25} />,
    label: "Sieci niskoprądowe i okablowanie",
    description:
      "Rozwiązania do transmisji danych i sygnałów w biurach, przemyśle i domu.",
  },
  {
    id: "4",
    icon: <Box className="h-7 w-7" strokeWidth={1.25} />,
    label: "Rozdzielnice i obudowy",
    description:
      "Rozdzielnice i obudowy chroniące sprzęt i porządkujące instalację.",
  },
  {
    id: "5",
    icon: <Plug className="h-7 w-7" strokeWidth={1.25} />,
    label: "Osprzęt elektroinstalacyjny",
    description:
      "Gniazda, wyłączniki i złącza — trwałość, bezpieczeństwo i design.",
  },
  {
    id: "6",
    icon: <Lightbulb className="h-7 w-7" strokeWidth={1.25} />,
    label: "Technika świetlna",
    description:
      "Lampy, oprawy i LED — energooszczędne oświetlenie do każdego wnętrza.",
  },
  {
    id: "7",
    icon: <Antenna className="h-7 w-7" strokeWidth={1.25} />,
    label: "System tras i mocowania",
    description: "Kanały, koryta i uchwyty do szybkiego i bezpiecznego montażu.",
  },
  {
    id: "8",
    icon: <Plug className="h-7 w-7" strokeWidth={1.25} />,
    label: "Kable i przewody",
    description: "Przewody energetyczne i sygnałowe do wymagających instalacji.",
  },
  {
    id: "9",
    icon: <Zap className="h-7 w-7" strokeWidth={1.25} />,
    label: "Ochrona odgromowa",
    description: "Systemy ochrony przed wyładowaniami atmosferycznymi.",
  },
  {
    id: "10",
    icon: <Circle className="h-7 w-7" strokeWidth={1.25} />,
    label: "Pozostałe",
    description: "Akcesoria i komponenty uzupełniające asortyment hurtowni.",
  },
];

function OfferCategoryButton({
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
        "inline-flex min-w-0 items-start gap-1.5 text-left font-medium tracking-[0.01em] transition-colors",
        layout === "scroll"
          ? "shrink-0 snap-start whitespace-nowrap text-xs leading-snug"
          : "text-xs leading-snug",
        isActive ? "text-blackk" : "text-blackk/40 hover:text-blackk/65",
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

function OfferCard({ item, index }: { item: OfferItem; index: number }) {
  const page = pages.find((p) => p.id === item.id);
  const number = String(index + 1).padStart(2, "0");

  const content = (
    <>
      <span className="text-[10px] font-medium tracking-widest text-blackk/45">
        {number}
      </span>

      {page && (
        <ArrowUpRight
          aria-hidden
          className="absolute right-4 top-4 h-4 w-4 text-blackk/45 transition-transform duration-300 ease-out group-hover:translate-x-1 sm:right-5 sm:top-5"
        />
      )}

      <div className="flex flex-1 flex-col items-center justify-center py-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blackk/10 bg-white/60 text-blackk/35 transition-colors duration-300 group-hover:border-blackk/20 group-hover:bg-white/80 sm:h-16 sm:w-16">
          {item.icon}
        </div>
      </div>

      <p className="mb-0.5 text-sm font-medium leading-snug tracking-[-0.01em] text-blackk">
        {item.label}
      </p>

      <p className="line-clamp-2 text-[11px] leading-snug text-blackk/55 sm:text-xs">
        {item.description}
      </p>
    </>
  );

  const tileClassName =
    "group relative flex min-h-[26rem] w-full flex-1 flex-col rounded-none bg-neutral-100 p-4 transition-colors duration-300 hover:bg-neutral-200/80 sm:p-5 md:aspect-auto md:min-h-[30rem]";

  if (!page) {
    return (
      <article className="flex h-full min-w-0 flex-col">
        <div className={tileClassName}>{content}</div>
      </article>
    );
  }

  return (
    <article className="flex h-full min-w-0 flex-col">
      <Link to={`/${page.slug}`} className={`${tileClassName} cursor-pointer`}>
        {content}
      </Link>
    </article>
  );
}

const Offer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const titlesScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollTitleIntoView = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = titlesScrollRef.current;
      const chip = container?.querySelector<HTMLElement>(
        `[data-offer-title="${index}"]`
      );

      if (!container || !chip || container.clientWidth === 0) return;

      container.scrollTo({
        left:
          chip.offsetLeft + chip.offsetWidth / 2 - container.clientWidth / 2,
        behavior,
      });
    },
    []
  );

  useLayoutEffect(() => {
    scrollTitleIntoView(0, "auto");
  }, [scrollTitleIntoView]);

  const goToCategory = useCallback(
    (index: number) => {
      setActiveIndex(index);
      scrollTitleIntoView(index);
      carouselApi?.scrollTo(index);
    },
    [carouselApi, scrollTitleIntoView]
  );

  const scrollCarouselPrev = useCallback(() => {
    carouselApi?.scrollPrev();
  }, [carouselApi]);

  const scrollCarouselNext = useCallback(() => {
    carouselApi?.scrollNext();
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const index = carouselApi.selectedScrollSnap();
      const normalized =
        ((index % offerItems.length) + offerItems.length) %
        offerItems.length;

      setActiveIndex(normalized);
      scrollTitleIntoView(normalized);
    };

    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi, scrollTitleIntoView]);

  useEffect(() => {
    if (!carouselApi) return;
    const onResize = () => carouselApi.reInit();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [carouselApi]);

  return (
    <div className="flex w-full items-center justify-center py-20 font-geist">
      <section
        id="oferta"
        className="maxw relative mb-2 py-8 md:py-12"
      >
        <div className="md:hidden">
          <h2 className="py-10 heading-h2">
            Kompleksowa oferta materiałów elektrycznych i teletechnicznych.
            <span className="text-blackk/45">
              {" "}
              Wybierz kategorię i sprawdź asortyment.
            </span>
          </h2>

          <div
            ref={titlesScrollRef}
            className="relative left-1/2 mb-5 flex  w-screen -translate-x-1/2 gap-6 overflow-x-auto px-[40vw] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {offerItems.map((item, index) => (
              <span key={item.id} data-offer-title={index}>
                <OfferCategoryButton
                  label={item.label}
                  isActive={index === activeIndex}
                  onClick={() => goToCategory(index)}
                  layout="scroll"
                />
              </span>
            ))}
          </div>

        </div>

        <div className="md:grid md:grid-cols-4 md:gap-x-5 md:gap-y-8">
          <div className="col-span-3 col-start-2 hidden md:block py-20">
            <h2 className=" text-blackk heading-h2">
              Kompleksowa oferta materiałów elektrycznych i teletechnicznych.
              <span className="text-blackk/45">
                {" "}
                Wybierz kategorię i sprawdź asortyment.
              </span>
            </h2>
          </div>

          <nav
            className="col-start-1 row-start-2 hidden min-h-0 flex-col justify-between pt-1 md:flex"
            aria-label="Kategorie oferty"
          >
            <div className="flex flex-col gap-2.5">
              {offerItems.map((item, index) => (
                <OfferCategoryButton
                  key={item.id}
                  label={item.label}
                  isActive={index === activeIndex}
                  onClick={() => goToCategory(index)}
                />
              ))}
            </div>

            <div className=" ml-5.5 flex gap-2">
              <button
                type="button"
                onClick={scrollCarouselPrev}
                aria-label="Poprzednia kategoria"
                className="flex size-10 items-center justify-center rounded-none border border-blackk/15 bg-white text-blackk transition"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={scrollCarouselNext}
                aria-label="Następna kategoria"
                className="flex size-10 items-center justify-center rounded-none border border-blackk/15 bg-white text-blackk transition"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          </nav>

          <div className="min-w-0 col-span-3 md:col-start-2 md:row-start-2">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                loop: true,
                align: "start",
                slidesToScroll: 1,
                containScroll: false,
              }}
              className="w-full touch-pan-y"
            >
              <CarouselContent className="ml-0 !gap-0 lg:!gap-0.5">
                {offerItems.map((item, index) => (
                  <CarouselItem
                    key={item.id}
                    className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 md:max-w-1/2 lg:basis-[calc((100%_-_0.5rem)/3)] lg:max-w-[calc((100%_-_0.5rem)/3)] first:pl-1.5 px-1 sm:pl-0 "
                  >
                    <OfferCard item={item} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="mt-3 ml-1 flex gap-2 md:hidden">
              <button
                type="button"
                onClick={scrollCarouselPrev}
                aria-label="Poprzednia kategoria"
                className="flex size-10 items-center justify-center rounded-none border border-blackk/15 bg-white text-blackk transition"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={scrollCarouselNext}
                aria-label="Następna kategoria"
                className="flex size-10 items-center justify-center rounded-none border border-blackk/15 bg-white text-blackk transition"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offer;
