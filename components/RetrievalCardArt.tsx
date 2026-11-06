/**
 * Card art for the K–12 retrieval card on the home page: the pipeline from the case study,
 * cut down to five words and drawn large enough to read at card size (even on a phone).
 * Same 16:10 shape as the video cards, so cards side by side line up.
 * Colors come from the .c-* and .d-* classes in globals.css, so it follows the theme.
 */

const W = 720;
const H = 450;
const MID = H / 2;

type B = { x: number; y: number; w: number; h: number };

function Node({ b, label, accent }: { b: B; label: string; accent?: boolean }) {
  return (
    <g>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="12" className={`d-box${accent ? " d-box--accent" : ""}`} />
      <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 10} textAnchor="middle" className="d-card-text">{label}</text>
    </g>
  );
}

export default function RetrievalCardArt() {
  const h = 68;
  const query = { x: 20, y: MID - h / 2, w: 116, h };
  const bm25 = { x: 170, y: MID - 40 - h, w: 178, h };
  const emb = { x: 170, y: MID + 40, w: 178, h };
  const rerank = { x: 382, y: MID - h / 2, w: 124, h };
  const ev = { x: 540, y: MID - 92, w: 160, h: 184 };

  const right = (b: B) => [b.x + b.w, b.y + b.h / 2] as const;
  const curve = ([x1, y1]: readonly [number, number], x2: number, y2: number) =>
    `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2 - 4},${y2}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="card-art" role="img" aria-label="A question goes to BM25 keyword search and embedding search, the results are reranked, and the best evidence comes out on top.">
      <defs>
        <pattern id="card-art-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" className="c-grid" />
        </pattern>
        <marker id="card-art-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" className="d-arrow-head" />
        </marker>
      </defs>
      <rect width={W} height={H} className="c-bg" />
      <rect width={W} height={H} fill="url(#card-art-dots)" />

      {[
        curve(right(query), bm25.x, bm25.y + h / 2),
        curve(right(query), emb.x, emb.y + h / 2),
        curve(right(bm25), rerank.x, MID - 14),
        curve(right(emb), rerank.x, MID + 14),
        curve(right(rerank), ev.x, MID),
      ].map((d) => (
        <path key={d} d={d} className="d-arrow" markerEnd="url(#card-art-head)" />
      ))}

      <Node b={query} label="Query" />
      <Node b={bm25} label="BM25" />
      <Node b={emb} label="Embeddings" />
      <Node b={rerank} label="Rerank" />

      {/* Evidence: a short ranked list, the top result in ink */}
      <rect x={ev.x} y={ev.y} width={ev.w} height={ev.h} rx="12" className="d-box d-box--accent" />
      <text x={ev.x + ev.w / 2} y={ev.y + 46} textAnchor="middle" className="d-card-text">Evidence</text>
      {[0, 1, 2].map((k) => (
        <rect key={k} x={ev.x + 22} y={ev.y + 76 + k * 32} width={ev.w - 44 - k * 30} height="16" rx="5" className={k === 0 ? "c-ink" : "c-ink-soft"} />
      ))}
    </svg>
  );
}
