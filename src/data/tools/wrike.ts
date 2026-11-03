import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, pmFeatures, usdNote } from "./_pm";

const free = ["aufgaben", "kanban", "app"];
const team = [...free, "gantt", "berichte"];
const business = [...team, "vorlagen"];
const pinnacle = [...business, "workload"];
const source = "https://www.wrike.com/de/price/";

export const wrike = {
  slug: "wrike",
  name: "Wrike",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Wrike, Inc.",
    hq: "San Diego",
    countryCode: "US",
    website: "https://www.wrike.com/de/",
  },
  logo: null,
  categories: { primary: "projektmanagement-software", secondary: [] },
  tagline:
    "Projektmanagement für wachsende Teams – mit EU-Rechenzentrum in Paris",
  bestFor: "Mittelständische Teams mit vielen Projekten",
  companySizes: ["klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: usdNote(),
    plans: [
      {
        id: "free",
        name: "Free",
        model: {
          type: "free",
          limits: "Grundfunktionen für Aufgaben und Boards",
        },
        features: free,
        highlights: [
          "Aufgaben & Projekte",
          "Kanban- und Tabellenansicht",
          "Web, Desktop, Mobil",
        ],
      },
      {
        id: "team",
        name: "Team",
        model: {
          type: "quote",
          note: "Preis nur in US-Dollar angegeben",
          minUnits: 2,
        },
        features: team,
        highlights: ["2–15 Nutzer", "Gantt-Diagramme", "Dashboards"],
      },
      {
        id: "business",
        name: "Business",
        model: {
          type: "quote",
          note: "Preis nur in US-Dollar angegeben",
          minUnits: 5,
        },
        features: business,
        highlights: ["5–200 Nutzer", "Vorlagen", "Standard-Integrationen"],
        recommended: true,
      },
      {
        id: "pinnacle",
        name: "Pinnacle",
        model: { type: "quote" },
        features: pinnacle,
        highlights: [
          "Ressourcen- und Kapazitätsplanung",
          "Budgetierung",
          "BI-Berichte",
        ],
      },
      {
        id: "apex",
        name: "Apex",
        model: { type: "quote" },
        features: pinnacle,
        highlights: [
          "Wrike Integrate",
          "Wrike Sync",
          "Unbegrenzte Whiteboards",
        ],
      },
    ],
    contract: {
      minTermMonths: 12,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
  },
  trial: { available: "ja" },
  freePlan: "ja",
  features: pmFeatures({
    aufgaben: { status: "ja" },
    kanban: { status: "ja" },
    gantt: { status: "ja", fromPlan: "team" },
    workload: { status: "ja", fromPlan: "pinnacle" },
    vorlagen: { status: "ja", fromPlan: "business" },
    berichte: {
      status: "ja",
      fromPlan: "team",
      note: "Dashboards; BI ab Pinnacle",
    },
    app: { status: "ja" },
  }),
  integrations: [
    "microsoft-365",
    "google-workspace",
    "slack",
    "microsoft-teams",
  ],
  compliance: {
    serverLocation: "EU",
    serverNote:
      "In Europa angelegte Konten liegen im Rechenzentrum in Paris; Wechsel des Standorts auf Anfrage",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Wrike", url: source, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "windows", "macos", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 75,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "Stark bei vielen parallelen Projekten; Ressourcen erst ab Pinnacle.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Euro-Preise nicht verifiziert.",
    datenschutz: "Konten aus Europa im Rechenzentrum in Paris.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Standard-Integrationen, Wrike Integrate in Apex.",
  },
  pros: [
    {
      title: "EU-Rechenzentrum",
      detail: "Konten aus Europa werden in Paris gehostet.",
    },
    {
      title: "Skaliert gut",
      detail: "Business bis 200 Nutzer, darüber Pinnacle und Apex.",
    },
  ],
  cons: [
    {
      title: "Ressourcenplanung teuer",
      detail: "Kapazitätsplanung erst in Pinnacle.",
    },
    {
      title: "Keine Euro-Preise sichtbar",
      detail: "Die Preisseite zeigte uns nur US-Dollar.",
    },
  ],
  verdict: {
    short:
      "Wrike ist eine solide Wahl für Mittelständler mit vielen parallelen Projekten und Hosting in der EU. Für Ressourcen- und Budgetplanung brauchst du einen der oberen Tarife.",
    idealFor: [
      "Mittelstand mit vielen Projekten",
      "Teams, die EU-Hosting ohne Aufpreis wollen",
    ],
    notIdealFor: ["Kleinstteams mit knappem Budget"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Wrike", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Tarife, Dollarpreise und Hosting erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
