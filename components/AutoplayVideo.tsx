"use client";

import { useEffect, useRef } from "react";
import type { Video } from "@/content/projects";

/**
 * A silent looping preview that plays only while it's on screen.
 * - Off screen: paused (no wasted decoding or battery).
 * - prefers-reduced-motion: never plays, so only the poster shows.
 * - No JavaScript: also just the poster, since nothing ever calls play().
 * width/height reserve the box before anything loads, so the layout doesn't shift.
 */
export default function AutoplayVideo({ video, className = "" }: { video: Video; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true; // React doesn't always render the muted attribute; browsers require it for autoplay
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      if (onScreen && !reduce.matches) el.play().catch(() => {});
      else el.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    reduce.addEventListener("change", sync);
    return () => {
      io.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      poster={video.poster}
      width={video.width}
      height={video.height}
      aria-label={video.label}
    >
      {video.webm && <source src={video.webm} type="video/webm" />}
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}
