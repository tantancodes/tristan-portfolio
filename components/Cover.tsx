import type { CoverMotif } from "@/content/projects";

/**
 * Generated SVG cover art. No screenshots: each motif is a small drawing
 * that hints at the project's idea. Randomness is seeded from the slug, so
 * the same project always gets the same picture (and server/client agree).
 * Colors come from CSS classes (.c-*) in globals.css, so covers follow the theme.
 */

const W = 1200;
const H = 675;

function seeded(seedText: string) {
  let h = 2166136261;
  for (const ch of seedText) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  // mulberry32
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;
const f = (n: number) => n.toFixed(1);
const gauss = (rng: Rng) => Math.sqrt(-2 * Math.log(rng() + 1e-9)) * Math.cos(2 * Math.PI * rng());

/* ---------- Motifs ---------- */

// A coffin lying on its side, drawn as wireframe rings, with annotation pins on its surface.
function Coffin({ rng }: { rng: Rng }) {
  const profile: [number, number][] = [
    [0, 0], [0.025, 62], [0.09, 96], [0.17, 100], [0.22, 90], [0.3, 138],
    [0.5, 124], [0.75, 96], [0.9, 80], [0.965, 86], [1, 0],
  ];
  const half = (t: number) => {
    for (let i = 0; i < profile.length - 1; i++) {
      const [t0, h0] = profile[i];
      const [t1, h1] = profile[i + 1];
      if (t <= t1) {
        const u = (t - t0) / (t1 - t0);
        return h0 + (h1 - h0) * (1 - Math.cos(u * Math.PI)) / 2;
      }
    }
    return 0;
  };
  const x0 = 170, len = 860, cy = 345;
  const xs = (t: number) => x0 + t * len;
  const samples = Array.from({ length: 121 }, (_, i) => i / 120);
  const edge = (k: number) =>
    samples.map((t, i) => `${i ? "L" : "M"}${f(xs(t))},${f(cy - half(t) * k)}`).join("");

  const rings = Array.from({ length: 23 }, (_, i) => (i + 1) / 24);
  const pins = [0.12, 0.42, 0.7].map((t, i) => ({
    x: xs(t),
    y: cy - half(t) * (0.15 + rng() * 0.45) * (i % 2 ? -1 : 1),
    up: i % 2 === 0,
  }));

  return (
    <g>
      {[0.4, 0.75, -0.4, -0.75].map((k) => (
        <path key={k} d={edge(k)} className="c-line c-thin" fill="none" />
      ))}
      {rings.map((t) => (
        <ellipse key={t} cx={f(xs(t))} cy={cy} rx={f(half(t) * 0.16)} ry={f(half(t))} className="c-line c-thin" fill="none" />
      ))}
      <path d={edge(1) + samples.slice().reverse().map((t) => `L${f(xs(t))},${f(cy + half(t))}`).join("") + "Z"} className="c-line" fill="none" />
      {pins.map((p, i) => {
        const ly = p.up ? 110 : 560;
        const lx = p.x - 60;
        return (
          <g key={i}>
            <line x1={f(p.x)} y1={f(p.y)} x2={f(p.x)} y2={p.up ? ly + 36 : ly} className="c-accent-stroke" />
            <rect x={f(lx)} y={ly} width="120" height="36" rx="6" className="c-card" />
            <rect x={f(lx + 14)} y={ly + 11} width="70" height="5" rx="2.5" className="c-ink-soft" />
            <rect x={f(lx + 14)} y={ly + 21} width="46" height="5" rx="2.5" className="c-ink-soft" />
            <circle cx={f(p.x)} cy={f(p.y)} r="15" className="c-accent-halo" />
            <circle cx={f(p.x)} cy={f(p.y)} r="6" className="c-accent" />
          </g>
        );
      })}
    </g>
  );
}

// A triangulated surface with camera frustums around it, like a photogrammetry capture.
function Mesh({ rng }: { rng: Rng }) {
  const N = 14;
  const z = (i: number, j: number) =>
    70 * Math.exp(-((i - 6.5) ** 2 + (j - 7) ** 2) / 16) + 30 * Math.exp(-((i - 10) ** 2 + (j - 3) ** 2) / 6) + rng() * 7;
  const pts: { x: number; y: number }[][] = [];
  for (let i = 0; i < N; i++) {
    pts.push([]);
    for (let j = 0; j < N; j++) pts[i].push({ x: 600 + (i - j) * 30, y: 240 + (i + j) * 14 - z(i, j) });
  }
  const segs: string[] = [];
  const diag: string[] = [];
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++) {
      const p = pts[i][j];
      if (i + 1 < N) segs.push(`M${f(p.x)},${f(p.y)}L${f(pts[i + 1][j].x)},${f(pts[i + 1][j].y)}`);
      if (j + 1 < N) segs.push(`M${f(p.x)},${f(p.y)}L${f(pts[i][j + 1].x)},${f(pts[i][j + 1].y)}`);
      if (i + 1 < N && j + 1 < N) diag.push(`M${f(p.x)},${f(p.y)}L${f(pts[i + 1][j + 1].x)},${f(pts[i + 1][j + 1].y)}`);
    }

  const target = { x: 600, y: 390 };
  const cams = Array.from({ length: 9 }, (_, k) => {
    const a = Math.PI * (0.12 + (0.76 * k) / 8);
    const x = 600 + 470 * Math.cos(a);
    const y = 330 - 250 * Math.sin(a);
    const dx = target.x - x, dy = target.y - y;
    const d = Math.hypot(dx, dy);
    const ux = dx / d, uy = dy / d;
    const bx = x - ux * 34, by = y - uy * 34;
    const tri = `M${f(x)},${f(y)}L${f(bx - uy * 18)},${f(by + ux * 18)}L${f(bx + uy * 18)},${f(by - ux * 18)}Z`;
    return { x, y, tri, hot: k % 3 === 1 };
  });

  return (
    <g>
      <path d={diag.join("")} className="c-line c-faint" fill="none" />
      <path d={segs.join("")} className="c-line c-thin" fill="none" />
      {cams.map((c, k) => (
        <g key={k}>
          <line x1={f(c.x)} y1={f(c.y)} x2={target.x} y2={target.y} className="c-line c-dash" />
          <path d={c.tri} className={c.hot ? "c-accent" : "c-card c-line"} />
        </g>
      ))}
    </g>
  );
}

