import type { ToolInput } from "@/lib/schema";
import { buchhaltungFeatures, checked } from "./_buchhaltung";

export const datevUnternehmenOnline = {
  slug: "datev-unternehmen-online",
  name: "DATEV Unternehmen online",
  status: "published",
  isPlaceholder: false,
  vendor: {
    name: "DATEV eG",
    hq: "Nürnberg",
    countryCode: "DE",
    website: "https://www.datev.de/",
  },
  logo: null,
  categories: { primary: "buchhaltungssoftware", secondary: [] },
  tagline:
    "Belege, Bank und Zusammenarbeit mit dem Steuerbüro direkt im DATEV-Rechenzentrum",
  bestFor: "Unternehmen, deren Steuerbüro mit DATEV bucht",
  companySizes: ["kleinst", "klein", "mittel"],
  pricing: {
    currency: "EUR",
    checkedAt: checked,
    sourceUrl:
      "https://www.datev.de/web/de/loesungen/unternehmer/rechnungswesen/buchfuehrung/buchfuehrung-effizienter-gestalten/belege-digitalisieren-mit-unternehmen-online/",
    note: "DATEV veröffentlicht keine Endkundenpreise. Die Nutzung läuft über die Steuerkanzlei, die die Kosten nach ihrem eigenen Vertrag weitergibt.",
    plans: [
      {
        id: "kanzlei",
        name: "Über die Steuerkanzlei",
        model: { type: "quote", note: "Preis über die Steuerkanzlei" },
        features: [
          "belegerfassung",
          "belegarchiv",
          "bankanbindung",
          "zahlungen",
          "steuerberater-zugang",
          "datev-export",
        ],
        highlights: [
          "Belege digitalisieren mit Texterkennung",
          "Bankkonten direkt im DATEV-System",
          "Überweisungen und Lastschriften",
          "Daten im DATEV-Rechenzentrum",
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
  features: buchhaltungFeatures({
    belegerfassung: {
      status: "ja",
      note: "Kostenlose Texterkennung (OCR) laut DATEV",
    },
    belegarchiv: {
      status: "ja",
      note: "Nachvollziehbar, unveränderbar und manipulationssicher laut DATEV",
    },
    buchungen: {
      status: "teilweise",
      note: "Gebucht wird in der Regel von der Kanzlei",
    },
    ustva: {
      status: "teilweise",
      note: "Übermittlung in der Regel durch die Kanzlei",
    },
    bankanbindung: {
      status: "ja",
      note: "Konten direkt an das DATEV-System angebunden",
    },
    zahlungen: { status: "ja", note: "Überweisungen und Lastschriften" },
    "steuerberater-zugang": {
      status: "ja",
      note: "Gemeinsamer Datenbestand mit der Kanzlei",
    },
    "datev-export": { status: "ja", note: "Daten liegen direkt in DATEV" },
  }),
  integrations: ["datev"],
  compliance: {
    serverLocation: "DE",
    serverNote: "DATEV-Rechenzentrum in der Region Nürnberg",
    avv: "unbekannt",
    certifications: ["ISO_27001"],
    certificationNote:
      "DATEV-Rechenzentrum laut DATEV durch DQS nach ISO/IEC 27001:2022 zertifiziert.",
    sso: "unbekannt",
    twoFactor: "unbekannt",
    onPremise: "nein",
    source: {
      name: "DATEV",
      url: "https://www.datev.de/web/de/m/ueber-datev/das-unternehmen/innovation-sicherheit-und-qualitaet/",
      accessedAt: checked,
    },
  },
  support: {
    languages: ["de"],
    channels: [],
    onboarding: "begleitet",
    note: "Einrichtung in der Regel über die Steuerkanzlei",
  },
  platforms: ["web", "ios", "android"],
  scores: {
    funktionen: 70,
    bedienbarkeit: 70,
    preisLeistung: 60,
    datenschutz: 90,
    support: 70,
    integrationen: 90,
  },
  scoreNotes: {
    funktionen:
      "Belege, Bank und Zahlungen; Buchhaltung und Steuermeldungen übernimmt in der Regel die Kanzlei.",
    bedienbarkeit:
      "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    preisLeistung:
      "Keine veröffentlichten Preise; die Kosten hängen vom Vertrag mit der Kanzlei ab.",
    datenschutz:
      "Eigenes Rechenzentrum in Nürnberg, nach ISO/IEC 27001 zertifiziert.",
    support: "Noch nicht im Praxistest geprüft – bis dahin neutral bewertet.",
    integrationen:
      "Daten liegen direkt in DATEV – keine Schnittstelle zur Kanzlei nötig.",
  },
  pros: [
    {
      title: "Ein Datenbestand mit der Kanzlei",
      detail:
        "Kein Export nötig: Belege und Kontoumsätze liegen direkt bei DATEV.",
    },
    {
      title: "Zertifiziertes Rechenzentrum",
      detail:
        "DATEV betreibt ein eigenes, nach ISO/IEC 27001 zertifiziertes Rechenzentrum in Nürnberg.",
    },
    {
      title: "Bank direkt angebunden",
      detail:
        "Kontoumsätze abrufen sowie Überweisungen und Lastschriften ausführen.",
    },
  ],
  cons: [
    {
      title: "Keine veröffentlichten Preise",
      detail:
        "Die Kosten legt die Kanzlei fest; vergleichen lassen sie sich nur über Angebote.",
    },
    {
      title: "Nur mit DATEV-Kanzlei",
      detail:
        "Ohne Steuerbüro, das mit DATEV arbeitet, ergibt die Lösung wenig Sinn.",
    },
    {
      title: "Wenig eigene Buchhaltung",
      detail:
        "Für Unternehmen, die selbst buchen und Rechnungen schreiben wollen, sind andere Lösungen komfortabler.",
    },
  ],
  verdict: {
    short:
      "DATEV Unternehmen online ist die naheliegende Wahl, wenn dein Steuerbüro mit DATEV arbeitet und die Buchhaltung übernimmt. Du lieferst Belege und Bankdaten, die Kanzlei bucht. Die Kosten erfährst du nur von deiner Kanzlei.",
    idealFor: [
      "Unternehmen, deren Kanzlei die Buchhaltung übernimmt",
      "Unternehmen mit hohen Anforderungen an das Rechenzentrum",
    ],
    notIdealFor: [
      "Selbstständige, die selbst buchen und Rechnungen schreiben wollen",
    ],
  },
  review: {
    method: "analyse",
    testSetup:
      "Analyse auf Basis der Produkt- und Sicherheitsseiten von DATEV (Stand 02.11.2026). Ein Praxistest steht noch aus.",
    authorId: "redaktion",
    editorId: "redaktion",
    publishedAt: checked,
    updatedAt: checked,
  },
  sources: [
    {
      name: "DATEV",
      url: "https://www.datev.de/web/de/loesungen/unternehmer/rechnungswesen/buchfuehrung/buchfuehrung-effizienter-gestalten/belege-digitalisieren-mit-unternehmen-online/",
      accessedAt: checked,
    },
    {
      name: "DATEV",
      url: "https://www.datev.de/web/de/m/ueber-datev/das-unternehmen/innovation-sicherheit-und-qualitaet/",
      accessedAt: checked,
    },
  ],
  changelog: [
    {
      date: checked,
      note: "Funktionen und Rechenzentrumsangaben erstmals erfasst.",
    },
  ],
} satisfies ToolInput;
