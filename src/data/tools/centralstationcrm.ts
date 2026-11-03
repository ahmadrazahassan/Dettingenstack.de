import type { ToolInput } from "@/lib/schema";
import { checkedCrm as checked, crmFeatures } from "./_crm";

const base = ["kontakte", "aufgaben", "app", "api"];
const paid = [...base, "pipeline", "berichte"];
// Packages with a fixed number of users and contacts, monthly net price.
const pack = (monthly: number, users: number) =>
  ({
    type: "flat",
    unit: "nutzer",
    price: { monthly, annualPerMonth: null },
    includedUnits: users,
  }) as const;
const source = "https://centralstationcrm.de/preise";

export const centralstationcrm = {
  slug: "centralstationcrm",
  name: "CentralStationCRM",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "42he GmbH",
    hq: "Köln",
    countryCode: "DE",
    website: "https://centralstationcrm.de/",
  },
  logo: null,
  categories: { primary: "crm-software", secondary: [] },
  tagline:
    "Einfaches CRM aus Köln für kleine Teams – Pakete statt Preis pro Nutzer",
  bestFor: "Kleine Teams, die ein schlankes deutsches CRM suchen",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Paketpreise pro Monat, netto, mit festen Grenzen für Nutzer und Kontakte. Keine langen Laufzeiten: Kündigung laut Anbieter zum nächsten Tag wirksam. Pipelines und Kennzahlen sind Zusatzmodule der Bezahltarife.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        model: { type: "free", limits: "3 Nutzer, 200 Kontakte", maxUnits: 3 },
        features: base,
        highlights: ["Kostenlos", "3 Nutzer", "200 Kontakte"],
      },
      {
        id: "team",
        name: "Team",
        model: pack(2500, 3),
        features: paid,
        highlights: ["3 Nutzer", "3.000 Kontakte"],
        recommended: true,
      },
      {
        id: "small-office",
        name: "Small Office",
        model: pack(7900, 10),
        features: paid,
        highlights: ["10 Nutzer", "10.000 Kontakte"],
      },
      {
        id: "business",
        name: "Business",
        model: pack(15500, 20),
        features: paid,
        highlights: ["20 Nutzer", "20.000 Kontakte"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: pack(29900, 40),
        features: paid,
        highlights: ["40 Nutzer", "40.000 Kontakte"],
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: {
      minTermMonths: 0,
      noticePeriod: "Kündigung zum nächsten Tag laut Preisseite",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "team",
        price: { monthly: 2500, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "small-office",
        price: { monthly: 7900, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "business",
        price: { monthly: 15500, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "enterprise",
        price: { monthly: 29900, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "ja", days: 30 },
  freePlan: "ja",
  features: crmFeatures({
    kontakte: { status: "ja", note: "Kontakt- und Firmenhistorie" },
    pipeline: {
      status: "teilweise",
      note: "Pipelines als Zusatzmodul der Bezahltarife",
    },
    aufgaben: { status: "ja" },
    berichte: { status: "teilweise", note: "Kennzahlen als Zusatzmodul" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Speicherung von Kundendaten und Anhängen in Deutschland laut Anbieter",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "CentralStationCRM", url: source, accessedAt: checked },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 65,
    bedienbarkeit: 70,
    preisLeistung: 85,
    datenschutz: 85,
    support: 70,
    integrationen: 55,
  },
  scoreNotes: {
    funktionen:
      "Bewusst schlank; Pipelines und Kennzahlen als Module, Automatisierung nicht belegt.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "25 € im Monat für drei Nutzer – günstiger als die meisten Preise pro Nutzer.",
    datenschutz: "Deutscher Anbieter, Daten in Deutschland; AVV nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen auf der Preisseite nicht im Detail genannt.",
  },
  pros: [
    {
      title: "Daten in Deutschland",
      detail: "Deutscher Anbieter mit Speicherung in Deutschland.",
    },
    {
      title: "Pakete statt Nutzerpreise",
      detail: "Das Team-Paket für drei Nutzer kostet 25 € im Monat.",
    },
  ],
  cons: [
    {
      title: "Wenig Automatisierung belegt",
      detail: "Sequenzen, Prognosen und Workflows nennt die Preisseite nicht.",
    },
    {
      title: "Kontaktgrenzen",
      detail: "Jedes Paket begrenzt die Zahl der Kontakte.",
    },
  ],
  verdict: {
    short:
      "CentralStationCRM ist ein schlankes deutsches CRM für kleine Teams, die Kontakte und Wiedervorlagen sauber führen wollen. Wer Automatisierung und Prognosen braucht, schaut sich Pipedrive oder HubSpot an.",
    idealFor: [
      "Kleine Teams mit Fokus auf Kontaktpflege",
      "Unternehmen, die Daten in Deutschland wollen",
    ],
    notIdealFor: ["Vertriebsteams mit automatisierten Sequenzen"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [{ name: "CentralStationCRM", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Paketpreise, Grenzen und Hosting erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
