import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Rows = number[][];
type GlobeData = { step: number; points: Float32Array; count: number };

const RAD = Math.PI / 180;
const PL_LAT = 52;
const SWAY = 6;
const SWAY_MS = 14000;
const INTRO = 30;
const INTRO_MS = 2400;
const WROCLAW: [number, number] = [17.03, 51.11];
const ORIGINS: [number, number][] = [
  [-0.13, 51.5],
  [23.73, 37.98],
  [18.07, 59.33],
  [-3.7, 40.42],
  [2.35, 48.86],
  [28.98, 41.0],
  [10.75, 59.91],
  [9.19, 45.46],
  [-6.26, 53.35],
  [24.94, 60.17],
];
const ARC_START = INTRO_MS * 0.75;
const SPAWN = 1400;
const POP = 350;
const GROW_AT = 250;
const GROW = 1800;
const HOLD = 1600;
const SHRINK = 800;
const LIFE = GROW_AT + GROW + HOLD + SHRINK;
const ORANGE = "#EA6100";
const SHADOW = "#DDDDDD";
const BOX =
  typeof Path2D === "undefined"
    ? []
    : [
        "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
        "M12 22V12",
        "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7",
        "m7.5 4.27 9 5.15",
      ].map((d) => new Path2D(d));

export type GlobeFrame = {
  r: number;
  cx: number;
  top: number;
  plY: number;
  lon: number;
  dist: number;
};

let request: Promise<GlobeData> | null = null;

function loadGlobe() {
  request ??= fetch("/photos/globe.json")
    .then((r) => r.json())
    .then((d: { step: number; land: Rows; pl: Rows }) => {
      const count = [...d.land, ...d.pl].reduce((s, r) => s + r.length - 1, 0);
      const points = new Float32Array(count * 4);
      let i = 0;
      const add = (rows: Rows, pl: number) => {
        for (const [lat, ...lons] of rows) {
          const s = Math.sin(lat * RAD);
          const c = Math.cos(lat * RAD);
          for (const lon of lons) {
            points[i++] = lon * RAD;
            points[i++] = s;
            points[i++] = c;
            points[i++] = pl;
          }
        }
      };
      add(d.land, 0);
      add(d.pl, 1);
      return { step: d.step * RAD, points, count };
    });
  return request;
}

const ease = (x: number) => 1 - Math.pow(1 - x, 3);

function frame(W: number, H: number, f: GlobeFrame) {
  const R = W * f.r;
  const cx = W * f.cx;
  const cy = H * f.top + R;
  const dist = f.dist;
  const zmin = 1 / dist;
  const F = R * Math.sqrt(dist * dist - 1);
  const want = cy - H * f.plY;
  let lo = 0;
  let hi = Math.acos(zmin) - 0.01;
  for (let i = 0; i < 40; i++) {
    const m = (lo + hi) / 2;
    if ((F * Math.sin(m)) / (dist - Math.cos(m)) < want) lo = m;
    else hi = m;
  }
  const tilt = PL_LAT * RAD - (lo + hi) / 2;
  return { R, cx, cy, F, dist, zmin, sa: Math.sin(tilt), ca: Math.cos(tilt) };
}

const VERT = `
attribute vec4 a_pt;
uniform float u_l0, u_sa, u_ca, u_F, u_dist, u_zmin, u_step, u_dpr;
uniform vec2 u_c, u_res;
varying vec4 v_rgba;
varying float v_size;
void main() {
  float l = a_pt.x - u_l0;
  float x = a_pt.z * sin(l);
  float z0 = a_pt.z * cos(l);
  float y = a_pt.y * u_ca - z0 * u_sa;
  float z = a_pt.y * u_sa + z0 * u_ca;
  float k = u_F / (u_dist - z);
  vec2 p = vec2(u_c.x + k * x, u_c.y - k * y);
  gl_Position = vec4(p.x / u_res.x * 2.0 - 1.0, 1.0 - p.y / u_res.y * 2.0, 0.0, 1.0);
  bool front = z >= u_zmin;
  bool pl = a_pt.w > 0.5;
  float az = front ? clamp((z - u_zmin) / (1.0 - u_zmin), 0.0, 1.0) : clamp((u_zmin - z) / (1.0 + u_zmin), 0.0, 1.0);
  float size = k * u_step * (front ? (pl ? 0.42 : 0.36) * (0.45 + 0.55 * sqrt(az)) : 0.2);
  size = max(size * u_dpr, 1.0);
  v_size = size;
  gl_PointSize = size + 1.0;
  if (front && pl) v_rgba = vec4(0.918, 0.38, 0.0, 1.0);
  else if (front) v_rgba = vec4(0.451, 0.451, 0.451, 0.2 + 0.5 * pow(az, 0.7));
  else v_rgba = vec4(0.451, 0.451, 0.451, 0.07 + 0.05 * az);
}`;

