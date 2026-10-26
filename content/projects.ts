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
export type CoverMotif = "coffin" | "mesh" | "retrieval" | "houses" | "waveform";

export type Highlight = {
  title: string;
  body: string;
  /** Optional big number shown beside the highlight, e.g. "+35%". */
  stat?: string;
  statLabel?: string;
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
  highlights: Highlight[]; // aim for 2–3
  lookingForward: string;
  links?: { label: string; href: string }[];
  /** Screenshots of the real product. The first replaces the generated cover; the rest form a gallery. */
  images?: { src: string; alt: string; caption?: string; phone?: boolean }[];
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
  title: string;
  stack: string[];
  summary: string;
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
  // Typed out after "I am a", one at a time, on a loop.
  roles: ["designer", "researcher", "student", "teacher"],
  ctas: [
    { label: "View experience", href: "#experience" },
    { label: "View projects", href: "#projects" },
  ],
};

/* ---------- Experience (LinkedIn + resume) ----------
 * Where LinkedIn, the resume, and older notes disagreed, the RESUME wins.
 * Each disagreement is marked "CHECK:" so you can confirm it. */

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
    caseStudy: "ten-strands",
    roles: [
      {
        // CHECK: LinkedIn says "Data Analyst · Internship, Aug 2026 – Present"; your first notes said Jan 2026.
        title: "Data Research Intern",
        dates: "Sep 2026 – Present",
        points: [
          "Built an NLP retrieval system combining BM25, dense transformer embeddings, and a sentence-transformers CrossEncoder reranker over 10,000+ California K–12 district webpages and policy documents.",
          "Benchmarked lexical and neural retrieval on human-validated evidence (Recall@K, MRR): Recall@5 up 35%, manual source-discovery time down 76%.",
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
        // CHECK: LinkedIn (and your first notes) say "Sep 2026 – Present".
        title: "Data Science Intern",
        dates: "May 2026 – Aug 2026",
        points: [
          "Engineered an end-to-end Python / scikit-learn pipeline for automated residential valuation on 297K+ California transactions across 27 months.",
          "Tuned Linear Regression, Random Forest, and XGBoost with chronological backtesting across 11K+ sales: 0.92 R², 6% median error, 34% lower MAE than the linear baseline.",
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
        title: "Undergraduate Research Apprentice",
        dates: "Aug 2025 – May 2026",
        points: [
          "Built an automated Python photogrammetry pipeline (Agisoft Metashape API) processing 1,000+ images into 3D reconstructions, cutting manual processing time by 40% (~30 → ~18 min each).",
          "Developed Ridge regression models on SfM and image-overlap graph features to predict reconstruction quality: 13.7% lower geometric RMSE than a reprojection-error baseline, with leakage-aware cross-validation.",
        ],
      },
    ],
  },
  {
    org: "Berkeley ANova",
    roles: [
      {
        title: "Computer Science Mentor",
        dates: "Aug 2025 – Present",
        points: ["Teach Python weekly to 100+ high school students."],
      },
      { title: "Marketing Officer", dates: "Jan 2026 – May 2026" },
    ],
  },
  {
    org: "Goldman Sachs",
    roles: [{ title: "Possibilities Summit", dates: "Jan 2025 – May 2025" }],
  },
  {
    org: "Rose Water Capital",
    place: "United States",
    tags: ["Design and Advertising"],
    roles: [{ title: "Business Consulting Intern", dates: "Aug 2024 – Feb 2025" }],
  },
  {
    org: "Shaolin Temple Cultural Center",
    roles: [{ title: "Martial Arts Coach", dates: "Feb 2023 – May 2024" }],
  },
];

/* ---------- Projects (the "View projects" section) ---------- */

