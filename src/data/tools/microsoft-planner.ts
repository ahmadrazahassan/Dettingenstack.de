import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, pmFeatures } from "./_pm";

const basic = ["aufgaben", "kanban", "kalender", "app"];
const plan1 = [...basic, "gantt"];
const source =
  "https://www.microsoft.com/de-de/microsoft-365/planner/microsoft-planner-plans-and-pricing";
const eudb =
  "https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn";

export const microsoftPlanner = {
  slug: "microsoft-planner",
  name: "Microsoft Planner",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Microsoft Corporation",
    hq: "Redmond",
    countryCode: "US",
    website:
      "https://www.microsoft.com/de-de/microsoft-365/planner/microsoft-planner",
  },
  logo: null,
  categories: { primary: "projektmanagement-software", secondary: [] },
  tagline:
    "Aufgabenplanung in Microsoft 365 und Teams – Planner Plan 1 für Projekte",
  bestFor: "Teams, die bereits mit Microsoft 365 arbeiten",
  companySizes: ["kleinst", "klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Planner Plan 1 (früher Project Plan 1) kostet laut deutscher Microsoft-Seite 8,70 € pro Benutzer und Monat bei jährlicher Abrechnung, zzgl. MwSt. Die Grundversion von Planner ist in vielen Microsoft-365-Business-Plänen enthalten. Die Preise für Planner and Project Plan 3 und Plan 5 haben wir nicht verifiziert. Für den Test ist eine Kreditkarte nötig.",
    plans: [
      {
        id: "plan-1",
        name: "Planner Plan 1",
        model: {
          type: "per_unit",
          unit: "nutzer",
          price: { monthly: null, annualPerMonth: 870 },
        },
        features: plan1,
        highlights: [
          "Zeitleiste (Gantt)",
          "Boards und Raster",
          "In Teams nutzbar",
        ],
        recommended: true,
      },
      {
        id: "plan-3",
        name: "Planner and Project Plan 3",
        model: { type: "quote" },
        features: plan1,
        highlights: ["Projektportfolios", "Ressourcenverwaltung"],
      },
    ],
    contract: {
      minTermMonths: 12,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [
      {
        date: checked,
        planId: "plan-1",
        price: { monthly: null, annualPerMonth: 870 },
      },
    ],
  },
  trial: { available: "ja", days: 30, creditCard: true },
  freePlan: "nein",
  features: pmFeatures({
    aufgaben: { status: "ja" },
    kanban: { status: "ja" },
    gantt: { status: "ja", fromPlan: "plan-1", note: "Zeitleiste" },
    kalender: { status: "ja" },
    app: { status: "ja" },
    sso: { status: "ja", note: "Anmeldung über Microsoft Entra ID" },
  }),
  integrations: ["microsoft-365", "microsoft-teams"],
  compliance: {
    serverLocation: "EU",
    serverNote: "Für Kunden in der EU gilt die EU Data Boundary",
    avv: "ja",
    certifications: [],
    sso: "ja",
    twoFactor: "ja",
    onPremise: "nein",
    source: { name: "Microsoft Learn", url: eudb, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "windows", "ios", "android"],
  scores: {
    funktionen: 65,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 80,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "Solide Aufgabenplanung; Portfolios und Ressourcen erst in Plan 3.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Grundversion oft in Microsoft 365 enthalten, Plan 1 für 8,70 €.",
    datenschutz: "EU Data Boundary, Anmeldung über Entra ID.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Eng verzahnt mit Teams, Outlook und To Do.",
  },
  pros: [
    {
      title: "Oft schon bezahlt",
      detail: "Die Grundversion steckt in vielen Microsoft-365-Plänen.",
    },
    {
      title: "In Teams integriert",
      detail: "Aufgaben direkt im Teams-Kanal planen.",
    },
  ],
  cons: [
    {
      title: "Begrenzter Funktionsumfang",
      detail: "Ohne Plan 3 keine Portfolios oder Ressourcen.",
    },
    { title: "Jahresabo", detail: "Plan 1 wird jährlich abgerechnet." },
  ],
  verdict: {
    short:
      "Microsoft Planner ist der naheliegende Start für Teams mit Microsoft 365. Für einfache Projekte reicht die Grundversion, für Zeitleisten Plan 1; komplexe Portfolios verlangen teurere Pläne.",
    idealFor: ["Unternehmen mit Microsoft 365", "Teams, die in Teams arbeiten"],
    notIdealFor: ["Agenturen mit Zeiterfassung und Abrechnung"],
  },
  review: analyse(
    "der deutschen Preisseite von Microsoft und der Dokumentation zur EU Data Boundary",
  ),
  sources: [
    { name: "Microsoft", url: source, accessedAt: checked },
    { name: "Microsoft Learn", url: eudb, accessedAt: checked },
  ],
  changelog: [
    { date: checked, note: "Preis für Plan 1 und Hosting erstmals erfasst." },
  ],
} satisfies ToolInput;
