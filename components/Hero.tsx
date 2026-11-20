import ArrowLink from "./ArrowLink";
import FadeIn from "./FadeIn";
import NameIntro from "./NameIntro";
import { hero, site } from "@/content/projects";

export default function Hero() {
  return (
    <section className="hero container">
      <FadeIn>
        <p className="hero-eyebrow">{hero.eyebrow}</p>
      </FadeIn>

      {/* not faded in: the intro opens on it */}
      <NameIntro avatar={site.avatar} />

      <FadeIn delay={100}>
        <p className="hero-intro">{hero.intro}</p>
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
