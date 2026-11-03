import type { FeatureSupport } from "@/lib/schema";

// Feature ids of the HR taxonomy (src/data/categories/hr-software.ts); unconfirmed stays „unbekannt“ (§2.9).
const HR_FEATURES = [
  "personalakte",
  "dokumente",
  "esignatur",
  "organigramm",
  "rollen",
  "abwesenheiten",
  "zeiterfassung",
  "schichtplanung",
  "bewerbermanagement",
  "karriereseite",
  "onboarding",
  "feedback",
  "ziele",
  "lernen",
  "umfragen",
  "lohnvorbereitung",
  "datev-lohn",
  "lohnabrechnung",
  "spesen",
  "self-service",
  "app",
  "reports",
  "api",
  "sso",
  "hinweisgeber",
] as const;

export function hrFeatures(
  known: Partial<Record<(typeof HR_FEATURES)[number], FeatureSupport>>,
): Record<string, FeatureSupport> {
  return Object.fromEntries(
    HR_FEATURES.map((id) => [id, known[id] ?? { status: "unbekannt" }]),
  );
}
