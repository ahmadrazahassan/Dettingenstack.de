// Legal pages: no disclosure bar, no newsletter band (§11.22).
export default function LegalLayout({ children }: LayoutProps<"/">) {
  return (
    <main id="inhalt" className="flex-1">
      {children}
    </main>
  );
}
