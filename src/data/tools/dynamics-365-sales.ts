import type { ToolInput } from "@/lib/schema";
import { checkedCrm as checked, crmFeatures } from "./_crm";

const core = [
  "kontakte",
  "pipeline",
  "aufgaben",
  "email-sync",
  "berichte",
  "app",
  "api",
];
const enterprise = [...core, "prognosen"];
const annual = (annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "nutzer",
    price: { monthly: null, annualPerMonth },
  }) as const;
const source =
  "https://www.microsoft.com/de-de/dynamics-365/products/sales/pricing";
const eudb =
  "https://learn.microsoft.com/en-us/privacy/eudb/eu-data-boundary-learn";

export const dynamics365Sales = {
  slug: "dynamics-365-sales",
  name: "Microsoft Dynamics 365 Sales",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Microsoft Corporation (in Deutschland: Microsoft Deutschland GmbH, München)",
    hq: "Redmond",
    countryCode: "US",
    website: "https://www.microsoft.com/de-de/dynamics-365/products/sales",
  },
  logo: null,
  categories: { primary: "crm-software", secondary: [] },
  tagline:
    "Vertriebs-CRM für Unternehmen, die tief in Microsoft 365 und Teams arbeiten",
  bestFor: "Mittelstand mit Microsoft-365-Umgebung",
  companySizes: ["klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise pro Nutzer und Monat zzgl. MwSt. bei jährlicher Abrechnung. Microsoft Relationship Sales hat einen variablen Preis und mindestens 10 Lizenzen. Einführung meist über einen Microsoft-Partner.",
    plans: [
      {
        id: "professional",
        name: "Sales Professional",
        model: annual(5630),
        features: core,
        highlights: [
          "Kontakte, Leads, Opportunities",
          "Outlook- und Teams-Integration",
          "Berichte",
        ],
      },
      {
        id: "enterprise",
        name: "Sales Enterprise",
        model: annual(9100),
        features: enterprise,
        highlights: [
          "Alles aus Professional",
          "Prognosen",
          "Anpassbare Prozesse",
        ],
        recommended: true,
      },
      {
        id: "premium",
        name: "Sales Premium",
        model: annual(13000),
        features: enterprise,
        highlights: ["Alles aus Enterprise", "Erweiterte KI-Funktionen"],
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: {
      minTermMonths: 12,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [
      {
        date: checked,
        planId: "professional",
        price: { monthly: null, annualPerMonth: 5630 },
      },
      {
        date: checked,
        planId: "enterprise",
        price: { monthly: null, annualPerMonth: 9100 },
      },
      {
        date: checked,
        planId: "premium",
        price: { monthly: null, annualPerMonth: 13000 },
      },
    ],
  },
  trial: { available: "ja" },
  freePlan: "nein",
  features: crmFeatures({
    kontakte: { status: "ja" },
    pipeline: { status: "ja" },
    aufgaben: { status: "ja" },
    "email-sync": { status: "ja", note: "Outlook-Integration" },
    prognosen: { status: "ja", fromPlan: "enterprise" },
    berichte: { status: "ja" },
    app: { status: "ja" },
    api: { status: "ja" },
    sso: { status: "ja", note: "Anmeldung über Microsoft Entra ID" },
  }),
  integrations: ["microsoft-365", "microsoft-teams"],
  compliance: {
    serverLocation: "EU",
    serverNote:
      "Die Rechenzentrumsregion richtet sich nach der Rechnungsadresse; für Kunden in der EU gilt die EU Data Boundary",
    avv: "ja",
    certifications: [],
    certificationNote:
      "Microsoft veröffentlicht Zertifikate im Service Trust Portal; für diesen Vergleich nicht einzeln geprüft.",
    sso: "ja",
    twoFactor: "ja",
    onPremise: "unbekannt",
    source: { name: "Microsoft Learn", url: eudb, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: [],
    onboarding: "unbekannt",
    note: "Einführung meist über Microsoft-Partner",
  },
  platforms: ["web", "windows", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 80,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen: "Umfassendes Vertriebs-CRM, Prognosen ab Enterprise.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 56,30 € pro Nutzer mit Jahresvertrag, plus Partnerkosten.",
    datenschutz: "EU Data Boundary, Anmeldung über Microsoft Entra ID.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Eng verzahnt mit Outlook, Teams und der Power Platform.",
  },
  pros: [
    {
      title: "Microsoft-Integration",
      detail: "Arbeitet direkt in Outlook und Teams.",
    },
    {
      title: "EU Data Boundary",
      detail: "Daten von Kunden in der EU bleiben in der EU.",
    },
  ],
  cons: [
    {
      title: "Jahresabrechnung",
      detail: "Die Preisseite nennt Preise bei jährlicher Abrechnung.",
    },
    {
      title: "Partner meist nötig",
      detail: "Anpassung und Einführung laufen meist über einen Dienstleister.",
    },
  ],
  verdict: {
    short:
      "Dynamics 365 Sales passt zu Unternehmen, die ohnehin auf Microsoft 365 setzen und ihr CRM tief in Outlook und Teams einbinden wollen. Für kleine Teams ist es meist zu groß.",
    idealFor: ["Unternehmen mit Microsoft 365", "Mittelstand mit IT-Partner"],
    notIdealFor: ["Kleinstbetriebe ohne IT-Unterstützung"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite und der Dokumentation zur EU Data Boundary (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    { name: "Microsoft", url: source, accessedAt: checked },
    { name: "Microsoft Learn", url: eudb, accessedAt: checked },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Editionen und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
