import type { ToolInput } from "@/lib/schema";
import { rechnungFeatures } from "./_rechnung";

const checked = "2026-11-03";
const auftrag = [
  "rechnungen",
  "e-rechnung-empfang",
  "mahnwesen",
  "bankanbindung",
  "zahlungsabgleich",
  "datev-export",
  "euer",
  "ustva",
  "app",
];
const auftragPro = [...auftrag, "abschlag"];
const ware = [...auftragPro, "lager"];

// Annual billing; each further office user 20 € per month.
const plan = (annualPerMonth: number) =>
  ({
    type: "base_plus_per_unit",
    unit: "pauschal",
    base: { monthly: null, annualPerMonth },
    perUnit: { monthly: null, annualPerMonth: 2000 },
    includedUnits: 1,
  }) as const;

export const orgamax = {
  slug: "orgamax",
  name: "orgaMAX",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "deltra Business Software GmbH & Co. KG",
    hq: "Detmold",
    countryCode: "DE",
    website: "https://www.orgamax.de/",
  },
  logo: null,
  categories: { primary: "rechnungsprogramme", secondary: [] },
  tagline:
    "Bürosoftware für Handwerk und Mittelstand mit Aufträgen, Buchhaltung und Warenwirtschaft",
  bestFor: "Handwerksbetriebe und kleine Unternehmen mit Aufträgen und Lager",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.orgamax.de/preise/",
    note: "Preise netto pro Monat bei jährlicher Zahlung, Mindestlaufzeit zwölf Monate. Die Preisseite ist widersprüchlich: Die Tarifkarten nennen 49 €, 69 €, 99 € und 149 €, die Vergleichstabelle 39 €, 49 € und 69 €. Wir zeigen die höheren Kartenpreise. Weitere Büro-Nutzer 20 €, mobile Nutzer 5 € pro Monat.",
    plans: [
      {
        id: "auftrag",
        name: "AUFTRAG",
        model: plan(4900),
        features: auftrag,
        highlights: [
          "Angebote & Rechnungen",
          "Buchhaltung, EÜR, UStVA",
          "DATEV-Export & DATEV Cloud Services",
          "Automatischer Zahlungsabgleich",
        ],
      },
      {
        id: "auftrag-pro",
        name: "AUFTRAG PRO",
        model: plan(6900),
        features: auftragPro,
        highlights: [
          "Alles aus AUFTRAG",
          "Abschlags-, Teil- und Schlussrechnungen",
          "Projekte & digitale Unterschrift",
        ],
        recommended: true,
      },
      {
        id: "warenwirtschaft",
        name: "WARENWIRTSCHAFT",
        model: plan(9900),
        features: ware,
        highlights: [
          "Alles aus AUFTRAG PRO",
          "Lager & Lieferantenbestellungen",
          "Preislisten",
        ],
      },
      {
        id: "warenwirtschaft-pro",
        name: "WARENWIRTSCHAFT PRO",
        model: plan(14900),
        features: ware,
        highlights: [
          "Seriennummern & Chargen",
          "Produktion",
          "E-Commerce & Kasse",
        ],
      },
    ],
    addOns: [
      {
        id: "nutzer",
        name: "Weiterer Büro-Nutzer",
        unit: "pauschal",
        price: { monthly: null, annualPerMonth: 2000 },
      },
      {
        id: "mobil",
        name: "Weiterer mobiler Nutzer",
        unit: "pauschal",
        price: { monthly: null, annualPerMonth: 500 },
      },
      {
        id: "api",
        name: "API",
        unit: "pauschal",
        price: { monthly: null, annualPerMonth: 3000 },
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 12,
      noticePeriod: "sonst Verlängerung um zwölf Monate",
      monthlyBilling: "nein",
    },
    history: [
      {
        date: checked,
        planId: "auftrag",
        price: { monthly: null, annualPerMonth: 4900 },
      },
      {
        date: checked,
        planId: "auftrag-pro",
        price: { monthly: null, annualPerMonth: 6900 },
      },
      {
        date: checked,
        planId: "warenwirtschaft",
        price: { monthly: null, annualPerMonth: 9900 },
      },
      {
        date: checked,
        planId: "warenwirtschaft-pro",
        price: { monthly: null, annualPerMonth: 14900 },
      },
    ],
  },
  trial: { available: "ja", days: 14, creditCard: false },
  freePlan: "nein",
  features: rechnungFeatures({
    rechnungen: { status: "ja" },
    "e-rechnung-empfang": { status: "ja" },
    abschlag: { status: "ja", fromPlan: "auftrag-pro" },
    mahnwesen: { status: "ja", note: "Mehrstufig, automatischer Versand" },
    bankanbindung: { status: "ja", note: "Bank- und PayPal-Konten" },
    zahlungsabgleich: { status: "ja" },
    "datev-export": {
      status: "ja",
      note: "Auch automatisch über DATEV Cloud Services",
    },
    euer: { status: "ja", note: "Einfache und doppelte Buchführung, GuV" },
    ustva: { status: "ja" },
    app: { status: "ja" },
    api: { status: "addon", note: "30 € pro Monat" },
    "shop-anbindung": {
      status: "ja",
      fromPlan: "warenwirtschaft-pro",
      note: "E-Commerce und Kasse",
    },
    lager: { status: "ja", fromPlan: "warenwirtschaft" },
  }),
  integrations: ["datev", "elster"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Cloud-Daten im Rechenzentrum der Buhl Data Service GmbH in Neunkirchen (Siegerland)",
    avv: "unbekannt",
    certifications: [],
    certificationNote:
      "Siegel „Software hosted in Germany“ des Bundesverbands IT-Mittelstand.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "unbekannt",
    source: {
      name: "orgaMAX",
      url: "https://www.orgamax.de/datenschutz/",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 75,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen:
      "Aufträge, Buchhaltung mit EÜR und UStVA, Abschlagsrechnungen und Warenwirtschaft.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 49 € im Monat mit Jahresbindung; widersprüchliche Preisangaben auf der Preisseite.",
    datenschutz: "Rechenzentrum in Deutschland; AVV und 2FA nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "DATEV Cloud Services, ELSTER; API als Zusatzmodul.",
  },
  pros: [
    {
      title: "Rechnungen und Buchhaltung in einem",
      detail: "Schon AUFTRAG enthält EÜR, UStVA und DATEV-Übergabe.",
    },
    {
      title: "Wächst bis zur Warenwirtschaft",
      detail: "Mit Lager, Produktion und E-Commerce in den höheren Tarifen.",
    },
  ],
  cons: [
    {
      title: "Widersprüchliche Preisseite",
      detail: "Karten und Vergleichstabelle nennen unterschiedliche Preise.",
    },
    {
      title: "Jahresbindung und teure Zusatznutzer",
      detail:
        "Zwölf Monate Mindestlaufzeit, jeder weitere Büro-Nutzer 20 € im Monat.",
    },
  ],
  verdict: {
    short:
      "orgaMAX ist eher eine kleine Bürosoftware als ein reines Rechnungsprogramm: Aufträge, Buchhaltung und auf Wunsch Warenwirtschaft. Für reine Rechnungsstellung ist es teurer als die Konkurrenz.",
    idealFor: [
      "Handwerksbetriebe mit Abschlags- und Schlussrechnungen",
      "Kleine Händler mit Lager",
    ],
    notIdealFor: [
      "Selbstständige, die nur ein paar Rechnungen im Monat schreiben",
    ],
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
      name: "orgaMAX",
      url: "https://www.orgamax.de/preise/",
      accessedAt: checked,
    },
    {
      name: "orgaMAX",
      url: "https://www.orgamax.de/datenschutz/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise (mit Hinweis auf Widersprüche), Tarife und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
