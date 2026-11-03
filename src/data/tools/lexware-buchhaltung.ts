import type { ToolInput } from "@/lib/schema";
import { buchhaltungFeatures, checked } from "./_buchhaltung";

const all = ["buchungen", "ustva", "euer", "bilanz", "anlagen"];

const flat = (monthly: number) =>
  ({
    type: "flat",
    unit: "pauschal",
    price: { monthly, annualPerMonth: monthly },
    includedUnits: 1,
  }) as const;

export const lexwareBuchhaltung = {
  slug: "lexware-buchhaltung",
  name: "Lexware buchhaltung",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Haufe Service Center GmbH (Lexware)",
    hq: "Freiburg im Breisgau",
    countryCode: "DE",
    website: "https://www.lexware.de/",
  },
  logo: null,
  categories: { primary: "buchhaltungssoftware", secondary: [] },
  tagline:
    "Klassische Desktop-Buchhaltung für Windows mit EÜR, Bilanz und E-Bilanz",
  bestFor: "Unternehmen, die lokal buchen und bilanzieren wollen",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.lexware.de/preise2026/",
    note: "Preise gültig ab 01.09.2026, netto; Jahrespreis = 12 × Monatspreis. Arbeitsplätze und Unterschiede der Varianten nennt die Preisseite nicht. Installation auf eigenen Rechnern (On-Premise).",
    plans: [
      {
        id: "basis",
        name: "buchhaltung",
        model: flat(2440),
        features: all,
        highlights: [
          "EÜR & doppelte Buchführung",
          "Bis 10.000 Buchungen pro Jahr",
          "ELSTER: UStVA, Anlage EÜR, E-Bilanz",
        ],
      },
      {
        id: "plus",
        name: "buchhaltung plus",
        model: flat(3040),
        features: all,
        highlights: ["Alles aus buchhaltung"],
        recommended: true,
      },
      {
        id: "pro",
        name: "buchhaltung pro",
        model: flat(6340),
        features: all,
        highlights: ["Alles aus plus"],
      },
      {
        id: "premium",
        name: "buchhaltung premium",
        model: flat(7790),
        features: all,
        highlights: ["Alles aus pro"],
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "basis",
        price: { monthly: 2440, annualPerMonth: 2440 },
        note: "Preis gültig ab 01.09.2026",
      },
      {
        date: checked,
        planId: "plus",
        price: { monthly: 3040, annualPerMonth: 3040 },
        note: "Preis gültig ab 01.09.2026",
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: 6340, annualPerMonth: 6340 },
        note: "Preis gültig ab 01.09.2026",
      },
      {
        date: checked,
        planId: "premium",
        price: { monthly: 7790, annualPerMonth: 7790 },
        note: "Preis gültig ab 01.09.2026",
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: buchhaltungFeatures({
    buchungen: {
      status: "ja",
      note: "Doppelte Buchführung, Standard-Kontenrahmen",
    },
    ustva: {
      status: "ja",
      note: "Inklusive Dauerfristverlängerung, über ELSTER",
    },
    euer: { status: "ja", note: "Inklusive Anlage EÜR" },
    bilanz: { status: "ja", note: "Bilanz mit GuV, E-Bilanz über ELSTER" },
    anlagen: { status: "ja", note: "Anlagespiegel" },
  }),
  integrations: ["elster"],
  compliance: {
    serverLocation: "andere",
    serverNote:
      "Desktop-Software: Die Daten liegen auf deinem Rechner oder Server – Sicherung und Schutz sind deine Aufgabe.",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: {
      name: "Lexware",
      url: "https://www.lexware.de/preise2026/",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["windows"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 70,
    datenschutz: 65,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "EÜR, doppelte Buchführung, Bilanz, E-Bilanz und Anlagespiegel; Belegerfassung und Bankabgleich nicht geprüft.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 24,40 € im Monat; Unterschiede der Varianten auf der Preisseite nicht erklärt.",
    datenschutz:
      "Daten bleiben im eigenen Haus; Sicherung und Schutz liegen beim Anwender.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen:
      "ELSTER für UStVA, Anlage EÜR und E-Bilanz; DATEV-Export nicht geprüft.",
  },
  pros: [
    {
      title: "Bilanz und E-Bilanz",
      detail:
        "Doppelte Buchführung mit Bilanz, GuV und E-Bilanz-Übermittlung über ELSTER.",
    },
    {
      title: "Daten im eigenen Haus",
      detail:
        "Die Software läuft lokal unter Windows; laut Shop im Netzwerk auf mehreren Arbeitsplätzen nutzbar.",
    },
    {
      title: "EÜR und Bilanz in einem",
      detail:
        "Geeignet für den Wechsel von der EÜR zur Bilanz ohne neues Programm.",
    },
  ],
  cons: [
    { title: "Nur Windows", detail: "Kein Browser-Zugriff, kein Mac." },
    {
      title: "Unterschiede der Varianten unklar",
      detail:
        "Die Preisseite nennt keine Unterschiede zwischen buchhaltung, plus, pro und premium.",
    },
    {
      title: "Eigene IT nötig",
      detail:
        "Updates, Backups und Datensicherheit liegen in deiner Verantwortung.",
    },
  ],
  verdict: {
    short:
      "Lexware buchhaltung ist die Wahl für Unternehmen, die lokal unter Windows buchen und selbst bilanzieren wollen. Wer ortsunabhängig arbeiten oder keine eigene IT betreuen will, ist mit einer Cloud-Lösung besser bedient.",
    idealFor: [
      "Bilanzierende Unternehmen mit eigener IT",
      "Buchhaltung, die bewusst im eigenen Haus bleiben soll",
    ],
    notIdealFor: ["Teams, die mobil oder auf dem Mac arbeiten"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite und der Shop-Angaben des Anbieters (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Lexware",
      url: "https://www.lexware.de/preise2026/",
      accessedAt: checked,
    },
    {
      name: "Lexware Shop",
      url: "https://shop.lexware.de/lexware-buchhaltung?variante=premium",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise ab 01.09.2026 und Grundfunktionen erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
