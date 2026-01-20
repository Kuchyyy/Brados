import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

const stats = [
    { value: 25, label: "Lat Doświadczenia" },
    { value: 10000, label: "Produktów" },
    { value: 100, label: "Satysfakcji", suffix: "%" },
];

const Numbers = () => {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setVisible(true);
                observer.disconnect();
            },
            { threshold: 0.4 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const curve = "M 0 420 C 696 384 1106 301 1400 0";

    return (
        <section className="w-full bg-white h-full">
            <div className="absolute inset-0 z-0 h-full">
                <svg
                    viewBox="0 0 1350 500"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <clipPath id="clipArea">
                            <rect x="0" y="0" width="1400" height="820" />
                        </clipPath>

                        <radialGradient id="areaGradient" cx="50%" cy="45%" r="60%">
                            <stop offset="0%" stopColor="#f5f5f4" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#f5f5f4" stopOpacity="0" />
                        </radialGradient>

                        <linearGradient
                            id="lineGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor="#ee721b" stopOpacity="0" />
                            <stop offset="55%" stopColor="#ee721b" stopOpacity="0.5" />
                            <stop offset="85%" stopColor="#ee721b" stopOpacity="1" />
                            <stop offset="100%" stopColor="#ee721b" stopOpacity="1" />
                        </linearGradient>
                    </defs>

                    <path
                        d={`${curve} L 1400 500 L 0 500 Z`}
                        fill="url(#areaGradient)"
                        clipPath="url(#clipArea)"
                    />

                    <path
                        d={curve}
                        stroke="url(#lineGradient)"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pathLength={1}
                        style={{
                            strokeDasharray: 1,
                            strokeDashoffset: visible ? 0 : 1,
                            transition: "stroke-dashoffset 2s ease-out",
                        }}
                    />
                </svg>
            </div>
            <div className="relative maxw mx-auto h-full overflow-hidden flex flex-col justify-between">


                <div className="relative z-10 flex flex-col gap-1 p-6">
                    <h2 className="text-xl font-poppins text-black tracking-tight">
                        Przekonaj się sam
                    </h2>

                    <p className="max-w-md text-sm font-poppins text-black/80">
                        Od lat budujemy relacje oparte na zaufaniu. Dołącz do tysięcy klientów, którzy
                        powierzyli nam swoje inwestycje.
                    </p>


                    <div ref={ref} className="flex flex-col gap-5 mt-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col gap-1 ">
                                <div className="flex items-center font-poppins tracking-tight text-soft-black text-4xl leading-none ">
                                    {visible ? (
                                        <CountUp end={stat.value} duration={3} separator="" />
                                    ) : (
                                        0
                                    )}
                                    {stat.suffix ? (
                                        <span className="ml-2 text-sm text-accent-orange">
                                            {stat.suffix}
                                        </span>
                                    ) : <Plus
                                        size={18}
                                        strokeWidth={2}
                                        className="ml-1 mb-1 text-accent-orange"
                                    />
                                    }
                                </div>

                                <span className="text-sm font-poppins text-soft-black/60">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>


                </div>
                <div className="mt-6 pt-6  w-[90%] mx-auto mb-6">
                    <div className="flex items-center justify-end gap-2">

                        <p className="text-sm font-poppins text-black/80 tracking-tight">
                            Twoja satysfakcja to nasz priorytet
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Numbers;
