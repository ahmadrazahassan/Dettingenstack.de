"use client";

import { Printer, RotateCcw, Share2, X } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { FeatureMark } from "@/components/tool/blocks";
import { ScoreBox } from "@/components/tool/score";
import { ToolLogo } from "@/components/tool/tool-logo";
import { Checkbox, RangeWithStepper, Select } from "@/components/ui/controls";
import { EmptyState } from "@/components/ui/misc";
import { SiteImage } from "@/components/ui/site-image";
import { GroupRow, Table, TableScroll, Td, Th } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/cn";
import { formatEUR, formatScore } from "@/lib/format";
import {
  certLabels,
  minTermLabel,
  serverLabels,
  trialLabel,
  triLabels,
} from "@/lib/labels";
import { cheapestEligiblePlan } from "@/lib/pricing";
import {
  type Category,
  type CategorySlug,
  CRITERIA,
  CRITERION_LABELS,
  type Tool,
} from "@/lib/schema";

export type CompareItem = {
  tool: Tool;
  overall: number;
  categorySlug: CategorySlug;
  categoryName: string;
};
const MAX = 4;

// Vergleichstool (§11.9, §12.1). State lives in the URL: /vergleichen?tools=a,b,c&anzahl=25
export function CompareTool({
  items,
  categories,
}: {
  items: CompareItem[];
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const toast = useToast();
  const [onlyDiff, setOnlyDiff] = useState(false);

  const selected = (params.get("tools") ?? "")
    .split(",")
    .map((s) => items.find((i) => i.tool.slug === s))
    .filter((i): i is CompareItem => Boolean(i))
    .slice(0, MAX);
  // Units, team default and feature taxonomy follow the categories of the selected tools (first one leads).
  const selectedCategories = [
    ...new Set(selected.map((s) => s.categorySlug)),
  ].flatMap((slug) => categories.filter((c) => c.slug === slug));
  const category = selectedCategories[0] ?? categories[0];
  if (!category) return null;
  const team = Math.min(
    500,
    Math.max(
      1,
      Number(params.get("anzahl")) || category.referenceTeams[0] || 25,
    ),
  );

  const update = (slugs: string[], anzahl = team) => {
    const q = new URLSearchParams();
    if (slugs.length) q.set("tools", slugs.join(","));
    q.set("anzahl", String(anzahl));
    router.replace(`${pathname}?${q.toString()}` as Route, { scroll: false });
  };
  const slugs = selected.map((s) => s.tool.slug);
  const crossCategory = new Set(selected.map((s) => s.categoryName)).size > 1;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Link kopiert");
    } catch {
      toast("Der Link konnte nicht kopiert werden.");
    }
  };

  type Row = { label: string; values: string[]; best?: number[] };
  const best = (nums: (number | null)[], higher: boolean) => {
    const valid = nums.filter((n): n is number => n != null);
    if (valid.length < 2 || new Set(valid).size === 1) return [];
    const target = higher ? Math.max(...valid) : Math.min(...valid);
    return nums.flatMap((n, i) => (n === target ? [i] : []));
  };
  const keep = (r: Row) => !onlyDiff || new Set(r.values).size > 1;

  const prices = selected.map((s) =>
    cheapestEligiblePlan(s.tool, team, "jaehrlich", [], s.categorySlug),
  );
  const sections: { title: string; rows: Row[] }[] = [
    {
      title: "Bewertung",
      rows: [
        {
          label: "Dettingenstack-Score",
          values: selected.map((s) => formatScore(s.overall)),
          best: best(
            selected.map((s) => s.overall),
            true,
          ),
        },
        ...CRITERIA.map((c) => ({
          label: CRITERION_LABELS[c],
          values: selected.map((s) => formatScore(s.tool.scores[c])),
          best: best(
            selected.map((s) => s.tool.scores[c]),
            true,
          ),
        })),
      ],
    },
    {
      title: `Preise für ${team} ${category.unitLabel.plural}`,
      rows: [
        {
          label: "Kosten pro Monat (netto, jährlich)",
          values: prices.map((p) =>
            p ? formatEUR(p.cost.cents) : "Auf Anfrage",
          ),
          best: best(
            prices.map((p) => p?.cost.cents ?? null),
            false,
          ),
        },
        {
          label: "Günstigster Tarif",
          values: prices.map((p) => p?.plan.name ?? "–"),
        },
        {
          label: "Testversion",
          values: selected.map((s) => trialLabel(s.tool)),
        },
        {
          label: "Mindestlaufzeit",
          values: selected.map((s) => minTermLabel(s.tool)),
        },
      ],
    },
    {
      title: "Datenschutz",
      rows: [
        {
          label: "Serverstandort",
          values: selected.map(
            (s) => serverLabels[s.tool.compliance.serverLocation],
          ),
        },
        {
          label: "AVV",
          values: selected.map((s) => triLabels[s.tool.compliance.avv]),
        },
        {
          label: "Zertifizierungen",
          values: selected.map(
            (s) =>
              s.tool.compliance.certifications
                .map((c) => certLabels[c])
                .join(", ") || "Keine angegeben",
          ),
        },
        {
          label: "Single Sign-On",
          values: selected.map((s) => triLabels[s.tool.compliance.sso]),
        },
      ],
    },
  ];

  const options = items.map((i) => ({
    value: i.tool.slug,
    label: i.tool.name,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: MAX }, (_, i) => {
          const item = selected[i];
          return item ? (
            <div
              key={item.tool.slug}
              className="flex h-14 items-center gap-3 rounded-md border border-black bg-white px-3"
            >
              <ToolLogo
                name={item.tool.name}
                src={item.tool.logo?.src}
                size={32}
              />
              <span className="min-w-0 flex-1 truncate font-semibold font-ui text-[15px] text-black">
                {item.tool.name}
              </span>
              <button
                type="button"
                aria-label={`${item.tool.name} entfernen`}
                onClick={() =>
                  update(slugs.filter((s) => s !== item.tool.slug))
                }
                className="flex size-8 items-center justify-center rounded-sm text-neutral-600 hover:bg-neutral-100 hover:text-black"
              >
                <X aria-hidden className="size-4" strokeWidth={2} />
              </button>
            </div>
          ) : (
            <Select
              // biome-ignore lint/suspicious/noArrayIndexKey: empty slots are positional.
              key={`slot-${i}`}
              aria-label={`Tool ${i + 1} auswählen`}
              placeholder="+ Tool hinzufügen"
              options={options.filter((o) => !slugs.includes(o.value))}
              onValueChange={(v) => update([...slugs, v])}
              className="h-14 border-dashed"
            />
          );
        })}
      </div>

      {selected.length < 2 ? (
        <EmptyState
          spot={<SiteImage id="C-10" sizes="160px" />}
          title="Wähle mindestens zwei Tools aus"
          text="Füge oben Tools hinzu oder starte mit einem unserer redaktionellen Vergleiche."
          action={
            <Link
              href={"/vergleich" as Route}
              className="link-marker font-medium font-ui text-[16px]"
            >
              Alle Vergleiche ansehen
            </Link>
          }
        />
      ) : (
        <>
          {crossCategory && (
            <p className="rounded-md border border-neutral-200 bg-neutral-50 p-4 type-small text-neutral-800">
              Diese Tools gehören zu unterschiedlichen Kategorien – Funktionen
              sind nur eingeschränkt vergleichbar.
            </p>
          )}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between print:hidden">
            <RangeWithStepper
              label="Teamgröße"
              unitLabel={category.unitLabel.plural}
              value={team}
              onValueChange={(n) => update(slugs, n)}
              max={500}
              className="lg:max-w-xl lg:flex-1"
            />
            <div className="flex flex-wrap items-center gap-2">
              <Checkbox
                label="Nur Unterschiede"
                checked={onlyDiff}
                onCheckedChange={(v) => setOnlyDiff(v === true)}
              />
              <ToolbarButton
                icon={Share2}
                label="Link kopieren"
                onClick={copyLink}
              />
              <ToolbarButton
                icon={Printer}
                label="Drucken"
                onClick={() => window.print()}
              />
              <ToolbarButton
                icon={RotateCcw}
                label="Zurücksetzen"
                onClick={() => update([])}
              />
            </div>
          </div>

          <TableScroll label="Vergleichstabelle">
            <Table className="min-w-[720px]">
              <thead className="sticky top-0">
                <tr>
                  <Th className="w-56">Kriterium</Th>
                  {selected.map((s) => (
                    <Th key={s.tool.slug}>
                      <span className="flex items-center gap-3 py-2">
                        <ToolLogo
                          name={s.tool.name}
                          src={s.tool.logo?.src}
                          size={32}
                        />
                        <ScoreBox score={s.overall} size="sm" label={false} />
                        <Link
                          href={`/software/${s.tool.slug}` as Route}
                          className="hover:underline"
                        >
                          {s.tool.name}
                        </Link>
                      </span>
                    </Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => {
                  const rows = section.rows.filter(keep);
                  return rows.length ? (
                    <Fragment key={section.title}>
                      <GroupRow
                        label={section.title}
                        colSpan={selected.length + 1}
                      />
                      {rows.map((r) => (
                        <tr key={r.label}>
                          <Td className="text-neutral-700">{r.label}</Td>
                          {r.values.map((v, i) => (
                            <Td
                              key={selected[i]?.tool.slug}
                              className={cn(
                                r.best?.includes(i) &&
                                  "bg-brand-50 font-semibold text-black",
                              )}
                            >
                              {v}
                            </Td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ) : null;
                })}
                {selectedCategories
                  .flatMap((c) =>
                    c.featureGroups.map((g) => ({
                      ...g,
                      key: `${c.slug}-${g.id}`,
                      label:
                        selectedCategories.length > 1
                          ? `${c.nameShort}: ${g.label}`
                          : g.label,
                    })),
                  )
                  .map((g) => {
                    const rows = g.features.filter(
                      (f) =>
                        !onlyDiff ||
                        new Set(
                          selected.map(
                            (s) => s.tool.features[f.id]?.status ?? "unbekannt",
                          ),
                        ).size > 1,
                    );
                    return rows.length ? (
                      <Fragment key={g.key}>
                        <GroupRow
                          label={g.label}
                          colSpan={selected.length + 1}
                        />
                        {rows.map((f) => (
                          <tr key={f.id}>
                            <Td className="text-neutral-700">{f.label}</Td>
                            {selected.map((s) => (
                              <Td key={s.tool.slug}>
                                <FeatureMark
                                  state={
                                    s.tool.features[f.id]?.status ?? "unbekannt"
                                  }
                                />
                              </Td>
                            ))}
                          </tr>
                        ))}
                      </Fragment>
                    ) : null;
                  })}
              </tbody>
            </Table>
          </TableScroll>
          <p className="type-ui-sm text-neutral-600">
            Gelb hinterlegt: bester Wert der Zeile. Preise netto bei jährlicher
            Zahlung; „Auf Anfrage“ = kein veröffentlichter Preis.
          </p>
        </>
      )}
    </div>
  );
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Printer;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-2 rounded-md px-3 font-medium font-ui text-[14px] text-black hover:bg-neutral-100"
    >
      <Icon aria-hidden className="size-4" strokeWidth={1.75} />
      {label}
    </button>
  );
}