export const projectCards: ProjectCard[] = [
  {
    title: "BD3D: 3D Egyptian Coffin Research Viewer",
    stack: ["Next.js", "TypeScript", "React Three Fiber", "three.js", "glTF", "Playwright"],
    summary: "Read six ancient coffins in 3D: 314 scholarly annotations linked to 607 surface regions, raking light, word-to-location links, and a compressed asset pipeline that cut downloads by 74%.",
    caseStudy: "egyptology-3d",
  },
  {
    title: "K–12 Sustainability Evidence Retrieval",
    stack: ["Python", "BM25", "Sentence Transformers", "CrossEncoder"],
    summary: "Hybrid lexical + neural search over 10,000+ district pages and policies. Recall@5 +35%, manual source discovery −76%.",
    caseStudy: "ten-strands",
  },
  {
    title: "Automated Home Valuation",
    stack: ["Python", "scikit-learn", "XGBoost"],
    summary: "End-to-end pipeline on 297K+ California sales with chronological backtesting. 0.92 R², 6% median error.",
    caseStudy: "idx-home-prices",
  },
  {
    title: "Predicting 3D Reconstruction Quality",
    stack: ["Python", "Agisoft Metashape", "Ridge regression"],
    summary: "Early structure-from-motion signals predict final scan quality: 13.7% lower geometric RMSE than a reprojection-error baseline.",
    caseStudy: "bd3d",
  },
  {
    title: "Spotify Analytics Platform",
    stack: ["TypeScript", "Node.js", "FastAPI", "PostgreSQL", "Pandas", "Tableau"],
    summary: "Spotify OAuth ingest of 1,000+ tracks and 50+ artists, listening analytics, and content-based recommendations via audio-feature cosine similarity.",
    caseStudy: "spotify-analytics",
  },
  {
    title: "Quantitative ML Stock Analytics Dashboard",
    stack: ["Python", "Pandas", "scikit-learn", "Streamlit", "yfinance"],
    summary: "Live market data, technical indicators (RSI, MACD, Bollinger Bands), and SVR / Random Forest models evaluated with time-series-aware splits on up to 365 days of history.",
    // href: "https://github.com/tantancodes/...", // TODO: add a link if the repo is public
  },
];

/* ---------- Education & skills (resume) ---------- */

export const education = {
  school: "University of California, Berkeley",
  degree: "B.A. Data Science & Economics", // TODO: confirm B.A. vs B.S.
  dates: "Expected May 2029",
  gpa: "3.88",
  coursework: [
    "Microeconomics",
    "Probability and Statistics for Business",
    "Foundations of Data Science",
    "Computational Structures in Data Science",
    "Linear Algebra",
  ],
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "SQL", "JavaScript", "TypeScript", "HTML/CSS"] },
  {
    group: "Frameworks & tools",
    items: ["React", "Next.js", "FastAPI", "PostgreSQL", "Supabase", "MongoDB", "Git", "Vercel", "OAuth 2.0", "REST APIs"],
  },
  {
    group: "Data science & ML",
    items: ["scikit-learn", "PyTorch", "Sentence Transformers", "OpenCV", "Pandas", "NumPy", "SciPy", "Matplotlib", "Tableau"],
  },
];

export const about = {
  paragraphs: [
    "I study Data Science and Economics at UC Berkeley (class of 2029). I like problems where a model or a tool is only half the job and the other half is making it useful to the people who rely on it: researchers, teachers, students.",
    "Every week I teach Python to 100+ high schoolers as a Computer Science Mentor at Berkeley ANova. Explaining an idea to a room of fifteen-year-olds is the fastest way I know to find out whether I really understand it.",
  ],
};

/* ---------- Work ---------- */

