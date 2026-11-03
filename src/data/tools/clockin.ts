import type { ToolInput } from "@/lib/schema";
import { checkedZeit as checked, zeitFeatures } from "./_zeit";

const starter = [
  "zeiterfassung",
  "app",
  "terminal",
  "abwesenheiten",
  "ueberstunden",
  "datev-lohn",
];
const pro = [...starter, "gps"];
const expert = [...pro, "api"];
const perUser = (monthly: number, annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "mitarbeitende",
    price: { monthly, annualPerMonth },
  }) as const;

export const clockin = {
  slug: "clockin",
  name: "clockin",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "clockin GmbH",
    hq: "Münster",
    countryCode: "DE",
    website: "https://www.clockin.de/",
  },
  logo: null,
  categories: { primary: "zeiterfassungssoftware", secondary: [] },
  tagline:
    "Zeiterfassung per App und Tablet-Terminal für Handwerk, Bau und Dienstleister",
  bestFor: "Handwerksbetriebe und Teams im Außendienst",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.clockin.de/preise",
    note: "Preise pro Nutzer und Monat, netto. Bei 24 Monaten Laufzeit günstiger (Starter 3,50 €, Pro 6,00 €, Expert 12,00 €). Unter 5 Nutzern zusätzlich 10 € Plattform-Pauschale pro Monat. Die strukturierten Daten der Seite nennen abweichende Preise; wir übernehmen die sichtbaren.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        model: perUser(420, 390),
        features: starter,
        highlights: [
          "Browser, App & Tablet-Terminal",
          "Abwesenheiten & Kalender",
          "Digitale Stundenzettel",
          "DATEV-Export",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        model: perUser(720, 670),
        features: pro,
        highlights: [
          "Alles aus Starter",
          "GPS-Erfassung",
          "Datafox-Terminals",
          "Digitale Personalakte",
        ],
        recommended: true,
      },
      {
        id: "expert",
        name: "Expert",
        model: perUser(1440, 1350),
        features: expert,
        highlights: ["Alles aus Pro", "Automatisierte Berichte", "clockin API"],
      },
      {
        id: "gross",
        name: "Großbetriebe",
        model: { type: "quote", note: "Ab 50 Mitarbeitenden", minUnits: 50 },
        features: expert,
        highlights: ["Individuelles Angebot"],
      },
    ],
    addOns: [
      {
        id: "plattform",
        name: "Plattform-Pauschale unter 5 Nutzern",
        unit: "pauschal",
        price: { monthly: 1000, annualPerMonth: 1000 },
      },
      {
        id: "projekte",
        name: "Projekte & Dokumentation",
        unit: "pauschal",
        price: { monthly: 3900, annualPerMonth: 3900 },
        note: "ab 39 € pro Monat",
      },
    ],
    oneTimeFees: [],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "starter",
        price: { monthly: 420, annualPerMonth: 390 },
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: 720, annualPerMonth: 670 },
      },
      {
        date: checked,
        planId: "expert",
        price: { monthly: 1440, annualPerMonth: 1350 },
      },
    ],
  },
  trial: { available: "ja", days: 14, creditCard: false },
  freePlan: "nein",
  features: zeitFeatures({
    zeiterfassung: {
      status: "ja",
      note: "Kommen, Gehen, Pause per Browser, App oder Tablet",
    },
    ueberstunden: { status: "ja", note: "Stundenkonten im Mitarbeiterbereich" },
    abwesenheiten: {
      status: "ja",
      note: "Erweiterte Abwesenheitstypen ab Pro",
    },
    app: { status: "ja" },
    terminal: {
      status: "ja",
      note: "Tablet-Terminal ab Starter, Datafox-Hardware ab Pro",
    },
    gps: { status: "ja", fromPlan: "pro" },
    projektzeiten: {
      status: "addon",
      note: "Projekte & Dokumentation ab 39 € pro Monat",
    },
    "datev-lohn": { status: "ja" },
    api: { status: "ja", fromPlan: "expert" },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "DE",
    serverNote: "Daten laut Anbieter auf Servern in deutschen Rechenzentren",
    avv: "unbekannt",
    certifications: [],
    certificationNote:
      "Laut FAQ TÜV- und ISO-zertifizierte Server; Norm und Zertifikat nicht genannt.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "clockin",
      url: "https://www.clockin.de/en/support/faq",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 75,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen:
      "App, Tablet-Terminal, Abwesenheiten, DATEV-Export, GPS ab Pro; Projektzeiten als Zusatzmodul.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 3,90 € pro Nutzer bei jährlicher Zahlung; Plattform-Pauschale unter 5 Nutzern.",
    datenschutz: "Server in Deutschland; AVV und Zertifikat nicht eingesehen.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "DATEV-Export in allen Tarifen, API in Expert.",
  },
  pros: [
    {
      title: "DATEV-Export schon im Starter",
      detail:
        "Arbeitszeiten gehen ab dem kleinsten Tarif an die Lohnabrechnung.",
    },
    {
      title: "Für Baustelle und Außendienst",
      detail: "Tablet-Terminal, Datafox-Hardware und GPS ab Pro.",
    },
  ],
  cons: [
    {
      title: "Projektzeiten kosten extra",
      detail: "Projekte & Dokumentation ist ein Zusatzmodul ab 39 € im Monat.",
    },
    {
      title: "Mindestpauschale für kleine Teams",
      detail: "Unter 5 Nutzern kommen 10 € pro Monat dazu.",
    },
  ],
  verdict: {
    short:
      "clockin ist auf Handwerk und Außendienst zugeschnitten: App, Tablet-Terminal, GPS und DATEV-Export. Wer Projektzeiten auswerten will, rechnet das Zusatzmodul ein.",
    idealFor: [
      "Handwerks- und Baubetriebe",
      "Teams, die per Tablet-Terminal stempeln",
    ],
    notIdealFor: ["Agenturen, die Projektzeiten abrechnen wollen"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und FAQ-Seiten des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "clockin",
      url: "https://www.clockin.de/preise",
      accessedAt: checked,
    },
    {
      name: "clockin",
      url: "https://www.clockin.de/en/support/faq",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Pakete und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
