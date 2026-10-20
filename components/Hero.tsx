"use client";

import ArrowLink from "./ArrowLink";
import FadeIn from "./FadeIn";
import TypewriterEffect from "./vendor/TypewriterEffect";
import { hero, site } from "@/content/projects";

const firstName = site.name.split(" ")[0];

export default function Hero() {
  return (
    <section className="hero container">
      <FadeIn>
        <h1 className="hero-name">
          I&rsquo;m{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.avatar} alt="" className="avatar" width={112} height={112} /> {firstName}.
        </h1>
      </FadeIn>

      <FadeIn delay={150}>
        <p className="hero-role">
          {/* Screen readers get one plain sentence; the typing animation is visual only. */}
          <span className="sr-only">I am a {hero.roles.join(", ")}.</span>
          <span aria-hidden="true">
            I am a{" "}
            <TypewriterEffect
              words={hero.roles.map((word) => ({ word }))}
              typingSpeed={90}
              deletingSpeed={45}
              pauseDuration={1400}
              cursorColor="var(--ink-soft)"
              cursorWidth={2}
              cursorHeight={90}
              font={{ fontSize: "1em", fontWeight: 500 }}
              textColor="var(--ink)"
            />
          </span>
        </p>
      </FadeIn>

      <FadeIn delay={300}>
        <ArrowLink href={hero.cta.href}>{hero.cta.label}</ArrowLink>
      </FadeIn>
    </section>
  );
}
