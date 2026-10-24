import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const FRAME_MS = 45;
const SETTLE = 8;
const STAGGER = 2;

const isDigit = (c: string) => c >= "0" && c <= "9";

function scramble(text: string, frame: number) {
  let d = 0;
  return [...text]
    .map((c) => {
      if (!isDigit(c)) return c;
      const settled = frame >= SETTLE + d++ * STAGGER;
      return settled ? c : String(Math.floor(Math.random() * 10));
    })
    .join("");
}

export function ShuffleNumber({ text, play }: { text: string; play: boolean }) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    if (!play || reduced || played.current) return;
    played.current = true;
    const digits = [...text].filter(isDigit).length;
    const last = SETTLE + digits * STAGGER;
    let frame = 0;
    setOut(scramble(text, 0));
    const id = window.setInterval(() => {
      frame += 1;
      setOut(scramble(text, frame));
      if (frame >= last) window.clearInterval(id);
    }, FRAME_MS);
    return () => {
      window.clearInterval(id);
      setOut(text);
    };
  }, [play, reduced, text]);

  return <span className="tabular-nums">{out}</span>;
}
