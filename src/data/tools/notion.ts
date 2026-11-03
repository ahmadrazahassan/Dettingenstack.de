import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, pmFeatures, usdNote } from "./_pm";

const free = [
  "aufgaben",
  "kanban",
  "kalender",
  "dokumente",
  "vorlagen",
  "app",
  "api",
];
const plus = [...free, "berichte"];
const source = "https://www.notion.com/de/pricing";

export const notion = {
  slug: "notion",
  name: "Notion",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Notion Labs, Inc.",
    hq: "San Francisco",
    countryCode: "US",
    website: "https://www.notion.com/de",
  },
  logo: null,
  categories: { primary: "projektmanagement-software", secondary: [] },
  tagline:
    "Wiki, Dokumente und Projektdatenbanken in einem flexiblen Arbeitsbereich",
  bestFor: "Teams, die Wissen und Aufgaben zusammenführen",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: `${usdNote()} Jährliche Zahlung laut Seite bis zu 20 % günstiger.`,
    plans: [
      {
        id: "free",
        name: "Free",
        model: { type: "free", limits: "Für Einzelpersonen und erste Tests" },
        features: free,
        highlights: [
          "Seiten und Datenbanken",
          "Notion Calendar",
          "Einfache Formulare und Websites",
        ],
      },
      {
        id: "plus",
        name: "Plus",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: plus,
        highlights: [
          "Eigene Formulare und Websites",
          "Diagramme",
          "5 GB Uploads",
          "Slack- und Drive-Anbindung",
        ],
        recommended: true,
      },
      {
        id: "business",
        name: "Business",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: [...plus, "sso"],
        highlights: [
          "Notion Agent und KI-Meetingnotizen",
          "Private Teambereiche",
          "SAML-SSO",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: { type: "quote" },
        features: [...plus, "sso"],
        highlights: ["SCIM", "Audit-Log", "Erweiterte Sicherheit"],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
  },
  trial: { available: "unbekannt" },
  freePlan: "ja",
  features: pmFeatures({
    aufgaben: {
      status: "ja",
      note: "Datenbanken mit Unteraufgaben und Abhängigkeiten",
    },
    kanban: { status: "ja" },
    kalender: { status: "ja" },
    dokumente: { status: "ja", note: "Kernfunktion: Wiki und Dokumente" },
    vorlagen: { status: "ja" },
    berichte: { status: "ja", fromPlan: "plus", note: "Diagramme" },
    app: { status: "ja" },
    api: { status: "ja" },
    sso: { status: "ja", fromPlan: "business", note: "SAML" },
  }),
  integrations: ["slack", "google-workspace", "zapier"],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "ja",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Notion", url: source, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "windows", "macos", "ios", "android"],
  scores: {
    funktionen: 75,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 55,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen:
      "Stark bei Wissen und Dokumentation; klassische Projektsteuerung schwächer.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Günstiger Plus-Tarif; Euro-Preise nicht verifiziert.",
    datenschutz: "EU-Datenresidenz auf der Preisseite nicht genannt.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Slack, Google Drive und offene API.",
  },
  pros: [
    {
      title: "Wiki und Aufgaben zusammen",
      detail: "Dokumentation und Projekte im selben Arbeitsbereich.",
    },
    {
      title: "Sehr flexibel",
      detail: "Datenbanken lassen sich für fast jeden Ablauf bauen.",
    },
  ],
  cons: [
    {
      title: "Kein Gantt mit Ressourcen",
      detail: "Auslastung und Kapazität fehlen laut Preisseite.",
    },
    {
      title: "Hosting nicht belegt",
      detail: "Zur EU-Datenresidenz sagt die Preisseite nichts.",
    },
  ],
  verdict: {
    short:
      "Notion ist ideal, wenn Wissen, Dokumentation und leichte Projektarbeit an einem Ort liegen sollen. Für Ressourcenplanung und strenge Datenschutzvorgaben gibt es passendere Tools.",
    idealFor: [
      "Teams mit viel Dokumentation",
      "Start-ups, die Wiki und Aufgaben bündeln",
    ],
    notIdealFor: ["Projekte mit Ressourcen- und Budgetplanung"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Notion", url: source, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Tarife und Dollarpreise erstmals erfasst." },
  ],
} satisfies ToolInput;
