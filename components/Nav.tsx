import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/content/projects";

// Links are anchors into the home page sections, so they work from any page.
const links = [
  { href: "/#work", label: "Work" },
  { href: "/#play", label: "Play" },
  { href: "/#about", label: "About" },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-name">
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
