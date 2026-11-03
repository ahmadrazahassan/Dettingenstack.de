import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatEUR,
  formatNumber,
  formatPercent,
  formatScore,
  scoreLabel,
  withVat,
} from "@/lib/format";
import type { Category, Tool } from "@/lib/schema";
import { awards, overallScore, rank } from "@/lib/scoring";

const NBSP = " ";

describe("format (de-DE)", () => {
  it("formats euros with comma, dot and a non-breaking space", () => {
    expect(formatEUR(123_450)).toBe(`1.234,50${NBSP}€`);
    expect(formatEUR(800)).toBe(`8,00${NBSP}€`);
  });
  it("formats numbers, percent, scores and dates", () => {
    expect(formatNumber(4319)).toBe("4.319");
    expect(formatPercent(0.83)).toBe(`83${NBSP}%`);
    expect(formatScore(87)).toBe("8,7");
    expect(formatScore(90)).toBe("9,0");
    expect(formatDate("2026-10-28")).toBe("28.10.2026");
  });
  it("adds 19 % VAT and rounds once", () => {
    expect(withVat(1000)).toBe(1190);
    expect(withVat(333)).toBe(396);
  });
  it("labels scores like German grades", () => {
    expect(scoreLabel(92)).toBe("Hervorragend");
    expect(scoreLabel(87)).toBe("Sehr gut");
    expect(scoreLabel(70)).toBe("Gut");
    expect(scoreLabel(49)).toBe("Mangelhaft");
  });
});

const weights: Category["scoreWeights"] = {
  funktionen: 0.25,
  bedienbarkeit: 0.2,
  preisLeistung: 0.2,
  datenschutz: 0.15,
  support: 0.1,
  integrationen: 0.1,
};

const make = (slug: string, s: number[], extra: Partial<Tool> = {}) =>
  ({
    slug,
    name: slug,
    scores: {
      funktionen: s[0],
      bedienbarkeit: s[1],
      preisLeistung: s[2],
      datenschutz: s[3],
      support: s[4],
      integrationen: s[5],
    },
    companySizes: ["mittel"],
    compliance: { serverLocation: "EU" },
    ...extra,
  }) as unknown as Tool;

describe("scoring", () => {
  it("weights criteria and rounds half up", () => {
    // 22,5 + 16 + 14 + 12 + 6 + 5 = 75,5 → 76
    expect(overallScore(make("a", [90, 80, 70, 80, 60, 50]), weights)).toBe(76);
  });
  it("ranks by overall, then Preis-Leistung, then name", () => {
    const tools = [
      make("b", [80, 80, 70, 80, 80, 80]),
      make("a", [80, 80, 80, 80, 80, 80]),
      make("c", [80, 80, 80, 80, 80, 80]),
    ];
    expect(rank(tools, weights).map((r) => r.tool.slug)).toEqual([
      "a",
      "c",
      "b",
    ]);
  });
  it("never gives „Unsere Empfehlung“ to a tool with a criterion below 5,0", () => {
    const strongButFlawed = make("x", [100, 100, 100, 40, 100, 100]);
    const solid = make("y", [80, 80, 80, 80, 80, 80]);
    expect(awards([strongButFlawed, solid], weights).get("y")).toContain(
      "empfehlung",
    );
    expect(
      awards([strongButFlawed, solid], weights).get("x") ?? [],
    ).not.toContain("empfehlung");
  });
  it("gives the Datenschutz-Tipp only to tools hosted in Germany", () => {
    const de = make("de", [70, 70, 70, 85, 70, 70], {
      compliance: { serverLocation: "DE" } as Tool["compliance"],
    });
    const eu = make("eu", [70, 70, 70, 95, 70, 70]);
    expect(awards([de, eu], weights).get("de")).toContain("datenschutz");
  });
});
