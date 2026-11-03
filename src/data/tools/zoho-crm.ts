import type { ToolInput } from "@/lib/schema";
import { checkedCrm as checked, crmFeatures } from "./_crm";

const free = [
  "kontakte",
  "pipeline",
  "aufgaben",
  "automatisierung",
  "app",
  "api",
];
const source = "https://www.zoho.com/de/crm/zohocrm-pricing.html";

export const zohoCrm = {
  slug: "zoho-crm",
  name: "Zoho CRM",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Zoho Corporation",
    hq: "Chennai",
    countryCode: "IN",
    website: "https://www.zoho.com/de/crm/",
  },
  logo: null,
  categories: { primary: "crm-software", secondary: [] },
  tagline:
    "Funktionsreiches CRM mit kostenloser Edition für bis zu drei Nutzer",
  bestFor: "Preisbewusste KMU, die viel anpassen wollen",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Die kostenlose Edition gilt für bis zu drei Nutzer. Die Euro-Preise der Bezahleditionen (Standard, Professional, Enterprise, Ultimate) zeigt Zoho je nach Standort dynamisch an; wir konnten sie nicht verlässlich auslesen und führen sie deshalb als „auf Anfrage“.",
    plans: [
      {
        id: "free",
        name: "Free",
        model: { type: "free", limits: "Bis zu 3 Nutzer", maxUnits: 3 },
        features: free,
        highlights: [
          "Bis zu 3 Nutzer",
          "Kontakte & Deals",
          "Workflows",
          "Mobile Apps",
          "API (5.000 Aufrufe pro Tag)",
        ],
      },
      {
        id: "paid",
        name: "Standard bis Ultimate",
        model: {
          type: "quote",
          note: "Preis je Edition auf der Zoho-Preisseite",
        },
        features: free,
        highlights: [
          "Mehr Nutzer",
          "Erweiterte Automatisierung",
          "Prognosen und Analysen",
        ],
        recommended: true,
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [],
  },
  trial: { available: "ja" },
  freePlan: "ja",
  features: crmFeatures({
    kontakte: { status: "ja" },
    pipeline: { status: "ja" },
    aufgaben: { status: "ja" },
    automatisierung: {
      status: "ja",
      note: "Workflows bereits in der Free-Edition",
    },
    app: { status: "ja" },
    api: { status: "ja", note: "Free: 5.000 Aufrufe pro Tag" },
  }),
  integrations: ["microsoft-365", "google-workspace", "zapier"],
  compliance: {
    serverLocation: "EU",
    serverNote:
      "Konten über zoho.eu liegen in Rechenzentren in Amsterdam und Dublin; Supportzugriff aus Indien möglich",
    avv: "unbekannt",
    certifications: ["ISO_27001"],
    certificationNote:
      "Zoho gibt eine Zertifizierung nach ISO 27001 an; das Zertifikat haben wir nicht eingesehen.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Zoho",
      url: "https://www.zoho.com/de/privacy.html",
      accessedAt: checked,
    },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 75,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen: "Großer Funktionsumfang, Workflows schon in der Free-Edition.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Kostenlos bis drei Nutzer; Preise der Bezahleditionen nicht verifiziert.",
    datenschutz:
      "EU-Rechenzentren in Amsterdam und Dublin, ISO 27001 laut Anbieter.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Zoho-Ökosystem mit über 50 Apps, offene API.",
  },
  pros: [
    {
      title: "Kostenlos für kleine Teams",
      detail: "Bis zu drei Nutzer zahlen nichts.",
    },
    {
      title: "Zoho-Ökosystem",
      detail:
        "Lässt sich mit Buchhaltung, Desk und Kampagnen von Zoho verbinden.",
    },
  ],
  cons: [
    {
      title: "Preise schwer vergleichbar",
      detail: "Die Euro-Preise der Editionen werden dynamisch angezeigt.",
    },
    {
      title: "Supportzugriff aus Indien",
      detail: "Trotz EU-Rechenzentrum kann der Support aus Indien zugreifen.",
    },
  ],
  verdict: {
    short:
      "Zoho CRM bietet viel Funktion fürs Geld und eine echte Gratis-Edition für bis zu drei Nutzer. Prüfe die Euro-Preise der Bezahleditionen direkt bei Zoho und kläre den Supportzugriff im AVV.",
    idealFor: [
      "Kleine Teams, die kostenlos starten wollen",
      "Unternehmen, die weitere Zoho-Apps nutzen",
    ],
    notIdealFor: ["Unternehmen, die ausschließlich deutsche Anbieter wollen"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Datenschutzseiten des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    { name: "Zoho", url: source, accessedAt: checked },
    {
      name: "Zoho",
      url: "https://www.zoho.com/de/privacy.html",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Free-Edition, Hosting und Zertifizierung erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
