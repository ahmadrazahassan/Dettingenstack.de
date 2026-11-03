import type { Metadata, Route } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { Badge } from "@/components/ui/badge";
import { SiteImage } from "@/components/ui/site-image";
import { getCategory, liveCategorySlugs } from "@/data";
import { categoryImages } from "@/data/images";
import { categories } from "@/data/navigation";
import { categoryStats } from "@/lib/derive";
import { formatEUR } from "@/lib/format";

export const metadata: Metadata = {
  title: "Alle Software-Kategorien",
  description:
    "Alle Software-Kategorien auf Dettingenstack – mit Preisen in Euro, Serverstandort und Funktionen im Vergleich.",
  alternates: { canonical: "/kategorien" },
};

// All categories (§11.2) as large tiles with their illustration (B-11 to B-20). Live categories first.
export default function CategoriesPage() {
  const isLive = (slug: string) =>
    (liveCategorySlugs as readonly string[]).includes(slug);
  const sorted = [...categories].sort(
    (a, b) => Number(isLive(b.slug)) - Number(isLive(a.slug)),
  );

  return (
    <>
      <Container className="pt-10 pb-20">
        <Breadcrumbs items={[{ label: "Kategorien" }]} />
        <h1 className="type-h1 mt-8">Alle Software-Kategorien</h1>
        <p className="type-lead mt-4 max-w-3xl">
          Wir bauen Dettingenstack Kategorie für Kategorie auf – eine
          Bestenliste gibt es erst, wenn Preise, Funktionen und
          Datenschutzangaben geprüft sind.
        </p>
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((c) => {
            const live = isLive(c.slug);
            const data = live ? getCategory(c.slug) : undefined;
            const stats = data ? categoryStats(data) : null;
            const image = categoryImages[c.slug];
            return (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}` as Route}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-colors hover:border-black"
                >
                  {image && (
                    <SiteImage
                      id={image.illustration}
                      ratio="4/3"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="rounded-none"
                    />
                  )}
                  <span className="flex flex-1 flex-col gap-2 p-5">
                    <span className="flex items-center justify-between gap-3">
                      <span className="type-h4 group-hover:underline group-hover:decoration-2 group-hover:decoration-brand group-hover:underline-offset-4">
                        {c.name}
                      </span>
                      {live ? (
                        <Badge variant="positive">Bestenliste</Badge>
                      ) : (
                        <Badge>In Vorbereitung</Badge>
                      )}
                    </span>
                    <span className="type-small text-neutral-700">
                      {c.description}
                    </span>
                    {stats && (
                      <span className="type-ui-sm mt-auto pt-2 text-neutral-600">
                        {stats.count} Tools · ab{" "}
                        {stats.minEntryPrice != null
                          ? formatEUR(stats.minEntryPrice)
                          : "–"}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
      <NewsletterBand />
    </>
  );
}