const FRAG = `
precision mediump float;
varying vec4 v_rgba;
varying float v_size;
void main() {
  vec2 d = abs(gl_PointCoord - 0.5) * (v_size + 1.0);
  float edge = clamp(v_size * 0.5 + 0.5 - max(d.x, d.y), 0.0, 1.0);
  float a = v_rgba.a * edge;
  gl_FragColor = vec4(v_rgba.rgb * a, a);
}`;

type GL = {
  gl: WebGLRenderingContext;
  u: Record<string, WebGLUniformLocation | null>;
  count: number;
};

function setupGL(canvas: HTMLCanvasElement, data: GlobeData): GL | null {
  const gl = canvas.getContext("webgl", {
    premultipliedAlpha: true,
    antialias: false,
    alpha: true,
  });
  if (!gl) return null;
  const shader = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data.points, gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a_pt");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  const names = [
    "u_l0",
    "u_sa",
    "u_ca",
    "u_F",
    "u_dist",
    "u_zmin",
    "u_step",
    "u_dpr",
    "u_c",
    "u_res",
  ];
  const u = Object.fromEntries(
    names.map((n) => [n, gl.getUniformLocation(prog, n)]),
  );
  gl.uniform1f(u.u_step, data.step);
  return { gl, u, count: data.count };
}

function drawSphere(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  v: ReturnType<typeof frame>,
  l0: number,
) {
  const { R, cx, cy, F, sa, ca, dist, zmin } = v;
  ctx.clearRect(0, 0, W, H);
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  const glow = ctx.createRadialGradient(
    cx - R * 0.25,
    cy - R * 0.35,
    R * 0.1,
    cx,
    cy,
    R,
  );
  glow.addColorStop(0, "rgba(255,255,255,.75)");
  glow.addColorStop(1, "rgba(255,255,255,.25)");
  ctx.fillStyle = glow;
  ctx.fill();
  ctx.strokeStyle = "rgba(10,10,10,.07)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const line = (front: boolean, pts: [number, number][]) => {
    ctx.beginPath();
    let on = false;
    for (const [lo, la] of pts) {
      const s = Math.sin(la * RAD);
      const c = Math.cos(la * RAD);
      const l = lo * RAD - l0;
      const z0 = c * Math.cos(l);
      const z = s * sa + z0 * ca;
      if (z >= zmin !== front) {
        on = false;
        continue;
      }
      const k = F / (dist - z);
      const x = cx + k * c * Math.sin(l);
      const y = cy - k * (s * ca - z0 * sa);
      if (on) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
      on = true;
    }
    ctx.stroke();
  };
  for (const front of [false, true]) {
    ctx.strokeStyle = front ? "rgba(10,10,10,.07)" : "rgba(10,10,10,.03)";
    for (let lo = -180; lo < 180; lo += 15) {
      const pts: [number, number][] = [];
      for (let la = -75; la <= 75; la += 3) pts.push([lo, la]);
      line(front, pts);
    }
    for (let la = -75; la <= 75; la += 15) {
      const pts: [number, number][] = [];
      for (let lo = -180; lo <= 180; lo += 3) pts.push([lo, la]);
      line(front, pts);
    }
  }
}

