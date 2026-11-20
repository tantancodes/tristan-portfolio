"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";

/*
 * The hero name. On the first home-page view of each page load it plays a short intro:
 *   1. the page opens on a close-up of a hand-drawn stick guy standing next to "Tristan",
 *   2. he grabs the "tan" and yanks on it, hard, three times (it stretches like taffy and
 *      snaps back), and on the third pull it finally pops free,
 *   3. the camera zooms out to the whole page as the copy slides out: "Tristan tan",
 *   4. the photo rolls in from the edge of the screen; he hops out of the way
 *      and lands on top of it, waves, and stays there.
 * His eyes follow the mouse the whole time (they watch the "tan" while he's pulling).
 *
 * The HTML is always the finished state ("Tristan tan", photo, guy on top), so
 * with no JavaScript or with reduced motion you just see the end result.
 * Every animation runs from a computed start back to "no transform", so there is
 * never a layout jump. A click or key press anywhere skips straight to the end.
 */

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Easings. Ease-out for things arriving, ease-in-out for things travelling.
const OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
const SNAP = "cubic-bezier(0.3, 0, 0.1, 1)"; // fast recoil
const PULL = "cubic-bezier(0.5, 0, 0.9, 0.6)"; // effortful, speeding up

type Intro = { cancel: () => void; skip: () => void };

// Set once the intro has played in this page load. Module state survives moving around the site
// (Next swaps pages without reloading), so coming back to the home page doesn't play it again;
// a real reload starts fresh.
let introPlayed = false;

export default function NameIntro({ avatar }: { avatar: string }) {
  const root = useRef<HTMLHeadingElement>(null);
  const running = useRef<Intro | null>(null);
  const shouldPlay = useRef<boolean | null>(null);

  useIso(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Hand-drawn "boil": re-seed the wobble filter a few times a second, like redrawn frames.
    const turb = el.querySelector("feTurbulence");
    let seed = 1;
    const boil = window.setInterval(() => turb?.setAttribute("seed", String((seed = (seed % 6) + 1))), 140);

    // Decide once; the ref survives React re-running this effect (Strict Mode in dev).
    if (shouldPlay.current === null) {
      const r = el.getBoundingClientRect();
      shouldPlay.current =
        !introPlayed && // only the first time the home page shows in this page load
        !reduced() &&
        r.bottom > 0 && r.top < window.innerHeight && // hero is on screen (not a reload halfway down the page)
        !(html.classList.contains("intro") && performance.now() > 2800); // the CSS failsafe already showed the page
    }
    // Keep the bubble (and its "click me") on screen: nudge it sideways if it would run off an edge.
    const thought = el.querySelector<HTMLElement>(".nm-thought");
    const fit = () => {
      if (!thought) return;
      thought.style.setProperty("--nm-dx", "0px");
      thought.style.setProperty("--nm-dy", "0px");
      const parts = [".nm-cloud-ink", ".nm-pointer"].map((s) => thought.querySelector(s)!.getBoundingClientRect());
      const left = Math.min(...parts.map((r) => r.left)), right = Math.max(...parts.map((r) => r.right));
      const top = Math.min(...parts.map((r) => r.top)) + window.scrollY; // from the top of the page
      const pad = 12, vw = document.documentElement.clientWidth;
      const dx = right > vw - pad ? vw - pad - right : left < pad ? pad - left : 0;
      const dy = top < pad ? pad - top : 0; // never above the top of the page
      thought.style.setProperty("--nm-dx", `${Math.round(dx)}px`);
      thought.style.setProperty("--nm-dy", `${Math.round(dy)}px`);
    };
    fit();
    window.addEventListener("resize", fit);

    if (shouldPlay.current) {
      introPlayed = true;
      running.current = play(el);
    }
    html.classList.remove("intro");

    const stopLook = followMouse(el);
    return () => {
      window.clearInterval(boil);
      window.removeEventListener("resize", fit);
      stopLook();
      running.current?.cancel();
    };
  }, []);

  return (
    <h1 ref={root} className="hero-name nm" aria-label="Tristan Tan">
      <span className="nm-line">
        <span aria-hidden="true" className="nm-first">
          Tris<span className="nm-tan">ta<span className="nm-n">n</span></span>
          <span className="nm-base" />
        </span>
        <span aria-hidden="true" className="nm-last">tan</span>
        <span className="nm-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt="" className="avatar nm-avatar" width={112} height={112} />
          <Guy />
          <Thought />
        </span>
      </span>
    </h1>
  );
}

