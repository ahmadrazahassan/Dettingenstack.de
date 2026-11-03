import type { FeatureSupport, ToolInput } from "@/lib/schema";

// Feature ids of the Projektmanagement taxonomy. „zeiterfassung“, „app“, „api“ and „sso“ are shared with
// Zeiterfassungssoftware, so ZEP and MOCO show their values here too. Unconfirmed features stay „unbekannt“ (§2.9).
export const PM_FEATURES = [
  "aufgaben",
  "kanban",
  "gantt",
  "kalender",
  "workload",
  "automatisierung",
  "vorlagen",
  "dokumente",
  "gaeste",
  "berichte",
  "zeiterfassung",
  "app",
  "api",
  "sso",
] as const;

export function pmFeatures(
  known: Partial<Record<(typeof PM_FEATURES)[number], FeatureSupport>>,
): Record<string, FeatureSupport> {
  return Object.fromEntries(
    PM_FEATURES.map((id) => [id, known[id] ?? { status: "unbekannt" }]),
  );
}

export const checkedPm = "2026-11-03";

/** Draft review block: analysis of vendor pages, no hands-on test yet. */
export const analyse = (basis: string): ToolInput["review"] => ({
  method: "analyse",
  testSetup: `Analyse auf Basis ${basis} (Stand 03.11.2026). Ein Praxistest steht noch aus.`,
  authorId: "redaktion",
  editorId: "redaktion",
  publishedAt: checkedPm,
  updatedAt: checkedPm,
});

/** Note for vendors whose pricing page only showed us US dollars. */
export const usdNote = () =>
  "Die Preisseite zeigte uns die Preise nur in US-Dollar. Den Euro-Preis zeigt der Anbieter je nach Land der Rechnungsadresse; wir führen die Tarife deshalb ohne Preis.";
