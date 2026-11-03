import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, pmFeatures } from "./_pm";

const starter = ["aufgaben", "automatisierung", "app"];
const business = [...starter, "kanban", "gantt", "kalender"];
const premium = [...business, "berichte"];
const perUser = (annualPerMonth: number, extra: { maxUnits?: number } = {}) =>
  ({
    type: "per_unit",
    unit: "nutzer",
    price: { monthly: null, annualPerMonth },
    minUnits: 5,
    ...extra,
  }) as const;
const source = "https://www.stackfield.com/de/pricing";

export const stackfield = {
  slug: "stackfield",
  name: "Stackfield",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Stackfield GmbH",
    hq: "München",
    countryCode: "DE",
    website: "https://www.stackfield.com/de",
  },
  logo: null,
  categories: { primary: "projektmanagement-software", secondary: [] },
  tagline:
    "Projekte, Chat und Dokumente – Made & Hosted in Germany, mit BSI C5",
  bestFor: "Teams mit hohen Datenschutzanforderungen",
  companySizes: ["kleinst", "klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise pro Nutzer und Monat, netto zzgl. USt. Die Seite nennt je Tarif einen Preis; die Beschriftung zur Zahlungsweise ist nicht eindeutig, Jahreszahlung spart laut Schalter 17 %. Kleinste Option im Rechner: 5 Nutzer. Starter ist auf 3 Räume und 10 Nutzer begrenzt. Add-ons: KI 3,90 €, Office 2,40 €, Public Sector 2,40 €, Berufsgeheimnisträger 3,90 € pro Nutzer.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        model: perUser(900, { maxUnits: 10 }),
        features: starter,
        highlights: [
          "Max. 3 Räume, 10 Nutzer",
          "Chat, Aufgaben, Projekte",
          "Workflows",
          "6 GB Speicher",
        ],
      },
      {
        id: "business",
        name: "Business",
        model: perUser(1400),
        features: business,
        highlights: [
          "Unbegrenzte Räume",
          "Kanban, Gantt, Kalender",
          "Workflows",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        model: perUser(1800),
        features: premium,
        highlights: [
          "Projektportfolios",
          "Whiteboards & Netzplan",
          "Videokonferenzen",
          "Pflicht-2FA, IP-Whitelist",
        ],
        recommended: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: perUser(2800),
        features: [...premium, "sso", "api"],
        highlights: [
          "Unbegrenzte Unterorganisationen",
          "Single Sign-On",
          "YubiKey-2FA",
          "API-Provisioning",
        ],
      },
    ],
    addOns: [
      {
        id: "ki",
        name: "KI-Add-on",
        unit: "nutzer",
        price: { monthly: null, annualPerMonth: 390 },
      },
      {
        id: "office",
        name: "Office-Add-on",
        unit: "nutzer",
        price: { monthly: null, annualPerMonth: 240 },
        note: "ab Premium",
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "starter",
        price: { monthly: null, annualPerMonth: 900 },
      },
      {
        date: checked,
        planId: "business",
        price: { monthly: null, annualPerMonth: 1400 },
      },
      {
        date: checked,
        planId: "premium",
        price: { monthly: null, annualPerMonth: 1800 },
      },
      {
        date: checked,
        planId: "enterprise",
        price: { monthly: null, annualPerMonth: 2800 },
      },
    ],
  },
  trial: { available: "ja", days: 14, creditCard: false },
  freePlan: "nein",
  features: pmFeatures({
    aufgaben: { status: "ja" },
    kanban: { status: "ja", fromPlan: "business" },
    gantt: { status: "ja", fromPlan: "business" },
    kalender: { status: "ja", fromPlan: "business" },
    automatisierung: { status: "ja", note: "Workflows" },
    berichte: { status: "ja", fromPlan: "premium", note: "Projektportfolios" },
    dokumente: { status: "ja", note: "Dokumente und Chat in Räumen" },
    app: { status: "ja", note: "Mobile und Desktop" },
    api: { status: "ja", fromPlan: "enterprise", note: "API-Provisioning" },
    sso: { status: "ja", fromPlan: "enterprise" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "DE",
    serverNote: "„Made & Hosted in Germany“: Daten auf Servern in Deutschland",
    avv: "unbekannt",
    certifications: ["ISO_27001", "BSI_C5"],
    certificationNote: "Zusätzlich ISO 27017 und 27018 laut Preisseite.",
    sso: "ja",
    twoFactor: "ja",
    onPremise: "ja",
    source: { name: "Stackfield", url: source, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "windows", "macos", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 70,
    datenschutz: 95,
    support: 70,
    integrationen: 55,
  },
  scoreNotes: {
    funktionen: "Projekte, Chat, Dokumente und Konferenzen in einem Tool.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Ab 9 € pro Nutzer, mindestens 5 Nutzer.",
    datenschutz:
      "Hosting in Deutschland, ISO 27001 und BSI C5, Pflicht-2FA ab Premium.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen auf der Preisseite kaum genannt.",
  },
  pros: [
    {
      title: "BSI C5 und ISO 27001",
      detail: "Hohe Sicherheitsstandards, gehostet in Deutschland.",
    },
    {
      title: "Chat inklusive",
      detail: "Teamchat, Aufgaben und Dokumente in einem Werkzeug.",
    },
  ],
  cons: [
    {
      title: "Mindestens 5 Nutzer",
      detail: "Die kleinste Option im Preisrechner sind fünf Nutzer.",
    },
    {
      title: "Kanban erst ab Business",
      detail: "Starter hat keine Board-Ansicht laut Preisseite.",
    },
  ],
  verdict: {
    short:
      "Stackfield ist die Wahl für Teams mit hohen Datenschutzanforderungen, etwa Kanzleien oder öffentliche Stellen: Hosting in Deutschland, BSI C5 und Chat inklusive. Integrationen sind schmaler als bei US-Tools.",
    idealFor: [
      "Kanzleien und Berufsgeheimnisträger",
      "Öffentliche Verwaltung und regulierte Branchen",
    ],
    notIdealFor: ["Teams, die viele externe Integrationen brauchen"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Stackfield", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Preise, Add-ons, Hosting und Zertifikate erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
