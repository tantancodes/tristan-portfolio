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
};

export type PlayItem = {
  title: string;
  blurb: string;
};

/* ---------- You ---------- */

export const site = {
  name: "Tristan Tan",
  firstName: "Tristan",
  // Hero sentence is split around the inline avatar:  "I'm [photo] Tristan, <tagline>"
  tagline: "a data scientist who builds tools that help people learn and grow.",
  // Replace public/avatar.svg with a real photo (e.g. public/avatar.jpg) and update this path.
  avatar: "/avatar.svg",
  location: "Berkeley, CA",
  email: "tristantan@berkeley.edu",
  github: "https://github.com/tantancodes",
  linkedin: "https://www.linkedin.com/in/tristan-yuhin-tan/", // TODO: your LinkedIn URL
  resume: "/resume.pdf", // TODO: drop your resume at public/resume.pdf
  description:
    "Tristan Tan: data scientist at UC Berkeley (Data Science + Economics '29) building tools that help people learn and grow.",
};

export const about = {
  paragraphs: [
    "I study Data Science and Economics at UC Berkeley (class of 2029). I like problems where a model or a tool is only half the job and the other half is making it useful to the people who rely on it: researchers, teachers, students.",
    "Every week I teach Python to 100+ high schoolers at ANova. Explaining an idea to a room of fifteen-year-olds is the fastest way I know to find out whether I really understand it.",
  ],
};

/* ---------- Work ---------- */

export const projects: Project[] = [
  {
    slug: "egyptology-3d",
    headline: "Anchoring translations to the surface of ancient coffins",
    year: "2026–now",
    org: "UC Berkeley",
    role: "Research Assistant",

    label: "Research platform · Egyptology",
    timeline: "Jan 2026 – present\nURAP apprentice (Jan–Aug), Research Assistant (Sep–)",
    team: "URAP students and a design team, both of which I now lead",
    myRole: "Full-stack and 3D engineering, now team lead",
    skills: ["Next.js", "React Three Fiber", "Supabase", "Postgres + RLS", "Vercel"],
    cover: "coffin",
    goal:
      "Coffin inscriptions are read and translated in one place, while the coffin itself is studied in another. The goal is a single web platform where researchers can open a 3D model of a coffin and attach annotations and translations directly to the spot on the surface they describe.",
    highlights: [
      {
        title: "Clicks that land on the coffin, not the screen",
        body:
          "Using 3D raycasting in React Three Fiber, a click is projected from the camera into the scene to find the exact point it hits on the coffin's mesh. Annotations are stored at that point, so they stay pinned to the right glyphs as you orbit, zoom, or reload.",
      },
      {
        title: "Permissions enforced by the database",
        body:
          "Annotations live in Supabase Postgres with row-level security, so the rules for who can read or edit each note are checked by the database itself, not just hidden in the UI. The app is deployed on Vercel.",
      },
      {
        title: "From apprentice to lead",
        body:
          "I joined through URAP as an apprentice and moved into a Research Assistant role. I now lead the incoming URAP students and the design team: scoping work, reviewing code, and keeping design and engineering in step.",
      },
    ],
    lookingForward:
      // TODO: replace with what's actually next for the project.
      "Next I want to make the platform easy for new students to contribute to, and to grow it from a few models into a collection researchers return to.",
  },

  {
    slug: "bd3d",
    headline: "Predicting 3D scan quality before spending the compute",
    year: "2026", // TODO: confirm year
    org: "Berkeley engineering lab (BD3D)", // TODO: exact lab name
    role: "Undergraduate Researcher", // TODO: confirm title

    label: "Research · Photogrammetry",
    timeline: "2026", // TODO: e.g. "Feb – Jun 2026"
    team: "BD3D research group", // TODO: e.g. "PI, grad mentor, 2 undergrads"
    myRole: "Pipeline, feature engineering, and modeling",
    skills: ["Python", "Agisoft Metashape", "ICP", "Ridge regression", "LOOCV"],
    cover: "mesh",
    goal:
      "Photogrammetry turns a stack of photos into a 3D model, but a full reconstruction is expensive and you only learn whether it worked at the end. The question: can signals from the earliest stages of the pipeline predict the final reconstruction quality before you commit the compute?",
    highlights: [
      {
        title: "A ground truth for 'good'",
        body:
          "I built an Agisoft Metashape pipeline and scored each finished reconstruction against a reference surface using ICP alignment. That gave every run a quality number to predict, and image-overlap graphs from the input photos gave the features to predict it with.",
      },
      {
        title: "Early signals beat the obvious baseline",
        body:
          "With leakage-aware Ridge models (no information from the finished reconstruction allowed into the features), early structure-from-motion features cut leave-one-out RMSE by 13.7% compared with a reprojection-error baseline.",
        stat: "−13.7%",
        statLabel: "LOOCV RMSE vs. baseline",
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
    org: "Ten Strands × UC Berkeley Data Discovery",
    role: "Data Research Intern",

    label: "Applied NLP · Education",
    timeline: "Jan 2026 – present",
    team: "Ten Strands and the UC Berkeley Data Discovery program", // TODO: team size/roles
    myRole: "Retrieval system design and evaluation",
    skills: ["Python", "BM25", "Embeddings", "Neural reranking", "Evaluation"],
    cover: "retrieval",
    goal:
      "California K-12 sustainability work depends on finding the right data sources, and finding them by hand is slow. The goal was a retrieval system that puts the most relevant sources at the top for a given question, so people spend their time using data instead of hunting for it.",
    highlights: [
      {
        title: "Keyword, meaning, then a second opinion",
        body:
          "The system combines BM25 keyword search with embedding-based semantic search, then passes the candidates through a neural reranker. Each stage catches what the one before it misses.",
      },
      {
        title: "More of the right answers up top",
        body: "Measured on held-out queries, Recall@5 improved by 35% over the starting approach.",
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
    year: "2026–now",
    org: "IDX Exchange",
    role: "Data Science Intern",

    label: "Machine learning · Real estate",
    timeline: "Sep 2026 – present",
    team: "IDX Exchange data science interns", // TODO
    myRole: "Data preparation, modeling, and evaluation",
    skills: ["Python", "CRMLS data", "Regression", "Feature engineering"], // TODO: add your actual libraries
    cover: "houses",
    goal:
      "Build a model that estimates the sale price of California homes from CRMLS listing data, and evaluate it on sales it has never seen.",
    highlights: [
      {
        title: "Tested on 12,500+ unseen sales",
        body:
          "All reported numbers come from a held-out set of more than 12,500 sales the model never trained on, so they reflect how it would behave on new listings.",
        stat: "0.911",
        statLabel: "R² on held-out sales",
      },
      {
        title: "Typically within about 8%",
        body:
          "Median absolute percentage error is 8.46%: on a typical home, the estimate lands within roughly 8% of the actual sale price.",
        stat: "8.46%",
        statLabel: "median APE",
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
    skills: ["Python", "FastAPI", "Neon Postgres", "Spotify OAuth"],
    cover: "waveform",
    goal:
      "Build an analytics platform on top of my own Spotify data: sign in with Spotify, store listening history, and use it to power a recommendation engine.",
    highlights: [
      {
        title: "Real sign-in, real data",
        body:
          "Users authenticate with Spotify OAuth, and the FastAPI backend pulls their listening data into a Neon serverless Postgres database.",
      },
      {
        title: "A recommendation engine on top",
        body:
          "With the history stored, a recommendation engine suggests music based on what each user actually listens to.",
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
