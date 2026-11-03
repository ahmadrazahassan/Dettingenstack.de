import type { Category, CompanySize, Criterion, Tool } from "./schema";
import { CRITERIA } from "./schema";

// Dettingenstack-Score (§7). Deliberately takes only scores, weights and facts —
// never affiliate or sponsored data (independence, §7.5).

type ScoredTool = Pick<
  Tool,
  "slug" | "name" | "scores" | "companySizes" | "compliance"
>;

export function overallScore(
  tool: Pick<Tool, "scores">,
  weights: Category["scoreWeights"],
) {
  const sum = CRITERIA.reduce(
    (acc, c) => acc + tool.scores[c] * (weights[c] ?? 0),
    0,
  );
  return Math.round(sum);
}

/** Sorted by overall score; ties → Preis-Leistung, then name. */
export function rank<T extends ScoredTool>(
  tools: T[],
  weights: Category["scoreWeights"],
) {
  return tools
    .map((tool) => ({ tool, overall: overallScore(tool, weights) }))
    .sort(
      (a, b) =>
        b.overall - a.overall ||
        b.tool.scores.preisLeistung - a.tool.scores.preisLeistung ||
        a.tool.name.localeCompare(b.tool.name, "de"),
    );
}

export type AwardId =
  | "empfehlung"
  | "preis-leistung"
  | "kleinunternehmen"
  | "mittelstand"
  | "datenschutz";

export const AWARD_LABELS: Record<AwardId, string> = {
  empfehlung: "Unsere Empfehlung",
  "preis-leistung": "Preis-Leistungs-Tipp",
  kleinunternehmen: "Beste Wahl für Kleinunternehmen",
  mittelstand: "Beste Wahl für den Mittelstand",
  datenschutz: "Datenschutz-Tipp",
};

/** Award rules from §7.4. A tool holds at most two awards. */
export function awards<T extends ScoredTool>(
  tools: T[],
  weights: Category["scoreWeights"],
) {
  const ranked = rank(tools, weights);
  const result = new Map<string, AwardId[]>();
  const give = (slug: string | undefined, id: AwardId) => {
    if (!slug) return;
    const list = result.get(slug) ?? [];
    if (list.length < 2) result.set(slug, [...list, id]);
  };
  const minCriterion = (t: ScoredTool) =>
    Math.min(...CRITERIA.map((c) => t.scores[c]));
  const fits = (t: ScoredTool, sizes: CompanySize[]) =>
    t.companySizes.some((s) => sizes.includes(s));
  const best = (
    filter: (r: (typeof ranked)[number]) => boolean,
    by?: Criterion,
  ) => {
    const pool = ranked.filter(filter);
    if (by)
      pool.sort(
        (a, b) =>
          b.tool.scores[by] - a.tool.scores[by] || b.overall - a.overall,
      );
    return pool[0]?.tool.slug;
  };

  give(
    best((r) => minCriterion(r.tool) >= 50),
    "empfehlung",
  );
  give(
    best((r) => r.overall >= 75, "preisLeistung"),
    "preis-leistung",
  );
  give(
    best((r) => fits(r.tool, ["solo", "kleinst"])),
    "kleinunternehmen",
  );
  give(
    best((r) => fits(r.tool, ["mittel"])),
    "mittelstand",
  );
  give(
    best((r) => r.tool.compliance.serverLocation === "DE", "datenschutz"),
    "datenschutz",
  );
  return result;
}

export function weightedRows(
  tool: Pick<Tool, "scores" | "scoreNotes">,
  weights: Category["scoreWeights"],
  labels: Record<Criterion, string>,
  averages?: Record<Criterion, number>,
) {
  return CRITERIA.map((c) => ({
    label: labels[c],
    score: tool.scores[c],
    weight: weights[c],
    note: tool.scoreNotes[c],
    average: averages?.[c],
  }));
}