/* ---------- His thought bubble ----------
   A hand-drawn cloud with a trail of little circles back to his head. Inside it, a tiny
   looping clip of Splat Journal instead of words; beside it, a hand-drawn arrow and
   "click me". The whole thing links to the Splat Journal page. */
function Thought() {
  return (
    <Link href="/work/splat-journal" className="nm-thought" aria-label="Splat Journal, a 3D scrapbook: see the project">
      <span className="nm-dots" aria-hidden="true">
        <span className="nm-dot" />
        <span className="nm-dot" />
        <span className="nm-dot" />
      </span>
      <span className="nm-cloud" aria-hidden="true">
        <svg className="nm-cloud-ink" viewBox="0 0 220 140" preserveAspectRatio="none">
          <path
            filter="url(#nm-wobble)"
            pathLength={1}
            d="M36 34 C38 14 64 6 80 20 C88 4 118 2 128 18 C140 4 170 8 176 28 C200 26 214 46 206 66 C218 80 210 110 188 112 C184 130 156 136 142 124 C130 138 98 138 90 124 C74 136 46 132 44 116 C22 120 6 100 16 82 C2 70 8 38 36 34 Z"
          />
        </svg>
        <span className="nm-clip">
          <video src="/work/splat-journal/card.mp4" poster="/work/splat-journal/card-poster.webp" autoPlay muted loop playsInline preload="metadata" />
        </span>
        <span className="nm-pointer">
          <svg viewBox="0 0 90 40" aria-hidden="true">
            <g filter="url(#nm-wobble)">
              <path pathLength={1} d="M84 30 C70 34 52 30 40 22 C30 15 20 14 8 18" />
              <path pathLength={1} d="M18 10 C14 13 10 15 7 18 C11 20 14 23 17 27" />
            </g>
          </svg>
          <span className="nm-pointer-text">click me</span>
        </span>
      </span>
    </Link>
  );
}

/* ---------- The stick guy ----------
   viewBox 60 × 100, feet at the bottom centre. Limbs are separate groups so they can
   rotate around the shoulder / hip; the slightly uneven paths keep it hand-drawn. */
function Guy() {
  return (
    <svg className="nm-guy" viewBox="0 0 60 100" aria-hidden="true">
      <defs>
        <filter id="nm-wobble" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" />
        </filter>
      </defs>
      <g className="g-all" filter="url(#nm-wobble)">
        <g className="g-legL"><path pathLength={1} d="M30 62 C28.5 72 25.5 84 22.5 97.5" /></g>
        <g className="g-legR"><path pathLength={1} d="M30 62 C31.5 72 34.8 84 38 97.5" /></g>
        <g className="g-torso">
          <path pathLength={1} d="M30.4 27 C29.6 38 30.6 50 30 62" />
          <g className="g-head">
            <path pathLength={1} d="M30 4.6 C36.5 4.2 40.8 9.6 40.4 16 C40 22.6 35 27.2 29.4 26.8 C23.4 26.4 19.4 21.4 19.8 15.4 C20.2 9.2 24.4 5 30.6 5.4" />
            <g className="g-eyes">
              <circle cx="26" cy="15" r="1.7" />
              <circle cx="34" cy="15" r="1.7" />
            </g>
          </g>
          <g className="g-armL"><path pathLength={1} d="M30 36 C28.6 43 27.2 50 25.6 57" /></g>
          <g className="g-armR"><path pathLength={1} d="M30 36 C31.4 43 32.8 50 34.4 57" /></g>
        </g>
      </g>
    </svg>
  );
}

