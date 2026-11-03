import type { Metadata } from "next";
import ShopView from "@/components/shop/shop-view";
import { queryPageMetadata } from "@/lib/shop/seo";
import { site } from "@/lib/site";

type Search = { [key: string]: string | string[] | undefined };

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<Search>;
}): Promise<Metadata> {
  return {
    title: "Shop Kollection",
    description:
      "Search craft-led, konscious textiles from Kozy Living - waffle weave, slub cotton, linen blends and Dabu hand-block prints.",
    ...queryPageMetadata("/search", await searchParams),
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  return (
    <ShopView
      basePath="/search"
      eyebrow="All Kompanions"
      title="Your in-between Kompanions"
      description={site.description}
      searchParams={(await searchParams) ?? {}}
    />
  );
}
