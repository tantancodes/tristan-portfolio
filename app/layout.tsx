import type { Metadata } from "next";
import { Geist, Geist_Mono, Zen_Kurenaido } from "next/font/google";
import Footer from "@/components/Footer";
import { site } from "@/content/projects";
import "./globals.css";

// next/font downloads these at build time and self-hosts them (no request to Google at runtime).
// Each exposes a CSS variable that globals.css uses.
const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
// Splat Journal's pen font, for its scrapbook-style page (components/ScrapbookCase.tsx).
const hand = Zen_Kurenaido({ weight: "400", subsets: ["latin"], variable: "--font-hand" });

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
};

// Runs before React hydrates: applies a saved theme choice (so there's no light→dark flash)
// marks the name intro to play when the home page loads,
// and marks that JS is available (so fade-in animations only hide content when they can reveal it).
const bootScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;if(location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro');}catch(e){}document.documentElement.classList.add('js');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${hand.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
