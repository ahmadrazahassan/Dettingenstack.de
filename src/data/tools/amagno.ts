import type { ToolInput } from "@/lib/schema";
import { dmsFeatures } from "./_dms";
import { analyse, checkedPm as checked } from "./_pm";

const core = [
  "ocr",
  "volltextsuche",
  "rechte",
  "workflows",
  "web-client",
  "api",
];
const source = "https://amagno.de/preise/";

export const amagno = {
  slug: "amagno",
  name: "Amagno",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Amagno GmbH",
    hq: "Oldenburg",
    countryCode: "DE",
    website: "https://amagno.de/",
  },
  logo: null,
  categories: { primary: "dokumentenmanagement-software", secondary: [] },
  tagline:
    "DMS aus Oldenburg in der Business Cloud – verschlüsselt in deutschen Rechenzentren",
  bestFor: "KMU, die ein Cloud-DMS aus Deutschland suchen",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Pakete für 5, 20 oder 100 Nutzer (Named oder Concurrent); die Preise zeigt ein Kalkulator, die Seite selbst nennt keine Beträge. Mindestabnahme 5 Lizenzen, Pakete kombinierbar, Speicher gegen Aufpreis erweiterbar. Größere Pakete sind pro Nutzer günstiger.",
    plans: [
      {
        id: "5er",
        name: "5er-Paket",
        model: { type: "quote", minUnits: 5 },
        features: core,
        highlights: ["5 Nutzer", "12,5 GB Speicher", "Amagno.AI optional"],
      },
      {
        id: "20er",
        name: "20er-Paket",
        model: { type: "quote", minUnits: 20 },
        features: core,
        highlights: ["20 Nutzer", "50 GB Speicher"],
        recommended: true,
      },
      {
        id: "100er",
        name: "100er-Paket",
        model: { type: "quote", minUnits: 100 },
        features: core,
        highlights: ["100 Nutzer", "250 GB Speicher"],
      },
    ],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
  },
  trial: { available: "ja", days: 30 },
  freePlan: "nein",
  features: dmsFeatures({
    ocr: { status: "ja" },
    volltextsuche: { status: "ja" },
    rechte: { status: "ja", note: "Benutzer- und Rechteverwaltung" },
    workflows: { status: "ja", note: "Standard-Workflows" },
    "web-client": { status: "ja", note: "Web-App und Windows-Client" },
    api: { status: "ja", note: "REST-API" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Daten verschlüsselt in deutschen Rechenzentren laut Preisseite",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "unbekannt",
    source: { name: "Amagno", url: source, accessedAt: checked },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "windows"],
  scores: {
    funktionen: 75,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 85,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen: "OCR, Volltextsuche, Workflows und REST-API.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Preise nur im Kalkulator, mindestens 5 Lizenzen.",
    datenschutz: "Verschlüsselt in deutschen Rechenzentren.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "REST-API.",
  },
  pros: [
    {
      title: "Hosting in Deutschland",
      detail: "Verschlüsselte Speicherung in deutschen Rechenzentren.",
    },
    {
      title: "30 Tage Test",
      detail: "Kostenlos mit 2 Nutzern und KI-Funktionen.",
    },
  ],
  cons: [
    {
      title: "Mindestens 5 Lizenzen",
      detail: "Direktkauf erst ab dem 5er-Paket.",
    },
    {
      title: "Preise nur im Kalkulator",
      detail: "Keine Beträge auf der Preisseite.",
    },
  ],
  verdict: {
    short:
      "Amagno ist ein Cloud-DMS aus Deutschland mit verschlüsselter Speicherung und REST-API. Für Teams ab fünf Personen eine Alternative zu großen ECM-Systemen; Preise liefert der Kalkulator.",
    idealFor: [
      "KMU mit Cloud-Strategie",
      "Teams, die Hosting in Deutschland verlangen",
    ],
    notIdealFor: ["Einzelpersonen"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Amagno", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Pakete, Hosting und Testangebot erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
