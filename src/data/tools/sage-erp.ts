import type { FeatureSupport, ToolInput } from "@/lib/schema";
import { crmFeatures } from "./_crm";
import { erpFeatures } from "./_erp";
import {
  checkedSage as checked,
  sageReview,
  sageSupport,
  sageUrl,
  sageVendor,
} from "./_sage";

type QuoteErp = {
  slug: string;
  name: string;
  path: string;
  tagline: string;
  bestFor: string;
  companySizes: ToolInput["companySizes"];
  note: string;
  plans: { id: string; name: string; highlights: string[] }[];
  features: Record<string, FeatureSupport>;
  onPremise: "ja" | "nein" | "unbekannt";
  serverNote?: string;
  platforms: ToolInput["platforms"];
  scoreNote: string;
  pros: ToolInput["pros"];
  cons: ToolInput["cons"];
  verdict: ToolInput["verdict"];
};

/** Sage ERP products sold by quote: only what the product page states, everything else stays open. */
function sageQuoteErp(v: QuoteErp): ToolInput {
  const source = sageUrl(v.path);
  const yes = Object.entries(v.features)
    .filter(([, f]) => f.status === "ja")
    .map(([id]) => id);
  return {
    slug: v.slug,
    name: v.name,
    status: "published",
    isPlaceholder: false,
    vendor: sageVendor,
    logo: null,
    categories: { primary: "erp-software", secondary: [] },
    tagline: v.tagline,
    bestFor: v.bestFor,
    companySizes: v.companySizes,
    pricing: {
      currency: "EUR",
      checkedAt: checked,
      sourceUrl: source,
      note: v.note,
      plans: v.plans.map((p, i) => ({
        id: p.id,
        name: p.name,
        model: { type: "quote" },
        features: yes,
        highlights: p.highlights,
        recommended: i === 0,
      })),
      contract: {
        minTermMonths: null,
        noticePeriod: null,
        monthlyBilling: "unbekannt",
      },
    },
    trial: { available: "unbekannt" },
    freePlan: "nein",
    features: v.features,
    integrations: [],
    compliance: {
      serverLocation: "unbekannt",
      serverNote: v.serverNote,
      avv: "unbekannt",
      certifications: [],
      sso: "unbekannt",
      twoFactor: "unbekannt",
      onPremise: v.onPremise,
      source: { name: "Sage", url: source, accessedAt: checked },
    },
    support: sageSupport,
    platforms: v.platforms,
    scores: {
      funktionen: 85,
      bedienbarkeit: 70,
      preisLeistung: 60,
      datenschutz: 70,
      support: 70,
      integrationen: 75,
    },
    scoreNotes: {
      funktionen: `${v.scoreNote.charAt(0).toUpperCase()}${v.scoreNote.slice(1)}`,
      bedienbarkeit:
        "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
      preisLeistung: "Keine veröffentlichten Preise; Kosten im Angebot.",
      datenschutz: "Hosting und Zertifikate nicht geprüft.",
      support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
      integrationen: "Integrationen nicht im Detail geprüft.",
    },
    pros: v.pros,
    cons: v.cons,
    verdict: v.verdict,
    review: sageReview(`der Produktseite von ${v.name}`),
    sources: [{ name: "Sage", url: source, accessedAt: checked }],
    changelog: [{ date: checked, note: "Produktangaben erstmals erfasst." }],
  };
}

