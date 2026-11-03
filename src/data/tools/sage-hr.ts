import type { ToolInput } from "@/lib/schema";
import {
  checkedSage as checked,
  hrFeatures,
  sageReview,
  sageSupport,
  sageUrl,
  sageVendor,
} from "./_sage";

/* ───── Sage HR & Payroll: Cloud-HR mit Lohnabrechnung ───── */

const payrollSource = sageUrl("produkte/sage-hr-payroll/");
// Monthly package price for 5 employees, plus a price per additional employee.
const pack = (base: number, perUnit: number) =>
  ({
    type: "base_plus_per_unit",
    unit: "mitarbeitende",
    base: { monthly: base, annualPerMonth: null },
    perUnit: { monthly: perUnit, annualPerMonth: null },
    includedUnits: 5,
  }) as const;
const essentials = [
  "onboarding",
  "zeiterfassung",
  "organigramm",
  "abwesenheiten",
  "schichtplanung",
  "spesen",
  "lohnabrechnung",
  "app",
  "rollen",
];
const standard = [...essentials, "reports"];
const premium = [
  ...standard,
  "ziele",
  "feedback",
  "umfragen",
  "bewerbermanagement",
  "karriereseite",
];

export const sageHrPayroll = {
  slug: "sage-hr-payroll",
  name: "Sage HR & Payroll",
  status: "published",
  isPlaceholder: false,
  vendor: sageVendor,
  logo: null,
  categories: { primary: "hr-software", secondary: ["zeiterfassungssoftware"] },
  tagline:
    "Cloud-HR mit integrierter Lohnabrechnung – Urlaub, Schichten, Spesen und Payroll",
  bestFor: "Kleine und mittlere Unternehmen mit eigener Lohnabrechnung",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: payrollSource,
    note: "Preise pro Monat zzgl. 19 % MwSt. für 5 Mitarbeitende, jedes weitere Mitarbeitende ab 7 € (Essentials), 9 € (Standard) bzw. 11 € (Premium) pro Monat. Laut Sage jederzeit kündbar und ohne versteckte Kosten.",
    plans: [
      {
        id: "essentials",
        name: "Essentials",
        model: pack(4000, 700),
        features: essentials,
        highlights: [
          "Cloud HR + Cloud Payroll",
          "Lohnabrechnung inkl. gesetzlicher Meldungen",
          "Urlaub, Abwesenheiten, Schichtplanung",
          "Arbeitszeittabellen & Überstunden",
          "Spesen per App",
          "Export an Sage & DATEV (Buchhaltung)",
        ],
        limits: ["5 Mitarbeitende inklusive"],
        recommended: true,
      },
      {
        id: "standard",
        name: "Standard",
        model: pack(6000, 900),
        features: standard,
        highlights: [
          "Alles aus Essentials",
          "Abrechnung komplexerer Fälle",
          "Mehrmandantenfähigkeit",
          "Sonderlöhne",
          "Controlling-Modul",
          "Korrespondenz mit Behörden",
        ],
        limits: ["5 Mitarbeitende inklusive"],
      },
      {
        id: "premium",
        name: "Premium",
        model: pack(8000, 1100),
        features: premium,
        highlights: [
          "Alles aus Standard",
          "Korrekturabrechnungen automatisiert",
          "Einfache Projektzeiterfassung",
          "OKR, 360-Grad-Feedback, Befragungen",
          "Recruiting mit Bewerberpipeline",
          "Landingpages pro Stelle",
        ],
        limits: ["5 Mitarbeitende inklusive"],
      },
    ],
    oneTimeFees: [],
    contract: {
      minTermMonths: 0,
      noticePeriod: "jederzeit kündbar laut Sage",
      monthlyBilling: "ja",
    },
    history: [
      {
        date: checked,
        planId: "essentials",
        price: { monthly: 4000, annualPerMonth: null },
        note: "für 5 Mitarbeitende",
      },
      {
        date: checked,
        planId: "standard",
        price: { monthly: 6000, annualPerMonth: null },
        note: "für 5 Mitarbeitende",
      },
      {
        date: checked,
        planId: "premium",
        price: { monthly: 8000, annualPerMonth: null },
        note: "für 5 Mitarbeitende",
      },
    ],
  },
  trial: { available: "ja", days: 30 },
  freePlan: "nein",
  features: hrFeatures({
    onboarding: { status: "ja", note: "Personalisiertes Onboarding-Portal" },
    organigramm: { status: "ja" },
    rollen: { status: "ja", note: "Benutzer- und Rechteverwaltung" },
    abwesenheiten: {
      status: "ja",
      note: "Alle Arten von Urlaub und Abwesenheit",
    },
    zeiterfassung: {
      status: "ja",
      note: "Arbeitszeittabellen, Überstunden; Projektzeiten in Premium",
    },
    schichtplanung: { status: "ja", note: "Schicht- und Einsatzpläne" },
    spesen: { status: "ja", note: "Einreichen und Genehmigen per App" },
    lohnabrechnung: {
      status: "ja",
      note: "Automatische Lohnabrechnung inkl. gesetzlicher Meldungen",
    },
    reports: { status: "ja", fromPlan: "standard", note: "Controlling-Modul" },
    ziele: {
      status: "ja",
      fromPlan: "premium",
      note: "OKR mit Genehmigungsprozess",
    },
    feedback: { status: "ja", fromPlan: "premium", note: "360-Grad-Feedback" },
    umfragen: { status: "ja", fromPlan: "premium" },
    bewerbermanagement: {
      status: "ja",
      fromPlan: "premium",
      note: "Bewerberpipeline, Scorecards, Interviewplanung",
    },
    karriereseite: {
      status: "teilweise",
      fromPlan: "premium",
      note: "Landingpage pro Stellenausschreibung",
    },
    app: { status: "ja" },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Sage", url: payrollSource, accessedAt: checked },
  },
  support: sageSupport,
  platforms: ["web"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 70,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "HR, Schichtplanung, Spesen und Lohnabrechnung in einem Cloud-Produkt; Recruiting erst in Premium.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "40 € für 5 Mitarbeitende inklusive Lohnabrechnung, monatlich kündbar.",
    datenschutz: "Serverstandort auf der Produktseite nicht genannt.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Buchhaltungsexport an Sage und DATEV.",
  },
  pros: [
    {
      title: "Lohnabrechnung inklusive",
      detail: "Schon Essentials rechnet Löhne mit gesetzlichen Meldungen ab.",
    },
    {
      title: "Monatlich kündbar",
      detail: "Laut Sage jederzeit kündbar, 30 Tage Test für Essentials.",
    },
  ],
  cons: [
    {
      title: "Recruiting nur in Premium",
      detail: "Bewerbermanagement und Ziele gibt es erst im teuersten Paket.",
    },
    {
      title: "Preis steigt pro Kopf",
      detail: "Ab dem 6. Mitarbeitenden 7 € bis 11 € pro Person und Monat.",
    },
  ],
  verdict: {
    short:
      "Sage HR & Payroll bündelt Personalverwaltung und Lohnabrechnung in der Cloud und ist ab 40 € im Monat ein günstiger Einstieg für kleine Teams. Für Recruiting und Ziele brauchst du Premium.",
    idealFor: [
      "Kleine Unternehmen, die Löhne selbst abrechnen",
      "Betriebe mit Schichtplanung",
    ],
    notIdealFor: ["Konzerne mit internationaler HR"],
  },
  review: sageReview("der Produktseite von Sage HR & Payroll"),
  sources: [{ name: "Sage", url: payrollSource, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Pakete, Preise und Funktionen erstmals erfasst." },
  ],
} satisfies ToolInput;

/* ───── Sage HR Suite: modulare Personalsoftware, lokal oder Cloud ───── */

const suiteSource = sageUrl("produkte/sage-hr-suite-personal-software/");
// Licensed in packages of 25 employees, per workstation incl. maintenance, billed annually.
const module25 = (annualPerMonth: number) =>
  ({
    type: "flat",
    unit: "mitarbeitende",
    price: { monthly: null, annualPerMonth },
    includedUnits: 25,
  }) as const;
const payrollModule = [
  "personalakte",
  "abwesenheiten",
  "lohnabrechnung",
  "reports",
];

export const sageHrSuite = {
  slug: "sage-hr-suite",
  name: "Sage HR Suite",
  status: "published",
  isPlaceholder: false,
  vendor: sageVendor,
  logo: null,
  categories: { primary: "hr-software", secondary: ["zeiterfassungssoftware"] },
  tagline:
    "Modulare Personalsoftware für Abrechnung, Zeit und Bewerber – lokal oder in der Cloud",
  bestFor: "Mittelständler mit eigener Personalabteilung",
  companySizes: ["klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: suiteSource,
    note: "Ab-Preise pro Monat; Lizenzierung standardmäßig in Paketen zu 25 Mitarbeitenden, inklusive Softwarewartung für einen Arbeitsplatz, bei jährlicher Rechnungsstellung mit 12 Monaten Mindestlaufzeit, zzgl. MwSt. Module sind kombinierbar; Betrieb lokal installiert oder in der Cloud.",
    plans: [
      {
        id: "personalabrechnung",
        name: "Modul Personalabrechnung",
        model: module25(3900),
        features: payrollModule,
        highlights: [
          "Mitarbeiterstammdaten",
          "Arbeitszeiten und Abwesenheiten",
          "Elektronische Meldungen automatisiert",
          "Einzel-, Massen- und Rückrechnung",
          "Bescheinigungen und Reports",
        ],
        limits: ["Ab-Preis für 25 Mitarbeitende"],
        recommended: true,
      },
      {
        id: "zeitmanagement",
        name: "Modul Zeitmanagement",
        model: module25(2100),
        features: ["zeiterfassung", "schichtplanung", "reports"],
        highlights: [
          "Zeiterfassung ortsunabhängig",
          "Schicht- und Dienstplanung",
          "Arbeitszeitmodelle und Salden",
          "Zeitbewertung über die Abrechnung",
        ],
        limits: ["Ab-Preis für 25 Mitarbeitende"],
        // Add-on module: not an entry price for HR software on its own.
        excludeFromEntry: ["hr-software"],
      },
      {
        id: "bewerbermanagement",
        name: "Modul Bewerbermanagement Smart",
        model: module25(1900),
        features: ["bewerbermanagement"],
        highlights: [
          "Stellenanzeigen erstellen und veröffentlichen",
          "Digitale Bewerberakte",
          "Auswahl mit Fachbereichen",
          "Karriereportal ab Professional",
        ],
        limits: ["Ab-Preis für 25 Mitarbeitende"],
        excludeFromEntry: ["hr-software", "zeiterfassungssoftware"],
      },
    ],
    oneTimeFees: [],
    contract: { minTermMonths: 12, noticePeriod: null, monthlyBilling: "nein" },
    history: [
      {
        date: checked,
        planId: "personalabrechnung",
        price: { monthly: null, annualPerMonth: 3900 },
        note: "ab-Preis, 25 Mitarbeitende",
      },
      {
        date: checked,
        planId: "zeitmanagement",
        price: { monthly: null, annualPerMonth: 2100 },
        note: "ab-Preis, 25 Mitarbeitende",
      },
      {
        date: checked,
        planId: "bewerbermanagement",
        price: { monthly: null, annualPerMonth: 1900 },
        note: "ab-Preis, 25 Mitarbeitende",
      },
    ],
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: hrFeatures({
    personalakte: { status: "ja", note: "Mitarbeiterstammdaten" },
    abwesenheiten: { status: "ja" },
    zeiterfassung: {
      status: "addon",
      note: "Modul Zeitmanagement, ortsunabhängig",
    },
    schichtplanung: { status: "addon", note: "Modul Zeitmanagement" },
    bewerbermanagement: {
      status: "addon",
      note: "Modul Bewerbermanagement Smart",
    },
    karriereseite: {
      status: "addon",
      note: "Individuelles Karriereportal ab Bewerbermanagement Professional",
    },
    ziele: {
      status: "ja",
      note: "Zielvereinbarung, -überwachung und -bewertung",
    },
    lohnabrechnung: {
      status: "ja",
      note: "Einzel-, Massen- und Rückrechnung, elektronische Meldungen",
    },
    reports: { status: "ja" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    serverNote: "Lokal installiert oder als Cloud-Variante",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: { name: "Sage", url: suiteSource, accessedAt: checked },
  },
  support: sageSupport,
  platforms: [],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 70,
    datenschutz: 75,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "Tiefe Personalabrechnung, Zeitmanagement und Bewerbermanagement als Module.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Abrechnung ab 39 € pro 25er-Paket bei Jahresvertrag; Module addieren sich.",
    datenschutz: "Auch lokal betreibbar.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen nicht im Detail geprüft.",
  },
  pros: [
    {
      title: "Lokal oder Cloud",
      detail:
        "Die Personalsoftware läuft auf eigenen Servern oder in der Cloud.",
    },
    {
      title: "Modular",
      detail:
        "Abrechnung, Zeitmanagement und Bewerbermanagement einzeln buchbar.",
    },
  ],
  cons: [
    {
      title: "Pakete zu 25 Mitarbeitenden",
      detail: "Die Lizenzierung erfolgt standardmäßig in 25er-Paketen.",
    },
    {
      title: "Jahresvertrag",
      detail: "12 Monate Mindestlaufzeit bei jährlicher Rechnung.",
    },
  ],
  verdict: {
    short:
      "Die Sage HR Suite richtet sich an Personalabteilungen im Mittelstand, die die Lohnabrechnung im Haus erledigen und Zeitwirtschaft sowie Recruiting als Module ergänzen wollen – lokal oder in der Cloud.",
    idealFor: [
      "Personalabteilungen mit eigener Abrechnung",
      "Unternehmen, die HR-Software lokal betreiben wollen",
    ],
    notIdealFor: ["Kleinstbetriebe – dafür gibt es Sage HR & Payroll"],
  },
  review: sageReview("der Produktseite der Sage HR Suite"),
  sources: [{ name: "Sage", url: suiteSource, accessedAt: checked }],
  changelog: [
    {
      date: checked,
      note: "Module, Ab-Preise und Lizenzmodell erstmals erfasst.",
    },
  ],
} satisfies ToolInput;

/* ───── Sage People: Cloud-HCM für international tätige Unternehmen ───── */

const peopleSource = sageUrl("sage-business-cloud/people/");

export const sagePeople = {
  slug: "sage-people",
  name: "Sage People",
  status: "published",
  isPlaceholder: false,
  vendor: sageVendor,
  logo: null,
  categories: { primary: "hr-software", secondary: [] },
  tagline: "Cloud-HCM für Mitarbeitererlebnis, Leistungs- und Talentmanagement",
  bestFor: "Mittelständler und international tätige Unternehmen",
  companySizes: ["mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: peopleSource,
    note: "Sage veröffentlicht für Sage People keine Preise; Angebote nach einer Live-Demo.",
    plans: [
      {
        id: "angebot",
        name: "Sage People",
        model: { type: "quote" },
        features: ["self-service", "reports", "feedback", "ziele"],
        highlights: [
          "Mitarbeiter-Self-Service",
          "Personaleinblicke und Analysen",
          "Leistungs- und Talentmanagement",
          "Anerkennung und Vergütung",
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
    "self-service": {
      status: "ja",
      note: "Intuitive Oberfläche für Mitarbeitende",
    },
    reports: { status: "ja", note: "Personaleinblicke" },
    feedback: { status: "ja", note: "Leistungsmanagement" },
    ziele: { status: "ja", note: "Talent- und Leistungsmanagement" },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "Sage", url: peopleSource, accessedAt: checked },
  },
  support: sageSupport,
  platforms: ["web"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 70,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "HCM mit Self-Service, Analysen und Talentmanagement; Details nicht geprüft.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Keine veröffentlichten Preise.",
    datenschutz: "Hosting nicht geprüft.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen nicht geprüft.",
  },
  pros: [
    {
      title: "Talentmanagement",
      detail: "Leistung, Anerkennung und Vergütung auf einer Plattform.",
    },
    {
      title: "Mitarbeitererlebnis",
      detail: "Self-Service und flexible Workflows für Teams.",
    },
  ],
  cons: [
    {
      title: "Keine Preise",
      detail: "Kosten nur im Angebot nach einer Demo.",
    },
    {
      title: "Für kleine Teams zu groß",
      detail: "Ausgerichtet auf mittlere und große Organisationen.",
    },
  ],
  verdict: {
    short:
      "Sage People ist das HCM von Sage für größere Organisationen mit Fokus auf Mitarbeitererlebnis und Talentmanagement. Für kleine Teams passt Sage HR & Payroll besser.",
    idealFor: [
      "Mittelständler mit internationalen Teams",
      "HR-Abteilungen mit Talentmanagement",
    ],
    notIdealFor: ["Kleinbetriebe"],
  },
  review: sageReview("der Produktseite von Sage People"),
  sources: [{ name: "Sage", url: peopleSource, accessedAt: checked }],
  changelog: [{ date: checked, note: "Produktangaben erstmals erfasst." }],
} satisfies ToolInput;
