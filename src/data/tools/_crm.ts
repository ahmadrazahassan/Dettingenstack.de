import type { FeatureSupport } from "@/lib/schema";

// Feature ids of the CRM-Software taxonomy. Unconfirmed features stay „unbekannt“ (§2.9).
export const CRM_FEATURES = [
  "kontakte",
  "pipeline",
  "mehrere-pipelines",
  "aufgaben",
  "email-sync",
  "email-tracking",
  "sequenzen",
  "angebote",
  "prognosen",
  "automatisierung",
  "berichte",
  "app",
  "api",
  "sso",
] as const;

export function crmFeatures(
  known: Partial<Record<(typeof CRM_FEATURES)[number], FeatureSupport>>,
): Record<string, FeatureSupport> {
  return Object.fromEntries(
    CRM_FEATURES.map((id) => [id, known[id] ?? { status: "unbekannt" }]),
  );
}

export const checkedCrm = "2026-11-03";
