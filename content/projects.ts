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
    stats?: { value: string; label: string }[];
    figure?: Screenshot; // one chart or map under the section text
  }[]; // shown instead of goal / highlights / looking forward
  note?: string; // one short line next to the links
  screenshots?: Screenshot[];
  screenshotsLabel?: string; // heading over the screenshots, "Screenshots" by default
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
          "Found district enrollment was the strongest predictor of documented climate protections in county-clustered regression; the urban–rural gap disappeared after controlling for district size.",
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
        title: "Undergraduate Machine Learning Researcher",
        dates: "Aug 2025 – May 2026",
        points: [
          "Built PyTorch PointNet and self-attention set models that predict camera-coverage gaps from aligned camera layouts; on localized gaps, attention cut MAE from 27.7° (Ridge) to 14.0° across 5 seeds.",
          "Audited the geometric evaluator: 7 of 16 labels were ICP registration failures (frames rotated 136–167°). Rebuilt it with camera-initialized similarity ICP and retracted three earlier results that relied on the bad labels.",
          "Ran Agisoft Metashape experiments on two artifacts, including a 145-photo museum coffin, with provenance tracking and a resource watchdog; piloted set models on 28 labeled reconstructions.",
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
    title: "BD3D: 3D Egyptian Coffin Research Viewer",
    status: "Research · 2026",
    stack: ["Next.js", "TypeScript", "React Three Fiber", "three.js", "glTF", "Playwright"],
    summary: "Read six ancient coffins in 3D: 314 scholarly annotations linked to 607 surface regions, raking light, word-to-location links, and a compressed asset pipeline that cut downloads by 74%.",
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
    group: "Ten Strands",
    title: "K–12 Sustainability Evidence Retrieval",
    status: "Project · 2026",
    stack: ["Python", "BM25", "Sentence Transformers", "CrossEncoder"],
    art: "retrieval",
    summary: "Keyword + neural search over district pages and policies, with answers that quote and cite their sources.",
    stat: "97.1% Recall@5 vs. 88.2% for BM25 (exploratory, 34 queries)",
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
    group: "Ten Strands",
    title: "Rural–Urban Gaps in Documented Climate Action",
    status: "Research · 2026 · In progress",
    video: {
      mp4: "/work/rural-urban-gap/demo-720.mp4",
      poster: "/work/rural-urban-gap/poster-720.webp",
      width: 720,
      height: 450,
      label:
        "Animated chart of 865 California school districts, enrollment against documented climate protections: rural districts average 1.2 protections and urban 2.2, then a single size trend line (+0.55 protections per 10× enrollment) shows rural districts sitting at the small end of it.",
    },
    stack: ["Python", "pandas", "Jupyter"],
    summary: "Rural California districts document fewer climate protections than urban ones. Is that a gap in capacity, or in paperwork? A regression analysis of 865 districts.",
    stat: "The rural–urban gap disappears once district size is accounted for",
    caseStudy: "rural-urban-gap",
  },
  {
    group: "More projects",
    title: "Predicting 3D Reconstruction Quality",
    status: "Research · 2025–26",
    cover: "mesh",
    stack: ["Python", "PyTorch", "Agisoft Metashape", "ICP"],
    summary: "Can you tell how good a 3D scan will be from the camera layout alone, before the slow reconstruction step? Set models in PyTorch, a corrected evaluator, and a two-object pilot.",
    stat: "Attention: 14.0° vs 27.7° MAE for Ridge on localized coverage gaps (synthetic, 5 seeds)",
    video: {
      mp4: "/work/bd3d/coverage-720.mp4",
      poster: "/work/bd3d/coverage-720.webp",
      width: 720,
      height: 450,
      label: "Illustration: cameras orbit an object; a block of cameras on one side is removed and highlighted, showing the kind of coverage gap the models predict.",
    },
    caseStudy: "bd3d",
  },
  {
    group: "More projects",
    title: "California Home Value Estimator",
    status: "Internship · 2026",
    stack: ["Python", "XGBoost", "scikit-learn", "GeoPandas", "Streamlit"],
    summary: "Predicts California home sale prices from property and location data, with an explanation for every estimate.",
    stat: "7.7% median error on 11,900 held-out sales",
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
    group: "Design & outreach",
    title: "ANova Spring 2026 Recruitment Campaign",
    status: "Marketing · 2026",
    stack: ["Motion design", "Illustration", "Social media"],
    summary: "Animated Instagram posts and an infosession poster for Berkeley ANova's spring recruitment, a club teaching computer science to under-resourced Bay Area students.",
    caseStudy: "anova-marketing",
    featured: true,
    video: {
      mp4: "/work/anova-marketing/computer-card.mp4",
      poster: "/work/anova-marketing/computer-card.webp",
      width: 722,
      height: 406,
      label: "Animated ANova Spring 2026 poster: a retro computer whose screen flickers on to show the ANova logo.",
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
    headline: "Predicting 3D scan quality from the camera layout, before the slow step",
    year: "2025–26",
    org: "Lucarelli Photogrammetry Lab, UC Berkeley",
    role: "Undergraduate Machine Learning Researcher",

    label: "Research · Photogrammetry · Machine learning",
    timeline: "Aug 2025 – May 2026",
    team: "Lucarelli Photogrammetry Lab (BD3D)",
    myRole: "Experiment pipeline, evaluation, and modeling",
    skills: ["Python", "PyTorch", "Agisoft Metashape", "ICP", "TensorBoard"],
    cover: "mesh", // fallback only; the page shows the animation
    video: {
      mp4: "/work/bd3d/coverage-1280.mp4",
      poster: "/work/bd3d/coverage-1280.webp",
      width: 1280,
      height: 800,
      label: "Illustration: cameras orbit an object; a block of cameras on one side is removed and highlighted, showing the kind of coverage gap the models predict.",
    },
    goal:
      "Dense reconstruction is the slow step of photogrammetry. Can you tell how good a reconstruction will be from the aligned camera layout alone, before running it?",
    writeup: [
      {
        heading: "The question",
        body: [
          "Photogrammetry turns a stack of photos into a 3D model. The dense reconstruction step is slow: the 145-image reference for a museum coffin took 57 minutes on a laptop, even at reduced resolution. Knowing right after alignment that a capture will produce a poor mesh would save that time, and tell the photographer where coverage is missing while the object is still on the turntable.",
          "Each experiment removes images from a full capture (at random, as a contiguous side, or as an elevation band), reconstructs the rest in Agisoft Metashape, and measures how far the mesh lands from a reconstruction made with all images. That distance is the label. The model's input is the set of aligned cameras: where each one is and which way it points.",
        ],
        figure: {
          src: "/work/bd3d/hero.webp",
          width: 829,
          height: 780,
          alt: "Top-down polar view of the 145 reference cameras around a museum coffin; 23 wall-level cameras removed for one run are shown hollow, and the resulting largest coverage gap is shaded.",
          caption: "The coffin's 145 cameras seen from above. Hollow points are the 23 removed for one run; the shaded arc is the resulting coverage gap.",
        },
      },
      {
        heading: "First, I found my own labels were wrong",
        body: [
          "The first evaluator aligned each mesh to the reference with rigid ICP from an identity start. Metashape reconstructions without markers come out in arbitrary frames, and 7 of 16 runs were rotated 136–167° from the reference. ICP can't recover a rotation that large, so those labels measured registration failure, not geometry.",
          "I rebuilt the evaluator to start from a similarity fit of each run's cameras onto the reference cameras, then refine with ICP. All 16 runs now pass QC, and the 7 broken labels moved from about 0.043 to 0.003–0.006. Three results I had reported from the old labels did not survive, and I retracted them.",
        ],
        figure: {
          src: "/work/bd3d/evaluation_audit.webp",
          width: 1560,
          height: 570,
          alt: "Left: v1 label against frame rotation for 16 runs; runs rotated about 135–167 degrees cluster at a high plateau near 0.04, while v3 labels for the same runs are low. Right: v1 against v3 labels, with the seven formerly failed runs far from the equality line.",
          caption: "The old error tracked how far each run's frame was rotated, not how good its geometry was.",
        },
      },
      {
        heading: "Reprojection error is the wrong quick check",
        body: [
          "The number photogrammetry software reports, reprojection RMSE, measures how consistent the kept photos are, not whether the whole object is covered. Within each object it moved the wrong way: removing photos lowered it while the geometry got worse (Spearman ρ −0.68 for the dog, −0.90 for the coffin, on small samples). The coffin's worst mesh had the lowest reprojection error.",
        ],
        figure: {
          src: "/work/bd3d/reprojection_vs_label.webp",
          width: 950,
          height: 612,
          alt: "Scatter of reprojection RMSE against the corrected geometric label for 28 runs from two objects; within each object, lower reprojection error goes with worse geometry.",
          caption: "Within each object, lower reprojection error went with worse geometry.",
        },
      },
      {
        heading: "Set models in PyTorch",
        body: [
          "Each camera becomes a point: its position and viewing direction, normalized for scale and randomly rotated during training. I compared a Ridge model on summary statistics with two PyTorch set models: PointNet (a per-camera network, then pooling) and an attention model that lets cameras compare with each other before pooling.",
          "On a synthetic benchmark (predict the largest coverage gap, 5 seeds), all three beat the mean when the gap cut through every camera. When the gap was localized to one ring, Ridge and PointNet barely improved on the mean, while attention kept most of its skill: 14.0° MAE against 27.7° for Ridge.",
        ],
        figure: {
          src: "/work/bd3d/synthetic_mae.webp",
          width: 1040,
          height: 570,
          alt: "Bar chart of test MAE in degrees for mean, Ridge, PointNet and attention on global and localized coverage gaps over five seeds; attention is lowest in both, 7.1 and 14.0 degrees.",
          caption: "Mean ± std over 5 seeds. Attention is the only model that reads localized gaps.",
        },
        stats: [
          { value: "14.0°", label: "attention MAE on localized gaps (Ridge: 27.7°)" },
          { value: "7 of 16", label: "original labels were registration failures" },
          { value: "28", label: "labeled real reconstructions, 2 objects" },
        ],
      },
      {
        heading: "Training",
        body: ["Training and validation curves come from the TensorBoard logs, exported for the page."],
        figure: {
          src: "/work/bd3d/learning_curves_synthetic.webp",
          width: 1485,
          height: 952,
          alt: "Training and validation loss curves for PointNet and attention on the global and localized synthetic benchmarks.",
          caption: "Synthetic benchmark learning curves, train vs. validation.",
        },
      },
      {
        heading: "Real data: a two-object pilot",
        body: [
          "I ran the pipeline on an ARF ceramic dog (50 photos) and a PAHMA museum coffin (145 photos). Random removal mostly loses surface. Removing a contiguous side cost less than removing the same number of images at random on both objects: for the coffin, dropping 23 wall-level cameras as one sector scored better than keeping only 60 random images.",
          "On 28 labeled runs, holding one object out, the set models stayed in a plausible range while Ridge and the reprojection fit failed, because their inputs shift between objects. With two objects and correlated runs, that is a feasibility check, not evidence that any model predicts quality.",
        ],
        figure: {
          src: "/work/bd3d/camera_layouts.webp",
          width: 1800,
          height: 608,
          alt: "Four top-down camera layouts: two for the ARF dog and two for the coffin, with used and removed cameras and the largest coverage gap shaded.",
          caption: "Example runs on the dog (left two) and the coffin (right two).",
        },
      },
      {
        heading: "Where it stands: a capture-check app",
        body: [
          "The research question needs more objects, and each new object means a new capture. So I turned the pipeline into a one-window desktop app that a photographer can run right after shooting: pick a photo folder, align it in Metashape, and see straight away where the cameras are thin compared with a reference capture, before spending an hour on the dense step. Building the mesh and scoring it with the corrected evaluator are optional next buttons in the same window.",
          "The coverage view moves the new run into the reference's frame with the same camera fit the evaluator uses, then counts cameras by direction and height. On the coffin run that dropped one side, it flags exactly the low cameras that were removed and nothing else. The evaluator now lives in the package with regression tests, and a walkthrough notebook follows one coffin run from photos to label.",
        ],
        figure: {
          src: "/work/bd3d/capture_check_coverage.webp",
          width: 1716,
          height: 728,
          alt: "The capture-check app's coverage view for a coffin run with one side removed. Left: top-down camera positions colored by elevation, with the 145 reference cameras as hollow circles; the 23 removed cameras on one side are hollow only. Right: a grid of azimuth against elevation showing cameras per cell as run over reference, with the four low-elevation cells on the removed side shaded red.",
          caption: "The app on the coffin's one-side-removed run (122 of 145 cameras). Red cells: the reference had cameras there and this run doesn't.",
        },
      },
    ],
    lookingForward:
      "Next: capture a third object with the app so holding one out means more than two folds, predict alignment failure as its own outcome, and show where on the object the geometry goes wrong, not just one error number per run.",
    links: [{ label: "Code and full results on GitHub", href: "https://github.com/tantancodes/reconstruction-quality" }],
  },

  {
    slug: "anova-marketing",
    headline: "Recruiting the next class of CS mentors, one animated post at a time",
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
          "ANova recruits new members every semester, and most students first hear about it through Instagram. As Marketing Officer, I made the posts for the Spring 2026 recruitment cycle: an introduction to who we are, a call to apply, and the poster for our infosessions.",
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
    ],
  },

  {
    slug: "rural-urban-gap",
    headline: "Is the rural climate-action gap about capacity, or paperwork?",
    year: "2026–now",
    org: "Ten Strands",
    role: "Data Research Intern",

    label: "Research · Education policy · In progress",
    timeline: "Oct 2026 – Present",
    team: "Ten Strands Indicator Expansion Team 1 (UC Berkeley Data Discovery)",
    myRole: "Research question, data cleaning, modeling, and figures",
    skills: ["Python", "pandas", "statsmodels", "GeoPandas", "seaborn"],
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
      "Rural California school districts document fewer climate protections than urban ones. I'm testing whether that gap reflects what districts can do, or what they write down.",
    writeup: [
      {
        heading: "The question",
        body: [
          "Rural California school districts publicly document fewer climate protections than urban ones. That could mean they have less capacity to act: fewer staff, smaller budgets. Or it could mean they act just as much but publish less of it. The two call for very different responses, so I wanted to know which one the data supports.",
        ],
      },
      {
        heading: "The data",
        body: [
          "937 California districts, combining Ten Strands' district dataset (enrollment, demographics, income, politics, locale) with indicators our Indicator Expansion team collected this fall from district websites and documents. The outcome is a count of seven climate protections a district documents publicly: heat, wildfire, poor air quality, indoor air quality, energy resilience, air conditioning, and stormwater. 865 districts had complete data for the models.",
        ],
      },
      {
        heading: "The gap is real",
        body: [
          "Rural districts document 1.2 of the seven protections on average; suburban and urban districts document about 2.1. The difference is largest for heat protection (7% of rural districts vs. 32% of urban ones), stormwater, and air quality planning.",
        ],
        figure: {
          src: "/work/rural-urban-gap/protection_heatmap.webp",
          width: 1800,
          height: 736,
          alt: "Heatmap of the share of districts documenting each of seven climate protections, by locale and by enrollment quartile. Both rise from rural to urban and from smallest to largest districts; for heat protection, 7% of rural vs. 32% of urban districts, and 4% of the smallest vs. 40% of the largest.",
          caption: "The same pattern shows up by locale (left) and by district size (right).",
        },
      },
      {
        heading: "It disappears once size is accounted for",
        body: [
          "In a regression with income, poverty, and politics, urban districts document 0.76 more protections than rural ones (95% CI 0.32 to 1.20). Adding district size (log enrollment) changes that to −0.03 (95% CI −0.57 to 0.50): no rural–urban difference left. A district ten times larger documents about 0.55 more protections, holding everything else equal.",
          "The result held when I kept districts with missing values as zeros, added region controls, and refit without the most influential districts.",
        ],
        figure: {
          src: "/work/rural-urban-gap/rural_gap_size.webp",
          width: 1400,
          height: 700,
          alt: "Coefficient plot comparing each locale with rural districts. Without size, urban and suburban districts document about 0.7 more protections; after adjusting for district size, all three estimates sit at or near zero with intervals crossing zero.",
          caption: "Gray: without district size. Blue: adjusting for district size.",
        },
        stats: [
          { value: "+0.76 → −0.03", label: "urban vs. rural gap, before and after size" },
          { value: "+0.55", label: "protections per 10× enrollment" },
          { value: "865", label: "districts in the model" },
        ],
      },
      {
        heading: "Income matters less than expected",
        body: [
          "Community income predicts documented protections on its own, but that relationship disappears once size and political context are included. The share of low-income students shows no consistent relationship. Democratic vote share has a modest positive association. Even so, low-income districts with zero documented protections cluster in the far north and the inland south of the state, which is where follow-up matters most.",
        ],
        figure: {
          src: "/work/rural-urban-gap/protection_predictors.webp",
          width: 1200,
          height: 600,
          alt: "Standardized coefficient plot: district size has a clear positive association with documented protections; Democratic vote share a small positive one; median income and percent low-income students have intervals crossing zero.",
          caption: "Change in documented protections per standard deviation of each predictor. Standard errors clustered by county.",
        },
      },
      {
        heading: "What this doesn't show yet",
        body: [
          "Size explains the rural gap, but size can mean two things: larger districts may have more capacity to act, or more staff to publish what they do. This analysis can't separate those yet; that's the next stage. Everything here is an association, not a cause, the model explains about 18% of the variation, and it measures what districts document publicly, not what they actually do.",
        ],
        figure: {
          src: "/work/rural-urban-gap/income_vs_protection_maps.webp",
          width: 1800,
          height: 810,
          alt: "Three maps of California districts: community median income, number of documented climate protections, and low-income districts with no documented protections, which cluster in the far north and the inland south.",
          caption: "Left to right: community median income, documented protections, and low-income districts with none documented.",
        },
      },
      {
        heading: "The team poster",
        body: [
          "This analysis is one strand of our team's research poster, School Districts in California Are Lagging Behind in Environmental Action, made with Aritra Nag, Nata Petrovi and Kevin Phongsa and mentored by Judy He and Sarah Whiting. It draws on the indicators our team collected this fall from district websites, board policies, social media and local news, using LLM-assisted search with manual verification.",
          "Across the 937 districts, most indicators are rare: only five of the climate practices we tracked are documented by more than 40% of districts. 72% of districts show no documented wildfire readiness, and rural and town districts trail urban and suburban ones at both lower and higher wildfire risk, which fits the size story above. A logistic regression on community-based partnerships found higher English-learner shares going with more partnerships, and higher pollution burden and BIPOC enrollment going with fewer.",
        ],
        figure: {
          src: "/work/rural-urban-gap/team-poster.webp",
          width: 2400,
          height: 1600,
          alt: "Research poster titled School Districts in California Are Lagging Behind in Environmental Action, with sections for introduction, data collection, analysis and conclusion, a bar chart of which climate practices districts publicly document, a bar chart of wildfire readiness by community type and risk, and a logistic regression odds-ratio plot for community-based partnerships.",
          caption: "The finished team poster. Open the PDF for full resolution.",
        },
        stats: [
          { value: "937", label: "California districts tracked" },
          { value: "72%", label: "with no documented wildfire readiness" },
          { value: "15% vs 36%", label: "wildfire-ready: high-risk rural vs. high-risk suburban districts" },
        ],
      },
    ],
    lookingForward:
      "Next: break the gap down by type of action, then test the documentation explanation directly, to see whether smaller districts are doing less or just publishing less. For the team, the goal is an interactive database that lets educators and policymakers track district progress over time.",
    links: [{ label: "Team research poster (PDF)", href: "/work/rural-urban-gap/team-poster.pdf" }],
    note: "My analysis is ongoing; the team poster is finished.",
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
      "Evidence about California K-12 sustainability is scattered across district webpages and policy documents, and finding it by hand is slow. I built a local search tool over 50 of those documents (2,157 passages): ask a question, get the most relevant passages and a short answer that only quotes its sources, or an honest “not enough evidence.”",
    highlights: [
      {
        title: "Keyword, meaning, then a second opinion",
        body:
          "The system combines BM25 keyword search with dense transformer embeddings, then reranks the candidates with a sentence-transformers CrossEncoder. Each stage catches what the one before it misses.",
      },
      {
        title: "More of the right answers up top",
        body: "On 34 development queries, the reranked pipeline found the known source in the top five for 97.1% of questions, versus 88.2% for BM25 alone. That's 33 of 34 versus 30 of 34: promising, but too few questions to call the gain significant (95% CI 0 to 20 points).",
        stat: "97.1%",
        statLabel: "known-source Recall@5 (BM25: 88.2%)",
      },
      {
        title: "Answers that quote instead of invent",
        body: "The local LLM may only answer with verbatim excerpts from the retrieved passages, each cited. Automated checks reject unsupported quotes, and when the evidence is thin the app says so instead of guessing.",
      },
    ],
    lookingForward:
      "Next is a held-out evaluation: about 50 new questions from districts the system has never seen, with passages judged by people rather than matched against a known URL. That's what it takes to turn a promising result into a real one.",
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
        heading: "The problem",
        body: [
          "I wanted to estimate what a California single-family home will sell for from its property details and location, and to be honest about how far off that estimate is likely to be.",
        ],
      },
      {
        heading: "The data",
        body: [
          "I used 309K cleaned single-family sales from CRMLS, January 2024 through April 2026, through a data science internship at IDX Exchange. I added location, property age and school district as features, matching each home to one of 680 school districts with a spatial join.",
        ],
      },
      {
        heading: "How I evaluated it",
        body: [
          "Chronologically, never on a random split. I tuned on earlier months, locked the model, and only then scored April 2026, once. Leakage rules kept list price and other sale-process fields out of the model.",
        ],
      },
      {
        heading: "Results",
        body: [
          "The final model is XGBoost. On the 11,890 April sales inside the training price range, its median error is 7.7%, and 85.5% of homes are estimated within 20% of their sale price. Across all 12,022 April sales, the median error is 7.8%.",
          "In the app, every estimate comes with per-feature contributions, so you can see what pushed the price up or down, and an empirical error range.",
        ],
        stats: [
          { value: "7.7%", label: "median error, 11,890 April sales" },
          { value: "85.5%", label: "of homes within 20% of sale price" },
          { value: "16.5%", label: "median error, linear baseline" },
        ],
      },
      {
        heading: "What didn't work",
        body: [
          "A more powerful model barely mattered. Adding location, property age and school district features took a random forest from 9.2% to 7.8% median error. Switching to gradient boosting improved that by only about 0.1 points. What boosting did change was size: the model went from 268 MB to 4 MB.",
        ],
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
