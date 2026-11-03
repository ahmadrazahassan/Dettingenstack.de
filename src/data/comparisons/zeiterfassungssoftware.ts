import type { ComparisonInput } from "@/lib/schema";

// Drafts (isPlaceholder) until both tools are tested hands-on. Facts come from the tool files.
const dates = { publishedAt: "2026-11-03", updatedAt: "2026-11-03" };
const people = { authorId: "redaktion", editorId: "redaktion" };
const untested = {
  winner: "unentschieden",
  note: "Noch nicht im Praxistest verglichen.",
};

export const clockodoVsPapershift = {
  slug: "clockodo-vs-papershift",
  toolA: "clockodo",
  toolB: "papershift",
  category: "zeiterfassungssoftware",
  isPlaceholder: false,
  seo: {
    title: "Clockodo vs. Papershift (2026): Der große Vergleich",
    description:
      "Clockodo oder Papershift? Arbeitszeit, Projektzeiten, Schichtplanung, DATEV-Export und Preise pro Mitarbeitendem im direkten Vergleich.",
    h1: "Clockodo vs. Papershift: Welche Zeiterfassung passt zu deinem Betrieb?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Clockodo ist die günstigere Wahl für Büro- und Projektteams mit Arbeits- und Projektzeiten. Papershift spielt seine Stärke in Schichtbetrieben aus: automatische Dienstpläne, Zuschläge und DATEV-Export, aber mit Grundgebühr.",
    chooseAIf: [
      "dein Team im Büro oder bei Kunden arbeitet",
      "du Projektzeiten auswerten und abrechnen willst",
      "du ohne Grundgebühr starten willst",
    ],
    chooseBIf: [
      "du Schichten planen musst",
      "Zuschläge automatisch berechnet werden sollen",
      "dein Steuerbüro DATEV oder LODAS nutzt",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "unentschieden",
      note: "Clockodo deckt Projektzeiten und Abrechnung ab, Papershift Schichtplanung und Zuschläge.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "clockodo",
      note: "Clockodo ab 3,80 € pro Nutzer; Papershift ab 3,60 € pro Mitarbeitendem plus 39 € Grundgebühr.",
    },
    datenschutz: {
      winner: "clockodo",
      note: "Beide hosten in Deutschland; Clockodo mit AVV im Trust Center und SSO ab Basic Plus.",
    },
    support: untested,
    integrationen: {
      winner: "papershift",
      note: "Papershift exportiert an DATEV und LODAS; Clockodo übergibt Zeiten an Rechnungsprogramme.",
    },
  },
  featureGroupVerdicts: {
    arbeitszeit: {
      winner: "papershift",
      note: "Papershift ergänzt Arbeitszeit um automatische Schichtplanung.",
    },
    erfassung: {
      winner: "unentschieden",
      note: "Beide per App, Browser und Tablet.",
    },
    projekte: {
      winner: "clockodo",
      note: "Projektzeiten, Budgets und Übergabe an Rechnungsprogramme.",
    },
    schnittstellen: {
      winner: "papershift",
      note: "DATEV- und LODAS-Export in Professional.",
    },
  },
  personas: [
    {
      label: "Agentur mit 15 Mitarbeitenden",
      pick: "clockodo",
      reason: "Projektzeiten und Abrechnung, kein Schichtplan nötig.",
    },
    {
      label: "Restaurant mit 30 Aushilfen",
      pick: "papershift",
      reason: "Automatische Schichtplanung und Zuschläge.",
    },
    {
      label: "Pflegedienst mit mehreren Standorten",
      pick: "papershift",
      reason: "Planung über Standorte und DATEV-Export.",
    },
  ],
  migration:
    "Exportiere Zeitkonten und Resturlaub zum Stichtag, übernimm sie als Startwerte und führe beide Systeme einen Abrechnungsmonat parallel. Bewahre die alten Zeitnachweise mindestens zwei Jahre auf.",
  faqs: [
    {
      q: "Was kosten Clockodo und Papershift für 15 Mitarbeitende?",
      a: "Clockodo Basic: 15 × 3,80 € = 57,00 € pro Monat bei jährlicher Zahlung. Papershift Core: 39 € Grundgebühr plus 15 × 3,60 € = 93,00 € pro Monat bei jährlicher Zahlung. Alle Preise netto.",
    },
    {
      q: "Welches Tool kann Schichtplanung?",
      a: "Papershift ab Premium, mit automatischer Besetzung in Professional. Für Clockodo nennt die Preisseite keine Schichtplanung.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const clockinVsCrewmeister = {
  slug: "clockin-vs-crewmeister",
  toolA: "clockin",
  toolB: "crewmeister",
  category: "zeiterfassungssoftware",
  isPlaceholder: false,
  seo: {
    title: "clockin vs. Crewmeister (2026): Der große Vergleich",
    description:
      "clockin oder Crewmeister? Zeiterfassung per App und Terminal, GPS, Urlaub, DATEV-Export und Preise pro Mitarbeitendem im direkten Vergleich.",
    h1: "clockin vs. Crewmeister: Welche Zeiterfassung passt zu deinem Betrieb?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Crewmeister ist die günstigste Zeiterfassung im Vergleich, mit DATEV und Schichtplan als Zusatzmodulen. clockin kostet mehr, enthält aber DATEV-Export, Abwesenheiten und Tablet-Terminal schon im Einstieg und richtet sich klar an Handwerk und Außendienst.",
    chooseAIf: [
      "du DATEV-Export ohne Zusatzmodul willst",
      "dein Team auf Baustellen arbeitet",
      "du Datafox-Hardware-Terminals nutzen willst",
    ],
    chooseBIf: [
      "der Preis im Vordergrund steht",
      "du ohne Vertragsbindung starten willst",
      "Projektzeiten schon im Einstieg dabei sein sollen",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "clockin",
      note: "clockin enthält Abwesenheiten und DATEV schon in Starter; bei Crewmeister Urlaub ab Easy, DATEV als Add-on.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "crewmeister",
      note: "Crewmeister ab 1,50 €, mit Urlaub 2 € pro Nutzer; clockin ab 3,90 € plus Pauschale unter 5 Nutzern.",
    },
    datenschutz: {
      winner: "crewmeister",
      note: "Beide hosten in Deutschland; Crewmeister nennt AWS Frankfurt, AVV und regelmäßige Penetrationstests.",
    },
    support: untested,
    integrationen: {
      winner: "clockin",
      note: "DATEV in allen Tarifen, API in Expert.",
    },
  },
  featureGroupVerdicts: {
    arbeitszeit: {
      winner: "clockin",
      note: "Abwesenheiten und Stundenkonten schon im Einstieg.",
    },
    erfassung: {
      winner: "unentschieden",
      note: "App, Terminal und GPS bei beiden (GPS bei clockin ab Pro).",
    },
    projekte: {
      winner: "crewmeister",
      note: "Projektzeiten ab Go; bei clockin als Zusatzmodul.",
    },
    schnittstellen: {
      winner: "clockin",
      note: "DATEV inklusive, API in Expert.",
    },
  },
  personas: [
    {
      label: "Dachdeckerbetrieb mit 12 Mitarbeitenden",
      pick: "clockin",
      reason: "Tablet-Terminal, GPS und DATEV-Export.",
    },
    {
      label: "Reinigungsfirma mit knappem Budget",
      pick: "crewmeister",
      reason: "Ab 2 € pro Nutzer inklusive Urlaubsplaner.",
    },
    {
      label: "Kleines Büro ohne DATEV-Steuerbüro",
      pick: "crewmeister",
      reason: "Günstig, ohne Vertragsbindung.",
    },
  ],
  migration:
    "Beide exportieren Zeiten. Übernimm Resturlaub und Zeitkonten zum Monatsende als Startwerte und bewahre die alten Nachweise auf.",
  faqs: [
    {
      q: "Was kosten clockin und Crewmeister für 15 Mitarbeitende?",
      a: "Crewmeister Easy: 15 × 2,00 € = 30,00 € pro Monat bei jährlicher Zahlung, DATEV plus 0,60 € pro Nutzer. clockin Starter: 15 × 3,90 € = 58,50 € pro Monat bei jährlicher Zahlung, DATEV inklusive. Alle Preise netto.",
    },
    {
      q: "Gehört Crewmeister zu ATOSS?",
      a: "Ja. Verantwortlich ist laut Impressum die ATOSS Aloud GmbH in München.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;
