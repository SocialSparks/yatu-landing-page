import path from "node:path";
import type {NextConfig} from "next";
import {initOpenNextCloudflareForDev} from "@opennextjs/cloudflare";

/**
 * Donne a `next dev` les memes bindings que le Worker deploye - la D1 locale
 * comprise, sans quoi `/api/forms` n'aurait nulle part ou ecrire hors de
 * `npm run preview`.
 *
 * Garde sur NODE_ENV : appele pendant `next build`, il demarrerait une miniflare
 * a chaque build. La fonction est async mais n'a pas besoin d'etre attendue.
 */
if (process.env.NODE_ENV === "development") void initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // OpenNext bundles this traced standalone output into .open-next/worker.js.
  output: "standalone",
  // A stray lockfile in the home directory otherwise wins the root inference.
  outputFileTracingRoot: path.join(__dirname),
  // Nothing to gain from announcing the framework on every response.
  poweredByHeader: false,

  /**
   * The photos and mockups under public/ are content-stable: they are replaced
   * by a new file rather than edited in place. Caching them for a year takes
   * them off the critical path on every page after the first - which is what
   * the Core Web Vitals field data actually measures.
   */
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: '</llms.txt>; rel="describedby"; type="text/plain"',
          },
        ],
      },
      {
        source: "/:dir(assets|mockups)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
