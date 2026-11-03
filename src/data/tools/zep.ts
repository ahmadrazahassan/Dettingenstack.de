import type { ToolInput } from "@/lib/schema";
import { checkedZeit as checked, zeitFeatures } from "./_zeit";

const clock = [
  "zeiterfassung",
  "abwesenheiten",
  "datev-lohn",
  "app",
  "api",
  "sso",
];
const track = [...clock, "ueberstunden", "projektzeiten"];
const operations = [...track, "projektabrechnung"];
const perUser = (monthly: number, annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "mitarbeitende",
    price: { monthly, annualPerMonth },
    maxUnits: 100,
  }) as const;

export const zep = {
  slug: "zep",
  name: "ZEP",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "ZEP GmbH",
    hq: "Ditzingen",
    countryCode: "DE",
    website: "https://www.zep.de/",
  },
  logo: null,
  categories: {
    primary: "zeiterfassungssoftware",
    secondary: ["projektmanagement-software"],
  },
  tagline:
    "Projektzeiterfassung für Beratungen und IT – bis zu Rechnungen und Ressourcenplanung",
  bestFor: "Beratungen, Ingenieurbüros und IT-Dienstleister",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.zep.de/preise/",
    note: "Preise pro Nutzer und Monat, netto; Jahresvertrag günstiger als monatliche Zahlung. Jederzeit kündbar laut Preisseite. Ab 100 Nutzern individuelle Preise. Terminal 15 € pro Gerät und Monat.",
    plans: [
      {
        id: "clock",
        name: "ZEP Clock",
        model: perUser(600, 450),
        features: clock,
        highlights: ["Nur Arbeitszeit", "Abwesenheiten", "Lohnexport"],
      },
      {
        id: "track",
        name: "ZEP Track",
        model: perUser(1200, 900),
        features: track,
        highlights: [
          "Projektzeiterfassung",
          "Projekte & Kunden",
          "Überstunden",
        ],
        recommended: true,
      },
      {
        id: "control",
        name: "ZEP Control",
        model: perUser(2500, 1900),
        features: track,
        highlights: [
          "Alles aus Track",
          "Aufgaben & Projektplanung",
          "Erlöse & Kosten",
        ],
      },
      {
        id: "operations",
        name: "ZEP Operations",
        model: perUser(3500, 2900),
        features: operations,
        highlights: [
          "Alles aus Control",
          "Angebote & Rechnungen",
          "Reisekosten",
          "FiBu-Export",
        ],
      },
      {
        id: "business",
        name: "ZEP Business",
        model: perUser(4500, 3900),
        features: operations,
        highlights: [
          "Alles aus Operations",
          "Mehrere Firmen",
          "Dokumente & Personal",
          "Ressourcenplanung",
        ],
      },
    ],
    addOns: [
      {
        id: "terminal",
        name: "ZEP Terminal",
        unit: "pauschal",
        price: { monthly: 1500, annualPerMonth: 1500 },
        note: "pro Terminal",
      },
      {
        id: "ressourcen",
        name: "Ressourcenplanung",
        unit: "mitarbeitende",
        price: { monthly: 500, annualPerMonth: 500 },
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod: "jederzeit kündbar laut Preisseite",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "clock",
        price: { monthly: 600, annualPerMonth: 450 },
      },
      {
        date: checked,
        planId: "track",
        price: { monthly: 1200, annualPerMonth: 900 },
      },
      {
        date: checked,
        planId: "control",
        price: { monthly: 2500, annualPerMonth: 1900 },
      },
      {
        date: checked,
        planId: "operations",
        price: { monthly: 3500, annualPerMonth: 2900 },
      },
      {
        date: checked,
        planId: "business",
        price: { monthly: 4500, annualPerMonth: 3900 },
      },
    ],
  },
  trial: { available: "ja", days: 14, creditCard: false },
  freePlan: "nein",
  features: zeitFeatures({
    zeiterfassung: { status: "ja" },
    ueberstunden: { status: "ja", fromPlan: "track" },
    abwesenheiten: { status: "ja" },
    app: { status: "ja", note: "iOS und Android, auch offline" },
    terminal: { status: "addon", note: "15 € pro Terminal und Monat" },
    projektzeiten: { status: "ja", fromPlan: "track" },
    projektabrechnung: {
      status: "ja",
      fromPlan: "operations",
      note: "Angebote und Rechnungen",
    },
    "datev-lohn": {
      status: "ja",
      note: "Lohnexport, DATEV-Schnittstelle in allen Tarifen",
    },
    api: { status: "ja", note: "REST und SOAP" },
    sso: { status: "ja" },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "DE",
    serverNote: "Hosting in Deutschland laut Preisseite",
    avv: "unbekannt",
    certifications: [],
    certificationNote:
      "Siegel „Certified Cloud Solution 2025“ auf der Preisseite.",
    sso: "ja",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "ZEP",
      url: "https://www.zep.de/preise/",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 70,
    datenschutz: 75,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen:
      "Von reiner Arbeitszeit bis Projektabrechnung und Ressourcenplanung.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Arbeitszeit ab 4,50 €, Projektzeiten ab 9 € pro Nutzer bei Jahresvertrag.",
    datenschutz: "Hosting in Deutschland, SSO; AVV und 2FA nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "DATEV, Personio, JIRA, REST- und SOAP-API.",
  },
  pros: [
    {
      title: "Von Zeit bis Rechnung",
      detail:
        "Projektzeiten, Planung, Angebote und Rechnungen in einem System.",
    },
    {
      title: "Offene Schnittstellen",
      detail:
        "REST- und SOAP-API sowie DATEV, Personio und JIRA in allen Tarifen.",
    },
  ],
  cons: [
    {
      title: "Höhere Tarife teuer",
      detail: "Mit Rechnungen kostet ZEP 29 € pro Nutzer bei Jahresvertrag.",
    },
    {
      title: "Terminal kostet extra",
      detail: "Hardware-Terminals werden pro Gerät berechnet.",
    },
  ],
  verdict: {
    short:
      "ZEP ist gemacht für Unternehmen, die Projektzeiten auswerten und abrechnen: Beratungen, Ingenieurbüros, IT-Dienstleister. Für reine Arbeitszeiterfassung ist ZEP Clock eine solide, wenn auch nicht die günstigste Wahl.",
    idealFor: [
      "Beratungen und IT-Dienstleister mit Projektabrechnung",
      "Ingenieurbüros mit Projektcontrolling",
    ],
    notIdealFor: ["Schichtbetriebe"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    { name: "ZEP", url: "https://www.zep.de/preise/", accessedAt: checked },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Editionen und Hosting-Angabe erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
