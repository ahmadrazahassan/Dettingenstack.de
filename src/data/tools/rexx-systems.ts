import type { ToolInput } from "@/lib/schema";

const checked = "2026-11-02";

export const rexxSystems = {
  slug: "rexx-systems",
  name: "rexx systems",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "rexx systems GmbH",
    hq: "Hamburg",
    countryCode: "DE",
    website: "https://www.rexx-systems.com",
  },
  logo: null,
  categories: { primary: "hr-software", secondary: [] },
  tagline:
    "Umfangreiche HR-Suite mit starkem Recruiting, Cloud in Deutschland oder On-Premise",
  bestFor: "Mittelstand und größere Unternehmen mit viel Recruiting",
  companySizes: ["mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.rexx-systems.com/preise/",
    note: "rexx veröffentlicht keine Listenpreise. Der Preis richtet sich nach Unternehmensgröße, Modulen und Funktionen. Kleine Unternehmen erhalten vorkonfigurierte Starterpakete mit 32 Beratungs- und 8 Schulungsstunden.",
    plans: [
      {
        id: "suite",
        name: "rexx Suite (individuell)",
        model: { type: "quote", note: "Preis auf Anfrage" },
        features: [
          "personalakte",
          "dokumente",
          "esignatur",
          "abwesenheiten",
          "zeiterfassung",
          "bewerbermanagement",
          "onboarding",
          "feedback",
          "ziele",
          "lernen",
          "umfragen",
          "datev-lohn",
          "spesen",
          "self-service",
          "app",
          "reports",
          "api",
          "hinweisgeber",
        ],
        highlights: [
          "Recruiting mit Multiposting und CV-Parsing",
          "Personalakte & Self-Service",
          "Talentmanagement & E-Learning",
          "Schnittstellen zu DATEV, ADP/Paisy, SAP HR",
          "Cloud oder On-Premise",
        ],
      },
    ],
    oneTimeFees: [
      {
        label: "Einrichtung & Beratung",
        amount: null,
        note: "Starterpakete mit 32 Beratungs- und 8 Schulungsstunden; sonst individuelles Angebot",
      },
    ],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: {
    personalakte: {
      status: "ja",
      note: "Mitarbeitende pflegen Stammdaten selbst",
    },
    dokumente: { status: "ja" },
    esignatur: { status: "ja", note: "Signaturen in der rexx-Go-App" },
    organigramm: { status: "unbekannt" },
    rollen: { status: "unbekannt" },
    abwesenheiten: { status: "ja" },
    zeiterfassung: { status: "ja" },
    schichtplanung: { status: "unbekannt" },
    bewerbermanagement: {
      status: "ja",
      note: "Multiposting, CV-Parsing, Empfehlungsmanagement",
    },
    karriereseite: {
      status: "teilweise",
      note: "Jobportal und Multiposting; eigene Karriereseite nicht genannt",
    },
    onboarding: { status: "ja" },
    feedback: { status: "ja", note: "Mitarbeitergespräche und 360°-Feedback" },
    ziele: { status: "ja" },
    lernen: { status: "ja", note: "E-Learning und Lernmanagement" },
    umfragen: { status: "ja" },
    lohnvorbereitung: { status: "unbekannt" },
    "datev-lohn": { status: "ja" },
    lohnabrechnung: {
      status: "unbekannt",
      note: "Nur Schnittstellen zu Lohnsystemen genannt",
    },
    spesen: { status: "ja" },
    "self-service": { status: "ja" },
    app: { status: "ja", note: "rexx Go" },
    reports: { status: "ja" },
    api: { status: "ja" },
    sso: { status: "unbekannt" },
    hinweisgeber: { status: "ja" },
  },
  integrations: ["datev", "adp-paisy", "sap-hr"],
  compliance: {
    serverLocation: "DE_CH",
    serverNote:
      "Eigene Cloud mit Servern in Deutschland und der Schweiz; On-Premise möglich",
    avv: "unbekannt",
    certifications: ["ISO_27001"],
    certificationNote:
      "ISO 27001:2022 von der Entwicklung bis zum Betrieb (Herstellerangabe)",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: {
      name: "rexx systems",
      url: "https://www.rexx-systems.com/preise/",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "kostenpflichtig" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 88,
    bedienbarkeit: 70,
    preisLeistung: 58,
    datenschutz: 88,
    support: 74,
    integrationen: 85,
  },
  scoreNotes: {
    funktionen:
      "18 von 25 Funktionen laut Website belegt, besonders breit im Recruiting.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Keine veröffentlichten Preise, Einführung mit Beratungsstunden.",
    datenschutz:
      "Eigene Cloud in Deutschland und der Schweiz, ISO 27001:2022, On-Premise möglich.",
    support:
      "Noch nicht getestet. Starterpakete enthalten Beratungs- und Schulungsstunden.",
    integrationen: "DATEV, ADP/Paisy, SAP HR und offene API.",
  },
  pros: [
    {
      title: "Recruiting-Tiefe",
      detail:
        "Multiposting, CV-Parsing, Online-Assessment und Empfehlungsmanagement sind laut Website an Bord.",
    },
    {
      title: "Hosting in Deutschland oder vor Ort",
      detail:
        "rexx betreibt eine eigene Cloud in Deutschland und der Schweiz und bietet zusätzlich On-Premise an.",
    },
    {
      title: "Viele Lohn-Schnittstellen",
      detail:
        "Anbindungen an DATEV, ADP/Paisy und SAP HR sowie eine offene API.",
    },
  ],
  cons: [
    {
      title: "Keine Preise öffentlich",
      detail:
        "Ohne Angebot lässt sich nicht abschätzen, was die Suite für dein Team kostet.",
    },
    {
      title: "Eher für größere Teams",
      detail:
        "Der Funktionsumfang und die beratungsintensive Einführung passen besser zu Mittelstand und Konzern.",
    },
  ],
  verdict: {
    short:
      "rexx ist die funktionsreichste Suite im Vergleich – stark im Recruiting, mit Hosting in Deutschland und On-Premise-Option. Preise gibt es nur auf Anfrage.",
    idealFor: [
      "Unternehmen mit vielen offenen Stellen",
      "IT-Abteilungen, die On-Premise oder Hosting in Deutschland verlangen",
    ],
    notIdealFor: ["Kleine Teams, die schnell und ohne Beratung starten wollen"],
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
      name: "rexx systems",
      url: "https://www.rexx-systems.com/preise/",
      accessedAt: checked,
    },
    {
      name: "rexx systems",
      url: "https://www.rexx-systems.com/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Funktionen, Hosting und Zertifizierung erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
