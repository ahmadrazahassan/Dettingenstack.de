import { Check } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { ScoreBox } from "@/components/tool/score";
import { ToolLogo } from "@/components/tool/tool-logo";
import { VendorCTA } from "@/components/tool/vendor-cta";
import { Badge } from "@/components/ui/badge";
import { Table, TableScroll, Td, Th } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import { formatScore } from "@/lib/format";
import {
  certLabels,
  minTermLabel,
  priceLine,
  serverLabels,
  trialLabel,
  triLabels,
} from "@/lib/labels";
import {
  type Category,
  type Comparison,
  CRITERIA,
  CRITERION_LABELS,
  type Tool,
} from "@/lib/schema";

type Side = { tool: Tool; overall: number };

/* ───── Face-off hero panels (§11.7) ───── */

function Panel({
  side,
  winner,
  category,
}: {
  side: Side;
  winner: boolean;
  category: Category;
}) {
  const { tool, overall } = side;
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg bg-white p-6 lg:p-8",
        winner ? "border-2 border-black" : "border border-neutral-200",
      )}
    >
      {winner && (
        <Badge variant="award" className="mb-4 self-start">
          Unser Favorit
        </Badge>
      )}
      <div className="flex items-center gap-4">
        <ToolLogo name={tool.name} src={tool.logo?.src} size={64} />
        <div className="min-w-0">
          <h2 className="type-h3">{tool.name}</h2>
          <p className="type-ui-sm text-neutral-600">{tool.bestFor}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <ScoreBox score={overall} size="lg" label={false} />
        <p className="font-ui text-[15px] text-neutral-800">
          {priceLine(tool, category.unit, category.slug)}
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <VendorCTA tool={tool} placement="faceoff" fullWidth note={false} />
        <Link
          href={`/software/${tool.slug}` as Route}
          className="link-marker self-start font-medium font-ui text-[15px]"
        >
          Zur Bewertung von {tool.name}
        </Link>
      </div>
    </div>
  );
}

export function FaceOff({
  a,
  b,
  winner,
  category,
}: {
  a: Side;
  b: Side;
  winner: string;
  category: Category;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
      <Panel side={a} winner={winner === a.tool.slug} category={category} />
      <span className="mx-auto flex size-14 items-center justify-center rounded-md bg-black font-display font-extrabold text-[18px] text-brand">
        vs.
      </span>
      <Panel side={b} winner={winner === b.tool.slug} category={category} />
    </div>
  );
}

/* ───── „Das Ergebnis in 30 Sekunden“ ───── */

