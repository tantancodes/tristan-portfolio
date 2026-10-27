import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import Cover from "@/components/Cover";
import VideoPreview from "@/components/VideoPreview";
import { about, education, experience, projectCards, skills } from "@/content/projects";

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <Hero />

      {/* ---------- Projects: cards, linking to case studies where they exist ---------- */}
      <section id="projects" className="section section--work container">
        <FadeIn>
          <h2 className="section-title">Selected work</h2>
        </FadeIn>
        <ul className="work-grid">
          {projectCards.map((p, i) => {
            const href = p.caseStudy ? `/work/${p.caseStudy}` : p.href;
            const external = !p.caseStudy && !!p.href;
            const cta = p.caseStudy ? (p.preview ? "Watch the demo" : "Read the case study") : "Open the app";
            return (
              <FadeIn as="li" key={p.title} delay={(i % 2) * 60} className={i === 0 ? "is-featured" : ""}>
                <article className="work-card">
                  <div className="work-media">
                    {p.preview ? (
                      <VideoPreview src={p.preview.video} poster={p.preview.poster} label={p.preview.label} />
                    ) : (
                      <Cover motif={p.cover} seed={p.title} title={p.title} />
                    )}
                    {p.badge && <span className="work-badge">{p.badge}</span>}
                  </div>
                  <div className="work-body">
                    <h3 className="project-title">
                      {href &&
                        (external ? (
                          <a href={href} target="_blank" rel="noreferrer" className="stretched">
                            {p.title}
                          </a>
                        ) : (
                          <Link href={href} className="stretched">
                            {p.title}
                          </Link>
                        ))}
                    </h3>
                    <p className="project-summary">{p.summary}</p>
                    <p className="project-stack">{p.stack.join(" · ")}</p>
                    <p className="work-actions">
                      <span className="work-cta" aria-hidden="true">
                        {cta} {external ? "↗" : "→"}
                      </span>
                      {p.live && p.caseStudy && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="work-live">
                          Live app ↗
                        </a>
                      )}
                    </p>
                  </div>
                </article>
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
