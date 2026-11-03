import type { FeatureSupport } from "@/lib/schema";

// Feature ids of the Shopsysteme taxonomy; „api“ is shared with other categories.
// Unconfirmed features stay „unbekannt“ (§2.9).
export const SHOP_FEATURES = [
  "hosting",
  "themes",
  "varianten",
  "zahlungen",
  "rechtstexte",
  "marktplaetze",
  "b2b",
  "mehrsprachig",
  "erweiterungen",
  "api",
] as const;

export function shopFeatures(
  known: Partial<Record<(typeof SHOP_FEATURES)[number], FeatureSupport>>,
): Record<string, FeatureSupport> {
  return Object.fromEntries(
    SHOP_FEATURES.map((id) => [id, known[id] ?? { status: "unbekannt" }]),
  );
}

/** Monthly price for one shop. */
export const perShop = (
  monthly: number | null,
  annualPerMonth: number | null,
) =>
  ({
    type: "flat",
    unit: "pauschal",
    price: { monthly, annualPerMonth },
    includedUnits: 1,
  }) as const;
