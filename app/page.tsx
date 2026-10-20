import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import { about, play, projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <Hero />

      {/* ---------- Work ---------- */}
      <section id="work" className="section container">
        <FadeIn>
          <h2 className="section-label">Work</h2>
        </FadeIn>
        <ul className="work-list">
          {projects.map((p, i) => (
            <FadeIn as="li" key={p.slug} delay={i * 60}>
              <Link href={`/work/${p.slug}`} className="work-row">
                <span className="work-headline">{p.headline}</span>
                <span className="work-meta">
                  {p.year} <span className="sep">/</span> {p.org} <span className="sep">/</span> {p.role}
                </span>
                <span className="work-arrow" aria-hidden="true">→</span>
              </Link>
            </FadeIn>
          ))}
        </ul>
      </section>

      {/* ---------- Play ---------- */}
      <section id="play" className="section container">
        <FadeIn>
          <h2 className="section-label">Play</h2>
        </FadeIn>
        <ul className="play-grid">
          {play.map((item, i) => (
            <FadeIn as="li" key={item.title} delay={i * 60} className="play-card">
              <h3>{item.title}</h3>
              <p className="muted">{item.blurb}</p>
            </FadeIn>
          ))}
        </ul>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="section container">
        <FadeIn>
          <h2 className="section-label">About</h2>
        </FadeIn>
        <FadeIn className="prose about">
          {about.paragraphs.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </FadeIn>
      </section>
    </>
  );
}
