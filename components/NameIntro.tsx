"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/*
 * The hero name. Every time it mounts it plays a short intro:
 *   1. a hand-drawn stick guy appears next to "Tristan",
 *   2. grabs the "tan" and drags a copy of it out to the right,
 *   3. the copy lands and its "t" pops up into a capital "T": "Tristan Tan",
 *   4. the photo rolls in from the edge of the screen; he hops out of the way
 *      and lands on top of it, waves, and stays there.
 *
 * The HTML is always the finished state ("Tristan Tan", photo, guy on top), so
 * with no JavaScript or with reduced motion you just see the end result.
 * Every animation runs from a computed start back to "no transform", so there is
 * never a layout jump. Click the name to play it again.
 */

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Easings. Ease-out for things arriving, ease-in-out for things travelling.
const OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
// A spring with one small overshoot (generated curve, see linear-easing-generator).
const SPRING =
  "linear(0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%, 0.938 16.7%, 1.017, 1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%, 1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%, 0.975 57.1%, 0.997 69.8%, 1.003 76.9%, 1)";

export default function NameIntro({ avatar }: { avatar: string }) {
  const root = useRef<HTMLHeadingElement>(null);
  const running = useRef<Animation[]>([]);
  const shouldPlay = useRef<boolean | null>(null);

  useIso(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;

    // Hand-drawn "boil": re-seed the wobble filter a few times a second, like redrawn frames.
    const turb = el.querySelector("feTurbulence");
    let seed = 1;
    const boil = window.setInterval(() => turb?.setAttribute("seed", String((seed = (seed % 6) + 1))), 140);

    // Decide once; the ref survives React re-running this effect (Strict Mode in dev).
    if (shouldPlay.current === null) {
      // Play on every mount: full page loads and client-side navigations back home.
      shouldPlay.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    if (shouldPlay.current) {
      running.current = play(el);
    }
    html.classList.remove("intro");

    const replay = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      running.current.forEach((a) => a.cancel());
      running.current = play(el);
    };
    el.addEventListener("click", replay);
    return () => {
      window.clearInterval(boil);
      el.removeEventListener("click", replay);
      running.current.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <h1 ref={root} className="hero-name nm" aria-label="Tristan Tan" title="Click to replay">
      <span aria-hidden="true" className="nm-line">
        <span className="nm-first">
          Tris<span className="nm-tan">tan</span>
          <span className="nm-base" />
        </span>
        <span className="nm-last">
          <span className="nm-T">Tan</span>
          <span className="nm-t">tan</span>
        </span>
        <span className="nm-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt="" className="avatar nm-avatar" width={112} height={112} />
          <Guy />
        </span>
      </span>
    </h1>
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
          <path pathLength={1} d="M30 4.6 C36.5 4.2 40.8 9.6 40.4 16 C40 22.6 35 27.2 29.4 26.8 C23.4 26.4 19.4 21.4 19.8 15.4 C20.2 9.2 24.4 5 30.6 5.4" />
          <g className="g-armL"><path pathLength={1} d="M30 36 C28.6 43 27.2 50 25.6 57" /></g>
          <g className="g-armR"><path pathLength={1} d="M30 36 C31.4 43 32.8 50 34.4 57" /></g>
        </g>
      </g>
    </svg>
  );
}

/* ---------- The choreography ---------- */
function play(el: HTMLElement): Animation[] {
  const q = <T extends Element = HTMLElement>(s: string) => el.querySelector(s) as T;
  const tan = q(".nm-tan"), base = q(".nm-base"), last = q(".nm-last");
  const T = q(".nm-T"), t = q(".nm-t"), img = q(".nm-avatar"), guy = q<SVGSVGElement>(".nm-guy");
  const torso = q<SVGGElement>(".g-torso"), armL = q<SVGGElement>(".g-armL"), armR = q<SVGGElement>(".g-armR");
  const legL = q<SVGGElement>(".g-legL"), legR = q<SVGGElement>(".g-legR");
  const all: Animation[] = [];
  const go = (target: Element, frames: Keyframe[], opts: KeyframeAnimationOptions) => {
    const a = target.animate(frames, { fill: "both", ...opts });
    all.push(a);
    return a;
  };

  // --- Measure the finished layout; everything animates *from* an offset back to 0.
  const rTan = tan.getBoundingClientRect(), rLast = last.getBoundingClientRect();
  const rBase = base.getBoundingClientRect(), rGuy = guy.getBoundingClientRect(), rImg = img.getBoundingClientRect();
  const D = rLast.left - rTan.left; // how far the copy travels
  const w = rTan.width;
  const gap = rGuy.width * 0.08;
  // Guy standing on the text baseline just right of "tan", relative to where he ends up (on the photo).
  const gx0 = rTan.right + gap - rGuy.left;
  const gy0 = rBase.top - rGuy.bottom;

  // Timeline (ms)
  const tDraw = 150, tReach = 520, tDrag = 760, dDrag = 1150, tPop = tDrag + dDrag, tRoll = tPop + 120, dRoll = 1150;
  const tJump = tRoll + dRoll * 0.42, dJump = 640, tWave = tJump + dJump + 60;

  // 1. Guy draws himself in, standing next to "tan".
  guy.querySelectorAll("path").forEach((p, i) =>
    go(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 380, delay: tDraw + i * 45, easing: OUT }),
  );

  // 2. The copy of "tan": starts exactly on top of the original, gets yanked (a little taffy
  //    stretch), resists for a beat, then slides out and lands with a small overshoot.
  //    The guy's x is tied to the copy's right edge so he's always holding it.
  const copyKeys: [number, number, number, string][] = [
    // offset, progress along D, scaleX, easing into the next key
    [0, 0, 1, OUT],
    [0.1, 0.05, 1.07, IN_OUT],
    [0.2, 0.025, 1.03, IN_OUT],
    [0.88, 1.025, 1.0, OUT],
    [1, 1, 1, OUT],
  ];
  go(t, [{ opacity: 1 }, { opacity: 1 }], { duration: tPop }); // lowercase visible until the pop
  go(T, [{ opacity: 0 }, { opacity: 0 }], { duration: tPop });
  go(
    last,
    copyKeys.map(([offset, p, s, easing]) => ({ offset, easing, transform: `translateX(${-D + p * D}px) scaleX(${s})` })),
    { duration: dDrag, delay: tDrag },
  );
  const guyX = (p: number, s: number) => gx0 + p * D + w * (s - 1);
  go(
    guy,
    [
      { offset: 0, transform: `translate(${gx0}px, ${gy0 + 8}px)`, opacity: 0 },
      { offset: 0.35, transform: `translate(${gx0}px, ${gy0 - 10}px)`, opacity: 1, easing: OUT }, // pops up
      { offset: 1, transform: `translate(${gx0}px, ${gy0}px)`, opacity: 1 },
    ],
    { duration: 520, delay: tDraw },
  );
  go(
    guy,
    copyKeys.map(([offset, p, s, easing]) => ({ offset, easing, transform: `translate(${guyX(p, s)}px, ${gy0}px)` })),
    { duration: dDrag, delay: tDrag, fill: "forwards" }, // "forwards" so it doesn't cover the pop-up before it starts
  );

  // Poses: reach for the letters, lean back and pull, little steps while walking.
  go(torso, [{ rotate: "0deg" }, { rotate: "16deg", offset: 0.12 }, { rotate: "10deg", offset: 0.85 }, { rotate: "0deg" }], {
    duration: tPop - tReach + 150, delay: tReach, easing: IN_OUT,
  });
  for (const arm of [armL, armR]) {
    go(arm, [{ rotate: "0deg" }, { rotate: arm === armL ? "70deg" : "80deg", offset: 0.12 }, { rotate: arm === armL ? "70deg" : "80deg", offset: 0.88 }, { rotate: "-150deg" }], {
      duration: tPop - tReach + 250, delay: tReach, easing: IN_OUT,
    });
  }
  const step = { duration: 230, delay: tDrag + dDrag * 0.2, iterations: Math.floor((dDrag * 0.7) / 230), easing: IN_OUT, direction: "alternate" as const, fill: "none" as const };
  go(legL, [{ rotate: "-24deg" }, { rotate: "18deg" }], step);
  go(legR, [{ rotate: "20deg" }, { rotate: "-22deg" }], step);

  // 3. Lowercase "t" pops up into a capital "T".
  go(t, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-0.08em)" }], { duration: 160, delay: tPop, fill: "forwards" });
  go(T, [{ opacity: 0, transform: "scaleY(0.62)" }, { opacity: 1, transform: "none" }], { duration: 520, delay: tPop, easing: SPRING, fill: "both" });

  // "T" is wider than "t", so he takes a little step back to make room.
  const dW = rLast.width - w;
  go(guy, [{ transform: `translate(${guyX(1, 1)}px, ${gy0}px)` }, { transform: `translate(${guyX(1, 1) + dW + gap}px, ${gy0}px)` }], {
    duration: 260, delay: tPop + 40, easing: OUT, fill: "forwards",
  });

  // 4. The photo rolls in from off-screen. Rolling without slipping: angle = distance / radius,
  //    so rotation and position share one easing curve. Ends with a tiny rock back and forth.
  const r = rImg.width / 2;
  const startX = window.innerWidth - rImg.left + r * 0.4;
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
  const xA = guyX(1, 1) + dW + gap;
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

  // 5. Wave, then relax into the resting pose.
  go(armR, [{ rotate: "-140deg" }, { rotate: "-165deg" }, { rotate: "-130deg" }, { rotate: "-165deg" }, { rotate: "-140deg", offset: 0.75 }, { rotate: "0deg" }], {
    duration: 1100, delay: tWave, easing: IN_OUT, fill: "forwards",
  });
  go(armL, [{ rotate: "20deg" }, { rotate: "0deg" }], { duration: 400, delay: tWave + 700, easing: IN_OUT, fill: "forwards" });

  // Once everything has finished, drop the "forwards" fills so the element is back to plain CSS.
  Promise.all(all.map((a) => a.finished)).then(() => all.forEach((a) => a.cancel()), () => {});
  return all;
}
