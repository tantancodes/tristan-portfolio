import Link from "next/link";
import { Fragment, ViewTransition } from "react";
import FadeIn from "./FadeIn";
import type { Project, ResearchFigure } from "@/content/projects";

/*
 * A research project page in the shape of an academic project page: title, author line, links,
 * a teaser figure, the abstract, then numbered sections with numbered figures and tables.
 * All text comes from content/projects.ts (project.research).
 */
function Figure({ fig, n }: { fig: ResearchFigure; n: number }) {
  return (
    <figure className="rs-figure" id={`fig-${n}`}>
      <a href={fig.src} target="_blank" rel="noreferrer" className="rs-figure-img" aria-label={`Open figure ${n} full size`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fig.src} alt={fig.alt} width={fig.width} height={fig.height} loading={n === 1 ? "eager" : "lazy"} decoding="async" />
      </a>
      <figcaption>
        <span className="rs-num">Figure {n}.</span> {fig.caption}
      </figcaption>
    </figure>
  );
}

export default function ResearchCase({ project, next }: { project: Project; next: Project }) {
  const r = project.research!;
  let fig = 1; // the teaser is Figure 1
  let tab = 0;
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <article className="rs container">
        <FadeIn>
          <Link href="/#projects" className="back-link">← All projects</Link>
          <p className="eyebrow">{project.label}</p>
          <h1 className="rs-title">{r.title}</h1>
          <p className="rs-authors">{r.authors}</p>
          <p className="rs-affil">{r.affiliation}</p>
          <p className="rs-links">
            {r.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="button">
                {l.label}
              </a>
            ))}
          </p>
        </FadeIn>

        <FadeIn delay={60}>
          <Figure fig={r.teaser} n={1} />
        </FadeIn>

        <FadeIn as="section" className="rs-section rs-abstract">
          <h2 className="section-label">Abstract</h2>
          <p>{r.abstract}</p>
        </FadeIn>

        {r.findings && (
          <FadeIn as="section" className="rs-section">
            <h2 className="section-label">Findings at a glance</h2>
            <ul className="rs-findings">
              {r.findings.map((f) => (
                <li key={f.text} className={`rs-finding rs-finding--${f.mark}`}>
                  <span className="rs-mark" aria-label={f.mark === "yes" ? "supported" : f.mark === "no" ? "not supported" : "inconclusive"}>
                    {f.mark === "yes" ? "✓" : f.mark === "no" ? "✗" : "~"}
                  </span>
                  <span>
                    {f.text}
                    {f.evidence && <span className="rs-evidence"> {f.evidence}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        )}

        {r.sections.map((s, i) => (
          <FadeIn as="section" key={s.heading} className="rs-section">
            <h2 className="rs-heading">
              <span className="rs-secnum">{i + 1}</span>
              {s.heading}
              {s.tag && <span className="rs-tag">{s.tag}</span>}
            </h2>
            {s.body?.map((p) => (
              <p key={p.slice(0, 40)} className="rs-p">{p}</p>
            ))}
            {s.list && (
              <ul className="rs-list">
                {s.list.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            )}
            {s.figures && (
              <div className={s.pair ? "rs-pair" : undefined}>
                {s.figures.map((f) => (
                  <Fragment key={f.src}><Figure fig={f} n={++fig} /></Fragment>
                ))}
              </div>
            )}
            {s.table && (
              <div className="rs-table-wrap">
                <table className="rs-table">
                  <caption>
                    <span className="rs-num">Table {++tab}.</span> {s.table.caption}
                  </caption>
                  <thead>
                    <tr>
                      {s.table.head.map((h) => (
                        <th key={h} scope="col">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((row) => (
                      <tr key={row[0]} className={s.table!.highlight?.includes(row[0]) ? "is-hl" : undefined}>
                        {row.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.after?.map((p) => (
              <p key={p.slice(0, 40)} className="rs-p">{p}</p>
            ))}
          </FadeIn>
        ))}

        <FadeIn as="section" className="rs-section rs-role">
          <h2 className="section-label">{r.contribution.heading}</h2>
          {r.contribution.body.map((p) => (
            <p key={p.slice(0, 40)} className="rs-p">{p}</p>
          ))}
          <p className="rs-meta">{r.meta}</p>
        </FadeIn>

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
