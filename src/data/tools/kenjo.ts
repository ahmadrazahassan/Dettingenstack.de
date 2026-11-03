import type { ToolInput } from "@/lib/schema";

const checked = "2026-11-02";
const starter = [
  "personalakte",
  "dokumente",
  "abwesenheiten",
  "zeiterfassung",
  "schichtplanung",
  "feedback",
  "lohnvorbereitung",
  "reports",
];
const growth = [
  ...starter,
  "esignatur",
  "rollen",
  "onboarding",
  "datev-lohn",
  "hinweisgeber",
];

export const kenjo = {
  slug: "kenjo",
  name: "Kenjo",
  status: "published",
  // Facts below are researched from kenjo.io; scores, verdict and pros/cons are drafts until a hands-on test.
  isPlaceholder: false,
  vendor: {
    name: "Kenjo",
    hq: "Berlin",
    countryCode: "DE",
    website: "https://www.kenjo.io/de",
  },
  logo: null,
  categories: { primary: "hr-software", secondary: ["zeiterfassungssoftware"] },
  tagline:
    "HR-Software mit transparenten Preisen und Servern ausschließlich in Frankfurt",
  bestFor:
    "Kleine und mittlere Unternehmen mit Schicht- und Zeiterfassungsbedarf",
  companySizes: ["klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.kenjo.io/de/preise",
    note: "Jahrespreise abgeleitet aus dem Preisrechner der Anbieterseite (10 % Ersparnis bei jährlicher Zahlung). Ob die Preise netto sind, nennt die Seite nicht.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        model: {
          type: "per_unit",
          unit: "mitarbeitende",
          price: { monthly: 600, annualPerMonth: 540 },
        },
        features: starter,
        highlights: [
          "Abwesenheiten & Zeiterfassung",
          "Schichtplanung",
          "360°-Feedback",
          "Vorbereitende Lohnabrechnung",
          "Digitale Dokumente",
        ],
        limits: ["Recruiting nur als Add-on"],
      },
      {
        id: "growth",
        name: "Growth",
        model: {
          type: "per_unit",
          unit: "mitarbeitende",
          price: { monthly: 1000, annualPerMonth: 900 },
        },
        features: growth,
        highlights: [
          "Alles aus Starter",
          "E-Signatur & Onboarding",
          "Eigene Rollen & Rechte",
          "DATEV-Integration (einmalig 600 €)",
          "Hinweisgebersystem",
          "Telefon-Support",
        ],
        recommended: true,
      },
      {
        id: "connect",
        name: "Connect",
        model: { type: "quote", note: "Preis auf Anfrage, Demo erforderlich" },
        features: [...growth, "lernen", "api"],
        highlights: [
          "Alles aus Growth",
          "Schulungsverwaltung",
          "API & Integrationen",
          "Begleitete Einführung",
        ],
      },
    ],
    addOns: [
      {
        id: "recruiting",
        name: "Recruiting-Modul",
        unit: "pauschal",
        price: { monthly: 24_900, annualPerMonth: null },
      },
      {
        id: "recruiting-plus",
        name: "Recruitment PLUS",
        unit: "pauschal",
        price: { monthly: 39_900, annualPerMonth: null },
      },
    ],
    oneTimeFees: [
      { label: "Onboarding", amount: 40_000, note: "ab 400 €" },
      {
        label: "Einrichtung DATEV-Integration",
        amount: 60_000,
        note: "ab Tarif Growth",
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "starter",
        price: { monthly: 600, annualPerMonth: 540 },
      },
      {
        date: checked,
        planId: "growth",
        price: { monthly: 1000, annualPerMonth: 900 },
      },
    ],
  },
  trial: { available: "ja", days: 14 },
  freePlan: "nein",
  features: {
    personalakte: { status: "ja" },
    dokumente: { status: "ja" },
    esignatur: { status: "ja", fromPlan: "growth" },
    organigramm: { status: "unbekannt" },
    rollen: {
      status: "ja",
      fromPlan: "growth",
      note: "Eigene Profile und Berechtigungen",
    },
    abwesenheiten: { status: "ja" },
    zeiterfassung: { status: "ja", note: "Stempeluhr-Terminal ab Growth" },
    schichtplanung: { status: "ja" },
    bewerbermanagement: {
      status: "addon",
      note: "Recruiting-Modul 249 € pro Monat",
    },
    karriereseite: { status: "unbekannt" },
    onboarding: { status: "ja", fromPlan: "growth" },
    feedback: { status: "ja", note: "360°-Beurteilungen" },
    ziele: { status: "unbekannt" },
    lernen: { status: "ja", fromPlan: "connect" },
    umfragen: { status: "unbekannt" },
    lohnvorbereitung: { status: "ja" },
    "datev-lohn": {
      status: "ja",
      fromPlan: "growth",
      note: "Einrichtung einmalig 600 €",
    },
    lohnabrechnung: { status: "unbekannt" },
    spesen: { status: "unbekannt" },
    "self-service": { status: "unbekannt" },
    app: { status: "unbekannt" },
    reports: { status: "ja", note: "BI-Dashboards ab Growth" },
    api: { status: "ja", fromPlan: "connect" },
    sso: { status: "ja", note: "Laut Sicherheitsseite, Tarif nicht angegeben" },
    hinweisgeber: { status: "ja", fromPlan: "growth" },
  },
  integrations: ["datev"],
  compliance: {
    serverLocation: "DE",
    serverNote:
      "Ausschließlich Frankfurt am Main (Amazon Web Services, MongoDB Atlas)",
    avv: "ja",
    certifications: [],
    certificationNote:
      "Keine eigene Zertifizierung; die genutzten Rechenzentren sind nach ISO 27001 zertifiziert.",
    sso: "ja",
    twoFactor: "unbekannt",
    onPremise: "unbekannt",
    source: {
      name: "Kenjo",
      url: "https://www.kenjo.io/de/sicherheit",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: ["telefon"],
    onboarding: "kostenpflichtig",
    note: "Telefon-Support ab Growth",
  },
  platforms: ["web"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 80,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen:
      "16 von 25 Funktionen laut Preisseite belegt, Recruiting als Add-on.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Als einziger Anbieter im Vergleich mit vollständig veröffentlichten Tarifpreisen.",
    datenschutz:
      "Server nur in Frankfurt, AVV im Vertrag, SSO; keine eigene ISO-Zertifizierung.",
    support: "Noch nicht getestet. Telefon-Support erst ab Growth.",
    integrationen:
      "DATEV ab Growth mit Einrichtungsgebühr, API erst im Tarif Connect.",
  },
  pros: [
    {
      title: "Transparente Preise",
      detail:
        "Starter und Growth stehen mit Euro-Preisen pro Mitarbeitendem auf der Website, inklusive Preisrechner.",
    },
    {
      title: "Server nur in Frankfurt",
      detail:
        "Kenjo nennt Frankfurt am Main als einzigen Serverstandort und liefert den AVV im Standardvertrag mit.",
    },
    {
      title: "Schichtplanung schon im Einstiegstarif",
      detail:
        "Zeiterfassung und Schichtplanung sind ab Starter enthalten – selten in dieser Preisklasse.",
    },
  ],
  cons: [
    {
      title: "DATEV erst ab Growth",
      detail:
        "Die DATEV-Integration gibt es erst im mittleren Tarif und mit einmalig 600 € Einrichtung.",
    },
    {
      title: "Keine eigene Zertifizierung",
      detail:
        "Kenjo selbst ist nicht nach ISO 27001 zertifiziert, nur die genutzten Rechenzentren.",
    },
    {
      title: "Recruiting kostet extra",
      detail: "Bewerbermanagement ist ein Add-on ab 249 € pro Monat.",
    },
  ],
  verdict: {
    short:
      "Kenjo ist die transparenteste Wahl im Vergleich: klare Euro-Preise, Server in Frankfurt und Schichtplanung schon im Einstieg. Wer DATEV braucht, landet beim Tarif Growth.",
    idealFor: [
      "Teams mit Schichtbetrieb und Zeiterfassungspflicht",
      "Unternehmen, die Kosten vorab genau kalkulieren wollen",
    ],
    notIdealFor: [
      "Unternehmen mit großem Recruiting-Volumen – das Modul kostet extra",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preis- und Sicherheitsseite des Anbieters (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Kenjo",
      url: "https://www.kenjo.io/de/preise",
      accessedAt: checked,
    },
    {
      name: "Kenjo",
      url: "https://www.kenjo.io/de/sicherheit",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Preise, Tarifinhalte und Sicherheitsangaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
