import { cn } from "@/lib/utils";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function SilkBg({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 [background:linear-gradient(115deg,#F2A86E_0%,#EE8A4A_28%,#E5652A_52%,#D2461A_76%,#B5300F_100%)]" />
      <div className="ns-silk-a absolute -left-[20%] top-[38%] h-[34%] w-[150%] rotate-[24deg] bg-[#F7C49A] blur-[60px]" />
      <div className="ns-silk-b absolute -left-[25%] top-[62%] h-[16%] w-[70%] rotate-[24deg] bg-[#C2400F] blur-[36px]" />
      <div className="ns-silk-c absolute -right-[15%] -top-[30%] h-[80%] w-[60%] rounded-full bg-[#A92A0C] blur-[90px]" />
      <div className="ns-silk-d absolute -left-[10%] -top-[40%] h-[90%] w-[45%] rounded-full bg-[#F4B07A] blur-[80px]" />
      <div
        className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN }}
      />
    </div>
  );
}
