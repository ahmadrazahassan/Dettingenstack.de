import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/cards/cards";
import { Callout, ProsCons, VerdictBox } from "@/components/content/blocks";
import { Byline, ChangeLog } from "@/components/content/meta";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { MobileStickyCTA } from "@/components/layout/mobile-sticky-cta";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { JsonLd } from "@/components/seo/json-ld";
import {
  AnalysisNotice,
  AwardBadges,
  ComplianceTable,
  FactsTable,
  FeatureLegend,
  FeatureList,
  IntegrationChips,
} from "@/components/tool/blocks";
import { PlanCards } from "@/components/tool/interactive";
import {
  ExampleCosts,
  FactCard,
  HiddenCosts,
  PricingNote,
  RelatedComparisonLinks,
  ReviewHeader,
} from "@/components/tool/review-parts";
import { ScoreBox, ScoreBreakdown } from "@/components/tool/score";
import { VendorCTA } from "@/components/tool/vendor-cta";
import { Accordion } from "@/components/ui/disclosure";
import { SectionTabs } from "@/components/ui/section-tabs";
import { comparisonsForTool, getAuthor, getTool, tools } from "@/data";
import {
  categoryOf,
  categoryRanking,
  criterionAverages,
  rankedTool,
  yearOf,
} from "@/lib/derive";
import { toolFaqs } from "@/lib/faq";
import { formatDate } from "@/lib/format";
import {
  channelLabels,
  onboardingLabels,
  priceShort,
  trialLabel,
} from "@/lib/labels";
import { entryPrice } from "@/lib/pricing";
import { CRITERION_LABELS } from "@/lib/schema";
import { weightedRows } from "@/lib/scoring";
import { site } from "@/lib/site";

// Blocking: unknown slugs must return a real 404 (see category page).
export const instant = false;

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

function load(slug: string) {
  const tool = getTool(slug);
  if (!tool) notFound();
  const category = categoryOf(tool.categories.primary);
  const ranked = rankedTool(category, tool.slug);
  if (!ranked) notFound();
  return { tool, category, ranked };
}

export async function generateMetadata({
  params,
}: PageProps<"/software/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { tool } = load(slug);
  const year = yearOf(tool.review.updatedAt);
  const verb = tool.review.method === "test" ? "Test" : "im Check";
  const title = `${tool.name} ${verb} ${year}: Preise, Funktionen & Alternativen`;
  return {
    title: {
      absolute:
        title.length > 60
          ? `${tool.name} ${verb} ${year}: Preise & Funktionen`
          : title,
    },
    description: tool.verdict.short.slice(0, 158),
    alternates: { canonical: `/software/${tool.slug}` },
  };
}

const tabs = [
  { id: "ueberblick", label: "Überblick" },
  { id: "bewertung", label: "Bewertung" },
  { id: "funktionen", label: "Funktionen" },
  { id: "preise", label: "Preise" },
  { id: "vor-und-nachteile", label: "Vor- & Nachteile" },
  { id: "datenschutz", label: "Datenschutz" },
  { id: "alternativen", label: "Alternativen" },
  { id: "faq", label: "FAQ" },
];

