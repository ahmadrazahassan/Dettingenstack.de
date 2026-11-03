import type { ToolInput } from "@/lib/schema";
import { erpFeatures } from "./_erp";
import { analyse, checkedPm as checked } from "./_pm";

const source = "https://www.sap.com/germany/products/erp/business-one.html";

export const sapBusinessOne = {
  slug: "sap-business-one",
  name: "SAP Business One",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "SAP SE",
    hq: "Walldorf",
    countryCode: "DE",
    website: "https://www.sap.com/germany/",
  },
  logo: null,
  categories: { primary: "erp-software", secondary: [] },
  tagline:
    "ERP von SAP für kleine und mittelständische Unternehmen, vertrieben über Partner",
  bestFor: "Mittelständler, die auf SAP setzen wollen",
  companySizes: ["klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "SAP veröffentlicht für Business One keine Listenpreise; Lizenzen und Einführung laufen über SAP-Partner.",
    plans: [
      {
        id: "angebot",
        name: "SAP Business One",
        model: { type: "quote" },
        features: ["einkauf", "produktion", "fibu"],
        highlights: [
          "Für KMU konzipiert",
          "Über SAP-Partner",
          "Cloud oder lokal je nach Partner",
        ],
        recommended: true,
      },
    ],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
  },
  trial: { available: "ja" },
  freePlan: "nein",
  features: erpFeatures({
    einkauf: { status: "ja" },
    produktion: { status: "ja" },
    fibu: { status: "ja" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    serverNote: "Betrieb je nach Partner in der Cloud oder lokal",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "unbekannt",
    source: { name: "SAP", url: source, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: [],
    onboarding: "kostenpflichtig",
    note: "Über SAP-Partner",
  },
  platforms: ["windows", "web"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 55,
    datenschutz: 70,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "Vollständiges ERP für KMU mit Finanzen, Einkauf und Produktion.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Keine Listenpreise; Kosten hängen vom Partnerangebot ab.",
    datenschutz: "Deutscher Hersteller; Hosting abhängig vom Partner.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Großes Partner- und Add-on-Ökosystem.",
  },
  pros: [
    {
      title: "SAP-Standard",
      detail: "Wächst bei Bedarf in Richtung SAP S/4HANA.",
    },
    {
      title: "Großes Partnernetz",
      detail: "Viele Branchenlösungen von Partnern.",
    },
  ],
  cons: [
    {
      title: "Keine Listenpreise",
      detail: "Der Preis entsteht erst im Partnerangebot.",
    },
    { title: "Einführung aufwendig", detail: "Ohne Partner kaum umsetzbar." },
  ],
  verdict: {
    short:
      "SAP Business One ist das KMU-ERP von SAP und passt zu Mittelständlern, die einen etablierten Standard mit Partnerbetreuung wollen. Für den Preisvergleich brauchst du mehrere Partnerangebote.",
    idealFor: [
      "Mittelständler mit Wachstum in Richtung SAP",
      "Tochtergesellschaften von SAP-Konzernen",
    ],
    notIdealFor: ["Kleinstbetriebe mit kleinem Budget"],
  },
  review: analyse("der Produktseite des Anbieters"),
  sources: [{ name: "SAP", url: source, accessedAt: checked }],
  changelog: [{ date: checked, note: "Produktangaben erstmals erfasst." }],
} satisfies ToolInput;
