import type { Metadata } from "next";

type Search = Record<string, string | string[] | undefined> | undefined;

/**
 * Canonical + robots for a page whose state lives in the query string (the
 * shop, the shelves, the kit builder).
 *
 * Shop state is URL state by design (CLAUDE.md §6): every filter, sort and
 * page is a plain link. Facets stack, so the URL space is effectively
 * unbounded, and each URL is a full server render. Crawlers walking it are
 * the likeliest cause of the Fast Origin Transfer that paused the Hobby
 * deployment in Nov 2026.
 *
 * - Every variant names the bare page as canonical, so whatever ranks is
 *   the page a shopper should land on.
 * - Any query string means `noindex, nofollow`. NOfollow, not follow: a
 *   crawler that lands on one filtered page must not fan out into every
 *   combination it links to. The bare page links every product anyway.
 *
 * robots.txt already disallows `/*?`; this covers crawlers that reach a
 * filtered URL from outside and ignore or have not read robots.txt.
 */
export function queryPageMetadata(path: string, search: Search): Metadata {
  const filtered = Object.values(search ?? {}).some(
    (value) => value !== undefined,
  );

  return {
    alternates: { canonical: path },
    ...(filtered ? { robots: { index: false, follow: false } } : {}),
  };
}
