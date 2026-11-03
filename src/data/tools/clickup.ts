import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, pmFeatures, usdNote } from "./_pm";

const free = [
  "aufgaben",
  "kanban",
  "kalender",
  "dokumente",
  "automatisierung",
  "app",
  "api",
];
const core = [...free, "gantt"];
const business = [...core, "workload", "berichte", "zeiterfassung"];
const source = "https://clickup.com/pricing";

export const clickup = {
  slug: "clickup",
  name: "ClickUp",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "ClickUp (Mango Technologies, Inc.)",
    hq: "San Diego",
    countryCode: "US",
    website: "https://clickup.com/",
  },
  logo: null,
  categories: { primary: "projektmanagement-software", secondary: [] },
  tagline: "All-in-one-Arbeitsplatz mit Aufgaben, Docs, Whiteboards und KI",
  bestFor: "Teams, die viele Tools in einem bündeln wollen",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: usdNote(),
    plans: [
      {
        id: "free",
        name: "Free Forever",
        model: {
          type: "free",
          limits:
            "60 MB Speicher, 5 Spaces, 100 Automatisierungsaktionen pro Monat",
        },
        features: free,
        highlights: [
          "Unbegrenzte Aufgaben",
          "Docs",
          "Kanban & Kalender",
          "Sprints",
        ],
      },
      {
        id: "core",
        name: "Core",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: core,
        highlights: [
          "Eigene Felder",
          "Unbegrenzter Speicher",
          "Unbegrenzte Gantt-Diagramme",
          "Ziele",
        ],
      },
      {
        id: "business",
        name: "Business",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: business,
        highlights: [
          "Erweiterte Dashboards",
          "Ressourcenmanagement",
          "Zeiterfassung & Timesheets",
          "Google-SSO",
        ],
        recommended: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: { type: "quote" },
        features: [...business, "sso"],
        highlights: [
          "SAML-SSO & SCIM",
          "Datenresidenz EU",
          "White Labeling",
          "Audit-Logs",
        ],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
  },
  trial: { available: "unbekannt" },
  freePlan: "ja",
  features: pmFeatures({
    aufgaben: { status: "ja" },
    kanban: { status: "ja" },
    gantt: { status: "ja", fromPlan: "core" },
    kalender: { status: "ja" },
    workload: { status: "ja", fromPlan: "business" },
    automatisierung: { status: "ja", note: "Free: 100 Aktionen pro Monat" },
    dokumente: { status: "ja" },
    berichte: {
      status: "ja",
      fromPlan: "business",
      note: "Erweiterte Dashboards",
    },
    zeiterfassung: { status: "ja", fromPlan: "business", note: "Timesheets" },
    app: { status: "ja" },
    api: { status: "ja", note: "Free: 100 Aufrufe pro Minute" },
    sso: {
      status: "ja",
      fromPlan: "enterprise",
      note: "Google-SSO ab Business, SAML ab Enterprise",
    },
  }),
  integrations: ["google-workspace", "slack", "microsoft-teams", "zapier"],
  compliance: {
    serverLocation: "EU_US",
    serverNote:
      "Datenresidenz in der EU laut Preisseite erst in Enterprise und Max",
    avv: "unbekannt",
    certifications: [],
    sso: "ja",
    twoFactor: "ja",
    onPremise: "nein",
    source: { name: "ClickUp", url: source, accessedAt: checked },
  },
  support: { languages: ["en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "windows", "macos", "ios", "android"],
  scores: {
    funktionen: 90,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 55,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen: "Sehr großer Funktionsumfang schon im Gratis-Tarif.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Günstige Dollarpreise; Euro-Preise nicht verifiziert.",
    datenschutz: "EU-Datenresidenz erst in Enterprise.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Webhooks und Integrationen, offene API.",
  },
  pros: [
    {
      title: "Starker Gratis-Tarif",
      detail: "Unbegrenzte Aufgaben, Docs und Sprints ohne Kosten.",
    },
    {
      title: "Vieles in einem Tool",
      detail: "Aufgaben, Docs, Whiteboards und Zeiterfassung.",
    },
  ],
  cons: [
    {
      title: "EU-Hosting nur Enterprise",
      detail: "Datenresidenz in der EU gibt es erst im teuersten Tarif.",
    },
    {
      title: "Kann überladen wirken",
      detail: "Der Funktionsumfang verlangt eine klare Struktur.",
    },
  ],
  verdict: {
    short:
      "ClickUp bietet enorm viele Funktionen schon für wenig Geld. Für Unternehmen mit strengen Datenschutzvorgaben ist relevant, dass EU-Datenresidenz erst in Enterprise enthalten ist.",
    idealFor: [
      "Start-ups und Agenturen mit vielen Werkzeugen",
      "Teams, die Docs und Aufgaben bündeln wollen",
    ],
    notIdealFor: [
      "Unternehmen, die Hosting in der EU ohne Enterprise-Vertrag brauchen",
    ],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "ClickUp", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Tarife, Dollarpreise und Datenresidenz erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