export default async function ReviewPage({
  params,
}: PageProps<"/software/[slug]">) {
  const { slug } = await params;
  const { tool, category, ranked } = load(slug);
  const author = getAuthor(tool.review.authorId);
  const editor = getAuthor(tool.review.editorId);
  const averages = criterionAverages(category);
  const comparisons = comparisonsForTool(tool.slug);
  const alternatives = categoryRanking(category)
    .filter((r) => r.tool.slug !== tool.slug)
    .slice(0, 3);
  const faqs = toolFaqs(tool, category);
  const verb = tool.review.method === "test" ? "Test" : "im Check";
  const compareHref = comparisons[0]
    ? `/vergleich/${comparisons[0].slug}`
    : `/${category.slug}#vergleichstabelle`;
  const comparisonLinks = comparisons.map((c) => {
    const other = getTool(c.toolA === tool.slug ? c.toolB : c.toolA);
    return {
      href: `/vergleich/${c.slug}`,
      label: `${tool.name} vs. ${other?.name ?? ""}`,
    };
  });
  const entry = entryPrice(tool);

  return (
    <>
      <Container id="review-kopf" className="pt-10 pb-10">
        <Breadcrumbs
          items={[
            { label: category.name, href: `/${category.slug}` },
            { label: tool.name },
          ]}
        />
        <div className="mt-8">
          <ReviewHeader
            tool={tool}
            title={`${tool.name} ${verb} ${yearOf(tool.review.updatedAt)}: Preise, Funktionen & Alternativen`}
            lead={tool.verdict.short}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <AwardBadges ids={ranked.awards} category={category} />
          </div>
          {author && editor && (
            <div className="mt-6">
              <Byline
                author={author}
                editor={editor}
                method={tool.review.method}
                updatedAt={tool.review.updatedAt}
                pricesCheckedAt={tool.pricing.checkedAt}
              />
            </div>
          )}
          {tool.review.method === "analyse" && (
            <AnalysisNotice
              checkedAt={tool.pricing.checkedAt}
              className="mt-6"
            />
          )}
        </div>
      </Container>

      <SectionTabs items={tabs} label={`${tool.name}: Abschnitte`} />

      <Container className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          <section
            id="ueberblick"
            aria-labelledby="ueberblick-titel"
            className="scroll-mt-36"
          >
            <h2 id="ueberblick-titel" className="sr-only">
              Überblick
            </h2>
            <VerdictBox
              summary={tool.verdict.short}
              idealFor={tool.verdict.idealFor}
              notIdealFor={tool.verdict.notIdealFor}
              score={ranked.overall}
              cta={<VendorCTA tool={tool} placement="verdict" size="sm" />}
            />
            <h3 className="type-h3 mt-12">{tool.name} im Überblick</h3>
            <div className="mt-5">
              <FactsTable tool={tool} category={category} />
            </div>
          </section>

          <section
            id="bewertung"
            aria-labelledby="bewertung-titel"
            className="scroll-mt-36 border-neutral-200 border-t pt-14 mt-14"
          >
            <h2 id="bewertung-titel" className="type-h2">
              So bewerten wir {tool.name}
            </h2>
            <div className="mt-6">
              <Callout
                type="test"
                title={
                  tool.review.method === "test"
                    ? "Aus unserem Test"
                    : "Grundlage dieser Bewertung"
                }
              >
                {tool.review.testSetup}
              </Callout>
            </div>
            <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
              <ScoreBox score={ranked.overall} size="lg" />
              <ScoreBreakdown
                className="flex-1"
                rows={weightedRows(
                  tool,
                  category.scoreWeights,
                  CRITERION_LABELS,
                  averages,
                )}
              />
            </div>
            <p className="type-ui-sm mt-4 text-neutral-600">
              Strich = Durchschnitt der Kategorie {category.name}. Fahre über
              ein Kriterium für die Begründung.
            </p>
          </section>

          <section
            id="funktionen"
            aria-labelledby="funktionen-titel"
            className="scroll-mt-36 border-neutral-200 border-t pt-14 mt-14"
          >
            <h2 id="funktionen-titel" className="type-h2">
              Funktionen im Detail
            </h2>
            <div className="mt-4">
              <FeatureLegend />
            </div>
            <div className="mt-8">
              <FeatureList tool={tool} category={category} />
            </div>
          </section>

          <section
            id="preise"
            aria-labelledby="preise-titel"
            className="scroll-mt-36 border-neutral-200 border-t pt-14 mt-14"
          >
            <h2 id="preise-titel" className="type-h2">
              {tool.name} Preise und Tarife
            </h2>
            <div className="mt-8">
              <PlanCards tool={tool} unit={category.unit} />
            </div>
            <h3 className="type-h3 mt-12">
              Was {tool.name} für dein Team kostet
            </h3>
            <div className="mt-5">
              <ExampleCosts tool={tool} category={category} />
            </div>
            <h3 className="type-h3 mt-12">Einrichtung und Vertrag</h3>
            <div className="mt-5">
              <HiddenCosts tool={tool} />
            </div>
            <div className="mt-5">
              <PricingNote tool={tool} />
            </div>
            <Link
              href={`/software/${tool.slug}/preise` as Route}
              className="link-marker mt-6 inline-block font-medium font-ui text-[16px]"
            >
              Alle Details zu den {tool.name}-Preisen
            </Link>
          </section>

          <section
            id="vor-und-nachteile"
            aria-labelledby="vn-titel"
            className="scroll-mt-36 border-neutral-200 border-t pt-14 mt-14"
          >
            <h2 id="vn-titel" className="type-h2 mb-8">
              Vor- und Nachteile
            </h2>
            <ProsCons pros={tool.pros} cons={tool.cons} />
          </section>

          <section
            id="datenschutz"
            aria-labelledby="ds-titel"
            className="scroll-mt-36 border-neutral-200 border-t pt-14 mt-14"
          >
            <h2 id="ds-titel" className="type-h2 mb-6">
              Datenschutz und Sicherheit
            </h2>
            <ComplianceTable tool={tool} />
            <h3 className="type-h3 mt-12">Integrationen und Support</h3>
            <div className="mt-5">
              <IntegrationChips ids={tool.integrations} />
            </div>
            <p className="type-small mt-4 text-neutral-800">
              Support:{" "}
              {[
                tool.support.languages.includes("de") ? "auf Deutsch" : null,
                ...tool.support.channels.map((c) => channelLabels[c]),
              ]
                .filter(Boolean)
                .join(", ") || "nicht angegeben"}
              . Einführung: {onboardingLabels[tool.support.onboarding]}.
              {tool.support.note ? ` ${tool.support.note}.` : ""}
            </p>
          </section>

          <section
            id="alternativen"
            aria-labelledby="alt-titel"
            className="scroll-mt-36 border-neutral-200 border-t pt-14 mt-14"
          >
            <h2 id="alt-titel" className="type-h2 mb-8">
              Alternativen zu {tool.name}
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {alternatives.map((r) => (
                <ToolCard
                  key={r.tool.slug}
                  slug={r.tool.slug}
                  name={r.tool.name}
                  logo={r.tool.logo?.src}
                  score={r.overall}
                  bestFor={r.tool.bestFor}
                  entryPrice={priceShort(r.tool)}
                  trial={trialLabel(r.tool)}
                  affiliate={r.tool.affiliate}
                  reviewHref={`/software/${r.tool.slug}`}
                />
              ))}
            </div>
            <Link
              href={`/software/${tool.slug}/alternativen` as Route}
              className="link-marker mt-6 inline-block font-medium font-ui text-[16px]"
            >
              Alle {tool.name}-Alternativen im Vergleich
            </Link>
            {comparisonLinks.length > 0 && (
              <div className="mt-10">
                <h3 className="type-h4 mb-3">Vergleiche mit {tool.name}</h3>
                <RelatedComparisonLinks links={comparisonLinks} />
              </div>
            )}
          </section>

          <section
            id="faq"
            aria-labelledby="faq-titel"
            className="scroll-mt-36 border-neutral-200 border-t pt-14 mt-14"
          >
            <h2 id="faq-titel" className="type-h2 mb-6">
              Häufige Fragen zu {tool.name}
            </h2>
            <Accordion
              type="single"
              items={faqs.map((f, i) => ({
                id: `faq-${i}`,
                title: f.q,
                content: f.a,
              }))}
            />
          </section>

          <section
            aria-labelledby="quellen-titel"
            className="mt-14 flex flex-col gap-6 border-neutral-200 border-t pt-10"
          >
            <div>
              <h2 id="quellen-titel" className="type-h4">
                Quellen
              </h2>
              <ol className="mt-3 flex flex-col gap-1.5">
                {tool.sources.map((s, i) => (
                  <li key={s.url} className="type-small text-neutral-700">
                    [{i + 1}] {s.name}:{" "}
                    <a
                      href={s.url}
                      rel="noopener"
                      className="break-all text-black underline underline-offset-2"
                    >
                      {s.url.replace("https://", "")}
                    </a>
                    , abgerufen am {formatDate(s.accessedAt)}
                  </li>
                ))}
              </ol>
            </div>
            <ChangeLog entries={tool.changelog} />
          </section>
        </div>

        <div>
          <FactCard
            tool={tool}
            category={category}
            overall={ranked.overall}
            compareHref={compareHref}
          />
        </div>
      </Container>

      <NewsletterBand />

      <MobileStickyCTA afterId="review-kopf">
        <ScoreBox score={ranked.overall} size="sm" label={false} />
        <span className="min-w-0 flex-1 truncate font-semibold font-ui text-[15px] text-black">
          {tool.name}
        </span>
        <VendorCTA
          tool={tool}
          placement="sticky-mobile"
          size="sm"
          note={false}
          className="shrink-0"
        />
      </MobileStickyCTA>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.name,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: `${site.url}/software/${tool.slug}`,
          ...(entry != null
            ? {
                offers: {
                  "@type": "AggregateOffer",
                  priceCurrency: "EUR",
                  lowPrice: (entry / 100).toFixed(2),
                },
              }
            : {}),
          // Review markup only for hands-on tests; analyses of vendor information get no rating rich result.
          ...(tool.review.method === "test"
            ? {
                review: {
                  "@type": "Review",
                  author: { "@type": "Organization", name: author?.name },
                  datePublished: tool.review.publishedAt,
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: (ranked.overall / 10).toFixed(1),
                    bestRating: 10,
                    worstRating: 0,
                  },
                },
              }
            : {}),
        }}
      />
    </>
  );
}
