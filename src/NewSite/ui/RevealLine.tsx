import { TextAnimate } from "@/components/ui/text-animate";
import { LINE_REVEAL } from "./reveal";

export function RevealLine({
  text,
  delay = 0,
  margin = "0px 0px -25% 0px",
}: {
  text: string;
  delay?: number;
  margin?: string;
}) {
  return (
    <span className="-mb-[0.18em] block overflow-hidden pb-[0.18em]">
      <TextAnimate
        as="span"
        by="text"
        variants={LINE_REVEAL}
        delay={delay}
        once
        viewport={{ once: true, margin }}
        className="block"
      >
        {text}
      </TextAnimate>
    </span>
  );
}
