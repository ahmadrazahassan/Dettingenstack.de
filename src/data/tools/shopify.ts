import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, usdNote } from "./_pm";
import { shopFeatures } from "./_shop";

const core = [
  "hosting",
  "themes",
  "varianten",
  "zahlungen",
  "erweiterungen",
  "marktplaetze",
  "api",
];
const source = "https://www.shopify.com/de/preise";

export const shopify = {
  slug: "shopify",
  name: "Shopify",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Shopify Inc.",
    hq: "Ottawa",
    countryCode: "CA",
    website: "https://www.shopify.com/de",
  },
  logo: null,
  categories: { primary: "shopsysteme", secondary: [] },
  tagline:
    "Mietshop mit Hosting, Apps und Zahlungsabwicklung – schnell startklar",
  bestFor: "Gründer und D2C-Marken ohne eigene IT",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: `${usdNote()} Je nach Zahlungsanbieter fallen Transaktions- und Kartengebühren an; Marktplatz-Bestellungen über 50 pro Monat kosten 1 % Gebühr mit monatlicher Obergrenze. 3 Tage kostenlos, danach ein reduzierter Einstiegspreis für die ersten 3 Monate.`,
    plans: [
      {
        id: "basic",
        name: "Basic",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: core,
        highlights: ["Hosting inklusive", "Themes", "App Store"],
      },
      {
        id: "grow",
        name: "Grow",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: core,
        highlights: ["Für wachsende Shops"],
        recommended: true,
      },
      {
        id: "advanced",
        name: "Advanced",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: core,
        highlights: ["Für größere Teams und Umsätze"],
      },
      {
        id: "plus",
        name: "Plus",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: [...core, "b2b"],
        highlights: ["Enterprise-Funktionen"],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
  },
  trial: { available: "ja", days: 3, creditCard: false },
  freePlan: "nein",
  features: shopFeatures({
    hosting: { status: "ja" },
    themes: { status: "ja" },
    varianten: { status: "ja" },
    zahlungen: {
      status: "ja",
      note: "Shopify Payments und externe Anbieter; Gebühren je Tarif",
    },
    erweiterungen: { status: "ja", note: "Shopify App Store" },
    marktplaetze: {
      status: "ja",
      note: "Ab 50 Bestellungen pro Monat 1 % Gebühr",
    },
    rechtstexte: {
      status: "teilweise",
      note: "Deutsche Rechtstexte meist über Apps oder Dienste",
    },
    api: { status: "ja" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Shopify", url: source, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 70,
    datenschutz: 60,
    support: 70,
    integrationen: 90,
  },
  scoreNotes: {
    funktionen: "Vollständiger Mietshop mit sehr großem App Store.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Preise in US-Dollar; Gebühren je Zahlungsanbieter.",
    datenschutz: "Serverstandort nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Tausende Apps, Marktplätze und API.",
  },
  pros: [
    {
      title: "Sofort startklar",
      detail: "Hosting, Updates und Sicherheit übernimmt Shopify.",
    },
    {
      title: "Riesiger App Store",
      detail: "Für fast jede Funktion gibt es eine App.",
    },
  ],
  cons: [
    {
      title: "Gebühren summieren sich",
      detail: "Transaktions-, Karten- und App-Kosten kommen hinzu.",
    },
    {
      title: "Deutsche Besonderheiten per App",
      detail: "Rechtstexte und Rechnung oft über Zusatz-Apps.",
    },
  ],
  verdict: {
    short:
      "Shopify ist der schnellste Weg zum eigenen Shop, mit riesigem App-Ökosystem. Für deutsche Anforderungen wie Rechtstexte und Kauf auf Rechnung brauchst du meist zusätzliche Apps.",
    idealFor: [
      "Gründer ohne IT-Kenntnisse",
      "D2C-Marken mit internationalem Fokus",
    ],
    notIdealFor: ["Komplexe B2B-Shops unterhalb von Plus"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Shopify", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Tarife, Dollarpreise und Gebühren erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
