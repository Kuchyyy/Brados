import { useEffect, useRef, useState } from "react";
import {
    Check,
    Database,
    Shield,
    User,
    UserRound,
    Zap,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nodes: {
    icon: LucideIcon;
    label: string;
    className: string;
    delay: number;
}[] = [
        {
            icon: Check,
            label: "Satysfakcja",
            className: "left-[5%] top-[6%]",
            delay: 120,
        },
        {
            icon: Shield,
            label: "Niezawodność",
            className: "right-[5%] top-[6%]",
            delay: 180,
        },
        {
            icon: Database,
            label: "Asortyment",
            className: "bottom-[6%] left-[5%]",
            delay: 240,
        },
        {
            icon: Zap,
            label: "Sprawność",
            className: "bottom-[6%] right-[5%]",
            delay: 300,
        },
    ];

const connectorPaths = [
    {
        d: "M 46 84 V 126 C 46 146 76 151 116 151 H 132",
        delay: 0,
    },
    {
        d: "M 314 84 V 126 C 314 146 284 151 244 151 H 228",
        delay: 90,
    },
    {
        d: "M 46 276 V 234 C 46 214 76 209 116 209 H 132",
        delay: 180,
    },
    {
        d: "M 314 276 V 234 C 314 214 284 209 244 209 H 228",
        delay: 270,
    },
];

const avatars: {
    icon: LucideIcon;
    label: string;
    className: string;
}[] = [
        {
            icon: UserRound,
            label: "Klient",
            className: "z-10 bg-neutral-100 text-blackk/65",
        },
        {
            icon: User,
            label: "Partner",
            className: "z-20 bg-orange text-white",
        },
        {
            icon: UserRound,
            label: "Klient",
            className: "z-30 bg-neutral-100 text-blackk/65",
        },
        {
            icon: User,
            label: "Partner",
            className: "z-40 bg-orange text-white",
        },
    ];



const auxiliaryPaths = [
    { d: "M 24 180 H 128", delay: 360 },
    { d: "M 232 180 H 336", delay: 420 },
];

function connectorStyle(visible: boolean, delay: number) {
    return {
        opacity: visible ? 1 : 0,
        strokeDasharray: 1,
        strokeDashoffset: visible ? 0 : 1,
        transition: `opacity 500ms ease-out ${delay}ms, stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    };
}

function IconNode({
    icon: Icon,
    label,
    visible,
    delay,
    className,
}: {
    icon: LucideIcon;
    label: string;
    visible: boolean;
    delay: number;
    className: string;
}) {
    return (
        <div
            className={cn(
                "absolute flex size-14 items-center justify-center rounded-full border border-orange/25 bg-neutral-100 shadow-[0_14px_35px_rgba(26,26,26,0.06),0_0_0_6px_rgba(255,98,59,0.035)] transition-all duration-500 sm:size-16",
                className
            )}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.94)",
                transitionDelay: `${delay}ms`,
            }}
            title={label}
        >
            <Icon className="size-5 text-orange sm:size-6" strokeWidth={1.45} />
            <span className="sr-only">{label}</span>
        </div>
    );
}

function CenterHub({ visible }: { visible: boolean }) {
    return (
        <div className="absolute left-1/2 top-1/2 z-10 w-[10.25rem] -translate-x-1/2 -translate-y-1/2 sm:w-[11.25rem]">
            <div
                className="flex h-13 items-center justify-center "
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scale(1)" : "scale(0.95)",
                    transitionDelay: "420ms",
                }}
            >
                {avatars.map((avatar, index) => {
                    const Icon = avatar.icon;

                    return (
                        <span
                            key={avatar.label}
                            className={cn(
                                "relative flex size-14 items-center justify-center rounded-full border-2 border-white shadow-[0_14px_32px_rgba(26,26,26,0.10),0_0_0_1px_rgba(255,98,59,0.10)] transition-all duration-500 sm:size-16",
                                index > 0 && "-ml-4 sm:-ml-5",
                                avatar.className
                            )}
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible
                                    ? "translateY(0) scale(1)"
                                    : "translateY(8px) scale(0.92)",
                                transitionDelay: `${460 + index * 70}ms`,
                            }}
                            title={avatar.label}
                        >
                            <Icon className="size-5 sm:size-6" strokeWidth={1.55} />
                            <span className="sr-only">{avatar.label}</span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

type NumbersProps = {
    hideHeader?: boolean;
    className?: string;
};

const Numbers = ({ hideHeader = false, className }: NumbersProps) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setVisible(true);
                observer.disconnect();
            },
            { threshold: 0.35 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={cn(
                "flex w-full flex-col items-start justify-start",
                hideHeader ? "h-full items-center justify-center" : "gap-5",
                className
            )}
        >
            {!hideHeader && (
                <div>
                    <h3 className="text-xl font-geist leading-[1.06] tracking-tight text-blackk">
                        Twoja satysfakcja to nasz priorytet.
                    </h3>
                    <p className="mt-3 text-sm font-geist leading-tight text-blackk/60">
                        Łączymy obsługę, dostępność i sprawne doradztwo w jeden
                        niezawodny proces.
                    </p>
                </div>
            )}

            <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden">
                <svg
                    viewBox="0 0 360 360"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    fill="none"
                    aria-hidden
                >
                    <defs>
                        <linearGradient id="numbers-line" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="rgba(255,98,59,0.05)" />
                            <stop offset="48%" stopColor="rgba(255,98,59,0.42)" />
                            <stop offset="100%" stopColor="rgba(255,98,59,0.05)" />
                        </linearGradient>
                    </defs>

                    {connectorPaths.map((path) => (
                        <path
                            key={path.d}
                            d={path.d}
                            pathLength={1}
                            stroke="url(#numbers-line)"
                            strokeLinecap="round"
                            strokeWidth="1.4"
                            style={connectorStyle(visible, path.delay)}
                        />
                    ))}

                    {auxiliaryPaths.map((path) => (
                        <path
                            key={path.d}
                            d={path.d}
                            pathLength={1}
                            stroke="rgba(255,98,59,0.14)"
                            strokeLinecap="round"
                            strokeWidth=""
                            style={connectorStyle(visible, path.delay)}
                        />
                    ))}
                </svg>



                {nodes.map((node) => (
                    <IconNode
                        key={node.label}
                        icon={node.icon}
                        label={node.label}
                        visible={visible}
                        delay={node.delay}
                        className={node.className}
                    />
                ))}

                <CenterHub visible={visible} />
            </div>
        </div>
    );
};

export default Numbers;
