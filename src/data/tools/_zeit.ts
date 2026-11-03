import type { FeatureSupport } from "@/lib/schema";

// Feature ids of the Zeiterfassungssoftware taxonomy; shares ids with HR-Software where the meaning is the same.
export const ZEIT_FEATURES = [
  "zeiterfassung",
  "pausen",
  "ueberstunden",
  "abwesenheiten",
  "schichtplanung",
  "app",
  "terminal",
  "gps",
  "projektzeiten",
  "projektabrechnung",
  "datev-lohn",
  "api",
  "sso",
] as const;

export function zeitFeatures(
  known: Partial<Record<(typeof ZEIT_FEATURES)[number], FeatureSupport>>,
): Record<string, FeatureSupport> {
  return Object.fromEntries(
    ZEIT_FEATURES.map((id) => [id, known[id] ?? { status: "unbekannt" }]),
  );
}

export const checkedZeit = "2026-11-03";
