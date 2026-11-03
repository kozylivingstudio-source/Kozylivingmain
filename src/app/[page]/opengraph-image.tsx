import OpengraphImage from "@/components/opengraph-image";
import { getPage } from "@/lib/shopify";
import { isPossibleHandle } from "@/lib/shopify/handle";
import { site } from "@/lib/site";

// Rendered once per page, then served from the CDN (social crawlers fetch
// this on every share). Same on-demand ISR as `app/[page]/page.tsx`.
export const revalidate = 3600;
export function generateStaticParams() {
  return [];
}

export default async function Image({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: handle } = await params;
  const page = isPossibleHandle(handle)
    ? await getPage(handle).catch(() => null)
    : null;
  // An unknown handle used to throw on `page.seo` and 500 the route.
  const title = page ? page.seo?.title || page.title : site.name;

  return await OpengraphImage({ title });
}
