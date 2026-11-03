import type { ToolInput } from "@/lib/schema";
import { checkedZeit as checked, zeitFeatures } from "./_zeit";

const all = [
  "zeiterfassung",
  "abwesenheiten",
  "schichtplanung",
  "app",
  "terminal",
  "projektzeiten",
  "datev-lohn",
  "api",
];

export const timetac = {
  slug: "timetac",
  name: "TimeTac",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "TimeTac GmbH",
    hq: "Graz",
    countryCode: "AT",
    website: "https://www.timetac.com/de/",
  },
  logo: null,
  categories: { primary: "zeiterfassungssoftware", secondary: [] },
  tagline:
    "Modulare Zeiterfassung mit Projektzeiten, Dienstplanung und Terminals",
  bestFor: "Mittelständische Unternehmen mit Arbeits- und Projektzeiten",
  companySizes: ["klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.timetac.com/de/elektronische-zeiterfassung/",
    note: "TimeTac nennt „ab 4,50 € pro Person und Monat“ für die genutzten Module. Für das Modul Arbeitszeit- und Urlaubserfassung fällt laut FAQ eine Grundgebühr von 20 € pro Monat bei jährlicher Abrechnung an. Die vollständigen Tarifpreise zeigt nur der Preisrechner auf der Website; die konnten wir nicht verifizieren. Netto, exkl. USt.",
    plans: [
      {
        id: "arbeitszeit",
        name: "Arbeitszeit & Urlaub (ab)",
        model: {
          type: "base_plus_per_unit",
          unit: "mitarbeitende",
          base: { monthly: null, annualPerMonth: 2000 },
          perUnit: { monthly: null, annualPerMonth: 450 },
          includedUnits: 0,
        },
        features: all,
        highlights: [
          "Arbeitszeiterfassung",
          "Abwesenheitsmanagement",
          "Dienstplanung",
          "Terminal & NFC",
          "DATEV-Schnittstellen",
        ],
        limits: [
          "Einstiegspreis; der Preisrechner zeigt die Preise je Modul und Tarif",
        ],
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod:
        "bei monatlicher Zahlung 7 Tage zum Monatsletzten (laut FAQ)",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "arbeitszeit",
        price: { monthly: null, annualPerMonth: 450 },
        note: "ab-Preis pro Person",
      },
    ],
  },
  trial: { available: "ja" },
  freePlan: "unbekannt",
  features: zeitFeatures({
    zeiterfassung: { status: "ja" },
    abwesenheiten: { status: "ja" },
    schichtplanung: { status: "ja", note: "Dienstplanung" },
    app: { status: "ja" },
    terminal: { status: "ja", note: "Zeiterfassungsterminal und NFC" },
    projektzeiten: {
      status: "ja",
      note: "Auch als eigenständiges Modul ohne Grundgebühr",
    },
    "datev-lohn": {
      status: "ja",
      note: "DATEV-Schnittstellen und Payroll Connect",
    },
    api: { status: "ja" },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "EU",
    serverNote:
      "Laut FAQ Server in der EU, Hauptstandort Deutschland, tägliche Backups",
    avv: "unbekannt",
    certifications: ["ISO_27001"],
    certificationNote:
      "TimeTac gibt an, nach ISO 27001 zertifiziert zu sein; das Zertifikat haben wir nicht eingesehen.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "TimeTac",
      url: "https://www.timetac.com/en/faqs/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de", "en"],
    channels: [],
    onboarding: "unbekannt",
    note: "Premium-Support gegen Aufpreis pro Nutzer",
  },
  platforms: ["web", "windows", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 80,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "Arbeitszeit, Projektzeit, Abwesenheiten, Dienstplanung und Terminals als Module.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 4,50 € pro Person plus 20 € Grundgebühr; vollständige Tarifpreise nur im Preisrechner.",
    datenschutz:
      "Server in der EU mit Hauptstandort Deutschland, ISO 27001 laut Anbieter.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "DATEV-Schnittstellen, Payroll Connect und API.",
  },
  pros: [
    {
      title: "Modular",
      detail:
        "Arbeitszeit, Projektzeit, Abwesenheiten und Dienstplanung lassen sich einzeln buchen.",
    },
    {
      title: "Terminals und NFC",
      detail:
        "Neben App und Browser auch Hardware-Terminals und NFC-Erfassung.",
    },
  ],
  cons: [
    {
      title: "Preise nur im Rechner",
      detail:
        "Auf der Website steht nur ein Einstiegspreis; die Tarifpreise zeigt ein Rechner.",
    },
    {
      title: "Grundgebühr",
      detail: "Für das Arbeitszeit-Modul kommen 20 € im Monat dazu.",
    },
  ],
  verdict: {
    short:
      "TimeTac deckt Arbeitszeit, Projektzeit und Dienstplanung modular ab und passt gut zu mittelständischen Unternehmen mit mehreren Standorten. Den genauen Preis für deine Modulauswahl liefert der Preisrechner.",
    idealFor: [
      "Mittelständler mit Arbeits- und Projektzeiten",
      "Unternehmen mit Terminals an mehreren Standorten",
    ],
    notIdealFor: ["Kleinstbetriebe, die nur stempeln wollen"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Produkt- und FAQ-Seiten des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "TimeTac",
      url: "https://www.timetac.com/de/elektronische-zeiterfassung/",
      accessedAt: checked,
    },
    {
      name: "TimeTac",
      url: "https://www.timetac.com/en/faqs/",
      accessedAt: checked,
    },
    {
      name: "TimeTac",
      url: "https://www.timetac.com/de/preise/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Einstiegspreis, Module und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
