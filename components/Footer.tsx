import ThemeToggle from "./ThemeToggle";
import { site } from "@/content/projects";

export default function Footer() {
  const links = [
    { label: site.email, href: `mailto:${site.email}` },
    { label: "LinkedIn", href: site.linkedin },
    { label: "GitHub", href: site.github },
    { label: "Resume", href: site.resume },
  ];

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{site.name}</p>
          <p className="muted">{site.location}</p>
        </div>
        <ul className="footer-links">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </footer>
  );
}
