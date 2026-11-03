import type { ToolInput } from "@/lib/schema";
import { erpFeatures } from "./_erp";
import { analyse, checkedPm as checked } from "./_pm";

const essentials = [
  "auftraege",
  "einkauf",
  "warenwirtschaft",
  "fibu",
  "projekte",
  "app",
];
const annual = (annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "nutzer",
    price: { monthly: null, annualPerMonth },
  }) as const;
const source =
  "https://www.microsoft.com/de-de/dynamics-365/products/business-central/pricing";
const eudb =
  "https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn";

export const businessCentral = {
  slug: "business-central",
  name: "Microsoft Dynamics 365 Business Central",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Microsoft Corporation",
    hq: "Redmond",
    countryCode: "US",
    website:
      "https://www.microsoft.com/de-de/dynamics-365/products/business-central",
  },
  logo: null,
  categories: { primary: "erp-software", secondary: [] },
  tagline:
    "ERP für KMU im Microsoft-Ökosystem – Finanzen, Vertrieb, Lager und Produktion",
  bestFor: "KMU mit Microsoft 365 und IT-Partner",
  companySizes: ["klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise pro Nutzer und Monat bei jährlicher Abrechnung, zzgl. MwSt.; laut Microsoft unverbindlich und je nach Land verschieden. Team Members für 6,90 € erlauben nur eingeschränkten Zugriff. Einführung und Anpassung meist über einen Microsoft-Partner.",
    plans: [
      {
        id: "essentials",
        name: "Essentials",
        model: annual(6930),
        features: essentials,
        highlights: ["Finanzen", "Vertrieb & Einkauf", "Lager", "Copilot"],
        recommended: true,
      },
      {
        id: "premium",
        name: "Premium",
        model: annual(9530),
        features: [...essentials, "produktion"],
        highlights: ["Alles aus Essentials", "Servicemanagement", "Produktion"],
      },
    ],
    addOns: [
      {
        id: "team-members",
        name: "Team Members",
        unit: "nutzer",
        price: { monthly: null, annualPerMonth: 690 },
        note: "Lesen, Genehmigen, einzelne Daten bearbeiten",
      },
    ],
    contract: {
      minTermMonths: 12,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [
      {
        date: checked,
        planId: "essentials",
        price: { monthly: null, annualPerMonth: 6930 },
      },
      {
        date: checked,
        planId: "premium",
        price: { monthly: null, annualPerMonth: 9530 },
      },
    ],
  },
  trial: { available: "ja" },
  freePlan: "nein",
  features: erpFeatures({
    auftraege: { status: "ja" },
    einkauf: { status: "ja" },
    warenwirtschaft: { status: "ja" },
    produktion: { status: "ja", fromPlan: "premium" },
    fibu: { status: "ja" },
    app: { status: "ja" },
  }),
  integrations: ["microsoft-365", "microsoft-teams"],
  compliance: {
    serverLocation: "EU",
    serverNote: "Für Kunden in der EU gilt die EU Data Boundary",
    avv: "ja",
    certifications: [],
    sso: "ja",
    twoFactor: "ja",
    onPremise: "unbekannt",
    source: { name: "Microsoft Learn", url: eudb, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: [],
    onboarding: "unbekannt",
    note: "Meist über Microsoft-Partner",
  },
  platforms: ["web", "windows", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 75,
    datenschutz: 80,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen: "Vollständiges KMU-ERP, Produktion in Premium.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 69,30 € pro Nutzer, günstige Team-Members-Lizenzen; Partnerkosten kommen dazu.",
    datenschutz: "EU Data Boundary, Anmeldung über Entra ID.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Microsoft 365, Teams, Power Platform und AppSource.",
  },
  pros: [
    {
      title: "Microsoft-Integration",
      detail: "Arbeitet mit Outlook, Excel und Teams.",
    },
    {
      title: "Günstige Zusatzlizenzen",
      detail: "Team Members für 6,90 € pro Nutzer.",
    },
  ],
  cons: [
    {
      title: "Partner meist nötig",
      detail: "Einführung und Lokalisierung laufen über Dienstleister.",
    },
    {
      title: "Jahresabrechnung",
      detail: "Preise gelten bei jährlicher Abrechnung.",
    },
  ],
  verdict: {
    short:
      "Business Central ist ein vollwertiges ERP für KMU im Microsoft-Ökosystem. Die Lizenzen sind fair bepreist; plane aber die Kosten für einen Implementierungspartner ein.",
    idealFor: ["KMU mit Microsoft 365", "Händler und Produzenten mit Partner"],
    notIdealFor: ["Kleinstbetriebe ohne IT-Budget"],
  },
  review: analyse("der deutschen Preisseite von Microsoft"),
  sources: [
    { name: "Microsoft", url: source, accessedAt: checked },
    { name: "Microsoft Learn", url: eudb, accessedAt: checked },
  ],
  changelog: [
    { date: checked, note: "Lizenzpreise und Hosting erstmals erfasst." },
  ],
} satisfies ToolInput;
