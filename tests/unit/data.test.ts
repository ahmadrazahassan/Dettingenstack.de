import { describe, expect, it } from "vitest";
import {
  categories,
  comparisons,
  getTool,
  tools,
  toolsInCategory,
} from "@/data";
import { quizzes } from "@/data/quizzes";
import { hrQuiz } from "@/data/quizzes/hr-software";
import { evaluate } from "@/lib/finder";
import { cheapestEligiblePlan, isQuoteOnly } from "@/lib/pricing";
import { awards, rank } from "@/lib/scoring";

const hr = categories.find((c) => c.slug === "hr-software");
if (!hr) throw new Error("hr-software fehlt");

describe("data integrity", () => {
  it("every comparison references two tools of its category", () => {
    for (const c of comparisons) {
      expect(getTool(c.toolA)).toBeDefined();
      expect(getTool(c.toolB)).toBeDefined();
    }
  });
  it("prices are integer cents", () => {
    for (const t of tools) {
      for (const p of t.pricing.plans) {
        if (p.model.type === "per_unit") {
          for (const v of [p.model.price.monthly, p.model.price.annualPerMonth])
            if (v != null) expect(Number.isInteger(v)).toBe(true);
        }
      }
    }
  });
  it("Kenjo Starter for 25 people costs 135,00 € per month with yearly billing (as stated in the buying guide)", () => {
    const kenjo = getTool("kenjo");
    expect(
      kenjo && cheapestEligiblePlan(kenjo, 25, "jaehrlich")?.cost.cents,
    ).toBe(13_500);
  });
  it("quote-only tools are never priced", () => {
    const personio = getTool("personio");
    expect(personio && isQuoteOnly(personio)).toBe(true);
    expect(
      personio && cheapestEligiblePlan(personio, 25, "jaehrlich"),
    ).toBeNull();
  });
});

describe("independence (§7.5)", () => {
  it("rankings and awards ignore affiliate and sponsored data", () => {
    const list = toolsInCategory(hr.slug);
    const stripped = list.map((t) => ({
      ...t,
      affiliate: {
        network: "direkt" as const,
        url: "https://example.com",
        active: true,
      },
      sponsored: [
        {
          slot: "category-top" as const,
          start: "2026-01-01",
          end: "2026-12-31",
        },
      ],
    }));
    expect(rank(stripped, hr.scoreWeights).map((r) => r.tool.slug)).toEqual(
      rank(list, hr.scoreWeights).map((r) => r.tool.slug),
    );
    expect([...awards(stripped, hr.scoreWeights)]).toEqual([
      ...awards(list, hr.scoreWeights),
    ]);
  });
});

describe("software finder", () => {
  const list = toolsInCategory(hr.slug);
  it("requires DATEV when the tax office uses DATEV", () => {
    const results = evaluate(list, hr, hrQuiz, {
      anzahl: 25,
      lohn: "datev",
      server: "egal",
      prioritaet: "preis",
    });
    expect(results.length).toBeGreaterThan(0);
    for (const r of results)
      expect(r.tool.features["datev-lohn"]?.status).toBe("ja");
  });
  it("only returns German-hosted tools when Germany is mandatory", () => {
    const results = evaluate(list, hr, hrQuiz, { anzahl: 25, server: "de" });
    for (const r of results)
      expect(["DE", "DE_CH"]).toContain(r.tool.compliance.serverLocation);
  });
  it("returns at most three results with a match between 0 and 100", () => {
    const results = evaluate(list, hr, hrQuiz, {
      anzahl: 40,
      bereiche: ["zeiterfassung", "schichten"],
      budget: "10",
    });
    expect(results.length).toBeLessThanOrEqual(3);
    for (const r of results) expect(r.match).toBeGreaterThanOrEqual(0);
    for (const r of results) expect(r.match).toBeLessThanOrEqual(100);
  });
});

describe("software finder for every category", () => {
  for (const category of categories) {
    const questions = quizzes[category.slug];
    const taxonomy = new Set(
      category.featureGroups.flatMap((g) => g.features.map((f) => f.id)),
    );
    it(`${category.slug}: six questions on its own taxonomy`, () => {
      expect(questions).toHaveLength(6);
      for (const q of questions) {
        if (q.type === "number") continue;
        for (const o of q.options)
          for (const e of o.effects)
            if (e.kind === "require-feature" || e.kind === "prefer-feature")
              expect(taxonomy, `${q.id}/${o.id}: ${e.featureId}`).toContain(
                e.featureId,
              );
      }
    });
    it(`${category.slug}: first answers always produce a shortlist`, () => {
      const answers = Object.fromEntries(
        questions.map((q) => [
          q.id,
          q.type === "number" ? q.default : (q.options[0]?.id ?? ""),
        ]),
      );
      const results = evaluate(
        toolsInCategory(category.slug),
        category,
        questions,
        answers,
      );
      expect(results.length).toBeGreaterThan(0);
      for (const r of results) {
        expect(r.match).toBeGreaterThanOrEqual(0);
        expect(r.match).toBeLessThanOrEqual(100);
      }
    });
  }
});
