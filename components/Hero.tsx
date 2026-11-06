import ArrowLink from "./ArrowLink";
import FadeIn from "./FadeIn";
import { hero, site } from "@/content/projects";

const firstName = site.name.split(" ")[0];

export default function Hero() {
  return (
    <section className="hero container">
      <FadeIn>
        <p className="hero-eyebrow">{hero.eyebrow}</p>
      </FadeIn>

      <FadeIn delay={80}>
        <h1 className="hero-name">
          I&rsquo;m{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.avatar} alt="" className="avatar" width={112} height={112} /> {firstName}.
        </h1>
      </FadeIn>

      <FadeIn delay={150}>
        <div className="hero-ctas">
          {hero.ctas.map((c) => (
            <ArrowLink key={c.href} href={c.href}>
              {c.label}
            </ArrowLink>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
