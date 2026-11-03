import type { ToolInput } from "@/lib/schema";
import { erpFeatures } from "./_erp";
import { analyse, checkedPm as checked } from "./_pm";

const annual = (annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "nutzer",
    price: { monthly: null, annualPerMonth },
  }) as const;
const source = "https://www.sage.com/de-de/produkte/sage-100/";

export const sage100 = {
  slug: "sage-100",
  name: "Sage 100",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Sage GmbH",
    hq: "Frankfurt am Main",
    countryCode: "DE",
    website: "https://www.sage.com/de-de/",
  },
  logo: null,
  categories: { primary: "erp-software", secondary: [] },
  tagline:
    "Modulares ERP für den Mittelstand – Warenwirtschaft, Rechnungswesen, Produktion",
  bestFor: "Mittelständler mit klassischen ERP-Prozessen",
  companySizes: ["klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise pro Modul, Monat und Nutzer, gültig bei jährlicher Rechnungsstellung mit 12 Monaten Mindestlaufzeit, zzgl. USt.; kürzere oder längere Laufzeiten sind laut Sage optional verfügbar. Module lassen sich kombinieren; Erweiterungen wie xRM, DMS oder Sage Webshop sowie Partnerlösungen kommen hinzu. Sage 100 läuft lokal (On-Premise) oder in der Cloud.",
    plans: [
      {
        id: "warenwirtschaft",
        name: "Modul Warenwirtschaft",
        model: annual(5600),
        features: ["auftraege", "einkauf", "warenwirtschaft"],
        highlights: [
          "Kunden- & Lieferantenverwaltung",
          "Lager & Inventur",
          "Seriennummern & Chargen",
          "Unbegrenzte Mandanten",
        ],
        recommended: true,
      },
      {
        id: "rechnungswesen",
        name: "Modul Rechnungswesen",
        model: annual(5800),
        features: ["fibu"],
        highlights: [
          "Finanzbuchhaltung",
          "Offene Posten",
          "UStVA via ELSTER",
          "Controlling",
        ],
      },
      {
        id: "produktion",
        name: "Modul Produktion",
        model: annual(9000),
        features: ["produktion"],
        highlights: [
          "Kalkulation",
          "BDE",
          "Fremdfertigung",
          "Grafische Ressourcenplanung",
        ],
      },
    ],
    contract: { minTermMonths: 12, noticePeriod: null, monthlyBilling: "nein" },
    history: [
      {
        date: checked,
        planId: "warenwirtschaft",
        price: { monthly: null, annualPerMonth: 5600 },
      },
      {
        date: checked,
        planId: "rechnungswesen",
        price: { monthly: null, annualPerMonth: 5800 },
      },
      {
        date: checked,
        planId: "produktion",
        price: { monthly: null, annualPerMonth: 9000 },
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: erpFeatures({
    auftraege: { status: "ja" },
    einkauf: { status: "ja" },
    warenwirtschaft: {
      status: "ja",
      note: "Lager, Inventur, Seriennummern, Chargen",
    },
    produktion: { status: "ja", note: "Eigenes Modul" },
    fibu: {
      status: "ja",
      note: "Modul Rechnungswesen; E-Rechnungen (XRechnung, ZUGFeRD) senden und empfangen",
    },
    "crm-modul": { status: "addon", note: "xRM als Erweiterung" },
    shop: { status: "addon", note: "Sage Webshop als Erweiterung" },
    api: { status: "ja", note: "Partnerlösungen über API" },
  }),
  integrations: ["elster"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Cloud-Variante in deutschen Rechenzentren laut Sage; alternativ Betrieb auf eigenen Servern",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: { name: "Sage", url: source, accessedAt: checked },
  },
  support: {
    languages: ["de"],
    channels: [],
    onboarding: "unbekannt",
    note: "Sage Deutschland mit Standorten in Frankfurt am Main, Leipzig, Mönchengladbach und Donaueschingen",
  },
  platforms: ["windows"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 70,
    datenschutz: 70,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen: "Warenwirtschaft, Rechnungswesen und Produktion als Module.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Ab 56 € pro Modul und Nutzer bei Jahresvertrag.",
    datenschutz:
      "Cloud in deutschen Rechenzentren oder On-Premise; Zertifikate nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "ELSTER, Erweiterungen und Partnerlösungen.",
  },
  pros: [
    {
      title: "Modular",
      detail: "Warenwirtschaft, Rechnungswesen und Produktion einzeln buchbar.",
    },
    {
      title: "Unbegrenzte Mandanten",
      detail: "Laut Produktseite in allen Modulen.",
    },
    {
      title: "Cloud oder lokal",
      detail:
        "Cloud-Betrieb in deutschen Rechenzentren oder Installation auf eigenen Servern.",
    },
    {
      title: "E-Rechnung und KI",
      detail:
        "XRechnung/ZUGFeRD, OCR im Rechnungseingang und ein KI-Assistent für Analysen.",
    },
  ],
  cons: [
    { title: "Preise addieren sich", detail: "Jedes Modul kostet pro Nutzer." },
    { title: "Jahresvertrag", detail: "12 Monate Mindestlaufzeit." },
  ],
  verdict: {
    short:
      "Sage 100 ist ein etabliertes modulares ERP für den Mittelstand mit starker Warenwirtschaft und Buchhaltung. Rechne die Module pro Nutzer zusammen, bevor du vergleichst.",
    idealFor: [
      "Mittelständische Händler und Produzenten",
      "Unternehmen mit mehreren Mandanten",
    ],
    notIdealFor: ["Kleinstbetriebe – dafür gibt es Sage Active oder Sage 50"],
  },
  review: analyse("der Produktseite des Anbieters"),
  sources: [{ name: "Sage", url: source, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Modulpreise und Laufzeit erstmals erfasst." },
    {
      date: checked,
      note: "Betrieb (Cloud in Deutschland oder On-Premise), E-Rechnung und KI-Assistent ergänzt.",
    },
  ],
} satisfies ToolInput;
