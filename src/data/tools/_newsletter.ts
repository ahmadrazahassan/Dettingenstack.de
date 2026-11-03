import type { FeatureSupport } from "@/lib/schema";

// Feature ids of the Newsletter taxonomy; „vorlagen“, „automatisierung“, „berichte“ and „api“ are shared
// with other categories. Unconfirmed features stay „unbekannt“ (§2.9).
export const NEWSLETTER_FEATURES = [
  "editor",
  "vorlagen",
  "doi",
  "segmentierung",
  "automatisierung",
  "ab-tests",
  "landingpages",
  "transaktional",
  "berichte",
  "api",
] as const;

export function newsletterFeatures(
  known: Partial<Record<(typeof NEWSLETTER_FEATURES)[number], FeatureSupport>>,
): Record<string, FeatureSupport> {
  return Object.fromEntries(
    NEWSLETTER_FEATURES.map((id) => [id, known[id] ?? { status: "unbekannt" }]),
  );
}

/** Smallest published package: priced per month for the account, at the contact or volume tier in `limits`. */
export const entryPackage = (
  monthly: number | null,
  annualPerMonth: number | null,
) =>
  ({
    type: "flat",
    unit: "pauschal",
    price: { monthly, annualPerMonth },
    includedUnits: 1,
  }) as const;
