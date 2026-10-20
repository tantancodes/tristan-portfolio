"use client";

import MotionOverlayMenu from "./vendor/MotionOverlayMenu";
import { site } from "@/content/projects";

// Site header: a floating pill with your name + a Menu button that opens a full-screen overlay.
// The vendored component does the animation, focus handling, Escape-to-close and scroll lock;
// this file only feeds it links and colors. Colors are CSS variables, so it follows light/dark.
export default function Menu() {
  return (
    <header className="menu-wrap">
      <MotionOverlayMenu
        logo="none"
        brand={site.name}
        brandLink="/"
        links={[
          { label: "Work", link: "/#work" },
          { label: "Play", link: "/#play" },
          { label: "About", link: "/#about" },
        ]}
        secondary={[
          { label: "GitHub", link: site.github, newTab: true },
          { label: "LinkedIn", link: site.linkedin, newTab: true },
          { label: "Email", link: `mailto:${site.email}` },
          { label: "Resume", link: site.resume, newTab: true },
        ]}
        note={site.location}
        reveal="circle"
        brandFont={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 500, letterSpacing: "-0.01em" }}
        linkFont={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(48px, 9vw, 96px)",
          fontWeight: 500,
          lineHeight: "1.05em",
          letterSpacing: "-0.04em",
        }}
        headerColor="var(--ink)"
        barBackground="var(--bar-bg)"
        barBorder="var(--line)"
        overlayBackground="var(--overlay-bg)"
        overlayText="var(--overlay-ink)"
        overlayBar="var(--overlay-bar)"
        accent="var(--overlay-muted)"
        glow="transparent"
        style={{ width: "100%" }}
      />
    </header>
  );
}
