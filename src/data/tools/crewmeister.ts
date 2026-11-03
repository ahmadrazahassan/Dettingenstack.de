import type { ToolInput } from "@/lib/schema";
import { checkedZeit as checked, zeitFeatures } from "./_zeit";

const go = ["zeiterfassung", "app", "terminal", "projektzeiten", "gps"];
const easy = [...go, "abwesenheiten", "ueberstunden"];
const perUser = (annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "mitarbeitende",
    price: { monthly: null, annualPerMonth },
    maxUnits: 50,
  }) as const;

export const crewmeister = {
  slug: "crewmeister",
  name: "Crewmeister",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "ATOSS Aloud GmbH (Crewmeister)",
    hq: "München",
    countryCode: "DE",
    website: "https://crewmeister.com/de/",
  },
  logo: null,
  categories: { primary: "zeiterfassungssoftware", secondary: [] },
  tagline:
    "Günstige Zeiterfassung per App und Terminal für kleine Betriebe, Teil der ATOSS-Gruppe",
  bestFor: "Kleine Betriebe, die günstig digital stempeln wollen",
  companySizes: ["kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://crewmeister.com/de/preise/",
    note: "Preise pro Nutzer und Monat bei jährlicher Zahlung (ein Monat gratis), netto. Die Monatspreise sind auf der Seite nicht eindeutig beschriftet. Ab 50 Nutzern individuelles Angebot. Kein Vertrag, jederzeit zum Ende des Abrechnungszeitraums kündbar.",
    plans: [
      {
        id: "go",
        name: "Go",
        model: perUser(150),
        features: go,
        highlights: [
          "Zeiterfassung per App & Terminal",
          "Projektzeiten",
          "GPS-Standort",
          "Excel-Export",
        ],
      },
      {
        id: "easy",
        name: "Easy",
        model: perUser(200),
        features: easy,
        highlights: [
          "Alles aus Go",
          "Urlaubsplaner & Abwesenheiten",
          "Überstundenkonto",
        ],
        recommended: true,
      },
      {
        id: "pro",
        name: "Pro",
        model: perUser(300),
        features: easy,
        highlights: [
          "Alles aus Easy",
          "Erweiterte Projektzeiten",
          "Terminal-Varianten",
          "Rechte je Team",
          "Zuschläge",
        ],
      },
      {
        id: "gross",
        name: "Ab 50 Nutzern",
        model: { type: "quote", minUnits: 51 },
        features: easy,
        highlights: ["Individuelles Angebot"],
      },
    ],
    addOns: [
      {
        id: "schicht",
        name: "Schichtplaner",
        unit: "mitarbeitende",
        price: { monthly: null, annualPerMonth: 200 },
        note: "ab 2 €",
      },
      {
        id: "datev",
        name: "DATEV-Integration",
        unit: "mitarbeitende",
        price: { monthly: null, annualPerMonth: 60 },
        note: "ab 0,60 €",
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 0,
      noticePeriod: "zum Ende des Abrechnungszeitraums",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "go",
        price: { monthly: null, annualPerMonth: 150 },
      },
      {
        date: checked,
        planId: "easy",
        price: { monthly: null, annualPerMonth: 200 },
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: null, annualPerMonth: 300 },
      },
    ],
  },
  trial: { available: "ja", days: 14, creditCard: false },
  freePlan: "nein",
  features: zeitFeatures({
    zeiterfassung: { status: "ja" },
    ueberstunden: { status: "ja", fromPlan: "easy", note: "Überstundenkonto" },
    abwesenheiten: { status: "ja", fromPlan: "easy" },
    schichtplanung: { status: "addon", note: "Ab 2 € pro Nutzer und Monat" },
    app: { status: "ja" },
    terminal: { status: "ja", note: "Weitere Terminal-Varianten in Pro" },
    gps: { status: "ja" },
    projektzeiten: { status: "ja", note: "Erweitert in Pro" },
    "datev-lohn": {
      status: "addon",
      note: "Ab 0,60 € pro Nutzer; offizieller DATEV-Partner",
    },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Amazon Web Services in Frankfurt am Main; laut Anbieter keine Übertragung in Nicht-EU-Länder durch AWS",
    avv: "ja",
    certifications: [],
    certificationNote:
      "Quartalsweise externe Penetrationstests laut Anbieter; keine Zertifizierung genannt.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Crewmeister",
      url: "https://crewmeister.com/de/dsgvo",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "selbst" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 70,
    bedienbarkeit: 70,
    preisLeistung: 90,
    datenschutz: 80,
    support: 70,
    integrationen: 65,
  },
  scoreNotes: {
    funktionen:
      "App, Terminal, GPS und Projektzeiten ab Go; Schichtplanung und DATEV als Zusatzmodule.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 1,50 € pro Nutzer bei jährlicher Zahlung – der günstigste Bezahltarif im Vergleich.",
    datenschutz: "AWS Frankfurt, AVV, regelmäßige Penetrationstests.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "DATEV als Zusatzmodul; API nicht genannt.",
  },
  pros: [
    {
      title: "Sehr günstig",
      detail:
        "Ab 1,50 € pro Nutzer bei jährlicher Zahlung, ohne Vertragsbindung.",
    },
    {
      title: "GPS und Projektzeiten im Einstieg",
      detail: "Schon der Tarif Go enthält Projektzeiten und Standort.",
    },
  ],
  cons: [
    {
      title: "Urlaub erst ab Easy",
      detail: "Abwesenheiten und Überstundenkonto fehlen im Tarif Go.",
    },
    {
      title: "DATEV und Schichtplan kosten extra",
      detail: "Beides sind Zusatzmodule pro Nutzer.",
    },
  ],
  verdict: {
    short:
      "Crewmeister ist der günstigste Weg zur digitalen Zeiterfassung in unserem Vergleich. Für Urlaub, DATEV und Schichtplanung kommen Tarif Easy und Zusatzmodule dazu – auch dann bleibt es günstig.",
    idealFor: [
      "Kleine Betriebe, die die Zeiterfassungspflicht günstig umsetzen wollen",
      "Teams mit Außendienst",
    ],
    notIdealFor: ["Unternehmen mit mehr als 50 Beschäftigten ohne Angebot"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und DSGVO-Seiten des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Crewmeister",
      url: "https://crewmeister.com/de/preise/",
      accessedAt: checked,
    },
    {
      name: "Crewmeister",
      url: "https://crewmeister.com/de/dsgvo",
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
