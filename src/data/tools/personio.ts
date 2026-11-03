import type { ToolInput } from "@/lib/schema";

const checked = "2026-11-02";

// personio.de/com could not be fetched (HTTP 429) on 02.11.2026. Facts below come from third-party
// sources and are marked as such; verify on personio.de and in the trust center before publishing.
export const personio = {
  slug: "personio",
  name: "Personio",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "Personio SE & Co. KG",
    hq: "München",
    countryCode: "DE",
    founded: 2015,
    website: "https://www.personio.de",
  },
  logo: null,
  categories: { primary: "hr-software", secondary: ["zeiterfassungssoftware"] },
  tagline: "Modulare HR-Plattform mit Kernpaket und zubuchbaren Apps",
  bestFor: "Wachsende KMU mit 20–500 Mitarbeitenden",
  companySizes: ["klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.personio.de/preise/",
    note: "Personio veröffentlicht laut Drittquellen seit 2023 keine Listenpreise mehr; die Tarife heißen dort „Core“ und „Core Pro“. Die Preisseite des Anbieters war bei unserer Prüfung nicht abrufbar.",
    plans: [
      {
        id: "core",
        name: "Core",
        model: { type: "quote", note: "Preis auf Anfrage" },
        features: [
          "personalakte",
          "dokumente",
          "abwesenheiten",
          "zeiterfassung",
          "onboarding",
          "lohnvorbereitung",
          "self-service",
        ],
        highlights: [
          "Digitale Personalakte",
          "Abwesenheiten & Zeiterfassung",
          "Onboarding",
          "Vorbereitende Lohnbuchhaltung",
          "E-Signaturen (eingeschränkt)",
        ],
        limits: [
          "Recruiting, Performance und DATEV-Integration als Apps zubuchbar",
        ],
      },
      {
        id: "core-pro",
        name: "Core Pro",
        model: { type: "quote", note: "Preis auf Anfrage" },
        features: [
          "personalakte",
          "dokumente",
          "abwesenheiten",
          "zeiterfassung",
          "onboarding",
          "lohnvorbereitung",
          "self-service",
        ],
        highlights: ["Alles aus Core", "Weitere Funktionen laut Angebot"],
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
    personalakte: { status: "ja" },
    dokumente: { status: "ja" },
    esignatur: {
      status: "teilweise",
      note: "Laut Drittquellen im Core-Tarif eingeschränkt",
    },
    organigramm: { status: "unbekannt" },
    rollen: { status: "unbekannt" },
    abwesenheiten: { status: "ja" },
    zeiterfassung: { status: "ja", note: "Standard-Arbeitszeitmodelle" },
    schichtplanung: { status: "unbekannt" },
    bewerbermanagement: { status: "addon", note: "App „Recruiting“" },
    karriereseite: {
      status: "addon",
      note: "Stellenanzeigen im Recruiting-Modul",
    },
    onboarding: { status: "ja" },
    feedback: { status: "addon", note: "App „Performance & Entwicklung“" },
    ziele: { status: "unbekannt" },
    lernen: { status: "unbekannt" },
    umfragen: { status: "unbekannt" },
    lohnvorbereitung: { status: "ja" },
    "datev-lohn": { status: "addon", note: "DATEV LODAS und Lohn und Gehalt" },
    lohnabrechnung: { status: "addon", note: "Personio Payroll" },
    spesen: { status: "unbekannt" },
    "self-service": {
      status: "ja",
      note: "Lohnzettel in der Personalakte abrufbar",
    },
    app: { status: "unbekannt" },
    reports: { status: "unbekannt" },
    api: { status: "unbekannt" },
    sso: { status: "unbekannt" },
    hinweisgeber: { status: "unbekannt" },
  },
  integrations: ["datev"],
  compliance: {
    serverLocation: "unbekannt",
    serverNote:
      "Drittquellen nennen AWS in Frankfurt; vom Anbieter nicht bestätigt (Trust Center prüfen)",
    avv: "unbekannt",
    certifications: [],
    certificationNote:
      "Drittquellen nennen ISO 27001 und ISO 27017; Zertifikat im Trust Center prüfen",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "trustlists.org (Drittquelle)",
      url: "https://trustlists.org/company/personio/",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "unbekannt" },
  platforms: ["web"],
  scores: {
    funktionen: 73,
    bedienbarkeit: 70,
    preisLeistung: 58,
    datenschutz: 68,
    support: 70,
    integrationen: 78,
  },
  scoreNotes: {
    funktionen:
      "Auf Basis von Drittquellen: Kern stark, Recruiting, Performance und Payroll als zubuchbare Apps.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Keine veröffentlichten Preise, viele Funktionen nur als kostenpflichtige Apps.",
    datenschutz:
      "Hosting und Zertifikate nur aus Drittquellen bekannt – im Trust Center prüfen.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen:
      "DATEV-Integration (LODAS, Lohn und Gehalt) als App; Marktplatz nicht geprüft.",
  },
  pros: [
    {
      title: "Starker Kern",
      detail:
        "Personalakte, Abwesenheiten, Zeiterfassung und Onboarding sind laut Drittquellen im Kernpaket enthalten.",
    },
    {
      title: "DATEV LODAS und Lohn und Gehalt",
      detail: "Die DATEV-Integration unterstützt beide DATEV-Lohnprogramme.",
    },
  ],
  cons: [
    {
      title: "Keine Preise öffentlich",
      detail:
        "Seit 2023 nennt Personio keine Listenpreise mehr – du brauchst ein Angebot.",
    },
    {
      title: "Viele Apps kosten extra",
      detail:
        "Recruiting, Performance, Vergütung und DATEV-Integration sind einzeln buchbar.",
    },
  ],
  verdict: {
    short:
      "Personio bietet einen soliden HR-Kern für wachsende KMU. Recruiting, Performance und die DATEV-Integration kommen als kostenpflichtige Apps hinzu – Preise gibt es nur im Angebot.",
    idealFor: [
      "Wachsende KMU, die mit dem Kern starten und Module später ergänzen",
      "Unternehmen, deren Steuerbüro mit DATEV arbeitet",
    ],
    notIdealFor: ["Teams, die ohne Verkaufsgespräch die Kosten kennen wollen"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis von Drittquellen (Stand 02.11.2026), weil die Anbieterseite nicht abrufbar war. Prüfung beim Anbieter und Praxistest stehen aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "trusted.de",
      url: "https://trusted.de/personio-hr-betriebssystem-kosten",
      accessedAt: checked,
    },
    {
      name: "usagepricing.com",
      url: "https://www.usagepricing.com/blueprint/personio",
      accessedAt: checked,
    },
    {
      name: "fuer-gruender.de",
      url: "https://www.fuer-gruender.de/wissen/unternehmen-fuehren/personal/hr-software-vergleich/personio/",
      accessedAt: checked,
    },
    {
      name: "trustlists.org",
      url: "https://trustlists.org/company/personio/",
      accessedAt: checked,
    },
  ],
  changelog: [
    { date: checked, note: "Erstmals erfasst auf Basis von Drittquellen." },
  ],
} satisfies ToolInput;
