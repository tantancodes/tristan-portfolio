import Link from "next/link";
import AutoplayVideo from "@/components/AutoplayVideo";
import Cover from "@/components/Cover";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import RetrievalCardArt from "@/components/RetrievalCardArt";
import { projectCards } from "@/content/projects";

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <Hero />

      {/* ---------- Selected work: right under the hero, so the first project's video
           is already playing at the bottom of the first screen. Cards link to case studies. ---------- */}
      <section id="projects" className="section section--work container">
        <FadeIn>
          <h2 className="section-title">Selected work</h2>
        </FadeIn>
        <ul className="project-grid">
          {projectCards.map((p, i) => {
            // Stagger the fade-in by column; a featured card takes a whole row, so count only normal cards.
            const column = projectCards.slice(0, i).filter((c) => !c.featured).length % 2;
            const href = p.caseStudy ? `/work/${p.caseStudy}` : p.href;
            const inner = (
              <>
                {p.video && (
                  // The box takes the video's own shape, so nothing is cropped and nothing shifts.
                  <div className="project-media" style={{ aspectRatio: `${p.video.width} / ${p.video.height}` }}>
                    <AutoplayVideo video={p.video} />
                  </div>
                )}
                {!p.video && p.art === "retrieval" && (
                  <div className="project-media" style={{ aspectRatio: "720 / 450" }}>
                    <RetrievalCardArt />
                  </div>
                )}
                {!p.video && !p.art && p.cover && (
                  <div className="project-media project-media--cover">
                    <Cover motif={p.cover} seed={`card-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} title={p.title} />
                  </div>
                )}
                <p className="project-status">{p.status}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-summary">{p.summary}</p>
                {p.stat && <p className="project-stat">{p.stat}</p>}
                <p className="project-stack">{p.stack.join(" · ")}</p>
                {href && (
                  <span className="project-go" aria-hidden="true">
                    {p.caseStudy ? "Case study →" : "Visit ↗"}
                  </span>
                )}
              </>
            );
            // A group heading ("Ten Strands") goes in front of the first card of each group.
            const heading = p.group && p.group !== projectCards[i - 1]?.group && (
              <li key={`group-${p.group}`} className="project-group">
                <h3 className="project-group-title">{p.group}</h3>
              </li>
            );
            return [
              heading,
              <FadeIn as="li" key={p.title} delay={p.featured ? 0 : column * 60} className={p.featured ? "is-featured" : ""}>
                {href ? (
                  <Link href={href} className="project-card is-link">
                    {inner}
                  </Link>
                ) : (
                  <div className="project-card">{inner}</div>
                )}
              </FadeIn>,
            ];
          })}
        </ul>
      </section>
    </>
  );
}
