import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, pmFeatures } from "./_pm";

const core = [
  "aufgaben",
  "kanban",
  "gantt",
  "berichte",
  "automatisierung",
  "app",
  "api",
];
const source = "https://www.atlassian.com/de/software/jira/pricing";

export const jira = {
  slug: "jira",
  name: "Jira",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Atlassian Corporation",
    hq: "Sydney und San Francisco",
    countryCode: "US",
    website: "https://www.atlassian.com/de/software/jira",
  },
  logo: null,
  categories: { primary: "projektmanagement-software", secondary: [] },
  tagline:
    "Agiles Projektmanagement für Software- und IT-Teams mit Scrum und Kanban",
  bestFor: "Software- und IT-Teams",
  companySizes: ["kleinst", "klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Free für bis zu 10 Benutzer mit 2 GB Speicher und Community-Support. Die Preisdaten der Seite für Standard, Premium und Enterprise lagen uns nur in US-Dollar und Yen vor; wir führen sie deshalb ohne Euro-Preis. Preise staffeln sich nach Nutzerzahl.",
    plans: [
      {
        id: "free",
        name: "Free",
        model: {
          type: "free",
          limits: "Bis zu 10 Benutzer, 2 GB Speicher",
          maxUnits: 10,
        },
        features: core,
        highlights: [
          "Bis zu 10 Benutzer",
          "Scrum- und Kanban-Boards",
          "Community-Support",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        model: { type: "quote", note: "Preis in US-Dollar laut Preisseite" },
        features: core,
        highlights: [
          "Mehr als 10 Benutzer",
          "Rollen und Berechtigungen",
          "Mehr Speicher",
        ],
        recommended: true,
      },
      {
        id: "premium",
        name: "Premium",
        model: { type: "quote" },
        features: core,
        highlights: ["Erweiterte Planung", "Höhere Limits"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: { type: "quote" },
        features: core,
        highlights: ["Für große Organisationen"],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
  },
  trial: { available: "ja" },
  freePlan: "ja",
  features: pmFeatures({
    aufgaben: { status: "ja", note: "Vorgänge, Epics und Unteraufgaben" },
    kanban: { status: "ja", note: "Scrum- und Kanban-Boards" },
    gantt: { status: "ja", note: "Zeitleiste" },
    automatisierung: { status: "ja" },
    berichte: { status: "ja", note: "Burndown- und Sprintberichte" },
    dokumente: { status: "addon", note: "Über Confluence" },
    app: { status: "ja" },
    api: { status: "ja" },
  }),
  integrations: ["slack", "microsoft-teams", "google-workspace", "zapier"],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "unbekannt",
    source: { name: "Atlassian", url: source, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: ["community"],
    onboarding: "unbekannt",
    note: "Free nur mit Community-Support",
  },
  platforms: ["web", "windows", "macos", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 60,
    support: 70,
    integrationen: 90,
  },
  scoreNotes: {
    funktionen:
      "Standard für agile Softwareteams; für Fachabteilungen oft zu technisch.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Kostenlos bis 10 Benutzer; Euro-Preise nicht verifiziert.",
    datenschutz: "Datenresidenz für diesen Vergleich nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Atlassian Marketplace mit sehr vielen Apps.",
  },
  pros: [
    {
      title: "Kostenlos bis 10 Benutzer",
      detail: "Kleine Softwareteams starten ohne Kosten.",
    },
    {
      title: "Scrum und Kanban",
      detail: "Sprints, Backlogs und Boards für agile Teams.",
    },
  ],
  cons: [
    {
      title: "Technisch geprägt",
      detail: "Für Marketing oder Verwaltung oft zu komplex.",
    },
    {
      title: "Keine Euro-Preise sichtbar",
      detail: "Die Preisdaten lagen nur in US-Dollar vor.",
    },
  ],
  verdict: {
    short:
      "Jira ist das Werkzeug für agile Software- und IT-Teams. Bis zehn Benutzer ist es kostenlos; Fachabteilungen ohne Scrum-Prozesse sind mit Asana, monday.com oder awork meist besser bedient.",
    idealFor: [
      "Softwareentwicklung mit Scrum",
      "IT-Teams mit Tickets und Sprints",
    ],
    notIdealFor: ["Fachabteilungen ohne agile Prozesse"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Atlassian", url: source, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Tarife und Free-Limit erstmals erfasst." },
  ],
} satisfies ToolInput;
