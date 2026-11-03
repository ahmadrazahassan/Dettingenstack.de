"use client";

import { Check, Minus } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PriceBarChart } from "@/components/charts/charts";
import { CompareToggle } from "@/components/compare/compare-provider";
import { ScoreBox } from "@/components/tool/score";
import { ToolLogo } from "@/components/tool/tool-logo";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  Checkbox,
  RangeWithStepper,
  Segmented,
} from "@/components/ui/controls";
import { EmptyState } from "@/components/ui/misc";
import { SiteImage } from "@/components/ui/site-image";
import { GroupRow, Table, TableScroll, Td, Th } from "@/components/ui/table";
import { cn } from "@/lib/cn";
import { formatEUR, withVat } from "@/lib/format";
import { perUnit, serverLabels } from "@/lib/labels";
import { type Billing, cheapestEligiblePlan, planCost } from "@/lib/pricing";
import type { Category, CategorySlug, Tool, Unit } from "@/lib/schema";
import { FeatureMark } from "./blocks";
import { VendorCTA } from "./vendor-cta";

type Vat = "netto" | "brutto";
const billingOptions = [
  { value: "monatlich" as const, label: "Monatlich" },
  { value: "jaehrlich" as const, label: "Jährlich" },
];
const vatOptions = [
  { value: "netto" as const, label: "Netto" },
  { value: "brutto" as const, label: "Brutto" },
];
const show = (cents: number, vat: Vat) =>
  formatEUR(vat === "brutto" ? withVat(cents) : cents);

function PriceToggles({
  billing,
  setBilling,
  vat,
  setVat,
}: {
  billing: Billing;
  setBilling: (b: Billing) => void;
  vat: Vat;
  setVat: (v: Vat) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Segmented
        label="Abrechnung"
        value={billing}
        onValueChange={setBilling}
        options={billingOptions}
      />
      <Segmented
        label="Umsatzsteuer"
        value={vat}
        onValueChange={setVat}
        options={vatOptions}
      />
    </div>
  );
}

/* ───── Plan cards with billing and VAT toggles ───── */

