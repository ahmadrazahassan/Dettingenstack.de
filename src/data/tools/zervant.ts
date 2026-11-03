import type { ToolInput } from "@/lib/schema";
import { rechnungFeatures } from "./_rechnung";

const checked = "2026-11-03";
const free = ["rechnungen", "e-rechnung-versand", "bankanbindung"];
const start = [...free, "abschlag"];
const plus = [...start, "wiederkehrend", "belegerfassung"];

export const zervant = {
  slug: "zervant",
  name: "Zervant",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Shine Germany GmbH (Zervant)",
    hq: "Berlin",
    countryCode: "DE",
    website: "https://www.zervant.com/de/",
  },
  logo: null,
  categories: { primary: "rechnungsprogramme", secondary: [] },
  tagline:
    "Einfaches Rechnungsprogramm mit kostenlosem Tarif für Selbstständige",
  bestFor: "Selbstständige mit wenigen Rechnungen",
  companySizes: ["solo", "kleinst"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.zervant.com/de/preise/",
    note: "Die Seite nennt nicht ausdrücklich, ob netto oder brutto. Ohne USt-IdNr. kommt laut Fußnote finnische Umsatzsteuer (25,5 %) hinzu. Das Pro-Abo wird erwähnt, aber ohne Preis. Nutzerzahl und Mindestlaufzeit nennt die Seite nicht.",
    plans: [
      {
        id: "free",
        name: "Free",
        model: {
          type: "free",
          limits: "Bis zu 5 Rechnungen bzw. Angebote pro Monat",
          maxUnits: 1,
        },
        features: free,
        highlights: [
          "5 Rechnungen pro Monat",
          "XRechnung kostenlos",
          "Bankkonto verbinden",
        ],
      },
      {
        id: "start",
        name: "Start",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 1100, annualPerMonth: 900 },
          includedUnits: 1,
        },
        features: start,
        highlights: [
          "Angebote in Rechnungen umwandeln",
          "Abschlagsrechnungen",
          "Telefon-Support",
        ],
      },
      {
        id: "plus",
        name: "Plus",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 2500, annualPerMonth: 2000 },
          includedUnits: 1,
        },
        features: plus,
        highlights: [
          "Unbegrenzt Kontakte und Belege",
          "Wiederkehrende Rechnungen",
          "E-Mail-Belegerfassung",
        ],
        recommended: true,
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "start",
        price: { monthly: 1100, annualPerMonth: 900 },
      },
      {
        date: checked,
        planId: "plus",
        price: { monthly: 2500, annualPerMonth: 2000 },
      },
    ],
  },
  trial: { available: "ja", days: 14 },
  freePlan: "ja",
  features: rechnungFeatures({
    rechnungen: { status: "ja" },
    "e-rechnung-versand": {
      status: "teilweise",
      note: "XRechnung kostenlos; andere E-Rechnungsformate laut Seite Premium-Funktion",
    },
    wiederkehrend: { status: "ja", fromPlan: "plus" },
    abschlag: { status: "ja", fromPlan: "start" },
    mahnwesen: {
      status: "unbekannt",
      note: "Automatisches Mahnwesen nur im Pro-Abo erwähnt",
    },
    bankanbindung: { status: "ja" },
    "online-zahlung": {
      status: "ja",
      note: "Kartenzahlung gegen Gebühr pro Rechnung",
    },
    belegerfassung: { status: "ja", fromPlan: "plus", note: "Per E-Mail" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "EU",
    serverNote:
      "Laut Datenschutzerklärung Google Cloud und Amazon Web Services in der EU; einzelne Unterauftragsverarbeiter auch in den USA",
    avv: "ja",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Zervant",
      url: "https://www.zervant.com/de/datenschutz/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: ["telefon"],
    onboarding: "selbst",
    note: "Telefon-Support ab Start",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 60,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 65,
    support: 70,
    integrationen: 45,
  },
  scoreNotes: {
    funktionen:
      "Grundfunktionen für Rechnungen; DATEV-Export und Mahnwesen auf der Preisseite nicht belegt.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Kostenloser Tarif, Start ab 9 € bei jährlicher Zahlung.",
    datenschutz:
      "Speicherung in der EU, AVV; Übermittlungen an Unterauftragnehmer in den USA möglich.",
    support: "Noch nicht getestet. Telefon-Support ab Start.",
    integrationen: "DATEV-Export und API auf der Preisseite nicht genannt.",
  },
  pros: [
    {
      title: "Kostenlos starten",
      detail: "Fünf Rechnungen im Monat kostenlos, inklusive XRechnung.",
    },
    {
      title: "Telefon-Support schon ab Start",
      detail: "Selten in dieser Preisklasse.",
    },
  ],
  cons: [
    {
      title: "Kein DATEV-Export belegt",
      detail:
        "Die Preisseite nennt keinen DATEV-Export – kläre das mit deinem Steuerbüro.",
    },
    {
      title: "Daten auch außerhalb der EU möglich",
      detail: "Einzelne Unterauftragsverarbeiter sitzen in den USA.",
    },
  ],
  verdict: {
    short:
      "Zervant ist ein schlankes Rechnungsprogramm für Selbstständige mit wenigen Rechnungen. Wer DATEV-Export oder ein ausgebautes Mahnwesen braucht, ist bei anderen Anbietern besser aufgehoben.",
    idealFor: [
      "Selbstständige mit wenigen Rechnungen im Monat",
      "Gründer, die kostenlos starten wollen",
    ],
    notIdealFor: ["Unternehmen mit DATEV-Steuerbüro"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Datenschutzseiten des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Zervant",
      url: "https://www.zervant.com/de/preise/",
      accessedAt: checked,
    },
    {
      name: "Zervant",
      url: "https://www.zervant.com/de/datenschutz/",
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
