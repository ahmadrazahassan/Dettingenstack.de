import type { FeatureSupport } from "@/lib/schema";

// Feature ids of the Buchhaltungssoftware taxonomy. Every tool starts with „unbekannt“ for all of them and
// overrides only what its sources confirm (§2.9: never guess „nein“).
export const BUCHHALTUNG_FEATURES = [
  "belegerfassung",
  "belegarchiv",
  "e-rechnung-empfang",
  "buchungen",
  "ustva",
  "euer",
  "bilanz",
  "anlagen",
  "kassenbuch",
  "kostenstellen",
  "bankanbindung",
  "zahlungsabgleich",
  "zahlungen",
  "rechnungen",
  "e-rechnung-versand",
  "mahnwesen",
  "steuerberater-zugang",
  "datev-export",
  "freigaben",
  "app",
  "api",
  "lohn",
] as const;

export function buchhaltungFeatures(
  known: Partial<Record<(typeof BUCHHALTUNG_FEATURES)[number], FeatureSupport>>,
): Record<string, FeatureSupport> {
  return Object.fromEntries(
    BUCHHALTUNG_FEATURES.map((id) => [
      id,
      known[id] ?? { status: "unbekannt" },
    ]),
  );
}

export const checked = "2026-11-02";