export const sageX3 = sageQuoteErp({
  slug: "sage-x3",
  name: "Sage X3",
  path: "sage-business-cloud/sage-x3/",
  tagline:
    "ERP für produktbasierte Unternehmen über mehrere Länder, Währungen und Gesellschaften",
  bestFor: "Produzierende und handelnde Unternehmen mit mehreren Standorten",
  companySizes: ["mittel", "gross"],
  note: "Sage veröffentlicht für Sage X3 keine Preise; Angebote nach Demo oder Produkttour. Cloud-First, weitere Bereitstellungsoptionen laut Sage verfügbar.",
  plans: [
    {
      id: "angebot",
      name: "Sage X3",
      highlights: [
        "Distribution, diskrete und Prozessfertigung",
        "Mehrere Länder, Währungen und Gesellschaften",
        "Branchen: Chemie, Lebensmittel & Getränke, Dienstleistungen",
        "Sage Copilot",
      ],
    },
  ],
  features: erpFeatures({
    auftraege: { status: "ja", note: "Distribution" },
    warenwirtschaft: { status: "ja" },
    produktion: { status: "ja", note: "Diskrete und Prozessfertigung" },
    fibu: {
      status: "ja",
      note: "Mehrere Länder, Währungen und Rechtsvorschriften",
    },
  }),
  onPremise: "unbekannt",
  serverNote: "Cloud-First mit weiteren Bereitstellungsoptionen laut Sage",
  platforms: ["web"],
  scoreNote:
    "ERP für Handel und Fertigung über Ländergrenzen; Details nicht geprüft.",
  pros: [
    {
      title: "International",
      detail: "Mehrere Länder, Währungen und Rechtsvorschriften integriert.",
    },
    {
      title: "Branchenstärke",
      detail:
        "Für Fertigung, Chemie sowie Lebensmittel und Getränke ausgelegt.",
    },
  ],
  cons: [
    { title: "Keine Preise", detail: "Kosten nur im Angebot." },
    {
      title: "Projektaufwand",
      detail: "Ein Enterprise-ERP verlangt ein Einführungsprojekt.",
    },
  ],
  verdict: {
    short:
      "Sage X3 ist das ERP von Sage für produktbasierte Unternehmen, die über mehrere Länder und Gesellschaften steuern. Für einen deutschen Mittelständler mit einem Standort reicht oft Sage 100.",
    idealFor: [
      "Hersteller mit internationalen Standorten",
      "Unternehmensgruppen mit mehreren Gesellschaften",
    ],
    notIdealFor: ["Kleinbetriebe"],
  },
});

export const sageOperations = sageQuoteErp({
  slug: "sage-operations",
  name: "Sage Operations",
  path: "sage-business-cloud/sage-operations/",
  tagline:
    "Cloud-natives ERP für Handel und Fertigung – Einkauf, Lager, Produktion und Vertrieb",
  bestFor: "Wachsende Händler und Fertiger ohne eigene Server",
  companySizes: ["klein", "mittel"],
  note: "Zwei Editionen, Distribution und Distribution + Manufacturing; Preise individuell im Angebot.",
  plans: [
    {
      id: "distribution",
      name: "Distribution",
      highlights: [
        "Procure to Pay automatisiert",
        "Quote to Cash durchgängig",
        "Bestände in Echtzeit",
        "Rollenbasierte Dashboards",
      ],
    },
    {
      id: "manufacturing",
      name: "Distribution + Manufacturing",
      highlights: [
        "Mehrstufige Stücklisten",
        "Arbeitspläne & Ressourcen",
        "Fertigungsaufträge planen",
        "Mobile Fertigungsrückmeldungen",
      ],
    },
  ],
  features: erpFeatures({
    auftraege: { status: "ja", note: "Quote to Cash" },
    einkauf: { status: "ja", note: "Procure to Pay" },
    warenwirtschaft: { status: "ja", note: "Bestände in Echtzeit" },
    produktion: {
      status: "teilweise",
      note: "Nur in Distribution + Manufacturing",
    },
  }),
  onPremise: "nein",
  serverNote: "Cloud-native Lösung ohne lokale Server",
  platforms: ["web"],
  scoreNote: "Cloud-ERP für Handel und diskrete Fertigung.",
  pros: [
    { title: "Rein Cloud", detail: "Keine lokalen Server nötig." },
    {
      title: "Zwei klare Editionen",
      detail: "Handel allein oder Handel plus Fertigung.",
    },
  ],
  cons: [
    { title: "Keine Preise", detail: "Kosten nur im Angebot." },
    {
      title: "Keine Prozessfertigung",
      detail: "Für Prozessfertigung nennt Sage das ERP Sage X3.",
    },
  ],
  verdict: {
    short:
      "Sage Operations ist das Cloud-ERP von Sage für Händler und diskrete Fertiger, die ohne eigene Server arbeiten wollen. Preise gibt es nur im Angebot.",
    idealFor: [
      "Wachsende Großhändler",
      "Diskrete Fertiger mit Cloud-Strategie",
    ],
    notIdealFor: ["Dienstleister ohne Lager"],
  },
});

