/**
 * The site's canonical origin, without a trailing slash.
 *
 * One definition for metadata, robots.txt and the sitemap. They used to
 * disagree: robots.txt used `NEXT_PUBLIC_VERCEL_URL` (the per-deployment
 * `*.vercel.app` host) and the sitemap was hard-coded to the starter
 * template's `demo-next-store.pages.dev`, so search engines were pointed at
 * neither the real domain nor a list of its pages.
 *
 * `VERCEL_PROJECT_PRODUCTION_URL` is the production custom domain when one
 * is attached (kozyliving.in), so this is right on Vercel even without
 * `NEXT_PUBLIC_SITE_URL` set.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");
