// No `dynamic = "force-dynamic"` here any more: it rendered every Shopify page
// - and every junk path a scanner probes, which lands on this catch-all - on a
// function per request. The page itself opts into on-demand ISR.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="shell py-16 md:py-24">{children}</div>;
}
