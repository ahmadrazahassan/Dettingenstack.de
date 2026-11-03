import type { CategorySlug, Plan, PriceModel, PricePair, Tool } from "./schema";

/** A tool as far as pricing needs it; `categories` gives the default context for excluded plans. */
type Priced = Pick<Tool, "pricing"> & { categories?: Tool["categories"] };

/** True if the plan lacks the core function of the category we price for (default: the tool's primary category). */
function excluded(plan: Plan, tool: Priced, category?: CategorySlug) {
  const context = category ?? tool.categories?.primary;
  return context != null && (plan.excludeFromEntry?.includes(context) ?? false);
}

// Cost engine (§12.2). Pure functions, integer cents, net. VAT is applied only at display time.

export type Billing = "monatlich" | "jaehrlich";
export type Cost = { cents: number; fallback: boolean };

/** Unit price for the requested billing, or the other billing as a flagged fallback. */
export function pick(pair: PricePair, billing: Billing): Cost | null {
  const wanted = billing === "jaehrlich" ? pair.annualPerMonth : pair.monthly;
  if (wanted != null) return { cents: wanted, fallback: false };
  const other = billing === "jaehrlich" ? pair.monthly : pair.annualPerMonth;
  return other != null ? { cents: other, fallback: true } : null;
}

/** Monthly net cost for `units`, or null if the plan can't serve that size or is quote-only. */
export function planCost(
  model: PriceModel,
  units: number,
  billing: Billing,
): Cost | null {
  switch (model.type) {
    case "free":
      return model.maxUnits == null || units <= model.maxUnits
        ? { cents: 0, fallback: false }
        : null;
    case "per_unit": {
      if (model.maxUnits && units > model.maxUnits) return null;
      const p = pick(model.price, billing);
      return (
        p && { ...p, cents: p.cents * Math.max(units, model.minUnits ?? 1) }
      );
    }
    case "flat":
      return units > model.includedUnits ? null : pick(model.price, billing);
    case "base_plus_per_unit": {
      const base = pick(model.base, billing);
      const per = pick(model.perUnit, billing);
      if (!base || !per) return null;
      return {
        cents:
          base.cents + per.cents * Math.max(0, units - model.includedUnits),
        fallback: base.fallback || per.fallback,
      };
    }
    case "volume_tiers": {
      const tier = model.tiers.find((t) => t.upTo == null || units <= t.upTo);
      const p = tier && pick(tier.price, billing);
      return p ? { ...p, cents: p.cents * units } : null;
    }
    case "band_flat": {
      const band = model.bands.find((b) => b.upTo == null || units <= b.upTo);
      return band ? pick(band.price, billing) : null;
    }
    case "quote":
      return null;
  }
}

export type PlanQuote = { plan: Plan; cost: Cost };

/** Cheapest plan that includes every required feature and can serve `units`. Ties → earlier plan. */
export function cheapestEligiblePlan(
  tool: Priced,
  units: number,
  billing: Billing,
  requiredFeatures: string[] = [],
  category?: CategorySlug,
): PlanQuote | null {
  let best: PlanQuote | null = null;
  for (const plan of tool.pricing.plans) {
    if (excluded(plan, tool, category)) continue;
    if (!requiredFeatures.every((f) => plan.features.includes(f))) continue;
    const cost = planCost(plan.model, units, billing);
    if (cost && (!best || cost.cents < best.cost.cents)) best = { plan, cost };
  }
  return best;
}

/** True if the tool publishes no computable price at all. */
export function isQuoteOnly(tool: Pick<Tool, "pricing">) {
  return tool.pricing.plans.every((p) => p.model.type === "quote");
}

/** Cheapest published paid price per month and the plan it comes from (for „ab … €“). null if nothing is published. */
export function entryPlan(
  tool: Priced,
  billing: Billing = "jaehrlich",
  category?: CategorySlug,
): { cents: number; plan: Plan } | null {
  let best: { cents: number; plan: Plan } | null = null;
  const consider = (cents: number | undefined, plan: Plan) => {
    if (cents && cents > 0 && (best == null || cents < best.cents))
      best = { cents, plan };
  };
  for (const plan of tool.pricing.plans) {
    if (excluded(plan, tool, category)) continue;
    const m = plan.model;
    // Base plus extra units: with units included, the entry is the package price (base); with none included,
    // it is the price per unit, shown „pro Mitarbeitendem“ – the base fee is listed separately on the pricing page.
    if (m.type === "base_plus_per_unit") {
      const c =
        m.includedUnits > 0
          ? planCost(m, 1, billing)
          : pick(m.perUnit, billing);
      consider(c?.cents, plan);
      continue;
    }
    const pairs: PricePair[] =
      m.type === "per_unit" || m.type === "flat"
        ? [m.price]
        : m.type === "volume_tiers"
          ? m.tiers.map((t) => t.price)
          : m.type === "band_flat"
            ? m.bands.map((b) => b.price)
            : [];
    for (const pair of pairs) consider(pick(pair, billing)?.cents, plan);
  }
  return best;
}

/** Cheapest published paid price per month (for „ab … €“). null if nothing is published. */
export function entryPrice(
  tool: Priced,
  billing: Billing = "jaehrlich",
  category?: CategorySlug,
) {
  return entryPlan(tool, billing, category)?.cents ?? null;
}

/** True when the entry price is a monthly package price (flat or base fee with units included), not a unit price. */
export function isPackagePrice(plan: Plan) {
  const m = plan.model;
  return (
    m.type === "flat" ||
    m.type === "band_flat" ||
    (m.type === "base_plus_per_unit" && m.includedUnits > 0)
  );
}

/** Known one-time fees in cents (unknown amounts are listed separately, never guessed). */
export function knownOneTimeFees(tool: Pick<Tool, "pricing">) {
  return tool.pricing.oneTimeFees.reduce((sum, f) => sum + (f.amount ?? 0), 0);
}

export function totals(monthlyCents: number, years: number, oneTimeCents = 0) {
  return {
    monthly: monthlyCents,
    yearly: monthlyCents * 12,
    total: oneTimeCents + monthlyCents * 12 * years,
  };
}

/** Team sizes where the cheaper of two tools changes (§12.2). Sizes where either is unpriced are skipped. */
export function breakEven(
  a: Priced,
  b: Priced,
  {
    from = 1,
    to = 500,
    billing = "jaehrlich" as Billing,
    required = [] as string[],
    category = undefined as CategorySlug | undefined,
  } = {},
) {
  const crossovers: { units: number; cheaper: "a" | "b" }[] = [];
  // Last strictly cheaper side; equal costs don't count as a switch.
  let previous: "a" | "b" | null = null;
  for (let units = from; units <= to; units++) {
    const ca = cheapestEligiblePlan(a, units, billing, required, category)?.cost
      .cents;
    const cb = cheapestEligiblePlan(b, units, billing, required, category)?.cost
      .cents;
    if (ca == null || cb == null || ca === cb) continue;
    const cheaper = ca < cb ? "a" : "b";
    if (previous && previous !== cheaper) crossovers.push({ units, cheaper });
    previous = cheaper;
  }
  return crossovers;
}

/** Monthly cost series for charts: one point per step, null where the tool has no price. */
export function costSeries(
  tool: Priced,
  sizes: number[],
  billing: Billing,
  required: string[] = [],
  category?: CategorySlug,
) {
  return sizes.map((units) => ({
    units,
    cents:
      cheapestEligiblePlan(tool, units, billing, required, category)?.cost
        .cents ?? null,
  }));
}
