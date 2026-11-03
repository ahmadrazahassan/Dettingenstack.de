import type { ToolInput } from "@/lib/schema";
import { newsletterFeatures } from "./_newsletter";
import { analyse, checkedPm as checked } from "./_pm";

const core = [
  "editor",
  "vorlagen",
  "automatisierung",
  "segmentierung",
  "berichte",
  "api",
];
const source = "https://www.activecampaign.com/de/pricing";

export const activecampaign = {
  slug: "activecampaign",
  name: "ActiveCampaign",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "ActiveCampaign, LLC",
    hq: "Chicago",
    countryCode: "US",
    website: "https://www.activecampaign.com/de",
  },
  logo: null,
  categories: { primary: "newsletter-software", secondary: ["crm-software"] },
  tagline: "Marketing-Automatisierung mit über 900 Vorlagen für Automationen",
  bestFor: "Teams mit komplexen Automationsstrecken",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Tarife Starter, Plus, Pro und Enterprise, jährlich abgerechnet und bezogen auf 1.000 Kontakte. Die Preisseite lud bei unserem Abruf keine Beträge; Euro ist als Währung auswählbar. Wir führen die Tarife deshalb ohne Preis.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        model: {
          type: "quote",
          note: "Preis für 1.000 Kontakte auf der Preisseite",
        },
        features: core,
        highlights: [
          "Mehrstufige Automationen",
          "KI-Automationsbaukasten",
          "Nur E-Mail",
        ],
      },
      {
        id: "plus",
        name: "Plus",
        model: { type: "quote" },
        features: core,
        highlights: [
          "Kanalübergreifendes Marketing",
          "Vertriebsautomatisierung",
        ],
        recommended: true,
      },
      {
        id: "pro",
        name: "Pro",
        model: { type: "quote" },
        features: core,
        highlights: ["Alles aus Plus", "Erweiterte Funktionen"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: { type: "quote" },
        features: core,
        highlights: ["Für große Teams"],
      },
    ],
    contract: {
      minTermMonths: 12,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
  },
  trial: { available: "ja", days: 14, creditCard: false },
  freePlan: "nein",
  features: newsletterFeatures({
    editor: { status: "ja" },
    vorlagen: { status: "ja", note: "Über 900 Automationsvorlagen" },
    automatisierung: { status: "ja", note: "Mehrstufig, mehrere Auslöser" },
    segmentierung: { status: "ja" },
    berichte: { status: "ja" },
    api: { status: "ja" },
  }),
  integrations: ["zapier"],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "ActiveCampaign", url: source, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 90,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 55,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen: "Sehr starke Automatisierung, Vertriebsfunktionen ab Plus.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Preise nicht verifiziert, nur Jahresabrechnung.",
    datenschutz: "US-Anbieter; Serverstandort nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Viele Integrationen.",
  },
  pros: [
    {
      title: "Starke Automatisierung",
      detail: "Mehrstufige Strecken mit über 900 Vorlagen.",
    },
    { title: "Test ohne Kreditkarte", detail: "14 Tage kostenlos." },
  ],
  cons: [
    {
      title: "Jährliche Abrechnung",
      detail: "Die Preisseite nennt jährlich abgerechnete Tarife.",
    },
    {
      title: "US-Anbieter",
      detail: "Datenschutzprüfung mit Übermittlung in die USA nötig.",
    },
  ],
  verdict: {
    short:
      "ActiveCampaign ist eine der stärksten Lösungen für Marketing-Automatisierung, mit Vertriebsfunktionen ab Plus. Für einfache Newsletter ist es überdimensioniert.",
    idealFor: ["Teams mit komplexen Automationen", "B2B mit Lead-Nurturing"],
    notIdealFor: ["Gelegentliche Newsletter-Versender"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "ActiveCampaign", url: source, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Tarife und Testangebot erstmals erfasst." },
  ],
} satisfies ToolInput;
