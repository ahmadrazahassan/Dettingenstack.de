import type { ToolInput } from "@/lib/schema";
import { entryPackage, newsletterFeatures } from "./_newsletter";
import { analyse, checkedPm as checked } from "./_pm";

const lite = [
  "editor",
  "vorlagen",
  "automatisierung",
  "berichte",
  "landingpages",
];
const pro = [...lite, "ab-tests"];
const source = "https://www.cleverreach.com/de-de/preise/";

export const cleverreach = {
  slug: "cleverreach",
  name: "CleverReach",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "CleverReach GmbH & Co. KG",
    hq: "Rastede",
    countryCode: "DE",
    website: "https://www.cleverreach.com/de-de/",
  },
  logo: null,
  categories: { primary: "newsletter-software", secondary: [] },
  tagline:
    "E-Mail-Marketing „made in Germany“ – mit Gratis-Tarif für 250 Empfänger",
  bestFor: "KMU, die rechtssicher und unkompliziert versenden wollen",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise pro Monat zzgl. USt., nur für Unternehmen. Der Preis steigt mit der Zahl der Empfänger; die Preisseite zeigt Basic und Pro bei 500 Empfängern. Zu den Empfängergrenzen widersprechen sich Tarifkarten und Vergleichstabelle. Jährliche Vorauszahlung 10 % günstiger. Zusatzleistungen: Premium-Support 22,95 € pro Monat, Onboarding-Call 29 €, Design-/Spamtest 5 €, Barrierefreiheitstest 3 €.",
    plans: [
      {
        id: "lite",
        name: "Lite",
        model: {
          type: "free",
          limits: "250 Empfänger, 1.000 E-Mails pro Monat",
        },
        features: lite,
        highlights: [
          "Dauerhaft kostenlos",
          "250 Empfänger",
          "1 Automatisierung",
          "3 Landingpages",
        ],
      },
      {
        id: "basic",
        name: "Basic",
        model: entryPackage(1500, null),
        features: lite,
        highlights: [
          "Unbegrenzte E-Mails",
          "Ohne Werbung im Newsletter",
          "KI-Textgenerator",
          "Unbegrenzte Formulare",
        ],
        limits: ["Preis für 500 Empfänger"],
      },
      {
        id: "pro",
        name: "Pro",
        model: entryPackage(1800, null),
        features: pro,
        highlights: [
          "A/B-Tests",
          "Zeitversetzter Versand",
          "Unbegrenzte Automatisierungen",
          "Klick-Heatmap",
        ],
        limits: ["Preis für 500 Empfänger"],
        recommended: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: entryPackage(49900, null),
        features: pro,
        highlights: [
          "250.000 E-Mails pro Monat",
          "Unbegrenzte Empfänger",
          "Premium-Support & SLA",
          "Dedizierte IP auf Anfrage",
        ],
        limits: ["Ab-Preis"],
      },
    ],
    addOns: [
      {
        id: "support",
        name: "Premium-Support",
        unit: "pauschal",
        price: { monthly: 2295, annualPerMonth: null },
      },
    ],
    oneTimeFees: [
      {
        label: "Persönlicher Onboarding-Call",
        amount: 2900,
        note: "pro Termin",
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "basic",
        price: { monthly: 1500, annualPerMonth: null },
        note: "500 Empfänger",
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: 1800, annualPerMonth: null },
        note: "500 Empfänger",
      },
    ],
  },
  trial: { available: "ja", days: 30 },
  freePlan: "ja",
  features: newsletterFeatures({
    editor: { status: "ja", note: "Drag & Drop" },
    vorlagen: { status: "ja" },
    landingpages: {
      status: "ja",
      note: "Lite: 3 Landingpages, Formulare unbegrenzt ab Basic",
    },
    automatisierung: {
      status: "ja",
      note: "Lite: eine Strecke, unbegrenzt ab Pro",
    },
    "ab-tests": { status: "ja", fromPlan: "pro" },
    berichte: { status: "ja", note: "Erweiterte Statistiken ab Basic" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "EU",
    serverNote:
      "Laut Preisseite sichere Serverstandorte in der EU, ohne genauen Ort",
    avv: "unbekannt",
    certifications: [],
    certificationNote:
      "Die Seite zeigt Siegel wie CSA und eco; deren Kriterien erklärt sie nicht.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "CleverReach", url: source, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: [],
    onboarding: "kostenpflichtig",
    note: "Premium-Support 22,95 € pro Monat",
  },
  platforms: ["web"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 85,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen: "Editor, Automatisierung und A/B-Tests ab Pro.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Gratis bis 250 Empfänger, ab 15 € für 500 Empfänger.",
    datenschutz: "Deutscher Anbieter, Server in der EU.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen auf der Preisseite nicht im Detail genannt.",
  },
  pros: [
    {
      title: "Deutscher Anbieter",
      detail: "Server in der EU, Angebote nur für Unternehmen.",
    },
    {
      title: "Gratis-Tarif",
      detail: "250 Empfänger und 1.000 E-Mails pro Monat ohne Kosten.",
    },
  ],
  cons: [
    {
      title: "Unklare Empfängergrenzen",
      detail: "Tarifkarten und Tabelle nennen unterschiedliche Grenzen.",
    },
    {
      title: "Tests kosten extra",
      detail:
        "Design-, Spam- und Barrierefreiheitstests werden einzeln berechnet.",
    },
  ],
  verdict: {
    short:
      "CleverReach ist ein solides deutsches Newsletter-Tool mit Gratis-Einstieg und fairen Paketpreisen. Kläre vor dem Kauf, wie viele Empfänger dein Tarif genau abdeckt.",
    idealFor: ["KMU mit Fokus auf DSGVO", "Einsteiger mit kleinen Listen"],
    notIdealFor: ["E-Commerce mit komplexen Kaufstrecken"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "CleverReach", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Tarife, Einstiegspreise und Zusatzleistungen erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
