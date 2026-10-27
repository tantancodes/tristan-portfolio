"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A short, silent, looping clip of a real product.
 * - Plays only while at least 40% of it is on screen, and pauses when it leaves,
 *   so a page full of clips never decodes more than one or two at once.
 * - Visitors who ask for reduced motion see the still poster and nothing moves.
 * - The poster shows until the first frame is ready, so there's no blank box.
 */
export default function VideoPreview({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(motion.matches);
    sync();
    motion.addEventListener("change", sync);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (motion.matches) return video.pause();
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      motion.removeEventListener("change", sync);
    };
  }, []);

  if (still) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="media-fill" src={poster} alt={label} loading="lazy" />;
  }

  return (
    <video
      ref={ref}
      className="media-fill"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
