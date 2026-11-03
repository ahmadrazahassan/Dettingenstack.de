import type { Route } from "next";
import Link from "next/link";
import { CompareToggle } from "@/components/compare/compare-provider";
import { ProsCons } from "@/components/content/blocks";
import {
  AwardBadges,
  ComplianceTable,
  FeatureList,
  KeyFacts,
} from "@/components/tool/blocks";
import { ScoreBox, ScoreBreakdown } from "@/components/tool/score";
import { ToolLogo } from "@/components/tool/tool-logo";
import { VendorCTA } from "@/components/tool/vendor-cta";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/disclosure";
import { Table, TableScroll, Td, Th } from "@/components/ui/table";
import type { RankedTool } from "@/lib/derive";
import { awardLabel } from "@/lib/derive";
import { priceShort, trialLabel } from "@/lib/labels";
import { type Category, CRITERION_LABELS, type Criterion } from "@/lib/schema";
import { weightedRows } from "@/lib/scoring";

const reviewHref = (slug: string) => `/software/${slug}` as Route;

/* ───── „Auf einen Blick“ ───── */

export function RankingTable({
  ranking,
  category,
}: {
  ranking: RankedTool[];
  category: Category;
}) {
  return (
    <>
      <TableScroll
        label={`${category.name}: Bestenliste`}
        className="hidden md:block"
      >
        <Table>
          <thead>
            <tr>
              <Th className="w-16">Rang</Th>
              <Th>Software</Th>
              <Th>Am besten für</Th>
              <Th>Score</Th>
              <Th>Startpreis</Th>
              <Th>Testversion</Th>
              <Th>
                <span className="sr-only">Anbieter</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((r) => (
              <tr key={r.tool.slug}>
                <Td className="tabular font-bold font-display text-[20px] text-neutral-400">
                  {String(r.rank).padStart(2, "0")}
                </Td>
                <Td>
                  {/* min width: names and award labels must not break letter by letter in narrow panes */}
                  <div className="flex min-w-60 items-center gap-3">
                    <ToolLogo
                      name={r.tool.name}
                      src={r.tool.logo?.src}
                      size={32}
                    />
                    <div>
                      <Link
                        href={reviewHref(r.tool.slug)}
                        className="font-semibold text-black hover:underline"
                      >
                        {r.tool.name}
                      </Link>
                      {r.awards[0] && (
                        <span className="type-ui-sm block text-neutral-700">
                          {awardLabel(r.awards[0], category)}
                        </span>
                      )}
                    </div>
                  </div>
                </Td>
                <Td className="min-w-44 max-w-56 text-[14px]">
                  {r.tool.bestFor}
                </Td>
                <Td>
                  <ScoreBox score={r.overall} size="sm" label={false} />
                </Td>
                <Td className="whitespace-nowrap">
                  {priceShort(r.tool, category.slug)}
                </Td>
                <Td className="whitespace-nowrap">{trialLabel(r.tool)}</Td>
                <Td>
                  <VendorCTA
                    tool={r.tool}
                    placement="ranking-table"
                    size="sm"
                    note={false}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableScroll>

      <ol className="flex flex-col divide-y divide-neutral-200 rounded-lg border border-neutral-200 md:hidden">
        {ranking.map((r) => (
          <li key={r.tool.slug} className="flex items-center gap-3 p-4">
            <span className="tabular w-7 font-bold font-display text-[18px] text-neutral-400">
              {String(r.rank).padStart(2, "0")}
            </span>
            <ToolLogo name={r.tool.name} src={r.tool.logo?.src} size={32} />
            <div className="min-w-0 flex-1">
              <Link
                href={reviewHref(r.tool.slug)}
                className="block font-semibold font-ui text-black"
              >
                {r.tool.name}
              </Link>
              <span className="type-ui-sm block text-neutral-600">
                {priceShort(r.tool, category.slug)}
              </span>
            </div>
            <ScoreBox score={r.overall} size="sm" label={false} />
          </li>
        ))}
      </ol>
      {ranking.some((r) => r.tool.affiliate?.active) && (
        <p className="type-ui-sm mt-3 text-neutral-600">*Werbelink</p>
      )}
    </>
  );
}

/* ───── Detailed ranking card ───── */

export function RankingCard({
  ranked,
  category,
  averages,
}: {
  ranked: RankedTool;
  category: Category;
  averages: Record<Criterion, number>;
}) {
  const { tool, overall, rank, awards } = ranked;
  return (
    <article
      id={`platz-${rank}`}
      className="scroll-mt-36 rounded-lg border border-neutral-200 bg-white p-5 sm:p-8"
    >
      <div className="flex flex-wrap items-start gap-5">
        <span className="tabular font-bold font-display text-[40px] text-neutral-300 leading-none">
          {String(rank).padStart(2, "0")}
        </span>
        <ToolLogo name={tool.name} src={tool.logo?.src} size={64} />
        <div className="min-w-0 flex-1">
          <h3 className="type-h3">
            <Link href={reviewHref(tool.slug)} className="hover:underline">
              {tool.name}
            </Link>
          </h3>
          <p className="type-small mt-1 text-neutral-700">{tool.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <AwardBadges ids={awards} category={category} />
          </div>
        </div>
        <ScoreBox score={overall} size="md" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <p className="type-body text-neutral-800">{tool.verdict.short}</p>
          <KeyFacts tool={tool} category={category} className="mt-6" />
        </div>
        <ScoreBreakdown
          rows={weightedRows(
            tool,
            category.scoreWeights,
            CRITERION_LABELS,
            averages,
          )}
        />
      </div>

      <div className="mt-8">
        <ProsCons pros={tool.pros.slice(0, 3)} cons={tool.cons.slice(0, 3)} />
      </div>

      <Accordion
        className="mt-8"
        items={[
          {
            id: "funktionen",
            title: "Funktionen",
            content: <FeatureList tool={tool} category={category} />,
          },
          {
            id: "datenschutz",
            title: "Datenschutz & Sicherheit",
            content: <ComplianceTable tool={tool} />,
          },
        ]}
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <VendorCTA tool={tool} placement="ranking-card" />
        <ButtonLink href={reviewHref(tool.slug)} variant="outline">
          Zum ausführlichen Test
        </ButtonLink>
        <CompareToggle
          slug={tool.slug}
          name={tool.name}
          className="sm:ml-auto"
        />
      </div>
    </article>
  );
}
