"use client";

import { useState } from "react";
import { CostCurveChart } from "@/components/charts/charts";
import { RangeWithStepper, Segmented } from "@/components/ui/controls";
import { formatEUR, withVat } from "@/lib/format";
import { type Billing, breakEven, cheapestEligiblePlan } from "@/lib/pricing";
import type { CategorySlug, Tool } from "@/lib/schema";

type Vat = "netto" | "brutto";

// Team-size cost comparison with break-even point (§11.7 #preise). All maths from lib/pricing.
export function CostComparison({
  a,
  b,
  unitPlural,
  defaultTeam,
  max: MAX = 300,
  category,
}: {
  a: Tool;
  b: Tool;
  unitPlural: string;
  defaultTeam: number;
  /** Upper end of the team-size slider and curve. */
  max?: number;
  /** The comparison's category: plans without its core function are skipped. */
  category: CategorySlug;
}) {
  const steps = Array.from({ length: MAX }, (_, i) => i + 1);
  const [team, setTeam] = useState(defaultTeam);
  const [billing, setBilling] = useState<Billing>("jaehrlich");
  const [vat, setVat] = useState<Vat>("netto");
  const gross = (c: number | null) =>
    c == null ? null : vat === "brutto" ? withVat(c) : c;

  const data = steps.map((units) => ({
    units,
    a: gross(
      cheapestEligiblePlan(a, units, billing, [], category)?.cost.cents ?? null,
    ),
    b: gross(
      cheapestEligiblePlan(b, units, billing, [], category)?.cost.cents ?? null,
    ),
  }));
  const qa = cheapestEligiblePlan(a, team, billing, [], category);
  const qb = cheapestEligiblePlan(b, team, billing, [], category);
  const crossings = breakEven(a, b, { to: MAX, billing, category });
  const anyPriced = data.some((d) => d.a != null || d.b != null);

  let summary: string;
  if (!qa && !qb)
    summary = `Weder ${a.name} noch ${b.name} veröffentlichen Preise für diese Teamgröße – hol dir zwei Angebote.`;
  else if (!qa || !qb)
    summary = `${(qa ? b : a).name} nennt keinen Preis für diese Teamgröße (nur auf Anfrage). Ein direkter Kostenvergleich ist erst mit einem Angebot möglich.`;
  else if (crossings.length === 0) {
    const cheaper = qa.cost.cents <= qb.cost.cents ? a : b;
    // Only claim sizes where both tools publish a price; beyond that the comparison is open.
    const lastComparable =
      data.filter((d) => d.a != null && d.b != null).at(-1)?.units ?? team;
    summary =
      lastComparable >= MAX
        ? `${cheaper.name} ist bis ${MAX} ${unitPlural} bei jeder Teamgröße günstiger.`
        : `${cheaper.name} ist günstiger, soweit beide Preise veröffentlichen (bis ${lastComparable} ${unitPlural}). Darüber hilft nur ein Angebot.`;
  } else if (crossings.length === 1) {
    const c = crossings[0];
    summary = `Ab ${c?.units} ${unitPlural} ist ${(c?.cheaper === "a" ? a : b).name} günstiger.`;
  } else
    summary =
      "Je nach Teamgröße wechselt der günstigere Anbieter mehrfach – fahre über die Kurve.";

  const diff = qa && qb ? Math.abs(qa.cost.cents - qb.cost.cents) * 12 : null;
  const cheaperNow =
    qa && qb
      ? qa.cost.cents < qb.cost.cents
        ? a
        : qb.cost.cents < qa.cost.cents
          ? b
          : null
      : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Segmented
          label="Abrechnung"
          value={billing}
          onValueChange={setBilling}
          options={[
            { value: "monatlich", label: "Monatlich" },
            { value: "jaehrlich", label: "Jährlich" },
          ]}
        />
        <Segmented
          label="Umsatzsteuer"
          value={vat}
          onValueChange={setVat}
          options={[
            { value: "netto", label: "Netto" },
            { value: "brutto", label: "Brutto" },
          ]}
        />
      </div>
      <RangeWithStepper
        label="Deine Teamgröße"
        unitLabel={unitPlural}
        value={team}
        onValueChange={setTeam}
        max={MAX}
      />

      <div aria-live="polite" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { tool: a, q: qa, tone: "border-black" },
          { tool: b, q: qb, tone: "border-brand-700" },
        ].map(({ tool, q, tone }) => (
          <div
            key={tool.slug}
            className={`rounded-lg border-l-4 ${tone} bg-neutral-50 p-5`}
          >
            <p className="font-semibold font-ui text-[15px] text-black">
              {tool.name}
            </p>
            <p className="tabular mt-2 font-bold font-display text-[32px] text-black leading-none lg:text-[40px]">
              {q ? formatEUR(gross(q.cost.cents) ?? 0) : "Auf Anfrage"}
            </p>
            <p className="type-ui-sm mt-1.5 text-neutral-600">
              {q
                ? `pro Monat · Tarif ${q.plan.name} · ${vat}`
                : "kein veröffentlichter Preis"}
            </p>
          </div>
        ))}
      </div>
      {cheaperNow && diff != null && diff > 0 && (
        <p className="type-body text-neutral-800">
          Mit <strong className="text-black">{cheaperNow.name}</strong> sparst
          du bei {team} {unitPlural} rund{" "}
          <strong className="text-black">{formatEUR(gross(diff) ?? 0)}</strong>{" "}
          pro Jahr.
        </p>
      )}

      <p className="font-semibold font-ui text-[16px] text-black">{summary}</p>
      {anyPriced && (
        <CostCurveChart
          data={data}
          a={a.name}
          b={b.name}
          unitLabel={unitPlural}
          marker={team}
          breakEven={crossings.length === 1 ? crossings[0]?.units : undefined}
        />
      )}
    </div>
  );
}
