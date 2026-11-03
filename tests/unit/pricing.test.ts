import { describe, expect, it } from "vitest";
import {
  breakEven,
  cheapestEligiblePlan,
  entryPlan,
  entryPrice,
  isPackagePrice,
  isQuoteOnly,
  pick,
  planCost,
  totals,
} from "@/lib/pricing";
import type { Plan, PriceModel } from "@/lib/schema";

const plan = (
  id: string,
  model: PriceModel,
  features: string[] = [],
): Plan => ({
  id,
  name: id,
  model,
  features,
  highlights: [],
  limits: [],
  recommended: false,
});
const tool = (...plans: Plan[]) => ({ pricing: { plans } }) as never;

describe("pick", () => {
  it("uses the requested billing", () => {
    expect(pick({ monthly: 600, annualPerMonth: 540 }, "jaehrlich")).toEqual({
      cents: 540,
      fallback: false,
    });
    expect(pick({ monthly: 600, annualPerMonth: 540 }, "monatlich")).toEqual({
      cents: 600,
      fallback: false,
    });
  });
  it("falls back to the other billing and flags it", () => {
    expect(pick({ monthly: null, annualPerMonth: 540 }, "monatlich")).toEqual({
      cents: 540,
      fallback: true,
    });
  });
  it("returns null when nothing is published", () => {
    expect(
      pick({ monthly: null, annualPerMonth: null }, "jaehrlich"),
    ).toBeNull();
  });
});

describe("planCost", () => {
  const price = { monthly: 600, annualPerMonth: 540 };

  it("per_unit multiplies and respects minUnits / maxUnits", () => {
    const m: PriceModel = {
      type: "per_unit",
      unit: "mitarbeitende",
      price,
      minUnits: 10,
      maxUnits: 100,
    };
    expect(planCost(m, 25, "jaehrlich")?.cents).toBe(13_500);
    expect(planCost(m, 3, "jaehrlich")?.cents).toBe(5_400);
    expect(planCost(m, 101, "jaehrlich")).toBeNull();
  });
  it("flat applies up to includedUnits", () => {
    const m: PriceModel = {
      type: "flat",
      unit: "nutzer",
      price: { monthly: 2900, annualPerMonth: null },
      includedUnits: 5,
    };
    expect(planCost(m, 5, "monatlich")?.cents).toBe(2900);
    expect(planCost(m, 6, "monatlich")).toBeNull();
  });
  it("base_plus_per_unit charges only above the included units", () => {
    const m: PriceModel = {
      type: "base_plus_per_unit",
      unit: "nutzer",
      base: { monthly: 5000, annualPerMonth: null },
      perUnit: { monthly: 400, annualPerMonth: null },
      includedUnits: 10,
    };
    expect(planCost(m, 8, "monatlich")?.cents).toBe(5000);
    expect(planCost(m, 15, "monatlich")?.cents).toBe(7000);
  });
  it("volume_tiers prices every unit at its band rate", () => {
    const m: PriceModel = {
      type: "volume_tiers",
      unit: "mitarbeitende",
      tiers: [
        { upTo: 50, price: { monthly: 800, annualPerMonth: null } },
        { upTo: null, price: { monthly: 600, annualPerMonth: null } },
      ],
    };
    expect(planCost(m, 50, "monatlich")?.cents).toBe(40_000);
    expect(planCost(m, 51, "monatlich")?.cents).toBe(30_600);
  });
  it("band_flat returns one flat price per band", () => {
    const m: PriceModel = {
      type: "band_flat",
      unit: "kontakte_1000",
      bands: [
        { upTo: 5, price: { monthly: 2900, annualPerMonth: null } },
        { upTo: 25, price: { monthly: 7900, annualPerMonth: null } },
      ],
    };
    expect(planCost(m, 5, "monatlich")?.cents).toBe(2900);
    expect(planCost(m, 6, "monatlich")?.cents).toBe(7900);
    expect(planCost(m, 26, "monatlich")).toBeNull();
  });
  it("quote is never priced", () => {
    expect(planCost({ type: "quote" }, 10, "monatlich")).toBeNull();
  });
});

