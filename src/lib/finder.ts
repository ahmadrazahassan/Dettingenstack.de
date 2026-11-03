import { cheapestEligiblePlan } from "./pricing";
import type { Category, CompanySize, Criterion, Tool } from "./schema";
import { overallScore } from "./scoring";

// Software-Finder (§12.3). Pure: answers in, ranked shortlist with reasons out.

export type Effect =
  | { kind: "require-feature"; featureId: string }
  | { kind: "prefer-feature"; featureId: string; weight: number }
  | { kind: "budget-per-unit"; maxCents: number | null }
  // Package categories (Buchhaltung, Newsletter, Shops): budget for the whole account per month.
  | { kind: "budget-total"; maxCents: number | null }
  | { kind: "company-size"; size: CompanySize }
  | { kind: "server"; value: "DE" | "EU"; hard: boolean }
  | { kind: "boost-criterion"; criterion: Criterion; factor: number };

export type Question =
  | {
      id: string;
      type: "single" | "multi";
      title: string;
      hint?: string;
      options: { id: string; label: string; effects: Effect[] }[];
    }
  | {
      id: string;
      type: "number";
      title: string;
      hint?: string;
      min: number;
      max: number;
      default: number;
    };

export type Answers = Record<string, string | string[] | number>;

export type FinderResult = {
  tool: Tool;
  match: number;
  reasons: { ok: boolean; text: string }[];
  monthlyCents: number | null;
  relaxed: boolean;
};

const sizeOf = (n: number): CompanySize =>
  n <= 1
    ? "solo"
    : n <= 9
      ? "kleinst"
      : n <= 49
        ? "klein"
        : n <= 249
          ? "mittel"
          : "gross";

export function evaluate(
  tools: Tool[],
  category: Category,
  questions: Question[],
  answers: Answers,
): FinderResult[] {
  const effects: Effect[] = [];
  let team = category.referenceTeams[0] ?? 25;
  for (const q of questions) {
    const a = answers[q.id];
    if (q.type === "number") {
      if (typeof a === "number") team = a;
      continue;
    }
    const chosen = Array.isArray(a) ? a : a ? [a] : [];
    for (const o of q.options)
      if (chosen.includes(o.id)) effects.push(...o.effects);
  }

  const required = effects.flatMap((e) =>
    e.kind === "require-feature" ? [e.featureId] : [],
  );
  const preferred = effects.flatMap((e) =>
    e.kind === "prefer-feature" ? [e] : [],
  );
  const server = effects.find(
    (e): e is Extract<Effect, { kind: "server" }> => e.kind === "server",
  );
  const budget = effects.find(
    (e): e is Extract<Effect, { kind: "budget-per-unit" | "budget-total" }> =>
      e.kind === "budget-per-unit" || e.kind === "budget-total",
  );
  const size = effects.find(
    (e): e is Extract<Effect, { kind: "company-size" }> =>
      e.kind === "company-size",
  )?.size;
  const weights = { ...category.scoreWeights };
  for (const e of effects)
    if (e.kind === "boost-criterion") weights[e.criterion] *= e.factor;
  const totalWeight = Object.values(weights).reduce((s, w) => s + w, 0);
  for (const k of Object.keys(weights) as Criterion[])
    weights[k] /= totalWeight;

  const serverOk = (t: Tool) =>
    !server ||
    (server.value === "DE"
      ? ["DE", "DE_CH"].includes(t.compliance.serverLocation)
      : ["DE", "DE_CH", "EU"].includes(t.compliance.serverLocation));
  const hasAll = (t: Tool) =>
    required.every((f) => t.features[f]?.status === "ja");
  // The number question only says something about company size when the unit is employees.
  const companySize =
    size ?? (category.unit === "mitarbeitende" ? sizeOf(team) : undefined);
  const fitsSize = (t: Tool) =>
    !companySize || t.companySizes.includes(companySize);

  const score = (t: Tool, relaxed: boolean): FinderResult => {
    const reasons: FinderResult["reasons"] = [];
    const label = (id: string) =>
      category.featureGroups.flatMap((g) => g.features).find((f) => f.id === id)
        ?.label ?? id;
    for (const f of required)
      reasons.push({ ok: t.features[f]?.status === "ja", text: label(f) });
    let prefHit = 0;
    let prefTotal = 0;
    for (const p of preferred) {
      const s = t.features[p.featureId]?.status;
      const hit = s === "ja" ? 1 : s === "addon" || s === "teilweise" ? 0.5 : 0;
      prefHit += hit * p.weight;
      prefTotal += p.weight;
      reasons.push({
        ok: hit > 0,
        text: `${label(p.featureId)}${s === "addon" ? " (gegen Aufpreis)" : ""}`,
      });
    }
    if (server)
      reasons.push({
        ok: serverOk(t),
        text:
          server.value === "DE" ? "Server in Deutschland" : "Server in der EU",
      });

    const quote = cheapestEligiblePlan(
      t,
      team,
      "jaehrlich",
      required,
      category.slug,
    );
    const monthly = quote?.cost.cents ?? null;
    let budgetFit = 0.5; // unknown price: neutral
    if (budget?.maxCents != null && monthly != null) {
      const max =
        budget.kind === "budget-total"
          ? budget.maxCents
          : budget.maxCents * team;
      budgetFit = monthly <= max ? 1 : Math.max(0, 1 - (monthly - max) / max);
      reasons.push({
        ok: monthly <= max,
        text: `Budget: rund ${(monthly / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" })} pro Monat${category.maxTeam > 1 ? ` für ${team} ${category.unitLabel.plural}` : ""}`,
      });
    } else if (budget?.maxCents != null) {
      reasons.push({
        ok: false,
        text: "Preis nur auf Anfrage – Budget nicht prüfbar",
      });
    } else if (!budget || budget.maxCents == null) {
      budgetFit = 1;
    }

    const base = overallScore(t, weights) / 100;
    const pref = prefTotal ? prefHit / prefTotal : 1;
    const match = Math.round(
      (0.6 * base + 0.25 * pref + 0.15 * budgetFit) * 100,
    );
    return { tool: t, match, reasons, monthlyCents: monthly, relaxed };
  };

  const strict = tools.filter(
    (t) => hasAll(t) && (!server?.hard || serverOk(t)) && fitsSize(t),
  );
  if (strict.length)
    return strict
      .map((t) => score(t, false))
      .sort((a, b) => b.match - a.match)
      .slice(0, 3);
  // No perfect match: relax company size first, then the server requirement („Beste Annäherung“).
  const relaxed = tools.filter(
    (t) => hasAll(t) && (!server?.hard || serverOk(t)),
  );
  // Last resort: drop the hard feature requirements too, so the user always sees the closest tools.
  const withFeatures = tools.filter(hasAll);
  const pool = relaxed.length
    ? relaxed
    : withFeatures.length
      ? withFeatures
      : tools;
  return pool
    .map((t) => score(t, true))
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);
}