export const sageB7 = sageQuoteErp({
  slug: "sage-b7",
  name: "Sage b7",
  path: "produkte/sage-b7-warenwirtschaftssystem/",
  tagline:
    "Mittelstands-ERP für Handel und Produktion, seit über 30 Jahren am Markt",
  bestFor: "Maschinen- und Anlagenbau, Apparatebau, Fahrzeugbau, Großhandel",
  companySizes: ["mittel", "gross"],
  note: "Sage veröffentlicht für Sage b7 keine Preise; Angebote nach Webinar oder Beratung.",
  plans: [
    {
      id: "angebot",
      name: "Sage b7",
      highlights: [
        "Multisourcing und Konsignationslager",
        "EDI für Lieferscheine, Rechnungen, Bestellungen",
        "Mobile Lagersteuerung",
        "CO₂-Berechnung für Fertigungsprodukte",
      ],
    },
  ],
  features: erpFeatures({
    einkauf: {
      status: "ja",
      note: "Bedarfsoptimierte Beschaffung, Multisourcing",
    },
    warenwirtschaft: { status: "ja", note: "Mobile Lagersteuerung" },
    produktion: { status: "ja" },
    "crm-modul": { status: "addon", note: "Anbindung an CRM-Lösungen" },
  }),
  onPremise: "unbekannt",
  platforms: [],
  scoreNote: "ERP für Handel und Produktion im Mittelstand.",
  pros: [
    {
      title: "Branchenfokus",
      detail: "Maschinenbau, Apparatebau, Fahrzeugbau und Großhandel.",
    },
    {
      title: "Offen für Erweiterungen",
      detail:
        "Office 365, Finanzbuchhaltung, CRM, DMS, MES und eProcurement anbindbar.",
    },
  ],
  cons: [
    { title: "Keine Preise", detail: "Kosten nur im Angebot." },
    {
      title: "Einführungsprojekt",
      detail: "Anpassung über Module und Partnerlösungen.",
    },
  ],
  verdict: {
    short:
      "Sage b7 ist ein etabliertes ERP für produzierende Mittelständler und Großhändler mit EDI und CO₂-Berechnung. Für kleinere Betriebe ist Sage 100 der übliche Einstieg.",
    idealFor: ["Maschinen- und Anlagenbauer", "Großhändler mit EDI"],
    notIdealFor: ["Kleinbetriebe"],
  },
});

export const sageWincarat = sageQuoteErp({
  slug: "sage-wincarat",
  name: "Sage Wincarat",
  path: "produkte/sage-wincarat/",
  tagline: "ERP-Branchenlösung für Kunststoffspritzguss und Metallguss",
  bestFor: "Kunststoffspritz- und Metallgussbetriebe im Mittelstand",
  companySizes: ["klein", "mittel"],
  note: "Sage veröffentlicht für Sage Wincarat keine Preise. Betrieb lokal oder als Cloud-Betrieb durch Sage.",
  plans: [
    {
      id: "angebot",
      name: "Sage Wincarat",
      highlights: [
        "Losgrößenplanung nach Kavität und Zykluszeit",
        "Vorkalkulation mit Werkzeugkosten",
        "Rezepturen und Regeneratanteile",
        "Fakturierung mit kundenspezifischen Preisen",
      ],
    },
  ],
  features: erpFeatures({
    auftraege: { status: "ja", note: "Vertrieb und Fakturierung" },
    produktion: { status: "ja", note: "Spritzguss und Metallguss" },
    warenwirtschaft: { status: "ja", note: "Versand und interne Versorgung" },
  }),
  onPremise: "ja",
  serverNote: "Lokaler Betrieb oder Cloud-Betrieb durch Sage",
  platforms: [],
  scoreNote: "Branchenstandard für Spritz- und Metallguss bereits im Standard.",
  pros: [
    {
      title: "Branchenprozesse im Standard",
      detail:
        "Kavität, Zykluszeit, Werkzeugkosten und Rezepturen ohne Anpassung.",
    },
    {
      title: "Flexibler Betrieb",
      detail: "Lokal oder im Cloud-Betrieb durch Sage.",
    },
  ],
  cons: [
    { title: "Keine Preise", detail: "Kosten nur im Angebot." },
    {
      title: "Sehr spezialisiert",
      detail: "Nur für Spritz- und Metallguss gedacht.",
    },
  ],
  verdict: {
    short:
      "Sage Wincarat ist eine spezialisierte ERP-Lösung für Kunststoffspritz- und Metallgussbetriebe mit Branchenfunktionen im Standard. Außerhalb dieser Branchen passen andere Sage-ERPs besser.",
    idealFor: ["Kunststoffspritzgießer", "Metallgießereien"],
    notIdealFor: ["Unternehmen anderer Branchen"],
  },
});

