import type { ToolInput } from "@/lib/schema";

const checked = "2026-11-02";

export const hrWorks = {
  slug: "hr-works",
  name: "HR WORKS",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "HR WORKS GmbH",
    hq: "Freiburg im Breisgau",
    countryCode: "DE",
    website: "https://www.hrworks.de",
  },
  logo: null,
  categories: { primary: "hr-software", secondary: ["zeiterfassungssoftware"] },
  tagline:
    "HR-Software mit Zeitwirtschaft, Reisekosten und Payroll – ohne Mindestlaufzeit",
  bestFor: "Mittelständler ab 20 Nutzern mit Reisekosten und DATEV",
  companySizes: ["klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.hrworks.de/preise/",
    note: "HR WORKS veröffentlicht keine Preise, sondern erstellt ein Angebot. Abgerechnet wird pro Nutzer, mindestens 20 Nutzer; in den ersten sechs Monaten mindestens die bestellte Lizenzzahl.",
    plans: [
      {
        id: "module",
        name: "HR WORKS (Module nach Bedarf)",
        model: { type: "quote", note: "Preis auf Anfrage", minUnits: 20 },
        features: [
          "personalakte",
          "abwesenheiten",
          "zeiterfassung",
          "bewerbermanagement",
          "karriereseite",
          "onboarding",
          "lohnvorbereitung",
          "datev-lohn",
          "lohnabrechnung",
          "spesen",
          "self-service",
          "reports",
          "api",
        ],
        highlights: [
          "Zeitwirtschaft & Projektzeiten",
          "Reisekostenabrechnung",
          "Personalverwaltung mit Bewerbermanagement",
          "Payroll, DATEV- und ADDISON-Schnittstelle",
          "Ohne Mindestlaufzeit",
        ],
        limits: ["Mindestens 20 Nutzer"],
      },
    ],
    contract: { minTermMonths: 0, noticePeriod: null, monthlyBilling: "ja" },
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: {
    personalakte: { status: "ja" },
    dokumente: { status: "unbekannt" },
    esignatur: { status: "unbekannt" },
    organigramm: { status: "unbekannt" },
    rollen: { status: "unbekannt" },
    abwesenheiten: { status: "ja" },
    zeiterfassung: { status: "ja", note: "Arbeits- und Projektzeiten" },
    schichtplanung: { status: "unbekannt" },
    bewerbermanagement: { status: "ja" },
    karriereseite: { status: "ja", note: "Stellenportal" },
    onboarding: { status: "ja" },
    feedback: {
      status: "teilweise",
      note: "Modul Personalentwicklung, Details nicht angegeben",
    },
    ziele: { status: "unbekannt" },
    lernen: { status: "unbekannt" },
    umfragen: { status: "unbekannt" },
    lohnvorbereitung: { status: "ja" },
    "datev-lohn": { status: "ja", note: "DATEV-Partner" },
    lohnabrechnung: { status: "ja", note: "Eigene Payroll-Lösung" },
    spesen: {
      status: "ja",
      note: "Belege abfotografieren, Pauschalen automatisch",
    },
    "self-service": { status: "ja" },
    app: { status: "unbekannt" },
    reports: { status: "ja" },
    api: { status: "ja", note: "Produkt-API" },
    sso: { status: "unbekannt" },
    hinweisgeber: { status: "unbekannt" },
  },
  integrations: ["datev", "addison"],
  compliance: {
    serverLocation: "unbekannt",
    serverNote: "Betrieb in der AWS-Cloud, Region nicht angegeben",
    avv: "unbekannt",
    certifications: ["ISO_27001"],
    certificationNote:
      "Siegel „Certified ISO/IEC 27001“ auf der Website, ohne weitere Details",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "HR WORKS",
      url: "https://www.hrworks.de/preise/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: ["telefon"],
    onboarding: "begleitet",
    note: "Persönliche Beratung durch das Customer-Success-Team",
  },
  platforms: ["web"],
  customersClaim: {
    value: "Mehr als 400.000 Nutzer",
    source: {
      name: "HR WORKS",
      url: "https://www.hrworks.de/",
      accessedAt: checked,
    },
  },
  scores: {
    funktionen: 79,
    bedienbarkeit: 70,
    preisLeistung: 62,
    datenschutz: 70,
    support: 74,
    integrationen: 80,
  },
  scoreNotes: {
    funktionen:
      "13 von 25 Funktionen laut Website belegt; stark bei Zeit und Reisekosten.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Keine veröffentlichten Preise, Mindestabnahme 20 Nutzer, dafür ohne Mindestlaufzeit.",
    datenschutz: "ISO-27001-Siegel, AWS-Hosting ohne genannte Region.",
    support:
      "Noch nicht getestet. Persönliche Beratung und Telefon laut Website.",
    integrationen: "DATEV- und ADDISON-Partnerschaft, Produkt-API.",
  },
  pros: [
    {
      title: "Reisekosten inklusive",
      detail:
        "Belege abfotografieren, Pauschalen automatisch berechnen – selten so tief in einer HR-Suite.",
    },
    {
      title: "Ohne Mindestlaufzeit",
      detail:
        "HR WORKS rechnet monatlich ab und verzichtet auf eine Mindestvertragslaufzeit.",
    },
    {
      title: "Payroll und DATEV",
      detail: "Eigene Lohnabrechnung plus Schnittstellen zu DATEV und ADDISON.",
    },
  ],
  cons: [
    {
      title: "Mindestens 20 Nutzer",
      detail:
        "Für Kleinstbetriebe wird es teuer, weil mindestens 20 Lizenzen abgerechnet werden.",
    },
    {
      title: "Hosting-Region offen",
      detail:
        "Die Website nennt die AWS-Cloud, aber nicht die Region – im AVV prüfen.",
    },
  ],
  verdict: {
    short:
      "HR WORKS punktet mit Zeitwirtschaft, Reisekosten und Payroll aus einer Hand und verzichtet auf eine Mindestlaufzeit. Preise gibt es nur im Angebot, und abgerechnet werden mindestens 20 Nutzer.",
    idealFor: [
      "Unternehmen mit vielen Dienstreisen",
      "Teams, die Lohn und DATEV-Export verbinden wollen",
    ],
    notIdealFor: ["Betriebe unter 20 Mitarbeitenden"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Website und Preisseite des Anbieters (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "HR WORKS",
      url: "https://www.hrworks.de/preise/",
      accessedAt: checked,
    },
    { name: "HR WORKS", url: "https://www.hrworks.de/", accessedAt: checked },
  ],
  changelog: [
    {
      date: checked,
      note: "Preisbedingungen, Module und Sicherheitsangaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
