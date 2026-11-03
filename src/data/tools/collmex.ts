import type { ToolInput } from "@/lib/schema";
import { buchhaltungFeatures, checked } from "./_buchhaltung";

const core = [
  "buchungen",
  "ustva",
  "euer",
  "datev-export",
  "steuerberater-zugang",
];

export const collmex = {
  slug: "collmex",
  name: "Collmex",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Collmex GmbH",
    hq: "Saarbrücken",
    countryCode: "DE",
    website: "https://www.collmex.de/",
  },
  logo: null,
  categories: { primary: "buchhaltungssoftware", secondary: [] },
  tagline:
    "Günstige Online-Buchhaltung aus Saarbrücken, auch als Komplettpaket mit Warenwirtschaft",
  bestFor: "Preisbewusste Kleinunternehmen und Vereine",
  companySizes: ["solo", "kleinst", "klein"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.collmex.de/preise.html",
    note: "Preise für „Collmex Buchhaltung“, netto pro Monat, monatlich kündbar. Enthalten sind je ein Administrator, ein Buchhalter und ein Steuerprüfer-Zugang. Das Komplettpaket mit Rechnungen und Warenwirtschaft kostet 16,95 € bis 46,95 € im Monat.",
    plans: [
      {
        id: "free",
        name: "free",
        model: {
          type: "free",
          limits: "1 Administrator, bis 100.000 Buchungen",
          maxUnits: 1,
        },
        features: core,
        highlights: ["Kostenlos", "1 Administrator", "100.000 Buchungen"],
        limits: ["Nicht erweiterbar"],
      },
      {
        id: "light",
        name: "light",
        model: {
          type: "flat",
          unit: "pauschal",
          price: { monthly: 895, annualPerMonth: null },
          includedUnits: 2,
        },
        features: core,
        highlights: [
          "Administrator, Buchhalter und Steuerprüfer",
          "100.000 Buchungen, erweiterbar",
        ],
        recommended: true,
      },
      {
        id: "basic",
        name: "basic",
        model: {
          type: "base_plus_per_unit",
          unit: "pauschal",
          base: { monthly: 1195, annualPerMonth: null },
          perUnit: { monthly: 1195, annualPerMonth: null },
          includedUnits: 2,
        },
        features: core,
        highlights: [
          "Alles aus light",
          "25 Zugänge Mitarbeiterportal",
          "Zusatzbenutzer 11,95 €",
        ],
      },
    ],
    addOns: [
      {
        id: "speicher",
        name: "Zusatzspeicher je 100.000 Buchungen",
        unit: "pauschal",
        price: { monthly: 1195, annualPerMonth: null },
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 0,
      noticePeriod: "jederzeit zum Monatsende",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "light",
        price: { monthly: 895, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "basic",
        price: { monthly: 1195, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "ja", days: 30 },
  freePlan: "ja",
  features: buchhaltungFeatures({
    buchungen: { status: "ja" },
    ustva: { status: "ja", note: "Über die integrierte ELSTER-Software" },
    euer: { status: "ja", note: "Laut Handbuch, inklusive GuV" },
    bilanz: {
      status: "unbekannt",
      note: "Im Handbuch zu light nicht beschrieben",
    },
    anlagen: {
      status: "teilweise",
      note: "In light keine Anlagenverwaltung, nur Buchung über Vorlagen",
    },
    kostenstellen: {
      status: "teilweise",
      note: "Laut Handbuch nicht in allen Versionen",
    },
    bankanbindung: {
      status: "unbekannt",
      note: "In light keine separate Verwaltung von Bankkonten",
    },
    belegerfassung: {
      status: "unbekannt",
      note: "In light keine Belegerfassung",
    },
    "e-rechnung-empfang": {
      status: "teilweise",
      note: "Einzelne E-Rechnungen lassen sich anzeigen",
    },
    belegarchiv: {
      status: "ja",
      note: "Lesbarkeit laut Anbieter für die gesamte Aufbewahrungsfrist garantiert",
    },
    "steuerberater-zugang": {
      status: "ja",
      note: "Eigene Rolle „Steuerprüfer“ und Steuerprüfer-Export",
    },
    "datev-export": {
      status: "ja",
      note: "DATEV-Format 3.0 oder KNE, auch per API",
    },
    rechnungen: {
      status: "addon",
      note: "Im Komplettpaket oder als „Collmex Rechnung“",
    },
    api: { status: "ja", note: "DATEV-Export per API abrufbar" },
  }),
  integrations: ["datev", "elster"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Rechenzentrum in Köln (PlusServer GmbH), gespiegelte Festplatten, tägliche Sicherung an einen zweiten Standort",
    avv: "unbekannt",
    certifications: [],
    certificationNote:
      "Das Rechenzentrum ist laut Collmex durch TÜV SÜD nach ISO/IEC 27001:2022 und ISO 9001:2015 zertifiziert, nicht Collmex selbst.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Collmex",
      url: "https://www.collmex.de/sicherheit.html",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "selbst" },
  platforms: ["web"],
  scores: {
    funktionen: 65,
    bedienbarkeit: 70,
    preisLeistung: 90,
    datenschutz: 75,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "Buchhaltung mit UStVA und EÜR; Bilanz, Belegerfassung und Bankanbindung für light im Handbuch nicht belegt.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Buchhaltung ab 8,95 € im Monat mit drei Zugängen, monatlich kündbar; kostenloser Tarif.",
    datenschutz:
      "Rechenzentrum in Köln mit zertifiziertem Betreiber; AVV und 2FA nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "DATEV-Export (auch per API) und ELSTER.",
  },
  pros: [
    {
      title: "Sehr günstig",
      detail:
        "Buchhaltung mit UStVA und EÜR ab 8,95 € im Monat, ein kostenloser Tarif für einen Nutzer.",
    },
    {
      title: "Steuerprüfer-Zugang",
      detail:
        "Eigene Rolle für Betriebsprüfung und Steuerberatung, inklusive Steuerprüfer-Export.",
    },
    {
      title: "Monatlich kündbar",
      detail: "Kündigung jederzeit zum Monatsende, 30 Tage kostenloser Test.",
    },
  ],
  cons: [
    {
      title: "Wenig Komfortfunktionen",
      detail:
        "Im Tarif light gibt es laut Handbuch weder Belegerfassung noch eine Verwaltung von Bankkonten.",
    },
    {
      title: "Rechnungen separat",
      detail:
        "Rechnungen gibt es im Komplettpaket oder im eigenen Produkt „Collmex Rechnung“.",
    },
    {
      title: "Zusatzbenutzer teuer",
      detail: "Im Tarif basic kostet jeder weitere Benutzer 11,95 € im Monat.",
    },
  ],
  verdict: {
    short:
      "Collmex ist die günstigste Buchhaltung im Vergleich, mit UStVA, EÜR und einem eigenen Steuerprüfer-Zugang. Wer Belege und Kontoumsätze automatisch verarbeiten will, findet bei anderen Anbietern mehr Komfort.",
    idealFor: [
      "Preisbewusste Kleinunternehmen, die selbst buchen",
      "Vereine (eigener Vereinstarif)",
    ],
    notIdealFor: [
      "Unternehmen, die Belege und Kontoumsätze automatisch zuordnen lassen wollen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis-, Sicherheits- und Handbuchseiten des Anbieters (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Collmex",
      url: "https://www.collmex.de/preise.html",
      accessedAt: checked,
    },
    {
      name: "Collmex",
      url: "https://www.collmex.de/sicherheit.html",
      accessedAt: checked,
    },
    {
      name: "Collmex",
      url: "https://www.collmex.de/handbuch_buchhaltung_light.html",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Tarife und Rechenzentrumsangaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
