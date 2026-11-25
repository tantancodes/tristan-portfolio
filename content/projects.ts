/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit this file to change anything you read on the site.
 *  Components never hard-code text; they only read from here.
 *
 *  Search for "TODO" to find details I guessed or left blank.
 * ─────────────────────────────────────────────────────────────
 */

/* ---------- Types (describe the shape of the content) ---------- */

/** Which generated SVG illustration a project's cover uses. See components/Cover.tsx. */
export type CoverMotif = "coffin" | "mesh" | "retrieval" | "houses" | "waveform" | "gap";

export type Highlight = {
  title: string;
  body: string;
  /** Optional big number shown beside the highlight, e.g. "97.1%". */
  stat?: string;
  statLabel?: string;
};

/** A demo video: a 16:10 screen recording, with a poster frame for before it loads. */
export type Video = {
  mp4: string;
  webm?: string;
  poster: string;
  width: number;
  height: number;
  /** Describes what the video shows, for screen readers (it has no audio). */
  label: string;
};

export type Screenshot = {
  src: string; // the image, or the still frame shown before a video plays
  width: number;
  height: number;
  alt: string;
  caption?: string;
  video?: string; // mp4: plays muted on loop in place of the image
  href?: string; // optional: clicking the image opens this (e.g. a full-size PDF) in a new tab
};

export type Project = {
  /** URL segment: /work/<slug>. Lowercase, dashes, no spaces. */
  slug: string;

  // Shown in the Work list (and reused on the case-study page)
  headline: string; // "verb + problem"
  year: string;
  org: string;
  role: string;

  // Case-study page
  label: string; // small eyebrow above the headline
  timeline: string;
  team: string;
  myRole: string;
  skills: string[];
  cover: CoverMotif;
  goal: string;
  highlights?: Highlight[]; // aim for 2–3
  lookingForward?: string;
  links?: { label: string; href: string }[];
  /** A diagram shown under "How it works". See components/RetrievalDiagram.tsx. */
  diagram?: "retrieval";
  /** One short line naming the people I built this with, shown near the end of the page. */
  credits?: string;
  /** Screenshots of the real product. The first replaces the generated cover; the rest form a gallery. */
  images?: { src: string; alt: string; caption?: string; phone?: boolean }[];

  // Optional extras (used by the home value estimator page):
  video?: Video; // shown instead of the generated cover (takes priority over images)
  writeup?: {
    heading: string;
    body: string[];
    list?: string[];
    ordered?: boolean; // number the list 01, 02, … (for steps)
    stats?: { value: string; label: string }[];
    figure?: Screenshot; // one chart or map under the section text
    figures?: Screenshot[]; // several, stacked in order (after `figure`, if both are set)
    /** A demo video with controls. The whole section is hidden until the mp4 exists in public/. */
    video?: Video;
    /** Show the visual full width under the text instead of beside it (for wide, headline charts). */
    wide?: boolean;
  }[]; // shown instead of goal / highlights / looking forward
  note?: string; // one short line next to the links
  screenshots?: Screenshot[];
  screenshotsLabel?: string; // heading over the screenshots, "Screenshots" by default
  /** "scrapbook": a short, plain page in the project's own sketchbook style (components/ScrapbookCase.tsx). */
  theme?: "scrapbook" | "research";
  /** The content of a research page (theme "research"). */
  research?: Research;
  /** The live app; the scrapbook page's "try me" bubble links here. */
  liveUrl?: string;
};

/* ---------- Research page (project.theme = "research", components/ResearchCase.tsx) ---------- */
export type ResearchFigure = { src: string; width: number; height: number; alt: string; caption: string };
export type ResearchSection = {
  heading: string;
  /** Marks which kind of data a section is about, e.g. "Synthetic data" or "Real reconstructions". */
  tag?: string;
  body?: string[];
  list?: string[];
  figures?: ResearchFigure[];
  pair?: boolean; // two figures side by side on wide screens
  table?: { caption: string; head: string[]; rows: string[][]; highlight?: string[] };
  after?: string[]; // paragraphs after the figures/table
};
export type Research = {
  title: string;
  authors: string;
  affiliation: string;
  links: { label: string; href: string }[];
  teaser: ResearchFigure;
  abstract: string;
  findings?: { mark: "yes" | "no" | "mixed"; text: string; evidence?: string }[];
  sections: ResearchSection[];
  contribution: { heading: string; body: string[] };
  meta: string;
};

/** One role on the Experience timeline (LinkedIn + resume). */
export type Role = {
  title: string;
  dates: string;
  points?: string[];
};
export type Job = {
  org: string;
  place?: string;
  roles: Role[]; // usually one; more when you held several roles at the same place
  caseStudy?: string; // slug of a case study at /work/<slug>
  tags?: string[];
};

/** A project card. Case studies link to /work/<slug>; others can link out or not at all. */
export type ProjectCard = {
  /** Shown bold at the top of the card: where (left) and my role (right). */
  org: string;
  role: string;
  title: string;
  /** Small label above the title: what kind of work it is and when, e.g. "Research · 2026". */
  status: string;
  stack: string[];
  summary: string;
  stat?: string; // one headline number, shown under the summary
  video?: Video; // small auto-playing preview at the top of the card
  art?: "retrieval"; // drawn card art when there's no video (components/RetrievalCardArt.tsx)
  cover?: CoverMotif; // generated cover art at the top of the card when there's no video (components/Cover.tsx)
  featured?: boolean; // spans the full width of the Selected work grid on desktop (use on one card)
  /** Small heading shown above the first card of a group, e.g. "Ten Strands". Cards in a group sit together. */
  group?: string;
  caseStudy?: string;
  href?: string;
};

export type PlayItem = {
  title: string;
  blurb: string;
};

/* ---------- You ---------- */

export const site = {
  name: "Tristan Tan",
  firstName: "Tristan",
  // Your photo (background removed), shown inline in the hero: "I'm [photo] Tristan."
  // Made from _originals/ (git-ignored, never published): trimmed, resized, metadata stripped.
  avatar: "/avatar.webp",
  location: "Berkeley, CA",
  email: "tristantan@berkeley.edu",
  github: "https://github.com/tantancodes",
  linkedin: "https://www.linkedin.com/in/tristan-yuhin-tan/", // TODO: your LinkedIn URL
  resume: "/resume.pdf", // TODO: drop your resume at public/resume.pdf
  // Your phone number from the resume is deliberately left off the site (it attracts spam).
  description:
    "Tristan Tan: Data Science & Economics at UC Berkeley. Research in 3D digital humanities and photogrammetry, NLP retrieval, and machine learning.",
};

/** The opening screen (components/Hero.tsx). */
export const hero = {
  eyebrow: "Data Science & Economics · UC Berkeley",
  ctas: [
    { label: "View projects", href: "#projects" },
    { label: "View experience", href: "/experience" },
  ],
};

/* ---------- Experience (LinkedIn + resume) ----------
 * Where LinkedIn, the resume, and older notes disagree, the RESUME wins. */