describe("cheapestEligiblePlan", () => {
  const t = tool(
    plan(
      "starter",
      {
        type: "per_unit",
        unit: "mitarbeitende",
        price: { monthly: 600, annualPerMonth: 540 },
      },
      ["a"],
    ),
    plan(
      "growth",
      {
        type: "per_unit",
        unit: "mitarbeitende",
        price: { monthly: 1000, annualPerMonth: 900 },
      },
      ["a", "b"],
    ),
    plan("connect", { type: "quote" }, ["a", "b", "c"]),
  );
  it("picks the cheapest plan", () => {
    expect(cheapestEligiblePlan(t, 25, "jaehrlich")?.plan.id).toBe("starter");
  });
  it("filters by required features", () => {
    expect(cheapestEligiblePlan(t, 25, "jaehrlich", ["b"])?.plan.id).toBe(
      "growth",
    );
  });
  it("returns null when only a quote plan qualifies", () => {
    expect(cheapestEligiblePlan(t, 25, "jaehrlich", ["c"])).toBeNull();
  });
  it("detects quote-only tools and entry prices", () => {
    expect(isQuoteOnly(t)).toBe(false);
    expect(isQuoteOnly(tool(plan("x", { type: "quote" })))).toBe(true);
    expect(entryPrice(t)).toBe(540);
    expect(entryPrice(t, "monatlich")).toBe(600);
  });
  it("uses the base price as entry for base plus extra users", () => {
    const withUser = tool(
      plan("b", {
        type: "base_plus_per_unit",
        unit: "pauschal",
        base: { monthly: 2_590, annualPerMonth: 2_290 },
        perUnit: { monthly: 590, annualPerMonth: 590 },
        includedUnits: 1,
      }),
    );
    expect(entryPrice(withUser)).toBe(2_290);
    expect(entryPrice(withUser, "monatlich")).toBe(2_590);
    const noneIncluded = tool(
      plan("c", {
        type: "base_plus_per_unit",
        unit: "pauschal",
        base: { monthly: 1_000, annualPerMonth: null },
        perUnit: { monthly: 400, annualPerMonth: null },
        includedUnits: 0,
      }),
    );
    // No units included: the entry is the per-unit price; the base fee is shown separately.
    expect(entryPrice(noneIncluded, "monatlich")).toBe(400);
  });
});

describe("totals", () => {
  it("adds known one-time fees to n years of monthly cost", () => {
    expect(totals(13_500, 3, 40_000)).toEqual({
      monthly: 13_500,
      yearly: 162_000,
      total: 526_000,
    });
  });
});

describe("breakEven", () => {
  // A: 5 € base, cheaper per unit later. B: flat per unit.
  const a = tool(
    plan("a", {
      type: "base_plus_per_unit",
      unit: "mitarbeitende",
      base: { monthly: 10_000, annualPerMonth: null },
      perUnit: { monthly: 400, annualPerMonth: null },
      includedUnits: 0,
    }),
  );
  const b = tool(
    plan("b", {
      type: "per_unit",
      unit: "mitarbeitende",
      price: { monthly: 900, annualPerMonth: null },
    }),
  );
  it("finds the size where the cheaper tool changes", () => {
    // 100 + 4n < 9n  ⇔  n > 20
    expect(breakEven(a, b, { billing: "monatlich", to: 100 })).toEqual([
      { units: 21, cheaper: "a" },
    ]);
  });
  it("returns nothing when one tool is quote-only", () => {
    expect(
      breakEven(a, tool(plan("q", { type: "quote" })), {
        billing: "monatlich",
      }),
    ).toEqual([]);
  });
});

describe("entryPrice with excluded plans", () => {
  it("skips plans without the category's core function", () => {
    const t = tool(
      {
        ...plan("rechnung", {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 990, annualPerMonth: null },
          includedUnits: 1,
        }),
        excludeFromEntry: ["buchhaltungssoftware"],
      },
      plan("buchhaltung", {
        type: "flat",
        unit: "pauschal",
        price: { monthly: 2290, annualPerMonth: null },
        includedUnits: 1,
      }),
    );
    expect(entryPrice(t, "monatlich", "buchhaltungssoftware")).toBe(2290);
    // The same plan is the entry plan where it does cover the core function.
    expect(entryPrice(t, "monatlich", "rechnungsprogramme")).toBe(990);
  });
  it("never picks an excluded plan as the cheapest plan for a team", () => {
    const t = tool(
      {
        ...plan("gratis", {
          type: "free",
          limits: "3 Rechnungen",
          maxUnits: 1,
        }),
        excludeFromEntry: ["buchhaltungssoftware"],
      },
      plan("buchhaltung", {
        type: "flat",
        unit: "pauschal",
        price: { monthly: 2290, annualPerMonth: null },
        includedUnits: 1,
      }),
    );
    expect(
      cheapestEligiblePlan(t, 1, "monatlich", [], "buchhaltungssoftware")?.plan
        .id,
    ).toBe("buchhaltung");
  });
});

describe("entryPlan", () => {
  it("marks a package with included units as a monthly package price", () => {
    // Sage HR & Payroll: 40 € for 5 employees, then 7 € each.
    const t = tool(
      plan("essentials", {
        type: "base_plus_per_unit",
        unit: "mitarbeitende",
        base: { monthly: 4000, annualPerMonth: null },
        perUnit: { monthly: 700, annualPerMonth: null },
        includedUnits: 5,
      }),
    );
    const entry = entryPlan(t, "jaehrlich");
    expect(entry?.cents).toBe(4000);
    expect(entry && isPackagePrice(entry.plan)).toBe(true);
  });

  it("keeps a per-unit price as a unit price", () => {
    const t = tool(
      plan("pro", {
        type: "per_unit",
        unit: "nutzer",
        price: { monthly: 1900, annualPerMonth: 1400 },
      }),
    );
    const entry = entryPlan(t, "jaehrlich");
    expect(entry?.cents).toBe(1400);
    expect(entry && isPackagePrice(entry.plan)).toBe(false);
  });
});
