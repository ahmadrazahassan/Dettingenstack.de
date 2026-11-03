import type { ToolInput } from "@/lib/schema";
import { newsletterFeatures } from "./_newsletter";
import { analyse, checkedPm as checked } from "./_pm";

const core = ["editor", "automatisierung", "transaktional", "berichte"];
const source = "https://www.inxmail.de/";

export const inxmail = {
  slug: "inxmail",
  name: "Inxmail",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Inxmail GmbH",
    hq: "Freiburg im Breisgau",
    countryCode: "DE",
    website: "https://www.inxmail.de/",
  },
  logo: null,
  categories: { primary: "newsletter-software", secondary: [] },
  tagline:
    "E-Mail-Marketing für Mittelstand und Enterprise – ISO 27001, Hosting in Europa",
  bestFor: "Mittelstand und Konzerne mit hohen Anforderungen",
  companySizes: ["klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Inxmail veröffentlicht auf der Startseite keine Preise; Angebote erstellt der Vertrieb.",
    plans: [
      {
        id: "angebot",
        name: "Inxmail",
        model: { type: "quote" },
        features: core,
        highlights: [
          "Newsletter & Kampagnen",
          "Marketing Automation",
          "Transaktionsmails",
          "SMTP-Relay",
        ],
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
  features: newsletterFeatures({
    editor: { status: "ja" },
    automatisierung: { status: "ja", note: "Marketing Automation" },
    transaktional: { status: "ja", note: "Transaktionsmails und SMTP-Relay" },
    berichte: { status: "ja" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "EU",
    serverNote: "Hosting in Europa laut Anbieter",
    avv: "unbekannt",
    certifications: ["ISO_27001"],
    certificationNote:
      "ISO/IEC 27001:2022, zertifiziert durch TÜV Rheinland laut Website.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Inxmail", url: source, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 90,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen: "Kampagnen, Automation, Transaktionsmails und Zustellbarkeit.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Preise nur auf Anfrage.",
    datenschutz: "Deutscher Anbieter, ISO 27001:2022, Hosting in Europa.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen nicht im Detail geprüft.",
  },
  pros: [
    { title: "ISO 27001:2022", detail: "Zertifiziert durch TÜV Rheinland." },
    {
      title: "Zustellbarkeit im Fokus",
      detail: "Eigenes Modul für Zustellbarkeit und SMTP-Relay.",
    },
  ],
  cons: [
    {
      title: "Keine öffentlichen Preise",
      detail: "Nur auf Anfrage über den Vertrieb.",
    },
    {
      title: "Für Einsteiger zu groß",
      detail: "Ausgerichtet auf Mittelstand und Enterprise.",
    },
  ],
  verdict: {
    short:
      "Inxmail ist eine Enterprise-Lösung aus Deutschland mit ISO 27001 und Fokus auf Zustellbarkeit. Für kleine Listen sind CleverReach, rapidmail oder Brevo einfacher und günstiger.",
    idealFor: [
      "Mittelstand mit hohem Versandvolumen",
      "Unternehmen mit strengen Sicherheitsvorgaben",
    ],
    notIdealFor: ["Kleinbetriebe mit kleinen Listen"],
  },
  review: analyse("der Website des Anbieters"),
  sources: [{ name: "Inxmail", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Module, Hosting und Zertifizierung erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