export const projects: Project[] = [
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
      "Egyptian coffins were written to be read in place: where a spell sits on the lid or the foot end is part of its meaning. The Berkeley Book of the Dead in 3D project had photogrammetric models of six coffins and scholarly editions tying 314 entries to 607 regions on their surfaces. I built the research viewer that brings the two together: turn a coffin, click any outlined region to read its hieroglyphs, transliteration and translation, or start from the text and fly to where it is written.",
    highlights: [
      {
        title: "The object and the text, linked both ways",
        body:
          "Selection reuses the source edition's own polygon rule, so what you click is exactly what the editors drew. Hover a region and its entry lights up; hover an entry and its regions light up. Words in a transliteration link to the edition's dictionary and to every place that word occurs on the coffin. Every view, selection and light angle is a shareable link.",
        stat: "607",
        statLabel: "regions linked to 314 entries",
      },
      {
        title: "A 3D asset pipeline with provenance",
        body:
          "I converted the source OBJ models and 4096 px photographs into compressed glTF and tiered textures without moving a vertex. Each file records its own checksum and its source's, and tests check every compressed model against the original. The viewer shows the coffin from small preview files first, then loads the resolution each device can handle.",
        stat: "−74%",
        statLabel: "total download, all six coffins (standard quality)",
      },
      {
        title: "Raking light, kept honest",
        body:
          "A real directional light with shadow maps sweeps across the scanned surface to show its relief. The meshes are too coarse to hold individual carved signs, which live in the photographs, so the interface says so rather than faking detail the scan never measured.",
      },
      {
        title: "Engineered to be trusted",
        body:
          "Research data is validated against a schema with two-way link checks at build time. 82 unit tests cover the geometry math, search and linking logic; 45 browser tests drive every coffin, including accessibility scans; CI runs it all on every push.",
        stat: "127",
        statLabel: "automated tests in CI",
      },
      {
        title: "From apprentice to lead",
        body:
          "I joined through URAP as an apprentice and moved into a Research Assistant role. I now lead the incoming URAP students and the design team: scoping work, reviewing code, and keeping design and engineering in step.",
      },
    ],
    lookingForward:
      "With the lab's high-resolution scans, I could bake normal maps so raking light reveals individual carved signs. Next on the list: testing on physical phones, and a side-by-side view for comparing the same spell across coffins.",
    links: [
      { label: "View the code", href: "https://github.com/tantancodes/bd3d-website/tree/redesign/foundation" },
      { label: "Engineering write-up", href: "https://github.com/tantancodes/bd3d-website/blob/redesign/foundation/docs/CASE-STUDY.md" },
    ],
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
    headline: "Predicting 3D scan quality before spending the compute",
    year: "2025–26",
    org: "Lucarelli Photogrammetry Lab, UC Berkeley",
    role: "Undergraduate Research Apprentice",

    label: "Research · Photogrammetry",
    timeline: "Aug 2025 – May 2026",
    team: "Lucarelli Photogrammetry Lab (BD3D)", // TODO: e.g. "PI, grad mentor, 2 undergrads"
    myRole: "Pipeline, feature engineering, and modeling",
    skills: ["Python", "Agisoft Metashape", "ICP", "Ridge regression", "LOOCV"],
    cover: "mesh",
    goal:
      "Photogrammetry turns a stack of photos into a 3D model, but a full reconstruction is expensive and you only learn whether it worked at the end. The question: can signals from the earliest stages of the pipeline predict the final reconstruction quality before you commit the compute?",
    highlights: [
      {
        title: "A ground truth for 'good'",
        body:
          "I automated the Agisoft Metashape workflow in Python, processing 1,000+ images into 3D reconstructions, and scored each finished model against a reference surface with ICP alignment. That gave every run a quality number to predict, and image-overlap graphs from the input photos gave the features to predict it with.",
        stat: "−40%",
        statLabel: "processing time (~30 → ~18 min)",
      },
      {
        title: "Early signals beat the obvious baseline",
        body:
          "With leakage-aware Ridge models (no information from the finished reconstruction allowed into the features), early structure-from-motion features cut geometric RMSE by 13.7% compared with a reprojection-error baseline.",
        stat: "−13.7%",
        statLabel: "geometric RMSE vs. baseline",
      },
      {
        title: "An honest negative result",
        body:
          "The improvement didn't hold under extrapolation, meaning scenes outside the range the model was trained on. Reporting that clearly matters as much as the headline number: it says the features capture something real, but not yet something general.",
      },
    ],
    lookingForward:
      "The next step is camera-coverage features: describing how thoroughly the cameras actually see each part of the object, which should transfer across scenes better than overlap statistics.",
  },

  {
    slug: "ten-strands",
    headline: "Cutting the search time for K‑12 sustainability data",
    year: "2026–now",
    org: "Ten Strands",
    role: "Data Research Intern",

    label: "Applied NLP · Education",
    timeline: "Sep 2026 – present", // CHECK: LinkedIn says Aug 2026; your first notes said Jan 2026
    team: "Ten Strands and the UC Berkeley Data Discovery program", // TODO: team size/roles
    myRole: "Retrieval system design and evaluation",
    skills: ["Python", "BM25", "Sentence Transformers", "CrossEncoder", "Recall@K / MRR"],
    cover: "retrieval",
    goal:
      "Evidence about California K-12 sustainability is scattered across 10,000+ district webpages and policy documents, and finding it by hand is slow. The goal was a retrieval system that puts the most relevant sources at the top for a given question, so people spend their time using data instead of hunting for it.",
    highlights: [
      {
        title: "Keyword, meaning, then a second opinion",
        body:
          "The system combines BM25 keyword search with dense transformer embeddings, then reranks the candidates with a sentence-transformers CrossEncoder. Each stage catches what the one before it misses.",
      },
      {
        title: "More of the right answers up top",
        body: "Benchmarked lexical against neural retrieval on human-validated evidence using Recall@K and MRR. Recall@5 improved by 35%.",
        stat: "+35%",
        statLabel: "Recall@5",
      },
      {
        title: "Time back for the people doing the work",
        body: "Manual source-finding time dropped by 76%.",
        stat: "−76%",
        statLabel: "manual search time",
      },
    ],
    lookingForward:
      // TODO: replace with what's actually next.
      "I'm interested in keeping the evaluation honest as the corpus grows, and in making the results easy for non-technical users to trust.",
  },

  {
    slug: "idx-home-prices",
    headline: "Estimating California home prices from listing data",
    year: "2026",
    org: "IDX Exchange",
    role: "Data Science Intern",

    label: "Machine learning · Real estate",
    timeline: "May – Aug 2026 · Remote", // CHECK: LinkedIn and your first notes say Sep 2026 – present
    team: "IDX Exchange data science interns", // TODO
    myRole: "Data pipeline, modeling, and evaluation",
    skills: ["Python", "scikit-learn", "XGBoost", "Random Forest", "Backtesting"],
    cover: "houses",
    goal:
      "Build an end-to-end pipeline that values California homes automatically, from 297K+ real transactions across 27 months, and prove it works on sales it has never seen.",
    highlights: [
      {
        title: "Tested the way it would be used",
        body:
          "Linear Regression, Random Forest, and XGBoost were tuned with chronological backtesting: always training on the past and predicting later sales, across 11K+ held-out transactions.",
        stat: "0.92",
        statLabel: "R² on held-out sales",
      },
      {
        title: "Typically within about 6%",
        body:
          "The median prediction error is 6%, and mean absolute error is 34% lower than the original linear baseline.",
        stat: "6%",
        statLabel: "median error",
      },
    ],
    lookingForward:
      // TODO: replace with what's actually next.
      "Next I want to understand where the model is least accurate, by region and price band, and make those errors visible rather than averaging them away.",
  },

  {
    slug: "spotify-analytics",
    headline: "Turning listening history into better recommendations",
    year: "2026", // TODO: confirm year
    org: "Personal project",
    role: "Solo developer",

    label: "Side project · Full-stack",
    timeline: "2026", // TODO
    team: "Solo",
    myRole: "Design, backend, data, and deployment",
    skills: ["TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL", "Pandas", "Tableau"],
    cover: "waveform",
    goal:
      "Build an analytics platform on top of my own Spotify data: sign in with Spotify, store listening history, and use it to power a recommendation engine.",
    highlights: [
      {
        title: "Real sign-in, real data",
        body:
          "Users authenticate with Spotify OAuth 2.0, and the FastAPI backend ingests and normalizes their listening history (1,000+ tracks, 50+ artists) into PostgreSQL.",
      },
      {
        title: "A recommendation engine on top",
        body:
          "Listening behavior is analyzed with Pandas and Tableau, and a content-based recommender suggests new tracks by cosine similarity over Spotify audio features.",
      },
    ],
    lookingForward:
      // TODO: replace with what's actually next.
      "I'd like to add a way to measure whether the recommendations are good, beyond whether they feel right.",
    links: [{ label: "View on GitHub", href: "https://github.com/tantancodes/spotify-analytics" }],
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
