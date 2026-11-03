import type { ToolInput } from "@/lib/schema";
import { checkedCrm as checked, crmFeatures } from "./_crm";

const free = ["kontakte", "pipeline", "aufgaben", "berichte", "app"];
const pro = [
  ...free,
  "mehrere-pipelines",
  "email-sync",
  "email-tracking",
  "sequenzen",
  "angebote",
  "prognosen",
  "automatisierung",
  "api",
];
const seat = (annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "nutzer",
    price: { monthly: null, annualPerMonth },
  }) as const;
const catalog =
  "https://legal.hubspot.com/de/hubspot-product-and-services-catalog";

export const hubspotCrm = {
  slug: "hubspot-crm",
  name: "HubSpot Sales Hub",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "HubSpot, Inc. (in Deutschland: HubSpot Germany GmbH, Berlin)",
    hq: "Cambridge, Massachusetts",
    countryCode: "US",
    website: "https://www.hubspot.de/",
  },
  logo: null,
  categories: { primary: "crm-software", secondary: [] },
  tagline:
    "Kostenloses CRM als Einstieg, Sales Hub mit Sequenzen und Prognosen ab Professional",
  bestFor: "Wachsende Teams mit Vertrieb und Marketing",
  companySizes: ["kleinst", "klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: catalog,
    note: "Preise laut HubSpot-Produkt- und Leistungskatalog pro Lizenz und Monat, netto. Zahlungsweise und Laufzeit regelt das Angebot; die Preisseite selbst zeigt je nach Region unterschiedliche Werte. Für Professional fällt ein einmaliges Onboarding an. Kostenlose CRM-Tools ohne Laufzeit.",
    plans: [
      {
        id: "free",
        name: "Kostenlose CRM-Tools",
        model: {
          type: "free",
          limits: "Grundfunktionen für Kontakte, Deals und Aufgaben",
        },
        features: free,
        highlights: [
          "Kontakte & Firmen",
          "Deal-Pipeline",
          "Aufgaben",
          "Mobile App",
        ],
      },
      {
        id: "starter",
        name: "Starter",
        model: seat(2000),
        features: free,
        highlights: [
          "Basislizenz Starter",
          "Höhere Limits als die Gratis-Tools",
        ],
      },
      {
        id: "professional",
        name: "Sales Hub Professional",
        model: seat(10000),
        features: pro,
        highlights: [
          "Sequenzen",
          "Prognosen",
          "Workflows",
          "Angebote",
          "Mehrere Pipelines",
        ],
        recommended: true,
      },
      {
        id: "enterprise",
        name: "Sales Hub Enterprise",
        model: seat(15000),
        features: pro,
        highlights: [
          "Alles aus Professional",
          "Erweiterte Berechtigungen",
          "Benutzerdefinierte Objekte",
        ],
      },
    ],
    addOns: [],
    oneTimeFees: [
      {
        label: "Onboarding Sales Hub Professional",
        amount: 147000,
        note: "laut Produktkatalog",
      },
    ],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [
      {
        date: checked,
        planId: "starter",
        price: { monthly: null, annualPerMonth: 2000 },
      },
      {
        date: checked,
        planId: "professional",
        price: { monthly: null, annualPerMonth: 10000 },
      },
      {
        date: checked,
        planId: "enterprise",
        price: { monthly: null, annualPerMonth: 15000 },
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "ja",
  features: crmFeatures({
    kontakte: { status: "ja" },
    pipeline: { status: "ja" },
    aufgaben: { status: "ja" },
    "mehrere-pipelines": { status: "ja", fromPlan: "professional" },
    "email-sync": { status: "ja" },
    "email-tracking": { status: "ja", note: "Nur mit Rechtsgrundlage nutzen" },
    sequenzen: { status: "ja", fromPlan: "professional" },
    angebote: { status: "ja", fromPlan: "professional" },
    prognosen: { status: "ja", fromPlan: "professional" },
    automatisierung: { status: "ja", fromPlan: "professional" },
    berichte: { status: "ja" },
    app: { status: "ja" },
    api: { status: "ja" },
  }),
  integrations: [
    "microsoft-365",
    "google-workspace",
    "slack",
    "microsoft-teams",
    "zapier",
  ],
  compliance: {
    serverLocation: "EU_US",
    serverNote:
      "Für neue Kunden optional Rechenzentrum in Frankfurt (EU); sonst USA",
    avv: "ja",
    certifications: ["SOC_2"],
    certificationNote:
      "HubSpot selbst nennt SOC 2 Type II. ISO 27001 hält der Hoster AWS, nicht HubSpot.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "HubSpot",
      url: "https://legal.hubspot.com/de/dpa",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de", "en"],
    channels: [],
    onboarding: "kostenpflichtig",
    note: "Onboarding für Professional laut Katalog 1.470 € einmalig",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 90,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 70,
    support: 70,
    integrationen: 90,
  },
  scoreNotes: {
    funktionen: "Sehr breiter Funktionsumfang mit Marketing- und Service-Hubs.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Kostenloser Einstieg, aber 100 € pro Lizenz plus Onboarding in Professional.",
    datenschutz: "EU-Rechenzentrum optional, SOC 2; US-Anbieter.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Großer App-Marketplace und offene API.",
  },
  pros: [
    {
      title: "Kostenloser Einstieg",
      detail: "Kontakte, Deals und Aufgaben ohne Laufzeit und Kosten.",
    },
    {
      title: "Alles aus einer Hand",
      detail: "Vertrieb, Marketing und Service auf einer Plattform.",
    },
  ],
  cons: [
    {
      title: "Großer Preissprung",
      detail:
        "Von 20 € in Starter auf 100 € pro Lizenz in Professional, plus Onboarding.",
    },
    {
      title: "EU-Hosting nur optional",
      detail: "Das Rechenzentrum in Frankfurt muss aktiv gewählt werden.",
    },
  ],
  verdict: {
    short:
      "HubSpot ist ideal, um kostenlos zu starten und später Marketing und Service dazuzunehmen. Ab Professional wird es teuer – rechne Lizenzen und Onboarding genau durch.",
    idealFor: [
      "Teams, die kostenlos starten wollen",
      "Unternehmen mit Inbound-Marketing",
    ],
    notIdealFor: [
      "Kleine Teams mit knappem Budget, die Automatisierung brauchen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis des Produkt- und Leistungskatalogs (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    { name: "HubSpot Produktkatalog", url: catalog, accessedAt: checked },
    {
      name: "HubSpot",
      url: "https://www.hubspot.de/pricing/sales",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise aus dem Produktkatalog und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
