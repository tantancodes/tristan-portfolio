import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The photogrammetry case study used to live at /work/bd3d, a name that belongs to the
  // Egyptology viewer. Keep old links (resume, LinkedIn, shared URLs) working.
  async redirects() {
    return [{ source: "/work/bd3d", destination: "/work/reconstruction-quality", permanent: true }];
  },
};

export default nextConfig;
