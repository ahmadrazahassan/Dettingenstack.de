// Affiliate links are labelled at the link itself („*Werbelink“) and in the footer (§14.2).
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <main id="inhalt" className="flex-1">
      {children}
    </main>
  );
}
