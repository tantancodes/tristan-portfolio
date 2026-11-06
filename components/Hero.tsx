import ArrowLink from "./ArrowLink";
import FadeIn from "./FadeIn";
import { hero, site } from "@/content/projects";

const firstName = site.name.split(" ")[0];

export default function Hero() {
  const now = [
    { label: "Currently", items: hero.currently },
    { label: "Previously", items: hero.previously },
  ];

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
        <p className="hero-role">{hero.positioning}</p>
      </FadeIn>

      <FadeIn delay={220}>
        <dl className="hero-now">
          {now.map((group) => (
            <div key={group.label}>
              <dt className="label">{group.label}</dt>
              {group.items.map((item) => (
                <dd key={item}>{item}</dd>
              ))}
            </div>
          ))}
        </dl>
      </FadeIn>

      <FadeIn delay={300}>
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
