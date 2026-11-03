import type { ToolInput } from "@/lib/schema";
import { hrFeatures } from "./_hr";
import { analyse, checkedPm as checked, usdNote } from "./_pm";

/* ───── Deel: globale HR-Plattform mit Payroll, EOR und HR ───── */

const deelPricing = "https://www.deel.com/de/pricing/";
const deelHr = "https://www.deel.com/de/hr/";
const deelBase = [
  "personalakte",
  "organigramm",
  "abwesenheiten",
  "reports",
  "hinweisgeber",
  "api",
];
const deelPlus = [...deelBase, "feedback", "ziele", "lernen", "umfragen"];

export const deel = {
  slug: "deel",
  name: "Deel",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Deel, Inc.",
    hq: "San Francisco",
    countryCode: "US",
    website: "https://www.deel.com/de/",
  },
  logo: null,
  categories: { primary: "hr-software", secondary: [] },
  tagline:
    "Globale HR-Plattform für HR, Payroll und Einstellung in über 130 Ländern",
  bestFor: "Unternehmen mit Teams und Freelancern in mehreren Ländern",
  companySizes: ["kleinst", "klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: deelPricing,
    note: `${usdNote()} Deel HR gibt es in drei Stufen: Basis (Personalprofile, Organigramme, Urlaub, Workflows, anonyme Meldungen, Analysen), zweite Stufe mit Leistungsmanagement, Zielen, Weiterbildung und Umfragen, dritte Stufe mit Personalplanung und Vergütungsmanagement; Recruiting als Zusatzmodul. Freelancer-Verwaltung, Contractor of Record, EOR und US-PEO werden getrennt pro Person berechnet. Laut FAQ monatlich kündbar ohne langfristige Verträge.`,
    plans: [
      {
        id: "hr-basis",
        name: "Deel HR – Basis",
        model: { type: "quote", note: "Preis nur in US-Dollar angegeben" },
        features: deelBase,
        highlights: [
          "Personalprofile & Organigramme",
          "Urlaubsverwaltung",
          "Workflows & Genehmigungen",
          "Anonyme Meldungen",
          "Personalanalysen",
        ],
        recommended: true,
      },
      {
        id: "hr-talent",
        name: "Deel HR – Stufe 2",
        model: { type: "quote" },
        features: deelPlus,
        highlights: [
          "Alles aus Basis",
          "Leistungsmanagement & Ziele",
          "Weiterbildungen",
          "Umfragen",
        ],
      },
      {
        id: "hr-plan",
        name: "Deel HR – Stufe 3",
        model: { type: "quote" },
        features: deelPlus,
        highlights: [
          "Alles aus Stufe 2",
          "Personalplanung",
          "Vergütungsmanagement",
        ],
      },
      {
        id: "eor",
        name: "Employer of Record (EOR)",
        model: {
          type: "quote",
          note: "Preis pro EOR-Mitarbeitendem in US-Dollar",
        },
        features: ["lohnabrechnung", "onboarding"],
        highlights: [
          "Einstellung in über 130 Ländern ohne eigene Gesellschaft",
          "Verträge, Gehaltsabrechnung, Benefits",
          "Lokale Compliance",
        ],
        excludeFromEntry: ["hr-software"],
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 0,
      noticePeriod: "monatlich kündbar laut FAQ",
      monthlyBilling: "ja",
    },
  },
  trial: { available: "unbekannt" },
  freePlan: "unbekannt",
  features: hrFeatures({
    personalakte: { status: "ja", note: "Personalprofile" },
    organigramm: { status: "ja" },
    abwesenheiten: {
      status: "ja",
      note: "Urlaubsverwaltung nach lokalem Recht",
    },
    bewerbermanagement: {
      status: "addon",
      note: "Recruiting als Zusatzmodul, Bewerbermanagement mit KI",
    },
    onboarding: { status: "ja", note: "Automatisiertes Onboarding" },
    feedback: {
      status: "ja",
      fromPlan: "hr-talent",
      note: "Leistungsmanagement",
    },
    ziele: { status: "ja", fromPlan: "hr-talent" },
    lernen: { status: "ja", fromPlan: "hr-talent", note: "Weiterbildungen" },
    umfragen: { status: "ja", fromPlan: "hr-talent" },
    lohnabrechnung: {
      status: "addon",
      note: "Deel Payroll bzw. EOR, getrennt berechnet",
    },
    reports: { status: "ja", note: "Personalanalysen" },
    hinweisgeber: { status: "ja", note: "Anonyme Meldungen" },
    api: { status: "ja", note: "Deel API" },
  }),
  integrations: ["google-workspace"],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Deel", url: deelPricing, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 60,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "HR, Payroll und Einstellung in vielen Ländern auf einer Plattform.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Preise nur in US-Dollar sichtbar.",
    datenschutz: "US-Anbieter; Serverstandort nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Deel API, Google Workspace, LinkedIn.",
  },
  pros: [
    {
      title: "International",
      detail:
        "Einstellung und Gehaltsabrechnung in vielen Ländern ohne eigene Gesellschaft.",
    },
    {
      title: "Monatlich kündbar",
      detail: "Laut FAQ keine langfristigen Verträge.",
    },
  ],
  cons: [
    {
      title: "Keine Euro-Preise sichtbar",
      detail: "Die Preisseite zeigte uns nur US-Dollar.",
    },
    {
      title: "Für rein deutsche Teams überdimensioniert",
      detail: "Die Stärke liegt in internationalen Teams.",
    },
  ],
  verdict: {
    short:
      "Deel lohnt sich vor allem für Unternehmen mit Mitarbeitenden und Freelancern in mehreren Ländern. Für ein rein deutsches Team sind Personio, HR WORKS oder Sage HR & Payroll naheliegender.",
    idealFor: [
      "Remote-Teams über Ländergrenzen",
      "Unternehmen ohne eigene Auslandsgesellschaft",
    ],
    notIdealFor: ["Rein deutsche Kleinbetriebe"],
  },
  review: analyse("der Preis- und HR-Seiten des Anbieters"),
  sources: [
    { name: "Deel", url: deelPricing, accessedAt: checked },
    { name: "Deel", url: deelHr, accessedAt: checked },
  ],
  changelog: [
    {
      date: checked,
      note: "Module, Stufen und Vertragsangaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;

/* ───── Workday HCM: Enterprise-HCM ───── */

const workdaySource =
  "https://www.workday.com/de-de/products/human-capital-management/overview.html";

export const workdayHcm = {
  slug: "workday-hcm",
  name: "Workday HCM",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Workday, Inc.",
    hq: "Pleasanton, Kalifornien",
    countryCode: "US",
    website: "https://www.workday.com/de-de/homepage.html",
  },
  logo: null,
  categories: { primary: "hr-software", secondary: [] },
  tagline:
    "Enterprise-HCM für Personal, Entgelt, Talent, Workforce Management und Personalplanung",
  bestFor: "Große Unternehmen und Konzerne",
  companySizes: ["gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: workdaySource,
    note: "Workday veröffentlicht keine Preise; Angebote auf Anfrage.",
    plans: [
      {
        id: "angebot",
        name: "Workday HCM",
        model: { type: "quote" },
        features: [
          "personalakte",
          "lohnabrechnung",
          "zeiterfassung",
          "umfragen",
          "reports",
          "self-service",
        ],
        highlights: [
          "Personalmanagement & Entgeltabrechnung",
          "Workforce Management & Zeiterfassung",
          "Talentmanagement & Skills Cloud",
          "Mitarbeiterbefragungen",
          "Personalplanung & Analysen",
        ],
        recommended: true,
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: hrFeatures({
    personalakte: { status: "ja", note: "Personalmanagement" },
    zeiterfassung: { status: "ja", note: "Workforce Management, Zeitplanung" },
    lohnabrechnung: { status: "ja", note: "Entgeltabrechnung" },
    lernen: { status: "unbekannt" },
    umfragen: { status: "ja", note: "Mitarbeiterbefragungen" },
    "self-service": {
      status: "ja",
      note: "Mitarbeiter-Experience, Manager-Hub",
    },
    reports: { status: "ja", note: "Reporting, Analysen, Personalplanung" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Workday", url: workdaySource, accessedAt: checked },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 90,
    bedienbarkeit: 70,
    preisLeistung: 55,
    datenschutz: 65,
    support: 70,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "Vollständiges HCM von Entgelt bis Personalplanung; Details nicht geprüft.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Keine veröffentlichten Preise.",
    datenschutz: "US-Anbieter; Hosting nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen nicht im Detail geprüft.",
  },
  pros: [
    {
      title: "Sehr umfassend",
      detail: "Personal, Entgelt, Workforce und Talent auf einer Plattform.",
    },
    {
      title: "Personalplanung",
      detail: "Kompetenzbasierte Planung und Analysen für große Belegschaften.",
    },
  ],
  cons: [
    { title: "Keine Preise", detail: "Kosten nur im Angebot." },
    {
      title: "Für den Mittelstand zu groß",
      detail: "Ausgerichtet auf Großunternehmen mit Einführungsprojekt.",
    },
  ],
  verdict: {
    short:
      "Workday HCM ist eine der großen HCM-Suiten für Konzerne mit Entgelt, Workforce- und Talentmanagement. Für KMU sind spezialisierte Lösungen schneller eingeführt und günstiger.",
    idealFor: [
      "Konzerne mit internationaler Belegschaft",
      "HR mit Personalplanung",
    ],
    notIdealFor: ["Kleine und mittlere Unternehmen"],
  },
  review: analyse("der Produktseite des Anbieters"),
  sources: [{ name: "Workday", url: workdaySource, accessedAt: checked }],
  changelog: [{ date: checked, note: "Produktangaben erstmals erfasst." }],
} satisfies ToolInput;

/* ───── SAP SuccessFactors: HCM aus der SAP-Cloud ───── */

const sfSource = "https://www.sap.com/germany/products/hcm.html";

export const sapSuccessFactors = {
  slug: "sap-successfactors",
  name: "SAP SuccessFactors",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "SAP SE",
    hq: "Walldorf",
    countryCode: "DE",
    website: "https://www.sap.com/germany/",
  },
  logo: null,
  categories: { primary: "hr-software", secondary: [] },
  tagline:
    "HCM aus der SAP-Cloud: HR-Kernfunktionen, Abrechnung, Talent und Workforce Management",
  bestFor: "Mittelstand mit SAP-Umfeld und Konzerne",
  companySizes: ["mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: sfSource,
    note: "SAP nennt keine Listenpreise auf der Produktseite. Laut FAQ wird das Base-Paket pro Anwender in Blöcken zu 1 verkauft (Mindestbestellmenge 1 Anwender), das Premiumpaket erst ab 500 Anwendern. Für den Mittelstand gibt es SAP GROW for HCM mit HR, Zeiterfassung und Abrechnung.",
    plans: [
      {
        id: "base",
        name: "SAP HCM Base",
        model: { type: "quote", minUnits: 1 },
        features: ["personalakte", "zeiterfassung", "lohnabrechnung"],
        highlights: [
          "HR-Kernfunktionen und Personalabrechnung",
          "Ab 1 Anwender",
          "Public Cloud, von SAP betrieben",
        ],
        recommended: true,
      },
      {
        id: "premium",
        name: "SAP HCM Premium",
        model: { type: "quote", minUnits: 500 },
        features: [
          "personalakte",
          "zeiterfassung",
          "lohnabrechnung",
          "bewerbermanagement",
        ],
        highlights: [
          "Talentmanagement",
          "Workforce Management",
          "Mindestens 500 Anwender",
        ],
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
  },
  trial: { available: "ja", days: 30 },
  freePlan: "nein",
  features: hrFeatures({
    personalakte: { status: "ja", note: "HR-Kernfunktionen" },
    zeiterfassung: {
      status: "ja",
      note: "Workforce Management, Zeiterfassung",
    },
    lohnabrechnung: { status: "ja", note: "Personalabrechnung" },
    bewerbermanagement: {
      status: "ja",
      note: "SmartRecruiters für SAP SuccessFactors",
    },
    reports: { status: "ja", note: "Datengestützte HR-Strategie" },
  }),
  integrations: ["sap-hr"],
  compliance: {
    serverLocation: "unbekannt",
    serverNote: "Public-Cloud-SaaS, von SAP gehostet und aktualisiert",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "SAP", url: sfSource, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: [],
    onboarding: "unbekannt",
    note: "30-tägiger Basic Trial auf Englisch",
  },
  platforms: ["web"],
  scores: {
    funktionen: 90,
    bedienbarkeit: 70,
    preisLeistung: 55,
    datenschutz: 70,
    support: 70,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen:
      "HR-Kern, Abrechnung, Talent- und Workforce Management, KI-Assistenten.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Keine Listenpreise; Base-Paket ab 1 Anwender.",
    datenschutz: "Deutscher Hersteller; Rechenzentrum nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Nahtlos mit SAP S/4HANA, aber auch ohne SAP-ERP nutzbar.",
  },
  pros: [
    {
      title: "Auch ohne SAP-ERP",
      detail:
        "Laut SAP unabhängig von S/4HANA nutzbar, aber nahtlos integrierbar.",
    },
    {
      title: "Klein anfangen möglich",
      detail: "Base-Paket ab 1 Anwender, SAP GROW for HCM für den Mittelstand.",
    },
  ],
  cons: [
    { title: "Keine Listenpreise", detail: "Kosten nur im Angebot." },
    {
      title: "Premium ab 500 Anwendern",
      detail: "Der volle Funktionsumfang richtet sich an große Organisationen.",
    },
  ],
  verdict: {
    short:
      "SAP SuccessFactors ist das Cloud-HCM von SAP mit HR-Kern, Abrechnung und Talentmanagement – besonders stark im SAP-Umfeld. Der Einstieg ist laut SAP schon ab einem Anwender möglich.",
    idealFor: ["Unternehmen mit SAP S/4HANA", "Konzerne mit Talentmanagement"],
    notIdealFor: ["Kleinbetriebe ohne HR-Abteilung"],
  },
  review: analyse("der Produktseite und FAQ von SAP"),
  sources: [{ name: "SAP", url: sfSource, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Pakete, Testangebot und Betrieb erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
