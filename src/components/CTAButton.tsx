import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextAnimate } from "@/components/ui/text-animate";

gsap.registerPlugin(ScrollTrigger);

type CTAButtonProps = {
    onClick?: () => void;
    label?: string;
};

const CTAButton = ({
    onClick,
    label = "Zadzwoń do nas",
}: CTAButtonProps) => {
    const ctaBlockRef = useRef<HTMLDivElement | null>(null);
    const fillRef = useRef<HTMLDivElement | null>(null);
    const textRefs = useRef<(HTMLElement | null)[]>([]);
    const rippleRef = useRef<HTMLSpanElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const location = useLocation();
    const isCtaInView = useInView(ctaBlockRef, { once: true, amount: 0.8 });

    useEffect(() => {
        if (!rippleRef.current) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) return;

        timelineRef.current?.kill();
        gsap.set(rippleRef.current, {
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
        });
        const tl = gsap
            .timeline({
                repeat: -1,
                defaults: { ease: "power2.out" },
            })
            .fromTo(
                rippleRef.current,
                {
                    scaleX: 1,
                    scaleY: 1,
                    opacity: 1,
                },
                {
                    scaleX: 1.45,
                    scaleY: 1.8,
                    opacity: 0,
                    duration: 3,
                    ease: "power2.out",
                }
            );

        timelineRef.current = tl;
        return () => {
            tl.kill();
            timelineRef.current = null;
        };
    }, [location.pathname]);

    useEffect(() => {
        if (!ctaBlockRef.current || !fillRef.current) return;

        const mm = gsap.matchMedia();

        gsap.set(fillRef.current, {
            width: "120vmax",
            height: "120vmax",
            scale: 0,
        });

        mm.add("(min-width: 640px)", () => {
            if (!ctaBlockRef.current || !fillRef.current) return;

            const fillTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ctaBlockRef.current,
                    start: "top 90%",
                    end: "bottom 10%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                },
            });

            fillTl.to(fillRef.current, {
                scale: 2,
                ease: "none",
            });

            return () => {
                fillTl.scrollTrigger?.kill();
                fillTl.kill();
            };
        });
        mm.add("(max-width: 639px)", () => {
            if (!ctaBlockRef.current || !fillRef.current) return;

            const fillTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ctaBlockRef.current,
                    start: "top 70%",
                    once: true,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                },
            });

            fillTl.to(fillRef.current, {
                scale: 2,
                duration: 3.2,
                ease: "power2.out",
            });

            return () => {
                fillTl.scrollTrigger?.kill();
                fillTl.kill();
            };
        });

        return () => {
            mm.revert();
        };
    }, []);

    useEffect(() => {
        if (!ctaBlockRef.current || textRefs.current.length === 0) return;

        gsap.set(textRefs.current[0], {
            opacity: 0,
            y: 30,
        });

        const mm = gsap.matchMedia();

        mm.add("(min-width: 640px)", () => {
            if (!ctaBlockRef.current) return;

            const textTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ctaBlockRef.current,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                },
            });

            textTl.to(textRefs.current, {
                color: "#ffffff",
                ease: "none",
            });

            return () => {
                textTl.scrollTrigger?.kill();
                textTl.kill();
            };
        });

        mm.add("(max-width: 639px)", () => {
            if (!ctaBlockRef.current) return;

            const textTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ctaBlockRef.current,
                    start: "top 70%",
                    once: true,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                },
            });

            textTl.to(textRefs.current, {
                color: "#ffffff",
                duration: 0.8,
                ease: "power2.out",
            });

            return () => {
                textTl.scrollTrigger?.kill();
                textTl.kill();
            };
        });

        return () => {
            mm.revert();
        };
    }, []);

    useEffect(() => {
        if (!ctaBlockRef.current || textRefs.current.length === 0) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 640px)", () => {
            if (!ctaBlockRef.current) return;

            const fadeTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ctaBlockRef.current,
                    start: "top 85%",
                    once: true,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                },
            });

            fadeTl.to(textRefs.current[0], {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
            });

            return () => {
                fadeTl.scrollTrigger?.kill();
                fadeTl.kill();
            };
        });

        mm.add("(max-width: 639px)", () => {
            if (!ctaBlockRef.current) return;

            const fadeTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ctaBlockRef.current,
                    start: "top 75%",
                    once: true,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                },
            });

            fadeTl.to(textRefs.current[0], {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
            });

            return () => {
                fadeTl.scrollTrigger?.kill();
                fadeTl.kill();
            };
        });

        return () => {
            mm.revert();
        };
    }, []);

    useEffect(() => {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

        ScrollTrigger.config({
            autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
        });

        if (!isMobile) {
            const refreshScrollTrigger = () => {
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 100);
            };

            if (document.readyState === "complete") {
                refreshScrollTrigger();
            } else {
                window.addEventListener("load", refreshScrollTrigger);
            }

            const timeoutId = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);

            const handleResize = () => {
                ScrollTrigger.refresh();
            };
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("load", refreshScrollTrigger);
                window.removeEventListener("resize", handleResize);
                clearTimeout(timeoutId);
            };
        }
    }, []);

    return (
        <div
            ref={ctaBlockRef}
            className="relative overflow-hidden flex flex-col justify-center items-center z-10 text-start sm:text-center w-full py-5 min-h-100 rounded-xl gap-3"
        >
            <div
                ref={fillRef}
                className="absolute -bottom-50 sm:left-1/2 -translate-x-1/2 w-0 h-0 rounded-full bg-black sm:border-20 sm:border-accent-orange blur-none sm:blur-[10px] sm:brightness-110 pointer-events-none transform-gpu will-change-transform"
            />

            <div className=" z-10 flex flex-col justify-center items-center gap-2 text-center">
                <p
                    ref={(el) => {
                        textRefs.current[0] = el;
                    }}
                    className="font-poppins text-sm  tracking-tight text-black"
                >
                    Gotowy na współpracę?
                </p>

                <h2
                    ref={(el) => {
                        textRefs.current[1] = el;
                    }}
                    className="font-poppins text-2xl leading-tight tracking-tight text-black"
                >
                    <TextAnimate
                        as="span"
                        animation="fadeIn"
                        by="word"
                        startOnView={false}
                        animate={isCtaInView ? "show" : "hidden"}
                        initial="hidden"
                        className="inline"
                    >
                        Dołącz do grona
                    </TextAnimate>
                    <br />
                    <TextAnimate
                        as="span"
                        animation="fadeIn"
                        by="word"
                        startOnView={false}
                        animate={isCtaInView ? "show" : "hidden"}
                        initial="hidden"
                        delay={0.2}
                        className="inline"
                    >
                        naszych
                    </TextAnimate>{" "}
                    <TextAnimate
                        as="span"
                        animation="fadeIn"
                        by="word"
                        startOnView={false}
                        animate={isCtaInView ? "show" : "hidden"}
                        initial="hidden"
                        delay={0.28}
                        className="inline text-accent-orange"
                    >
                        klientów
                    </TextAnimate>
                </h2>
            </div>

            <button
                type="button"
                onClick={onClick}
                className="focus-ring press-scale touch-manipulation relative w-auto cursor-pointer overflow-visible rounded-md border border-orange-500/60 bg-white px-6 py-2 font-robert-medium text-xl text-black"
            >
                <span className="relative z-10 text-sm">{label}</span>

                <span
                    ref={rippleRef}
                    className="
      absolute inset-0 rounded-md
      border border-orange-500
      pointer-events-none
    "
                />
            </button>
        </div>
    );
};

export default CTAButton;
