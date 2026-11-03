import type { ToolInput } from "@/lib/schema";

const checked = "2026-11-02";

export const factorial = {
  slug: "factorial",
  name: "Factorial",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Factorial",
    hq: "Barcelona",
    countryCode: "ES",
    website: "https://factorialhr.de",
  },
  logo: null,
  categories: { primary: "hr-software", secondary: ["zeiterfassungssoftware"] },
  tagline: "Modulare HR-Plattform von Personalakte bis IT-Inventar",
  bestFor: "KMU, die HR, Zeit und Ausgaben in einem Tool wollen",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://factorialhr.de/preise",
    note: "Die Preisseite nennt zwei unterschiedliche Einstiegspreise: „ab 3.9 € pro Monat und User“ und „ab 8 € pro Monat und User“. Tarife und Abrechnungsbasis sind nicht angegeben – wir rechnen deshalb nicht mit Factorial-Preisen.",
    plans: [
      {
        id: "core",
        name: "Core + Module",
        model: {
          type: "quote",
          note: "Einstiegspreise widersprüchlich, Angebot einholen",
        },
        features: ["personalakte", "onboarding", "esignatur"],
        highlights: [
          "Core: Mitarbeiterverzeichnis, On-/Offboarding, E-Signatur",
          "Module Time, Talent, Finance, IT",
        ],
      },
    ],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
  },
  trial: { available: "ja" },
  freePlan: "unbekannt",
  features: {
    personalakte: { status: "ja", note: "Mitarbeiterverzeichnis im Core" },
    dokumente: {
      status: "teilweise",
      note: "Vorlagen für On- und Offboarding",
    },
    esignatur: { status: "ja", note: "Rechtsverbindlich, im Core" },
    organigramm: { status: "unbekannt" },
    rollen: { status: "unbekannt" },
    abwesenheiten: { status: "addon", note: "Modul Time" },
    zeiterfassung: { status: "addon", note: "Modul Time" },
    schichtplanung: { status: "addon", note: "Modul Time" },
    bewerbermanagement: { status: "addon", note: "Modul Talent" },
    karriereseite: { status: "unbekannt" },
    onboarding: { status: "ja", note: "Im Core" },
    feedback: { status: "addon", note: "Modul Talent (Performance)" },
    ziele: { status: "unbekannt" },
    lernen: { status: "addon", note: "Modul Talent (Schulungen)" },
    umfragen: { status: "addon", note: "eNPS im Modul Talent" },
    lohnvorbereitung: { status: "unbekannt" },
    "datev-lohn": { status: "unbekannt" },
    lohnabrechnung: {
      status: "unbekannt",
      note: "Gehaltsabrechnung in der Navigation, nicht auf der Preisseite",
    },
    spesen: { status: "addon", note: "Modul Finance" },
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
    serverNote:
      "Trust Center nennt AWS, Google Cloud und Azure als Anbieter, aber keine Region",
    avv: "ja",
    certifications: ["ISO_27001", "SOC_2"],
    certificationNote: "ISO/IEC 27001:2022 und SOC 2 Type 2 laut Trust Center",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "Factorial Trust Center",
      url: "https://trust.factorial.co/",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 69,
    bedienbarkeit: 70,
    preisLeistung: 65,
    datenschutz: 72,
    support: 70,
    integrationen: 65,
  },
  scoreNotes: {
    funktionen:
      "Breites Modulangebot, aber viele Funktionen nur als Module; Payroll und DATEV nicht belegt.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Preisseite nennt widersprüchliche Einstiegspreise.",
    datenschutz:
      "ISO 27001 und SOC 2, DPA vorhanden; Hosting-Region nicht angegeben.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Integrationen nicht geprüft, DATEV nicht belegt.",
  },
  pros: [
    {
      title: "Sehr breites Modulangebot",
      detail:
        "Neben HR auch Ausgaben, Beschaffung, Projektzeiten und IT-Inventar.",
    },
    {
      title: "ISO 27001 und SOC 2",
      detail:
        "Beide Nachweise listet das Trust Center, dazu einen Auftragsverarbeitungsvertrag.",
    },
  ],
  cons: [
    {
      title: "Unklare Preise",
      detail:
        "Die Preisseite nennt 3,90 € und 8,00 € als Einstieg – welcher gilt, bleibt offen.",
    },
    {
      title: "Hosting-Region offen",
      detail: "Drei Cloud-Anbieter werden genannt, aber keine Region.",
    },
  ],
  verdict: {
    short:
      "Factorial deckt mit seinen Modulen mehr ab als klassische HR-Software. Die Preisangaben sind widersprüchlich und die Hosting-Region offen – beides vor dem Kauf klären.",
    idealFor: [
      "KMU, die HR, Zeit und Ausgaben bündeln wollen",
      "Teams, die modular starten möchten",
    ],
    notIdealFor: [
      "Unternehmen, die einen Serverstandort in Deutschland verlangen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Preisseite und des Trust Centers (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "Factorial",
      url: "https://factorialhr.de/preise",
      accessedAt: checked,
    },
    {
      name: "Factorial Trust Center",
      url: "https://trust.factorial.co/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Module, Preisangaben und Sicherheitsnachweise erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