export const experience: Job[] = [
  {
    org: "Archaeological Research Facility, UC Berkeley",
    place: "Berkeley, CA",
    caseStudy: "egyptology-3d",
    roles: [
      {
        title: "Undergraduate Research Assistant",
        dates: "Sep 2026 – Present", // joined as a URAP apprentice in Jan 2026 (LinkedIn: "Jan 2026 – Present")
        points: [
          "Built the BD3D research viewer (Next.js, TypeScript, React Three Fiber), linking 314 scholarly annotations to 607 surface regions across 6 photogrammetric Egyptian coffin models, with two-way selection, raking-light inspection, and collection-wide search.",
          "Designed a compressed 3D asset pipeline (meshopt glTF, tiered textures, checksummed provenance) that cut exhibit downloads by 74% (82 MB to 21 MB across six coffins) and geometry parsing from 82–132 ms to 2–3 ms.",
          "Built a structured annotation data pipeline with schema validation, replacing manual XML lookup; 127 automated tests run in CI.",
          "Lead the incoming URAP students and the design team.",
        ],
      },
    ],
  },
  {
    org: "Ten Strands",
    place: "Berkeley, CA",
    caseStudy: "rural-urban-gap",
    roles: [
      {
        title: "Data Research Intern",
        dates: "Sep 2026 – Present",
        points: [
          "Analyzed climate preparedness in 937 California school districts across 200+ demographic and policy indicators (Python, pandas, statsmodels, GeoPandas).",
          "Found political lean was the most consistent predictor of documented community climate action: within the same county, +10 points of Democratic vote went with 21% more documented activities (p < 0.001), and Democratic-leaning districts documented 22 of 23 common practices more often.",
          "Showed the urban–rural gap in documented climate protections disappeared after controlling for district size, and that lower-income communities documented about 5% fewer activities per +10 points of low-income students.",
          "Identified 199 high-wildfire-risk and 176 high-pollution districts with no matching documented protections, and mapped geographic clusters with spatial autocorrelation (Moran's I).",
          "Co-authored the team's research poster on environmental and climate action across California school districts, mentored by Judy He and Sarah Whiting.",
        ],
      },
    ],
  },
  {
    org: "IDX Exchange",
    place: "Remote",
    caseStudy: "idx-home-prices",
    roles: [
      {
        title: "Data Science Intern",
        dates: "May 2026 – Aug 2026",
        points: [
          "Built a model that estimates California single-family sale prices from 309K cleaned CRMLS sales (Jan 2024 – Apr 2026), adding location, property-age, and school-district features via a spatial join across 680 districts.",
          "Evaluated chronologically with leakage rules: the final XGBoost model reached 7.7% median error on 11,890 held-out April 2026 sales, versus 16.5% for a linear baseline.",
        ],
      },
    ],
  },
  {
    org: "Lucarelli Photogrammetry Lab, UC Berkeley",
    place: "Berkeley, CA",
    caseStudy: "bd3d",
    roles: [
      {
        title: "Undergraduate Researcher",
        dates: "Aug 2025 – present",
        points: [
          "Built a Metashape experiment pipeline (photo manifests, memory watchdog) and a camera-initialized evaluator that scores each build against a full capture; found 7 of 16 broken labels, fixed them, and retracted 3 earlier results.",
          "Built PyTorch PointNet, self-attention and geometry-aware attention set models over camera poses: on synthetic coverage gaps, attention cut error from 27.7° (Ridge) to 14.0°; on 28 real builds, no model separated, and Ridge ranked builds within an unseen object best.",
          "Shipped a desktop capture app that flags missing camera coverage right after alignment, and a 3D viewer showing each build's mesh, cameras and missing surface.",
        ],
      },
    ],
  },
  {
    org: "Berkeley ANova",
    caseStudy: "anova-marketing",
    roles: [
      {
        title: "Marketing Officer",
        dates: "Aug 2025 – May 2026",
        points: [
          "Taught weekly Python lessons and programming labs to 100+ students across 7 Bay Area schools.",
          "Led digital marketing and outreach campaigns that generated 100,000+ impressions and increased recruitment engagement by 137%.",
        ],
      },
    ],
  },
  {
    org: "IxD @ ArtCenter College of Design",
    place: "Pasadena, CA",
    roles: [
      {
        title: "Lead Product Designer",
        dates: "May 2025 – Jul 2025",
        points: [
          "Led end-to-end UX/UI design of Pasadena High School's App Academy website with ArtCenter designers: high-fidelity Figma prototypes, visual branding, and responsive interfaces.",
          "Ran user research and usability testing (card sorting, focus groups, A/B walkthroughs) and turned stakeholder feedback into a launched site built with HTML, CSS, JavaScript, and Vue.js.",
        ],
      },
    ],
  },
];

/** One short line under the timeline for smaller roles. */
export const experienceAlso =
  "Also: Goldman Sachs Possibilities Summit (2025) and business consulting at Rose Water Capital (2024–25).";

/* ---------- Projects (the "View projects" section) ---------- */