// Many documents narrowing through retrieval stages into a short ranked list.
function Retrieval({ rng }: { rng: Rng }) {
  const cards = Array.from({ length: 12 }, (_, k) => ({ x: 110 + (k % 3) * 100, y: 120 + Math.floor(k / 3) * 112 }));
  const stage = (x: number, n: number, top: number, bottom: number) =>
    Array.from({ length: n }, (_, k) => ({ x, y: top + ((bottom - top) * (k + 0.5)) / n }));
  const a = stage(490, 18, 110, 570);
  const b = stage(630, 9, 180, 500);
  const c = stage(770, 5, 250, 430);
  const curve = (p: { x: number; y: number }, q: { x: number; y: number }) =>
    `M${f(p.x)},${f(p.y)}C${f((p.x + q.x) / 2)},${f(p.y)} ${f((p.x + q.x) / 2)},${f(q.y)} ${f(q.x)},${f(q.y)}`;
  const flows = [
    ...b.map((q, k) => curve(a[Math.min(17, k * 2 + Math.floor(rng() * 2))], q)),
    ...c.map((q, k) => curve(b[Math.min(8, k * 2)], q)),
  ];
  const rows = c.map((p, k) => ({ y: p.y - 14, w: 230 - k * 34 }));

  return (
    <g>
      {cards.map((cd, k) => (
        <g key={k}>
          <rect x={cd.x} y={cd.y} width="84" height="96" rx="6" className="c-card" />
          {[18, 32, 46, 60].map((dy, r) => (
            <rect key={r} x={cd.x + 12} y={cd.y + dy} width={r === 3 ? 34 : 60} height="5" rx="2.5" className="c-ink-soft" />
          ))}
        </g>
      ))}
      <path d={flows.join("")} className="c-line c-thin" fill="none" />
      {[...a, ...b].map((p, k) => (
        <circle key={k} cx={f(p.x)} cy={f(p.y)} r="4.5" className="c-ink-soft" />
      ))}
      {c.map((p, k) => (
        <g key={k}>
          <circle cx={f(p.x)} cy={f(p.y)} r="6" className={k === 0 ? "c-accent" : "c-ink-soft"} />
          <line x1={f(p.x + 6)} y1={f(p.y)} x2="850" y2={f(p.y)} className="c-line c-thin" />
          <rect x="860" y={f(rows[k].y)} width={rows[k].w} height="28" rx="6" className={k === 0 ? "c-accent" : "c-card"} />
        </g>
      ))}
    </g>
  );
}

