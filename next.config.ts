import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Pages and the CV from the previous site, so old shared links land on the matching section.
  async redirects() {
    return [
      { source: "/resume", destination: "/#experience", permanent: true },
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/services", destination: "/#skills", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/assets/cv-dinhngocdinh.pdf", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
