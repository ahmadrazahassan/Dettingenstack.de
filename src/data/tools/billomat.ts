import type { ToolInput } from "@/lib/schema";
import { rechnungFeatures } from "./_rechnung";

const checked = "2026-11-03";
const professional = [
  "rechnungen",
  "e-rechnung-versand",
  "wiederkehrend",
  "mahnwesen",
  "euer",
];
const business = [
  ...professional,
  "datev-export",
  "bankanbindung",
  "online-zahlung",
  "api",
];

export const billomat = {
  slug: "billomat",
  name: "Billomat",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "aifinyo AG",
    hq: "Berlin",
    countryCode: "DE",
    website: "https://www.billomat.com/",
  },
  logo: null,
  categories: { primary: "rechnungsprogramme", secondary: [] },
  tagline: "Rechnungsprogramm mit Angebotsannahme online, Mahnwesen und EÜR",
  bestFor: "Dienstleister und Agenturen mit regelmäßigen Rechnungen",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.billomat.com/preise/",
    note: "Preise netto; jährliche Abrechnung günstiger. Professional: 30 Rechnungen pro Monat, keine weiteren Nutzer. Weitere Nutzer in Business und Enterprise 10 € pro Monat. Mindestlaufzeit ein Monat bzw. das gewählte Zahlungsintervall, Kündigung 14 Tage vor Ende.",
    plans: [
      {
        id: "professional",
        name: "Professional",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 2900, annualPerMonth: 1900 },
          includedUnits: 1,
        },
        features: professional,
        highlights: [
          "30 Rechnungen pro Monat",
          "Angebote mit Annahmefunktion",
          "XRechnung & ZUGFeRD",
          "Mahnwesen & EÜR",
        ],
        limits: ["Kein DATEV-Export, keine Banking-Verknüpfung"],
      },
      {
        id: "business",
        name: "Business",
        model: {
          type: "base_plus_per_unit",
          unit: "pauschal",
          base: { monthly: 3900, annualPerMonth: 2900 },
          perUnit: { monthly: 1000, annualPerMonth: 1000 },
          includedUnits: 1,
        },
        features: business,
        highlights: [
          "Unbegrenzt Rechnungen",
          "DATEVconnect-Export",
          "Banking-Verknüpfung",
          "Online-Zahlung (mollie)",
          "API",
        ],
        recommended: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: {
          type: "base_plus_per_unit",
          unit: "pauschal",
          base: { monthly: 11900, annualPerMonth: 9900 },
          perUnit: { monthly: 1000, annualPerMonth: 1000 },
          includedUnits: 5,
        },
        features: business,
        highlights: [
          "5 Nutzer",
          "Persönlicher Ansprechpartner",
          "Mehr API-Aufrufe inkl. Sandbox",
        ],
      },
    ],
    addOns: [
      {
        id: "nutzer",
        name: "Weiterer Nutzer (Business, Enterprise)",
        unit: "pauschal",
        price: { monthly: 1000, annualPerMonth: 1000 },
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 1,
      noticePeriod: "14 Tage vor Ende der Laufzeit",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "professional",
        price: { monthly: 2900, annualPerMonth: 1900 },
      },
      {
        date: checked,
        planId: "business",
        price: { monthly: 3900, annualPerMonth: 2900 },
      },
      {
        date: checked,
        planId: "enterprise",
        price: { monthly: 11900, annualPerMonth: 9900 },
      },
    ],
  },
  trial: { available: "ja", days: 14 },
  freePlan: "nein",
  features: rechnungFeatures({
    rechnungen: { status: "ja", note: "Angebote mit Online-Annahme" },
    "e-rechnung-versand": { status: "ja", note: "XRechnung und ZUGFeRD" },
    wiederkehrend: { status: "ja" },
    mahnwesen: { status: "ja" },
    bankanbindung: { status: "ja", fromPlan: "business" },
    "online-zahlung": {
      status: "addon",
      fromPlan: "business",
      note: "Über das mollie-Add-on",
    },
    "datev-export": {
      status: "ja",
      fromPlan: "business",
      note: "DATEVconnect",
    },
    euer: { status: "ja" },
    belegerfassung: {
      status: "ja",
      note: "Belegerfassung per App laut Anbieter",
    },
    api: {
      status: "ja",
      fromPlan: "business",
      note: "100 bzw. 300 Aufrufe je 15 Minuten",
    },
    app: { status: "ja", note: "App zur Belegerfassung" },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Hosting laut Anbieter zu 100 % in Deutschland (2018: AWS-Region Frankfurt)",
    avv: "unbekannt",
    certifications: ["ISO_27001"],
    certificationNote:
      "Laut Anbieter ISO-27001- und ISO-27018-Zertifizierung; das Zertifikat haben wir nicht eingesehen.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Billomat",
      url: "https://www.billomat.com/rechnungsprogramm/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: ["ticket"],
    onboarding: "unbekannt",
    note: "Ticketsystem ab Business, persönlicher Ansprechpartner in Enterprise",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 80,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen:
      "Rechnungen, wiederkehrende Rechnungen, Mahnwesen und EÜR in allen Tarifen.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 19 € bei jährlicher Zahlung; DATEV-Export erst ab Business (29 €).",
    datenschutz: "Hosting in Deutschland, ISO 27001 laut Anbieter.",
    support: "Noch nicht getestet. Im kleinsten Tarif nur Wissensdatenbank.",
    integrationen: "DATEVconnect, mollie und API ab Business.",
  },
  pros: [
    {
      title: "Wiederkehrende Rechnungen schon im Einstieg",
      detail:
        "Auch der Tarif Professional enthält Serienrechnungen und Mahnwesen.",
    },
    {
      title: "Angebote online annehmen",
      detail: "Kunden können Angebote direkt digital bestätigen.",
    },
  ],
  cons: [
    {
      title: "DATEV erst ab Business",
      detail: "Im Tarif Professional fehlen DATEV-Export und Banking.",
    },
    {
      title: "Einstieg mit Rechnungslimit",
      detail: "Professional erlaubt 30 Rechnungen im Monat.",
    },
  ],
  verdict: {
    short:
      "Billomat passt zu Dienstleistern, die regelmäßig Angebote und Serienrechnungen schreiben. Mit DATEV-Steuerbüro solltest du direkt den Tarif Business einplanen.",
    idealFor: [
      "Agenturen und Dienstleister mit Serienrechnungen",
      "Unternehmen, die Angebote online bestätigen lassen",
    ],
    notIdealFor: ["Selbstständige mit sehr kleinem Budget und DATEV-Bedarf"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Produktseiten des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Billomat",
      url: "https://www.billomat.com/preise/",
      accessedAt: checked,
    },
    {
      name: "Billomat",
      url: "https://www.billomat.com/rechnungsprogramm/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Tarife und Sicherheitsangaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
