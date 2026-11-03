import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Callout, Checklist } from "@/components/content/blocks";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { AnalysisNotice } from "@/components/tool/blocks";
import { ReviewHeader } from "@/components/tool/review-parts";
import { ScoreBox } from "@/components/tool/score";
import { ToolLogo } from "@/components/tool/tool-logo";
import { VendorCTA } from "@/components/tool/vendor-cta";
import { ButtonLink } from "@/components/ui/button";
import { Table, TableScroll, Td, Th } from "@/components/ui/table";
import { comparisons, getTool, tools } from "@/data";
import { categoryOf, categoryRanking, yearOf } from "@/lib/derive";
import { priceShort } from "@/lib/labels";
import { CRITERIA, CRITERION_LABELS, type Tool } from "@/lib/schema";

export const instant = false;

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

function load(slug: string) {
  const tool = getTool(slug);
  if (!tool) notFound();
  const category = categoryOf(tool.categories.primary);
  const alternatives = categoryRanking(category).filter(
    (r) => r.tool.slug !== tool.slug,
  );
  return { tool, category, alternatives };
}

/** Criteria where the alternative scores at least 5 points (0,5 on the 10 scale) higher. */
function betterAt(alt: Tool, base: Tool) {
  return CRITERIA.filter((c) => alt.scores[c] - base.scores[c] >= 5).map(
    (c) => CRITERION_LABELS[c],
  );
}

function comparisonHref(a: string, b: string) {
  const c = comparisons.find(
    (x) => (x.toolA === a && x.toolB === b) || (x.toolA === b && x.toolB === a),
  );
  return c ? `/vergleich/${c.slug}` : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/software/[slug]/alternativen">): Promise<Metadata> {
  const { slug } = await params;
  const { tool, alternatives } = load(slug);
  return {
    title: {
      absolute: `Die ${alternatives.length} besten ${tool.name}-Alternativen ${yearOf(tool.review.updatedAt)} | Dettingenstack`,
    },
    description:
      `${tool.name}-Alternativen im Vergleich: ${alternatives.map((a) => a.tool.name).join(", ")} – mit Preisen, Serverstandort und Stärken.`.slice(
        0,
        158,
      ),
    alternates: { canonical: `/software/${tool.slug}/alternativen` },
  };
}

export default async function AlternativesPage({
  params,
}: PageProps<"/software/[slug]/alternativen">) {
  const { slug } = await params;
  const { tool, category, alternatives } = load(slug);

  return (
    <>
      <Container className="pt-10 pb-16">
        <Breadcrumbs
          items={[
            { label: category.name, href: `/${category.slug}` },
            { label: tool.name, href: `/software/${tool.slug}` },
            { label: "Alternativen" },
          ]}
        />
        <div className="mt-8 max-w-4xl">
          <ReviewHeader
            tool={tool}
            title={`Die ${alternatives.length} besten ${tool.name}-Alternativen ${yearOf(tool.review.updatedAt)}`}
            lead={`Typische Gründe, sich nach einer Alternative umzusehen: ${tool.cons.map((c) => c.title).join(", ")}. Hier sind die Anbieter derselben Kategorie – mit ihren Stärken gegenüber ${tool.name}.`}
          />
          {alternatives.some((a) => a.tool.review.method === "analyse") && (
            <AnalysisNotice
              checkedAt={tool.pricing.checkedAt}
              className="mt-6"
            />
          )}
        </div>

        <section aria-labelledby="ueberblick" className="mt-14">
          <h2 id="ueberblick" className="type-h2 mb-6">
            Alle Alternativen auf einen Blick
          </h2>
          <TableScroll label={`${tool.name}-Alternativen`}>
            <Table className="min-w-[720px]">
              <thead>
                <tr>
                  <Th>Software</Th>
                  <Th>Score</Th>
                  <Th>Besser als {tool.name} bei</Th>
                  <Th>Startpreis</Th>
                </tr>
              </thead>
              <tbody>
                {alternatives.map((r) => (
                  <tr key={r.tool.slug}>
                    <Td>
                      <span className="flex items-center gap-3">
                        <ToolLogo
                          name={r.tool.name}
                          src={r.tool.logo?.src}
                          size={32}
                        />
                        <Link
                          href={`/software/${r.tool.slug}` as Route}
                          className="font-semibold text-black hover:underline"
                        >
                          {r.tool.name}
                        </Link>
                      </span>
                    </Td>
                    <Td>
                      <ScoreBox score={r.overall} size="sm" label={false} />
                    </Td>
                    <Td className="text-[14px]">
                      {betterAt(r.tool, tool).join(", ") || "–"}
                    </Td>
                    <Td className="whitespace-nowrap">{priceShort(r.tool)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableScroll>
        </section>

        <section aria-labelledby="details" className="mt-16">
          <h2 id="details" className="type-h2 mb-8">
            Die Alternativen im Detail
          </h2>
          <ol className="flex flex-col gap-5">
            {alternatives.map((r, i) => {
              const href = comparisonHref(tool.slug, r.tool.slug);
              const better = betterAt(r.tool, tool);
              return (
                <li
                  key={r.tool.slug}
                  className="rounded-lg border border-neutral-200 bg-white p-6 lg:p-8"
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="tabular font-bold font-display text-[32px] text-neutral-300 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ToolLogo
                      name={r.tool.name}
                      src={r.tool.logo?.src}
                      size={48}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="type-h3">{r.tool.name}</h3>
                      <p className="type-small mt-1 text-neutral-700">
                        {r.tool.bestFor}
                      </p>
                    </div>
                    <ScoreBox score={r.overall} size="md" label="beside" />
                  </div>
                  <p className="type-body mt-5 text-neutral-800">
                    {r.tool.verdict.short}
                  </p>
                  {better.length > 0 && (
                    <p className="type-small mt-3 text-neutral-800">
                      <strong className="font-semibold text-black">
                        Stärker als {tool.name}:
                      </strong>{" "}
                      {better.join(", ")}
                    </p>
                  )}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <VendorCTA
                      tool={r.tool}
                      placement="alternatives"
                      size="sm"
                    />
                    <ButtonLink
                      href={(href ?? `/software/${r.tool.slug}`) as Route}
                      variant="outline"
                      size="sm"
                    >
                      {href
                        ? `${tool.name} vs. ${r.tool.name}`
                        : "Zur Bewertung"}
                    </ButtonLink>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section aria-labelledby="wechsel" className="mt-16 max-w-3xl">
          <h2 id="wechsel" className="type-h3 mb-5">
            Wechsel ohne Datenverlust
          </h2>
          <Checklist
            items={[
              "Kündigungsfrist und Laufzeit des bisherigen Vertrags prüfen",
              "Stammdaten, Dokumente und Zeitkonten zum Stichtag exportieren",
              "Übergabemonat für die Lohnabrechnung mit dem Steuerbüro abstimmen",
              "Betriebsrat über das neue System informieren und Rechte festlegen",
              "Einen Abrechnungsmonat parallel laufen lassen",
            ]}
          />
          <div className="mt-6">
            <Callout type="wichtig">
              Lass dir den Datenexport vor der Kündigung zeigen. Manche Anbieter
              liefern Dokumente nur einzeln oder als PDF.
            </Callout>
          </div>
        </section>
      </Container>
      <NewsletterBand />
    </>
  );
}
