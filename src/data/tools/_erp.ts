import type { FeatureSupport } from "@/lib/schema";

// Feature ids of the ERP taxonomy; „api“ and „app“ are shared with other categories.
// Unconfirmed features stay „unbekannt“ (§2.9).
export const ERP_FEATURES = [
  "auftraege",
  "warenwirtschaft",
  "einkauf",
  "produktion",
  "fibu",
  "datev",
  "crm-modul",
  "projekte",
  "shop",
  "api",
  "app",
] as const;

export function erpFeatures(
  known: Partial<Record<(typeof ERP_FEATURES)[number], FeatureSupport>>,
): Record<string, FeatureSupport> {
  return Object.fromEntries(
    ERP_FEATURES.map((id) => [id, known[id] ?? { status: "unbekannt" }]),
  );
}
