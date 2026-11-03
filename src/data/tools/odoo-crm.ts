import type { ToolInput } from "@/lib/schema";
import { checkedCrm as checked, crmFeatures } from "./_crm";

const core = [
  "kontakte",
  "pipeline",
  "mehrere-pipelines",
  "aufgaben",
  "email-sync",
  "angebote",
  "berichte",
  "app",
  "api",
];
const source = "https://www.odoo.com/de_DE/pricing";

export const odooCrm = {
  slug: "odoo-crm",
  name: "Odoo",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Odoo S.A.",
    hq: "Grand-Rosière",
    countryCode: "BE",
    website: "https://www.odoo.com/de_DE/app/crm",
  },
  logo: null,
  categories: { primary: "crm-software", secondary: ["erp-software"] },
  tagline:
    "Open-Source-CRM, das mit Verkauf, Rechnungen und Lager zum ERP wächst",
  bestFor: "Unternehmen, die CRM und ERP aus einer Hand wollen",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "„One App Free“: eine einzelne App, etwa CRM, kostenlos mit unbegrenzten Nutzern auf Odoo Online. Die Euro-Preise für Standard und Custom zeigt Odoo je nach Land und Laufzeit an; wir konnten sie nicht verlässlich auslesen und führen sie als „auf Anfrage“. Die Community-Edition ist Open Source und selbst gehostet kostenlos.",
    plans: [
      {
        id: "one-app-free",
        name: "One App Free",
        model: {
          type: "free",
          limits: "Eine App (z. B. CRM), unbegrenzte Nutzer, nur Odoo Online",
        },
        features: core,
        highlights: ["Unbegrenzte Nutzer", "Nur eine App", "Odoo Online"],
      },
      {
        id: "standard",
        name: "Standard / Custom",
        model: {
          type: "quote",
          note: "Preis pro Nutzer auf der Odoo-Preisseite",
        },
        features: [...core, "automatisierung"],
        highlights: [
          "Alle Apps",
          "Standard: Odoo Online",
          "Custom: Studio, API, Odoo.sh oder eigener Server",
        ],
        recommended: true,
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [],
  },
  trial: { available: "ja" },
  freePlan: "ja",
  features: crmFeatures({
    kontakte: { status: "ja" },
    pipeline: { status: "ja", note: "Kanban-Pipeline" },
    "mehrere-pipelines": { status: "ja", note: "Über Vertriebsteams" },
    aufgaben: { status: "ja", note: "Aktivitäten und Wiedervorlagen" },
    "email-sync": { status: "ja" },
    angebote: {
      status: "ja",
      note: "Mit der App Verkauf; im Free-Tarif nur eine App",
    },
    berichte: { status: "ja" },
    app: { status: "ja" },
    api: {
      status: "teilweise",
      note: "Externe API laut Preisseite im Custom-Tarif",
    },
  }),
  integrations: ["microsoft-365", "google-workspace"],
  compliance: {
    serverLocation: "EU",
    serverNote:
      "Produktivdaten für EU-Kunden in Frankreich und Belgien, Backups in Frankreich, den Niederlanden und Schweden (Google Cloud, OVH)",
    avv: "unbekannt",
    certifications: ["ISO_27001"],
    certificationNote: "Odoo gibt eine Zertifizierung nach ISO 27001:2022 an.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: {
      name: "Odoo",
      url: "https://www.odoo.com/privacy",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de", "en", "fr"],
    channels: [],
    onboarding: "unbekannt",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 80,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "CRM mit Angeboten über die Verkaufs-App, ausbaubar bis zum ERP.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "CRM allein kostenlos; Preise für mehrere Apps nicht verifiziert.",
    datenschutz: "Hosting in der EU, ISO 27001:2022, selbst hostbar.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Tausende Community-Module, API im Custom-Tarif.",
  },
  pros: [
    {
      title: "CRM kostenlos",
      detail: "Als einzige App mit unbegrenzten Nutzern ohne Kosten.",
    },
    {
      title: "Wächst zum ERP",
      detail: "Verkauf, Rechnungen, Lager und Projekte im selben System.",
    },
  ],
  cons: [
    {
      title: "Kostenlos nur mit einer App",
      detail:
        "Sobald Verkauf oder Rechnungen dazukommen, wird es kostenpflichtig.",
    },
    {
      title: "Anpassungen kosten",
      detail: "Studio und externe API erst im Custom-Tarif.",
    },
  ],
  verdict: {
    short:
      "Odoo CRM lohnt sich, wenn du später Angebote, Rechnungen und Lager im selben System haben willst. Allein ist das CRM kostenlos; mit weiteren Apps solltest du die Preise direkt bei Odoo rechnen.",
    idealFor: [
      "KMU, die mit dem CRM in ein ERP wachsen wollen",
      "Teams mit eigener IT, die selbst hosten",
    ],
    notIdealFor: ["Teams, die nur ein schlankes Vertriebs-CRM suchen"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Datenschutzseiten des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    { name: "Odoo", url: source, accessedAt: checked },
    { name: "Odoo", url: "https://www.odoo.com/privacy", accessedAt: checked },
  ],
  changelog: [
    {
      date: checked,
      note: "Free-Tarif, Hosting und Zertifizierung erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
