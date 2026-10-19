import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero container">
      <h1 className="hero-line">Nothing here.</h1>
      <p>
        <Link href="/">Back home →</Link>
      </p>
    </section>
  );
}
