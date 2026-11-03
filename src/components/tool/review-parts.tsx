import { Check, X } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { LeadDialog } from "@/components/forms/lead-form";
import { ScoreBox } from "@/components/tool/score";
import { ToolLogo } from "@/components/tool/tool-logo";
import { VendorCTA } from "@/components/tool/vendor-cta";
import { Table, TableScroll, Td, Th } from "@/components/ui/table";
import { toolsInCategory } from "@/data";
import { formatDate, formatEUR, scoreLabel } from "@/lib/format";
import {
  certLabels,
  minTermLabel,
  perUnit,
  priceShort,
  serverLabels,
  toolUnit,
  trialLabel,
  triLabels,
} from "@/lib/labels";
import { cheapestEligiblePlan } from "@/lib/pricing";
import type { Category, Tool } from "@/lib/schema";

/* ───── Sticky fact card (§11.4) ───── */

export function FactCard({
  tool,
  category,
  overall,
  compareHref,
}: {
  tool: Tool;
  category: Category;
  overall: number;
  compareHref: string;
}) {
  const unit = toolUnit(tool, category.unit);
  const facts: [string, string][] = [
    ["Anbieter", tool.vendor.name],
    ["Sitz", tool.vendor.hq],
    ...(tool.vendor.founded
      ? [["Gegründet", String(tool.vendor.founded)] as [string, string]]
      : []),
    ["Serverstandort", serverLabels[tool.compliance.serverLocation]],
    [
      "Zertifizierungen",
      tool.compliance.certifications.map((c) => certLabels[c]).join(", ") ||
        "Keine angegeben",
    ],
    ["Mindestlaufzeit", minTermLabel(tool)],
  ];
  return (
    <aside
      aria-label={`${tool.name} auf einen Blick`}
      className="rounded-lg border border-neutral-200 bg-white p-6 lg:sticky lg:top-36"
    >
      <div className="flex items-center gap-4">
        <ScoreBox score={overall} size="lg" label={false} />
        <div>
          <p className="type-h4">{scoreLabel(overall)}</p>
          <a href="#bewertung" className="link-marker font-ui text-[14px]">
            Bewertung im Detail
          </a>
        </div>
      </div>
      <div className="mt-6 border-neutral-200 border-t pt-5">
        <p className="tabular font-bold font-display text-[30px] text-black leading-none">
          {priceShort(tool)}
        </p>
        <p className="type-ui-sm mt-1.5 text-neutral-600">
          {priceShort(tool) === "Auf Anfrage"
            ? "Preis nur im Angebot"
            : `${perUnit[unit]} · netto · jährliche Zahlung`}
        </p>
        <ul className="mt-4 flex flex-col gap-1.5 font-ui text-[14px] text-black">
          <li className="flex items-center gap-2">
            {tool.trial.available === "ja" ? (
              <Check aria-hidden className="size-4" strokeWidth={2} />
            ) : (
              <X
                aria-hidden
                className="size-4 text-neutral-400"
                strokeWidth={2}
              />
            )}
            Testversion: {trialLabel(tool)}
          </li>
          <li className="flex items-center gap-2">
            {tool.freePlan === "ja" ? (
              <Check aria-hidden className="size-4" strokeWidth={2} />
            ) : (
              <X
                aria-hidden
                className="size-4 text-neutral-400"
                strokeWidth={2}
              />
            )}
            Kostenlose Version: {triLabels[tool.freePlan]}
          </li>
        </ul>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <VendorCTA tool={tool} placement="factcard" fullWidth />
        <LeadDialog
          tool={{ slug: tool.slug, name: tool.name }}
          vendors={toolsInCategory(category.slug).map((t) => ({
            slug: t.slug,
            name: t.name,
          }))}
          category={{ slug: category.slug, name: category.name }}
        />
        <Link
          href={compareHref as Route}
          className="link-marker self-center font-medium font-ui text-[15px]"
        >
          Mit Alternative vergleichen
        </Link>
      </div>
      <dl className="mt-6 flex flex-col gap-2 border-neutral-200 border-t pt-5">
        {facts.map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between gap-4 font-ui text-[14px]"
          >
            <dt className="text-neutral-600">{k}</dt>
            <dd className="text-right text-black">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="type-ui-sm mt-5 text-neutral-600">
        Preise geprüft am {formatDate(tool.pricing.checkedAt)} ·{" "}
        <a
          href={tool.pricing.sourceUrl}
          rel="noopener"
          className="underline underline-offset-2"
        >
          Quelle: Anbieter
        </a>
      </p>
    </aside>
  );
}

/* ───── Header shared by review, pricing and alternatives pages ───── */

export function ReviewHeader({
  tool,
  title,
  lead,
}: {
  tool: Tool;
  title: string;
  lead: string;
}) {
  return (
    <div className="flex items-start gap-5">
      <ToolLogo
        name={tool.name}
        src={tool.logo?.src}
        size={64}
        className="hidden sm:inline-flex"
      />
      <div className="min-w-0">
        <p className="type-ui-sm text-neutral-600">
          von {tool.vendor.name} · {tool.vendor.hq}
        </p>
        <h1 className="type-h1 mt-2">{title}</h1>
        <p className="type-lead mt-4">{lead}</p>
      </div>
    </div>
  );
}

/* ───── Example costs for typical team sizes (computed) ───── */

export function ExampleCosts({
  tool,
  category,
}: {
  tool: Tool;
  category: Category;
}) {
  const sizes = [...new Set([10, ...category.referenceTeams, 50])].sort(
    (a, b) => a - b,
  );
  return (
    <TableScroll label={`${tool.name}: Beispielkosten`}>
      <Table>
        <thead>
          <tr>
            <Th>Teamgröße</Th>
            <Th>Günstigster passender Tarif</Th>
            <Th className="text-right">pro Monat</Th>
            <Th className="text-right">pro Jahr</Th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((n) => {
            const q = cheapestEligiblePlan(tool, n, "jaehrlich");
            return (
              <tr key={n}>
                <Td>
                  {n} {category.unitLabel.plural}
                </Td>
                <Td>{q ? q.plan.name : "Auf Anfrage"}</Td>
                <Td numeric>{q ? formatEUR(q.cost.cents) : "–"}</Td>
                <Td numeric>{q ? formatEUR(q.cost.cents * 12) : "–"}</Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableScroll>
  );
}

/* ───── Hidden costs and contract terms ───── */

export function HiddenCosts({ tool }: { tool: Tool }) {
  const c = tool.pricing.contract;
  const rows: [string, string][] = [
    ...tool.pricing.oneTimeFees.map(
      (f) =>
        [
          f.label,
          f.amount == null
            ? (f.note ?? "Auf Anfrage")
            : `${f.amount === 0 ? "0,00 €" : formatEUR(f.amount)}${f.note ? ` (${f.note})` : ""}`,
        ] as [string, string],
    ),
    ["Mindestlaufzeit", minTermLabel(tool)],
    ["Kündigungsfrist", c.noticePeriod ?? "Nicht angegeben"],
    ["Monatliche Zahlung möglich", triLabels[c.monthlyBilling]],
  ];
  return (
    <dl className="divide-y divide-neutral-200 border-neutral-200 border-y">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[16rem_1fr] sm:gap-6"
        >
          <dt className="font-ui text-[14px] text-neutral-600">{k}</dt>
          <dd className="font-ui text-[15px] text-black">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PricingNote({ tool }: { tool: Tool }) {
  return (
    <p className="type-ui-sm text-neutral-600">
      {tool.pricing.note && (
        <span className="mb-1 block text-neutral-800">{tool.pricing.note}</span>
      )}
      Preise geprüft am {formatDate(tool.pricing.checkedAt)} · Quelle:{" "}
      <a
        href={tool.pricing.sourceUrl}
        rel="noopener"
        className="underline underline-offset-2"
      >
        Preisseite des Anbieters
      </a>
    </p>
  );
}

export function RelatedComparisonLinks({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  if (!links.length) return null;
  return (
    <ul className="flex flex-col gap-2">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href as Route}
            className="link-marker font-medium font-ui text-[16px]"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
