import type { ToolInput } from "@/lib/schema";
import { rechnungFeatures } from "./_rechnung";

const checked = "2026-11-03";
const free = [
  "rechnungen",
  "e-rechnung-versand",
  "e-rechnung-empfang",
  "datev-export",
];
const starter = [...free, "bankanbindung", "zahlungsabgleich", "mahnwesen"];
const professional = [...starter, "wiederkehrend", "api"];
const premium = [...professional, "zeiterfassung"];

export const easybill = {
  slug: "easybill",
  name: "easybill",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "easybill GmbH",
    hq: "Kaarst",
    countryCode: "DE",
    website: "https://www.easybill.de/",
  },
  logo: null,
  categories: { primary: "rechnungsprogramme", secondary: [] },
  tagline:
    "Rechnungsprogramm mit Marktplatz-Anbindung für Onlinehändler und Dienstleister",
  bestFor: "Onlinehändler und Unternehmen mit vielen Rechnungen",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.easybill.de/preise",
    note: "Preise netto. Laufzeit monatlich, quartalsweise, halbjährlich oder jährlich (jährlich im Voraus). Dokumentlimits: Free 50, Starter 250, Professional und Premium ab 500 Dokumente pro Monat (Staffeln bis 200.000). Weitere Dokumente über die Flex-Option für 0,29 € je Dokument. Wie viele Nutzer Starter und Professional enthalten, nennt die Seite nicht.",
    plans: [
      {
        id: "free",
        name: "Free",
        model: {
          type: "free",
          limits: "50 Dokumente und 3 Kontakte pro Monat",
          maxUnits: 1,
        },
        features: free,
        highlights: [
          "50 Dokumente pro Monat",
          "E-Rechnungen empfangen",
          "DATEV-Export",
        ],
        limits: ["Nur 3 Kontakte"],
      },
      {
        id: "starter",
        name: "Starter",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 1200, annualPerMonth: 900 },
          includedUnits: 1,
        },
        features: starter,
        highlights: [
          "250 Dokumente pro Monat",
          "20 Kontakte",
          "1 Bankkonto (finAPI)",
        ],
      },
      {
        id: "professional",
        name: "Professional",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 3900, annualPerMonth: 2500 },
          includedUnits: 1,
        },
        features: professional,
        highlights: [
          "Ab 500 Dokumente pro Monat",
          "Unbegrenzt Kontakte und Bankkonten",
          "Wiederkehrende Rechnungen",
          "REST-API",
        ],
        recommended: true,
      },
      {
        id: "premium",
        name: "Premium",
        model: {
          type: "base_plus_per_unit",
          unit: "pauschal",
          base: { monthly: 4500, annualPerMonth: 3700 },
          perUnit: { monthly: 500, annualPerMonth: 500 },
          includedUnits: 3,
        },
        features: premium,
        highlights: [
          "Alles aus Professional",
          "3 Nutzer, weitere 5 €",
          "Automatisches Mahnwesen",
          "Zeiterfassung",
        ],
      },
    ],
    addOns: [
      {
        id: "flex",
        name: "Flex-Option je zusätzlichem Dokument",
        unit: "rechnungen",
        price: { monthly: 29, annualPerMonth: 29 },
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod: "zum Ende der gewählten Laufzeit",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "starter",
        price: { monthly: 1200, annualPerMonth: 900 },
      },
      {
        date: checked,
        planId: "professional",
        price: { monthly: 3900, annualPerMonth: 2500 },
      },
      {
        date: checked,
        planId: "premium",
        price: { monthly: 4500, annualPerMonth: 3700 },
      },
    ],
  },
  trial: { available: "ja", days: 7, creditCard: false },
  freePlan: "ja",
  features: rechnungFeatures({
    rechnungen: {
      status: "ja",
      note: "Angebote, Aufträge, Rechnungen, Lieferscheine",
    },
    "e-rechnung-versand": { status: "ja" },
    "e-rechnung-empfang": { status: "ja", note: "ZUGFeRD und XRechnung" },
    wiederkehrend: { status: "ja", fromPlan: "professional" },
    mahnwesen: { status: "ja", note: "Automatisches Mahnwesen nur in Premium" },
    bankanbindung: {
      status: "ja",
      fromPlan: "starter",
      note: "Über finAPI; Starter 1 Konto",
    },
    zahlungsabgleich: { status: "ja", fromPlan: "starter" },
    "online-zahlung": {
      status: "ja",
      note: "Mollie-Bezahllink, Gebühren ab 0,28 € je Transaktion",
    },
    "datev-export": { status: "ja", note: "Auch DATEV-Datenservice per API" },
    api: {
      status: "ja",
      fromPlan: "professional",
      note: "REST-API, 10 bzw. 60 Anfragen pro Minute",
    },
    "shop-anbindung": {
      status: "ja",
      note: "easybill Connect, z. B. Amazon, eBay, Shopify; Tarif nicht eindeutig",
    },
    zeiterfassung: { status: "ja", fromPlan: "premium" },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Daten in zertifizierten Rechenzentren in Deutschland; Datensicherung laut AVV über Amazon (USA) mit Serverstandort Deutschland",
    avv: "ja",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "ja",
    onPremise: "nein",
    source: {
      name: "easybill",
      url: "https://app.easybill.de/dsgvo.pdf",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 75,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen:
      "E-Rechnung in allen Tarifen, wiederkehrende Rechnungen ab Professional, Zeiterfassung in Premium.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 9 € bei jährlicher Zahlung, kostenloser Tarif; Dokumentlimits beachten.",
    datenschutz:
      "Server in Deutschland, AVV, optionale 2FA; Backup-Dienstleister mit US-Sitz.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen:
      "DATEV-Datenservice, REST-API und Marktplatz-Anbindungen (Amazon, eBay, Shopify).",
  },
  pros: [
    {
      title: "Stark für Onlinehändler",
      detail:
        "Über easybill Connect lassen sich Marktplätze und Shops wie Amazon, eBay und Shopify anbinden.",
    },
    {
      title: "Kostenloser Tarif mit E-Rechnung",
      detail:
        "50 Dokumente im Monat kostenlos, inklusive E-Rechnungs-Empfang und DATEV-Export.",
    },
  ],
  cons: [
    {
      title: "Dokumentlimits",
      detail:
        "Jeder Tarif hat ein Monatslimit; darüber kostet jedes Dokument 0,29 €.",
    },
    {
      title: "Automatisches Mahnwesen nur in Premium",
      detail: "In den kleineren Tarifen mahnst du manuell.",
    },
  ],
  verdict: {
    short:
      "easybill ist besonders für Onlinehändler und Unternehmen mit vielen Rechnungen interessant: Marktplatz-Anbindungen, API und DATEV-Datenservice. Achte auf das Dokumentlimit deines Tarifs.",
    idealFor: [
      "Onlinehändler mit Amazon-, eBay- oder Shopify-Verkäufen",
      "Unternehmen mit hohem Rechnungsvolumen",
    ],
    notIdealFor: [
      "Selbstständige, die auch EÜR und UStVA im selben Tool erledigen wollen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite und des AVV des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "easybill",
      url: "https://www.easybill.de/preise",
      accessedAt: checked,
    },
    {
      name: "easybill",
      url: "https://app.easybill.de/dsgvo.pdf",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Tarife und Datenschutzangaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
