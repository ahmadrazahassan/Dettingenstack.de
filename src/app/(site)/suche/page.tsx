import type { Metadata, Route } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { HeroSearch } from "@/components/layout/hero-search";
import { SiteImage } from "@/components/ui/site-image";
import { featuredComparisons } from "@/data/navigation";
import { groupResults, type SearchEntry, searchEntries } from "@/lib/search";
import { searchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Suche",
  robots: { index: false, follow: true },
  alternates: { canonical: "/suche" },
};

// Full results page (§11.23), the target of the WebSite SearchAction. noindex.
export default function SearchPage({ searchParams }: PageProps<"/suche">) {
  const index = searchIndex();
  return (
    <Container className="pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Suche" }]} />
      <Suspense fallback={<SearchHeader index={index} query="" />}>
        <Results index={index} searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

async function Results({
  index,
  searchParams,
}: {
  index: SearchEntry[];
  searchParams: PageProps<"/suche">["searchParams"];
}) {
  const { q } = await searchParams;
  const query = (typeof q === "string" ? q : "").trim().slice(0, 100);
  const results = searchEntries(index, query);
  const groups = groupResults(results);

  return (
    <>
      <SearchHeader
        index={index}
        query={query}
        count={query ? results.length : undefined}
      />

      {query && results.length === 0 && (
        <div className="mt-14 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <SiteImage
            id="C-09"
            sizes="160px"
            className="w-32 shrink-0 sm:w-40"
          />
          <div>
            <h2 className="type-h3">
              Für „{query}“ haben wir nichts gefunden.
            </h2>
            <p className="type-body mt-3 max-w-xl text-neutral-800">
              Versuch es mit einem anderen Begriff, etwa dem Namen einer
              Software oder einer Kategorie – oder starte bei diesen Seiten:
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {[
                { href: "/hr-software", label: "HR-Software" },
                ...featuredComparisons,
                { href: "/software-finder", label: "Software-Finder" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href as Route}
                    className="link-marker font-medium font-ui text-[15px]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {groups.length > 0 && (
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {groups.map(({ group, items }) => (
            <section key={group} aria-labelledby={`gruppe-${group}`}>
              <h2
                id={`gruppe-${group}`}
                className="type-eyebrow eyebrow-square"
              >
                {group}{" "}
                <span className="text-neutral-500">({items.length})</span>
              </h2>
              <ul className="mt-4 divide-y divide-neutral-200 border-neutral-200 border-y">
                {items.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href as Route}
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span className="font-medium font-ui text-[16px] text-black group-hover:underline group-hover:decoration-2 group-hover:decoration-brand group-hover:underline-offset-4">
                        {r.label}
                      </span>
                      <span aria-hidden className="text-neutral-500">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

function SearchHeader({
  index,
  query,
  count,
}: {
  index: SearchEntry[];
  query: string;
  count?: number;
}) {
  return (
    <div className="mt-8 max-w-3xl">
      <h1 className="type-h1">
        {query ? `Suchergebnisse für „${query}“` : "Dettingenstack durchsuchen"}
      </h1>
      {count != null && (
        <p className="type-lead mt-3" aria-live="polite">
          {count === 1 ? "1 Treffer" : `${count} Treffer`}
        </p>
      )}
      <div className="mt-8">
        <HeroSearch key={query} index={index} initialQuery={query} />
      </div>
    </div>
  );
}
