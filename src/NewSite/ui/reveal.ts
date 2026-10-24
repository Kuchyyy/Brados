import type { Variants } from "motion/react";

export const LINE_GAP = 0.08;

export const LINE_REVEAL: Variants = {
  hidden: { y: "120%" },
  show: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
