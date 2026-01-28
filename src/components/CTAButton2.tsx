import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

type CTAButtonProps = {
    onClick?: () => void;
    label?: string;
};

const CTAButton2 = ({
    onClick,
    label = "Zadzwoń do nas",
}: CTAButtonProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stripesRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        setHasAnimated(false);
        if (stripesRef.current) {
            const stripes = stripesRef.current.children;
            gsap.killTweensOf(stripes);
            gsap.set(stripes, { height: 0 });
        }
    }, [location.pathname]);

    useEffect(() => {
        if (!containerRef.current || !stripesRef.current || hasAnimated) return;

        const stripes = stripesRef.current.children;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);

                        gsap.to(stripes[0], { height: "20%", duration: 2, ease: "expo.out", delay: 0.3 });
                        gsap.to(stripes[1], { height: "40%", duration: 2.125, ease: "expo.out", delay: 0.3 });
                        gsap.to(stripes[2], { height: "60%", duration: 2.25, ease: "expo.out", delay: 0.3 });
                        gsap.to(stripes[3], { height: "80%", duration: 2.375, ease: "expo.out", delay: 0.3 });
                        gsap.to(stripes[4], { height: "100%", duration: 2.5, ease: "expo.out", delay: 0.3 });

                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.8 }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [hasAnimated, location.pathname]);

    return (
        <div
            ref={containerRef}
            className="
                relative w-full overflow-hidden
                border border-black/20 bg-white
    
                px-6 py-6 sm:px-8 
                rounded-xl
            "
        >
            <div ref={stripesRef} className="pointer-events-none absolute inset-0">
                <div className="absolute right-[32%] bottom-0 h-0 w-[8%] bg-gradient-to-t from-accent-orange/20 via-accent-orange/10 to-transparent" />
                <div className="absolute right-[24%] bottom-0 h-0 w-[8%] bg-gradient-to-t from-accent-orange/20 via-accent-orange/10 to-transparent" />
                <div className="absolute right-[16%] bottom-0 h-0 w-[8%] bg-gradient-to-t from-accent-orange/30 via-accent-orange/10 to-transparent" />
                <div className="absolute right-[8%] bottom-0 h-0 w-[8%] bg-gradient-to-t from-accent-orange/40 via-accent-orange/10 to-transparent" />
                <div className="absolute right-0 bottom-0 h-0 w-[8%] bg-gradient-to-t from-accent-orange/50 via-accent-orange/15 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 text-left">
                    <p className="font-poppins text-sm tracking-tight text-black/60">
                        Gotowy na współpracę?
                    </p>

                    <h2 className="font-poppins text-2xl tracking-tight text-black">
                        Dołącz do grona{" "}
                        <span className="text-accent-orange">klientów</span>
                    </h2>

                    <p className="font-poppins text-sm tracking-tight text-black/60 mb-6">
                        Działamy szybko i konkretnie. Skontaktuj się z nami.
                    </p>

                    <button
                        onClick={onClick}
                        className="group text-sm text-black border border-black/20 rounded-md px-3 py-2 pr-2 flex justify-between items-center gap-2 hover:border-accent-orange transition-colors duration-300 bg-white cursor-pointer"
                    >
                        {label}
                        <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-orange">
                            <ArrowUpRight className="w-4 h-4 text-white group-hover:rotate-45 duration-300 transition-all" />
                        </span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CTAButton2;
