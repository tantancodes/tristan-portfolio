import Link from "next/link";
import AutoplayVideo from "@/components/AutoplayVideo";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import RetrievalCardArt from "@/components/RetrievalCardArt";
import { experience, experienceAlso, projectCards } from "@/content/projects";

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
            return (
              <FadeIn as="li" key={p.title} delay={p.featured ? 0 : column * 60} className={p.featured ? "is-featured" : ""}>
                {href ? (
                  <Link href={href} className="project-card is-link">
                    {inner}
                  </Link>
                ) : (
                  <div className="project-card">{inner}</div>
                )}
              </FadeIn>
            );
          })}
        </ul>
      </section>
      {/* ---------- Experience: a timeline, one row per organization ---------- */}
      <section id="experience" className="section container">
        <FadeIn>
          <h2 className="section-title">Experience</h2>
        </FadeIn>
        <ol className="timeline">
          {experience.map((job, i) => (
            <FadeIn as="li" key={job.org} delay={Math.min(i, 4) * 50} className="job">
              <p className="job-dates">
                {job.roles.map((r) => (
                  <span key={r.title}>{r.dates}</span>
                ))}
              </p>
              <div className="job-body">
                <h3 className="job-org">
                  {job.org}
                  {job.place && <span className="job-place">{job.place}</span>}
                </h3>
                {job.roles.map((r) => (
                  <div key={r.title} className="job-role">
                    <p className="job-title">{r.title}</p>
                    {r.points && (
                      <ul className="job-points">
                        {r.points.map((pt) => (
                          <li key={pt.slice(0, 32)}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {job.tags && <p className="job-tags">{job.tags.join(" · ")}</p>}
                {job.caseStudy && (
                  <Link href={`/work/${job.caseStudy}`} className="text-link">
                    Read the case study →
                  </Link>
                )}
              </div>
            </FadeIn>
          ))}
        </ol>
        <FadeIn>
          <p className="experience-also">{experienceAlso}</p>
        </FadeIn>
      </section>
    </>
  );
}
