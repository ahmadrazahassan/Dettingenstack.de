import type { ToolInput } from "@/lib/schema";
import { erpFeatures } from "./_erp";
import { analyse, checkedPm as checked } from "./_pm";

const core = ["auftraege", "warenwirtschaft", "einkauf", "shop"];
const edition = (monthly: number) =>
  ({
    type: "flat",
    unit: "pauschal",
    price: { monthly, annualPerMonth: null },
    includedUnits: 1,
  }) as const;
const source = "https://www.jtl-software.de/preise";

export const jtlWawi = {
  slug: "jtl-wawi",
  name: "JTL-Wawi",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "JTL-Software-GmbH",
    hq: "Hückelhoven",
    countryCode: "DE",
    website: "https://www.jtl-software.de/",
  },
  logo: null,
  categories: { primary: "erp-software", secondary: [] },
  tagline:
    "Warenwirtschaft für Onlinehändler – kostenlos starten, Editionen nach Auftragszahl",
  bestFor: "Onlinehändler mit Shop und Marktplätzen",
  companySizes: ["solo", "kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Kostenloser Einstieg für bis zu 500 Aufträge pro Monat. Advanced ab 119 €, Pro ab 329 € pro Monat, jeweils mit Supportlevel; weitere Aufträge ab 0,11 € bis 0,22 € je Auftrag. Aufträge aus dem eigenen Shop oder POS sind kostenlos; für Bestellungen über Shopify, Shopware 6 oder Marktplätze werden Auftragspakete berechnet (z. B. 500 Aufträge 79 €, 1.000 Aufträge 129 € pro Monat). Zusatzmodule ab 29 € pro Monat.",
    plans: [
      {
        id: "free",
        name: "Kostenloser Start",
        model: { type: "free", limits: "Bis zu 500 Aufträge pro Monat" },
        features: core,
        highlights: ["Bis 500 Aufträge/Monat", "Ideal zum Testen"],
      },
      {
        id: "advanced",
        name: "JTL Advanced",
        model: edition(11900),
        features: core,
        highlights: ["Supportlevel Bronze", "Ab 0,22 € je weiterem Auftrag"],
        limits: ["Ab-Preis"],
        recommended: true,
      },
      {
        id: "pro",
        name: "JTL Pro",
        model: edition(32900),
        features: core,
        highlights: ["Supportlevel Silber", "Ab 0,16 € je weiterem Auftrag"],
        limits: ["Ab-Preis"],
      },
    ],
    addOns: [
      {
        id: "auftraege-500",
        name: "Auftragspaket 500 (Marktplätze, Shopify, Shopware 6)",
        unit: "pauschal",
        price: { monthly: 7900, annualPerMonth: null },
      },
      {
        id: "pos",
        name: "Android-Kassensystem",
        unit: "pauschal",
        price: { monthly: 2900, annualPerMonth: null },
        note: "pro POS",
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "advanced",
        price: { monthly: 11900, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: 32900, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "ja" },
  freePlan: "ja",
  features: erpFeatures({
    auftraege: { status: "ja" },
    warenwirtschaft: { status: "ja" },
    einkauf: { status: "ja" },
    produktion: {
      status: "addon",
      note: "Dispositionsproduktion als Zusatzmodul (29 € pro Monat)",
    },
    shop: { status: "ja", note: "JTL-Shop, Shopify, Shopware, Amazon, eBay" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "unbekannt",
    source: { name: "JTL-Software", url: source, accessedAt: checked },
  },
  support: {
    languages: ["de"],
    channels: [],
    onboarding: "unbekannt",
    note: "Supportlevel je Edition",
  },
  platforms: ["windows", "web"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 85,
    datenschutz: 70,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen: "Umfassende Warenwirtschaft für den Onlinehandel.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Kostenlos bis 500 Aufträge, danach nach Aufträgen.",
    datenschutz:
      "Deutscher Anbieter; Betriebsmodell und Hosting nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Eigenes Shopsystem, Marktplätze und Kassensysteme.",
  },
  pros: [
    {
      title: "Kostenloser Einstieg",
      detail: "Bis 500 Aufträge pro Monat ohne Lizenzkosten.",
    },
    {
      title: "Großes Ökosystem",
      detail: "JTL-Shop, POS, WMS und viele Servicepartner.",
    },
  ],
  cons: [
    {
      title: "Kosten pro Marktplatzauftrag",
      detail:
        "Bestellungen über Marktplätze und fremde Shops brauchen Auftragspakete.",
    },
    {
      title: "Komplexe Preisstruktur",
      detail: "Editionen, Auftragspakete und Module addieren sich.",
    },
  ],
  verdict: {
    short:
      "JTL-Wawi ist der Klassiker für Onlinehändler in Deutschland: kostenlos starten, mit eigenem Shop und vielen Marktplätzen. Rechne bei Marktplatz-Bestellungen die Auftragspakete mit ein.",
    idealFor: ["Onlinehändler mit JTL-Shop", "Händler mit Amazon und eBay"],
    notIdealFor: ["Dienstleister ohne Warenwirtschaft"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "JTL-Software", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Editionen, Auftragspakete und Module erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
