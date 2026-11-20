import Link from "next/link";
import { ViewTransition } from "react";
import BreathingBubble from "./BreathingBubble";
import type { Project } from "@/content/projects";

/*
 * A project page in Splat Journal's own style: warm paper, ink, the pen font,
 * one red seal. Deliberately short: a title, one line on how to use it,
 * the demos as prints on the page, and a "try me" bubble that opens the app.
 */
export default function ScrapbookCase({ project, next }: { project: Project; next: Project }) {
  const how = project.writeup?.[0];
  const second = how?.video;
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <article className="sb container">
        <Link href="/#projects" className="sb-margin sb-back">
          ← all projects
        </Link>

        <header className="sb-head">
          <h1 className="sb-title">
            {project.headline}
            <span className="sb-seal" aria-hidden="true">記</span>
          </h1>
          <p className="sb-margin">{project.label}</p>
        </header>

        <p className="sb-how">{how?.body[0]}</p>

        <div className="sb-prints">
          {project.video && (
            <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
              <figure className="sb-print sb-print--a">
                <video
                  autoPlay muted loop playsInline preload="metadata"
                  poster={project.video.poster}
                  width={project.video.width} height={project.video.height}
                  aria-label={project.video.label}
                >
                  <source src={project.video.mp4} type="video/mp4" />
                </video>
              </figure>
            </ViewTransition>
          )}

          {project.liveUrl && (
            <BreathingBubble href={project.liveUrl} label="Try Splat Journal (opens the app)">
              try me
            </BreathingBubble>
          )}

          {second && (
            <figure className="sb-print sb-print--b">
              <video
                autoPlay muted loop playsInline preload="none"
                poster={second.poster}
                width={second.width} height={second.height}
                aria-label={second.label}
              >
                <source src={second.mp4} type="video/mp4" />
              </video>
            </figure>
          )}
        </div>

        <footer className="sb-foot">
          {project.links?.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="sb-margin sb-link">
              {l.label} ↗
            </a>
          ))}
          <Link href={`/work/${next.slug}`} className="sb-margin sb-link">
            next: {next.headline.toLowerCase()} →
          </Link>
        </footer>
      </article>
    </ViewTransition>
  );
}
