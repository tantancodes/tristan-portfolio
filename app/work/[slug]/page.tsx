import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
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

  const [cover, ...gallery] = project.images ?? [];

  // The video's poster is the biggest thing on screen at load (the LCP element):
  // ask for it in <head> at high priority instead of waiting for the <video> tag.
  if (project.video) preload(project.video.poster, { as: "image", fetchPriority: "high" });

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
        <Link href="/#projects" className="back-link">← All projects</Link>
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

      {/* Cover, in order of preference: the demo video, else the first product screenshot, else the
          generated SVG. The video is muted by default; width/height reserve its box so nothing shifts. */}
      <FadeIn delay={140} className="cover-frame">
        {project.video ? (
          <video
            className="case-video"
            controls
            muted
            playsInline
            preload="metadata"
            poster={project.video.poster}
            width={project.video.width}
            height={project.video.height}
            aria-label={project.video.label}
          >
            <source src={project.video.mp4} type="video/mp4" />
          </video>
        ) : cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="cover-image" src={cover.src} alt={cover.alt} width={1440} height={900} />
        ) : (
          <Cover motif={project.cover} seed={project.slug} title={project.headline} />
        )}
      </FadeIn>

      {project.writeup ? (
        // Write-up projects: one section per heading, in order.
        project.writeup.map((w) => (
          <FadeIn as="section" key={w.heading} className="case-section">
            <h2 className="section-label">{w.heading}</h2>
            <div className="prose">
              {w.body.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
            {w.list && (
              <ul className="case-list">
                {w.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {w.stats && (
              <dl className="case-stats">
                {w.stats.map((st) => (
                  <div key={st.label}>
                    <dt className="stat-label">{st.label}</dt>
                    <dd className="stat-value">{st.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </FadeIn>
        ))
      ) : (
        <FadeIn as="section" className="case-section">
          <h2 className="section-label">The goal</h2>
          <p className="lead">{project.goal}</p>
        </FadeIn>
      )}

      {project.highlights && (
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
      )}

      {gallery.length > 0 && (
        <section className="case-section">
          <FadeIn>
            <h2 className="section-label">In the product</h2>
          </FadeIn>
          <div className="gallery">
            {gallery.map((image, i) => (
              <FadeIn
                as="figure"
                key={image.src}
                delay={i * 60}
                className={`gallery-item${image.phone ? " gallery-item--phone" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt={image.alt} loading="lazy" />
                {image.caption && <figcaption>{image.caption}</figcaption>}
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {(project.lookingForward || project.links) && (
        <FadeIn as="section" className="case-section">
          {project.lookingForward && (
            <>
              <h2 className="section-label">Looking forward</h2>
              <p className="lead">{project.lookingForward}</p>
            </>
          )}
          {project.links && (
            <p className="case-links">
              {project.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="button">
                  {l.label} ↗
                </a>
              ))}
            </p>
          )}
          {project.note && <p className="case-note">{project.note}</p>}
        </FadeIn>
      )}

      {project.screenshots && (
        <section className="case-section">
          <FadeIn>
            <h2 className="section-label">Screenshots</h2>
          </FadeIn>
          <div className="case-shots">
            {project.screenshots.map((shot) => (
              <FadeIn key={shot.src}>
                <figure>
                  {/* Opens the full-size image; lazy so it costs nothing until scrolled to. */}
                  <a href={shot.src} target="_blank" rel="noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" />
                  </a>
                  {shot.caption && <figcaption>{shot.caption}</figcaption>}
                </figure>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      <FadeIn>
        <Link href={`/work/${next.slug}`} className="next-project">
          <span className="eyebrow">Next project</span>
          <span className="next-headline">{next.headline} →</span>
        </Link>
      </FadeIn>
    </article>
  );
}
