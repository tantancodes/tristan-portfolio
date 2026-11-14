import ArrowLink from "./ArrowLink";
import FadeIn from "./FadeIn";
import { hero, site } from "@/content/projects";

const firstName = site.name.split(" ")[0];

export default function Hero() {
  return (
    <section className="hero container">
      <FadeIn delay={80}>
        <h1 className="hero-statement">
          I&rsquo;m{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.avatar} alt="" className="avatar" width={112} height={112} /> {firstName}. {hero.statement}
        </h1>
      </FadeIn>

      <FadeIn delay={120}>
        <p className="hero-now">{hero.now}</p>
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
