import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, pmFeatures, usdNote } from "./_pm";

const free = ["aufgaben", "kanban", "vorlagen", "app"];
const pro = [...free, "automatisierung", "dokumente"];
const business = [...pro, "gantt", "workload", "berichte"];
const source = "https://www.meistertask.com/de/pricing";

export const meistertask = {
  slug: "meistertask",
  name: "MeisterTask",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "MeisterLabs GmbH",
    hq: "Wien",
    countryCode: "AT",
    website: "https://www.meistertask.com/de",
  },
  logo: null,
  categories: { primary: "projektmanagement-software", secondary: [] },
  tagline:
    "Kanban-Aufgabenmanagement mit Servern in Frankfurt – einfach für kleine Teams",
  bestFor: "Kleine Teams, die Kanban einfach nutzen wollen",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: `${usdNote()} Laut Seite netto und je nach Region unterschiedlich; Jahreszahlung bis zu 22 % günstiger.`,
    plans: [
      {
        id: "free",
        name: "Free",
        model: { type: "free", limits: "Bis zu 3 Projekte, 5 Notizen" },
        features: free,
        highlights: [
          "Unbegrenzte Aufgaben und Mitglieder",
          "3 Projekte",
          "Import aus Asana und Trello",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: pro,
        highlights: [
          "Unbegrenzte Projekte",
          "Wiederkehrende Aufgaben",
          "Automatisierungen",
          "Private Projekte",
        ],
        recommended: true,
      },
      {
        id: "business",
        name: "Business",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: business,
        highlights: [
          "Zeitleiste",
          "Teamkapazität",
          "Rollen & Rechte",
          "Eigene Berichte",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: { type: "quote" },
        features: [...business, "sso"],
        highlights: [
          "SSO",
          "Kapazitätsplaner",
          "Portfolios",
          "Support auf Deutsch",
        ],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
  },
  trial: { available: "unbekannt" },
  freePlan: "ja",
  features: pmFeatures({
    aufgaben: { status: "ja", note: "Unteraufgaben ab Business" },
    kanban: { status: "ja" },
    gantt: { status: "ja", fromPlan: "business", note: "Zeitleiste" },
    workload: { status: "ja", fromPlan: "business", note: "Teamkapazität" },
    automatisierung: { status: "ja", fromPlan: "pro" },
    vorlagen: { status: "ja" },
    dokumente: { status: "ja", note: "Notizen; Free bis 5" },
    berichte: { status: "ja", fromPlan: "business" },
    app: { status: "ja" },
    sso: { status: "ja", fromPlan: "enterprise" },
  }),
  integrations: [
    "microsoft-365",
    "google-workspace",
    "slack",
    "microsoft-teams",
    "zapier",
  ],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Server in einem ISO-27001-zertifizierten Rechenzentrum in Frankfurt",
    avv: "unbekannt",
    certifications: ["ISO_27001"],
    certificationNote:
      "ISO 27001:2013 und Trusted-Cloud-Siegel laut Preisseite.",
    sso: "ja",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "MeisterTask", url: source, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: ["email"],
    onboarding: "unbekannt",
    note: "Priorisierter Support per E-Mail und Telefon ab Business",
  },
  platforms: ["web", "windows", "macos", "ios", "android"],
  scores: {
    funktionen: 70,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 85,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen: "Starkes Kanban; Zeitleiste und Kapazität erst in Business.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Günstige Tarife; Euro-Preise nicht verifiziert.",
    datenschutz: "Server in Frankfurt, ISO 27001.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Gängige Integrationen in den Bezahltarifen.",
  },
  pros: [
    {
      title: "Server in Frankfurt",
      detail: "Hosting in Deutschland mit ISO 27001.",
    },
    {
      title: "Einfacher Einstieg",
      detail: "Kanban-Boards, die Teams ohne Schulung nutzen.",
    },
  ],
  cons: [
    {
      title: "Free auf 3 Projekte begrenzt",
      detail: "Für mehr Projekte ist Pro nötig.",
    },
    {
      title: "Wenig Projektsteuerung",
      detail: "Zeitleiste und Kapazität erst in Business.",
    },
  ],
  verdict: {
    short:
      "MeisterTask ist ein einfaches Kanban-Tool mit Servern in Frankfurt. Für kleine Teams ideal; wer Projekte mit Zeitleisten und Ressourcen plant, braucht Business oder ein umfangreicheres Tool.",
    idealFor: [
      "Kleine Teams mit Kanban",
      "Teams, die Hosting in Deutschland wollen",
    ],
    notIdealFor: ["Projekte mit komplexen Abhängigkeiten"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "MeisterTask", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Tarife, Dollarpreise und Hosting erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
