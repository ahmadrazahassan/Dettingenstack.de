import type { Metadata, Route } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { AnalysisNotice } from "@/components/tool/blocks";
import { Finder } from "@/components/tools/finder";
import { Skeleton } from "@/components/ui/misc";
import { SiteImage } from "@/components/ui/site-image";
import { categories, getCategory, toolsInCategory } from "@/data";
import { quizzes } from "@/data/quizzes";
import { categoryRanking } from "@/lib/derive";

export const metadata: Metadata = {
  title: "Software-Finder: in zwei Minuten zur passenden Software",
  description:
    "Sechs Fragen zu Teamgröße, Funktionen, Budget und Datenschutz – und du bekommst die drei passendsten Tools für HR, Buchhaltung, CRM, ERP und mehr.",
  // The start page is indexed; quiz states (?k=…) are not separate pages (§8.2).
  alternates: { canonical: "/software-finder" },
};

export default function FinderPage({
  searchParams,
}: PageProps<"/software-finder">) {
  return (
    <Container className="pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Software-Finder" }]} />
      <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <FinderBody searchParams={searchParams} />
          </Suspense>
        </div>
        <div className="hidden lg:col-span-4 lg:block">
          <SiteImage id="B-04" sizes="33vw" />
        </div>
      </div>
    </Container>
  );
}

async function FinderBody({
  searchParams,
}: {
  searchParams: PageProps<"/software-finder">["searchParams"];
}) {
  const { k } = await searchParams;
  const category = typeof k === "string" ? getCategory(k) : undefined;

  if (!category) {
    return (
      <>
        <p className="type-eyebrow eyebrow-square">Software-Finder</p>
        <h1 className="type-h1 mt-3">
          In zwei Minuten zur{" "}
          <span className="textmarker">passenden Software</span>
        </h1>
        <p className="type-lead mt-4 max-w-2xl">
          Wähle eine Kategorie. Sechs Fragen später bekommst du die drei
          passendsten Tools – mit Begründung, Kosten und Datenschutz-Check.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/software-finder?k=${c.slug}` as Route}
                className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-white px-5 py-4 font-semibold font-ui text-[16px] text-black transition-colors hover:border-black"
              >
                {c.name}
                <span className="type-ui-sm font-normal text-neutral-600">
                  {toolsInCategory(c.slug).length} Tools
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="type-ui-sm mt-6 text-neutral-600">
          Keine Anmeldung nötig. Deine Antworten speichern wir nicht.
        </p>
      </>
    );
  }

  const ranking = categoryRanking(category);
  return (
    <>
      <p className="type-eyebrow eyebrow-square">
        Software-Finder · {category.name}
      </p>
      <h1 className="type-h1 mt-3">
        In zwei Minuten zur{" "}
        <span className="textmarker">passenden {category.nameSingular}</span>
      </h1>
      <Link
        href={"/software-finder" as Route}
        className="link-marker mt-4 inline-block font-medium font-ui text-[15px]"
      >
        Andere Kategorie wählen
      </Link>
      {ranking.some((r) => r.tool.review.method === "analyse") && (
        <AnalysisNotice checkedAt={category.updatedAt} className="mt-6" />
      )}
      <div className="mt-10">
        <Finder
          key={category.slug}
          category={category}
          tools={ranking.map((r) => r.tool)}
          questions={quizzes[category.slug]}
          overall={Object.fromEntries(
            ranking.map((r) => [r.tool.slug, r.overall]),
          )}
        />
      </div>
    </>
  );
}