export const projectCards: ProjectCard[] = [
  {
    org: "Archaeological Research Facility",
    role: "Research Assistant",
    title: "BD3D Coffin Viewer",
    status: "Research · 2026",
    stack: ["Next.js", "React Three Fiber", "TypeScript"],
    summary: "Six ancient coffins in 3D, every inscription linked to its translation.",
    stat: "607 surface regions linked · 74% smaller downloads",
    caseStudy: "egyptology-3d",
    featured: true,
    // 1280px because the featured card is ~1000px wide on desktop. No WebM: at this size VP9
    // blurred the carved signs more than this H.264 does, so it only made the card worse.
    video: {
      mp4: "/work/egyptology-3d/preview-1280.mp4",
      poster: "/work/egyptology-3d/preview-poster-1280.webp",
      width: 1280,
      height: 738,
      label: "The BD3D viewer: the landing page, the six-coffin collection, then hovering inscribed regions on the Psamtik coffin",
    },
  },
  {
    org: "Lucarelli Photogrammetry Lab",
    role: "Undergraduate Researcher",
    title: "Reconstruction Quality",
    status: "Research · 2025–26",
    cover: "mesh",
    stack: ["PyTorch", "Geometric deep learning", "Metashape"],
    summary: "Tests whether the camera layout alone can predict 3D reconstruction quality, before the slow dense step.",
    stat: "Flags missing coverage before a 57-minute reconstruction",
    video: {
      mp4: "/work/bd3d/viewer-card.mp4",
      poster: "/work/bd3d/viewer-card.webp",
      width: 720,
      height: 450,
      label: "The reconstruction viewer: a scanned museum coffin with its cameras, the missing surface in red growing as the build switches from 60 photos to 30.",
    },
    caseStudy: "bd3d",
  },
  {
    org: "IDX Exchange",
    role: "Data Science Intern",
    title: "Home Value Estimator",
    status: "Internship · 2026",
    stack: ["Python", "XGBoost", "Streamlit"],
    summary: "Estimates what a California home will sell for, and shows what moved the estimate.",
    stat: "7.7% median error on 11,890 held-out sales",
    caseStudy: "idx-home-prices",
    video: {
      mp4: "/projects/home-value-estimator/demo-720.mp4",
      webm: "/projects/home-value-estimator/demo-720.webm",
      poster: "/projects/home-value-estimator/poster-720.webp",
      width: 720,
      height: 450,
      label:
        "Screen recording of the California Home Value Estimator: entering a home's ZIP code, size and age, and getting an estimated sale price with an error range and a breakdown of what moved the estimate.",
    },
  },
  {
    org: "Ten Strands",
    role: "Data Research Intern",
    title: "K–12 Evidence Search",
    status: "Project · 2026",
    stack: ["Python", "BM25", "Sentence Transformers"],
    art: "retrieval",
    summary: "Search district policies and get answers that quote and cite their sources.",
    stat: "97.1% Recall@5 (keyword search alone: 88.2%)",
    caseStudy: "k12-retrieval",
    // No WebM: VP9 came out larger than this H.264 for a mostly-static UI recording.
    video: {
      mp4: "/projects/k12-retrieval/demo-720.mp4",
      poster: "/projects/k12-retrieval/poster-720.webp",
      width: 720,
      height: 452,
      label:
        "Screen recording of the K–12 sustainability evidence search: a short intro where a magnifying glass sweeps through bushes that part to reveal the app, then searching \"fire protection\", the saved evidence list, and opening a source document.",
    },
  },
  {
    org: "Ten Strands",
    role: "Data Research Intern",
    title: "Climate Action in Schools",
    status: "Research · 2026",
    video: {
      mp4: "/work/rural-urban-gap/demo-720.mp4",
      poster: "/work/rural-urban-gap/poster-720.webp",
      width: 720,
      height: 450,
      label:
        "Animated chart of 865 California school districts, enrollment against documented climate protections: rural districts average 1.2 protections and urban 2.2, then a single size trend line (+0.55 protections per 10× enrollment) shows rural districts sitting at the small end of it.",
    },
    stack: ["Python", "pandas", "statsmodels"],
    summary: "Modeled which of 937 California school districts publicly document climate action, and what predicts it.",
    stat: "+10 points Democratic vote: 21% more documented activities",
    caseStudy: "rural-urban-gap",
  },
  {
    org: "Berkeley ANova",
    role: "Marketing Officer",
    title: "ANova Recruitment",
    status: "Marketing · 2026",
    stack: ["Motion design", "Illustration", "Social"],
    summary: "Animated recruitment posts for a club teaching CS to under-resourced students.",
    stat: "100,000+ impressions · +137% recruitment engagement",
    caseStudy: "anova-marketing",
    video: {
      mp4: "/work/anova-marketing/computer-card.mp4",
      poster: "/work/anova-marketing/computer-card.webp",
      width: 722,
      height: 406,
      label: "Animated ANova Spring 2026 poster: a retro computer whose screen flickers on to show the ANova logo.",
    },
  },
  {
    org: "Personal Project",
    role: "Designer & Developer",
    title: "Splat Journal",
    status: "Personal project · 2026",
    stack: ["React", "three.js", "Gaussian splats"],
    summary: "Scan a place, and it becomes a sketchbook page you can write in, in 3D.",
    stat: "Live: try it at splat-journal.vercel.app",
    caseStudy: "splat-journal",
    video: {
      mp4: "/work/splat-journal/card.mp4",
      poster: "/work/splat-journal/card-poster.webp",
      width: 722,
      height: 406,
      label: "Floating around a scanned library table with a hand-drawn note bubble reading 'studying hard!' pinned above a laptop.",
    },
  },
];

/* ---------- Education & skills (resume) ---------- */

export const education = {
  school: "University of California, Berkeley",
  degree: "B.A. Data Science & Economics",
  dates: "Expected May 2029",
  gpa: "3.88",
  // Same as the resume.
  coursework: ["Data Science (Foundations, Computational Structures)", "Probability & Statistics", "Linear Algebra"],
};

// Copied from the resume (public/resume.pdf), same groups and order. Update both together.
export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "SQL", "TypeScript", "JavaScript", "R", "HTML/CSS"] },
  {
    group: "Machine Learning & Data",
    items: ["pandas", "scikit-learn", "XGBoost", "LightGBM", "PyTorch", "Sentence Transformers", "GeoPandas"],
  },
  { group: "Visualization & Apps", items: ["Streamlit", "Tableau", "Matplotlib", "Plotly", "Altair"] },
  {
    group: "Web & Infrastructure",
    items: ["React", "Next.js", "React Three Fiber", "FastAPI", "PostgreSQL", "Supabase", "OAuth 2.0", "Git", "Vercel"],
  },
];

export const about = {
  paragraphs: [
    "I study Data Science and Economics at UC Berkeley (class of 2029). I like problems where a model or a tool is only half the job and the other half is making it useful to the people who rely on it: researchers, teachers, students.",
    "Every week I teach Python to 100+ high schoolers as a Computer Science Mentor at Berkeley ANova. Explaining an idea to a room of fifteen-year-olds is the fastest way I know to find out whether I really understand it.",
    "Outside of school I train kung fu. Before Berkeley, I coached martial arts at the Shaolin Temple Cultural Center from 2023 to 2024.",
  ],
};

/* ---------- Work ---------- */

