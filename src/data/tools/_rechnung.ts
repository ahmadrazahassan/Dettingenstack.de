import type { FeatureSupport } from "@/lib/schema";

// Feature ids of the Rechnungsprogramme taxonomy (shared ids with Buchhaltung where the meaning is the same).
export const RECHNUNG_FEATURES = [
  "rechnungen",
  "e-rechnung-versand",
  "e-rechnung-empfang",
  "wiederkehrend",
  "abschlag",
  "mahnwesen",
  "bankanbindung",
  "zahlungsabgleich",
  "online-zahlung",
  "datev-export",
  "steuerberater-zugang",
  "euer",
  "ustva",
  "belegerfassung",
  "app",
  "api",
  "zeiterfassung",
  "shop-anbindung",
  "lager",
] as const;

export function rechnungFeatures(
  known: Partial<Record<(typeof RECHNUNG_FEATURES)[number], FeatureSupport>>,
): Record<string, FeatureSupport> {
  return Object.fromEntries(
    RECHNUNG_FEATURES.map((id) => [id, known[id] ?? { status: "unbekannt" }]),
  );
}
