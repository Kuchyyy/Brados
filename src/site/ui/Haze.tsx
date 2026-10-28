import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const HAZE_SEEDS = { rozwoj: 1, elsigma: 2, rozwiazania: 3 };
type Tile = keyof typeof HAZE_SEEDS;

const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const N50 = "255,255,255";
const N100 = "252,252,251";
const STONE = "240,238,237";
const W = 160;
const H = 120;

function boxBlur(src: Uint8ClampedArray, radius: number) {
  const out = new Uint8ClampedArray(src.length);
  const pass = (from: Uint8ClampedArray, to: Uint8ClampedArray, dx: number, dy: number) => {
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++)
        for (let ch = 0; ch < 3; ch++) {
          let sum = 0;
          for (let k = -radius; k <= radius; k++) {
            const xx = Math.min(W - 1, Math.max(0, x + k * dx));
            const yy = Math.min(H - 1, Math.max(0, y + k * dy));
            sum += from[(yy * W + xx) * 4 + ch];
          }
          to[(y * W + x) * 4 + ch] = sum / (radius * 2 + 1);
        }
  };
  for (let i = 0; i < 2; i++) {
    pass(src, out, 1, 0);
    pass(out, src, 0, 1);
  }
  return src;
}

function paint(c: HTMLCanvasElement, seed: number) {
  const src = document.createElement("canvas");
  src.width = W;
  src.height = H;
  const ctx = src.getContext("2d");
  const out = c.getContext("2d");
  if (!ctx || !out) return;
  const r = rng(seed);
  const angle = r() * Math.PI * 2;
  const g = ctx.createLinearGradient(
    W / 2 - (Math.cos(angle) * W) / 2,
    H / 2 - (Math.sin(angle) * H) / 2,
    W / 2 + (Math.cos(angle) * W) / 2,
    H / 2 + (Math.sin(angle) * H) / 2,
  );
  g.addColorStop(0, `rgb(${N50})`);
  g.addColorStop(1, `rgb(${N100})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  const darkness = 0.15 + r() * 0.5;
  const count = 3 + Math.floor(r() * 5);
  for (let i = 0; i < count; i++) {
    const dark = r() < 0.7;
    ctx.fillStyle = `rgba(${dark ? STONE : N50},${(dark ? Math.min(1, darkness * 1.8) : 0.9) * (0.4 + r() * 0.6)})`;
    const w = W * (0.15 + r() * 0.45);
    const h = H * (0.2 + r() * 0.6);
    const x = r() * W - w / 2;
    const y = H * (0.25 + r() * 0.85) - h / 2;
    ctx.beginPath();
    if (r() < 0.5) ctx.rect(x, y, w, h);
    else ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, r() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  const radius = Math.round(3 + r() * 6);

  const img = ctx.getImageData(0, 0, W, H);
  boxBlur(img.data, radius);
  ctx.putImageData(img, 0, 0);
  c.width = W;
  c.height = H;
  out.drawImage(src, 0, 0);
}

export function Haze({ tile, className }: { tile: Tile; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const seed = HAZE_SEEDS[tile];
  useEffect(() => {
    if (ref.current) paint(ref.current, seed);
  }, [seed]);
  return (
    <div
      aria-hidden="true"
      className={cn("ns-haze pointer-events-none absolute inset-0 -z-10 size-full overflow-hidden", className)}
    >
      <canvas ref={ref} className="absolute inset-0 size-full" />
    </div>
  );
}
