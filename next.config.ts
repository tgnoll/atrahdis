import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // URL lama atrahdis.id yang sengaja tidak dibuat ulang: diarahkan ke halaman terdekat (301),
  // supaya link lama dan indeks Google tidak berakhir di 404.
  async redirects() {
    return [
      { source: "/app", destination: "/kontak", statusCode: 301 },
      { source: "/app/:path*", destination: "/kontak", statusCode: 301 },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
