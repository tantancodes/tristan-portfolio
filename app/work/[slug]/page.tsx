import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { preload } from "react-dom";
import Cover from "@/components/Cover";
import FadeIn from "@/components/FadeIn";
import RetrievalDiagram from "@/components/RetrievalDiagram";
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

  // Normally the first screenshot is the cover and the rest form the gallery.
  // When there's a demo video, the video is the cover, so every screenshot goes in the gallery.
  const images = project.images ?? [];
  const cover = project.video ? undefined : images[0];
  const gallery = project.video ? images : images.slice(1);

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
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
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
            generated SVG. The video is muted by default; its box takes the video's own shape, so nothing is cropped or shifts.
            No fade-in here: when you arrive from a project card, the card's picture morphs into this box instead. */}
        <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
          <div className="cover-frame">
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
                style={{ aspectRatio: `${project.video.width} / ${project.video.height}` }}
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
          </div>
        </ViewTransition>

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
              {w.figure && (
                <figure className="case-figure">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.figure.src} alt={w.figure.alt} width={w.figure.width} height={w.figure.height} loading="lazy" decoding="async" />
                  {w.figure.caption && <figcaption>{w.figure.caption}</figcaption>}
                </figure>
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

        {project.diagram === "retrieval" && (
          <FadeIn as="section" className="case-section">
            <h2 className="section-label">How it works</h2>
            <div className="diagram-frame">
              <RetrievalDiagram />
            </div>
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

        {(project.lookingForward || project.links || project.credits) && (
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
            {project.credits && (
              <p className="case-credits">
                <span className="label">Credits</span>
                {project.credits}
              </p>
            )}
          </FadeIn>
        )}

        {project.screenshots && (
          <section className="case-section">
            <FadeIn>
              <h2 className="section-label">{project.screenshotsLabel ?? "Screenshots"}</h2>
            </FadeIn>
            <div className="case-shots">
              {project.screenshots.map((shot) => (
                <FadeIn key={shot.src}>
                  <figure>
                    {shot.video ? (
                      <div className="case-shot-video">
                        <video src={shot.video} poster={shot.src} width={shot.width} height={shot.height} autoPlay muted loop playsInline preload="metadata" aria-label={shot.alt} />
                      </div>
                    ) : (
                      /* Opens the full-size image; lazy so it costs nothing until scrolled to. */
                      <a href={shot.src} target="_blank" rel="noreferrer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" />
                      </a>
                    )}
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
    </ViewTransition>
  );
}
