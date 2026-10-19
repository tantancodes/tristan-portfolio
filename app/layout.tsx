import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/content/projects";
import "./globals.css";

// next/font downloads these at build time and self-hosts them (no request to Google at runtime).
// Each exposes a CSS variable that globals.css uses.
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", axes: ["opsz", "SOFT"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
};

// Runs before React hydrates: applies a saved theme choice (so there's no light→dark flash)
// and marks that JS is available (so fade-in animations only hide content when they can reveal it).
const bootScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}document.documentElement.classList.add('js');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
