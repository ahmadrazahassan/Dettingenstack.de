import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/cards/cards";
import { CostComparison } from "@/components/comparison/cost-comparison";
import {
  ButterflyChart,
  FaceOff,
  FactsComparison,
  IntegrationSplit,
  PersonaPicks,
  QuickVerdict,
  WinnerChip,
} from "@/components/comparison/parts";
import { Byline } from "@/components/content/meta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { MobileStickyCTA } from "@/components/layout/mobile-sticky-cta";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { JsonLd } from "@/components/seo/json-ld";
import { AnalysisNotice, FeatureLegend } from "@/components/tool/blocks";
import { FeatureMatrix } from "@/components/tool/interactive";
import { VendorCTA } from "@/components/tool/vendor-cta";
import { Accordion } from "@/components/ui/disclosure";
import { SectionTabs } from "@/components/ui/section-tabs";
import { comparisons, getAuthor, getComparison, getTool } from "@/data";
import { integrations } from "@/data/integrations";
import {
  categoryOf,
  categoryRanking,
  featureCoverage,
  rankedTool,
  yearOf,
} from "@/lib/derive";
import { priceShort, trialLabel } from "@/lib/labels";
import { CRITERIA, CRITERION_LABELS } from "@/lib/schema";
import { site } from "@/lib/site";

export const instant = false;

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

function load(slug: string) {
  const comparison = getComparison(slug);
  if (!comparison) notFound();
  const a = getTool(comparison.toolA);
  const b = getTool(comparison.toolB);
  if (!a || !b) notFound();
  const category = categoryOf(comparison.category);
  const ra = rankedTool(category, a.slug);
  const rb = rankedTool(category, b.slug);
  if (!ra || !rb) notFound();
  return { comparison, a, b, category, ra, rb };
}

export async function generateMetadata({
  params,
}: PageProps<"/vergleich/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { comparison, a, b } = load(slug);
  return {
    title: {
      absolute: `${a.name} vs. ${b.name} (${yearOf(comparison.updatedAt)}): Der große Vergleich | Dettingenstack`,
    },
    description: comparison.seo.description,
    alternates: { canonical: `/vergleich/${comparison.slug}` },
  };
}

const tabs = [
  { id: "ueberblick", label: "Überblick" },
  { id: "bewertung", label: "Bewertung" },
  { id: "funktionen", label: "Funktionen" },
  { id: "preise", label: "Preise" },
  { id: "integrationen", label: "Integrationen" },
  { id: "fazit", label: "Fazit" },
  { id: "faq", label: "FAQ" },
];

