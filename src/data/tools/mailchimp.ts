import type { ToolInput } from "@/lib/schema";
import { newsletterFeatures } from "./_newsletter";
import { analyse, checkedPm as checked, usdNote } from "./_pm";

const free = ["editor", "vorlagen", "landingpages", "berichte", "api"];
const essentials = [...free, "automatisierung"];
const standard = [...essentials, "segmentierung"];
const premium = [...standard, "ab-tests"];
const source = "https://mailchimp.com/de/pricing/marketing/";

export const mailchimp = {
  slug: "mailchimp",
  name: "Mailchimp",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "The Rocket Science Group LLC (Intuit)",
    hq: "Atlanta",
    countryCode: "US",
    website: "https://mailchimp.com/de/",
  },
  logo: null,
  categories: { primary: "newsletter-software", secondary: [] },
  tagline: "Bekanntes E-Mail-Marketing-Tool mit über 300 Integrationen",
  bestFor: "Kleine Unternehmen und Shops mit internationalem Fokus",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: `${usdNote()} Der Preis hängt von der Kontaktzahl ab.`,
    plans: [
      {
        id: "free",
        name: "Free",
        model: {
          type: "free",
          limits: "250 Kontakte, 500 E-Mails pro Monat, 1 Nutzer",
        },
        features: free,
        highlights: ["250 Kontakte", "Pop-up-Formulare", "300+ Integrationen"],
      },
      {
        id: "essentials",
        name: "Essentials",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: essentials,
        highlights: [
          "Versand planen",
          "Vorlagen",
          "Automatisierung bis 4 Schritte",
          "3 Nutzer",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: standard,
        highlights: [
          "Dynamische Inhalte",
          "Eigene Berichte",
          "Automatisierung bis 200 Schritte",
          "5 Nutzer",
        ],
        recommended: true,
      },
      {
        id: "premium",
        name: "Premium",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: premium,
        highlights: [
          "Multivariate Tests",
          "Prädiktive Segmente",
          "Telefon-Support",
          "Unbegrenzte Nutzer",
        ],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
  },
  trial: { available: "ja", days: 30 },
  freePlan: "ja",
  features: newsletterFeatures({
    editor: { status: "ja" },
    vorlagen: { status: "ja" },
    landingpages: { status: "ja", note: "Pop-up-Formulare" },
    segmentierung: {
      status: "ja",
      fromPlan: "standard",
      note: "Prädiktive Segmente in Premium",
    },
    automatisierung: {
      status: "ja",
      fromPlan: "essentials",
      note: "Nicht im Free-Tarif",
    },
    "ab-tests": {
      status: "ja",
      fromPlan: "premium",
      note: "Multivariate und A/B-Tests",
    },
    berichte: { status: "ja", note: "Eigene Berichte ab Standard" },
    api: { status: "ja", note: "Über 300 Integrationen" },
  }),
  integrations: ["zapier"],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "ja",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Mailchimp", url: source, accessedAt: checked },
  },
  support: {
    languages: ["en"],
    channels: ["email", "chat"],
    onboarding: "unbekannt",
    note: "Free: E-Mail-Support nur 30 Tage; Telefon in Premium",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 55,
    support: 70,
    integrationen: 90,
  },
  scoreNotes: {
    funktionen: "Umfangreich; Automatisierung erst ab Essentials.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Preise nur in US-Dollar und als Aktionspreise sichtbar.",
    datenschutz: "US-Anbieter; Serverstandort nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Über 300 Integrationen.",
  },
  pros: [
    {
      title: "Viele Integrationen",
      detail: "Über 300 Anbindungen an Shops und Tools.",
    },
    { title: "Bekannte Oberfläche", detail: "Viele Anleitungen und Vorlagen." },
  ],
  cons: [
    {
      title: "Kleiner Gratis-Tarif",
      detail: "250 Kontakte und 500 E-Mails pro Monat, ohne Automatisierung.",
    },
    {
      title: "Unklare Euro-Preise",
      detail: "Die Seite zeigte uns nur Aktionspreise in US-Dollar.",
    },
  ],
  verdict: {
    short:
      "Mailchimp ist bekannt und gut integriert, für deutsche Unternehmen aber datenschutzrechtlich aufwendiger und preislich schwer vergleichbar. Prüfe den Euro-Preis nach Ablauf der Aktion.",
    idealFor: [
      "Shops mit vielen Integrationen",
      "Teams mit internationalen Listen",
    ],
    notIdealFor: ["Unternehmen mit strengen Datenschutzvorgaben"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Mailchimp", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Tarife, Limits und Dollarpreise erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
