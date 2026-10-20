import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import { about, education, experience, projectCards, skills } from "@/content/projects";

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <Hero />

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
      </section>

      {/* ---------- Projects: cards, linking to case studies where they exist ---------- */}
      <section id="projects" className="section container">
        <FadeIn>
          <h2 className="section-title">Projects</h2>
        </FadeIn>
        <ul className="project-grid">
          {projectCards.map((p, i) => {
            const href = p.caseStudy ? `/work/${p.caseStudy}` : p.href;
            const inner = (
              <>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-summary">{p.summary}</p>
                <p className="project-stack">{p.stack.join(" · ")}</p>
                {href && (
                  <span className="project-go" aria-hidden="true">
                    {p.caseStudy ? "Case study →" : "Visit ↗"}
                  </span>
                )}
              </>
            );
            return (
              <FadeIn as="li" key={p.title} delay={(i % 2) * 60}>
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

      {/* ---------- Education & skills ---------- */}
      <section id="education" className="section container">
        <FadeIn>
          <h2 className="section-title">Education &amp; skills</h2>
        </FadeIn>
        <div className="edu-grid">
          <FadeIn className="edu">
            <h3 className="job-org">{education.school}</h3>
            <p className="job-title">{education.degree}</p>
            <p className="muted">
              {education.dates} · GPA {education.gpa}
            </p>
            <p className="edu-course">
              <span className="label">Coursework</span>
              {education.coursework.join(", ")}
            </p>
          </FadeIn>
          <FadeIn delay={60} className="skills">
            {skills.map((g) => (
              <div key={g.group} className="skill-group">
                <p className="label">{g.group}</p>
                <ul className="chips">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="section container">
        <FadeIn>
          <h2 className="section-title">About</h2>
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
