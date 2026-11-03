import type { FeatureSupport, ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked } from "./_pm";

// Feature ids of the DMS taxonomy; „api“ and „app“ are shared with other categories.
// Unconfirmed features stay „unbekannt“ (§2.9).
export const DMS_FEATURES = [
  "archiv",
  "ocr",
  "volltextsuche",
  "versionierung",
  "rechte",
  "workflows",
  "eingangsrechnungen",
  "mail-archiv",
  "web-client",
  "api",
  "app",
] as const;

export function dmsFeatures(
  known: Partial<Record<(typeof DMS_FEATURES)[number], FeatureSupport>>,
): Record<string, FeatureSupport> {
  return Object.fromEntries(
    DMS_FEATURES.map((id) => [id, known[id] ?? { status: "unbekannt" }]),
  );
}

type QuoteVendor = Pick<
  ToolInput,
  | "slug"
  | "name"
  | "vendor"
  | "tagline"
  | "bestFor"
  | "companySizes"
  | "pros"
  | "cons"
  | "verdict"
  | "platforms"
> & {
  source: string;
  note: string;
  highlights: string[];
  features: Record<string, FeatureSupport>;
  onPremise: "ja" | "nein" | "unbekannt";
  serverNote?: string;
  funktionen: number;
  scoreNote: string;
};

/** ECM vendors that sell through quotes or partners only: everything we could not verify stays open. */
export function dmsQuoteTool(v: QuoteVendor): ToolInput {
  return {
    slug: v.slug,
    name: v.name,
    status: "published",
    isPlaceholder: false,
    vendor: v.vendor,
    logo: null,
    categories: { primary: "dokumentenmanagement-software", secondary: [] },
    tagline: v.tagline,
    bestFor: v.bestFor,
    companySizes: v.companySizes,
    pricing: {
      currency: "EUR",
      checkedAt: checked,
      sourceUrl: v.source,
      note: v.note,
      plans: [
        {
          id: "angebot",
          name: v.name,
          model: { type: "quote" },
          features: Object.entries(v.features)
            .filter(([, f]) => f.status === "ja")
            .map(([id]) => id),
          highlights: v.highlights,
          recommended: true,
        },
      ],
      contract: {
        minTermMonths: null,
        noticePeriod: null,
        monthlyBilling: "unbekannt",
      },
    },
    trial: { available: "unbekannt" },
    freePlan: "nein",
    features: v.features,
    integrations: [],
    compliance: {
      serverLocation: "unbekannt",
      serverNote: v.serverNote,
      avv: "unbekannt",
      certifications: [],
      sso: "unbekannt",
      twoFactor: "unbekannt",
      onPremise: v.onPremise,
      source: { name: v.vendor.name, url: v.source, accessedAt: checked },
    },
    support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
    platforms: v.platforms,
    scores: {
      funktionen: v.funktionen,
      bedienbarkeit: 70,
      preisLeistung: 60,
      datenschutz: 70,
      support: 70,
      integrationen: 75,
    },
    scoreNotes: {
      funktionen: `${v.scoreNote.charAt(0).toUpperCase()}${v.scoreNote.slice(1)}`,
      bedienbarkeit:
        "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
      preisLeistung: "Keine veröffentlichten Preise; Kosten im Angebot.",
      datenschutz:
        "Hosting und Zertifikate für diesen Vergleich nicht geprüft.",
      support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
      integrationen: "Integrationen nicht im Detail geprüft.",
    },
    pros: v.pros,
    cons: v.cons,
    verdict: v.verdict,
    review: analyse("der Website des Anbieters"),
    sources: [{ name: v.vendor.name, url: v.source, accessedAt: checked }],
    changelog: [{ date: checked, note: "Produktangaben erstmals erfasst." }],
  };
}
