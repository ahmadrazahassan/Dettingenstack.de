import type { ToolInput } from "@/lib/schema";
import { checkedZeit as checked, zeitFeatures } from "./_zeit";

const basic = [
  "zeiterfassung",
  "pausen",
  "ueberstunden",
  "abwesenheiten",
  "app",
  "projektzeiten",
];
const pro = [...basic, "projektabrechnung"];
const perUser = (monthly: number, annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "mitarbeitende",
    price: { monthly, annualPerMonth },
  }) as const;

export const clockodo = {
  slug: "clockodo",
  name: "Clockodo",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Clockodo GmbH",
    hq: "Unna",
    countryCode: "DE",
    website: "https://www.clockodo.com/de/",
  },
  logo: null,
  categories: { primary: "zeiterfassungssoftware", secondary: [] },
  tagline:
    "Arbeits- und Projektzeiterfassung mit Urlaubsverwaltung und Übergabe an Rechnungsprogramme",
  bestFor: "Dienstleister und Agenturen mit Arbeits- und Projektzeiten",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.clockodo.com/de/preise/",
    note: "Preise pro Nutzer und Monat, netto; jährliche Zahlung 5 % günstiger (Laufzeit 12 Monate, automatische Verlängerung). Monatliche Zahlung zum Monatsende kündbar. Ab 20 Nutzern individuelles Angebot (Custom). Die Häkchen der Vergleichstabelle waren für uns nicht lesbar; die Funktionszuordnung folgt den Aufzählungen der Preisseite.",
    plans: [
      {
        id: "free",
        name: "Free",
        model: {
          type: "free",
          limits: "Nur für eine Person, ohne Abwesenheiten und Teamfunktionen",
          maxUnits: 1,
        },
        features: ["zeiterfassung", "app", "projektzeiten"],
        highlights: ["Für Solo-Selbstständige", "Fast alle Pro-Funktionen"],
      },
      {
        id: "basic",
        name: "Basic",
        model: perUser(400, 380),
        features: basic,
        highlights: [
          "Arbeitszeitregeln & Pausenabzug",
          "Zeitkonten & Überstunden",
          "Urlaubsverwaltung",
          "Projektzeiten",
          "Apps mit Offline-Modus",
        ],
      },
      {
        id: "basic-plus",
        name: "Basic Plus",
        model: perUser(600, 570),
        features: [...basic, "sso"],
        highlights: [
          "Alles aus Basic",
          "Single Sign-On",
          "Priority-Service",
          "Automatische Backups",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        model: perUser(1000, 950),
        features: pro,
        highlights: [
          "Alles aus Basic",
          "Projektcontrolling",
          "Übergabe an Lexware Office, sevdesk, easybill",
          "Budgets",
        ],
        recommended: true,
      },
      {
        id: "pro-plus",
        name: "Pro Plus",
        model: perUser(1200, 1140),
        features: [...pro, "sso"],
        highlights: ["Alles aus Pro", "Single Sign-On", "Budgetwarnungen"],
      },
      {
        id: "custom",
        name: "Custom",
        model: { type: "quote", note: "Ab 20 Nutzern", minUnits: 20 },
        features: [...pro, "sso"],
        highlights: ["Individuelles Angebot"],
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: {
      minTermMonths: 1,
      noticePeriod: "zum Monatsende (monatlich) bzw. zum Ende der 12 Monate",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "basic",
        price: { monthly: 400, annualPerMonth: 380 },
      },
      {
        date: checked,
        planId: "basic-plus",
        price: { monthly: 600, annualPerMonth: 570 },
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: 1000, annualPerMonth: 950 },
      },
      {
        date: checked,
        planId: "pro-plus",
        price: { monthly: 1200, annualPerMonth: 1140 },
      },
    ],
  },
  trial: { available: "ja", days: 14, creditCard: false },
  freePlan: "ja",
  features: zeitFeatures({
    zeiterfassung: { status: "ja", note: "Stoppuhr und manuelle Eingabe" },
    pausen: { status: "ja", note: "Arbeitszeitregeln und Pausenabzug" },
    ueberstunden: {
      status: "ja",
      note: "Zeitkonten und Überstundenmanagement",
    },
    abwesenheiten: { status: "ja", fromPlan: "basic" },
    app: { status: "ja", note: "Mit Offline-Modus" },
    projektzeiten: {
      status: "ja",
      note: "Kunden, Projekte, Leistungen, Budgets",
    },
    projektabrechnung: {
      status: "ja",
      fromPlan: "pro",
      note: "Rechnungspositionen an Lexware Office, sevdesk, easybill u. a.",
    },
    sso: { status: "ja", fromPlan: "basic-plus" },
    api: {
      status: "teilweise",
      note: "Webhooks und MCP-Server laut Preisseite",
    },
  }),
  integrations: ["lexware"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Microsoft-Azure-Rechenzentren in Frankfurt und Berlin, Notfall-Datenbankserver bei Hetzner",
    avv: "ja",
    certifications: [],
    certificationNote:
      "Laut Trust Center sind die Cloud-Server (Rechenzentren) ISO-27001-zertifiziert, nicht Clockodo selbst.",
    sso: "ja",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Clockodo",
      url: "https://www.clockodo.com/en/trust-center/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: ["telefon", "email"],
    onboarding: "selbst",
    note: "Im Free-Tarif nur E-Mail",
  },
  platforms: ["web", "windows", "macos", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 85,
    datenschutz: 80,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "Arbeitszeit mit Pausenregeln, Zeitkonten, Urlaub und Projektzeiten; Schichtplanung und DATEV-Export nicht belegt.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 3,80 € pro Nutzer bei jährlicher Zahlung, kostenloser Tarif für Solo-Selbstständige.",
    datenschutz: "Azure-Rechenzentren in Deutschland, AVV, SSO ab Basic Plus.",
    support: "Noch nicht getestet. Telefon- und E-Mail-Support ab Basic.",
    integrationen:
      "Übergabe an Rechnungsprogramme, Webhooks; DATEV-Lohnexport nicht genannt.",
  },
  pros: [
    {
      title: "Günstiger Einstieg",
      detail:
        "Arbeitszeit, Urlaub und Projektzeiten ab 3,80 € pro Nutzer im Monat.",
    },
    {
      title: "Projektzeiten an Rechnungsprogramme",
      detail:
        "Ab Pro lassen sich Zeiten als Rechnungspositionen an Lexware Office, sevdesk oder easybill übergeben.",
    },
  ],
  cons: [
    {
      title: "DATEV-Lohnexport nicht belegt",
      detail:
        "Die Preisseite nennt allgemein Import, Export und Lohntool-Anbindungen, aber keinen DATEV-Export.",
    },
    {
      title: "Keine Schichtplanung genannt",
      detail: "Für Schichtbetriebe gibt es spezialisiertere Lösungen.",
    },
  ],
  verdict: {
    short:
      "Clockodo ist eine günstige, breit aufgestellte Zeiterfassung für Dienstleister: Arbeitszeit mit Pausenregeln, Urlaub und Projektzeiten in einem Tool. Für Schichtbetriebe oder DATEV-Lohn solltest du die Anbindung vorab prüfen.",
    idealFor: [
      "Agenturen und Dienstleister mit Projektzeiten",
      "Kleine Teams mit begrenztem Budget",
    ],
    notIdealFor: ["Schichtbetriebe in Pflege, Gastronomie oder Handel"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite und des Trust Centers (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Clockodo",
      url: "https://www.clockodo.com/de/preise/",
      accessedAt: checked,
    },
    {
      name: "Clockodo",
      url: "https://www.clockodo.com/en/trust-center/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Tarife und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
