"use client";

import NextLink from "next/link";
import { useState, type ComponentProps } from "react";

type Props = ComponentProps<typeof NextLink>;

/**
 * `next/link`, prefetching on INTENT instead of on sight. Every `<Link>` in
 * the app imports this one (`import Link from "@/components/ui/intent-link"`).
 *
 * In production a plain `<Link>` prefetches its route as soon as it scrolls
 * into view. That multiplies requests: one homepage view put the header
 * menu, the footer, the category-pill marquee (several copies of the menu)
 * and every product card in flight at once, and a dynamic route such as
 * `/search/<collection>` is a function call for each one. On the Hobby plan
 * that is Fast Origin Transfer spent on pages nobody opened.
 *
 * Here a link prefetches when a pointer rests on it, it takes keyboard
 * focus, or a finger touches it - the pattern from Next's prefetching guide
 * (`prefetch={active ? null : false}`). A touch gives ~100 ms of head start
 * before the click; the route skeletons cover the rest.
 *
 * An explicit `prefetch` from the caller always wins. `prefetch={false}`
 * stays off even on hover (the shop's filter links, which render a function
 * per combination), and `prefetch` / `prefetch={true}` keeps eager
 * prefetching for the few links worth it (the logo to `/`).
 */
export default function IntentLink({
  prefetch,
  onMouseEnter,
  onTouchStart,
  onFocus,
  ...props
}: Props) {
  const [intent, setIntent] = useState(false);

  return (
    <NextLink
      {...props}
      prefetch={prefetch !== undefined ? prefetch : intent ? null : false}
      onMouseEnter={(event) => {
        setIntent(true);
        onMouseEnter?.(event);
      }}
      onTouchStart={(event) => {
        setIntent(true);
        onTouchStart?.(event);
      }}
      onFocus={(event) => {
        setIntent(true);
        onFocus?.(event);
      }}
    />
  );
}
