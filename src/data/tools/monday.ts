import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, pmFeatures, usdNote } from "./_pm";

const free = ["aufgaben", "kanban", "vorlagen", "app"];
const basic = [...free, "dokumente"];
const standard = [
  ...basic,
  "gantt",
  "kalender",
  "automatisierung",
  "gaeste",
  "api",
];
const pro = [...standard, "zeiterfassung"];
const source = "https://monday.com/lang/de/pricing";

export const monday = {
  slug: "monday",
  name: "monday.com",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "monday.com Ltd.",
    hq: "Tel Aviv",
    countryCode: "IL",
    website: "https://monday.com/lang/de/",
  },
  logo: null,
  categories: { primary: "projektmanagement-software", secondary: [] },
  tagline:
    "Flexible Boards für Projekte und Workflows – mit Automatisierungen ab Standard",
  bestFor: "Teams, die Abläufe visuell abbilden wollen",
  companySizes: ["kleinst", "klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: `${usdNote()} Laut FAQ starten die Bezahlpakete ab 3 Nutzern, Jahrespläne sind 18 % günstiger. Enterprise auf Anfrage.`,
    plans: [
      {
        id: "free",
        name: "Free",
        model: {
          type: "free",
          limits: "Bis zu 2 Nutzer, 3 Boards",
          maxUnits: 2,
        },
        features: free,
        highlights: [
          "Bis zu 3 Boards",
          "200+ Vorlagen",
          "Apps für iOS und Android",
        ],
      },
      {
        id: "basic",
        name: "Basic",
        model: {
          type: "quote",
          note: "Preis nur in US-Dollar angegeben",
          minUnits: 3,
        },
        features: basic,
        highlights: ["Unbegrenzte Elemente", "Unbegrenzte Betrachter"],
      },
      {
        id: "standard",
        name: "Standard",
        model: {
          type: "quote",
          note: "Preis nur in US-Dollar angegeben",
          minUnits: 3,
        },
        features: standard,
        highlights: [
          "Zeitleiste & Gantt",
          "Kalender",
          "250 Automatisierungen/Monat",
          "Gastzugang",
        ],
        recommended: true,
      },
      {
        id: "pro",
        name: "Pro",
        model: {
          type: "quote",
          note: "Preis nur in US-Dollar angegeben",
          minUnits: 3,
        },
        features: pro,
        highlights: [
          "25.000 Automatisierungen/Monat",
          "Private Boards",
          "Zeiterfassung",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: { type: "quote" },
        features: pro,
        highlights: [
          "Portfolio- und Ressourcenmanagement",
          "Mehrstufige Berechtigungen",
          "99,9 % SLA",
        ],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
  },
  trial: { available: "ja" },
  freePlan: "ja",
  features: pmFeatures({
    aufgaben: { status: "ja" },
    kanban: { status: "ja" },
    gantt: { status: "ja", fromPlan: "standard" },
    kalender: { status: "ja", fromPlan: "standard" },
    workload: {
      status: "ja",
      fromPlan: "enterprise",
      note: "Ressourcenmanagement",
    },
    automatisierung: {
      status: "ja",
      fromPlan: "standard",
      note: "250 Aktionen pro Monat in Standard",
    },
    vorlagen: { status: "ja" },
    dokumente: { status: "ja", note: "Docs" },
    gaeste: { status: "ja", fromPlan: "standard" },
    zeiterfassung: { status: "ja", fromPlan: "pro" },
    app: { status: "ja" },
    api: {
      status: "ja",
      fromPlan: "standard",
      note: "1.000 Aufrufe pro Tag in Standard",
    },
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
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "monday.com", url: source, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "windows", "macos", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 60,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen: "Sehr flexible Boards; Gantt und Automatisierung ab Standard.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Mindestens 3 Nutzer in Bezahltarifen; Euro-Preise nicht verifiziert.",
    datenschutz: "Serverstandort für Kunden in Deutschland nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Viele Integrationen, API ab Standard.",
  },
  pros: [
    {
      title: "Sehr flexibel",
      detail: "Boards lassen sich für Projekte, CRM oder Abläufe anpassen.",
    },
    {
      title: "Großer Gratis-Einstieg",
      detail: "Free mit drei Boards und über 200 Vorlagen.",
    },
  ],
  cons: [
    {
      title: "Mindestens 3 Nutzer",
      detail: "Bezahltarife starten laut FAQ ab drei Nutzern.",
    },
    {
      title: "Automatisierung begrenzt",
      detail: "Standard enthält 250 Automatisierungsaktionen pro Monat.",
    },
  ],
  verdict: {
    short:
      "monday.com ist ideal für Teams, die ihre Abläufe visuell und flexibel abbilden wollen. Rechne mit mindestens drei Lizenzen und prüfe, ob die Automatisierungs-Kontingente in Standard reichen.",
    idealFor: [
      "Teams mit individuellen Workflows",
      "Abteilungen, die Projekte und Prozesse mischen",
    ],
    notIdealFor: ["Einzelpersonen mit Bezahlbedarf"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "monday.com", url: source, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Tarife und Dollarpreise erstmals erfasst." },
  ],
} satisfies ToolInput;