export default async function ComparisonPage({
  params,
}: PageProps<"/vergleich/[slug]">) {
  const { slug } = await params;
  const { comparison, a, b, category, ra, rb } = load(slug);
  const author = getAuthor(comparison.authorId);
  const editor = getAuthor(comparison.editorId);
  const others = categoryRanking(category)
    .filter((r) => r.tool.slug !== a.slug && r.tool.slug !== b.slug)
    .slice(0, 3);
  const year = yearOf(comparison.updatedAt);
  const related = comparisons.filter(
    (c) => c.slug !== comparison.slug && c.category === comparison.category,
  );
  const isDraft =
    a.review.method === "analyse" || b.review.method === "analyse";
  const method =
    a.review.method === "test" && b.review.method === "test"
      ? "test"
      : "analyse";

  return (
    <>
      <Container id="vergleich-kopf" className="pt-10 pb-12">
        <Breadcrumbs
          items={[
            { label: "Vergleiche", href: "/vergleich" },
            { label: category.name, href: `/${category.slug}` },
            { label: `${a.name} vs. ${b.name}` },
          ]}
        />
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className="type-eyebrow eyebrow-square justify-center">
            Vergleich · {category.name}
          </p>
          <h1 className="type-h1 mt-3">
            {a.name} vs. {b.name}: Welche {category.nameSingular} passt besser
            zu dir?
          </h1>
          {author && editor && (
            <div className="mt-6 flex justify-center">
              <Byline
                author={author}
                editor={editor}
                method={method}
                updatedAt={comparison.updatedAt}
              />
            </div>
          )}
        </div>
        <div className="mt-10">
          <FaceOff
            a={{ tool: a, overall: ra.overall }}
            b={{ tool: b, overall: rb.overall }}
            winner={comparison.verdict.winner}
            category={category}
          />
        </div>
        {isDraft && (
          <AnalysisNotice
            checkedAt={
              [a.pricing.checkedAt, b.pricing.checkedAt].sort()[0] ??
              comparison.updatedAt
            }
            className="mt-8"
          />
        )}
        <div className="mt-8">
          <QuickVerdict comparison={comparison} a={a} b={b} />
        </div>
      </Container>

      <SectionTabs items={tabs} label={`${a.name} vs. ${b.name}: Abschnitte`} />

      <Container>
        <section
          id="ueberblick"
          aria-labelledby="ueberblick-titel"
          className="scroll-mt-32 py-16"
        >
          <h2 id="ueberblick-titel" className="type-h2 mb-8">
            {a.name} und {b.name} im Überblick
          </h2>
          <FactsComparison a={a} b={b} category={category} />
        </section>

        <section
          id="bewertung"
          aria-labelledby="bewertung-titel"
          className="scroll-mt-32 border-neutral-200 border-t py-16"
        >
          <h2 id="bewertung-titel" className="type-h2 mb-8">
            Bewertung im Vergleich
          </h2>
          <ButterflyChart a={a} b={b} />
          <p className="type-ui mt-4 text-center text-neutral-700">
            Gesamt:{" "}
            <strong className="text-black">
              {(ra.overall / 10).toFixed(1).replace(".", ",")}
            </strong>{" "}
            ({a.name}) vs.{" "}
            <strong className="text-black">
              {(rb.overall / 10).toFixed(1).replace(".", ",")}
            </strong>{" "}
            ({b.name})
          </p>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {CRITERIA.map((c) => {
              const note = comparison.criteriaNotes[c];
              return (
                <div key={c}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="type-h4">{CRITERION_LABELS[c]}</h3>
                    {note && <WinnerChip winner={note.winner} a={a} b={b} />}
                  </div>
                  <p className="type-small mt-2 text-neutral-800">
                    {note?.note}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="funktionen"
          aria-labelledby="funktionen-titel"
          className="scroll-mt-32 border-neutral-200 border-t py-16"
        >
          <h2 id="funktionen-titel" className="type-h2">
            Funktionen im Vergleich
          </h2>
          <p className="type-lead mt-3">
            {a.name}: {featureCoverage(a, category).yes} von{" "}
            {featureCoverage(a, category).total} Funktionen belegt · {b.name}:{" "}
            {featureCoverage(b, category).yes} von{" "}
            {featureCoverage(b, category).total}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {category.featureGroups.map((g) => {
              const v = comparison.featureGroupVerdicts[g.id];
              return v ? (
                <div key={g.id} className="border-neutral-200 border-b pb-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="type-h4">{g.label}</h3>
                    <WinnerChip winner={v.winner} a={a} b={b} />
                  </div>
                  <p className="type-small mt-2 text-neutral-800">{v.note}</p>
                </div>
              ) : null;
            })}
          </div>
          <div className="mt-10">
            <FeatureMatrix
              tools={[a, b]}
              category={category}
              winners={Object.fromEntries(
                Object.entries(comparison.featureGroupVerdicts).map(
                  ([k, v]) => [k, v.winner],
                ),
              )}
            />
            <div className="mt-4">
              <FeatureLegend />
            </div>
          </div>
        </section>

        <section
          id="preise"
          aria-labelledby="preise-titel"
          className="scroll-mt-32 border-neutral-200 border-t py-16"
        >
          <h2 id="preise-titel" className="type-h2">
            Preise im Vergleich
          </h2>
          <p className="type-lead mt-3 mb-8 max-w-3xl">
            {a.name}: {priceShort(a, category.slug)} · {b.name}:{" "}
            {priceShort(b, category.slug)}. Wähle deine Teamgröße, wir rechnen
            den günstigsten passenden Tarif.
          </p>
          <CostComparison
            a={a}
            b={b}
            unitPlural={category.unitLabel.plural}
            defaultTeam={category.referenceTeams[0] ?? 25}
            max={category.maxTeam}
            category={category.slug}
          />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[a, b].map((t) => (
              <p key={t.slug} className="type-ui-sm text-neutral-600">
                <strong className="text-neutral-800">{t.name}:</strong>{" "}
                {t.pricing.note ?? "Preise laut Anbieter-Website."}{" "}
                <Link
                  href={`/software/${t.slug}/preise` as Route}
                  className="underline underline-offset-2"
                >
                  Alle Tarife
                </Link>
              </p>
            ))}
          </div>
        </section>

        <section
          id="integrationen"
          aria-labelledby="int-titel"
          className="scroll-mt-32 border-neutral-200 border-t py-16"
        >
          <h2 id="int-titel" className="type-h2 mb-8">
            Integrationen
          </h2>
          <IntegrationSplit a={a} b={b} names={integrations} />
          <h3 className="type-h3 mt-14">
            Wechsel von {a.name} zu {b.name} – und umgekehrt
          </h3>
          <p className="type-body mt-3 max-w-3xl text-neutral-800">
            {comparison.migration}
          </p>
        </section>

        <section
          id="fazit"
          aria-labelledby="fazit-titel"
          className="scroll-mt-32 border-neutral-200 border-t py-16"
        >
          <h2 id="fazit-titel" className="type-h2">
            Fazit: {a.name} oder {b.name}?
          </h2>
          <p className="type-lead mt-4 max-w-3xl">
            {comparison.verdict.summary}
          </p>
          <div className="mt-8">
            <PersonaPicks comparison={comparison} a={a} b={b} />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[a, b].map((t) => (
              <div
                key={t.slug}
                className="flex flex-col gap-3 rounded-lg bg-neutral-50 p-6"
              >
                <p className="type-h4">{t.name}</p>
                <p className="type-small text-neutral-700">{t.tagline}</p>
                <VendorCTA
                  tool={t}
                  placement="fazit"
                  className="mt-auto"
                  note={false}
                />
              </div>
            ))}
          </div>
        </section>

        {others.length > 0 && (
          <section
            aria-labelledby="alt-titel"
            className="border-neutral-200 border-t py-16"
          >
            <h2 id="alt-titel" className="type-h2 mb-8">
              Keins von beiden passt?
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {others.map((r) => (
                <ToolCard
                  key={r.tool.slug}
                  slug={r.tool.slug}
                  name={r.tool.name}
                  logo={r.tool.logo?.src}
                  score={r.overall}
                  bestFor={r.tool.bestFor}
                  entryPrice={priceShort(r.tool, category.slug)}
                  trial={trialLabel(r.tool)}
                  affiliate={r.tool.affiliate}
                  reviewHref={`/software/${r.tool.slug}`}
                />
              ))}
            </div>
            {related.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {related.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/vergleich/${c.slug}` as Route}
                      className="link-marker font-medium font-ui text-[15px]"
                    >
                      {getTool(c.toolA)?.name} vs. {getTool(c.toolB)?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section
          id="faq"
          aria-labelledby="faq-titel"
          className="scroll-mt-32 border-neutral-200 border-t py-16"
        >
          <h2 id="faq-titel" className="type-h2 mb-6">
            Häufige Fragen
          </h2>
          <div className="max-w-3xl">
            <Accordion
              type="single"
              items={comparison.faqs.map((f, i) => ({
                id: `faq-${i}`,
                title: f.q,
                content: f.a,
              }))}
            />
          </div>
        </section>
      </Container>

      <NewsletterBand />

      <MobileStickyCTA afterId="vergleich-kopf">
        <div className="grid w-full grid-cols-2 gap-2">
          <VendorCTA
            tool={a}
            placement="sticky-mobile-a"
            size="sm"
            note={false}
          />
          <VendorCTA
            tool={b}
            placement="sticky-mobile-b"
            size="sm"
            note={false}
          />
        </div>
      </MobileStickyCTA>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${a.name} vs. ${b.name}: Der große Vergleich ${year}`,
          inLanguage: "de-DE",
          datePublished: comparison.publishedAt,
          dateModified: comparison.updatedAt,
          author: { "@type": "Organization", name: author?.name ?? site.name },
          mainEntityOfPage: `${site.url}/vergleich/${comparison.slug}`,
          about: [a, b].map((t) => ({
            "@type": "SoftwareApplication",
            name: t.name,
            applicationCategory: "BusinessApplication",
          })),
        }}
      />
    </>
  );
}
