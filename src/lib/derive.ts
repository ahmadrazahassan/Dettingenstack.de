import {
  categories,
  comparisons,
  getCategory,
  tools,
  toolsInCategory,
} from "@/data";
import { entryPrice, isQuoteOnly } from "./pricing";
import {
  type Category,
  type CategorySlug,
  CRITERIA,
  type Criterion,
  type Tool,
} from "./schema";
import { AWARD_LABELS, type AwardId, awards, rank } from "./scoring";

// Everything computed from data (§6.7) — never typed in by hand.

export type RankedTool = {
  tool: Tool;
  overall: number;
  rank: number;
  awards: AwardId[];
  entryPrice: number | null;
};

export function categoryRanking(category: Category): RankedTool[] {
  const list = toolsInCategory(category.slug);
  const awardMap = awards(list, category.scoreWeights);
  return rank(list, category.scoreWeights).map((r, i) => ({
    tool: r.tool,
    overall: r.overall,
    rank: i + 1,
    awards: awardMap.get(r.tool.slug) ?? [],
    entryPrice: entryPrice(r.tool, "jaehrlich", category.slug),
  }));
}

export function rankedTool(category: Category, slug: string) {
  return categoryRanking(category).find((r) => r.tool.slug === slug);
}

export function awardLabel(id: AwardId, category: Category) {
  return `${AWARD_LABELS[id]} · ${category.nameShort} ${category.updatedAt.slice(0, 4)}`;
}

export function criterionAverages(
  category: Category,
): Record<Criterion, number> {
  const list = toolsInCategory(category.slug);
  return Object.fromEntries(
    CRITERIA.map((c) => [
      c,
      Math.round(
        list.reduce((s, t) => s + t.scores[c], 0) / Math.max(1, list.length),
      ),
    ]),
  ) as Record<Criterion, number>;
}

/** Stat tiles for the category header — all computed. */
export function categoryStats(category: Category) {
  const list = toolsInCategory(category.slug);
  const prices = list
    .map((t) => entryPrice(t, "jaehrlich", category.slug))
    .filter((p): p is number => p != null);
  return {
    count: list.length,
    minEntryPrice: prices.length ? Math.min(...prices) : null,
    publishedPrices: list.filter((t) => !isQuoteOnly(t)).length,
    serverDE: list.filter(
      (t) =>
        t.compliance.serverLocation === "DE" ||
        t.compliance.serverLocation === "DE_CH",
    ).length,
    datev: list.filter(
      (t) =>
        t.features["datev-lohn"]?.status === "ja" ||
        t.features["datev-lohn"]?.status === "addon",
    ).length,
    iso: list.filter((t) => t.compliance.certifications.includes("ISO_27001"))
      .length,
  };
}

export function featureCoverage(tool: Tool, category: Category) {
  const all = category.featureGroups.flatMap((g) => g.features);
  const yes = all.filter((f) => tool.features[f.id]?.status === "ja").length;
  return { yes, total: all.length };
}

export function siteStats() {
  const pricePoints = tools.reduce((s, t) => s + t.pricing.history.length, 0);
  const checks = tools.map((t) => t.pricing.checkedAt).sort();
  return {
    tools: tools.length,
    categories: categories.length,
    comparisons: comparisons.length,
    pricePoints,
    latestPriceCheck: checks.at(-1) ?? null,
  };
}

export type PriceChange = {
  date: string;
  tool: Tool;
  planName: string;
  before: number | null;
  after: number | null;
};

/** Changes between consecutive history points of the same plan (§12.4). */
export function priceChanges(): PriceChange[] {
  const changes: PriceChange[] = [];
  for (const tool of tools) {
    const byPlan = new Map<string, typeof tool.pricing.history>();
    for (const p of tool.pricing.history)
      byPlan.set(p.planId, [...(byPlan.get(p.planId) ?? []), p]);
    for (const [planId, points] of byPlan) {
      const sorted = [...points].sort((a, b) => a.date.localeCompare(b.date));
      const planName =
        tool.pricing.plans.find((p) => p.id === planId)?.name ?? planId;
      for (let i = 1; i < sorted.length; i++) {
        const prev =
          sorted[i - 1]?.price.annualPerMonth ??
          sorted[i - 1]?.price.monthly ??
          null;
        const next =
          sorted[i]?.price.annualPerMonth ?? sorted[i]?.price.monthly ?? null;
        if (prev !== next)
          changes.push({
            date: sorted[i]?.date ?? "",
            tool,
            planName,
            before: prev,
            after: next,
          });
      }
    }
  }
  return changes.sort((a, b) => b.date.localeCompare(a.date));
}

export function yearOf(iso: string) {
  return iso.slice(0, 4);
}

export function categoryOf(slug: CategorySlug) {
  const category = getCategory(slug);
  if (!category) throw new Error(`Unbekannte Kategorie: ${slug}`);
  return category;
}
