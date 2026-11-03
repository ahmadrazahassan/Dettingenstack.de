import type { ToolInput } from "@/lib/schema";
import { newsletterFeatures } from "./_newsletter";
import { analyse, checkedPm as checked, usdNote } from "./_pm";

const core = [
  "editor",
  "vorlagen",
  "automatisierung",
  "landingpages",
  "berichte",
];
const source = "https://www.getresponse.com/de/pricing";

export const getresponse = {
  slug: "getresponse",
  name: "GetResponse",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "GetResponse S.A.",
    hq: "Danzig",
    countryCode: "PL",
    website: "https://www.getresponse.com/de",
  },
  logo: null,
  categories: { primary: "newsletter-software", secondary: [] },
  tagline: "E-Mail-Marketing mit Landingpages, Webinaren und Automatisierung",
  bestFor: "Online-Marketer, Coaches und Kursanbieter",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: `${usdNote()} Jahresverträge 18 % günstiger. Enterprise auf Anfrage.`,
    plans: [
      {
        id: "free",
        name: "Kostenloses Konto",
        model: {
          type: "free",
          limits:
            "Nach dem Test: GetResponse-Branding, Webinare bis 10 Personen, Landingpages bis 1.000 Besuche",
        },
        features: core,
        highlights: ["Nach 14 Tagen Test", "Mit GetResponse-Branding"],
      },
      {
        id: "starter",
        name: "Starter",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: core,
        highlights: ["1.000 Kontakte", "Newsletter und Landingpages"],
      },
      {
        id: "marketer",
        name: "Marketer",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: core,
        highlights: ["Erweiterte Automatisierung"],
        recommended: true,
      },
      {
        id: "creator",
        name: "Creator",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: core,
        highlights: ["Für Kurs- und Webinaranbieter"],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
  },
  trial: { available: "ja", days: 14 },
  freePlan: "ja",
  features: newsletterFeatures({
    editor: { status: "ja" },
    vorlagen: { status: "ja" },
    automatisierung: { status: "ja" },
    landingpages: { status: "ja", note: "Gratis-Konto bis 1.000 Besuche" },
    berichte: { status: "ja" },
  }),
  integrations: ["zapier"],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "GetResponse", url: source, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 65,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen: "Newsletter, Landingpages, Webinare und Automatisierung.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Preise nur in US-Dollar sichtbar.",
    datenschutz: "Europäischer Anbieter; Serverstandort nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Gängige Integrationen.",
  },
  pros: [
    {
      title: "Webinare inklusive",
      detail: "Newsletter, Landingpages und Webinare in einem Tool.",
    },
    {
      title: "Europäischer Anbieter",
      detail: "Unternehmen mit Sitz in Polen.",
    },
  ],
  cons: [
    {
      title: "Keine Euro-Preise sichtbar",
      detail: "Die Preisseite zeigte uns nur US-Dollar.",
    },
    {
      title: "Gratis-Konto eingeschränkt",
      detail: "Mit Branding und kleinen Limits.",
    },
  ],
  verdict: {
    short:
      "GetResponse passt zu Marketern, die Newsletter, Landingpages und Webinare verbinden wollen. Für reine Newsletter sind deutsche Anbieter oft einfacher und transparenter bepreist.",
    idealFor: ["Coaches und Kursanbieter", "Online-Marketing mit Funnels"],
    notIdealFor: ["Unternehmen, die nur Newsletter versenden"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "GetResponse", url: source, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Tarife und Dollarpreise erstmals erfasst." },
  ],
} satisfies ToolInput;
