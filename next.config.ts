import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stop `next dev` from generating AGENTS.md in the repo root.
  agentRules: false,
};

export default nextConfig;
