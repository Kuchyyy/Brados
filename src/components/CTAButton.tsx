import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

type CTAButtonProps = {
    onClick?: () => void;
    label?: string;
};

const CTAButton = ({
    onClick,
    label = "Zadzwoń do nas",
}: CTAButtonProps) => {
    const rippleRef = useRef<HTMLSpanElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (!rippleRef.current) return;
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

    return (
        <button
            onClick={onClick}
            className="
              relative w-auto
    px-6 py-2 rounded-md cursor-pointer
    text-black text-xl font-robert-medium
    bg-white
    border border-orange-500/60
    overflow-visible 
  "
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
    );
};

export default CTAButton;
