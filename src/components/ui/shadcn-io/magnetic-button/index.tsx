"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleCount?: number;
  attractRadius?: number;
  children?: React.ReactNode;
}

export const MagneticButton = React.forwardRef<
  HTMLButtonElement,
  MagneticButtonProps
>(({ className, particleCount = 50, children, ...props }, ref) => {
  const [isAttracting, setIsAttracting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesControl = useAnimation();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 80,
      y: Math.random() * 360 - 180,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 130,
      y: 20,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    });
  }, [particlesControl]);

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i]?.x || 0,
      y: particles[i]?.y || 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    }));
  }, [particlesControl, particles]);

  // 🔥 kliknięcie = przejście na główną i przewinięcie do sekcji
  const handleClick = () => {
    if (location.pathname !== "/") {
      navigate("/"); // idziemy na główną
      setTimeout(() => {
        const el = document.querySelector("#zespół");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 200); // chwila opóźnienia aż strona się załaduje
    } else {
      const el = document.querySelector("#zespół");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative inline-block">
      {/* Kulki poza przyciskiem */}
      {particles.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ x: particles[index]?.x || 0, y: particles[index]?.y || 0 }}
          animate={particlesControl}
          className={cn(
            "absolute w-1.5 h-1.5 rounded-full pointer-events-none z-0",
            "bg-orange-400",
            isAttracting ? "opacity-100" : "opacity-40"
          )}
        />
      ))}

      {/* Sam przycisk */}
      <button
        ref={ref}
        className={cn(
          "relative min-w-40 overflow-hidden",
          "px-6 py-3 rounded-lg font-robert-medium uppercase",
          "bg-accent-orange text-white shadow-lg",
          "hover:bg-orange-600 transition-all duration-300 z-10",
          className
        )}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onClick={handleClick} // 👈 tutaj logika
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children || "Rozpocznij współpracę"}
        </span>
      </button>
    </div>
  );
});

MagneticButton.displayName = "MagneticButton";
