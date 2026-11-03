import type { ToolInput } from "@/lib/schema";
import { dmsFeatures } from "./_dms";
import { analyse, checkedPm as checked } from "./_pm";

const core = ["archiv", "ocr", "volltextsuche", "workflows"];
const priceList =
  "https://www.ecodms.de/en/ecodms-archive/licensing-model-ecodms/official-price-list-of-the-ecodms-license-fee";
const one = "https://www.ecodms.de/en/ecodms-one/licensing-model";

export const ecodms = {
  slug: "ecodms",
  name: "ecoDMS",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "ecoDMS GmbH",
    hq: "Aachen",
    countryCode: "DE",
    website: "https://www.ecodms.de/",
  },
  logo: null,
  categories: { primary: "dokumentenmanagement-software", secondary: [] },
  tagline:
    "Günstiges Archiv- und DMS-System mit Kauflizenz pro gleichzeitiger Verbindung",
  bestFor: "Kleine Büros und Selbstständige mit eigenem Server",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: priceList,
    note: "Business Edition: einmalig 125 € netto pro gleichzeitiger Verbindung mit 24 Monaten Updates, beliebige Lizenzmenge. ecoDMS ONE: einmalig 250 € netto pro gleichzeitiger Verbindung bei Vertragsabschluss, mindestens 3 Verbindungen, dazu 50 € pro Verbindung und Jahr. Unser Rechner zeigt für ONE nur die jährlichen Kosten umgerechnet auf den Monat und zählt eine Verbindung pro Nutzer; die einmaligen Lizenzkosten stehen unter Einmalkosten.",
    plans: [
      {
        id: "business",
        name: "Business Edition (Kauflizenz)",
        model: {
          type: "quote",
          note: "einmalig 125 € pro gleichzeitiger Verbindung",
        },
        features: core,
        highlights: [
          "Kauflizenz",
          "24 Monate Updates",
          "Lizenz pro gleichzeitiger Verbindung",
        ],
      },
      {
        id: "one",
        name: "ecoDMS ONE",
        model: {
          type: "per_unit",
          unit: "nutzer",
          price: { monthly: null, annualPerMonth: 417 },
          minUnits: 3,
        },
        features: core,
        highlights: [
          "250 € einmalig pro Verbindung",
          "50 € pro Verbindung und Jahr",
          "Mindestens 3 Verbindungen",
        ],
        recommended: true,
      },
    ],
    oneTimeFees: [
      {
        label: "Business Edition pro gleichzeitiger Verbindung",
        amount: 12500,
      },
      { label: "ecoDMS ONE pro gleichzeitiger Verbindung", amount: 25000 },
    ],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "nein",
    },
    history: [
      {
        date: checked,
        planId: "one",
        price: { monthly: null, annualPerMonth: 417 },
        note: "50 € pro Jahr",
      },
    ],
  },
  trial: { available: "ja", days: 30 },
  freePlan: "nein",
  features: dmsFeatures({
    archiv: { status: "ja" },
    ocr: { status: "ja" },
    volltextsuche: { status: "ja" },
    workflows: { status: "ja" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    serverNote: "Betrieb auf eigenem Server",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: { name: "ecoDMS", url: priceList, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["windows", "linux", "web"],
  scores: {
    funktionen: 70,
    bedienbarkeit: 70,
    preisLeistung: 90,
    datenschutz: 80,
    support: 70,
    integrationen: 60,
  },
  scoreNotes: {
    funktionen:
      "Archiv, OCR, Suche und Workflows; Umfang im Detail nicht geprüft.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Einmalig 125 € pro Verbindung – sehr günstig für kleine Teams.",
    datenschutz: "Betrieb auf eigenem Server, Daten bleiben im Haus.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen nicht im Detail geprüft.",
  },
  pros: [
    {
      title: "Kauflizenz",
      detail: "Einmalig 125 € pro gleichzeitiger Verbindung statt Abo.",
    },
    { title: "Daten im Haus", detail: "Läuft auf dem eigenen Server." },
  ],
  cons: [
    {
      title: "Eigener Betrieb",
      detail: "Server, Backups und Updates liegen bei dir.",
    },
    {
      title: "Updates zeitlich begrenzt",
      detail: "Kostenlose Updates für 24 oder 48 Monate.",
    },
  ],
  verdict: {
    short:
      "ecoDMS ist das günstige Archiv für kleine Büros mit eigenem Server: Kauflizenz statt Abo, Daten im Haus. Wer keinen Server betreiben will, ist mit einem Cloud-DMS besser bedient.",
    idealFor: [
      "Kleine Büros mit eigener IT",
      "Selbstständige mit Papierbergen",
    ],
    notIdealFor: ["Teams ohne Server oder IT-Kenntnisse"],
  },
  review: analyse(
    "der offiziellen Preisliste und des Lizenzmodells des Anbieters",
  ),
  sources: [
    { name: "ecoDMS", url: priceList, accessedAt: checked },
    { name: "ecoDMS", url: one, accessedAt: checked },
  ],
  changelog: [{ date: checked, note: "Lizenzpreise erstmals erfasst." }],
} satisfies ToolInput;
