import type { ToolInput } from "@/lib/schema";
import { entryPackage, newsletterFeatures } from "./_newsletter";
import { analyse, checkedPm as checked } from "./_pm";

const core = ["editor", "vorlagen", "doi", "transaktional", "berichte"];
const source = "https://www.rapidmail.de/preise-newsletterversand";
const comparison = "https://www.rapidmail.de/newsletter-tool-vergleich";

export const rapidmail = {
  slug: "rapidmail",
  name: "rapidmail",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Positive Group Deutschland GmbH (rapidmail)",
    hq: "Freiburg im Breisgau",
    countryCode: "DE",
    website: "https://www.rapidmail.de/",
  },
  logo: null,
  categories: { primary: "newsletter-software", secondary: [] },
  tagline:
    "Einfache Newsletter-Software aus Freiburg – Monatspaket oder Bezahlung pro Versand",
  bestFor: "Kleine Unternehmen und Vereine mit wenig Aufwand",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Die Preise richten sich nach den aktiven Kontakten; der Preisrechner zeigt sie je Empfängerzahl. Laut rapidmail-Vergleichsseite kostet das Monatspaket ab 15 € für bis zu 500 Kontakte mit unbegrenzten Mailings. Alternativ gibt es den unverbindlichen Tarif „Pro Versand“; der erste Versand an bis zu 2.000 Kontakte ist kostenlos. Vereine erhalten 20 % bis 50 % Rabatt.",
    plans: [
      {
        id: "monatlich",
        name: "Essential (monatlich)",
        model: entryPackage(1500, null),
        features: core,
        highlights: [
          "Unbegrenzte Mailings",
          "250+ Vorlagen",
          "Transaktionsmails per SMTP",
        ],
        limits: ["Preis für bis zu 500 Kontakte"],
        recommended: true,
      },
      {
        id: "pro-versand",
        name: "Pro Versand",
        model: { type: "quote", note: "Preis je Versand laut Preisrechner" },
        features: core,
        highlights: [
          "Keine Vertragsbindung",
          "Erster Versand bis 2.000 Kontakte kostenlos",
        ],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "monatlich",
        price: { monthly: 1500, annualPerMonth: null },
        note: "bis 500 Kontakte",
      },
    ],
  },
  trial: { available: "ja" },
  freePlan: "nein",
  features: newsletterFeatures({
    editor: { status: "ja" },
    vorlagen: { status: "ja", note: "Über 250 kostenlose Vorlagen" },
    doi: { status: "ja", note: "DSGVO-konforme Empfängergewinnung" },
    transaktional: { status: "ja", note: "Per SMTP" },
    berichte: { status: "ja" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "rapidmail", url: source, accessedAt: checked },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 70,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 75,
    support: 70,
    integrationen: 65,
  },
  scoreNotes: {
    funktionen:
      "Editor, Vorlagen und Transaktionsmails; Automatisierung nicht im Detail geprüft.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Ab 15 € für 500 Kontakte oder Bezahlung pro Versand.",
    datenschutz: "Deutscher Anbieter; Serverstandort nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen:
      "SMTP für Transaktionsmails; weitere Integrationen nicht geprüft.",
  },
  pros: [
    {
      title: "Bezahlung pro Versand",
      detail: "Wer selten verschickt, zahlt nur, wenn er versendet.",
    },
    {
      title: "Rabatt für Vereine",
      detail: "20 % bis 50 % Nachlass laut Anbieter.",
    },
  ],
  cons: [
    {
      title: "Kein Gratis-Tarif",
      detail: "Nur der erste Versand an bis zu 2.000 Kontakte ist kostenlos.",
    },
    {
      title: "Preise nur im Rechner",
      detail: "Die Preise je Empfängerzahl zeigt ein Rechner.",
    },
  ],
  verdict: {
    short:
      "rapidmail ist eine einfache deutsche Newsletter-Lösung für kleine Unternehmen und Vereine. Wer selten versendet, fährt mit dem Tarif pro Versand oft günstiger als mit einem Monatspaket.",
    idealFor: [
      "Vereine und kleine Unternehmen",
      "Teams, die unregelmäßig versenden",
    ],
    notIdealFor: ["E-Commerce mit komplexer Automatisierung"],
  },
  review: analyse("der Preis- und Vergleichsseiten des Anbieters"),
  sources: [
    { name: "rapidmail", url: source, accessedAt: checked },
    { name: "rapidmail", url: comparison, accessedAt: checked },
  ],
  changelog: [
    {
      date: checked,
      note: "Einstiegspreis, Versandtarif und Rabatte erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