export function PlanCards({ tool, unit }: { tool: Tool; unit: Unit }) {
  const [billing, setBilling] = useState<Billing>("jaehrlich");
  const [vat, setVat] = useState<Vat>("netto");

  return (
    <div className="flex flex-col gap-6">
      <PriceToggles
        billing={billing}
        setBilling={setBilling}
        vat={vat}
        setVat={setVat}
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tool.pricing.plans.map((plan) => {
          const single = planCost(plan.model, 1, billing);
          const planUnit = "unit" in plan.model ? plan.model.unit : unit;
          return (
            <li
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-lg border bg-white p-6",
                plan.recommended
                  ? "border-2 border-black"
                  : "border-neutral-200",
              )}
            >
              {plan.recommended && (
                <Badge variant="award" className="-top-3 absolute left-5">
                  Beliebtester Tarif
                </Badge>
              )}
              <p className="type-h4">{plan.name}</p>
              <p className="mt-3">
                {single ? (
                  <>
                    <span className="tabular font-bold font-display text-[32px] text-black leading-none">
                      {show(single.cents, vat)}
                    </span>
                    <span className="type-ui-sm mt-1 block text-neutral-600">
                      {perUnit[planUnit]} · {vat}
                      {single.fallback &&
                        (billing === "jaehrlich"
                          ? " · nur monatlich angegeben"
                          : " · nur jährlich angegeben")}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-bold font-display text-[26px] text-black leading-none">
                      Auf Anfrage
                    </span>
                    {plan.model.type === "quote" && plan.model.note && (
                      <span className="type-ui-sm mt-1 block text-neutral-600">
                        {plan.model.note}
                      </span>
                    )}
                  </>
                )}
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                {plan.highlights.map((h) => (
                  <li
                    key={h}
                    className="type-small flex gap-2 text-neutral-800"
                  >
                    <Check
                      aria-hidden
                      className="mt-1 size-4 shrink-0"
                      strokeWidth={2}
                    />
                    {h}
                  </li>
                ))}
                {plan.limits.map((l) => (
                  <li
                    key={l}
                    className="type-small flex gap-2 text-neutral-600"
                  >
                    <Minus
                      aria-hidden
                      className="mt-1 size-4 shrink-0"
                      strokeWidth={2}
                    />
                    {l}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      {tool.pricing.addOns.length > 0 && (
        <div>
          <p className="mb-2 font-semibold font-ui text-[15px] text-black">
            Zusatzmodule
          </p>
          <ul className="flex flex-col divide-y divide-neutral-200 border-neutral-200 border-y">
            {tool.pricing.addOns.map((a) => {
              const p = a.price.monthly ?? a.price.annualPerMonth;
              return (
                <li
                  key={a.id}
                  className="flex justify-between gap-4 py-2.5 font-ui text-[15px]"
                >
                  <span className="text-black">{a.name}</span>
                  <span className="tabular text-right text-neutral-800">
                    {p != null
                      ? `${show(p, vat)} ${perUnit[a.unit]}`
                      : "Auf Anfrage"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ───── Team-size cost chart across tools ───── */

export function TeamCostChart({
  tools,
  unit,
  defaultTeam,
  highlight,
  maxTeam = 500,
  category,
}: {
  tools: Tool[];
  unit: Unit;
  defaultTeam: number;
  highlight?: string;
  maxTeam?: number;
  /** Category the chart prices for (plans without its core function are skipped). */
  category?: CategorySlug;
}) {
  const [team, setTeam] = useState(defaultTeam);
  const [billing, setBilling] = useState<Billing>("jaehrlich");
  const [vat, setVat] = useState<Vat>("netto");

  const priced = tools
    .map((t) => ({
      tool: t,
      quote: cheapestEligiblePlan(t, team, billing, [], category),
    }))
    .filter((x) => x.quote);
  const unpriced = tools.filter(
    (t) => !priced.some((p) => p.tool.slug === t.slug),
  );
  const data = priced.map((x) => ({
    label: x.tool.name,
    cents:
      vat === "brutto"
        ? withVat(x.quote?.cost.cents ?? 0)
        : (x.quote?.cost.cents ?? 0),
  }));
  const unitLabel = unit === "mitarbeitende" ? "Mitarbeitende" : "Nutzer";

  return (
    <div className="flex flex-col gap-6">
      <PriceToggles
        billing={billing}
        setBilling={setBilling}
        vat={vat}
        setVat={setVat}
      />
      <RangeWithStepper
        label="Teamgröße"
        unitLabel={unitLabel}
        value={team}
        onValueChange={setTeam}
        max={maxTeam}
      />
      <p aria-live="polite" className="type-ui text-neutral-700">
        Monatliche Kosten für{" "}
        <strong className="text-black">
          {team} {unitLabel}
        </strong>{" "}
        im günstigsten passenden Tarif ({vat},{" "}
        {billing === "jaehrlich" ? "jährliche Zahlung" : "monatliche Zahlung"}).
      </p>
      {data.length > 0 ? (
        <PriceBarChart data={data} highlight={highlight} />
      ) : (
        <p className="type-small text-neutral-700">
          Für diese Teamgröße hat kein Anbieter einen Preis veröffentlicht.
        </p>
      )}
      {unpriced.length > 0 && (
        <p className="type-ui-sm text-neutral-600">
          Ohne veröffentlichten Preis (nur auf Anfrage):{" "}
          {unpriced.map((t) => t.name).join(", ")}.
        </p>
      )}
    </div>
  );
}

/* ───── Feature matrix: tools as columns, grouped features as rows ───── */

export function FeatureMatrix({
  tools,
  category,
  winners,
}: {
  tools: Tool[];
  category: Category;
  /** Optional: featureGroupId → winning tool slug (comparison pages). */
  winners?: Record<string, string>;
}) {
  const [onlyDiff, setOnlyDiff] = useState(false);
  const [onlyCore, setOnlyCore] = useState(false);

  const groups = category.featureGroups
    .map((g) => ({
      ...g,
      features: g.features.filter((f) => {
        if (onlyCore && f.importance !== "kern") return false;
        if (!onlyDiff) return true;
        const states = new Set(
          tools.map((t) => t.features[f.id]?.status ?? "unbekannt"),
        );
        return states.size > 1;
      }),
    }))
    .filter((g) => g.features.length > 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-5">
        <Checkbox
          label="Nur Unterschiede anzeigen"
          checked={onlyDiff}
          onCheckedChange={(v) => setOnlyDiff(v === true)}
        />
        <Checkbox
          label="Nur Kernfunktionen"
          checked={onlyCore}
          onCheckedChange={(v) => setOnlyCore(v === true)}
        />
      </div>
      <TableScroll label="Funktionsvergleich">
        <Table className="min-w-[640px]">
          <thead className="sticky top-0">
            <tr>
              <Th className="w-[34%] min-w-48">Funktion</Th>
              {tools.map((t) => (
                <Th key={t.slug} className="min-w-28 py-3">
                  <Link
                    href={`/software/${t.slug}` as Route}
                    className="flex flex-col items-start gap-2 hover:underline"
                  >
                    <ToolLogo name={t.name} src={t.logo?.src} size={32} />
                    {t.name}
                  </Link>
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <MatrixGroup
                key={g.id}
                group={g}
                tools={tools}
                winner={winners?.[g.id]}
              />
            ))}
          </tbody>
        </Table>
      </TableScroll>
    </div>
  );
}

function MatrixGroup({
  group,
  tools,
  winner,
}: {
  group: Category["featureGroups"][number];
  tools: Tool[];
  winner?: string;
}) {
  return (
    <>
      <GroupRow label={group.label} colSpan={tools.length + 1} />
      {group.features.map((f) => (
        <tr key={f.id}>
          <Td>
            <span className="block text-black">{f.label}</span>
          </Td>
          {tools.map((t) => {
            const s = t.features[f.id] ?? { status: "unbekannt" as const };
            return (
              <Td
                key={t.slug}
                className={cn(
                  winner === t.slug && s.status === "ja" && "bg-brand-50",
                )}
                title={s.note}
              >
                <FeatureMark state={s.status} />
              </Td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

/* ───── Directory with filters (§11.3 #anbieter) ───── */

type DirectoryItem = { tool: Tool; overall: number; entry: string };
type Sort = "score" | "preis" | "name";

export function Directory({
  items,
  category,
}: {
  items: DirectoryItem[];
  category: Category;
}) {
  const [sort, setSort] = useState<Sort>("score");
  const [serverDE, setServerDE] = useState(false);
  const [trial, setTrial] = useState(false);
  const [publicPrice, setPublicPrice] = useState(false);
  const [required, setRequired] = useState<string[]>([]);
  const core = category.featureGroups
    .flatMap((g) => g.features)
    .filter((f) => f.importance === "kern");

  const visible = useMemo(() => {
    const list = items.filter(({ tool }) => {
      if (serverDE && !["DE", "DE_CH"].includes(tool.compliance.serverLocation))
        return false;
      if (trial && tool.trial.available !== "ja") return false;
      if (
        publicPrice &&
        tool.pricing.plans.every((p) => p.model.type === "quote")
      )
        return false;
      return required.every((id) =>
        ["ja", "addon"].includes(tool.features[id]?.status ?? ""),
      );
    });
    const priceOf = (i: DirectoryItem) =>
      cheapestEligiblePlan(i.tool, 1, "jaehrlich")?.cost.cents ??
      Number.POSITIVE_INFINITY;
    return [...list].sort((a, b) =>
      sort === "score"
        ? b.overall - a.overall
        : sort === "preis"
          ? priceOf(a) - priceOf(b)
          : a.tool.name.localeCompare(b.tool.name, "de"),
    );
  }, [items, sort, serverDE, trial, publicPrice, required]);

  const reset = () => {
    setServerDE(false);
    setTrial(false);
    setPublicPrice(false);
    setRequired([]);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[17.5rem_1fr]">
      <aside aria-label="Ergebnisse filtern" className="flex flex-col gap-6">
        <div>
          <p className="mb-3 font-semibold font-ui text-[15px] text-black">
            Datenschutz & Preis
          </p>
          <div className="flex flex-col gap-3">
            <Checkbox
              label="Server in Deutschland"
              checked={serverDE}
              onCheckedChange={(v) => setServerDE(v === true)}
            />
            <Checkbox
              label="Kostenlose Testversion"
              checked={trial}
              onCheckedChange={(v) => setTrial(v === true)}
            />
            <Checkbox
              label="Preise veröffentlicht"
              checked={publicPrice}
              onCheckedChange={(v) => setPublicPrice(v === true)}
            />
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold font-ui text-[15px] text-black">
            Kernfunktionen
          </p>
          <div className="flex flex-col gap-3">
            {core.map((f) => (
              <Checkbox
                key={f.id}
                label={f.label}
                checked={required.includes(f.id)}
                onCheckedChange={(v) =>
                  setRequired((r) =>
                    v === true ? [...r, f.id] : r.filter((x) => x !== f.id),
                  )
                }
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="link-marker self-start font-medium font-ui text-[15px]"
        >
          Filter zurücksetzen
        </button>
      </aside>

      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="type-ui text-neutral-700">
            {visible.length} von {items.length} Tools
          </p>
          <Segmented
            label="Sortieren nach"
            value={sort}
            onValueChange={setSort}
            options={[
              { value: "score", label: "Dettingenstack-Score" },
              { value: "preis", label: "Preis" },
              { value: "name", label: "Name (A–Z)" },
            ]}
          />
        </div>
        {visible.length === 0 ? (
          <EmptyState
            spot={<SiteImage id="C-09" sizes="160px" />}
            title="Keine Tools gefunden"
            text="Passe deine Filter an oder setze sie zurück."
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {visible.map(({ tool, overall, entry }) => (
              <li
                key={tool.slug}
                className="rounded-lg border border-neutral-200 bg-white p-5 lg:p-6"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <ToolLogo name={tool.name} src={tool.logo?.src} size={48} />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/software/${tool.slug}` as Route}
                      className="type-h4 hover:underline"
                    >
                      {tool.name}
                    </Link>
                    <p className="type-small mt-1 text-neutral-700">
                      {tool.tagline}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["DE", "DE_CH"].includes(
                        tool.compliance.serverLocation,
                      ) && (
                        <Badge variant="trust">
                          Server: {serverLabels[tool.compliance.serverLocation]}
                        </Badge>
                      )}
                      {tool.trial.available === "ja" && (
                        <Badge variant="neutral">Kostenlose Testversion</Badge>
                      )}
                      <Badge variant="neutral">{entry}</Badge>
                    </div>
                  </div>
                  <ScoreBox score={overall} size="sm" label="beside" />
                </div>
                <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {core.slice(0, 6).map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center gap-2 font-ui text-[14px] text-neutral-800"
                    >
                      <FeatureMark
                        state={tool.features[f.id]?.status ?? "unbekannt"}
                      />
                      {f.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <VendorCTA
                    tool={tool}
                    placement="directory"
                    size="sm"
                    note={false}
                  />
                  <ButtonLink
                    href={`/software/${tool.slug}` as Route}
                    variant="outline"
                    size="sm"
                  >
                    Zum Test
                  </ButtonLink>
                  <CompareToggle
                    slug={tool.slug}
                    name={tool.name}
                    className="ml-auto"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
