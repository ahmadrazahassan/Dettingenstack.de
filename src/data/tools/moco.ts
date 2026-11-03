import type { ToolInput } from "@/lib/schema";
import { checkedZeit as checked, zeitFeatures } from "./_zeit";

const core = [
  "zeiterfassung",
  "abwesenheiten",
  "projektzeiten",
  "projektabrechnung",
  "api",
];
const perUser = (monthly: number) =>
  ({
    type: "per_unit",
    unit: "mitarbeitende",
    price: { monthly, annualPerMonth: null },
  }) as const;

export const moco = {
  slug: "moco",
  name: "MOCO",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "everii Switzerland GmbH (MOCO)",
    hq: "Zürich",
    countryCode: "CH",
    website: "https://www.mocoapp.com/",
  },
  logo: null,
  categories: {
    primary: "zeiterfassungssoftware",
    secondary: ["projektmanagement-software"],
  },
  tagline:
    "Agentursoftware mit Zeiterfassung, Projektcontrolling, Angeboten und Rechnungen",
  bestFor: "Agenturen und Dienstleister, die Zeiten abrechnen",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.mocoapp.com/anmeldung/preise",
    note: "Preise pro Benutzer und Monat, exkl. MwSt.; die Seite nennt keine Unterscheidung zwischen monatlicher und jährlicher Zahlung und keine Kündigungsfristen. Unlimited laut Seite ab 25 Benutzern (Zuordnung nicht eindeutig). Ab 50 Benutzern Staffelpreise auf Anfrage. SSO in Pro für 2 € pro Benutzer (max. 200 €).",
    plans: [
      {
        id: "core",
        name: "Core",
        model: perUser(1500),
        features: core,
        highlights: [
          "Zeiterfassung",
          "Angebote & Abrechnung",
          "Projektcontrolling",
          "Abwesenheiten",
          "API",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        model: perUser(2100),
        features: core,
        highlights: [
          "Alles aus Core",
          "Leads",
          "Kapazitäts- und Finanzplanung",
          "Rechnungseingang",
          "Automatischer Bankabgleich",
        ],
        recommended: true,
      },
      {
        id: "unlimited",
        name: "Unlimited",
        model: {
          type: "per_unit",
          unit: "mitarbeitende",
          price: { monthly: 2400, annualPerMonth: null },
          minUnits: 25,
        },
        features: [...core, "sso"],
        highlights: [
          "Alles aus Pro",
          "SSO und KI-OCR inklusive",
          "Unbegrenzte API-Schlüssel",
        ],
      },
    ],
    addOns: [
      {
        id: "sso",
        name: "Single Sign-On (Pro)",
        unit: "mitarbeitende",
        price: { monthly: 200, annualPerMonth: null },
        note: "max. 200 € pro Monat",
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 0,
      noticePeriod: "keine Kündigungsfristen laut Preisseite",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "core",
        price: { monthly: 1500, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: 2100, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "unlimited",
        price: { monthly: 2400, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "ja", days: 30 },
  freePlan: "nein",
  features: zeitFeatures({
    zeiterfassung: { status: "ja" },
    abwesenheiten: { status: "ja", note: "Urlaubsanträge ab Pro" },
    projektzeiten: { status: "ja" },
    projektabrechnung: {
      status: "ja",
      note: "Angebote, Abrechnung, vorbereitende Buchhaltung",
    },
    api: { status: "ja" },
    sso: {
      status: "addon",
      note: "Pro: 2 € pro Benutzer, Unlimited inklusive",
    },
  }),
  integrations: [],
  compliance: {
    serverLocation: "DE_CH",
    serverNote:
      "Managed Server im Rechenzentrum der IWB in Basel; zusätzlicher Infrastruktur-Anbieter Exoscale in der EU (u. a. Deutschland)",
    avv: "ja",
    certifications: [],
    sso: "ja",
    twoFactor: "ja",
    onPremise: "nein",
    source: {
      name: "MOCO",
      url: "https://www.mocoapp.com/cloud-software/sicherheit-betrieb",
      accessedAt: checked,
    },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 85,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "Zeiterfassung, Projektcontrolling, Angebote und Rechnungen; Arbeitszeitregeln und DATEV-Lohn nicht belegt.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 15 € pro Benutzer – teurer als reine Zeiterfassung, dafür mit Abrechnung.",
    datenschutz: "Hosting in der Schweiz (Basel), AVV, 2FA und SSO.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen:
      "API in allen Tarifen; DATEV auf der Preisseite nicht genannt.",
  },
  pros: [
    {
      title: "Zeit bis Rechnung in einem Tool",
      detail:
        "Zeiterfassung, Angebote, Projektcontrolling und Abrechnung für Agenturen.",
    },
    {
      title: "Keine Kündigungsfristen",
      detail: "Laut Preisseite ohne Kündigungsfristen, 30 Tage Test.",
    },
  ],
  cons: [
    {
      title: "Teurer als reine Zeiterfassung",
      detail: "Ab 15 € pro Benutzer im Monat.",
    },
    {
      title: "DATEV-Lohn nicht belegt",
      detail: "Die Preisseite nennt keine DATEV-Schnittstelle.",
    },
  ],
  verdict: {
    short:
      "MOCO ist eher Agentursoftware als Stempeluhr: Zeiterfassung, Projektcontrolling, Angebote und Rechnungen in einem Tool, gehostet in der Schweiz. Für reine Arbeitszeiterfassung zahlst du zu viel.",
    idealFor: [
      "Agenturen und Beratungen mit Stundenabrechnung",
      "Teams, die Projekte und Rechnungen zusammenführen wollen",
    ],
    notIdealFor: ["Betriebe, die nur die Arbeitszeit erfassen müssen"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Sicherheitsseiten des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "MOCO",
      url: "https://www.mocoapp.com/anmeldung/preise",
      accessedAt: checked,
    },
    {
      name: "MOCO",
      url: "https://www.mocoapp.com/cloud-software/sicherheit-betrieb",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Pläne und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