function unit(lon: number, lat: number, l0: number, sa: number, ca: number) {
  const s = Math.sin(lat * RAD);
  const c = Math.cos(lat * RAD);
  const l = lon * RAD - l0;
  const z0 = c * Math.cos(l);
  return [c * Math.sin(l), s * ca - z0 * sa, s * sa + z0 * ca];
}

function drawNetwork(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  v: ReturnType<typeof frame>,
  l0: number,
  t: number,
) {
  ctx.clearRect(0, 0, W, H);
  const { cx, cy, F, sa, ca, dist, zmin } = v;
  const scr = (p: number[]) => {
    const k = F / (dist - p[2]);
    return [cx + k * p[0], cy - k * p[1]];
  };
  const r = Math.max(6.5, Math.min(19, W * 0.015));
  const b = unit(WROCLAW[0], WROCLAW[1], l0, sa, ca);
  const end = scr(b);
  const steps = 48;
  const thin = Math.max(0.55, r * 0.055);
  const clamp = (x: number) => Math.max(0, Math.min(1, x));

  const live: { from: number; age: number }[] = [];
  if (Number.isFinite(t)) {
    const last = Math.floor((t - ARC_START) / SPAWN);
    for (let i = Math.max(0, last - Math.ceil(LIFE / SPAWN)); i <= last; i++) {
      const age = t - ARC_START - i * SPAWN;
      if (age >= 0 && age < LIFE) live.push({ from: i % ORIGINS.length, age });
    }
  } else {
    live.push(
      { from: 0, age: GROW_AT + GROW + 100 },
      { from: 3, age: GROW_AT + GROW + 100 },
      { from: 5, age: GROW_AT + GROW + 100 },
    );
  }

  const nodes: [number, number, number][] = [];
  let landed = 0;
  for (const { from, age } of live) {
    const a = unit(ORIGINS[from][0], ORIGINS[from][1], l0, sa, ca);
    if (a[2] < zmin) continue;
    const head = ease(clamp((age - GROW_AT) / GROW));
    const tail = ease(clamp((age - GROW_AT - GROW - HOLD) / SHRINK));
    const pop =
      age < GROW_AT + GROW + HOLD
        ? ease(clamp(age / POP))
        : 1 - ease(clamp((age - GROW_AT - GROW - HOLD) / (SHRINK * 0.6)));
    if (head >= 1 && tail < 1) landed = Math.max(landed, 1 - tail);

    const point = (u: number, h: number) => {
      const p = [
        a[0] + (b[0] - a[0]) * u,
        a[1] + (b[1] - a[1]) * u,
        a[2] + (b[2] - a[2]) * u,
      ];
      const n = Math.hypot(p[0], p[1], p[2]);
      const m = (h === 0 ? 1 : n + (u - u * u) * h) / n;
      return [p[0] * m, p[1] * m, p[2] * m];
    };

    if (head > tail) {
      ctx.beginPath();
      for (let k = 0; k <= steps; k++) {
        const [x, y] = scr(point(tail + ((head - tail) * k) / steps, 0));
        if (k) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      }
      ctx.strokeStyle = SHADOW;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.strokeStyle = ORANGE;
      let prev = scr(point(tail, 0.3));
      for (let k = 1; k <= steps; k++) {
        const u = tail + ((head - tail) * k) / steps;
        const p3 = point(u, 0.3);
        const cur = scr(p3);
        const depth = F / (dist - p3[2]) / (F / (dist - 1));
        ctx.beginPath();
        ctx.moveTo(prev[0], prev[1]);
        ctx.lineTo(cur[0], cur[1]);
        ctx.lineWidth = thin * (0.8 + 2.4 * (u - u * u)) * depth;
        ctx.stroke();
        prev = cur;
      }
    }
    if (pop > 0) {
      const [ox, oy] = scr(a);
      nodes.push([ox, oy, pop * r]);
    }
  }

  for (const [x, y, rr] of nodes) {
    ctx.beginPath();
    ctx.arc(x, y, rr, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.lineWidth = Math.max(1, r * 0.08);
    ctx.strokeStyle = ORANGE;
    ctx.stroke();
    const k = (rr * 1.05) / 24;
    ctx.save();
    ctx.translate(x - 12 * k, y - 12 * k);
    ctx.scale(k, k);
    ctx.lineWidth = 1.6;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    for (const path of BOX) ctx.stroke(path);
    ctx.restore();
  }

  if (landed > 0 && b[2] >= zmin) {
    ctx.beginPath();
    ctx.arc(end[0], end[1], r * 0.36 * ease(landed), 0, Math.PI * 2);
    ctx.fillStyle = ORANGE;
    ctx.fill();
  }
}

export function DotGlobe({
  frame: f,
  className,
}: {
  frame: GlobeFrame;
  className?: string;
}) {
  const [wrap, play] = useInView<HTMLDivElement>("0px", 0.1);
  const back = useRef<HTMLCanvasElement>(null);
  const dots = useRef<HTMLCanvasElement>(null);
  const fx = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const [data, setData] = useState<GlobeData | null>(null);
  const glRef = useRef<GL | null>(null);
  const lonRef = useRef(f.lon + INTRO);
  const elapsed = useRef(0);

  useEffect(() => {
    let live = true;
    loadGlobe().then((d) => live && setData(d));
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    const bc = back.current;
    const dc = dots.current;
    const fc = fx.current;
    const ctx = bc?.getContext("2d");
    const fctx = fc?.getContext("2d");
    if (!bc || !dc || !fc || !ctx || !fctx || !data) return;
    glRef.current ??= setupGL(dc, data);
    const g = glRef.current;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let view = frame(1, 1, f);
    const resize = () => {
      const r = bc.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      for (const c of [bc, dc, fc]) {
        c.width = Math.round(W * dpr);
        c.height = Math.round(H * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      view = frame(W, H, f);
      if (g) {
        g.gl.viewport(0, 0, dc.width, dc.height);
        g.gl.uniform2f(g.u.u_res, W, H);
        g.gl.uniform2f(g.u.u_c, view.cx, view.cy);
        g.gl.uniform1f(g.u.u_F, view.F);
        g.gl.uniform1f(g.u.u_sa, view.sa);
        g.gl.uniform1f(g.u.u_ca, view.ca);
        g.gl.uniform1f(g.u.u_dpr, dpr);
        g.gl.uniform1f(g.u.u_dist, view.dist);
        g.gl.uniform1f(g.u.u_zmin, view.zmin);
      }
    };

    const render = (lon0: number, t?: number) => {
      const l0 = lon0 * RAD;
      drawSphere(ctx, W, H, view, l0);
      drawNetwork(fctx, W, H, view, l0, t ?? Infinity);
      if (!g) return;
      g.gl.clearColor(0, 0, 0, 0);
      g.gl.clear(g.gl.COLOR_BUFFER_BIT);
      g.gl.uniform1f(g.u.u_l0, l0);
      g.gl.drawArrays(g.gl.POINTS, 0, g.count);
    };

    resize();
    const still = () => render(reduced ? f.lon : lonRef.current);
    const ro = new ResizeObserver(() => {
      resize();
      still();
    });
    ro.observe(bc);

    if (reduced || !play) {
      still();
      return () => ro.disconnect();
    }

    const startAt = performance.now() - elapsed.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = now - startAt;
      const lon0 =
        f.lon +
        INTRO * (1 - ease(Math.min(1, t / INTRO_MS))) +
        SWAY * Math.sin((2 * Math.PI * t) / SWAY_MS);
      elapsed.current = t;
      lonRef.current = lon0;
      render(lon0, t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [data, play, reduced, f]);

  return (
    <div
      ref={wrap}
      className={cn(
        "relative [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent),linear-gradient(to_bottom,black_55%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]",
        className,
      )}
    >
      <div
        role="img"
        aria-label="Kropkowany globus z zaznaczoną Polską"
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          data ? "opacity-100" : "opacity-0",
        )}
      >
        <canvas ref={back} className="absolute inset-0 size-full" />
        <canvas ref={dots} className="absolute inset-0 size-full" />
        <canvas ref={fx} className="absolute inset-0 size-full" />
      </div>
    </div>
  );
}
