import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRightIcon } from "lucide-react";

const partnerLogos = [
    { src: "/photos/awex.webp", alt: "Awex" },
    { src: "/photos/dehn.webp", alt: "Dehn" },
    { src: "/photos/hager.webp", alt: "Hager" },
    { src: "/photos/kanlux.webp", alt: "Kanlux" },
    { src: "/photos/legrand.webp", alt: "Legrand" },
    { src: "/photos/noark.webp", alt: "Noark" },
    { src: "/photos/ospel.webp", alt: "Ospel" },
    { src: "/photos/wago.webp", alt: "Wago" },
];

const Info = () => {
    const [isOpen, setIsOpen] = useState(false);
    const hasBeenOpened = useRef(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const triggerTl = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!triggerRef.current) return;

        triggerTl.current = gsap
            .timeline({ repeat: -1, yoyo: true })
            .to(triggerRef.current, {
                scale: 1.03,
                duration: 1.1,
                ease: "sine.inOut",
            });

        gsap.fromTo(
            triggerRef.current,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.65, delay: 1.4, ease: "power3.out" }
        );

        return () => {
            triggerTl.current?.kill();
        };
    }, []);

    useEffect(() => {
        const id = window.setTimeout(() => {
            setIsOpen(true);
        }, 5000);
        return () => window.clearTimeout(id);
    }, []);

    useEffect(() => {
        if (!panelRef.current || !overlayRef.current) return;

        if (isOpen) {
            hasBeenOpened.current = true;

            gsap.set(panelRef.current, { display: "flex" });
            gsap.set(overlayRef.current, { display: "block" });

            const tl = gsap.timeline();

            tl.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.35, ease: "power2.out" }
            );

            tl.fromTo(
                panelRef.current,
                {
                    opacity: 0,
                    y: 48,
                    scale: 0.97,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power3.out",
                },
                "-=0.2"
            );

            if (contentRef.current) {
                const items = contentRef.current.querySelectorAll("[data-animate]");
                tl.fromTo(
                    items,
                    { opacity: 0, y: 16 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.06,
                        ease: "power2.out",
                    },
                    "-=0.25"
                );
            }

            if (triggerRef.current) {
                gsap.to(triggerRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.28,
                    ease: "power2.in",
                });
                triggerTl.current?.pause();
            }
        } else if (hasBeenOpened.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(panelRef.current, { display: "none" });
                    gsap.set(overlayRef.current, { display: "none" });
                },
            });

            tl.to(panelRef.current, {
                opacity: 0,
                y: 28,
                scale: 0.98,
                duration: 0.32,
                ease: "power2.in",
            });

            tl.to(
                overlayRef.current,
                { opacity: 0, duration: 0.28, ease: "power2.in" },
                "-=0.12"
            );

            if (triggerRef.current) {
                gsap.to(triggerRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.4,
                    delay: 0.12,
                    ease: "power3.out",
                });
                triggerTl.current?.resume();
            }
        }
    }, [isOpen]);

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(true)}
                className="group fixed bottom-6 right-6 z-[999] flex cursor-pointer items-center gap-3 rounded-md border border-blackk/30 bg-white/85 px-5 py-3 font-poppins text-[13px] font-normal tracking-[0.06em] text-blackk shadow-[0_8px_32px_-8px_rgba(26,26,26,0.18)] backdrop-blur-md transition-[box-shadow,background-color] hover:bg-white hover:shadow-[0_12px_40px_-10px_rgba(26,26,26,0.22)] opacity-0"
            >
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-orange/35" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-orange" />
                </span>
                Dni Otwarte
            </button>

            <div
                ref={overlayRef}
                role="presentation"
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[1000] hidden bg-navy/25 backdrop-blur-[6px]"
            />

            <div
                ref={panelRef}
                className="fixed z-[1001] hidden max-h-dvh flex-col overflow-hidden border-blackk/[0.06] bg-white inset-0 border-y-0 md:inset-auto md:bottom-8 md:right-8 md:max-h-[min(88dvh,720px)] md:w-[min(100vw-2rem,440px)] md:rounded-[1.35rem] md:border md:shadow-[0_24px_80px_-20px_rgba(31,42,55,0.35),0_0_0_1px_rgba(255,255,255,0.6)_inset]"
            >
                <header className="flex shrink-0 items-start justify-between gap-4 border-b border-blackk/[0.06] bg-linear-to-b from-cream/40 to-white px-6 pb-4 pt-5 md:rounded-t-[1.35rem] md:pb-5 md:pt-6">
                    <div className="min-w-0 pt-0.5">
                        <p className="mb-1 font-poppins text-[10px] font-normal uppercase tracking-[0.22em] text-blackk/40">
                            Wydarzenie
                        </p>
                        <h3 className="font-poppins text-[1.05rem] font-normal leading-snug tracking-[-0.01em] text-blackk">
                            Poznaj Brados od Środka
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="mt-0.5 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-blackk/10 bg-white/70 text-blackk/55 transition-colors hover:border-blackk/15 hover:bg-white hover:text-blackk"
                        aria-label="Zamknij"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </header>

                <div
                    ref={contentRef}
                    className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-y-contain px-6 py-6 [scrollbar-width:thin] [scrollbar-color:rgba(26,26,26,0.15)_transparent]"
                >
                    <div data-animate className="w-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-blackk/[0.08]">
                        <div className="relative aspect-[16/9] w-full bg-stone-100">
                            <img
                                src="/photos/logo3d.webp"
                                alt="Brados — Dni Otwarte"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div data-animate className="flex flex-col gap-4">
                        <div className="flex  items-center gap-2 w-full ">
                            <span className="inline-flex border rounded-md border-blackk/12 bg-white px-3 py-1.5 font-poppins text-[15px] font-normal tracking-[0.08em] text-blackk/70 w-1/2 text-center justify-center">
                                23–24 kwietnia
                            </span>
                            <span className="inline-flex border rounded-md border-blackk/12 bg-white px-3 py-1.5 font-poppins text-[15px] font-normal tabular-nums tracking-[0.06em] text-blackk/70 w-1/2 text-center justify-center">
                                9:00 — 16:00
                            </span>
                        </div>
                        <p className="font-poppins text-sm font-normal  tracking-[-0.008em] text-blackk/58">
                            Zapraszamy na Dni Otwarte Brados. Przestrzeń, w której poznasz naszą ofertę w spokojnym tempie, wymienisz się doświadczeniami z ekspertami branży i zobaczysz aktualne rozwiązania na żywo. Obecni będą przedstawiciele producentów, specjalne warunki oraz czas na rozmowę przy kawie — tak, by każdy mógł wyjść z konkretną wartością.
                        </p>
                    </div>

                    <div data-animate className="flex flex-col gap-3 pt-1 ">
                        <div className="flex justify-between items-center">
                            <p className="font-poppins text-[10px] font-normal uppercase tracking-[0.26em] text-blackk/50 mt-1">
                                Wystawcy
                            </p>
                            <div className="flex justify-between items-center gap-2 text-blackk/50">

                                <ArrowRightIcon className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="overflow-x-auto overscroll-x-contain  [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [scrollbar-color:rgba(120,113,108,0.35)_transparent]">
                            <div className="flex w-max items-stretch gap-3">
                                {partnerLogos.map((logo) => (
                                    <div
                                        key={logo.alt}
                                        className="flex h-[100px] w-[156px] shrink-0 items-center justify-center rounded-md border border-stone-200/80 bg-white px-3 py-2 shadow-[0_1px_2px_rgba(28,25,23,0.06)]"
                                    >
                                        <img
                                            src={logo.src}
                                            alt={logo.alt}
                                            className="max-w-[100px] object-contain opacity-80"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Info;