/* ───── Sage Sales Management: Vertriebs-CRM ───── */

const salesSource = sageUrl("produkte/sage-sales-management/");

export const sageSalesManagement = {
  slug: "sage-sales-management",
  name: "Sage Sales Management",
  status: "published",
  isPlaceholder: false,
  vendor: sageVendor,
  logo: null,
  categories: { primary: "crm-software", secondary: [] },
  tagline:
    "Vertriebs-CRM mit ERP-Anbindung, Teams-App und Sage Copilot – ab 5 Nutzern",
  bestFor: "Vertriebsteams im Mittelstand mit ERP-Anbindung",
  companySizes: ["klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: salesSource,
    note: "Professional: 55 € pro Monat und Nutzer, mindestens 5 Nutzer. Ob netto und mit welcher Laufzeit, nennt die Seite nicht. Grenzen: bis 100.000 Accounts, Kontakte und Opportunities; 5 GB Dateispeicher plus 512 MB pro Nutzer.",
    plans: [
      {
        id: "professional",
        name: "Professional",
        model: {
          type: "per_unit",
          unit: "nutzer",
          price: { monthly: 5500, annualPerMonth: null },
          minUnits: 5,
        },
        features: ["kontakte", "pipeline", "aufgaben", "berichte", "api"],
        highlights: [
          "ERP-Integration",
          "Angebote verwalten",
          "Bis 100.000 Accounts und Kontakte",
          "Microsoft-Teams-App",
          "Sage Copilot mit Visitenkartenscanner",
          "Bis 5 Geschäftseinheiten",
        ],
        limits: ["Mindestens 5 Nutzer"],
        recommended: true,
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [
      {
        date: checked,
        planId: "professional",
        price: { monthly: 5500, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: crmFeatures({
    kontakte: { status: "ja", note: "Bis 100.000 Accounts und Kontakte" },
    pipeline: { status: "ja", note: "Opportunities, auch geolokalisiert" },
    aufgaben: { status: "ja", note: "Kalender und Aufgaben" },
    angebote: { status: "ja", note: "Angebote verwalten und überwachen" },
    berichte: { status: "ja", note: "Individuelle Berichte und Widgets" },
    api: { status: "teilweise", note: "ERP-Integration" },
  }),
  integrations: ["microsoft-teams"],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Sage", url: salesSource, accessedAt: checked },
  },
  support: sageSupport,
  platforms: ["web"],
  scores: {
    funktionen: 75,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 70,
    support: 70,
    integrationen: 75,
  },
  scoreNotes: {
    funktionen:
      "Accounts, Opportunities, Aktivitäten, Ziele und Copilot; E-Mail-Sync nicht geprüft.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "55 € pro Nutzer, mindestens 5 Nutzer.",
    datenschutz: "Hosting nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "ERP-Anbindung und Microsoft-Teams-App.",
  },
  pros: [
    {
      title: "ERP-Anbindung",
      detail: "Für Vertriebsteams, die mit einem ERP arbeiten.",
    },
    {
      title: "Sage Copilot",
      detail:
        "E-Mail-Zusammenfassungen, Sprachbefehle und Visitenkartenscanner.",
    },
  ],
  cons: [
    { title: "Mindestens 5 Nutzer", detail: "Ab 275 € pro Monat." },
    {
      title: "Vertragsdetails offen",
      detail: "Laufzeit und Steuerangabe nennt die Seite nicht.",
    },
  ],
  verdict: {
    short:
      "Sage Sales Management ist ein Vertriebs-CRM für Teams ab fünf Personen, die Opportunities mit ihrem ERP verbinden wollen. Kleine Teams finden bei Pipedrive oder CentralStationCRM günstigere Einstiege.",
    idealFor: [
      "Vertriebsteams mit Sage 100 oder anderem ERP",
      "Außendienst mit geolokalisierten Opportunities",
    ],
    notIdealFor: ["Teams mit weniger als 5 Personen"],
  },
  review: sageReview("der Produktseite von Sage Sales Management"),
  sources: [{ name: "Sage", url: salesSource, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Preis, Mindestnutzer und Funktionen erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
