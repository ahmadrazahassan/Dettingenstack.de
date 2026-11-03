import type { ToolInput } from "@/lib/schema";
import { checkedZeit as checked, zeitFeatures } from "./_zeit";

const core = [
  "zeiterfassung",
  "pausen",
  "ueberstunden",
  "abwesenheiten",
  "app",
];
const premium = [...core, "schichtplanung"];
const professional = [...premium, "datev-lohn"];

// 39 € base fee (includes Basic support) plus a price per employee.
const plan = (monthly: number, annualPerMonth: number) =>
  ({
    type: "base_plus_per_unit",
    unit: "mitarbeitende",
    base: { monthly: 3900, annualPerMonth: 3900 },
    perUnit: { monthly, annualPerMonth },
    includedUnits: 0,
  }) as const;

export const papershift = {
  slug: "papershift",
  name: "Papershift",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Papershift GmbH",
    hq: "Karlsruhe",
    countryCode: "DE",
    website: "https://www.papershift.com/",
  },
  logo: null,
  categories: { primary: "zeiterfassungssoftware", secondary: [] },
  tagline:
    "Zeiterfassung und automatische Schichtplanung für Gastronomie, Pflege und Handel",
  bestFor: "Schichtbetriebe mit wechselnden Dienstplänen",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.papershift.com/preise",
    note: "Preise pro Mitarbeitendem abgeleitet aus dem Preisbeispiel der Seite für 16 Mitarbeitende (Core 64,00 €, Premium 96,00 €, Professional 144,00 €; bei jährlicher Zahlung 10 % günstiger). Dazu 39 € Grundgebühr pro Monat (zzgl. MwSt.) inklusive Basic-Support. Jahres-Abo mit monatlicher oder jährlicher Abrechnung.",
    plans: [
      {
        id: "core",
        name: "Core",
        model: plan(400, 360),
        features: core,
        highlights: [
          "Zeiterfassung per App, Tablet, Browser",
          "Abwesenheiten",
          "Soll-Stunden",
          "Dokumente",
          "Daten in der EU",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        model: plan(600, 540),
        features: premium,
        highlights: [
          "Alles aus Core",
          "Digitale Schichtplanung",
          "Automatische Schichtzuweisung",
          "Mehrere Standorte",
        ],
        recommended: true,
      },
      {
        id: "professional",
        name: "Professional",
        model: plan(900, 810),
        features: professional,
        highlights: [
          "Alles aus Premium",
          "Vollautomatische Schichtbesetzung",
          "Zuschläge automatisch",
          "DATEV- und LODAS-Export",
        ],
      },
    ],
    addOns: [
      {
        id: "support-plus",
        name: "Support Plus",
        unit: "pauschal",
        price: { monthly: 9900, annualPerMonth: 9900 },
      },
      {
        id: "support-expert",
        name: "Support Expert",
        unit: "pauschal",
        price: { monthly: 39900, annualPerMonth: 39900 },
      },
    ],
    oneTimeFees: [],
    contract: { minTermMonths: 12, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "core",
        price: { monthly: 400, annualPerMonth: 360 },
        note: "abgeleitet aus Preisbeispiel",
      },
      {
        date: checked,
        planId: "premium",
        price: { monthly: 600, annualPerMonth: 540 },
        note: "abgeleitet aus Preisbeispiel",
      },
      {
        date: checked,
        planId: "professional",
        price: { monthly: 900, annualPerMonth: 810 },
        note: "abgeleitet aus Preisbeispiel",
      },
    ],
  },
  trial: { available: "ja", days: 14 },
  freePlan: "nein",
  features: zeitFeatures({
    zeiterfassung: {
      status: "ja",
      note: "Per Smartphone, Tablet oder Browser",
    },
    pausen: { status: "ja", note: "Erweiterte Pausenlogik ab Premium" },
    ueberstunden: { status: "ja", note: "Individuelle Soll-Stunden" },
    abwesenheiten: { status: "ja", note: "Sperrzeiten-Regeln in Professional" },
    schichtplanung: {
      status: "ja",
      fromPlan: "premium",
      note: "Automatische Besetzung nach Regeln",
    },
    app: { status: "ja" },
    terminal: {
      status: "teilweise",
      note: "Tablet-Erfassung; separates Terminal nicht genannt",
    },
    "datev-lohn": {
      status: "ja",
      fromPlan: "professional",
      note: "DATEV und LODAS",
    },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "DE",
    serverNote: "Amazon Web Services, Region Frankfurt",
    avv: "unbekannt",
    certifications: [],
    certificationNote:
      "Laut Datenschutz-FAQ ist Papershift selbst nicht nach ISO 27001 zertifiziert, der Hoster AWS schon.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Papershift",
      url: "https://cdn.papershift.com/20201218130009/Datenschutz_FAQs_Papershift-17-12-2020.pdf",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: [],
    onboarding: "kostenpflichtig",
    note: "Basic-Support in der Grundgebühr, Plus 99 €, Expert 399 € pro Monat",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 75,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "Zeiterfassung mit automatischer Schichtplanung und Zuschlagsberechnung.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "39 € Grundgebühr plus Preis pro Mitarbeitendem; DATEV-Export erst in Professional.",
    datenschutz: "AWS Frankfurt; keine eigene Zertifizierung.",
    support: "Noch nicht getestet. Erweiterter Support kostet extra.",
    integrationen: "DATEV und LODAS in Professional; API nicht genannt.",
  },
  pros: [
    {
      title: "Automatische Schichtplanung",
      detail:
        "Schichten werden nach Regeln vergeben, in Professional vollautomatisch besetzt.",
    },
    {
      title: "Zuschläge automatisch",
      detail:
        "Lohnarten und Zuschläge werden in Professional berechnet und an DATEV oder LODAS übergeben.",
    },
  ],
  cons: [
    { title: "Grundgebühr", detail: "Zu jedem Tarif kommen 39 € pro Monat." },
    {
      title: "DATEV erst im teuersten Tarif",
      detail: "Den Lohnexport gibt es nur in Professional.",
    },
  ],
  verdict: {
    short:
      "Papershift ist stark, wenn Dienstpläne der Engpass sind: automatische Schichtplanung und Zuschlagsberechnung für Gastronomie, Pflege und Handel. Für reine Arbeitszeiterfassung zahlst du mit der Grundgebühr mehr als nötig.",
    idealFor: [
      "Gastronomie, Pflege und Einzelhandel mit Schichtbetrieb",
      "Betriebe mit mehreren Standorten",
    ],
    notIdealFor: ["Büroteams ohne Schichten"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite und der Datenschutz-FAQ (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Papershift",
      url: "https://www.papershift.com/preise",
      accessedAt: checked,
    },
    {
      name: "Papershift",
      url: "https://cdn.papershift.com/20201218130009/Datenschutz_FAQs_Papershift-17-12-2020.pdf",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise (abgeleitet aus dem Preisbeispiel), Tarife und Hosting erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
