import type { ToolInput } from "@/lib/schema";
import { analyse, checkedPm as checked, pmFeatures } from "./_pm";

const basic = [
  "aufgaben",
  "kanban",
  "kalender",
  "zeiterfassung",
  "vorlagen",
  "app",
];
const standard = [...basic, "workload", "automatisierung", "dokumente"];
const professional = [...standard, "berichte", "api"];
const perUser = (monthly: number, annualPerMonth: number) =>
  ({
    type: "per_unit",
    unit: "nutzer",
    price: { monthly, annualPerMonth },
  }) as const;
const source = "https://www.awork.com/de/preise";

export const awork = {
  slug: "awork",
  name: "awork",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "awork GmbH",
    hq: "Hamburg",
    countryCode: "DE",
    website: "https://www.awork.com/de",
  },
  logo: null,
  categories: {
    primary: "projektmanagement-software",
    secondary: ["zeiterfassungssoftware"],
  },
  tagline:
    "Projekte, Zeiterfassung und Auslastung aus Hamburg – gehostet in Deutschland",
  bestFor: "Agenturen und Dienstleister mit 5–100 Personen",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: source,
    note: "Preise pro Nutzer und Monat zzgl. USt.; jährliche Zahlung günstiger. Die Preisblöcke der Seite zeigen mehrere Währungen, der Basic-Jahrespreis ist mit „ab 5 €“ angegeben. 30 Tage Geld-zurück-Garantie für Basic, Standard und Professional. Mengenrabatt ab 50 Nutzern. KI-Pakete von 15 € bis 120 € pro Nutzer und Monat.",
    plans: [
      {
        id: "basic",
        name: "Basic",
        model: perUser(1000, 500),
        features: basic,
        highlights: [
          "Unbegrenzte Projekte",
          "Zeiterfassung",
          "Persönlicher Planer",
          "Für 1–5 Nutzer",
        ],
      },
      {
        id: "standard",
        name: "Standard",
        model: perUser(1800, 1500),
        features: standard,
        highlights: [
          "Auslastungsübersicht",
          "Abwesenheiten",
          "Automatisierung pro Projekt",
          "Für 2–20 Nutzer",
        ],
        recommended: true,
      },
      {
        id: "professional",
        name: "Professional",
        model: perUser(2900, 2300),
        features: professional,
        highlights: [
          "Unbegrenzte Automatisierungen",
          "Erweiterte Zeitberichte",
          "Private Projekte",
          "Telefon-Support",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        model: { type: "quote", minUnits: 100 },
        features: [...professional, "sso"],
        highlights: [
          "SSO & SCIM",
          "Premium-SLA",
          "Datenmigration",
          "Kauf auf Rechnung",
        ],
      },
    ],
    contract: { minTermMonths: null, noticePeriod: null, monthlyBilling: "ja" },
    history: [
      {
        date: checked,
        planId: "basic",
        price: { monthly: 1000, annualPerMonth: 500 },
      },
      {
        date: checked,
        planId: "standard",
        price: { monthly: 1800, annualPerMonth: 1500 },
      },
      {
        date: checked,
        planId: "professional",
        price: { monthly: 2900, annualPerMonth: 2300 },
      },
    ],
  },
  trial: { available: "ja", creditCard: false },
  freePlan: "nein",
  features: pmFeatures({
    aufgaben: { status: "ja" },
    kanban: { status: "ja" },
    kalender: { status: "ja", note: "Persönlicher Planer" },
    workload: { status: "ja", fromPlan: "standard" },
    automatisierung: {
      status: "ja",
      fromPlan: "standard",
      note: "Standard: eine pro Projekt, Professional unbegrenzt",
    },
    vorlagen: { status: "ja", note: "Basic: eine Vorlage, Standard: sechs" },
    dokumente: {
      status: "ja",
      fromPlan: "standard",
      note: "Basic eingeschränkt",
    },
    berichte: {
      status: "ja",
      fromPlan: "professional",
      note: "Erweiterte Zeitberichte",
    },
    zeiterfassung: { status: "ja" },
    app: { status: "ja", note: "Mobile und Desktop" },
    api: {
      status: "ja",
      fromPlan: "professional",
      note: "Erweiterte Integrationen",
    },
    sso: { status: "ja", fromPlan: "enterprise" },
  }),
  integrations: [
    "microsoft-365",
    "google-workspace",
    "slack",
    "microsoft-teams",
  ],
  compliance: {
    serverLocation: "DE",
    serverNote: "Hosting auf Microsoft-Servern in Deutschland",
    avv: "unbekannt",
    certifications: ["ISO_27001"],
    sso: "ja",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: { name: "awork", url: source, accessedAt: checked },
  },
  support: {
    languages: ["de", "en"],
    channels: ["chat", "email"],
    onboarding: "unbekannt",
    note: "Telefon-Support ab Professional",
  },
  platforms: ["web", "windows", "macos", "ios", "android"],
  scores: {
    funktionen: 80,
    bedienbarkeit: 70,
    preisLeistung: 80,
    datenschutz: 90,
    support: 70,
    integrationen: 70,
  },
  scoreNotes: {
    funktionen: "Projekte, Zeiterfassung und Auslastung in einem Tool.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Ab 5 € pro Nutzer bei Jahreszahlung, Euro-Preise transparent.",
    datenschutz: "Hosting in Deutschland, ISO 27001.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Standard-Integrationen, erweiterte ab Professional.",
  },
  pros: [
    {
      title: "Hosting in Deutschland",
      detail: "Microsoft-Server in Deutschland, ISO 27001.",
    },
    {
      title: "Zeiterfassung inklusive",
      detail: "Schon im Basic-Tarif ohne Zusatzmodul.",
    },
  ],
  cons: [
    {
      title: "Kein Gratis-Tarif",
      detail: "Nach dem Test ist ein Bezahltarif nötig.",
    },
    {
      title: "Automatisierung begrenzt",
      detail: "Standard erlaubt eine Automatisierung pro Projekt.",
    },
  ],
  verdict: {
    short:
      "awork ist eine starke deutsche Alternative für Agenturen und Dienstleister: Projekte, Zeiterfassung und Auslastung in einem Tool, gehostet in Deutschland und mit transparenten Euro-Preisen.",
    idealFor: [
      "Agenturen mit Zeiterfassung",
      "Teams, die Hosting in Deutschland wollen",
    ],
    notIdealFor: ["Softwareteams mit Scrum-Prozessen"],
  },
  review: analyse("der Preisseite des Anbieters"),
  sources: [{ name: "awork", url: source, accessedAt: checked }],
  changelog: [
    { date: checked, note: "Preise, Tarife und Hosting erstmals erfasst." },
  ],
} satisfies ToolInput;
