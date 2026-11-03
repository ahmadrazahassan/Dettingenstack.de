import type { ToolInput } from "@/lib/schema";
import { erpFeatures } from "./_erp";
import { analyse, checkedPm as checked } from "./_pm";

// Per user and month; the minimum booking of 449 € per month is approximated with minUnits.
const perUser = (monthly: number) =>
  ({
    type: "per_unit",
    unit: "nutzer",
    price: { monthly, annualPerMonth: null },
    minUnits: Math.ceil(44900 / monthly),
  }) as const;
const source = "https://www.haufe-x360.de/preise";

export const haufeX360 = {
  slug: "haufe-x360",
  name: "Haufe X360",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Haufe-Lexware GmbH & Co. KG",
    hq: "Freiburg im Breisgau",
    countryCode: "DE",
    website: "https://www.haufe-x360.de/",
  },
  logo: null,
  categories: { primary: "erp-software", secondary: [] },
  tagline: "Cloud-ERP von Haufe für Dienstleistung, Handel und Produktion",
  bestFor: "Mittelständler mit Wachstumsplänen",
  companySizes: ["klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Unverbindliche Beispielpakete laut Preisliste vom 19.11.2025: Preis pro Nutzer und Monat zzgl. gewählter Module und Schnittstellen, monatliche Abrechnung. Mindestbuchung 449 € pro Monat; unser Rechner bildet sie über eine Mindestzahl an Nutzern nach und kann deshalb leicht darüber liegen. Weitere Pakete: Retail 1 108 €, Retail 3 161 €, Production 1 182 €, Production 3 240 €.",
    plans: [
      {
        id: "services-1",
        name: "Services 1",
        model: perUser(4900),
        features: ["auftraege", "einkauf"],
        highlights: ["Aufträge & Einkauf", "Dokumentenmanagement"],
        limits: ["Mindestbuchung 449 € pro Monat"],
      },
      {
        id: "services-2",
        name: "Services 2",
        model: perUser(10200),
        features: ["auftraege", "einkauf", "fibu", "crm-modul"],
        highlights: ["Plus Buchhaltung", "Plus CRM"],
        recommended: true,
      },
      {
        id: "services-3",
        name: "Services 3",
        model: perUser(18500),
        features: [
          "auftraege",
          "einkauf",
          "fibu",
          "crm-modul",
          "warenwirtschaft",
        ],
        highlights: ["Plus Servicemanagement", "Plus Lager"],
      },
      {
        id: "retail-2",
        name: "Retail 2 (E-Commerce)",
        model: perUser(14200),
        features: ["auftraege", "einkauf", "warenwirtschaft", "fibu"],
        highlights: ["Aufträge, Einkauf, Lager", "Buchhaltung"],
      },
      {
        id: "production-2",
        name: "Production 2",
        model: perUser(21600),
        features: [
          "auftraege",
          "einkauf",
          "warenwirtschaft",
          "produktion",
          "fibu",
        ],
        highlights: ["Produktion", "Buchhaltung"],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "services-1",
        price: { monthly: 4900, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "services-2",
        price: { monthly: 10200, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "services-3",
        price: { monthly: 18500, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: erpFeatures({
    auftraege: { status: "ja" },
    einkauf: { status: "ja" },
    warenwirtschaft: { status: "ja", note: "Je nach Paket" },
    produktion: { status: "ja", note: "In den Production-Paketen" },
    fibu: { status: "ja", note: "Ab Services 2" },
    "crm-modul": { status: "ja", note: "Ab Services 2" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Haufe X360", url: source, accessedAt: checked },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 70,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen: "Pakete für Dienstleistung, Handel und Produktion.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Ab 49 € pro Nutzer, aber Mindestbuchung 449 € pro Monat.",
    datenschutz: "Deutscher Anbieter; Hosting nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Schnittstellen als Zusatzmodule.",
  },
  pros: [
    {
      title: "Branchenpakete",
      detail: "Fertige Pakete für Dienstleistung, Handel und Produktion.",
    },
    {
      title: "Transparente Preisliste",
      detail: "Beispielpreise pro Nutzer öffentlich.",
    },
  ],
  cons: [
    { title: "Mindestbuchung", detail: "Mindestens 449 € pro Monat." },
    {
      title: "Module extra",
      detail: "Zusatzfunktionen und Schnittstellen kosten gesondert.",
    },
  ],
  verdict: {
    short:
      "Haufe X360 bietet Cloud-ERP-Pakete für Dienstleister, Händler und Produzenten von einem deutschen Anbieter. Die Mindestbuchung von 449 € macht es eher für Teams ab etwa zehn Nutzern interessant.",
    idealFor: [
      "Mittelständler mit mehreren Abteilungen",
      "Unternehmen mit Lexware-Erfahrung",
    ],
    notIdealFor: ["Kleinstbetriebe mit wenigen Nutzern"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Haufe X360", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Beispielpakete und Mindestbuchung erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
