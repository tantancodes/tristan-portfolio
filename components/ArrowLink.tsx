import Link from "next/link";

/**
 * Text link with an arrow and a two-line underline, rebuilt in CSS from Framer's "Text Arrow CTA"
 * (that one is compiled from Framer's visual editor and can't run outside Framer).
 * On hover: a new arrow slides in from the left as the old one slides out right,
 * and the underline is redrawn left-to-right while the old one retracts. Styles: .arrow-link in globals.css.
 */
export default function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="arrow-link">
      <span className="arrow-link-arrows" aria-hidden="true">
        <Arrow className="arrow-in" />
        <span className="arrow-link-label">{children}</span>
        <Arrow className="arrow-out" />
      </span>
      <span className="arrow-link-line line-old" aria-hidden="true" />
      <span className="arrow-link-line line-new" aria-hidden="true" />
      <span className="sr-only">{children}</span>
    </Link>
  );
}

function Arrow({ className }: { className: string }) {
  return (
    <svg className={`arrow-link-icon ${className}`} viewBox="0 0 20 15" fill="none">
      <path d="M0 7.5h18.5M12 1l6.5 6.5L12 14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
