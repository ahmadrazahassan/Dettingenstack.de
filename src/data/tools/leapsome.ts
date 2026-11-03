import type { ToolInput } from "@/lib/schema";

const checked = "2026-11-02";

export const leapsome = {
  slug: "leapsome",
  name: "Leapsome",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Leapsome",
    hq: "Berlin",
    countryCode: "DE",
    website: "https://www.leapsome.com/de",
  },
  logo: null,
  categories: { primary: "hr-software", secondary: [] },
  tagline:
    "Personalplattform mit Schwerpunkt Performance, Ziele und Mitarbeiterbefragungen",
  bestFor: "Unternehmen mit Fokus auf Feedback, Ziele und Entwicklung",
  companySizes: ["klein", "mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.leapsome.com/de/pricing",
    note: "Preise pro Mitarbeitendem und Monat. Das HRIS-Basispaket wird mit 7 € bzw. 5 € und einem Aktionspreis von 0 € bis 31.12. angezeigt; die Beispielrechnung der Seite ist nicht schlüssig. Die Abrechnungsbasis (monatlich/jährlich) ist nicht eindeutig.",
    plans: [
      {
        id: "hris-basis",
        name: "HRIS Basis",
        model: {
          type: "quote",
          note: "Widersprüchliche Preisangaben, Aktion bis 31.12.",
        },
        features: ["personalakte", "lohnvorbereitung"],
        highlights: ["Personalverwaltung", "Vorbereitende Lohnabrechnung"],
      },
      {
        id: "hris-pro",
        name: "HRIS Pro",
        model: {
          type: "per_unit",
          unit: "mitarbeitende",
          price: { monthly: 1000, annualPerMonth: null },
        },
        features: ["personalakte", "lohnvorbereitung"],
        highlights: [
          "Alles aus HRIS Basis",
          "Module Performance, Ziele, Befragungen zubuchbar",
        ],
      },
    ],
    addOns: [
      {
        id: "performance",
        name: "Performance Reviews",
        unit: "mitarbeitende",
        price: { monthly: 700, annualPerMonth: null },
      },
      {
        id: "recruiting",
        name: "Recruiting (ATS)",
        unit: "mitarbeitende",
        price: { monthly: 500, annualPerMonth: null },
      },
      {
        id: "ziele",
        name: "Ziele & OKRs",
        unit: "mitarbeitende",
        price: { monthly: 400, annualPerMonth: null },
      },
      {
        id: "befragung",
        name: "Mitarbeiterbefragung",
        unit: "mitarbeitende",
        price: { monthly: 400, annualPerMonth: null },
      },
      {
        id: "lernen",
        name: "Lernen",
        unit: "mitarbeitende",
        price: { monthly: 400, annualPerMonth: null },
      },
      {
        id: "verguetung",
        name: "Vergütung",
        unit: "mitarbeitende",
        price: { monthly: 300, annualPerMonth: null },
      },
      {
        id: "zeit",
        name: "Zeiterfassung",
        unit: "mitarbeitende",
        price: { monthly: 300, annualPerMonth: null },
      },
    ],
    oneTimeFees: [
      {
        label: "Einrichtung",
        amount: 0,
        note: "Keine Einrichtungsgebühr laut Preisseite",
      },
    ],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [
      {
        date: checked,
        planId: "hris-pro",
        price: { monthly: 1000, annualPerMonth: null },
      },
    ],
  },
  trial: { available: "ja", days: 14 },
  freePlan: "nein",
  features: {
    personalakte: { status: "ja", note: "HRIS" },
    dokumente: { status: "unbekannt" },
    esignatur: { status: "unbekannt" },
    organigramm: { status: "unbekannt" },
    rollen: { status: "unbekannt" },
    abwesenheiten: { status: "unbekannt" },
    zeiterfassung: { status: "addon", note: "3 € pro Mitarbeitendem/Monat" },
    schichtplanung: { status: "unbekannt" },
    bewerbermanagement: {
      status: "addon",
      note: "5 € pro Mitarbeitendem/Monat",
    },
    karriereseite: { status: "unbekannt" },
    onboarding: { status: "unbekannt" },
    feedback: { status: "addon", note: "Performance Reviews, 7 €" },
    ziele: { status: "addon", note: "Ziele & OKRs, 4 €" },
    lernen: { status: "addon", note: "4 €" },
    umfragen: { status: "addon", note: "4 €" },
    lohnvorbereitung: { status: "ja", note: "Im HRIS-Basispaket" },
    "datev-lohn": { status: "unbekannt" },
    lohnabrechnung: { status: "unbekannt" },
    spesen: { status: "unbekannt" },
    "self-service": { status: "unbekannt" },
    app: { status: "unbekannt" },
    reports: { status: "unbekannt" },
    api: { status: "unbekannt" },
    sso: { status: "unbekannt" },
    hinweisgeber: { status: "unbekannt" },
  },
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    serverNote: "Serverstandort auf der Preisseite nicht angegeben",
    avv: "unbekannt",
    certifications: ["ISO_27001", "SOC_2"],
    certificationNote: "ISO 27001:2022 und SOC 2 Type II laut Anbieter",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Leapsome",
      url: "https://www.leapsome.com/de/pricing",
      accessedAt: checked,
    },
  },
  support: { languages: ["de", "en"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 64,
    bedienbarkeit: 70,
    preisLeistung: 72,
    datenschutz: 72,
    support: 70,
    integrationen: 62,
  },
  scoreNotes: {
    funktionen:
      "Stark bei Performance, Zielen und Befragungen; klassische HR-Verwaltung kaum belegt.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Modulpreise veröffentlicht, Basispaket und Beispielrechnung widersprüchlich; keine Einrichtungsgebühr.",
    datenschutz:
      "ISO 27001:2022 und SOC 2 Type II; Serverstandort nicht angegeben.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen nicht geprüft.",
  },
  pros: [
    {
      title: "Modulpreise veröffentlicht",
      detail:
        "Jedes Talent-Modul hat einen Euro-Preis pro Mitarbeitendem – du zahlst nur, was du nutzt.",
    },
    {
      title: "Keine Einrichtungsgebühr",
      detail: "Laut Preisseite fallen keine Einrichtungskosten an.",
    },
    {
      title: "Stark in Entwicklung und Feedback",
      detail:
        "Performance Reviews, OKRs, Befragungen und Lernen kommen aus einer Hand.",
    },
  ],
  cons: [
    {
      title: "Kosten summieren sich",
      detail:
        "Mit mehreren Modulen liegt man schnell deutlich über dem HRIS-Grundpreis.",
    },
    {
      title: "Widersprüchliche Angaben",
      detail:
        "Basispaket und Beispielrechnung auf der Preisseite passen nicht zusammen.",
    },
  ],
  verdict: {
    short:
      "Leapsome ist die Wahl für Unternehmen, bei denen Feedback, Ziele und Entwicklung im Vordergrund stehen. Für klassische Verwaltung wie Abwesenheiten und DATEV fehlen belegte Angaben.",
    idealFor: [
      "Unternehmen mit ausgeprägter Feedback- und OKR-Kultur",
      "Teams, die Module einzeln dazubuchen wollen",
    ],
    notIdealFor: [
      "Unternehmen, die vor allem Personalverwaltung und DATEV-Lohn brauchen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite des Anbieters (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Leapsome",
      url: "https://www.leapsome.com/de/pricing",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Modulpreise und Sicherheitsangaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
