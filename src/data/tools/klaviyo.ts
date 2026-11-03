import type { ToolInput } from "@/lib/schema";
import { newsletterFeatures } from "./_newsletter";
import { analyse, checkedPm as checked } from "./_pm";

const core = [
  "editor",
  "vorlagen",
  "segmentierung",
  "automatisierung",
  "berichte",
  "api",
];
const source = "https://www.klaviyo.com/de/pricing";

export const klaviyo = {
  slug: "klaviyo",
  name: "Klaviyo",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Klaviyo, Inc.",
    hq: "Boston",
    countryCode: "US",
    website: "https://www.klaviyo.com/de",
  },
  logo: null,
  categories: { primary: "newsletter-software", secondary: [] },
  tagline:
    "E-Mail- und SMS-Marketing für Onlineshops mit Kaufdaten und Segmenten",
  bestFor: "Onlineshops mit Shopify, Shopware oder WooCommerce",
  companySizes: ["kleinst", "klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Kostenlos bis 250 aktive Profile und 500 E-Mails pro Monat. Für die Bezahltarife zeigte die Preisseite keinen festen Startpreis, sondern einen Rechner nach Profilen; wir führen sie ohne Preis.",
    plans: [
      {
        id: "free",
        name: "Kostenlos",
        model: {
          type: "free",
          limits: "250 aktive Profile, 500 E-Mails pro Monat",
        },
        features: core,
        highlights: ["250 aktive Profile", "500 E-Mails pro Monat"],
      },
      {
        id: "marketing",
        name: "Marketing",
        model: {
          type: "quote",
          note: "Preis nach aktiven Profilen im Rechner",
        },
        features: core,
        highlights: ["E-Mail und SMS", "Preis nach Profilen"],
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
  freePlan: "ja",
  features: newsletterFeatures({
    editor: { status: "ja" },
    vorlagen: { status: "ja" },
    segmentierung: { status: "ja", note: "Auf Basis von Kaufdaten" },
    automatisierung: { status: "ja", note: "Flows" },
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
    source: { name: "Klaviyo", url: source, accessedAt: checked },
  },
  support: { languages: ["en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 55,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen: "Stark bei Segmenten und Flows auf Basis von Shopdaten.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Preise nur im Rechner, nicht verifiziert.",
    datenschutz: "US-Anbieter; Serverstandort nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Viele Shop-Integrationen.",
  },
  pros: [
    {
      title: "Für Shops gebaut",
      detail: "Segmente und Automatisierungen auf Basis von Kaufdaten.",
    },
    { title: "E-Mail und SMS", detail: "Beide Kanäle in einer Plattform." },
  ],
  cons: [
    {
      title: "Preise nur im Rechner",
      detail: "Kein fester Startpreis auf der Seite.",
    },
    {
      title: "US-Anbieter",
      detail: "Datenschutzprüfung mit Übermittlung in die USA nötig.",
    },
  ],
  verdict: {
    short:
      "Klaviyo ist stark für Onlineshops, die mit Kaufdaten segmentieren und automatisieren. Für klassische Newsletter ohne Shop gibt es einfachere und günstigere Lösungen.",
    idealFor: ["Onlineshops mit Umsatzfokus", "D2C-Marken"],
    notIdealFor: ["Unternehmen ohne Onlineshop"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Klaviyo", url: source, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Gratis-Limits und Tarife erstmals erfasst." },
  ],
} satisfies ToolInput;
