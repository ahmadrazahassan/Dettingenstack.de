import type { ToolInput } from "@/lib/schema";
import { checkedCrm as checked, crmFeatures } from "./_crm";

const starter = [
  "kontakte",
  "pipeline",
  "aufgaben",
  "email-sync",
  "automatisierung",
  "berichte",
  "app",
];
const pro = [...starter, "angebote", "prognosen"];
const annual = (annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "nutzer",
    price: { monthly: null, annualPerMonth },
  }) as const;
const source = "https://www.salesforce.com/de/sales/pricing/";

export const salesforceSalesCloud = {
  slug: "salesforce-sales-cloud",
  name: "Salesforce Sales Cloud",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Salesforce, Inc. (in Deutschland: salesforce.com Germany GmbH, München)",
    hq: "San Francisco",
    countryCode: "US",
    website: "https://www.salesforce.com/de/",
  },
  logo: null,
  categories: { primary: "crm-software", secondary: [] },
  tagline:
    "Enterprise-CRM mit großem Ökosystem – von der Free Suite bis zur KI-Edition Max",
  bestFor: "Mittelstand und Konzerne mit komplexem Vertrieb",
  companySizes: ["klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise pro Nutzer und Monat in Euro. Free Suite kostenlos, Starter Suite monatlich oder jährlich, alle höheren Editionen nur mit Jahresvertrag. Ob die Preise netto sind, nennt die Seite nicht ausdrücklich. Max wird über den Vertrieb verkauft.",
    plans: [
      {
        id: "free",
        name: "Free Suite",
        model: {
          type: "free",
          limits:
            "Kostenlose Suite laut Preisseite; Umfang dort nicht im Detail genannt",
        },
        features: ["kontakte", "pipeline"],
        highlights: ["Kostenloser Einstieg"],
      },
      {
        id: "starter",
        name: "Starter Suite",
        model: {
          type: "per_unit",
          unit: "nutzer",
          price: { monthly: 2500, annualPerMonth: 2500 },
        },
        features: starter,
        highlights: [
          "Leads, Kontakte, Opportunities",
          "Lead-Routing",
          "KI-E-Mail-Synchronisierung",
          "E-Mail-Marketing",
        ],
      },
      {
        id: "pro",
        name: "Pro Suite",
        model: annual(10000),
        features: pro,
        highlights: [
          "Alles aus Starter",
          "Angebote",
          "Prognosen",
          "Mehr Automatisierung",
        ],
        recommended: true,
      },
      {
        id: "core",
        name: "Core",
        model: annual(19500),
        features: pro,
        highlights: ["Alles aus Pro Suite", "Slack Business+", "Tableau Next"],
      },
      {
        id: "advanced",
        name: "Advanced",
        model: annual(39500),
        features: pro,
        highlights: [
          "Alles aus Core",
          "Mehr Sicherheit und KI",
          "Backup und Archivierung",
        ],
      },
      {
        id: "max",
        name: "Max",
        model: annual(55000),
        features: pro,
        highlights: [
          "Alles aus Advanced",
          "Agentforce for Sales",
          "Vertriebsplanung",
          "Über den Vertrieb",
        ],
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: { minTermMonths: 12, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "starter",
        price: { monthly: 2500, annualPerMonth: 2500 },
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: null, annualPerMonth: 10000 },
      },
      {
        date: checked,
        planId: "core",
        price: { monthly: null, annualPerMonth: 19500 },
      },
      {
        date: checked,
        planId: "advanced",
        price: { monthly: null, annualPerMonth: 39500 },
      },
      {
        date: checked,
        planId: "max",
        price: { monthly: null, annualPerMonth: 55000 },
      },
    ],
  },
  trial: { available: "ja" },
  freePlan: "ja",
  features: crmFeatures({
    kontakte: { status: "ja" },
    pipeline: { status: "ja" },
    aufgaben: { status: "ja" },
    "email-sync": { status: "ja" },
    angebote: { status: "ja", fromPlan: "pro" },
    prognosen: { status: "ja", fromPlan: "pro" },
    automatisierung: {
      status: "ja",
      note: "Integrierte Flows ab Starter, Flow-Limits je Edition",
    },
    berichte: { status: "ja" },
    app: { status: "ja" },
    api: {
      status: "ja",
      note: "Web-Services-API; Verfügbarkeit je Edition auf der Preisseite nicht eindeutig",
    },
  }),
  integrations: [
    "microsoft-365",
    "google-workspace",
    "slack",
    "microsoft-teams",
  ],
  compliance: {
    serverLocation: "EU_US",
    serverNote:
      "Optional Hyperforce EU Operating Zone: Daten auf AWS in Deutschland (Backups in Frankreich), betrieben über die SFDC Germany Data Center GmbH",
    avv: "unbekannt",
    certifications: [],
    certificationNote:
      "Zertifizierungen haben wir für diesen Vergleich nicht im Original geprüft.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Salesforce",
      url: "https://www.salesforce.com/platform/data-residence-eu-oz/",
      accessedAt: checked,
    },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 95,
    bedienbarkeit: 70,
    preisLeistung: 55,
    datenschutz: 75,
    support: 70,
    integrationen: 95,
  },
  scoreNotes: {
    funktionen: "Nahezu beliebig anpassbar, sehr großer Funktionsumfang.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Starter Suite günstig, ab Pro Suite 100 € pro Nutzer mit Jahresvertrag.",
    datenschutz:
      "EU Operating Zone mit Rechenzentrum in Deutschland verfügbar.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "AppExchange und offene APIs.",
  },
  pros: [
    {
      title: "Skaliert mit dem Unternehmen",
      detail: "Vom Starter-Paket bis zum Konzern-CRM auf einer Plattform.",
    },
    {
      title: "EU Operating Zone",
      detail:
        "Datenhaltung in Deutschland über eine deutsche Betreibergesellschaft möglich.",
    },
  ],
  cons: [
    {
      title: "Teuer ab Pro Suite",
      detail: "100 € bis 550 € pro Nutzer und Monat mit Jahresvertrag.",
    },
    {
      title: "Einführung aufwendig",
      detail: "Höhere Editionen brauchen meist einen Implementierungspartner.",
    },
  ],
  verdict: {
    short:
      "Salesforce ist das CRM für Unternehmen, die Vertrieb stark anpassen und skalieren wollen. Für kleine Teams reicht oft die Starter Suite; darüber steigen Preise und Einführungsaufwand deutlich.",
    idealFor: [
      "Mittelstand mit mehreren Vertriebsteams",
      "Unternehmen mit individuellen Prozessen",
    ],
    notIdealFor: ["Kleinstbetriebe mit einfachem Vertrieb"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite und der Seite zur EU Operating Zone (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    { name: "Salesforce", url: source, accessedAt: checked },
    {
      name: "Salesforce",
      url: "https://www.salesforce.com/platform/data-residence-eu-oz/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Editionen und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