export const projects: Project[] = [
  {
    slug: "splat-journal",
    theme: "scrapbook",
    liveUrl: "https://splat-journal.vercel.app/",
    headline: "splat journal",
    year: "2026–now",
    org: "Personal project",
    role: "Designer and developer",

    label: "a 3D scrapbook",
    timeline: "Nov 2026 – present",
    team: "Solo",
    myRole: "Design and development",
    skills: ["React", "TypeScript", "three.js", "Spark"],
    cover: "mesh",
    video: {
      mp4: "/work/splat-journal/demo.mp4",
      poster: "/work/splat-journal/demo-poster.webp",
      width: 1280,
      height: 698,
      label: "Splat Journal demo: in a scan of a library table, leaving a typed note, 'studying hard!', and a handwritten one, 'yum!', then floating around as the notes stay pinned in 3D.",
    },
    goal: "A 3D scrapbook. Scan a place on your phone, open it here, and write in it.",
    writeup: [
      {
        heading: "how",
        body: [
          "Scan a place with Scaniverse or Polycam and export it as .spz or .ply. Tap open, and the scan becomes a page. Tap anywhere in it to leave a note.",
        ],
        video: {
          mp4: "/work/splat-journal/demo-2.mp4",
          poster: "/work/splat-journal/demo-2-poster.webp",
          width: 1280,
          height: 698,
          label: "A second page: a scan of a bathroom counter and mirror with two handwritten note bubbles pinned in it.",
        },
      },
    ],
    links: [{ label: "code", href: "https://github.com/tantancodes/splat-journal" }],
  },

  {
    slug: "egyptology-3d",
    headline: "Reading ancient coffins where the words were written",
    year: "2026–now",
    org: "Archaeological Research Facility, UC Berkeley",
    role: "Undergraduate Research Assistant",

    label: "Research platform · Egyptology · 3D",
    timeline: "Jan 2026 – present\nURAP apprentice (Jan–Aug), Research Assistant (Sep–)",
    team: "URAP students and a design team, both of which I now lead",
    myRole: "3D engineering, asset pipeline, product design, team lead",
    skills: [
      "Next.js",
      "TypeScript",
      "React Three Fiber",
      "three.js",
      "glTF + meshopt",
      "zod",
      "Vitest",
      "Playwright",
      "GitHub Actions",
    ],
    cover: "coffin",
    goal:
      "Egyptian coffins were written to be read in place. I built the viewer that links six scanned coffins to their scholarly editions: click any inscription to read its hieroglyphs and translation, or start from the text and fly to where it's written.",
    highlights: [
      {
        title: "Object and text, linked both ways",
        body: "Hover a region and its entry lights up, and the reverse. Words link to the dictionary and to every place they occur, and every view is a shareable link.",
        stat: "607",
        statLabel: "regions linked to 314 entries",
      },
      {
        title: "A 3D asset pipeline with provenance",
        body: "Source OBJ models and 4096 px photos become compressed glTF and tiered textures, checksummed and tested against the originals. Phones load small files first.",
        stat: "−74%",
        statLabel: "total download, all six coffins (standard quality)",
      },
      {
        title: "Raking light",
        body: "A real directional light sweeps the scanned relief. Where the mesh is too coarse to hold carved signs, the interface says so instead of faking it.",
      },
      {
        title: "Tested on every push",
        body: "Research data is schema-checked at build time; 82 unit tests and 45 browser tests, including accessibility, run on every push.",
        stat: "127",
        statLabel: "automated tests in CI",
      },
      {
        title: "Leading the team",
        body: "Joined through URAP as an apprentice; now a Research Assistant leading the URAP students and the design team.",
      },
    ],
    lookingForward:
      "Next: normal maps from the lab's high-res scans so raking light shows carved signs, testing on real phones, and side-by-side spell comparison.",
    links: [
      { label: "View the code", href: "https://github.com/tantancodes/bd3d-website/tree/redesign/foundation" },
      { label: "Engineering write-up", href: "https://github.com/tantancodes/bd3d-website/blob/redesign/foundation/docs/CASE-STUDY.md" },
    ],
    video: {
      mp4: "/work/egyptology-3d/demo.mp4",
      poster: "/work/egyptology-3d/demo-poster.webp",
      width: 1920,
      height: 1106,
      label:
        "A walkthrough of the BD3D viewer: the landing page, the six-coffin collection, and inscribed regions on the Psamtik coffin linked to their translations",
    },
    images: [
      {
        src: "/work/egyptology-3d/exhibit-selected.jpg",
        alt: "The coffin of Psamtik-Seneb in the 3D viewer with its central inscription selected and the translation open beside it",
      },
      {
        src: "/work/egyptology-3d/vocabulary.jpg",
        alt: "A transliterated word opened in the reading panel, with its location highlighted on the coffin",
        caption: "A word in the transliteration, its dictionary entry, and where it appears on the object.",
      },
      {
        src: "/work/egyptology-3d/raking-light.jpg",
        alt: "The coffin lit by a low raking light from the left, with the lighting panel open",
        caption: "Raking light from the left across the scanned surface.",
      },
      {
        src: "/work/egyptology-3d/search.jpg",
        alt: "Search results for Osiris across all six coffins",
        caption: "One search across all 314 entries; each result opens the coffin at that spot.",
      },
      {
        src: "/work/egyptology-3d/mobile-exhibit.jpg",
        alt: "The Irethoriru coffin in the viewer on a phone",
        caption: "The same viewer on a phone.",
        phone: true,
      },
    ],
  },

  {
    slug: "bd3d",
    headline: "Predicting 3D reconstruction quality from camera geometry",
    year: "2025–26",
    org: "Lucarelli Photogrammetry Lab, UC Berkeley",
    role: "Undergraduate Researcher",

    label: "Research · 3D computer vision · Ongoing",
    timeline: "Aug 2025 – present",
    team: "Lucarelli Photogrammetry Lab (BD3D)",
    myRole: "Research question, experiments, evaluation, models",
    skills: ["PyTorch", "Geometric deep learning", "Photogrammetry (Metashape)", "ICP registration", "three.js"],
    cover: "mesh",
    goal:
      "Can the aligned camera layout, available minutes into a capture, predict how good the final 3D reconstruction will be?",
    theme: "research",
    research: {
      title: "Predicting photogrammetric reconstruction quality from camera geometry",
      authors: "Tristan Tan",
      affiliation: "Lucarelli Photogrammetry Lab, UC Berkeley · ongoing undergraduate research, Aug 2025 – present",
      links: [
        { label: "Code", href: "https://github.com/tantancodes/reconstruction-quality" },
        { label: "Interactive viewer", href: "/reconstruction-viewer/index.html" },
        { label: "Full write-up", href: "https://github.com/tantancodes/reconstruction-quality#readme" },
        { label: "Attention study", href: "https://github.com/tantancodes/reconstruction-quality/blob/main/experiments/geometry-aware/REPORT.md" },
      ],
      teaser: {
        src: "/work/bd3d/research/teaser.webp",
        width: 1550,
        height: 600,
        alt: "Three panels. (a) 145 camera frustums around a museum coffin, 23 low wall-level cameras in red. (b) Cameras plotted as azimuth against elevation over a 12 by 3 grid of cells, with four low cells outlined red where the build has fewer than two cameras. (c) Reprojection error against surface error for dog and coffin builds: within each object, lower reprojection error goes with higher surface error.",
        caption:
          "(a) The 145 aligned cameras of a museum coffin capture; one build drops 23 wall-level photos (red). (b) The same cameras in azimuth and elevation about the camera ring: red cells have fewer than 2 cameras where the full capture has 2 or more. (c) Reprojection RMSE, the usual check after alignment, runs opposite to measured surface error within each object (Spearman ρ −0.68 on 7 dog builds, −0.90 on 5 coffin builds).",
      },
      abstract:
        "Dense multi-view reconstruction is the slow stage of photogrammetry: 57 minutes for a 145-photo museum coffin on a laptop. I study whether the aligned camera poses, known minutes into a capture, predict the geometric quality of the final mesh. I built a reproducible Metashape pipeline and a camera-initialised ICP evaluator that scores each build against a full capture, and compared tabular baselines with permutation-invariant set models over cameras: PointNet, self-attention, and self-attention with a learned bias from pairwise camera geometry. On synthetic camera sets, models that compare cameras before pooling find a localized coverage gap that PointNet and summary statistics miss, and the geometric bias makes attention learn faster, more stably, and transfer best to larger sets. On 28 real reconstructions of two objects, no set model separates from another, and a simple Ridge model ranks builds within an unseen object better than any network. The limiting factor is labelled real data, not the architecture.",
      findings: [
        { mark: "yes", text: "Reprojection error does not indicate geometric quality; within each object it is inversely ranked.", evidence: "(28 real builds)" },
        { mark: "yes", text: "On synthetic sets, models that compare cameras find a gap hidden in one ring; PointNet and summary statistics do not.", evidence: "(attention 14.0° vs. Ridge 27.7°, PointNet 28.8°; 5 seeds)" },
        { mark: "yes", text: "A pairwise-geometry bias makes attention learn faster and more stably, and transfer best to larger camera sets; a shuffled-geometry control does not reproduce this.", evidence: "(synthetic; 3 seeds)" },
        { mark: "no", text: "The bias is not shown to be more accurate at convergence: a differently initialised standard attention ends lower.", evidence: "(1 seed, initialisation confound)" },
        { mark: "no", text: "On real builds, no set model is distinguishable from another, and the geometry-aware model is no better than its shuffled control.", evidence: "(28 builds, 2 objects)" },
        { mark: "mixed", text: "The networks' lower cross-object error comes from predicting the right error level; Ridge ranks builds within an unseen object better.", evidence: "(2-fold, ρ +0.59 vs. ≤ +0.46)" },
      ],
      sections: [
        {
          heading: "Problem",
          body: [
            "Structure-from-motion gives camera poses in minutes; multi-view stereo then spends most of the compute building the dense surface. If a side of the object was never photographed, the surface there will be missing, but the standard alignment diagnostic does not see it: reprojection RMSE measures how consistent the kept observations are, not whether the object was seen from every side. In the coffin builds, the worst mesh had the lowest reprojection RMSE (0.67 px) and the best mesh had the highest (1.16 px).",
            "The question is therefore a set-regression problem on camera poses: the order of cameras is meaningless, the global frame is arbitrary (no markers), and the quantity that matters is relational: a coverage gap is a large angle between neighbouring cameras.",
          ],
        },
        {
          heading: "Data and labels",
          tag: "Real reconstructions",
          body: [
            "28 labelled Metashape builds of two objects, each a controlled subset of a full capture: 23 of a dog sculpture (16 from an older CPU pipeline, 7 GPU) and 5 of a museum coffin, plus one coffin build that failed to align. Every build is defined by a manifest of photo hashes and settings and runs under a memory watchdog. The label is the symmetric surface RMSE between the build's mesh and the full-capture mesh, as a fraction of the bounding-box diagonal.",
            "Builds without markers come out in arbitrary frames. My first evaluator started ICP with no rotation, and 7 of 16 dog builds, rotated 136–167° from the reference, received labels set by misregistration. The fix registers by fitting each build's cameras to the reference cameras first, then ICP. I retracted three earlier results that had used the broken labels.",
          ],
          figures: [
            {
              src: "/work/bd3d/research/evaluation_audit.webp",
              width: 1560,
              height: 570,
              alt: "Left: old labels against frame rotation for 16 builds; builds rotated 135–167 degrees sit on a high plateau near 0.043, new labels for the same builds are low. Right: old against new labels, with the seven failed builds far from the equality line.",
              caption:
                "Evaluation audit. The old label tracked how far each build's frame was rotated, not its geometry (left); camera-initialised registration fixes all 16 (right).",
            },
          ],
        },
        {
          heading: "Method",
          body: [
            "Each aligned camera is a token of 6 numbers: its centre and optical axis, centred and scale-normalised per build. Rotation is left in, since there is no canonical frame without a reference; the networks see a fresh random SO(3) rotation of each set at every training step. All three models share a per-camera MLP, a max-pool over cameras (so the order of cameras cannot matter) and an output MLP. They differ in whether cameras see each other before pooling.",
          ],
          list: [
            "PointNet encodes each camera on its own: the pooled vector can say “some camera is high”, but not “there is a gap between neighbours”.",
            "Self-attention adds one 4-head attention block, so each camera is updated from the others before pooling.",
            "Geometry-aware attention adds a learned bias g(rᵢⱼ) to the attention logits, from the distance, angular separation and view agreement of each camera pair. The relations are rotation-invariant, and g adds about 100 parameters, so it is not a capacity increase: the same idea as relative position bias in Swin or spatial encoding in Graphormer.",
            "Controls: the same model with relations shuffled within each set (same parameters and compute, geometry destroyed), a fully rotation-invariant variant, and XGBoost given the same pairwise angles. Baselines: training mean, a fit on reprojection RMSE, Ridge, MLP and XGBoost on summary statistics.",
          ],
          figures: [
            {
              src: "/work/bd3d/research/architecture.webp",
              width: 1313,
              height: 542,
              alt: "Three model diagrams. PointNet: camera set to per-camera MLP to max-pool to output MLP. Self-attention: adds multi-head self-attention with residual and feed-forward before the pool. Geometry-aware attention: the same, with a learned bias g of pairwise relations added inside the softmax.",
              caption: "The three set models. Only the attention logits differ between self-attention and geometry-aware attention.",
            },
            {
              src: "/work/bd3d/research/pairwise_relations.webp",
              width: 1312,
              height: 381,
              alt: "Three 122 by 122 matrices for a real coffin build, cameras ordered by azimuth: pairwise distance, angular cosine and view agreement, each with a bright diagonal band.",
              caption: "The pairwise relations of one real coffin build (122 cameras, ordered by azimuth): distance, angular cosine and view agreement.",
            },
          ],
        },
        {
          heading: "Synthetic experiments",
          tag: "Synthetic data",
          body: [
            "To test the architectures where the answer is known, I generate camera sets in rings and predict their largest azimuthal coverage gap in degrees. This target is a geometric proxy for coverage, not reconstruction error. In the localized condition one ring is complete and the gap is in another, so a model has to work out which cameras are missing. In the count-shift condition, models train on 20–35 cameras and are tested on 45–60.",
          ],
          figures: [
            {
              src: "/work/bd3d/research/results_synthetic.webp",
              width: 1598,
              height: 564,
              alt: "Three dot plots of test MAE in degrees by model. (a) Original benchmark: attention lowest on both global and localized gaps. (b) Localized gap: geo and geo_inv lowest at about 17 degrees, attention 21.7 with a wide spread. (c) Count shift: geo lowest at 8.5.",
              caption:
                "Test MAE (mean ± s.d.). (a) The original benchmark, 400 epochs, 5 seeds; open markers: gap in one band, filled: localized gap. (b, c) The geometry-aware study, 150 epochs, 3 seeds.",
            },
            {
              src: "/work/bd3d/research/curves.webp",
              width: 1446,
              height: 529,
              alt: "Validation curves. (a) On the localized task, geo and geo_inv drop to about 18 degrees by epoch 50, attention takes about 200 epochs. (b) On count shift, geo ends lowest. (c) Over 400 epochs, geo and attention end near 16 degrees, above a dashed line at 13.09 for the original attention model.",
              caption:
                "Validation MAE over training. The geometric bias learns much faster (a, b), but at 400 epochs (c, one seed) a standard attention with Xavier initialisation reaches 13.1° against geo's 15.8°.",
            },
          ],
          table: {
            caption: "Synthetic localized gap, 150 epochs, test MAE in degrees (mean ± s.d., 3 seeds).",
            head: ["model", "MAE (°)", "note"],
            rows: [
              ["Ridge on summaries", "27.7 ± 0.8", "tuned on validation"],
              ["XGBoost + pairwise angles", "21.9 ± 0.6", "same relations, no attention"],
              ["PointNet", "30.5 ± 0.3", "no camera sees another"],
              ["Self-attention", "21.7 ± 3.4", ""],
              ["Geometry shuffled (control)", "23.1 ± 2.3", "same parameters as geo"],
              ["Geometry-aware attention", "17.5 ± 0.5", ""],
            ],
            highlight: ["Geometry-aware attention"],
          },
          after: [
            "The shuffled control has the same parameters and compute as the geometry-aware model but is no better than plain attention, so the gain comes from the geometry. The honest claim is sample efficiency and stability (± 0.5° vs. ± 3.4° across seeds), not final accuracy: the convergence comparison is confounded by initialisation, and the clean rerun has not been done. Under the camera-count shift, the geometry-aware model generalises best (8.5° vs. 10.6° for attention).",
          ],
        },
        {
          heading: "What the attention learns",
          tag: "Synthetic data",
          body: [
            "With the bias, attention concentrates on cameras within about 50° of the query and almost ignores the rest: a neighbourhood structure that standard attention has to learn from raw, randomly rotated coordinates.",
          ],
          figures: [
            {
              src: "/work/bd3d/research/attention_vs_angle.webp",
              width: 707,
              height: 284,
              alt: "Line plot of attention weight times N against angular separation between query and key. Geo stays near 3 up to 45 degrees then drops to near zero by 75; standard attention decays smoothly to about 0.5.",
              caption: "Mean attention weight (× N; 1 = uniform) against the angle between query and key camera, over 300 test sets.",
            },
            {
              src: "/work/bd3d/research/attention_maps.webp",
              width: 1717,
              height: 707,
              alt: "Two rows of five attention matrices for one test set: mean of heads and four heads, for standard attention (top) and geometry-aware attention (bottom). Geo's maps are sharper diagonal bands within each ring.",
              caption: "Attention matrices for one test set (rows: queries, columns: keys, ordered by ring then azimuth). Top: standard attention. Bottom: geometry-aware.",
            },
          ],
        },
        {
          heading: "Real reconstructions",
          tag: "Real reconstructions",
          body: [
            "Builds of one capture share photos, so leaving out a single build leaks near-duplicates into training. The splits instead hold out a whole capture group (3 folds) or a whole object (2 folds). Besides error, I report how well each model ranks builds inside each held-out fold, which is what matters for choosing between captures.",
          ],
          figures: [
            {
              src: "/work/bd3d/research/results_real.webp",
              width: 1655,
              height: 601,
              alt: "Three panels. (a, b) MAE by model for capture group held out and object held out: networks near 0.4 to 0.5 percent, Ridge 1.39 and 2.37, reprojection fit 3.95 with the object held out. (c) Heatmap of Spearman rho inside each held-out fold: Ridge row is consistently blue around 0.5 to 0.7, the network rows weak, attention and geo negative on the CPU dog group.",
              caption:
                "Real builds. (a, b) MAE in % of the reference diagonal (5 seeds). (c) Rank correlation between prediction and label inside each held-out fold; the coffin column has only 5 builds.",
            },
          ],
          table: {
            caption: "Object held out (2 folds): error level vs. ranking within the unseen object.",
            head: ["model", "MAE (% diag.)", "ρ dog (n = 23)", "ρ coffin (n = 5)"],
            rows: [
              ["Reprojection RMSE fit", "3.95", "−0.40", "−0.90"],
              ["Ridge on summaries", "2.37", "+0.59", "+0.70"],
              ["PointNet", "0.41 ± 0.06", "+0.40", "+0.30"],
              ["Self-attention", "0.41 ± 0.05", "+0.36", "+0.30"],
              ["Geometry shuffled (control)", "0.36 ± 0.07", "+0.46", "+0.30"],
              ["Geometry-aware attention", "0.36 ± 0.07", "+0.34", "+0.30"],
            ],
          },
          after: [
            "The set models overlap within one standard deviation, and the geometry-aware model is no better than its shuffled control, so these data cannot show an effect of geometry. Ridge predicts the wrong overall level on a new object, because its inputs shift between the dog and the coffin, but it ranks builds within the object best. An earlier claim of “~6× lower error on an unseen object” compared attention with Ridge on these two folds; it measures level, not ranking, and I no longer make it.",
          ],
        },
        {
          heading: "Interactive viewer",
          body: [
            "A browser tool for inspecting the camera data behind these results: 3D camera networks with frustums, the same azimuth × elevation coverage analysis as the pipeline (tested against it on every build), comparison against a reference by a similarity fit, a sortable camera table, and predicted-vs-measured plots from the saved out-of-fold predictions. The public copy holds camera poses and labels only; meshes and photos can be opened from a local folder and never leave the browser.",
          ],
          figures: [
            {
              src: "/work/bd3d/research/viewer.webp",
              width: 1600,
              height: 1000,
              alt: "The viewer: a dataset list on the left, a 3D view of the coffin's camera network in the centre with removed cameras dashed red, build details on the right, and a coverage panel below with an azimuth-elevation plot.",
              caption: "The viewer on coffin build side40_s1 against its reference: removed cameras dashed in red, coverage analysis below.",
            },
          ],
        },
        {
          heading: "Limitations and next steps",
          list: [
            "Two objects and 28 builds; builds within a capture are correlated, and holding out an object is only two folds.",
            "Labels are relative to a full-capture build of the same object, not a ground-truth scan, and use reduced depth-map resolution to fit a 16 GB laptop.",
            "The models see camera centres and axes only (no image content), and predict one number per build rather than where the geometry fails.",
            "The synthetic target is an angular gap, not surface error; the synthetic study uses 3 seeds and the convergence check one.",
          ],
          after: [
            "Next: more objects first, so that leaving an object out means something; then a matched-initialisation rerun, per-region prediction of missing surface, and the same relational bias over learned image features (DINOv2) or feed-forward reconstruction (DUSt3R, VGGT).",
          ],
        },
      ],
      contribution: {
        heading: "My role",
        body: [
          "I proposed this project, framed the research question, and designed the experiments: which photos each build removes, the label, the leakage-safe splits, the controls and what counts as evidence. I ran every Metashape build, audited the evaluator and retracted my own earlier results, and wrote the conclusions, including the negative ones.",
        ],
      },
      meta: "Every number on this page is traced to a tracked results file in the repository.",
    },
    links: [{ label: "Code and full results on GitHub", href: "https://github.com/tantancodes/reconstruction-quality" }],
  },

  {
    slug: "anova-marketing",
    headline: "Animated recruitment posts for Berkeley ANova",
    year: "2026",
    org: "Berkeley ANova",
    role: "Marketing Officer",

    label: "Marketing · Motion design",
    timeline: "Spring 2026 recruitment",
    team: "Berkeley ANova officer board",
    myRole: "Design and animation of the recruitment posts",
    skills: ["Motion design", "Illustration", "Social media", "Branding"],
    cover: "waveform", // fallback only; the page shows the animated poster
    video: {
      mp4: "/work/anova-marketing/computer-1280.mp4",
      poster: "/work/anova-marketing/computer-1280.webp",
      width: 1280,
      height: 720,
      label: "Animated ANova Spring 2026 poster: a retro computer whose screen flickers on to show the ANova logo.",
    },
    goal:
      "Berkeley ANova teaches computer science to under-resourced middle and high school students in the Bay Area. Each semester it needs new mentors, and recruiting happens mostly on Instagram.",
    writeup: [
      {
        heading: "The brief",
        body: [
          "ANova recruits new members every semester, and most students first hear about it through Instagram. As Marketing Officer, I made the posts for the Spring 2026 recruitment cycle: an introduction to who we are, a call to apply, the poster for our infosessions, and an animated polaroid post for our big/little reveal.",
        ],
      },
      {
        heading: "The approach",
        body: [
          "Instead of static flyers, I animated each post. Short loops stop the scroll better than still images. Every piece shares the same visual system: the teal ANova palette, a light circuit-board texture, soft organic shapes, and the club's mascot, so the feed reads as one campaign rather than separate announcements.",
        ],
      },
      {
        heading: "Results",
        body: [
          "Across the year, our campaigns generated 100,000+ impressions and a 137% increase in recruitment engagement.",
        ],
      },
    ],
    screenshotsLabel: "The posts",
    screenshots: [
      { src: "/work/anova-marketing/intro.webp", video: "/work/anova-marketing/intro.mp4", width: 720, height: 720, alt: "Opening slide: the ANova Spring 2026 title with the club mascot.", caption: "Opening slide" },
      { src: "/work/anova-marketing/who-we-are.webp", video: "/work/anova-marketing/who-we-are.mp4", width: 720, height: 720, alt: "Who are we: ANova teaches computer science to under-resourced middle and high school students in the Bay Area.", caption: "Who we are" },
      { src: "/work/anova-marketing/apply.webp", video: "/work/anova-marketing/apply.mp4", width: 720, height: 720, alt: "Interested in joining? Apply by Saturday, January 31st, with the mascot saying 'Do it!' next to member photos.", caption: "Call to apply" },
      { src: "/work/anova-marketing/computer.webp", video: "/work/anova-marketing/computer.mp4", width: 720, height: 720, alt: "Infosession poster: a retro computer whose screen lights up with the ANova logo.", caption: "Infosession poster" },
      { src: "/work/anova-marketing/polaroids-1.webp", video: "/work/anova-marketing/polaroids-1.mp4", width: 720, height: 720, alt: "Polaroids of ANova members at the big/little reveal, clipped to the page one by one.", caption: "Big/little polaroids, 1 of 3" },
      { src: "/work/anova-marketing/polaroids-2.webp", video: "/work/anova-marketing/polaroids-2.mp4", width: 720, height: 720, alt: "More polaroids from the big/little reveal drop into place.", caption: "Big/little polaroids, 2 of 3" },
      { src: "/work/anova-marketing/polaroids-3.webp", video: "/work/anova-marketing/polaroids-3.mp4", width: 720, height: 720, alt: "A polaroid flips over to a handwritten note: ANOVA RULES!!!", caption: "Big/little polaroids, 3 of 3" },
    ],
  },

  {
    slug: "rural-urban-gap",
    headline: "Which California school districts document climate action, and which don't?",
    year: "2026",
    org: "Ten Strands",
    role: "Data Research Intern",

    label: "Research · Education policy",
    timeline: "Sep – Dec 2026",
    team: "Ten Strands Indicator Expansion Team 1 (UC Berkeley Data Discovery)",
    myRole: "Research question, data cleaning, modeling, and figures",
    skills: ["Python", "pandas", "statsmodels", "GeoPandas", "matplotlib"],
    cover: "gap", // fallback only; the page shows the animated chart
    video: {
      mp4: "/work/rural-urban-gap/demo.mp4",
      poster: "/work/rural-urban-gap/poster.webp",
      width: 1280,
      height: 800,
      label:
        "Animated chart of 865 California school districts, enrollment against documented climate protections: rural districts average 1.2 protections and urban 2.2, then a single size trend line (+0.55 protections per 10× enrollment) shows rural districts sitting at the small end of it.",
    },
    goal:
      "Which district characteristics predict whether a California school district publicly documents climate action, especially action that involves students and the community?",
    writeup: [
      {
        heading: "The question",
        body: ["Our team collected 66 yes/no climate indicators for all 937 California districts. Most are thin (only 23 are documented by at least 10% of districts), so I chose outcomes by how much data they had before looking at any results: a count of 9 community and student activities, plus community partnerships on their own."],
        figure: {
          src: "/work/rural-urban-gap/final-coverage.webp",
          width: 992,
          height: 896,
          alt: "Horizontal bar chart of the share of California districts with a documented yes for each of the 23 practices documented by at least 10% of districts, with the community and student practices highlighted in blue.",
          caption: "The 23 practices with enough data to analyze. Blue: community and student activities.",
        },
      },
      {
        heading: "Political lean is the most consistent pattern",
        wide: true,
        body: ["51% of Democratic-leaning districts document a community environmental partnership, vs. 27% of Republican-leaning ones. Comparing districts in the same county with similar size, income and poverty, every +10 points of Democratic vote goes with 21% more documented community activities (p < 0.001)."],
        figure: {
          src: "/work/rural-urban-gap/final-politics.webp",
          width: 1079,
          height: 469,
          alt: "Two bar charts by 2024 political leaning. Left: districts with a documented community environmental partnership, 27% Republican-leaning, 36% neutral, 51% Democratic-leaning. Right: average community and student activities documented out of 9, 0.7, 1.2 and 1.6.",
          caption: "275 Republican-leaning, 414 neutral and 248 Democratic-leaning districts.",
        },
        stats: [
          { value: "51% vs 27%", label: "with a documented community partnership" },
          { value: "+21%", label: "community activities per +10 pts Democratic vote, within county" },
          { value: "+33%", label: "1.00 → 1.32 activities, 35% vs. 65% Democratic (all else equal)" },
        ],
      },
      {
        heading: "Not one lucky indicator",
        body: ["Across all 23 well-documented practices, Democratic-leaning districts document 22 more often (sign test p < 0.001). 7 stay significant after correcting for running 23 tests, from school gardens to plant-based meals and recycling."],
        figure: {
          src: "/work/rural-urban-gap/final-practices.webp",
          width: 992,
          height: 945,
          alt: "Dumbbell chart of 23 practices showing the share of Republican-leaning (red) and Democratic-leaning (blue) districts documenting each; Democratic-leaning districts are higher on 22 of 23, with starred gaps that hold within county.",
          caption: "Red: Republican-leaning. Blue: Democratic-leaning. ★ = the gap holds within county.",
        },
        stats: [
          { value: "22 of 23", label: "practices documented more by Democratic-leaning districts" },
          { value: "7", label: "still significant after correcting for 23 tests" },
        ],
      },
      {
        heading: "Lower-income communities document less",
        body: ["Each +10 points of low-income students goes with about 5% fewer documented community activities (p = 0.002), and the odds are lower for all 9 activities. Student poverty and community income move together (r = −0.58), so it's best read as a gap for lower-income communities overall."],
        figure: {
          src: "/work/rural-urban-gap/final-poverty.webp",
          width: 992,
          height: 549,
          alt: "Bar chart of average community and student activities documented by share of students receiving free or reduced-price meals: 1.5 under 34%, 1.2 at 34–57%, 1.0 at 57–75%, 1.0 over 75%.",
          caption: "Holding size, locale, type, politics and pollution equal: 1.35 activities at 25% low-income vs. 1.04 at 75%.",
        },
      },
      {
        heading: "Size, and the rural–urban gap",
        body: ["27% of districts under 1,000 students document a partnership, vs. 56% of districts over 20,000. Earlier in the project, the rural–urban gap in documented climate protections (0.76) vanished (−0.03) once I accounted for district size."],
        figure: {
          src: "/work/rural-urban-gap/rural_gap_size.webp",
          width: 1400,
          height: 700,
          alt: "Coefficient plot comparing each locale with rural districts. Without size, urban and suburban districts document about 0.7 more protections; after adjusting for district size, all three estimates sit at or near zero with intervals crossing zero.",
          caption: "Gray: without district size. Blue: adjusting for district size.",
        },
        stats: [
          { value: "27% vs 56%", label: "partnerships: under 1,000 vs. over 20,000 students" },
          { value: "+0.76 → −0.03", label: "urban vs. rural gap, before and after size" },
        ],
      },
      {
        heading: "Pollution is a regional story",
        body: ["The most-polluted quarter of districts is the least likely to document a partnership (26%). That comes from where those districts are, like the Central Valley: within counties it disappears, so it stays exploratory."],
        figure: {
          src: "/work/rural-urban-gap/final-pollution.webp",
          width: 992,
          height: 549,
          alt: "Bar chart of districts with a documented community partnership by pollution burden quartile: 38%, 47%, 36%, and 26% for the highest quarter.",
          caption: "Share with a documented community partnership, by CalEnviroScreen pollution quartile.",
        },
      },
      {
        heading: "The team poster",
        body: ["My analysis is one strand of our team poster with Aritra Nag, Nata Petrovi and Kevin Phongsa, mentored by Judy He and Sarah Whiting."],
        figure: {
          src: "/work/rural-urban-gap/team-poster.webp",
          width: 2400,
          height: 1600,
          alt: "Research poster titled School Districts in California Are Lagging Behind in Environmental Action, with sections for introduction, data collection, analysis and conclusion, a bar chart of which climate practices districts publicly document, a bar chart of wildfire readiness by community type and risk, and a logistic regression odds-ratio plot for community-based partnerships.",
          caption: "The finished team poster. Click it to open the full-resolution PDF.",
          href: "/work/rural-urban-gap/team-poster.pdf",
        },
        stats: [
          { value: "937", label: "California districts tracked" },
          { value: "72%", label: "with no documented wildfire readiness" },
        ],
      },
      {
        heading: "What this can't show",
        body: ["Documented isn't the same as done: bigger districts may simply publish more. These are associations in 864 districts, not causes; political lean stands in for local context, not votes causing programs."],
      },
    ],
    lookingForward:
      "What it suggests: support for documenting and sharing climate work (templates, staff time, partners) aimed at smaller, higher-poverty and Republican-leaning districts, where work may be happening but is harder to see.",
    links: [{ label: "Team research poster (PDF)", href: "/work/rural-urban-gap/team-poster.pdf" }],
  },

  {
    slug: "k12-retrieval",
    headline: "Searching K‑12 sustainability evidence, with sources attached",
    year: "2026–now",
    org: "Ten Strands",
    role: "Data Research Intern",

    label: "Applied NLP · Education",
    timeline: "Sep 2026 – Present",
    team: "Ten Strands and the UC Berkeley Data Discovery program", // TODO: team size/roles
    myRole: "Retrieval system design and evaluation",
    skills: ["Python", "BM25", "Sentence Transformers", "CrossEncoder", "Recall@K / MRR"],
    cover: "retrieval", // fallback only; the page shows the demo video
    diagram: "retrieval",
    video: {
      mp4: "/projects/k12-retrieval/demo.mp4",
      poster: "/projects/k12-retrieval/poster.webp",
      width: 1280,
      height: 804,
      label:
        "Demo of the K–12 sustainability evidence search: the bushes-and-magnifier intro, searching \"fire protection\", the saved evidence list with export, and opening the original source PDF.",
    },
    goal:
      "Evidence on California K-12 sustainability is scattered across district pages and policies. I built a local search over 50 documents (2,157 passages) that returns the best passages and an answer that only quotes its sources.",
    highlights: [
      {
        title: "Hybrid search, then reranking",
        body: "BM25 keyword search plus dense embeddings find candidates; a CrossEncoder reranks them. Each stage catches what the last one missed.",
      },
      {
        title: "Better top-five results",
        body: "Known source in the top five for 97.1% of 34 dev questions, vs. 88.2% for BM25 alone. Promising, but too few questions to call significant.",
        stat: "97.1%",
        statLabel: "known-source Recall@5 (BM25: 88.2%)",
      },
      {
        title: "Answers only from quoted sources",
        body: "The local LLM may only answer with cited, verbatim excerpts. Unsupported quotes are rejected, and thin evidence gets \"not enough evidence.\"",
      },
    ],
    lookingForward:
      "Next: about 50 held-out questions from districts it has never seen, with answers judged by people.",
  },

  {
    slug: "idx-home-prices",
    headline: "California Home Value Estimator",
    year: "2026",
    org: "IDX Exchange",
    role: "Data Science Intern",

    label: "Machine learning · Real estate",
    timeline: "May 2026 – Aug 2026 · Remote",
    team: "Data science internship, IDX Exchange",
    myRole: "Data, modeling, evaluation, and the app",
    skills: ["Python", "XGBoost", "scikit-learn", "GeoPandas", "Streamlit"],
    cover: "houses", // fallback only; the page shows the demo video
    goal:
      "Predicts California home sale prices from property and location data, with an explanation for every estimate.",
    video: {
      mp4: "/projects/home-value-estimator/demo.mp4",
      poster: "/projects/home-value-estimator/poster.webp",
      width: 1280,
      height: 800,
      label:
        "Demo of the California Home Value Estimator: choosing a ZIP code and home details, reading the estimated sale price and its error range, then the model comparison page.",
    },
    writeup: [
      {
        heading: "The problem and the data",
        body: ["Estimate what a California home will sell for, and be honest about how far off it might be. 309K CRMLS sales (Jan 2024 – Apr 2026), matched to 680 school districts, tested once on April 2026 only, with list price kept out."],
      },
      {
        heading: "Results",
        body: ["XGBoost reached 7.7% median error on 11,890 April sales, with 85.5% of homes within 20% of their sale price. Every estimate shows what moved it and an error range."],
        stats: [
          { value: "7.7%", label: "median error, 11,890 April sales" },
          { value: "85.5%", label: "of homes within 20% of sale price" },
          { value: "16.5%", label: "median error, linear baseline" },
        ],
      },
      {
        heading: "What didn't work",
        body: ["A stronger model barely mattered. Better features cut error from 9.2% to 7.8%; boosting added only ~0.1 points, but shrank the model from 268 MB to 4 MB."],
      },
      {
        heading: "Limitations",
        body: [],
        list: [
          "It under-predicts luxury homes.",
          "It can't predict above the highest price it was trained on ($8.4M).",
          "It's weakest on older homes, and in Oakland, the worst of the 15 highest-volume cities.",
        ],
      },
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/tantancodes/IDX-Exchange-Data-Science" }],
    note: "No live demo: the CRMLS data is licensed, so the app runs locally.",
    screenshots: [
      {
        src: "/projects/home-value-estimator/screenshot-estimate.webp",
        width: 1400,
        height: 2186,
        alt: "The Estimate page: home details on the left; on the right, an estimated sale price of $1.31M for a home in Oakland, its error range, a bar chart of what moved the estimate, and a map of the school district.",
        caption: "Estimate, with its error range and what moved it",
      },
      {
        src: "/projects/home-value-estimator/screenshot-model-comparison.webp",
        width: 1400,
        height: 1920,
        alt: "The Model comparison page: a scoreboard of seven models on April 2026 sales, from linear regression at 16.46% typical error down to XGBoost at 7.70%, with bar and line charts of error by model and by month.",
        caption: "Model comparison on the April 2026 test",
      },
    ],
  },

];

/* ---------- Play ---------- */

export const play: PlayItem[] = [
  {
    title: "Kung fu",
    blurb: "Training and competing, including at the Golden State Tournament.",
  },
  // Uncomment (and edit) whichever of these are true:
  // { title: "Breaking", blurb: "..." },
  // { title: "Piano", blurb: "..." },
  // { title: "Overwatch", blurb: "..." },
];

/* ---------- Helpers ---------- */

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
