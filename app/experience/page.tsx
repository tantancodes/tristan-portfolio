import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import FadeIn from "@/components/FadeIn";
import { experience, experienceAlso, site } from "@/content/projects";

// Experience lives on its own page, reached from the hero link, so the home page stays about the work.
export const metadata: Metadata = { title: "Experience" };

export default function Experience() {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <article className="case container">
        <FadeIn>
          <Link href="/" className="back-link">← Home</Link>
          <h1 className="section-title">Experience</h1>
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
          <p className="case-links">
            <a href={site.resume} className="button">Resume (PDF) ↓</a>
          </p>
        </FadeIn>
      </article>
    </ViewTransition>
  );
}
