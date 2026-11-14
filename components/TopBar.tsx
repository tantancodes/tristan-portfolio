import Link from "next/link";
import { site } from "@/content/projects";

// One quiet line at the top: name home-link on the left, the three places
// a visitor actually goes on the right. Not sticky; it scrolls away.
export default function TopBar() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="topbar-name">
          {site.name.toLowerCase()}
        </Link>
        <nav className="topbar-nav" aria-label="Site">
          <Link href="/#projects">work</Link>
          <Link href="/experience">experience</Link>
          <a href={site.resume}>resume</a>
        </nav>
      </div>
    </header>
  );
}
