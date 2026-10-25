import { INK, ORANGE } from "../constants";

export function LogoMark({ className, white }: { className?: string; white?: boolean }) {
  return (
    <svg viewBox="0 0 364 383" className={className} aria-hidden="true">
      <polygon points="164,0 101,240 0,175 164,383" fill={white ? "#FFFFFF" : INK} />
      <polygon points="200,0 263,240 364,175 200,383" fill={white ? "#FFFFFF" : ORANGE} />
    </svg>
  );
}
