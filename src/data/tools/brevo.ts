import type { ToolInput } from "@/lib/schema";
import { entryPackage, newsletterFeatures } from "./_newsletter";
import { analyse, checkedPm as checked } from "./_pm";

const core = ["editor", "vorlagen", "berichte", "transaktional", "api"];
const source = "https://www.brevo.com/de/pricing/";

export const brevo = {
  slug: "brevo",
  name: "Brevo",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Sendinblue SAS (Brevo)",
    hq: "Paris",
    countryCode: "FR",
    website: "https://www.brevo.com/de/",
  },
  logo: null,
  categories: { primary: "newsletter-software", secondary: [] },
  tagline:
    "E-Mail-, SMS- und WhatsApp-Marketing mit Preisen nach Versandvolumen",
  bestFor: "KMU mit großen Listen, aber wenig Versand",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise nach E-Mails pro Monat, nicht nach Kontakten; Starter gilt ab 5.000 E-Mails pro Monat. Euro-Preise aus den strukturierten Angebotsdaten der Preisseite: monatlich Starter 7 €, Standard 15 €, Professional 499 €; jährlich 75,96 €, 162 € bzw. 5.388,96 € pro Jahr. Enterprise auf Anfrage. Kostenlos bis 300 E-Mails pro Tag.",
    plans: [
      {
        id: "free",
        name: "Kostenlos",
        model: { type: "free", limits: "Bis zu 300 E-Mails pro Tag" },
        features: core,
        highlights: ["300 E-Mails pro Tag", "Kostenloser Start"],
      },
      {
        id: "starter",
        name: "Starter",
        model: entryPackage(700, 633),
        features: core,
        highlights: ["Ab 5.000 E-Mails pro Monat", "Ohne Brevo-Logo"],
        limits: ["Preis für 5.000 E-Mails pro Monat"],
        recommended: true,
      },
      {
        id: "standard",
        name: "Standard",
        model: entryPackage(1500, 1350),
        features: [...core, "automatisierung"],
        highlights: ["Mehr Automatisierung", "Für wachsende Listen"],
        limits: ["Kleinste Versandstufe"],
      },
      {
        id: "professional",
        name: "Professional",
        model: entryPackage(49900, 44908),
        features: [...core, "automatisierung"],
        highlights: ["Für große Marketingteams"],
        limits: ["Kleinste Versandstufe"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: { type: "quote" },
        features: [...core, "automatisierung"],
        highlights: ["Individuelle Volumen und Verträge"],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "starter",
        price: { monthly: 700, annualPerMonth: 633 },
      },
      {
        date: checked,
        planId: "standard",
        price: { monthly: 1500, annualPerMonth: 1350 },
      },
      {
        date: checked,
        planId: "professional",
        price: { monthly: 49900, annualPerMonth: 44908 },
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "ja",
  features: newsletterFeatures({
    editor: { status: "ja" },
    vorlagen: { status: "ja" },
    automatisierung: { status: "ja", fromPlan: "standard" },
    transaktional: { status: "ja" },
    berichte: { status: "ja" },
    api: { status: "ja" },
  }),
  integrations: ["zapier"],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Brevo", url: source, accessedAt: checked },
  },
  support: {
    languages: ["de", "en", "fr"],
    channels: [],
    onboarding: "unbekannt",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 85,
    datenschutz: 75,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "E-Mail, SMS, WhatsApp und Transaktionsmails auf einer Plattform.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Ab 7 € im Monat; Abrechnung nach Versand statt Kontakten.",
    datenschutz: "Europäischer Anbieter; Serverstandort nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "API und gängige Integrationen.",
  },
  pros: [
    {
      title: "Preis nach Versand",
      detail: "Große Listen kosten nicht automatisch mehr.",
    },
    {
      title: "Günstiger Einstieg",
      detail: "Starter ab 7 € im Monat, Gratis-Tarif mit 300 E-Mails pro Tag.",
    },
  ],
  cons: [
    {
      title: "Tageslimit im Gratis-Tarif",
      detail: "Größere Aussendungen brauchen einen Bezahltarif.",
    },
    {
      title: "Großer Preissprung",
      detail:
        "Von Standard zu Professional steigt der Preis auf 499 € im Monat.",
    },
  ],
  verdict: {
    short:
      "Brevo lohnt sich für Unternehmen mit großen Kontaktlisten, die nicht täglich versenden, weil nach Volumen statt nach Kontakten abgerechnet wird. Dazu kommen SMS, WhatsApp und Transaktionsmails.",
    idealFor: ["KMU mit großen Listen", "Shops mit Transaktionsmails"],
    notIdealFor: ["Teams mit sehr hohem täglichem Versand im Gratis-Tarif"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Brevo", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Euro-Preise, Gratis-Limit und Tarife erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