/* ---------- Eyes follow the mouse ----------
   The pupils slide toward the pointer and the head tips a little toward it.
   While he's pulling (data-look="tan" on the heading) he watches the letters instead. */
function followMouse(el: HTMLElement) {
  const head = el.querySelector<SVGGElement>(".g-head");
  const eyes = el.querySelector<SVGGElement>(".g-eyes");
  if (!head || !eyes) return () => {};
  let mouse: { x: number; y: number } | null = null;
  let x = 0, y = 0, tilt = 0, raf = 0;

  const onMove = (e: PointerEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
  const tick = () => {
    raf = requestAnimationFrame(tick);
    let tx = 0, ty = 0, tt = 0;
    if (el.dataset.look === "tan") {
      tx = -1; ty = 0.45; tt = -6;
    } else if (mouse) {
      const r = head.getBoundingClientRect();
      const dx = mouse.x - (r.left + r.width / 2), dy = mouse.y - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / (r.width * 3)); // look straight ahead when the mouse is right on him
      tx = (dx / d) * k; ty = (dy / d) * k;
      tt = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.4))) * 14;
    }
    x += (tx - x) * 0.2; y += (ty - y) * 0.2; tilt += (tt - tilt) * 0.12;
    eyes.setAttribute("transform", `translate(${(x * 3.4).toFixed(2)} ${(y * 3).toFixed(2)})`);
    head.style.rotate = `${tilt.toFixed(2)}deg`;
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  raf = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); };
}

