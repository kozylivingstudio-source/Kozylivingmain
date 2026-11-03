/**
 * Could this be a Shopify handle? Letters, digits, `-` and `_`, no dots.
 *
 * Dynamic routes check this before asking Shopify. `/[page]` is a catch-all
 * at the root, so every path a vulnerability scanner probes - `/wp-login.php`,
 * `/.env`, `/xmlrpc.php` - lands on it. Each one used to cost a Storefront
 * query and an ISR cache entry of its own; a path that cannot be a handle now
 * goes straight to the not-found page.
 */
const HANDLE = /^[a-z0-9][a-z0-9_-]{0,254}$/i;

export function isPossibleHandle(value: unknown): value is string {
  return typeof value === "string" && HANDLE.test(value);
}
