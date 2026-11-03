import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked } from "./_pm";
import { perShop, shopFeatures } from "./_shop";

const community = ["varianten", "themes", "erweiterungen", "api"];
const rise = [...community, "hosting"];
const evolve = [...rise, "b2b"];
const source = "https://www.shopware.com/de/preise/";

export const shopware = {
  slug: "shopware",
  name: "Shopware",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "shopware AG",
    hq: "Schöppingen",
    countryCode: "DE",
    website: "https://www.shopware.com/de/",
  },
  logo: null,
  categories: { primary: "shopsysteme", secondary: [] },
  tagline:
    "Shopsystem aus dem Münsterland – Open Source oder als Cloud-Edition mit B2B",
  bestFor: "Wachsende Händler und B2B-Shops",
  companySizes: ["klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise pro Monat zzgl. MwSt. Die Bezahleditionen richten sich nach dem Bruttowarenwert (GMV) und weiteren Faktoren. Die Community Edition ist kostenlos; verbundene Shops brauchen eine bezahlte Edition, wenn sie innerhalb von 365 Tagen mehr als 1 Mio. € GMV erzielen. Hosting: SaaS inklusive, PaaS verwaltet oder selbst gehostet.",
    plans: [
      {
        id: "community",
        name: "Community Edition",
        model: {
          type: "free",
          limits: "Open Source, Hosting selbst organisieren, Community-Support",
        },
        features: community,
        highlights: [
          "Open-Source-Kern",
          "Keine Lizenzgebühr",
          "Community-Support",
        ],
      },
      {
        id: "rise",
        name: "Rise",
        model: perShop(60000, null),
        features: rise,
        highlights: [
          "KI-Inhalte",
          "Personalisierung",
          "Retourenmanagement",
          "Support von Shopware",
        ],
        limits: ["Ab-Preis, abhängig vom GMV"],
        recommended: true,
      },
      {
        id: "evolve",
        name: "Evolve",
        model: perShop(240000, null),
        features: evolve,
        highlights: [
          "B2B: Angebote und Freigaben",
          "Erweiterte Suche",
          "Inhalte je Kundengruppe",
        ],
        limits: ["Ab-Preis, über den Vertrieb"],
      },
      {
        id: "beyond",
        name: "Beyond",
        model: { type: "quote" },
        features: evolve,
        highlights: [
          "Kundenspezifische Preise",
          "Mehrlager",
          "24/7-Priority-Support",
        ],
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
        planId: "rise",
        price: { monthly: 60000, annualPerMonth: null },
        note: "ab-Preis",
      },
      {
        date: checked,
        planId: "evolve",
        price: { monthly: 240000, annualPerMonth: null },
        note: "ab-Preis",
      },
    ],
  },
  trial: { available: "ja", days: 30 },
  freePlan: "ja",
  features: shopFeatures({
    hosting: {
      status: "teilweise",
      note: "In der SaaS-Variante inklusive, sonst selbst",
    },
    themes: { status: "ja" },
    erweiterungen: { status: "ja", note: "Shopware Store" },
    varianten: { status: "ja" },
    b2b: { status: "ja", fromPlan: "evolve" },
    api: { status: "ja" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    serverNote: "Abhängig von SaaS, PaaS oder eigenem Hosting",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: { name: "Shopware", url: source, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: ["community"],
    onboarding: "unbekannt",
    note: "Herstellersupport ab Rise",
  },
  platforms: ["web"],
  scores: {
    funktionen: 90,
    bedienbarkeit: 70,
    preisLeistung: 70,
    datenschutz: 75,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen: "Sehr umfangreich, B2B ab Evolve.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Community kostenlos; Rise ab 600 € pro Monat.",
    datenschutz: "Deutscher Hersteller, selbst hostbar.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Großer Store mit Plugins und API.",
  },
  pros: [
    {
      title: "Open Source kostenlos",
      detail: "Community Edition ohne Lizenzgebühr.",
    },
    {
      title: "Stark im B2B",
      detail: "Angebote, Freigaben und Kundengruppen ab Evolve.",
    },
  ],
  cons: [
    {
      title: "Bezahleditionen teuer",
      detail: "Rise ab 600 € pro Monat, abhängig vom Umsatz.",
    },
    {
      title: "Aufwand bei Selbsthosting",
      detail: "Hosting, Updates und Sicherheit liegen bei dir.",
    },
  ],
  verdict: {
    short:
      "Shopware ist das Shopsystem für ambitionierte Händler und B2B in Deutschland: Open Source zum Start, Cloud-Editionen fürs Wachstum. Für kleine Shops ohne Entwickler ist ein Mietshop oft einfacher.",
    idealFor: ["Wachsende Händler mit Agentur", "B2B-Shops mit Kundengruppen"],
    notIdealFor: ["Einsteiger ohne technische Unterstützung"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Shopware", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Editionen, Ab-Preise und GMV-Regel erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