/* ---------- The choreography ---------- */
function play(el: HTMLElement): Intro {
  const q = <T extends Element = HTMLElement>(s: string) => el.querySelector(s) as T;
  const tan = q(".nm-tan"), n = q(".nm-n"), base = q(".nm-base"), last = q(".nm-last");
  const img = q(".nm-avatar"), guy = q<SVGSVGElement>(".nm-guy");
  const torso = q<SVGGElement>(".g-torso"), armL = q<SVGGElement>(".g-armL"), armR = q<SVGGElement>(".g-armR");
  const legL = q<SVGGElement>(".g-legL"), legR = q<SVGGElement>(".g-legR");
  const html = document.documentElement, body = document.body;
  const all: Animation[] = [];
  const timers: number[] = [];
  const go = (target: Element, frames: Keyframe[], opts: KeyframeAnimationOptions) => {
    const a = target.animate(frames, { fill: "both", ...opts });
    all.push(a);
    return a;
  };
  // Keyframes written as [time in ms, value...] → offsets within one animation of that length.
  const timed = <K extends [number, ...unknown[]]>(keys: K[], frame: (k: K) => Keyframe) => {
    const total = keys[keys.length - 1][0];
    return { frames: keys.map((k) => ({ offset: k[0] / total, ...frame(k) })), duration: total };
  };

  // No page scrolling while the camera is zoomed in. (Set before measuring, so nothing shifts after.)
  const prevOverflow = html.style.overflow;
  html.style.overflow = "hidden";
  const unlock = () => { html.style.overflow = prevOverflow; };

  // --- Measure the finished layout; everything animates *from* an offset back to 0.
  const rTan = tan.getBoundingClientRect(), rLast = last.getBoundingClientRect(), rBody = body.getBoundingClientRect();
  const rBase = base.getBoundingClientRect(), rGuy = guy.getBoundingClientRect(), rImg = img.getBoundingClientRect();
  const D = rLast.left - rTan.left; // how far the copy travels
  const w = rTan.width;
  const gy0 = rBase.top - rGuy.bottom; // feet on the text baseline
  const rN = n.getBoundingClientRect(), nW = rN.width;

  // Where his hands are, in the SVG's 60 × 100 units, for a given lean (torso rotation about the hip)
  // and arm angle (relative to the torso). Used to put his hands exactly on what he's holding.
  const u = rGuy.width / 60;
  const hand = (lean: number, arm: number) => {
    const L = (lean * Math.PI) / 180, A = ((lean + arm) * Math.PI) / 180;
    const sx = 30 + 26 * Math.sin(L), sy = 62 - 26 * Math.cos(L); // shoulder
    return { x: sx - 21 * Math.sin(A), y: sy + 21 * Math.cos(A) };
  };
  const ARM = 95; // arms held out level toward the letters (relative to the ground)
  // Guy x offset (relative to his resting place) that puts his hands on client x `edge` at this lean.
  const holdX = (lean: number, edge: (handY: number) => number) => {
    const h = hand(lean, ARM - lean);
    const handY = rGuy.top + gy0 + h.y * u;
    return edge(handY) + u * 1.5 - (rGuy.left + h.x * u); // grip a little way into the letter
  };
  // The "n" bends toward him: a lean (skew about the baseline) plus a little stretch.
  const BEND = 14, STRETCH = 0.12;
  const nEdge = (bend: number) => (y: number) =>
    rN.left + nW * (1 + STRETCH * bend) + Math.tan((BEND * bend * Math.PI) / 180) * (rBase.top - y);
  const copyEdge = (p: number) => () => rTan.right + p * D;

  // --- Timeline (ms). Three yanks; the third one gets it out.
  const tGrab = 300, tPop = 2300, tLand = 3450, tZoom = tPop + 60, dZoom = 1450;
  const tRoll = 3550, dRoll = 1150, tJump = tRoll + dRoll * 0.42, dJump = 640, tWave = tJump + dJump + 60;
  const strains: [number, number, number][] = [ // [start, end, how hard]
    [520, 820, 0.5],
    [1180, 1500, 0.8],
    [1830, tPop, 1.3],
  ];

  // He watches the letters while he pulls, then goes back to watching the mouse.
  el.dataset.look = "tan";
  timers.push(window.setTimeout(() => delete el.dataset.look, tPop + 250));

  // 1. He grabs the "n" and yanks. Each yank bends it toward him and he strains, then it springs
  //    back. The third time a copy of "tan" pops free from behind it and slides out to its place.
  //    One set of keys drives the letter, his lean, his arms and his position, so his hands stay on it.
  const keys: [number, number, number, number, string][] = [
    // time, bend of the "n", copy progress along D, his lean, easing into the next key
    [0, 0, 0, 8, "linear"],
    [tGrab, 0.05, 0, 8, PULL],
    [520, 0.5, 0, 30, "linear"],
    [820, 0.55, 0, 33, SNAP],
    [1000, 0.12, 0, 15, PULL],
    [1180, 0.8, 0, 38, "linear"],
    [1500, 0.85, 0, 41, SNAP],
    [1680, 0.2, 0, 19, PULL],
    [1830, 1.2, 0, 46, "linear"],
    [tPop, 1.3, 0, 50, "cubic-bezier(0.2, 0.9, 0.3, 1)"], // pop!
    [tPop + 130, 0, 0.22, 64, OUT],
    [tLand - 250, 0, 1.02, 8, OUT],
    [tLand, 0, 1, 0, "linear"],
  ];
  const popAt = keys.findIndex((k) => k[0] === tPop);
  const guyAt = (i: number): number => {
    if (i === 0) return guyAt(1); // standing where he'll grab from
    const [, bend, p, lean] = keys[i];
    return holdX(lean, i <= popAt ? nEdge(bend) : copyEdge(p));
  };
  const guyMove = timed(keys, ([, , , , easing]) => ({ easing }));
  go(guy, guyMove.frames.map((f, i) => ({ ...f, transform: `translate(${guyAt(i)}px, ${gy0}px)` })), { duration: guyMove.duration });
  const xA = guyAt(keys.length - 1); // where he ends up, holding the finished "tan"

  // The "n" itself (only up to the pop), then it wobbles back into shape.
  const origin = `0px ${rBase.top - rN.top}px`; // bend from the baseline
  const bendT = (b: number) => `skewX(${-BEND * b}deg) scaleX(${1 + STRETCH * Math.max(0, b)})`; // never narrower than normal
  const nKeys = timed(keys.slice(0, popAt + 1), ([, b, , , easing]) => ({ easing, transform: bendT(b), transformOrigin: origin }));
  go(n, nKeys.frames, { duration: nKeys.duration });
  go(n, [1.3, -0.45, 0.2, -0.08, 0].map((b) => ({ transform: bendT(b), transformOrigin: origin })), { duration: 520, delay: tPop, easing: "ease-out", fill: "forwards" });

  // The copy is clipped so only the part that's come out past the original "n" shows.
  // (Not clamped at 0: once it's clear, a negative inset just clips nothing, and staying
  // linear keeps the clip edge lined up between keyframes.)
  const copy = timed(keys, ([, , p, , easing]) => ({
    easing,
    transform: `translateX(${-D + p * D}px)`,
    clipPath: `inset(-50% -50% -50% ${(w - p * D).toFixed(2)}px)`,
  }));
  go(last, copy.frames, { duration: copy.duration });

  // Trembling with effort while he strains (on `translate`, so it stacks on top of the movement).
  const jitter = (target: Element, amp: number, from: number, to: number) => {
    const n = Math.max(2, Math.round((to - from) / 34));
    const frames: Keyframe[] = Array.from({ length: n + 1 }, (_, i) => {
      const k = i / n, a = amp * (0.4 + 0.6 * k) * (i === 0 || i === n ? 0 : 1); // builds up, ends at rest
      return { translate: `${((Math.random() * 2 - 1) * a).toFixed(2)}px ${((Math.random() * 2 - 1) * a * 0.6).toFixed(2)}px` };
    });
    go(target, frames, { duration: to - from, delay: from, easing: "linear", fill: "none" });
  };
  for (const [a, b, k] of strains) jitter(guy, rGuy.width * 0.012 * k, a, b); // small, so his grip holds

  // Poses: lean and arms come from the same keys, so the arms stay level on the letter.
  const lean = timed(keys, ([, , , d, easing]) => ({ rotate: `${d}deg`, easing }));
  go(torso, lean.frames, { duration: lean.duration });
  for (const arm of [armL, armR]) {
    const spread = arm === armL ? -5 : 5;
    const pose = timed(
      [[0, 0, IN_OUT] as [number, number, string], ...keys.slice(1).map(([t, , , d, e]) => [t, ARM - d + spread, e] as [number, number, string]), [tLand + 250, -150, "linear"]],
      ([, d, easing]) => ({ rotate: `${d}deg`, easing }),
    );
    go(arm, pose.frames, { duration: pose.duration, fill: "forwards" });
  }
  // Feet braced out in front (toward the letters), digging in harder each yank.
  for (const leg of [legL, legR]) {
    const m = leg === legL ? 0.55 : 0.3; // not so far that his feet dig into the "n"
    const brace = timed(
      [[0, 0], [tGrab, 10], [520, 26], [1000, 18], [1180, 32], [1680, 22], [1830, 38], [tPop, 40], [tPop + 140, -8], [tLand, 0]] as [number, number][],
      ([, d]) => ({ rotate: `${d * m}deg`, easing: IN_OUT }),
    );
    go(leg, brace.frames, { duration: brace.duration });
  }
  // Stumbling steps while he's carried along with the copy.
  const step = { duration: 200, delay: tPop + 200, iterations: 4, easing: IN_OUT, direction: "alternate" as const, fill: "none" as const };
  go(legL, [{ rotate: "-26deg" }, { rotate: "20deg" }], step);
  go(legR, [{ rotate: "22deg" }, { rotate: "-24deg" }], step);

  // 2. Camera: open on a close-up of him, creep in as he strains (and shake on every yank),
  //    then pull back to the whole page once the "tan" comes free.
  const vw = window.innerWidth, vh = window.innerHeight;
  const S = Math.max(1.6, Math.min(5, (vh * 0.42) / rGuy.height, (vw * 0.92) / (w + rGuy.width * 1.6)));
  const gcx = rGuy.left + guyAt(0) + rGuy.width / 2, gcy = rBase.top - rGuy.height / 2; // his centre at the start
  const cam = (fx: number, fy: number, s: number) => // put client point (fx, fy) at the centre of the screen at zoom s
    `translate(${vw / 2 - rBody.left - s * (fx - rBody.left)}px, ${vh / 2 - rBody.top - s * (fy - rBody.top)}px) scale(${s})`;
  const fx0 = gcx * 0.7 + (rTan.left + w / 2) * 0.3;
  const shot = timed(
    [
      [0, cam(fx0, gcy, S), "linear"],
      [tGrab, cam(fx0, gcy, S), IN_OUT],
      [tPop, cam(fx0 + w * 0.12, gcy, S * 1.12), "linear"],
      [tZoom, cam(fx0 + w * 0.14, gcy, S * 1.12), "cubic-bezier(0.6, 0, 0.12, 1)"],
      [tZoom + dZoom, "translate(0px, 0px) scale(1)", "linear"],
    ] as [number, string, string][],
    ([, transform, easing]) => ({ transform, transformOrigin: "0 0", easing }),
  );
  const camera = go(body, shot.frames, { duration: shot.duration });
  for (const [a, b, k] of strains) jitter(body, 4 * k, a, b);
  go(body, [{ translate: "0 0" }, { translate: "-10px 3px" }, { translate: "5px -2px" }, { translate: "0 0" }], { duration: 260, delay: tPop, easing: OUT, fill: "none" });
  camera.finished.then(() => { camera.cancel(); unlock(); }, unlock);

  // 3. The photo rolls in from off-screen. Rolling without slipping: angle = distance / radius,
  //    so rotation and position share one easing curve. Ends with a tiny rock back and forth.
  const r = rImg.width / 2;
  const startX = vw - rImg.left + r * 0.4;
  const rollKeys = Array.from({ length: 41 }, (_, i) => {
    const k = i / 40;
    const e = 1 - Math.pow(1 - k, 3.2); // ease-out
    // ...plus a small roll past the mark and back at the very end.
    const x = startX * (1 - e) - Math.sin(Math.min(1, Math.max(0, (k - 0.72) / 0.28)) * Math.PI) * r * 0.06;
    return { offset: k, transform: `translateX(${x}px) rotate(${(x / r) * (180 / Math.PI)}deg)` };
  });
  go(img, rollKeys, { duration: dRoll, delay: tRoll, easing: "linear" });

  // He sees it coming, hops up and lands on top of the photo (his resting place).
  const lift = rImg.height * 0.9 + rGuy.height * 0.25;
  go(
    guy,
    [
      { offset: 0, transform: `translate(${xA}px, ${gy0}px) scale(1, 1)` },
      { offset: 0.12, transform: `translate(${xA}px, ${gy0}px) scale(1.08, 0.86)`, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)" }, // crouch
      { offset: 0.55, transform: `translate(${xA * 0.35}px, ${Math.min(gy0, 0) - lift * 0.55}px) scale(0.96, 1.06)`, easing: "cubic-bezier(0.5, 0, 0.8, 0.5)" }, // apex
      { offset: 0.86, transform: "translate(0px, 0px) scale(1.1, 0.84)", easing: OUT }, // land, squash
      { offset: 1, transform: "translate(0px, 0px) scale(1, 1)" },
    ],
    { duration: dJump, delay: tJump, fill: "forwards" },
  );
  go(torso, [{ rotate: "0deg" }, { rotate: "-8deg", offset: 0.5 }, { rotate: "0deg" }], { duration: dJump, delay: tJump, easing: IN_OUT, fill: "none" });
  go(armL, [{ rotate: "-150deg" }, { rotate: "-40deg", offset: 0.5 }, { rotate: "20deg" }], { duration: dJump, delay: tJump, easing: IN_OUT, fill: "forwards" });
  go(armR, [{ rotate: "-150deg" }, { rotate: "-120deg", offset: 0.5 }, { rotate: "-140deg" }], { duration: dJump, delay: tJump, easing: IN_OUT, fill: "forwards" });

  // 4. Wave, then relax into the resting pose.
  go(armR, [{ rotate: "-140deg" }, { rotate: "-165deg" }, { rotate: "-130deg" }, { rotate: "-165deg" }, { rotate: "-140deg", offset: 0.75 }, { rotate: "0deg" }], {
    duration: 1100, delay: tWave, easing: IN_OUT, fill: "forwards",
  });
  go(armL, [{ rotate: "20deg" }, { rotate: "0deg" }], { duration: 400, delay: tWave + 700, easing: IN_OUT, fill: "forwards" });

  // 5. He puts a hand to his chin and thinks: the dots float up one at a time, then the bubble
  //    puffs open and the words write themselves in, line by line.
  const tThink = tWave + 700;
  go(armR, [{ rotate: "0deg" }, { rotate: "-128deg", offset: 0.25 }, { rotate: "-128deg", offset: 0.85 }, { rotate: "0deg" }], {
    duration: 3400, delay: tThink, easing: IN_OUT, fill: "none",
  });
  el.querySelectorAll(".nm-dot").forEach((d, i) =>
    go(d, [{ opacity: 0, transform: "translateY(6px) scale(0.2)" }, { opacity: 1, transform: "none" }], {
      duration: 420, delay: tThink + 350 + i * 220, easing: "cubic-bezier(0.34, 1.5, 0.5, 1)",
    }),
  );
  const tCloud = tThink + 350 + 3 * 220;
  go(q(".nm-cloud"), [{ opacity: 0, transform: "scale(0.3)" }, { opacity: 1, transform: "none" }], {
    duration: 620, delay: tCloud, easing: "cubic-bezier(0.34, 1.45, 0.5, 1)",
  });
  go(q(".nm-cloud path"), [{ strokeDasharray: "1.2 1.2", strokeDashoffset: 1.2 }, { strokeDasharray: "1.2 1.2", strokeDashoffset: 0 }], { duration: 700, delay: tCloud, easing: OUT });
  go(q(".nm-clip"), [{ opacity: 0, transform: "scale(0.85)" }, { opacity: 1, transform: "none" }], { duration: 500, delay: tCloud + 300, easing: OUT });
  el.querySelectorAll(".nm-pointer path").forEach((p, i) =>
    go(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: i ? 220 : 520, delay: tCloud + 900 + i * 500, easing: OUT }),
  );
  go(q(".nm-pointer-text"), [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 400, delay: tCloud + 1250, easing: OUT });

  // A click or key press anywhere skips to the end: every animation jumps to its last frame,
  // and the cleanup below then hands everything back to plain CSS (the finished layout).
  const stopListening = () => {
    window.removeEventListener("pointerdown", skip, true);
    window.removeEventListener("keydown", skip, true);
  };
  function skip() {
    stopListening();
    all.forEach((a) => { try { a.finish(); } catch {} });
    timers.forEach(clearTimeout);
    delete el.dataset.look;
    unlock();
  }
  window.addEventListener("pointerdown", skip, true);
  window.addEventListener("keydown", skip, true);

  // Once everything has finished, drop the "forwards" fills so the elements are back to plain CSS.
  Promise.all(all.map((a) => a.finished)).then(() => { stopListening(); all.forEach((a) => a.cancel()); }, () => {});
  return {
    cancel() {
      stopListening();
      all.forEach((a) => a.cancel());
      timers.forEach(clearTimeout);
      delete el.dataset.look;
      unlock();
    },
    skip,
  };
}
