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
import { TextAnimate } from "@/components/ui/text-animate";
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
import { useCenteredHorizontalScroll } from "@/hooks/useCenteredHorizontalScroll";
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
          className="absolute right-4 top-4 h-4 w-4 text-blackk/45 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-orange sm:right-5 sm:top-5"
        />
      )}

      <div className="flex flex-1 flex-col items-center justify-center py-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blackk/15 bg-neutral-100/80 text-blackk/35 transition-colors duration-300 group-hover:border-blackk/25 group-hover:bg-neutral-100 sm:h-16 sm:w-16">
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
    "tile-surface group relative flex min-h-[26rem] w-full flex-1 flex-col p-4 transition-colors duration-300 hover:bg-neutral-200 sm:p-5 md:aspect-auto md:min-h-[30rem]";

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
  const skipTitleSyncRef = useRef(false);

  const scrollTitleIntoView = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = titlesScrollRef.current;
      const chip = container?.querySelector<HTMLElement>(
        `[data-offer-title="${index}"]`
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

  useLayoutEffect(() => {
    scrollTitleIntoView(0, "auto");
  }, [scrollTitleIntoView]);

  const [isMobile, setIsMobile] = useState(false);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const handleMobileOfferChange = useCallback((index: number) => {
    if (activeIndexRef.current === index) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  useCenteredHorizontalScroll<number>(
    titlesScrollRef,
    "[data-offer-title]",
    handleMobileOfferChange,
    (element) => Number(element.dataset.offerTitle),
    { enabled: isMobile, skipSyncRef: skipTitleSyncRef }
  );

  const goToCategory = useCallback(
    (index: number) => {
      const normalized =
        ((index % offerItems.length) + offerItems.length) % offerItems.length;

      activeIndexRef.current = normalized;
      setActiveIndex(normalized);
      scrollTitleIntoView(normalized);
      carouselApi?.scrollTo(normalized);
    },
    [carouselApi, scrollTitleIntoView]
  );

  const goToMobilePrev = useCallback(() => {
    goToCategory(activeIndexRef.current - 1);
  }, [goToCategory]);

  const goToMobileNext = useCallback(() => {
    goToCategory(activeIndexRef.current + 1);
  }, [goToCategory]);

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

      activeIndexRef.current = normalized;
      setActiveIndex(normalized);
      if (isMobile) scrollTitleIntoView(normalized);
    };

    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi, isMobile, scrollTitleIntoView]);

  useEffect(() => {
    if (!carouselApi) return;
    const onResize = () => carouselApi.reInit();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [carouselApi]);

  return (
    <div className="bg-background">
      <section
        id="oferta"
        className="w-full bg-background py-8 font-geist md:py-12"
      >
        <div className="maxw flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-x-5 md:gap-y-8">
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
                className="hidden md:block"
              >
                Kompleksowa oferta materiałów elektrycznych i teletechnicznych.
              </TextAnimate>
              <TextAnimate
                as="span"
                animation="fadeIn"
                by="text"
                once
                className="block md:hidden"
              >
                Kompleksowa oferta materiałów
              </TextAnimate>
              <TextAnimate
                as="span"
                animation="fadeIn"
                by="text"
                once
                delay={0.15}
                className="block md:hidden"
              >
                elektrycznych i teletechnicznych.
              </TextAnimate>
              <TextAnimate
                as="span"
                animation="fadeIn"
                by="text"
                once
                delay={0.2}
                className="hidden text-blackk/45 md:block"
              >
                Wybierz kategorię i sprawdź asortyment.
              </TextAnimate>
              <TextAnimate
                as="span"
                animation="fadeIn"
                by="text"
                once
                delay={0.2}
                className="block text-blackk/45 md:hidden"
              >
                Wybierz kategorię i sprawdź
              </TextAnimate>
              <TextAnimate
                as="span"
                animation="fadeIn"
                by="text"
                once
                delay={0.3}
                className="block text-blackk/45 md:hidden"
              >
                asortyment.
              </TextAnimate>
            </h2>

            <aside className="flex min-h-0 flex-col gap-4 md:col-start-1 md:row-start-2 md:justify-between md:pr-4">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="heading-h3 text-blackk">Kategorie asortymentu</h3>
                  <p className="mt-3 mb-6 text-sm font-gesit font-normal leading-relaxed tracking-tight text-blackk/65">
                    Wybierz dział i przejdź do szczegółów wybranej kategorii.
                  </p>
                </div>

                <nav
                  className="hidden flex-col gap-2.5 md:flex"
                  aria-label="Kategorie oferty"
                >
                  {offerItems.map((item, index) => (
                    <OfferCategoryButton
                      key={item.id}
                      label={item.label}
                      isActive={index === activeIndex}
                      onClick={() => goToCategory(index)}
                    />
                  ))}
                </nav>
              </div>

              <div className="ml-5.5 hidden gap-1 md:flex">
                <button
                  type="button"
                  onClick={scrollCarouselPrev}
                  aria-label="Poprzednia kategoria"
                  className="flex size-10 items-center justify-center rounded-sm border border-blackk/15 bg-neutral-100 text-blackk transition"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={scrollCarouselNext}
                  aria-label="Następna kategoria"
                  className="flex size-10 items-center justify-center rounded-sm border border-blackk/15 bg-neutral-100 text-blackk transition"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
            </aside>

            <div className="relative left-1/2 w-screen -translate-x-1/2 border-b border-blackk/10 md:hidden">
              <div
                ref={titlesScrollRef}
                className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-[50vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {offerItems.map((item, index) => (
                  <span
                    key={item.id}
                    data-offer-title={index}
                    className="snap-center"
                  >
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

            <p className="text-[11px] tracking-[0.02em] text-blackk/45 md:hidden">
              {offerItems[activeIndex].label} · {activeIndex + 1} z{" "}
              {offerItems.length}
            </p>

            <div className="md:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  <OfferCard
                    item={offerItems[activeIndex]}
                    index={activeIndex}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-3 flex justify-start gap-1 md:hidden">
              <button
                type="button"
                onClick={goToMobilePrev}
                aria-label="Poprzednia kategoria"
                className="flex size-10 items-center justify-center rounded-sm border border-blackk/15 bg-neutral-100 text-blackk transition"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={goToMobileNext}
                aria-label="Następna kategoria"
                className="flex size-10 items-center justify-center rounded-sm border border-blackk/15 bg-neutral-100 text-blackk transition"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>

            <div className="hidden min-w-0 md:col-span-3 md:col-start-2 md:row-start-2 md:block">
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
                      className="min-w-0 shrink-0 grow-0 basis-full px-1 first:pl-1.5 sm:pl-0 md:basis-1/2 md:max-w-1/2 lg:basis-[calc((100%_-_0.5rem)/3)] lg:max-w-[calc((100%_-_0.5rem)/3)]"
                    >
                      <OfferCard item={item} index={index} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Offer;
