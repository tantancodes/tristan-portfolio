"use client";

import { useEffect, useRef, useState } from "react";

/*
 * A speech box drawn like Splat Journal's ink: four strokes that overshoot the corners,
 * plus a little tail. It "breathes" the way the app's lines do: every few seconds it
 * crossfades to the same box drawn again by a slightly different hand.
 */

type Pt = [number, number];

// Small seeded random, so a seed always draws the same line.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A hand-drawn line: points every few px, nudged sideways along a slow, uneven wave.
function line(x1: number, y1: number, x2: number, y2: number, r: () => number, wob = 0.9): Pt[] {
  const len = Math.hypot(x2 - x1, y2 - y1), n = Math.max(2, Math.round(len / 7));
  const nx = -(y2 - y1) / len, ny = (x2 - x1) / len;
  const ph = r() * 6.28, f = 0.6 + r() * 0.9, bow = (r() - 0.5) * wob * 2.2;
  return Array.from({ length: n + 1 }, (_, i) => {
    const k = i / n, w = Math.sin(k * Math.PI) * bow + Math.sin(k * f * 6.28 + ph) * wob * 0.5 + (r() - 0.5) * wob * 0.35;
    return [x1 + (x2 - x1) * k + nx * w, y1 + (y2 - y1) * k + ny * w];
  });
}

const toPath = (pts: Pt[]) =>
  pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("");

// The whole box for one seed: four overshooting sides, with a gap in the bottom edge for the tail.
function box(seed: number, w: number, h: number): string {
  const r = rng(seed), o = () => 3 + r() * 5, s = () => (r() - 0.5) * 2.2;
  const tx = 22; // where the tail leaves the bottom edge
  return [
    line(-o(), s(), w + o(), s(), r), // top
    line(w + s(), -o(), w + s(), h + o(), r), // right
    line(w + o(), h + s(), tx + 14, h + s(), r), // bottom, right of the tail
    line(tx, h + s(), -o(), h + s(), r), // bottom, left of the tail
    line(s(), h + o(), s(), -o(), r), // left
    line(tx, h + s(), tx - 8 + s(), h + 18, r, 0.5), // tail
    line(tx - 8 + s(), h + 18, tx + 14, h + s(), r, 0.5),
  ]
    .map(toPath)
    .join("");
}

export default function BreathingBubble({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const W = 132, H = 58;
  // Two layers: the front one shows; the back one gets the next drawing and fades in over it.
  const [seeds, setSeeds] = useState<[number, number]>([7, 7]);
  const [front, setFront] = useState(0);
  const frontRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0, raf = 0;
    const tick = () => {
      const back = 1 - frontRef.current;
      // Draw the new version on the hidden layer first, then fade it in on the next frame.
      setSeeds((sd) => (back ? [sd[0], (Math.random() * 1e9) | 0] : [(Math.random() * 1e9) | 0, sd[1]]));
      raf = requestAnimationFrame(() => {
        frontRef.current = back;
        setFront(back);
      });
      timer = window.setTimeout(tick, 2400 + Math.random() * 2400); // same rhythm as the app
    };
    timer = window.setTimeout(tick, 1800);
    return () => { window.clearTimeout(timer); cancelAnimationFrame(raf); };
  }, []);

  return (
    <a href={href} target="_blank" rel="noreferrer" className="sb-bubble" aria-label={label}>
      <svg className="sb-bubble-ink" viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden="true">
        <rect x="2" y="2" width={W - 4} height={H - 4} rx="3" />
        {[0, 1].map((i) => (
          <path key={i} d={box(seeds[i], W, H)} className={i === front ? "is-front" : ""} />
        ))}
      </svg>
      <span className="sb-bubble-text">{children}</span>
    </a>
  );
}
