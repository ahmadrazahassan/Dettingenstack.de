import type { ToolInput } from "@/lib/schema";
import { checkedCrm as checked, crmFeatures } from "./_crm";

const lite = ["kontakte", "pipeline", "aufgaben", "berichte", "app", "api"];
const growth = [
  ...lite,
  "email-sync",
  "sequenzen",
  "prognosen",
  "automatisierung",
];
const premium = [...growth, "angebote"];
const perUser = (monthly: number, annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "nutzer",
    price: { monthly, annualPerMonth },
  }) as const;
const source = "https://www.pipedrive.com/de/pricing";

export const pipedrive = {
  slug: "pipedrive",
  name: "Pipedrive",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Pipedrive Inc.",
    hq: "New York (Entwicklung u. a. in Tallinn)",
    countryCode: "US",
    website: "https://www.pipedrive.com/de",
  },
  logo: null,
  categories: { primary: "crm-software", secondary: [] },
  tagline:
    "Pipeline-CRM für Vertriebsteams – übersichtlich, mit Automatisierung ab Growth",
  bestFor: "Kleine und mittlere Vertriebsteams",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise pro Nutzer und Monat in Euro, netto; Kunden in der EU zahlen die Umsatzsteuer ihres Mitgliedstaats. Jährliche Zahlung günstiger. Add-ons wie LeadBooster oder Web Visitors sind in Premium und Ultimate teils enthalten.",
    plans: [
      {
        id: "lite",
        name: "Lite",
        model: perUser(1900, 1400),
        features: lite,
        highlights: ["Leads & Pipeline", "KI-Berichte", "500+ Integrationen"],
      },
      {
        id: "growth",
        name: "Growth",
        model: perUser(3400, 2400),
        features: growth,
        highlights: [
          "Alles aus Lite",
          "E-Mail-Synchronisierung",
          "Automatisierungen",
          "Sequenzen",
          "Umsatzprognosen",
        ],
        recommended: true,
      },
      {
        id: "premium",
        name: "Premium",
        model: perUser(6400, 4900),
        features: premium,
        highlights: [
          "Alles aus Growth",
          "LeadBooster",
          "Lead-Scoring",
          "Angebote & E-Signaturen",
          "Berechtigungen",
        ],
      },
      {
        id: "ultimate",
        name: "Ultimate",
        model: perUser(8900, 6900),
        features: premium,
        highlights: [
          "Alles aus Premium",
          "Sicherheitsregeln",
          "Sandbox",
          "Telefon-Support",
        ],
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "lite",
        price: { monthly: 1900, annualPerMonth: 1400 },
      },
      {
        date: checked,
        planId: "growth",
        price: { monthly: 3400, annualPerMonth: 2400 },
      },
      {
        date: checked,
        planId: "premium",
        price: { monthly: 6400, annualPerMonth: 4900 },
      },
      {
        date: checked,
        planId: "ultimate",
        price: { monthly: 8900, annualPerMonth: 6900 },
      },
    ],
  },
  trial: { available: "ja", days: 14, creditCard: false },
  freePlan: "nein",
  features: crmFeatures({
    kontakte: { status: "ja" },
    pipeline: { status: "ja", note: "Visuelle Pipeline mit Drag & Drop" },
    aufgaben: { status: "ja" },
    "email-sync": { status: "ja", fromPlan: "growth" },
    sequenzen: { status: "ja", fromPlan: "growth" },
    angebote: {
      status: "ja",
      fromPlan: "premium",
      note: "Angebote, Verträge und E-Signaturen",
    },
    prognosen: { status: "ja", fromPlan: "growth" },
    automatisierung: { status: "ja", fromPlan: "growth" },
    berichte: { status: "ja", note: "KI-gestützte Berichte ab Lite" },
    app: { status: "ja" },
    api: { status: "ja" },
  }),
  integrations: ["microsoft-365", "google-workspace", "slack", "zapier"],
  compliance: {
    serverLocation: "EU",
    serverNote:
      "Rechenzentren in der EU (AWS Frankfurt und Dublin) für Kunden aus der EU",
    avv: "unbekannt",
    certifications: ["ISO_27001", "SOC_2"],
    certificationNote:
      "ISO 27001:2022 und ISO 27701 sowie SOC 2 laut Trust Center. Pipedrive Inc. ist unter dem EU-US Data Privacy Framework zertifiziert.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Pipedrive Trust Center",
      url: "https://trustcenter.pipedrive.com/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de", "en"],
    channels: [],
    onboarding: "unbekannt",
    note: "Telefon-Support in Ultimate",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 80,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen:
      "Starke Pipeline; E-Mail-Sync und Automatisierung erst ab Growth.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 14 € pro Nutzer bei jährlicher Zahlung, ohne Grundgebühr.",
    datenschutz: "Hosting in der EU, ISO 27001 und SOC 2; US-Mutterkonzern.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Über 500 Integrationen im Marketplace, offene API.",
  },
  pros: [
    {
      title: "Fokus auf die Pipeline",
      detail: "Deals lassen sich visuell durch die Phasen ziehen.",
    },
    {
      title: "Transparente Euro-Preise",
      detail: "Alle vier Tarife mit Preis pro Nutzer auf der Website.",
    },
  ],
  cons: [
    {
      title: "E-Mail-Sync nicht in Lite",
      detail: "Postfach-Anbindung und Automatisierung gibt es ab Growth.",
    },
    {
      title: "Angebote erst in Premium",
      detail: "Angebote und Verträge kosten 49 € pro Nutzer bei Jahreszahlung.",
    },
  ],
  verdict: {
    short:
      "Pipedrive ist ein schlankes Vertriebs-CRM mit klarer Pipeline und fairen Einstiegspreisen. Für die meisten Teams ist Growth der sinnvolle Tarif, weil erst dort E-Mail-Sync und Automatisierung enthalten sind.",
    idealFor: [
      "Vertriebsteams mit klarem Deal-Prozess",
      "KMU, die schnell starten wollen",
    ],
    notIdealFor: [
      "Unternehmen, die Marketing und Service im selben System brauchen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite und des Trust Centers (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    { name: "Pipedrive", url: source, accessedAt: checked },
    {
      name: "Pipedrive Trust Center",
      url: "https://trustcenter.pipedrive.com/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Tarife und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
