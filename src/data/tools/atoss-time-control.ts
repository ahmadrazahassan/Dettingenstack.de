import type { ToolInput } from "@/lib/schema";
import { checkedZeit as checked, zeitFeatures } from "./_zeit";

export const atossTimeControl = {
  slug: "atoss-time-control",
  name: "ATOSS Time Control",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "ATOSS Software SE",
    hq: "München",
    countryCode: "DE",
    website: "https://www.atoss.com/de",
  },
  logo: null,
  categories: { primary: "zeiterfassungssoftware", secondary: [] },
  tagline:
    "Workforce-Management: Zeiterfassung, Personaleinsatzplanung und Zutrittskontrolle",
  bestFor: "Mittelständler mit komplexen Arbeitszeitmodellen",
  companySizes: ["mittel", "gross"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl: "https://www.atoss.com/de/atoss-time-control",
    note: "ATOSS veröffentlicht keine Preise; die Lösung gibt es in der Cloud oder On-Premises.",
    plans: [
      {
        id: "angebot",
        name: "Auf Anfrage",
        model: { type: "quote" },
        features: ["zeiterfassung", "schichtplanung", "app", "projektzeiten"],
        highlights: [
          "Zeiterfassung",
          "Personaleinsatzplanung",
          "Workflow-Self-Services",
          "Zutrittskontrolle",
          "Projekt- und Auftragsdaten",
        ],
      },
    ],
    addOns: [],
    oneTimeFees: [],
    contract: {
      minTermMonths: null,
      noticePeriod: null,
      monthlyBilling: "unbekannt",
    },
    history: [],
  },
  trial: { available: "unbekannt" },
  freePlan: "nein",
  features: zeitFeatures({
    zeiterfassung: { status: "ja", note: "Auch mobil" },
    schichtplanung: { status: "ja", note: "Personaleinsatzplanung (PEP)" },
    app: { status: "ja", note: "ATOSS Time Control Mobile" },
    projektzeiten: {
      status: "ja",
      note: "Projekt- und Auftragsdaten mit Kostenstellen",
    },
  }),
  integrations: [],
  compliance: {
    serverLocation: "unbekannt",
    serverNote:
      "Cloud (ATOSS CLOUD24/7) oder On-Premises; einen Cloud-Standort nennt die Produktseite nicht.",
    avv: "unbekannt",
    certifications: [],
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "ja",
    source: {
      name: "ATOSS",
      url: "https://www.atoss.com/de/atoss-time-control",
      accessedAt: checked,
    },
  },
  support: { languages: ["de"], channels: [], onboarding: "begleitet" },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 85,
    bedienbarkeit: 70,
    preisLeistung: 55,
    datenschutz: 65,
    support: 70,
    integrationen: 65,
  },
  scoreNotes: {
    funktionen:
      "Zeiterfassung, Personaleinsatzplanung, Self-Services und Zutrittskontrolle.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung: "Keine veröffentlichten Preise.",
    datenschutz:
      "On-Premises möglich; Cloud-Standort und Zertifikate auf der Produktseite nicht genannt.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen: "Lohnschnittstellen auf der Produktseite nicht genannt.",
  },
  pros: [
    {
      title: "Personaleinsatzplanung",
      detail:
        "Für komplexe Schicht- und Arbeitszeitmodelle mit Planung und Self-Services.",
    },
    {
      title: "Cloud oder On-Premises",
      detail: "Wahlweise im eigenen Rechenzentrum oder als Cloud-Lösung.",
    },
  ],
  cons: [
    { title: "Keine Preise", detail: "Kosten nur über ein Angebot." },
    {
      title: "Für kleine Betriebe überdimensioniert",
      detail:
        "Für einfache Arbeitszeiterfassung gibt es schlankere Tools – etwa Crewmeister aus derselben Gruppe.",
    },
  ],
  verdict: {
    short:
      "ATOSS Time Control richtet sich an Mittelständler mit komplexen Arbeitszeitmodellen, Personaleinsatzplanung und Zutritt. Für kleine Betriebe ist es überdimensioniert; ATOSS bietet dafür mit Crewmeister ein eigenes, günstiges Produkt.",
    idealFor: [
      "Mittelständler mit Schicht- und Gleitzeitmodellen",
      "Unternehmen, die On-Premises betreiben wollen",
    ],
    notIdealFor: ["Kleine Betriebe mit einfachen Arbeitszeiten"],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Produktseite des Anbieters (Stand 03.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "ATOSS",
      url: "https://www.atoss.com/de/atoss-time-control",
      accessedAt: checked,
    },
  ],
  changelog: [
    { date: checked, note: "Module und Betriebsmodelle erstmals erfasst." },
  ],
} satisfies ToolInput;
