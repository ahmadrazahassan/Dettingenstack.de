import type { ToolInput } from "@/lib/schema";
import { buchhaltungFeatures, checked } from "./_buchhaltung";

const s = ["belegerfassung", "belegarchiv", "app", "steuerberater-zugang"];
const m = [...s, "rechnungen", "e-rechnung-versand", "mahnwesen"];
const l = [
  ...m,
  "buchungen",
  "ustva",
  "euer",
  "bilanz",
  "kassenbuch",
  "bankanbindung",
  "zahlungsabgleich",
  "datev-export",
];
const xl = [...l, "api"];

const flat = (monthly: number) =>
  ({
    type: "flat",
    unit: "pauschal",
    price: { monthly, annualPerMonth: null },
    includedUnits: 1,
  }) as const;

export const lexwareOffice = {
  slug: "lexware-office",
  name: "Lexware Office",
  status: "published",
  // Facts from lexware.de; scores, verdict and pros/cons are drafts until a hands-on test.
  isPlaceholder: false,
  vendor: {
    name: "Haufe Service Center GmbH (Lexware)",
    hq: "Freiburg im Breisgau",
    countryCode: "DE",
    website: "https://www.lexware.de/",
  },
  logo: null,
  categories: {
    primary: "buchhaltungssoftware",
    secondary: ["rechnungsprogramme"],
  },
  tagline:
    "Cloud-Buchhaltung von Lexware, monatlich kündbar, Lohn als Zusatzmodul",
  bestFor: "Selbstständige und kleine Unternehmen mit EÜR",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.lexware.de/preise/",
    note: "Reguläre Preise netto, monatlich kündbar. Zum Prüfzeitpunkt lief eine Aktion mit 50 % Rabatt für drei Monate. Wie viele Nutzer enthalten sind, nennt die Preisseite nicht; die Version L umfasst Buchhaltung, EÜR und Umsatzsteuer.",
    plans: [
      {
        id: "s",
        excludeFromEntry: ["buchhaltungssoftware", "rechnungsprogramme"],
        name: "S",
        model: flat(790),
        features: s,
        highlights: [
          "Belegerfassung & Belegarchiv",
          "Belegscanner in der App",
          "Zugang für die Steuerberatung",
        ],
      },
      {
        id: "m",
        excludeFromEntry: ["buchhaltungssoftware"],
        name: "M",
        model: flat(1290),
        features: m,
        highlights: ["Alles aus S", "Angebote & (E-)Rechnungen", "Mahnungen"],
      },
      {
        id: "l",
        name: "L",
        model: flat(2190),
        features: l,
        highlights: [
          "Alles aus M",
          "Buchhaltung",
          "EÜR & Umsatzsteuer",
          "Multibanking & Zahlungsabgleich",
          "DATEV-Export",
        ],
        recommended: true,
      },
      {
        id: "xl",
        name: "XL",
        model: flat(3290),
        features: xl,
        highlights: ["Alles aus L", "EU- und Abschlagsrechnungen", "API"],
      },
    ],
    addOns: [
      {
        id: "lohn",
        name: "Lohn & Gehalt",
        unit: "pauschal",
        price: { monthly: 1290, annualPerMonth: null },
        note: "Preis abhängig von der Mitarbeiterzahl; Einstieg laut Preisseite",
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 0,
      noticePeriod: "monatlich",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "s",
        price: { monthly: 790, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "m",
        price: { monthly: 1290, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "l",
        price: { monthly: 2190, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "xl",
        price: { monthly: 3290, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "ja", days: 30 },
  freePlan: "nein",
  features: {
    ...buchhaltungFeatures({
      belegerfassung: { status: "ja", note: "Belegscanner in der App" },
      belegarchiv: { status: "ja" },
      "e-rechnung-empfang": {
        status: "ja",
        note: "Zuordnung zur Version auf der Preisseite nicht erkennbar",
      },
      buchungen: { status: "ja", fromPlan: "l" },
      ustva: {
        status: "ja",
        fromPlan: "l",
        note: "Elektronische Übermittlung an das Finanzamt",
      },
      euer: { status: "ja", fromPlan: "l" },
      bilanz: {
        status: "ja",
        fromPlan: "l",
        note: "Laut Hersteller; den Abschluss erstellt meist die Steuerberatung",
      },
      kassenbuch: { status: "ja", fromPlan: "l", note: "Laut Herstellerseite" },
      bankanbindung: { status: "ja", note: "Multibanking" },
      zahlungsabgleich: { status: "ja" },
      rechnungen: { status: "ja", fromPlan: "m" },
      "e-rechnung-versand": { status: "ja", fromPlan: "m" },
      mahnwesen: { status: "ja", fromPlan: "m" },
      "steuerberater-zugang": {
        status: "ja",
        note: "In jeder Version, für die Kanzlei kostenlos",
      },
      "datev-export": {
        status: "ja",
        note: "DATEV-Export (SKR 03/04) und DATEV-Datenservices",
      },
      app: { status: "ja" },
      api: { status: "ja", fromPlan: "xl" },
      lohn: { status: "addon", note: "Lohn & Gehalt ab 12,90 € pro Monat" },
    }),
    // Rechnungsprogramme (secondary category)
    abschlag: {
      status: "ja",
      fromPlan: "xl",
      note: "EU- und Abschlagsrechnungen",
    },
  },
  integrations: ["datev", "elster"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Rechenzentren im Großraum Frankfurt am Main, tägliche Sicherung",
    avv: "unbekannt",
    certifications: ["IDW_PS_880"],
    certificationNote:
      "Software- und Datensicherheit laut Lexware nach IDW PS 880 geprüft. ISO 27001 und PCI DSS beziehen sich auf die Rechenzentren, nicht auf Lexware.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Lexware",
      url: "https://www.lexware.de/datenschutz-datensicherheit/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: [],
    onboarding: "unbekannt",
    note: "Support laut Preisseite im Preis enthalten",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 80,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "Belege, Rechnungen, Buchhaltung, EÜR und Umsatzsteuer ab Version L; Lohn als Zusatzmodul.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Buchhaltung ab 21,90 € netto im Monat, monatlich kündbar, ohne Einrichtungsgebühr.",
    datenschutz:
      "Rechenzentren in Frankfurt, Prüfung nach IDW PS 880; AVV und 2FA nicht geprüft.",
    support: "Noch nicht getestet. Support laut Preisseite inklusive.",
    integrationen: "DATEV-Export und DATEV-Datenservices, API in Version XL.",
  },
  pros: [
    {
      title: "Monatlich kündbar",
      detail:
        "Keine Mindestlaufzeit und keine Einrichtungsgebühr; die Version lässt sich jederzeit wechseln.",
    },
    {
      title: "Kostenloser Zugang für die Steuerberatung",
      detail:
        "Laut Lexware in jeder Version enthalten, inklusive DATEV-Export und DATEV-Datenservices.",
    },
    {
      title: "30 Tage Test mit allen Funktionen",
      detail: "Der Test umfasst die Version XL und Lohn & Gehalt.",
    },
  ],
  cons: [
    {
      title: "Buchhaltung erst ab Version L",
      detail:
        "Die günstigen Versionen S und M decken Belege und Rechnungen ab, nicht die Buchhaltung.",
    },
    {
      title: "Nutzerzahl nicht auf der Preisseite",
      detail:
        "Wie viele Nutzer eine Version umfasst, nennt die Preisseite nicht.",
    },
    {
      title: "Lohn kostet extra",
      detail:
        "Lohn & Gehalt ist ein Zusatzmodul, der Preis hängt von der Mitarbeiterzahl ab.",
    },
  ],
  verdict: {
    short:
      "Lexware Office ist eine solide Wahl für Selbstständige und kleine Teams mit EÜR: monatlich kündbar, Server in Frankfurt und ein kostenloser Zugang für die Steuerberatung. Für die Buchhaltung brauchst du mindestens die Version L.",
    idealFor: [
      "Selbstständige und Freiberufler mit Einnahmen-Überschuss-Rechnung",
      "Kleine Unternehmen, die Belege und Rechnungen digital an die Steuerberatung geben",
    ],
    notIdealFor: [
      "Unternehmen, die mehrere Nutzer fest einplanen und die Kosten vorab kennen müssen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Sicherheitsseiten des Anbieters (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Lexware",
      url: "https://www.lexware.de/preise/",
      accessedAt: checked,
    },
    {
      name: "Lexware",
      url: "https://www.lexware.de/datenschutz-datensicherheit/",
      accessedAt: checked,
    },
    {
      name: "Lexware Hilfe",
      url: "https://help.lexware.de/de-form/articles/548355-welche-datev-exporte-bietet-lexware-office-an",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Versionen und Sicherheitsangaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
