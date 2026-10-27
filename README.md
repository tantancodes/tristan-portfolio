# tristan-portfolio

Personal site built with Next.js (App Router), TypeScript, and plain CSS.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
```

## Where things live

```
content/projects.ts      ← ALL text: bio, projects, play, links. Edit this.
app/
  layout.tsx             ← wraps every page: fonts, theme boot script, <Nav>, <Footer>
  page.tsx               ← home: hero, Work list, Play, About
  work/[slug]/page.tsx   ← one case-study template, rendered once per project
  not-found.tsx          ← 404
  globals.css            ← design tokens (colors, fonts) + all styles
  icon.svg               ← favicon
components/
  Nav.tsx, Footer.tsx    ← server components (no JS shipped)
  Cover.tsx              ← generated SVG cover art per project
  ThemeToggle.tsx        ← "use client": light/dark switch, saved in localStorage
  FadeIn.tsx             ← "use client": fade-up when scrolled into view
  VideoPreview.tsx       ← "use client": muted loop that plays only while on screen
public/
  avatar.svg             ← placeholder; replace with your photo
  resume.pdf             ← web copy of the resume (no phone number); rebuild from resume/resume.tex
  work/<slug>/           ← screenshots, preview.mp4 (card loop) and demo.mp4 (case study) per project
```

## Common edits

- **Add a project:** copy an object in the `projects` array in `content/projects.ts`
  and give it a new `slug`. Its page at `/work/<slug>` is generated automatically.
  The order of the array is the order of the Work list.
- **Change the cover:** set `cover` to `"coffin" | "mesh" | "retrieval" | "houses" | "waveform" | "candles"`,
  or add a new motif function in `components/Cover.tsx`.
- **Change colors:** edit the variables at the top of `app/globals.css`
  (`--accent`, `--bg`, and so on). Dark mode is defined twice, once for the OS
  setting and once for the manual toggle, so update both blocks.
- **Change fonts:** swap `Fraunces` / `Inter` in `app/layout.tsx` for any Google font.

- **Add a video to a project card:** record the product (about 10–20 s, no audio), export H.264 MP4 around
  960 px wide, put it at `public/work/<slug>/preview.mp4` with a still `preview-poster.jpg`, and set
  `preview` on the card in `content/projects.ts`. A longer `demo.mp4` with `demo` on the project shows,
  with controls, at the top of its case study.
- **Rebuild the resume PDF:** `cd resume && pdflatex resume.tex && cp resume.pdf ../public/resume.pdf`.

## Deploy

Push to GitHub, then on vercel.com use **Add New → Project** and import the repo.
No settings are needed. Every push to `main` redeploys.
