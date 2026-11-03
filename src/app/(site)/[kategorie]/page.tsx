import { BadgeCheck, Euro, ServerCog, Users } from "lucide-react";
import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparisonCard } from "@/components/cards/cards";
import { CategoryPreview } from "@/components/category/preview";
import { RankingCard, RankingTable } from "@/components/category/ranking";
import { Byline } from "@/components/content/meta";
import { Prose } from "@/components/content/prose";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container, SectionHeading } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { JsonLd } from "@/components/seo/json-ld";
import { AnalysisNotice, FeatureLegend } from "@/components/tool/blocks";
import {
  Directory,
  FeatureMatrix,
  TeamCostChart,
} from "@/components/tool/interactive";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/disclosure";
import { StatTile } from "@/components/ui/misc";
import { SectionTabs } from "@/components/ui/section-tabs";
import { SiteImage } from "@/components/ui/site-image";
import {
  comparisonsInCategory,
  getAuthor,
  getCategory,
  getTool,
  liveCategorySlugs,
} from "@/data";
import { categoryImages } from "@/data/images";
import { categories as navCategories } from "@/data/navigation";
import {
  categoryRanking,
  categoryStats,
  criterionAverages,
  yearOf,
} from "@/lib/derive";
import { formatDate, formatEUR } from "@/lib/format";
import { perUnit, priceShort } from "@/lib/labels";
import { CRITERIA, CRITERION_LABELS } from "@/lib/schema";
import { site } from "@/lib/site";

// Live categories get the full hub; the others a noindex preview until their tool data is checked.
export function generateStaticParams() {
  return navCategories.map((c) => ({ kategorie: c.slug }));
}

const previewOf = (slug: string) =>
  (liveCategorySlugs as readonly string[]).includes(slug)
    ? undefined
    : navCategories.find((c) => c.slug === slug);

function load(slug: string) {
  const category = getCategory(slug);
  if (!category) notFound();
  return category;
}

export async function generateMetadata({
  params,
}: PageProps<"/[kategorie]">): Promise<Metadata> {
  const { kategorie } = await params;
  const preview = previewOf(kategorie);
  if (preview) {
    return {
      title: `${preview.name} im Vergleich – in Vorbereitung`,
      description: `${preview.description}: Diese Kategorie bereiten wir gerade vor. Bis dahin findest du hier passende Ratgeber und unsere Prüfkriterien.`,
      robots: { index: false, follow: true },
      alternates: { canonical: `/${preview.slug}` },
    };
  }
  const category = load(kategorie);
  const n = categoryRanking(category).length;
  return {
    title: {
      absolute: `${category.name} Vergleich ${yearOf(category.updatedAt)}: ${n} Tools im Check | Dettingenstack`,
    },
    description: category.seo.description,
    alternates: { canonical: `/${category.slug}` },
  };
}

const tabs = [
  { id: "bestenliste", label: "Bestenliste" },
  { id: "vergleichstabelle", label: "Vergleichstabelle" },
  { id: "preise", label: "Preise" },
  { id: "anbieter", label: "Alle Anbieter" },
  { id: "kaufberatung", label: "Kaufberatung" },
  { id: "vergleiche", label: "Vergleiche" },
  { id: "faq", label: "FAQ" },
];

// Blocking on purpose: unknown slugs must return a real 404, which Suspense streaming can't do.
// Every valid slug is prerendered by generateStaticParams, so this costs nothing in practice.
export const instant = false;

