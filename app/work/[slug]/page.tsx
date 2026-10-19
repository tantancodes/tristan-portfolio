import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cover from "@/components/Cover";
import FadeIn from "@/components/FadeIn";
import { getProject, projects } from "@/content/projects";

// Pre-render one static page per project at build time; any other slug is a 404.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.headline, description: project.goal } : {};
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  const strip = [
    { label: "Timeline", value: project.timeline },
    { label: "Team", value: project.team },
    { label: "My role", value: project.myRole },
    { label: "Skills", value: project.skills.join(", ") },
  ];

  return (
    <article className="case container">
      <FadeIn>
        <Link href="/#work" className="back-link">← All work</Link>
        <p className="eyebrow">{project.label}</p>
        <h1 className="case-headline">{project.headline}</h1>
      </FadeIn>

      <FadeIn delay={80}>
        <dl className="strip">
          {strip.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </FadeIn>

      <FadeIn delay={140} className="cover-frame">
        <Cover motif={project.cover} seed={project.slug} title={project.headline} />
      </FadeIn>

      <FadeIn as="section" className="case-section">
        <h2 className="section-label">The goal</h2>
        <p className="lead">{project.goal}</p>
      </FadeIn>

      <section className="case-section">
        <FadeIn>
          <h2 className="section-label">Highlights</h2>
        </FadeIn>
        <ol className="highlights">
          {project.highlights.map((h, i) => (
            <FadeIn as="li" key={h.title} delay={i * 60} className="highlight">
              <span className="highlight-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
              {h.stat && (
                <p className="stat">
                  <span className="stat-value">{h.stat}</span>
                  <span className="stat-label">{h.statLabel}</span>
                </p>
              )}
            </FadeIn>
          ))}
        </ol>
      </section>

      <FadeIn as="section" className="case-section">
        <h2 className="section-label">Looking forward</h2>
        <p className="lead">{project.lookingForward}</p>
        {project.links && (
          <p className="case-links">
            {project.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="button">
                {l.label} ↗
              </a>
            ))}
          </p>
        )}
      </FadeIn>

      <FadeIn>
        <Link href={`/work/${next.slug}`} className="next-project">
          <span className="eyebrow">Next project</span>
          <span className="next-headline">{next.headline} →</span>
        </Link>
      </FadeIn>
    </article>
  );
}
