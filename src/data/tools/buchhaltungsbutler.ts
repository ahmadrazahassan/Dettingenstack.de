import type { ToolInput } from "@/lib/schema";
import { buchhaltungFeatures, checked } from "./_buchhaltung";

const light = [
  "belegerfassung",
  "belegarchiv",
  "e-rechnung-empfang",
  "buchungen",
  "bankanbindung",
  "zahlungsabgleich",
  "rechnungen",
  "e-rechnung-versand",
  "steuerberater-zugang",
  "datev-export",
  "app",
];
const smart = [...light, "ustva", "euer", "bilanz"];

// Prices per month: monthly term / annual term. Each further user 4,90 € per month (assumed for both terms).
const plan = (monthly: number, annualPerMonth: number, includedUnits: number) =>
  ({
    type: "base_plus_per_unit",
    unit: "pauschal",
    base: { monthly, annualPerMonth },
    perUnit: { monthly: 490, annualPerMonth: 490 },
    includedUnits,
  }) as const;

export const buchhaltungsbutler = {
  slug: "buchhaltungsbutler",
  name: "BuchhaltungsButler",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "BuchhaltungsButler GmbH",
    hq: "Berlin",
    countryCode: "DE",
    website: "https://www.buchhaltungsbutler.de/",
  },
  logo: null,
  categories: { primary: "buchhaltungssoftware", secondary: [] },
  tagline:
    "Automatisierte Buchhaltung mit KI-Belegerkennung, auch für bilanzierende Unternehmen",
  bestFor: "Kleine Unternehmen mit vielen Belegen, EÜR oder Bilanz",
  companySizes: ["kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.buchhaltungsbutler.de/preise/",
    note: "Preise netto (zzgl. MwSt.). Monatliche Laufzeit: Light 39,90 €, Smart 46,90 €, Premium 89,90 €; jährliche Laufzeit: 29,90 €, 34,90 €, 59,90 € pro Monat. Fair Use: 500 Belege pro Monat in allen Paketen. Ein Steuerberater-Zugang ist immer enthalten; weitere Nutzer 4,90 €.",
    plans: [
      {
        id: "light",
        name: "Light",
        model: plan(3990, 2990, 1),
        features: light,
        highlights: [
          "KI-Belegerkennung",
          "Bankanbindung (über 5.000 Banken)",
          "E-Rechnungen senden & empfangen",
          "DATEV-Export",
          "Steuerberater-Zugang",
        ],
        limits: ["Ohne UStVA, EÜR und Bilanz – die Steuerberatung schließt ab"],
      },
      {
        id: "smart",
        name: "Smart",
        model: plan(4690, 3490, 1),
        features: smart,
        highlights: [
          "Alles aus Light",
          "Umsatzsteuer-Voranmeldung",
          "EÜR",
          "Für bilanzierende Unternehmen",
        ],
        recommended: true,
      },
      {
        id: "premium",
        name: "Premium",
        model: plan(8990, 5990, 5),
        features: smart,
        highlights: ["Alles aus Smart", "5 Nutzerzugänge inklusive"],
      },
    ],
    addOns: [
      {
        id: "nutzer",
        name: "Zusätzlicher Nutzerzugang",
        unit: "pauschal",
        price: { monthly: 490, annualPerMonth: 490 },
      },
      {
        id: "api",
        name: "API",
        unit: "pauschal",
        price: { monthly: 590, annualPerMonth: 590 },
      },
      {
        id: "assistiert",
        name: "Assistierte Buchhaltung",
        unit: "pauschal",
        price: { monthly: 2990, annualPerMonth: 2990 },
      },
    ],
    oneTimeFees: [{ label: "Begleitetes Onboarding (optional)", amount: 9990 }],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "light",
        price: { monthly: 3990, annualPerMonth: 2990 },
      },
      {
        date: checked,
        planId: "smart",
        price: { monthly: 4690, annualPerMonth: 3490 },
      },
      {
        date: checked,
        planId: "premium",
        price: { monthly: 8990, annualPerMonth: 5990 },
      },
    ],
  },
  trial: { available: "ja", days: 14 },
  freePlan: "nein",
  features: buchhaltungFeatures({
    belegerfassung: {
      status: "ja",
      note: "KI-Belegerkennung, E-Mail-Inbox, Scan-App",
    },
    belegarchiv: { status: "ja", note: "Festschreibung von Buchungen" },
    "e-rechnung-empfang": { status: "ja" },
    buchungen: {
      status: "ja",
      note: "Im Tarif Light als Vorkontierung für die Steuerberatung",
    },
    ustva: { status: "ja", fromPlan: "smart", note: "Über ELSTER-Integration" },
    euer: { status: "ja", fromPlan: "smart" },
    bilanz: {
      status: "ja",
      fromPlan: "smart",
      note: "Übermittlung über eBilanz+",
    },
    bankanbindung: {
      status: "ja",
      note: "Über drei Schnittstellenpartner mehr als 5.000 Banken",
    },
    zahlungsabgleich: { status: "ja" },
    rechnungen: {
      status: "ja",
      note: "Rechnungen, Angebote, Gutschriften, wiederkehrende Rechnungen",
    },
    "e-rechnung-versand": { status: "ja" },
    "steuerberater-zugang": {
      status: "ja",
      note: "In allen Paketen inklusive",
    },
    "datev-export": {
      status: "ja",
      note: "Buchungssätze und Belege im DATEV-Format",
    },
    app: { status: "ja", note: "Scan-App" },
    api: { status: "addon", note: "5,90 € pro Monat" },
  }),
  integrations: ["datev", "elster"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Hosting in zertifizierten Rechenzentren in Deutschland, laut Anbieter bei Amazon Web Services in Frankfurt am Main",
    avv: "unbekannt",
    certifications: [],
    certificationNote:
      "Die Rechenzentren sind laut Datenschutzbestimmungen nach ISO/IEC 27001, 27017 und 27018 zertifiziert; eine eigene Zertifizierung nennt der Anbieter nicht.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "BuchhaltungsButler",
      url: "https://www.buchhaltungsbutler.de/datenschutz-saas/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: [],
    onboarding: "kostenpflichtig",
    note: "Support-Termine 30 Min. 64,90 €, 60 Min. 99,90 €",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 75,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "KI-Belegerkennung, Bankabgleich, UStVA, EÜR und Bilanz ab Smart.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 29,90 € bei jährlicher Laufzeit, monatlich deutlich teurer; Steuerberater-Zugang inklusive.",
    datenschutz:
      "Hosting in Frankfurt in zertifizierten Rechenzentren; AVV und 2FA nicht geprüft.",
    support:
      "Noch nicht getestet. Persönliche Support-Termine kostenpflichtig.",
    integrationen: "DATEV-Export, ELSTER, eBilanz+, API als Zusatzmodul.",
  },
  pros: [
    {
      title: "Auch für Bilanzierer",
      detail:
        "Ab Smart für EÜR- und bilanzierende Unternehmen, mit UStVA und Bilanz-Übermittlung.",
    },
    {
      title: "Steuerberater-Zugang inklusive",
      detail:
        "In allen Paketen ist ein Zugang für die Steuerberatung enthalten.",
    },
    {
      title: "Viele Banken",
      detail:
        "Über drei Schnittstellenpartner lassen sich mehr als 5.000 Banken anbinden.",
    },
  ],
  cons: [
    {
      title: "Monatliche Laufzeit teuer",
      detail: "Ohne Jahresbindung kostet Smart 46,90 € statt 34,90 € im Monat.",
    },
    {
      title: "Kein kostenloser Tarif",
      detail: "Es gibt nur einen 14-tägigen Test.",
    },
    {
      title: "Light ohne Steuermeldungen",
      detail:
        "Im Tarif Light fehlen UStVA und EÜR – hier schließt die Steuerberatung ab.",
    },
  ],
  verdict: {
    short:
      "BuchhaltungsButler eignet sich für kleine Unternehmen mit vielen Belegen, die viel automatisieren wollen – auch bilanzierende. Günstig wird es erst mit jährlicher Laufzeit.",
    idealFor: [
      "GmbHs und eingetragene Kaufleute mit Bilanzierungspflicht",
      "Unternehmen mit vielen Belegen und mehreren Bankkonten",
    ],
    notIdealFor: [
      "Selbstständige mit wenigen Belegen, die monatlich kündbar bleiben wollen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Datenschutzseiten des Anbieters (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "BuchhaltungsButler",
      url: "https://www.buchhaltungsbutler.de/preise/",
      accessedAt: checked,
    },
    {
      name: "BuchhaltungsButler",
      url: "https://www.buchhaltungsbutler.de/datenschutz-saas/",
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
