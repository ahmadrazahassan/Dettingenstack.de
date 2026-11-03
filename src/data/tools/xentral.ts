import type { ToolInput } from "@/lib/schema";
import { erpFeatures } from "./_erp";
import { analyse, checkedPm as checked } from "./_pm";

const core = ["auftraege", "warenwirtschaft", "shop"];
const business = [...core, "api"];
const pro = [...business, "einkauf"];
// Flat monthly price with unlimited users.
const flat = (monthly: number) =>
  ({
    type: "flat",
    unit: "pauschal",
    price: { monthly, annualPerMonth: null },
    includedUnits: 1000,
  }) as const;
const source = "https://xentral.com/de/preise";

export const xentral = {
  slug: "xentral",
  name: "Xentral",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Xentral ERP Software GmbH",
    hq: "Augsburg",
    countryCode: "DE",
    website: "https://xentral.com/de",
  },
  logo: null,
  categories: { primary: "erp-software", secondary: [] },
  tagline: "Cloud-ERP für E-Commerce – Monatspreise ohne Aufpreis pro Nutzer",
  bestFor: "Onlinehändler und D2C-Marken",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Monatspreise pro Konto; Nutzer kosten laut FAQ nichts extra. Launch für bis zu 100 Aufträge pro Monat und 500.000 € Jahresumsatz, jeder Auftrag 0,30 €. Starter mit 500 Aufträgen pro Monat. Scale auf Anfrage. Begleitetes Onboarding als kostenpflichtige Zusatzleistung ohne Preisangabe.",
    plans: [
      {
        id: "launch",
        name: "Launch",
        model: flat(9900),
        features: core,
        highlights: [
          "Bis 100 Aufträge/Monat",
          "0,30 € pro Auftrag",
          "Shop- und Marktplatzanbindung",
          "DATEV",
        ],
        limits: ["Bis 500.000 € Jahresumsatz"],
      },
      {
        id: "starter",
        name: "Starter",
        model: flat(34900),
        features: core,
        highlights: [
          "500 Aufträge/Monat",
          "Unbegrenzte Nutzer",
          "Servicepaket",
        ],
      },
      {
        id: "business",
        name: "Business",
        model: flat(64900),
        features: business,
        highlights: [
          "Automatisierung",
          "Pick & Pack",
          "Retourenportal",
          "API-Zugang",
        ],
        recommended: true,
      },
      {
        id: "pro",
        name: "Pro",
        model: flat(84900),
        features: pro,
        highlights: [
          "Angebote & Mahnwesen",
          "Kostenstellen",
          "SEPA",
          "Bestellvorschläge",
        ],
      },
      {
        id: "scale",
        name: "Scale",
        model: { type: "quote" },
        features: pro,
        highlights: ["Individuelle API-Limits", "Premium-SLA"],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "launch",
        price: { monthly: 9900, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "starter",
        price: { monthly: 34900, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "business",
        price: { monthly: 64900, annualPerMonth: null },
      },
      {
        date: checked,
        planId: "pro",
        price: { monthly: 84900, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: erpFeatures({
    auftraege: { status: "ja", note: "Angebote und Mahnwesen ab Pro" },
    warenwirtschaft: { status: "ja" },
    einkauf: { status: "ja", fromPlan: "pro", note: "Bestellvorschläge" },
    shop: { status: "ja" },
    datev: { status: "ja" },
    api: { status: "ja", fromPlan: "business" },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "DE",
    serverNote: "AWS-Cloud in Frankfurt laut Preisseite",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Xentral", url: source, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: [],
    onboarding: "kostenpflichtig",
  },
  platforms: ["web"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 70,
    datenschutz: 80,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen:
      "Stark für E-Commerce; Produktion und Finanzbuchhaltung nicht belegt.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Keine Nutzerpreise; ab 99 € plus 0,30 € pro Auftrag.",
    datenschutz: "Hosting bei AWS in Frankfurt.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Shops, Marktplätze, Versand, DATEV und API.",
  },
  pros: [
    {
      title: "Keine Kosten pro Nutzer",
      detail: "Unbegrenzte Nutzer ab Starter.",
    },
    {
      title: "Für Onlinehandel gebaut",
      detail: "Shops, Marktplätze und Versand angebunden.",
    },
  ],
  cons: [
    {
      title: "Auftragsgebühren in Launch",
      detail: "0,30 € pro Auftrag im Einstiegstarif.",
    },
    {
      title: "Wenig für Produktion",
      detail: "Fertigung nennt die Preisseite nicht.",
    },
  ],
  verdict: {
    short:
      "Xentral ist eine starke Wahl für Onlinehändler, die Shops, Marktplätze und Versand zentral steuern wollen – ohne Nutzerpreise. Für Produktion oder Dienstleistung passen andere ERPs besser.",
    idealFor: ["Onlinehändler mit mehreren Kanälen", "D2C-Marken im Wachstum"],
    notIdealFor: ["Produzierende Unternehmen"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "Xentral", url: source, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Preise, Auftragsgrenzen und Hosting erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
