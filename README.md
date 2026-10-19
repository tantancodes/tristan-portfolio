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
public/
  avatar.svg             ← placeholder; replace with your photo
  resume.pdf             ← add this yourself
```

## Common edits

- **Add a project:** copy an object in the `projects` array in `content/projects.ts`
  and give it a new `slug`. Its page at `/work/<slug>` is generated automatically.
  The order of the array is the order of the Work list.
- **Change the cover:** set `cover` to `"coffin" | "mesh" | "retrieval" | "houses" | "waveform"`,
  or add a new motif function in `components/Cover.tsx`.
- **Change colors:** edit the variables at the top of `app/globals.css`
  (`--accent`, `--bg`, and so on). Dark mode is defined twice, once for the OS
  setting and once for the manual toggle, so update both blocks.
- **Change fonts:** swap `Fraunces` / `Inter` in `app/layout.tsx` for any Google font.

## Deploy

Push to GitHub, then on vercel.com use **Add New → Project** and import the repo.
No settings are needed. Every push to `main` redeploys.
