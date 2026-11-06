/**
 * The K–12 retrieval pipeline as a diagram, for the Ten Strands case study.
 * Two layouts: wide for desktop, tall for phones (CSS shows one). Colors come from
 * the .d-* classes in globals.css, so it follows the light/dark theme.
 */

type Box = { x: number; y: number; w: number; h: number };

function Stage({ box, tag, title, sub, accent }: { box: Box; tag: string; title: string; sub: string[]; accent?: boolean }) {
  return (
    <g>
      <text x={box.x} y={box.y - 12} className="d-tag">{tag}</text>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="10" className={`d-box${accent ? " d-box--accent" : ""}`} />
      <text x={box.x + 18} y={box.y + 32} className="d-text">{title}</text>
      {sub.map((line, i) => (
        <text key={line} x={box.x + 18} y={box.y + 54 + i * 18} className="d-sub">{line}</text>
      ))}
    </g>
  );
}

/** A ranked list: three rows, the top one in ink. */
function Ranked({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <text x={x} y={y + k * 30 + 15} className="d-sub">{k + 1}</text>
          <rect x={x + 18} y={y + k * 30 + 4} width={w - 18 - k * 28} height="14" rx="4" className={k === 0 ? "c-ink" : "c-ink-soft"} />
        </g>
      ))}
    </g>
  );
}

function Arrow({ d, id }: { d: string; id: string }) {
  return <path d={d} className="d-arrow" markerEnd={`url(#${id})`} />;
}

function Head({ id }: { id: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 Z" className="d-arrow-head" />
    </marker>
  );
}

function Wide() {
  const corpus = { x: 20, y: 90, w: 190, h: 140 };
  const bm25 = { x: 270, y: 40, w: 200, h: 80 };
  const dense = { x: 270, y: 200, w: 200, h: 80 };
  const rerank = { x: 530, y: 90, w: 200, h: 140 };
  const out = { x: 790, y: 90, w: 190, h: 140 };
  return (
    <svg viewBox="0 0 1000 356" className="diagram diagram--wide" aria-hidden="true">
      <defs><Head id="rd-wide" /></defs>
      <Stage box={corpus} tag="01 Corpus" title="50 documents" sub={["2,157 passages from", "district pages and policies"]} />
      <Stage box={bm25} tag="02 Retrieve" title="BM25" sub={["Matches the words"]} />
      <Stage box={dense} tag="" title="Dense embeddings" sub={["Matches the meaning"]} />
      <Stage box={rerank} tag="03 Rerank" title="CrossEncoder" sub={["Scores each question", "and document together"]} />
      <Stage box={out} tag="04 Results" title="Ranked evidence" sub={[]} accent />
      <Ranked x={out.x + 18} y={out.y + 46} w={150} />

      <Arrow id="rd-wide" d="M210,140 C240,140 238,80 266,80" />
      <Arrow id="rd-wide" d="M210,180 C240,180 238,240 266,240" />
      <Arrow id="rd-wide" d="M470,80 C500,80 498,140 526,140" />
      <Arrow id="rd-wide" d="M470,240 C500,240 498,180 526,180" />
      <Arrow id="rd-wide" d="M730,160 L786,160" />

      {/* Evaluation, under the whole pipeline */}
      <path d="M20,310 V300 H980 V310" className="d-eval" />
      <text x="20" y="342" className="d-tag">Exploratory test · 34 development queries · known-source Recall@5</text>
      <text x="620" y="346" className="d-stat">97.1%</text>
      <text x="704" y="346" className="d-sub">reranked</text>
      <text x="790" y="346" className="d-stat">88.2%</text>
      <text x="874" y="346" className="d-sub">BM25</text>
    </svg>
  );
}

function Tall() {
  const corpus = { x: 20, y: 36, w: 380, h: 84 };
  const bm25 = { x: 20, y: 192, w: 180, h: 96 };
  const dense = { x: 220, y: 192, w: 180, h: 96 };
  const rerank = { x: 20, y: 360, w: 380, h: 84 };
  const out = { x: 20, y: 516, w: 380, h: 140 };
  return (
    <svg viewBox="0 0 420 790" className="diagram diagram--tall" aria-hidden="true">
      <defs><Head id="rd-tall" /></defs>
      <Stage box={corpus} tag="01 Corpus" title="50 documents" sub={["2,157 passages from district pages and policies"]} />
      <Stage box={bm25} tag="02 Retrieve" title="BM25" sub={["Matches the words"]} />
      <Stage box={dense} tag="" title="Dense embeddings" sub={["Matches the meaning"]} />
      <Stage box={rerank} tag="03 Rerank" title="CrossEncoder" sub={["Scores each question and document together"]} />
      <Stage box={out} tag="04 Results" title="Ranked evidence" sub={[]} accent />
      <Ranked x={out.x + 18} y={out.y + 50} w={300} />

      <Arrow id="rd-tall" d="M110,120 V170" />
      <Arrow id="rd-tall" d="M310,120 V170" />
      <Arrow id="rd-tall" d="M110,288 V338" />
      <Arrow id="rd-tall" d="M310,288 V338" />
      <Arrow id="rd-tall" d="M210,444 V494" />

      <path d="M20,690 V680 H400 V690" className="d-eval" />
      <text x="20" y="716" className="d-tag">Exploratory test · 34 dev queries · Recall@5</text>
      <text x="20" y="770" className="d-stat">97.1%</text>
      <text x="104" y="770" className="d-sub">reranked</text>
      <text x="220" y="770" className="d-stat">88.2%</text>
      <text x="304" y="770" className="d-sub">BM25</text>
    </svg>
  );
}

export default function RetrievalDiagram() {
  return (
    <figure className="diagram-figure" role="img" aria-label="Retrieval pipeline: 50 district documents (2,157 passages) go to BM25 keyword search and dense embedding search; their results are reranked by a CrossEncoder into a ranked list of evidence. In an exploratory test on 34 development queries, known-source Recall@5 was 97.1% with reranking versus 88.2% for BM25.">
      <Wide />
      <Tall />
    </figure>
  );
}
