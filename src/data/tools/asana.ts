import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, pmFeatures, usdNote } from "./_pm";

const personal = ["aufgaben", "kanban", "kalender", "app", "api"];
const starter = [
  ...personal,
  "gantt",
  "automatisierung",
  "vorlagen",
  "berichte",
  "gaeste",
];
const advanced = [...starter, "workload", "zeiterfassung"];
const source = "https://asana.com/de/pricing";

export const asana = {
  slug: "asana",
  name: "Asana",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Asana, Inc.",
    hq: "San Francisco",
    countryCode: "US",
    website: "https://asana.com/de",
  },
  logo: null,
  categories: { primary: "projektmanagement-software", secondary: [] },
  tagline:
    "Aufgaben, Zeitleisten und Ziele für Teams – von der Liste bis zum Portfolio",
  bestFor: "Marketing-, Kreativ- und Operations-Teams",
  companySizes: ["kleinst", "klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: usdNote(),
    plans: [
      {
        id: "personal",
        name: "Personal",
        model: { type: "free", limits: "Bis zu 2 Nutzer", maxUnits: 2 },
        features: personal,
        highlights: [
          "Unbegrenzte Aufgaben und Projekte",
          "Listen, Boards, Kalender",
          "100+ Integrationen",
        ],
      },
      {
        id: "starter",
        name: "Starter",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: starter,
        highlights: [
          "Zeitleiste & Gantt",
          "Dashboards",
          "Unbegrenzte Automatisierungen",
          "Formulare",
          "Kostenlose Gäste",
        ],
        recommended: true,
      },
      {
        id: "advanced",
        name: "Advanced",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: advanced,
        highlights: [
          "Alles aus Starter",
          "Portfolios & Ziele",
          "Ressourcenmanagement",
          "Freigaben",
          "Zeiterfassung",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: { type: "quote" },
        features: [...advanced, "sso"],
        highlights: ["SAML-SSO", "SCIM", "Kapazitätsplanung"],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
  },
  trial: { available: "ja" },
  freePlan: "ja",
  features: pmFeatures({
    aufgaben: { status: "ja" },
    kanban: { status: "ja" },
    gantt: { status: "ja", fromPlan: "starter" },
    kalender: { status: "ja" },
    workload: { status: "ja", fromPlan: "advanced" },
    automatisierung: { status: "ja", fromPlan: "starter" },
    vorlagen: { status: "ja", fromPlan: "starter" },
    berichte: { status: "ja", fromPlan: "starter", note: "Dashboards" },
    gaeste: { status: "ja", fromPlan: "starter" },
    zeiterfassung: {
      status: "ja",
      fromPlan: "advanced",
      note: "Im Free-Tarif nur über Integrationen",
    },
    app: { status: "ja" },
    api: { status: "ja" },
    sso: { status: "ja", fromPlan: "enterprise", note: "SAML" },
  }),
  integrations: [
    "microsoft-365",
    "google-workspace",
    "slack",
    "microsoft-teams",
    "zapier",
  ],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "ja",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Asana", url: source, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "windows", "macos", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 60,
    support: 70,
    integrationen: 90,
  },
  scoreNotes: {
    funktionen:
      "Von Listen bis Portfolios und Zielen; Ressourcen erst in Advanced.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Gratis-Tarif für 2 Nutzer; Euro-Preise nicht verifiziert.",
    datenschutz: "Serverstandort für Kunden in Deutschland nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Über 100 Integrationen, offene API.",
  },
  pros: [
    {
      title: "Viele Ansichten",
      detail: "Liste, Board, Kalender und Zeitleiste für dieselben Aufgaben.",
    },
    {
      title: "Unbegrenzte Automatisierungen",
      detail: "Ab Starter ohne Obergrenze laut Preisseite.",
    },
  ],
  cons: [
    {
      title: "Keine Euro-Preise sichtbar",
      detail: "Die Preisseite zeigte uns nur US-Dollar.",
    },
    {
      title: "Ressourcen erst in Advanced",
      detail: "Auslastung und Zeiterfassung kosten den höheren Tarif.",
    },
  ],
  verdict: {
    short:
      "Asana ist ein ausgereiftes Tool für Teams, die viele parallele Projekte koordinieren. Für Auslastung und Zeiterfassung brauchst du Advanced; kläre Euro-Preis und Serverstandort vor dem Kauf.",
    idealFor: [
      "Marketing- und Kreativteams",
      "Unternehmen mit vielen parallelen Projekten",
    ],
    notIdealFor: ["Teams, die Hosting in Deutschland verlangen"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Asana", url: source, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Tarife und Dollarpreise erstmals erfasst." },
  ],
} satisfies ToolInput;
