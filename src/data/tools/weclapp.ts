import type { ToolInput } from "@/lib/schema";
import { erpFeatures } from "./_erp";
import { analyse, checkedPm as checked } from "./_pm";

const starter = ["auftraege", "fibu"];
const service = [...starter, "crm-modul", "projekte", "api"];
const handel = [
  ...service,
  "warenwirtschaft",
  "einkauf",
  "produktion",
  "shop",
  "app",
];
const perUser = (monthly: number, annualPerMonth: number | null) =>
  ({
    type: "per_unit",
    unit: "nutzer",
    price: { monthly, annualPerMonth },
  }) as const;
const source = "https://www.weclapp.com/de/preise/";

export const weclapp = {
  slug: "weclapp",
  name: "weclapp",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "weclapp GmbH",
    hq: "Kitzingen",
    countryCode: "DE",
    website: "https://www.weclapp.com/de/",
  },
  logo: null,
  categories: { primary: "erp-software", secondary: ["crm-software"] },
  tagline:
    "Cloud-ERP aus Deutschland für Dienstleister und Handel – mit CRM inklusive",
  bestFor: "KMU in Handel und Dienstleistung",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise pro Nutzer und Monat, netto zzgl. USt. Die Seite zeigt zwei Preisreihen ohne Beschriftung (86 €/163 € und 95 €/179 €); wir lesen die niedrigere als Preis bei jährlicher Zahlung. Starter nur monatlich. Enterprise-Angebote ab mehr als 10 Lizenzen. Steuerberaterzugang kostenlos.",
    plans: [
      {
        id: "starter",
        name: "ERP Starter",
        model: perUser(3900, null),
        features: starter,
        highlights: [
          "Kontakte, Angebote, Rechnungen",
          "Buchhaltung & Banking",
          "E-Rechnung",
        ],
        excludeFromEntry: ["crm-software"],
      },
      {
        id: "dienstleistung",
        name: "ERP Dienstleistung",
        model: perUser(9500, 8600),
        features: service,
        highlights: [
          "CRM",
          "Auftragsabwicklung",
          "Projekte & Zeiterfassung",
          "API",
        ],
        recommended: true,
      },
      {
        id: "handel",
        name: "ERP Handel",
        model: perUser(17900, 16300),
        features: handel,
        highlights: [
          "Warenwirtschaft & Einkauf",
          "Lager-App",
          "Produktion",
          "Shop- und Marktplatzanbindung",
        ],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "starter",
        price: { monthly: 3900, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "dienstleistung",
        price: { monthly: 9500, annualPerMonth: 8600 },
      },
      {
        date: checked,
        planId: "handel",
        price: { monthly: 17900, annualPerMonth: 16300 },
      },
    ],
  },
  trial: { available: "ja", days: 30 },
  freePlan: "nein",
  features: erpFeatures({
    auftraege: { status: "ja" },
    "crm-modul": { status: "ja", fromPlan: "dienstleistung" },
    shop: { status: "ja", fromPlan: "handel" },
    warenwirtschaft: { status: "ja", fromPlan: "handel" },
    einkauf: { status: "ja", fromPlan: "handel" },
    produktion: { status: "ja", fromPlan: "handel" },
    fibu: { status: "ja", note: "Buchhaltung und Banking ab Starter" },
    projekte: {
      status: "ja",
      fromPlan: "dienstleistung",
      note: "Mit Zeiterfassung",
    },
    api: { status: "ja", fromPlan: "dienstleistung" },
    app: { status: "ja", fromPlan: "handel", note: "Mobile Lager-App" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Daten ausschließlich in deutschen Rechenzentren laut Preisseite",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "weclapp", url: source, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 85,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen: "Von Rechnungen bis Warenwirtschaft und Produktion in Handel.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Dienstleistung ab 86 €, Handel ab 163 € pro Nutzer.",
    datenschutz: "Daten nur in Deutschland.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Shop- und Marktplatzanbindungen, API ab Dienstleistung.",
  },
  pros: [
    {
      title: "Hosting in Deutschland",
      detail: "Daten nur in deutschen Rechenzentren.",
    },
    {
      title: "CRM inklusive",
      detail: "Ab Dienstleistung mit CRM, Projekten und Zeiterfassung.",
    },
  ],
  cons: [
    {
      title: "Handel teuer pro Nutzer",
      detail: "Warenwirtschaft erst im Tarif Handel ab 163 €.",
    },
    {
      title: "Preisreihen unklar beschriftet",
      detail: "Monats- und Jahrespreise sind auf der Seite nicht eindeutig.",
    },
  ],
  verdict: {
    short:
      "weclapp ist ein durchdachtes Cloud-ERP aus Deutschland für Dienstleister und Händler. Wer nur Rechnungen braucht, ist mit Starter gut bedient; für Lager und Produktion kostet der Handel-Tarif deutlich mehr.",
    idealFor: [
      "Händler mit Lager und Onlineshop",
      "Dienstleister mit Projekten",
    ],
    notIdealFor: ["Großunternehmen mit Konzernstrukturen"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "weclapp", url: source, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Preise, Tarife und Hosting erstmals erfasst." },
  ],
} satisfies ToolInput;
