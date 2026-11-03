import {
  getArticles,
  getBlogs,
  getCollections,
  getPages,
  getProducts,
} from "@/lib/shopify";
import { SITE_URL } from "@/lib/site-url";
import { MetadataRoute } from "next";

// Rebuilt at most hourly and served from the CDN. It was `force-dynamic`,
// i.e. five Shopify queries per crawler visit, and every URL in it pointed
// at the starter template's `demo-next-store.pages.dev`.
export const revalidate = 3600;

/** Routes built in this repo rather than from Shopify data. */
const STATIC_ROUTES = [
  "",
  "/search",
  "/shop-by-colour",
  "/shop-by-mood",
  "/kit-builder",
  "/the-kozy-story",
  "/founders-note",
  "/about-us",
  "/b2b-enquiries",
  "/contact",
  "/blogs",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // One failing source drops its own URLs, not the whole sitemap - it used
  // to rethrow and 500.
  const settled = await Promise.allSettled([
    getCollections().then((collections) =>
      collections.map((c) => ({ path: c.path, lastModified: c.updatedAt })),
    ),
    getProducts({}).then((products) =>
      products.map((p) => ({
        path: `/product/${p.handle}`,
        lastModified: p.updatedAt,
      })),
    ),
    getPages().then((pages) =>
      pages.map((p) => ({ path: `/${p.handle}`, lastModified: p.updatedAt })),
    ),
    getBlogs().then((blogs) =>
      blogs.map((b) => ({ path: b.path, lastModified: now })),
    ),
    getArticles(100).then((articles) =>
      articles.map((a) => ({ path: a.path, lastModified: a.publishedAt })),
    ),
  ]);

  const entries = [
    ...STATIC_ROUTES.map((path) => ({ path, lastModified: now })),
    ...settled.flatMap((result) => {
      if (result.status === "fulfilled") return result.value;
      console.error("sitemap: a source failed", result.reason);
      return [];
    }),
  ];

  // Some Shopify pages are shadowed by routes of the same name here
  // (/founders-note, /b2b-enquiries); list each URL once.
  const seen = new Set<string>();
  return entries.flatMap(({ path, lastModified }) => {
    const url = `${SITE_URL}${path}`;
    if (seen.has(url)) return [];
    seen.add(url);
    return [{ url, lastModified }];
  });
}
