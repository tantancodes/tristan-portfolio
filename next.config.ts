import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stop `next dev` from generating AGENTS.md in the repo root.
  agentRules: false,
  // The K–12 retrieval case study used to live at /work/ten-strands; keep old links working.
  async redirects() {
    return [{ source: "/work/ten-strands", destination: "/work/k12-retrieval", permanent: true }];
  },
};

export default nextConfig;
