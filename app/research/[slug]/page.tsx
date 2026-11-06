import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { getProject, getResearch, publishedResearch } from "@/content/projects";

// One static page per published poster. Drafts are only built in local development.
export function generateStaticParams() {
  return publishedResearch.map((r) => ({ slug: r.slug }));
}
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getResearch((await params).slug);
  return entry ? { title: entry.title, description: entry.abstract } : {};
}

export default async function ResearchPoster({ params }: Props) {
  const entry = getResearch((await params).slug);
  if (!entry) notFound();

  const project = entry.project ? getProject(entry.project) : undefined;
  const strip = [
    { label: "Venue", value: entry.venue },
    { label: "Date", value: entry.date },
    { label: "PI", value: entry.pi },
    { label: "Collaborators", value: entry.collaborators.join(", ") },
  ].filter((s) => s.value);

  return (
    <article className="case container">
      <FadeIn>
        <Link href="/#research" className="back-link">← All research</Link>
        <p className="eyebrow">
          Research poster
          {entry.draft && <span className="draft-badge">Draft · not on the live site</span>}
        </p>
        <h1 className="case-headline">{entry.title}</h1>
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

      <FadeIn delay={140} className="cover-frame poster-frame">
        {entry.poster ? (
          <a href={entry.poster.src} target="_blank" rel="noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cover-image"
              src={entry.poster.src}
              alt={entry.poster.alt}
              width={entry.poster.width}
              height={entry.poster.height}
              fetchPriority="high"
            />
          </a>
        ) : (
          <p className="poster-missing">Poster image goes here</p>
        )}
      </FadeIn>

      {entry.pdf && (
        <p className="case-links">
          <a href={entry.pdf} download className="button">
            Download the poster (PDF) ↓
          </a>
        </p>
      )}

      <FadeIn as="section" className="case-section">
        <h2 className="section-label">Abstract</h2>
        <p className="lead">{entry.abstract}</p>
      </FadeIn>

      {project && (
        <FadeIn>
          <Link href={`/work/${project.slug}`} className="next-project">
            <span className="eyebrow">Related project</span>
            <span className="next-headline">{project.headline} →</span>
          </Link>
        </FadeIn>
      )}
    </article>
  );
}