// Predicted vs. actual price scatter hugging the diagonal.
function Houses({ rng }: { rng: Rng }) {
  const X0 = 190, Y0 = 570, SW = 830, SH = 440;
  const dots = Array.from({ length: 240 }, () => {
    const a = Math.min(0.98, Math.max(0.02, rng() ** 1.6));
    const p = Math.min(1, Math.max(0, a + gauss(rng) * 0.045));
    return { x: X0 + a * SW, y: Y0 - p * SH };
  });
  const house = (x: number, y: number, s: number) =>
    `M${x},${y}l${s / 2},${-s * 0.45}l${s / 2},${s * 0.45}v${s * 0.55}h${-s}Z`;

  return (
    <g>
      <line x1={X0} y1={Y0} x2={X0 + SW + 20} y2={Y0} className="c-line" />
      <line x1={X0} y1={Y0} x2={X0} y2={Y0 - SH - 20} className="c-line" />
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line x1={X0 + t * SW} y1={Y0} x2={X0 + t * SW} y2={Y0 + 10} className="c-line" />
          <line x1={X0} y1={Y0 - t * SH} x2={X0 - 10} y2={Y0 - t * SH} className="c-line" />
          <line x1={X0} y1={Y0 - t * SH} x2={X0 + SW} y2={Y0 - t * SH} className="c-line c-faint" />
        </g>
      ))}
      {dots.map((d, k) => (
        <circle key={k} cx={f(d.x)} cy={f(d.y)} r="4.5" className="c-dot" />
      ))}
      <line x1={X0} y1={Y0} x2={X0 + SW} y2={Y0 - SH} className="c-accent-stroke c-bold" />
      {[0, 1, 2].map((k) => (
        <path key={k} d={house(240 + k * 62, 190 - k * 4, 44 + k * 4)} className={k === 2 ? "c-accent" : "c-card c-line"} />
      ))}
    </g>
  );
}

// An audio waveform with a playhead; the played portion is in the accent color.
function Waveform({ rng }: { rng: Rng }) {
  const n = 92, x0 = 150, step = 10, cy = 338, played = 0.42;
  const bars = Array.from({ length: n }, (_, k) => {
    const t = k / n;
    const env = Math.sin(Math.PI * t) ** 0.6;
    const h = 30 + env * (120 + 70 * Math.sin(k * 0.37) * Math.cos(k * 0.11)) + rng() * 40;
    return { x: x0 + k * step, h: Math.max(14, h) };
  });
  const px = x0 + n * step * played;
  return (
    <g>
      {bars.map((b, k) => (
        <rect key={k} x={b.x} y={f(cy - b.h / 2)} width="5" height={f(b.h)} rx="2.5" className={k / n < played ? "c-accent" : "c-ink-soft"} />
      ))}
      <line x1={f(px)} y1="140" x2={f(px)} y2="540" className="c-line" />
      <circle cx={f(px)} cy="140" r="9" className="c-ink" />
      <rect x={x0} y="580" width={n * step} height="4" rx="2" className="c-ink-soft" />
      <rect x={x0} y="580" width={f(n * step * played)} height="4" rx="2" className="c-accent" />
    </g>
  );
}

const motifs: Record<CoverMotif, (p: { rng: Rng }) => React.ReactElement> = {
  coffin: Coffin,
  mesh: Mesh,
  retrieval: Retrieval,
  houses: Houses,
  waveform: Waveform,
};

export default function Cover({ motif, seed, title }: { motif: CoverMotif; seed: string; title: string }) {
  const Motif = motifs[motif];
  const patternId = `dots-${seed}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cover" role="img" aria-label={`Illustration for ${title}`}>
      <defs>
        <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" className="c-grid" />
        </pattern>
      </defs>
      <rect width={W} height={H} className="c-bg" />
      <rect width={W} height={H} fill={`url(#${patternId})`} />
      <Motif rng={seeded(seed)} />
    </svg>
  );
}