export default async function CategoryPage({
  params,
}: PageProps<"/[kategorie]">) {
  const { kategorie } = await params;
  const preview = previewOf(kategorie);
  if (preview) return <CategoryPreview category={preview} />;
  const category = load(kategorie);
  const ranking = categoryRanking(category);
  const stats = categoryStats(category);
  const averages = criterionAverages(category);
  const author = getAuthor(category.authorId);
  const editor = getAuthor(category.editorId);
  const year = yearOf(category.updatedAt);
  const isAnalysis = ranking.some((r) => r.tool.review.method === "analyse");
  const latestCheck =
    ranking
      .map((r) => r.tool.pricing.checkedAt)
      .sort()
      .at(-1) ?? category.updatedAt;
  const comparisons = comparisonsInCategory(category.slug);
  const { default: Guide } = category.guideMdx
    ? await import(`@/content/category-guides/${category.guideMdx}.mdx`)
    : { default: null };

  return (
    <>
      <Container className="pt-10 pb-12 lg:pt-12">
        <Breadcrumbs
          items={[
            { label: "Kategorien", href: "/kategorien" },
            { label: category.name },
          ]}
        />
        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-eyebrow eyebrow-square">
              Kategorie · {stats.count} Tools im Vergleich
            </p>
            {/* „Dokumentenmanagement-Software“ is wider than a phone at h1 size: soft hyphen, break-words as fallback. */}
            <h1 className="type-h1 mt-3 break-words">
              {category.name.replace(
                "Dokumentenmanagement",
                "Dokumenten­management",
              )}{" "}
              Vergleich {year}:{" "}
              <span className="textmarker">{stats.count} Tools</span> im Check
            </h1>
            <p className="type-lead mt-5">{category.intro}</p>
            {author && editor && (
              <div className="mt-7">
                <Byline
                  author={author}
                  editor={editor}
                  method={
                    ranking.every((r) => r.tool.review.method === "test")
                      ? "test"
                      : "analyse"
                  }
                  updatedAt={category.updatedAt}
                  pricesCheckedAt={latestCheck}
                />
              </div>
            )}
          </div>
          <div className="lg:col-span-5">
            <SiteImage
              id={categoryImages[category.slug]?.illustration ?? "B-14"}
              sizes="(min-width: 1024px) 40vw, 100vw"
              eager
            />
          </div>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-8 border-neutral-200 border-y py-8 lg:grid-cols-4">
          <StatTile
            icon={Users}
            value={String(stats.count)}
            label="Tools verglichen"
          />
          <StatTile
            icon={Euro}
            value={
              stats.minEntryPrice != null ? formatEUR(stats.minEntryPrice) : "–"
            }
            label={`günstigster veröffentlichter Preis ${perUnit[category.unit]}`}
          />
          <StatTile
            icon={ServerCog}
            value={`${stats.serverDE} von ${stats.count}`}
            label="mit Servern in Deutschland"
          />
          <StatTile
            icon={BadgeCheck}
            value={`${stats.publishedPrices} von ${stats.count}`}
            label="mit veröffentlichten Preisen"
          />
        </dl>
        {isAnalysis && (
          <AnalysisNotice checkedAt={latestCheck} className="mt-8" />
        )}
      </Container>

      <SectionTabs items={tabs} label={`${category.name}: Abschnitte`} />

      <Container>
        <section
          id="bestenliste"
          aria-labelledby="bestenliste-titel"
          className="scroll-mt-32 py-16"
        >
          <SectionHeading
            id="bestenliste-titel"
            title={`Die besten ${category.name}-Tools ${year} auf einen Blick`}
          />
          <RankingTable ranking={ranking} category={category} />
          <p className="type-ui-sm mt-3 text-neutral-600">
            Sortiert nach Dettingenstack-Score. Bezahlte Platzierungen
            beeinflussen das Ranking nicht.
          </p>

          <div className="mt-12 rounded-lg bg-neutral-50 p-6 lg:p-8">
            <h3 className="type-h3">So vergleichen wir {category.name}</h3>
            <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-3 font-semibold font-ui text-[15px] text-black">
                  Testaufgaben im Praxistest
                </p>
                <ol className="type-small flex list-decimal flex-col gap-1.5 pl-5 text-neutral-800">
                  {category.testTasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="mb-3 font-semibold font-ui text-[15px] text-black">
                  Gewichtung im Dettingenstack-Score
                </p>
                <ul className="flex flex-col gap-2.5">
                  {CRITERIA.map((c) => (
                    <li
                      key={c}
                      className="grid grid-cols-[minmax(0,11rem)_1fr_3rem] items-center gap-3 font-ui text-[14px]"
                    >
                      <span className="text-black">{CRITERION_LABELS[c]}</span>
                      <span className="h-2 rounded-xs bg-white">
                        <span
                          className="block h-full rounded-xs bg-black"
                          style={{
                            width: `${(category.scoreWeights[c] / Math.max(...CRITERIA.map((k) => category.scoreWeights[k]))) * 100}%`,
                          }}
                        />
                      </span>
                      <span className="tabular text-right text-neutral-700">
                        {Math.round(category.scoreWeights[c] * 100)} %
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={"/methodik" as Route}
                  className="link-marker mt-5 inline-block font-medium font-ui text-[15px]"
                >
                  Zur Methodik
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-6">
            {ranking.map((r) => (
              <RankingCard
                key={r.tool.slug}
                ranked={r}
                category={category}
                averages={averages}
              />
            ))}
          </div>
        </section>

        <section
          id="vergleichstabelle"
          aria-labelledby="matrix-titel"
          className="scroll-mt-32 border-neutral-200 border-t py-16"
        >
          <SectionHeading
            id="matrix-titel"
            title={`${category.name} im direkten Vergleich`}
            intro="Alle Funktionen laut Herstellerangaben. Ein Strich bedeutet: Der Anbieter macht dazu keine Angabe."
          />
          <FeatureMatrix
            tools={ranking.map((r) => r.tool)}
            category={category}
          />
          <div className="mt-4">
            <FeatureLegend />
          </div>
        </section>

        <section
          id="preise"
          aria-labelledby="preise-titel"
          className="scroll-mt-32 border-neutral-200 border-t py-16"
        >
          <SectionHeading
            id="preise-titel"
            title={`Was kostet ${category.name}?`}
            intro="Wähle deine Teamgröße: Wir rechnen den günstigsten passenden Tarif jedes Anbieters, der Preise veröffentlicht."
          />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem]">
            <TeamCostChart
              tools={ranking.map((r) => r.tool)}
              unit={category.unit}
              defaultTeam={category.referenceTeams[0] ?? 25}
              maxTeam={category.maxTeam}
              category={category.slug}
              highlight={ranking[0]?.tool.name}
            />
            <div>
              <p className="mb-3 font-semibold font-ui text-[15px] text-black">
                Einstiegspreise
              </p>
              <ul className="flex flex-col divide-y divide-neutral-200 border-neutral-200 border-y">
                {ranking.map((r) => (
                  <li
                    key={r.tool.slug}
                    className="flex justify-between gap-4 py-2.5 font-ui text-[15px]"
                  >
                    <Link
                      href={`/software/${r.tool.slug}/preise` as Route}
                      className="text-black hover:underline"
                    >
                      {r.tool.name}
                    </Link>
                    <span className="tabular text-right text-neutral-800">
                      {priceShort(r.tool, category.slug)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="type-ui-sm mt-3 text-neutral-600">
                Netto, jährliche Zahlung, Stand {formatDate(latestCheck)}.
              </p>
              <div className="mt-6 flex flex-col items-start gap-3">
                <ButtonLink
                  href={
                    `/kostenrechner?kategorie=${category.slug}&anzahl=${category.referenceTeams[0] ?? 1}` as Route
                  }
                  variant="outline"
                  size="sm"
                >
                  Mit dem Kostenrechner genau berechnen
                </ButtonLink>
                <Link
                  href={`/software-finder?k=${category.slug}` as Route}
                  className="link-marker font-medium font-ui text-[15px]"
                >
                  Software-Finder für {category.nameShort} starten
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="anbieter"
          aria-labelledby="anbieter-titel"
          className="scroll-mt-32 border-neutral-200 border-t py-16"
        >
          <SectionHeading
            id="anbieter-titel"
            title={`Alle ${stats.count} Anbieter`}
          />
          <Directory
            category={category}
            items={ranking.map((r) => ({
              tool: r.tool,
              overall: r.overall,
              entry: priceShort(r.tool, category.slug),
            }))}
          />
        </section>

        {Guide && (
          <section
            id="kaufberatung"
            aria-labelledby="kaufberatung-titel"
            className="scroll-mt-32 border-neutral-200 border-t py-16"
          >
            <SectionHeading
              id="kaufberatung-titel"
              eyebrow="Kaufberatung"
              title={`So findest du die passende ${category.nameSingular}`}
            />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_20rem]">
              <Prose>
                <Guide />
              </Prose>
              <div className="hidden lg:block">
                <SiteImage
                  id={categoryImages[category.slug]?.photo ?? "A-14"}
                  sizes="30vw"
                  ratio="3/2"
                  className="sticky top-36"
                />
              </div>
            </div>
          </section>
        )}

        {comparisons.length > 0 && (
          <section
            id="vergleiche"
            aria-labelledby="vergleiche-titel"
            className="scroll-mt-32 border-neutral-200 border-t py-16"
          >
            <SectionHeading
              id="vergleiche-titel"
              title={`${category.name} im Duell`}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comparisons.map((c) => {
                const a = ranking.find((r) => r.tool.slug === c.toolA);
                const b = ranking.find((r) => r.tool.slug === c.toolB);
                if (!a || !b) return null;
                return (
                  <ComparisonCard
                    key={c.slug}
                    href={`/vergleich/${c.slug}`}
                    category={category.name}
                    updatedAt={c.updatedAt}
                    a={{
                      name: a.tool.name,
                      logo: a.tool.logo?.src,
                      score: a.overall,
                    }}
                    b={{
                      name: b.tool.name,
                      logo: b.tool.logo?.src,
                      score: b.overall,
                    }}
                    verdict={`${c.verdict.summary.split(". ")[0]}.`}
                  />
                );
              })}
            </div>
          </section>
        )}

        <section
          id="faq"
          aria-labelledby="faq-titel"
          className="scroll-mt-32 border-neutral-200 border-t py-16"
        >
          <SectionHeading
            id="faq-titel"
            title={`Häufige Fragen zu ${category.name}`}
          />
          <div className="max-w-3xl">
            <Accordion
              type="single"
              items={category.faqs.map((f, i) => ({
                id: `faq-${i}`,
                title: f.q,
                content: f.a,
              }))}
            />
          </div>
        </section>

        <section
          aria-labelledby="verwandt-titel"
          className="border-neutral-200 border-t py-12"
        >
          <h2 id="verwandt-titel" className="type-h4">
            Verwandte Kategorien
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {category.related.map((slug) => {
              const c = navCategories.find((n) => n.slug === slug);
              return c ? (
                <li key={slug}>
                  <Link
                    href={`/${slug}` as Route}
                    className="inline-flex h-9 items-center rounded-sm bg-neutral-100 px-3 font-ui text-[14px] text-black hover:bg-neutral-200"
                  >
                    {c.name}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </section>
      </Container>

      <NewsletterBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ItemList",
              name: `${category.name} Vergleich ${year}`,
              itemListElement: ranking.map((r) => ({
                "@type": "ListItem",
                position: r.rank,
                url: `${site.url}/software/${r.tool.slug}`,
                name: getTool(r.tool.slug)?.name,
              })),
            },
            {
              "@type": "FAQPage",
              mainEntity: category.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />
    </>
  );
}
