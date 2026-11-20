"use client";

import { useEffect, useRef } from "react";

/*
 * The hand-drawn "click me" arrow from the hero's thought bubble, set loose.
 *
 * At rest it sits beside the bubble, exactly as drawn. On the first mouse move it lifts off
 * and rides along the right edge of the page, following the cursor up and down. Hover
 * something you can open (a project card, the bubble, a hero link) and it glides over to
 * that thing's side, grows, the label turns into CLICK ME, and the curved arrow
 * straightens to point at it.
 *
 * Desktop only: a mouse or trackpad, a window at least 1200px wide (so there's a margin
 * to ride in), and no reduced motion. Everywhere else the bubble keeps its own arrow.
 */

const TARGETS = ".project-card.is-link, .nm-thought, .hero-ctas .arrow-link";
const MIN_WIDTH = 1200;
const GAP = 14; // between the arrow tip and the thing it points at
const EASE = 0.16; // how quickly it catches up each frame

// The arrow as two strokes (shaft, head), each a list of cubic Béziers with the same shape,
// so we can blend from the curved drawing to the straight one point by point.
const CURVED = {
  shaft: [84, 30, 70, 34, 52, 30, 40, 22, 30, 15, 20, 14, 8, 18],
  head: [18, 10, 14, 13, 10, 15, 7, 18, 11, 20, 14, 23, 17, 27],
};
const STRAIGHT = {
  shaft: [84, 20, 70, 20, 52, 20, 40, 20, 30, 20, 20, 20, 8, 20],
  head: [17, 12, 13, 15, 10, 17, 7, 20, 10, 23, 13, 25, 17, 28],
};
const toPath = (n: number[]) => `M${n[0]} ${n[1]} C${n.slice(2, 8).join(" ")} C${n.slice(8, 14).join(" ")}`;
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => +(v + (b[i] - v) * t).toFixed(2));

export default function ClickPointer() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const html = document.documentElement;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shaft = el.querySelector<SVGPathElement>(".cp-shaft")!;
    const head = el.querySelector<SVGPathElement>(".cp-head")!;
    const label = el.querySelector<HTMLElement>(".cp-text")!;

    let live = false; // has it left the bubble?
    let restX = 0; // its x in the right margin, taken from where the bubble's arrow sits
    let mouse = { x: 0, y: 0 };
    let target: Element | null = null;
    // current and goal: position of the arrow tip (left middle of the box), scale, straightness, side
    const cur = { x: 0, y: 0, s: 1, k: 0 };
    let left = false; // pointing right, from the left side of the target
    let frame = 0;

    const usable = () => fine.matches && !reduced.matches && window.innerWidth >= MIN_WIDTH;

    const goal = () => {
      if (target) {
        // The bubble's link wraps absolutely-placed parts, so measure the cloud itself.
        const box = target.matches(".nm-thought") ? target.querySelector(".nm-cloud") ?? target : target;
        const r = box.getBoundingClientRect();
        // Stay level with the cursor while it's over the target, but never past its ends.
        const y = Math.min(Math.max(mouse.y, r.top + 40), r.bottom - 40);
        // Point from the right unless that spot is off screen or taken by the next card.
        const probe = document.elementFromPoint(r.right + GAP + 50, y);
        const blocked = r.right + GAP + 130 > window.innerWidth || !!probe?.closest(".project-card");
        return { x: blocked ? r.left - GAP : r.right + GAP, y, s: 1.3, k: 1, left: blocked };
      }
      return { x: restX, y: Math.min(Math.max(mouse.y, 60), window.innerHeight - 60), s: 1, k: 0, left: false };
    };

    const tick = () => {
      const g = goal();
      if (g.left !== left) {
        left = g.left;
        el.classList.toggle("is-left", left);
      }
      cur.x += (g.x - cur.x) * EASE;
      cur.y += (g.y - cur.y) * EASE;
      cur.s += (g.s - cur.s) * EASE;
      cur.k += (g.k - cur.k) * EASE;
      el.style.transform = `translate3d(${cur.x.toFixed(1)}px, ${cur.y.toFixed(1)}px, 0) scale(${cur.s.toFixed(3)})`;
      shaft.setAttribute("d", toPath(mix(CURVED.shaft, STRAIGHT.shaft, cur.k)));
      head.setAttribute("d", toPath(mix(CURVED.head, STRAIGHT.head, cur.k)));
      const settled = Math.abs(g.x - cur.x) < 0.3 && Math.abs(g.y - cur.y) < 0.3 && Math.abs(g.s - cur.s) < 0.002 && Math.abs(g.k - cur.k) < 0.002;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const setTarget = (t: Element | null) => {
      if (t === target) return;
      target = t;
      el.classList.toggle("is-on", !!t);
      label.textContent = t ? "CLICK ME" : "click me";
    };

    // Lift the arrow off the bubble: start exactly where the drawn one is, then hide that one.
    const liftOff = () => {
      // Wait for the name intro to finish: the arrow draws itself in near the end of it.
      // (Only its timed animations count: the scroll-driven ones on the hero never "finish".)
      const intro = document.querySelector(".nm")?.getAnimations({ subtree: true }) ?? [];
      const playing = intro.some(
        (a) => a.playState === "running" && a.timeline === document.timeline && Number.isFinite(a.effect?.getComputedTiming().endTime),
      );
      if (playing) return false;
      const drawn = document.querySelector<HTMLElement>(".nm-pointer");
      const r = drawn?.getBoundingClientRect();
      if (!r || r.width === 0) return false;
      restX = r.left;
      cur.x = r.left;
      cur.y = r.top + 20; // the middle of the 40px-tall arrow
      html.classList.add("cp-live");
      live = true;
      return true;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !usable()) return;
      mouse = { x: e.clientX, y: e.clientY };
      if (!live && !liftOff()) return;
      setTarget((e.target as Element | null)?.closest?.(TARGETS) ?? null);
      wake();
    };
    // Scrolling moves things under a still cursor, so check what's under it now.
    const onScroll = () => {
      if (!live) return;
      setTarget(document.elementFromPoint(mouse.x, mouse.y)?.closest(TARGETS) ?? null);
      wake();
    };
    // Back to the bubble when the window gets too small or the settings change.
    const onResize = () => {
      if (live && !usable()) {
        live = false;
        setTarget(null);
        html.classList.remove("cp-live");
      } else if (live) {
        const drawn = document.querySelector<HTMLElement>(".nm-pointer");
        const r = drawn?.getBoundingClientRect();
        if (r && r.width) restX = r.left;
        wake();
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reduced.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reduced.removeEventListener("change", onResize);
      cancelAnimationFrame(frame);
      html.classList.remove("cp-live");
    };
  }, []);

  return (
    <div ref={root} className="cp" aria-hidden="true">
      <svg viewBox="0 0 90 40">
        <g filter="url(#nm-wobble)">
          <path className="cp-shaft" d={toPath(CURVED.shaft)} />
          <path className="cp-head" d={toPath(CURVED.head)} />
        </g>
      </svg>
      <span className="cp-text">click me</span>
    </div>
  );
}
