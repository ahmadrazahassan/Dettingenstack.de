import type { ToolInput } from "@/lib/schema";
import { checkedCrm as checked, crmFeatures } from "./_crm";

const core = [
  "kontakte",
  "pipeline",
  "aufgaben",
  "angebote",
  "berichte",
  "app",
  "api",
];
const source = "https://www.teamleader.eu/de/";

export const teamleaderFocus = {
  slug: "teamleader-focus",
  name: "Teamleader Focus",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Teamleader NV",
    hq: "Gent",
    countryCode: "BE",
    website: "https://www.teamleader.eu/de/",
  },
  logo: null,
  categories: {
    primary: "crm-software",
    secondary: ["projektmanagement-software"],
  },
  tagline:
    "CRM, Angebote, Projekte und Rechnungen für Agenturen und Dienstleister",
  bestFor: "Agenturen und Dienstleister mit 5–50 Personen",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Teamleader nennt auf der Startseite „ab 37 € pro Monat“. Die Pakete SMART, GROW und FLOW haben keine festen Preise auf der Website. Zusätzliche Nutzerlizenz 15 € pro Monat bei jährlicher Zahlung, Jahreszahlung laut Anbieter 17 % günstiger. Einrichtung 750 € oder 1.250 € einmalig.",
    plans: [
      {
        id: "pakete",
        name: "SMART, GROW, FLOW",
        model: { type: "quote", note: "ab 37 € pro Monat laut Startseite" },
        features: core,
        highlights: [
          "CRM & Deals",
          "Angebote",
          "Projekte",
          "Zeiterfassung",
          "Rechnungen",
        ],
        recommended: true,
      },
    ],
    addOns: [
      {
        id: "nutzer",
        name: "Zusätzliche Nutzerlizenz",
        unit: "nutzer",
        price: { monthly: null, annualPerMonth: 1500 },
      },
    ],
    oneTimeFees: [
      {
        label: "Einrichtung",
        amount: 75000,
        note: "750 € oder 1.250 € je nach Paket",
      },
    ],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [],
  },
  trial: { available: "ja" },
  freePlan: "nein",
  features: crmFeatures({
    kontakte: { status: "ja" },
    pipeline: { status: "ja" },
    aufgaben: { status: "ja" },
    angebote: { status: "ja", note: "Angebote mit digitaler Unterschrift" },
    berichte: { status: "ja" },
    app: { status: "ja" },
    api: { status: "ja" },
  }),
  integrations: ["microsoft-365", "google-workspace", "zapier"],
  compliance: {
    serverLocation: "EU",
    serverNote:
      "AWS-Region Dublin (EU-West-1); einzelne Unterauftragsverarbeiter in den USA",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Teamleader",
      url: "https://www.teamleader.eu/de/datenschutz",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de", "en", "fr"],
    channels: [],
    onboarding: "kostenpflichtig",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 75,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen: "CRM, Angebote, Projekte und Rechnungen in einem Tool.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 37 € pro Monat, Paketpreise nicht öffentlich, dazu Einrichtungsgebühr.",
    datenschutz: "Hosting in Irland, einzelne US-Unterauftragsverarbeiter.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Marketplace und API.",
  },
  pros: [
    {
      title: "Vom Deal zur Rechnung",
      detail: "Angebot, Projekt, Zeiterfassung und Rechnung in einem Ablauf.",
    },
    {
      title: "EU-Anbieter",
      detail: "Belgisches Unternehmen mit Hosting in Irland.",
    },
  ],
  cons: [
    {
      title: "Paketpreise nicht öffentlich",
      detail: "Nur der Einstiegspreis steht auf der Website.",
    },
    { title: "Einrichtungsgebühr", detail: "750 € oder 1.250 € einmalig." },
  ],
  verdict: {
    short:
      "Teamleader Focus passt zu Agenturen und Dienstleistern, die Vertrieb, Projekte und Rechnungen in einem Tool wollen. Für reine Vertriebsteams ist ein Pipeline-CRM schlanker.",
    idealFor: [
      "Agenturen mit Projektgeschäft",
      "Dienstleister, die Angebote in Rechnungen umwandeln",
    ],
    notIdealFor: ["Reine Vertriebsteams ohne Projektgeschäft"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Website und der Datenschutzangaben des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [{ name: "Teamleader", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Einstiegspreis, Lizenzpreis und Hosting erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
