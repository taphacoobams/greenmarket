import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/admin/reports", destination: "/admin", permanent: false },
      { source: "/admin/payments", destination: "/admin", permanent: false },
      { source: "/admin/settings", destination: "/admin", permanent: false },
      { source: "/admin/notifications", destination: "/admin", permanent: false },
    ];
  },
  images: {
    // Visuels servis depuis public/ uniquement ; ré-ajouter remotePatterns pour un CDN si besoin.
    // En dev Turbopack/Sharp peut renvoyer 404 sur /_next/image — chargement direct (Image dégradée sans resize).
    // En prod conserve l’optimisation (Sharp installé en dépendance).
    unoptimized: isDev,
  },
};

export default nextConfig;
