import type { ToolInput } from "@/lib/schema";
import { buchhaltungFeatures, checked } from "./_buchhaltung";

const basis = [
  "belegerfassung",
  "belegarchiv",
  "e-rechnung-empfang",
  "freigaben",
  "zahlungen",
  "datev-export",
  "steuerberater-zugang",
];

// Starting prices; the actual price depends on invoice or document volume. Unlimited users and companies.
const plan = (annualPerMonth: number) =>
  ({
    type: "flat",
    unit: "pauschal",
    price: { monthly: null, annualPerMonth },
    includedUnits: 1000,
  }) as const;

export const candis = {
  slug: "candis",
  name: "Candis",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Candis GmbH",
    hq: "Berlin",
    countryCode: "DE",
    website: "https://www.candis.io/",
  },
  logo: null,
  categories: { primary: "buchhaltungssoftware", secondary: [] },
  tagline:
    "Rechnungseingang mit KI, Freigabe-Workflows und direkter Übergabe an DATEV",
  bestFor: "Unternehmen mit vielen Eingangsrechnungen und DATEV-Steuerbüro",
  companySizes: ["klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://candis.io/de/preise",
    note: "„Ab“-Preise pro Monat; der tatsächliche Preis hängt von der Zahl der Rechnungen bzw. Dokumente ab. Laufzeit 12, 24 oder 36 Monate, Kündigung drei Monate vor Ende. Ob netto oder brutto, nennt die Seite nicht. Unbegrenzt Nutzer und Gesellschaften.",
    plans: [
      {
        id: "basis",
        name: "Basis",
        model: plan(38900),
        features: basis,
        highlights: [
          "KI-Rechnungserfassung",
          "Mehrstufige Freigabe-Workflows",
          "DATEV Unternehmen online",
          "SEPA-XML-Export",
        ],
      },
      {
        id: "plus",
        name: "Plus",
        model: plan(59900),
        features: basis,
        highlights: [
          "Alles aus Basis",
          "DATEV Rechnungswesen",
          "Preis nach Dokumentenanzahl",
        ],
        recommended: true,
      },
      {
        id: "max",
        name: "Max",
        model: plan(78900),
        features: basis,
        highlights: ["Alles aus Plus", "Preis nach Dokumentenanzahl"],
      },
    ],
    addOns: [
      {
        id: "karten",
        name: "Candis Visa Firmenkreditkarten",
        unit: "pauschal",
        price: { monthly: null, annualPerMonth: 14900 },
        note: "ab 149 € pro Monat",
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 12,
      noticePeriod: "3 Monate vor Laufzeitende",
      monthlyBilling: "nein",
    },
    history: [
      {
        date: checked,
        planId: "basis",
        price: { monthly: null, annualPerMonth: 38900 },
      },
      {
        date: checked,
        planId: "plus",
        price: { monthly: null, annualPerMonth: 59900 },
      },
      {
        date: checked,
        planId: "max",
        price: { monthly: null, annualPerMonth: 78900 },
      },
    ],
  },
  trial: { available: "ja", days: 30 },
  freePlan: "nein",
  features: buchhaltungFeatures({
    belegerfassung: { status: "ja", note: "KI-gestützte Rechnungserfassung" },
    belegarchiv: {
      status: "ja",
      note: "Laut Anbieter GoBD-konform, Server in Frankfurt",
    },
    "e-rechnung-empfang": {
      status: "ja",
      note: "Laut Anbieter revisionssichere Archivierung von E-Rechnungen",
    },
    buchungen: {
      status: "teilweise",
      note: "Vorkontierung; gebucht wird in DATEV",
    },
    ustva: { status: "nein", note: "Steuermeldungen erfolgen in DATEV" },
    euer: { status: "nein", note: "Abschluss in DATEV" },
    bilanz: { status: "nein", note: "Abschluss in DATEV" },
    zahlungen: { status: "ja", note: "SEPA-XML-Export für Überweisungen" },
    freigaben: {
      status: "ja",
      note: "Individuelle und mehrstufige Freigabe-Workflows",
    },
    "datev-export": {
      status: "ja",
      note: "DATEV Unternehmen online in allen Paketen, DATEV Rechnungswesen ab Plus",
    },
    "steuerberater-zugang": { status: "ja", note: "Unbegrenzt Nutzer" },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "DE",
    serverNote: "Daten auf Servern in Frankfurt am Main",
    avv: "ja",
    certifications: [],
    certificationNote:
      "Candis nennt ISO 27001 teils für sich selbst, teils für den Cloud-Hoster; ein Zertifikat haben wir nicht eingesehen.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Candis",
      url: "https://www.candis.io/en/privacy-policy",
      accessedAt: checked,
    },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 60,
    bedienbarkeit: 70,
    preisLeistung: 50,
    datenschutz: 80,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen:
      "Stark bei Rechnungseingang und Freigaben; keine eigene Buchhaltung mit UStVA oder EÜR.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 389 € im Monat mit mindestens zwölf Monaten Laufzeit – lohnt sich erst bei hohem Rechnungsvolumen.",
    datenschutz: "Server in Frankfurt, AVV; Zertifikat nicht eingesehen.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen:
      "Direkte Anbindung an DATEV Unternehmen online und DATEV Rechnungswesen.",
  },
  pros: [
    {
      title: "Freigabe-Workflows",
      detail:
        "Eingangsrechnungen lassen sich mehrstufig prüfen und freigeben – selten bei Buchhaltungssoftware für kleine Unternehmen.",
    },
    {
      title: "Unbegrenzt Nutzer",
      detail: "Alle Pakete enthalten unbegrenzt Nutzer und Gesellschaften.",
    },
    {
      title: "Direkt in DATEV",
      detail:
        "Übergabe an DATEV Unternehmen online, ab Plus auch an DATEV Rechnungswesen.",
    },
  ],
  cons: [
    {
      title: "Keine eigene Buchhaltung",
      detail: "UStVA, EÜR und Bilanz entstehen in DATEV, nicht in Candis.",
    },
    {
      title: "Hoher Einstiegspreis",
      detail: "Ab 389 € im Monat, abhängig vom Rechnungsvolumen.",
    },
    {
      title: "Lange Bindung",
      detail: "Laufzeit 12, 24 oder 36 Monate, Kündigung drei Monate vor Ende.",
    },
  ],
  verdict: {
    short:
      "Candis ist keine klassische Buchhaltungssoftware, sondern ein Werkzeug für den Rechnungseingang: KI-Erfassung, Freigaben und Übergabe an DATEV. Es lohnt sich für Unternehmen mit vielen Eingangsrechnungen und mehreren Beteiligten.",
    idealFor: [
      "Mittelständische Unternehmen mit vielen Eingangsrechnungen",
      "Teams, in denen mehrere Personen Rechnungen freigeben",
    ],
    notIdealFor: [
      "Selbstständige und kleine Unternehmen, die ihre Buchhaltung selbst machen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Datenschutzseiten des Anbieters (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    { name: "Candis", url: "https://candis.io/de/preise", accessedAt: checked },
    {
      name: "Candis",
      url: "https://www.candis.io/en/privacy-policy",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Einstiegspreise, Pakete und Hosting-Angaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