export function QuickVerdict({
  comparison,
  a,
  b,
}: {
  comparison: Comparison;
  a: Tool;
  b: Tool;
}) {
  const wins = (slug: string) =>
    CRITERIA.filter((c) => comparison.criteriaNotes[c]?.winner === slug).length;
  return (
    <section
      aria-labelledby="ergebnis"
      className="rounded-lg border border-black p-6 lg:p-8"
    >
      <span className="inline-flex h-7 items-center rounded-sm bg-black px-2.5 font-semibold font-ui text-[13px] text-brand">
        Das Ergebnis in 30 Sekunden
      </span>
      <h2 id="ergebnis" className="sr-only">
        Das Ergebnis in 30 Sekunden
      </h2>
      <p className="type-lead mt-4 text-neutral-800">
        {comparison.verdict.summary}
      </p>
      <p className="type-ui mt-3 text-neutral-700">
        {a.name} gewinnt {wins(a.slug)} von 6 Kriterien, {b.name} {wins(b.slug)}
        ; {6 - wins(a.slug) - wins(b.slug)} unentschieden.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 border-neutral-200 border-t pt-6 md:grid-cols-2">
        {[
          { tool: a, items: comparison.verdict.chooseAIf },
          { tool: b, items: comparison.verdict.chooseBIf },
        ].map(({ tool, items }) => (
          <div key={tool.slug}>
            <p className="mb-3 font-semibold font-ui text-[15px] text-black">
              Nimm {tool.name}, wenn …
            </p>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="type-small flex gap-2.5 text-neutral-800"
                >
                  <Check
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-positive"
                    strokeWidth={2.25}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───── Butterfly chart: A left (black), B right (yellow), criteria in the middle ───── */

export function ButterflyChart({ a, b }: { a: Tool; b: Tool }) {
  return (
    <figure>
      <table className="w-full border-collapse font-ui text-[14px]">
        <caption className="sr-only">
          Bewertung nach Kriterium: {a.name} gegen {b.name}
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="pb-3 text-right font-semibold text-black"
            >
              {a.name}
            </th>
            <th
              scope="col"
              className="pb-3 text-center font-normal text-neutral-600"
            >
              Kriterium
            </th>
            <th scope="col" className="pb-3 text-left font-semibold text-black">
              {b.name}
            </th>
          </tr>
        </thead>
        <tbody>
          {CRITERIA.map((c) => {
            const sa = a.scores[c];
            const sb = b.scores[c];
            return (
              <tr key={c}>
                <td className="w-[40%] py-2">
                  <div className="flex items-center justify-end gap-2">
                    <span
                      className={cn(
                        "tabular font-semibold",
                        sa > sb ? "text-black" : "text-neutral-600",
                      )}
                    >
                      {formatScore(sa)}
                    </span>
                    <span
                      className="h-3 rounded-l-xs bg-chart-1"
                      style={{ width: `${sa}%` }}
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-3 py-2 text-center font-normal text-black text-[13px] leading-tight sm:text-[14px]"
                >
                  {CRITERION_LABELS[c]}
                </th>
                <td className="w-[40%] py-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 rounded-r-xs bg-chart-2 ring-1 ring-black ring-inset"
                      style={{ width: `${sb}%` }}
                    />
                    <span
                      className={cn(
                        "tabular font-semibold",
                        sb > sa ? "text-black" : "text-neutral-600",
                      )}
                    >
                      {formatScore(sb)}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </figure>
  );
}

/* ───── Side-by-side facts ───── */

export function FactsComparison({
  a,
  b,
  category,
}: {
  a: Tool;
  b: Tool;
  category: Category;
}) {
  const rows: [string, (t: Tool) => string][] = [
    ["Anbieter und Sitz", (t) => `${t.vendor.name}, ${t.vendor.hq}`],
    ["Zielgruppe", (t) => t.bestFor],
    ["Startpreis", (t) => priceLine(t, category.unit, category.slug)],
    ["Testversion", (t) => trialLabel(t)],
    ["Kostenlose Version", (t) => triLabels[t.freePlan]],
    ["Mindestlaufzeit", (t) => minTermLabel(t)],
    ["Serverstandort", (t) => serverLabels[t.compliance.serverLocation]],
    [
      "Zertifizierungen",
      (t) =>
        t.compliance.certifications.map((c) => certLabels[c]).join(", ") ||
        "Keine angegeben",
    ],
    ["AVV", (t) => triLabels[t.compliance.avv]],
    ["Single Sign-On", (t) => triLabels[t.compliance.sso]],
  ];
  return (
    <TableScroll label="Fakten im Vergleich">
      <Table className="min-w-[640px]">
        <thead>
          <tr>
            <Th className="w-1/4">Kriterium</Th>
            <Th>{a.name}</Th>
            <Th>{b.name}</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, get]) => (
            <tr key={label}>
              <Th
                scope="row"
                className="h-auto border-b bg-white py-3 font-normal text-neutral-700"
              >
                {label}
              </Th>
              <Td>{get(a)}</Td>
              <Td>{get(b)}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableScroll>
  );
}

/* ───── Verdict chip for a criterion or feature group ───── */

export function WinnerChip({
  winner,
  a,
  b,
}: {
  winner: string;
  a: Tool;
  b: Tool;
}) {
  if (winner === "unentschieden")
    return <Badge variant="neutral">Unentschieden</Badge>;
  const name = winner === a.slug ? a.name : b.name;
  return <Badge variant="award">Vorteil {name}</Badge>;
}

/* ───── Integrations: both / only A / only B ───── */

export function IntegrationSplit({
  a,
  b,
  names,
}: {
  a: Tool;
  b: Tool;
  names: Record<string, string>;
}) {
  const both = a.integrations.filter((i) => b.integrations.includes(i));
  const onlyA = a.integrations.filter((i) => !b.integrations.includes(i));
  const onlyB = b.integrations.filter((i) => !a.integrations.includes(i));
  const col = (title: string, ids: string[]) => (
    <div>
      <p className="mb-3 font-semibold font-ui text-[15px] text-black">
        {title}
      </p>
      {ids.length ? (
        <ul className="flex flex-wrap gap-2">
          {ids.map((id) => (
            <li key={id}>
              <Badge variant="trust">{names[id] ?? id}</Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="type-small text-neutral-600">Keine geprüften Angaben</p>
      )}
    </div>
  );
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {col("Beide", both)}
      {col(`Nur ${a.name}`, onlyA)}
      {col(`Nur ${b.name}`, onlyB)}
    </div>
  );
}

/* ───── Personas: situation → our pick ───── */

export function PersonaPicks({
  comparison,
  a,
  b,
}: {
  comparison: Comparison;
  a: Tool;
  b: Tool;
}) {
  return (
    <TableScroll label="Unsere Empfehlung je Situation">
      <Table className="min-w-[640px]">
        <thead>
          <tr>
            <Th>Situation</Th>
            <Th>Unsere Wahl</Th>
            <Th>Warum</Th>
          </tr>
        </thead>
        <tbody>
          {comparison.personas.map((p) => (
            <tr key={p.label}>
              <Td className="text-black">{p.label}</Td>
              <Td className="whitespace-nowrap font-semibold text-black">
                {p.pick === a.slug
                  ? a.name
                  : p.pick === b.slug
                    ? b.name
                    : "Unentschieden"}
              </Td>
              <Td className="text-[14px]">{p.reason}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableScroll>
  );
}
