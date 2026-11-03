import type { ToolInput } from "@/lib/schema";
import { rechnungFeatures } from "./_rechnung";

const checked = "2026-11-03";
const solo = [
  "rechnungen",
  "e-rechnung-versand",
  "mahnwesen",
  "bankanbindung",
  "datev-export",
  "belegerfassung",
  "ustva",
  "api",
];
const pro = [...solo, "wiederkehrend"];

// Each further user 5 € per month (add-on in all plans).
const plan = (monthly: number, annualPerMonth: number, includedUnits: number) =>
  ({
    type: "base_plus_per_unit",
    unit: "pauschal",
    base: { monthly, annualPerMonth },
    perUnit: { monthly: 500, annualPerMonth: 500 },
    includedUnits,
  }) as const;

export const fastbill = {
  slug: "fastbill",
  name: "FastBill",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "FastBill GmbH",
    hq: "Frankfurt am Main",
    countryCode: "DE",
    website: "https://www.fastbill.com/",
  },
  logo: null,
  categories: { primary: "rechnungsprogramme", secondary: [] },
  tagline: "Rechnungen, Belege und Banking für Selbstständige aus Frankfurt",
  bestFor: "Selbstständige und kleine Teams mit Belegen und Banking",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.fastbill.com/preise",
    note: "Preise netto; jährliche Zahlung wird jährlich abgebucht. Premium „ab“ 59 € (monatlich) bzw. 53 € (jährlich), Demo statt Test. Vollautomatisches Mahnwesen in Solo, Plus und Pro als Zusatzmodul ab 4,90 €.",
    plans: [
      {
        id: "solo",
        name: "Solo",
        model: plan(1000, 900, 1),
        features: solo,
        highlights: [
          "1 Nutzer, 1 Bankkonto",
          "Angebote, Rechnungen, E-Rechnung",
          "Umsatzsteuervoranmeldung",
          "DATEV-Export",
        ],
      },
      {
        id: "plus",
        name: "Plus",
        model: plan(1500, 1400, 1),
        features: solo,
        highlights: [
          "5 Bankkonten",
          "Unbegrenzt Vorlagen",
          "Dokumentenverwaltung",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        model: plan(3000, 2700, 3),
        features: pro,
        highlights: [
          "3 Nutzer",
          "Unbegrenzt Bankkonten",
          "Wiederkehrende Rechnungen",
          "DATEV Rechnungsdatenservice",
        ],
        recommended: true,
      },
      {
        id: "premium",
        name: "Premium",
        model: plan(5900, 5300, 5),
        features: pro,
        highlights: [
          "5 Nutzer",
          "Automatisches Mahnwesen (20 Vorgänge)",
          "Automatische Belegerfassung (30 Belege)",
          "Automatischer Bankabgleich",
        ],
      },
    ],
    addOns: [
      {
        id: "nutzer",
        name: "Zusätzlicher Nutzer",
        unit: "pauschal",
        price: { monthly: 500, annualPerMonth: 500 },
      },
      {
        id: "mahnwesen",
        name: "Vollautomatisches Mahnwesen",
        unit: "pauschal",
        price: { monthly: 490, annualPerMonth: 490 },
        note: "ab 4,90 €",
      },
    ],
    oneTimeFees: [],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "solo",
        price: { monthly: 1000, annualPerMonth: 900 },
      },
      {
        date: checked,
        planId: "plus",
        price: { monthly: 1500, annualPerMonth: 1400 },
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: 3000, annualPerMonth: 2700 },
      },
      {
        date: checked,
        planId: "premium",
        price: { monthly: 5900, annualPerMonth: 5300 },
      },
    ],
  },
  trial: { available: "ja", days: 14 },
  freePlan: "nein",
  features: rechnungFeatures({
    rechnungen: { status: "ja" },
    "e-rechnung-versand": { status: "ja" },
    wiederkehrend: { status: "ja", fromPlan: "pro" },
    mahnwesen: {
      status: "ja",
      note: "Zahlungserinnerungen; vollautomatisch als Add-on, in Premium inklusive",
    },
    bankanbindung: {
      status: "ja",
      note: "Solo 1 Konto, Plus 5, ab Pro unbegrenzt",
    },
    zahlungsabgleich: {
      status: "ja",
      fromPlan: "premium",
      note: "Automatischer Bankabgleich",
    },
    "datev-export": {
      status: "ja",
      note: "DATEV Rechnungsdatenservice 1.0 ab Pro",
    },
    belegerfassung: {
      status: "ja",
      note: "Automatische Belegerfassung in Premium",
    },
    ustva: { status: "ja", note: "Laut Preisseite im Tarif Solo genannt" },
    api: {
      status: "ja",
      note: "REST-API, 50 bis 1.000 Aufrufe pro Stunde je Tarif",
    },
  }),
  integrations: ["datev", "elster"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Cloud-Hosting-Dienstleister mit Rechenzentrum in Deutschland, laufende Backups",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "FastBill",
      url: "https://support.fastbill.com/hc/de/articles/231642667-Ort-der-Datenspeicherung",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 75,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 70,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "Rechnungen, E-Rechnung, Banking und Belege; wiederkehrende Rechnungen erst ab Pro.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 9 € bei jährlicher Zahlung; mehrere Nutzer erst ab Pro inklusive.",
    datenschutz:
      "Rechenzentrum in Deutschland; AVV, Zertifikate und 2FA nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen:
      "DATEV-Rechnungsdatenservice ab Pro, offene API in allen Tarifen.",
  },
  pros: [
    {
      title: "API in allen Tarifen",
      detail: "Schon Solo enthält eine offene REST-API.",
    },
    {
      title: "Mehrere Nutzer ab Pro inklusive",
      detail: "Pro enthält drei, Premium fünf Nutzer.",
    },
  ],
  cons: [
    {
      title: "Wiederkehrende Rechnungen erst ab Pro",
      detail:
        "Für Abo-Rechnungen brauchst du mindestens 27 € im Monat bei jährlicher Zahlung.",
    },
    {
      title: "Automatisches Mahnwesen kostet extra",
      detail: "Außer in Premium ist es ein Zusatzmodul.",
    },
  ],
  verdict: {
    short:
      "FastBill verbindet Rechnungen, Belege und Banking zu einem fairen Preis. Wer wiederkehrende Rechnungen oder mehrere Nutzer braucht, startet sinnvoll mit dem Tarif Pro.",
    idealFor: [
      "Selbstständige, die Rechnungen und Belege an einem Ort haben wollen",
      "Kleine Teams mit DATEV-Steuerbüro",
    ],
    notIdealFor: ["Onlinehändler mit Marktplatz-Anbindung"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Supportseiten des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "FastBill",
      url: "https://www.fastbill.com/preise",
      accessedAt: checked,
    },
    {
      name: "FastBill",
      url: "https://support.fastbill.com/hc/de/articles/231642667-Ort-der-Datenspeicherung",
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
