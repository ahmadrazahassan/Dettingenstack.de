import type { ComparisonInput } from "@/lib/schema";

// Draft (isPlaceholder) until both systems are tested hands-on. Facts come from the tool files.
const untested = {
  winner: "unentschieden",
  note: "Noch nicht im Praxistest verglichen.",
};

export const docuwareVsElo = {
  slug: "docuware-vs-elo",
  toolA: "docuware",
  toolB: "elo",
  category: "dokumentenmanagement-software",
  isPlaceholder: false,
  seo: {
    title: "DocuWare vs. ELO (2026): Der DMS-Vergleich",
    description:
      "DocuWare oder ELO? Zwei etablierte DMS-Anbieter aus Deutschland im Vergleich: Ausrichtung, Betrieb, Partner und worauf du im Angebot achten solltest.",
    h1: "DocuWare vs. ELO: Welches DMS passt zu deinem Unternehmen?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "DocuWare und ELO sind zwei der bekanntesten DMS-Anbieter im deutschen Mittelstand. Beide veröffentlichen keine Listenpreise und arbeiten mit Partnern. DocuWare setzt den Schwerpunkt auf Belegprozesse und Workflows, ELO auf eine umfassende ECM-Suite mit Akten und Archiv. Die Entscheidung fällt in Demo und Angebot.",
    chooseAIf: [
      "deine Belegprozesse wie Rechnungseingang im Vordergrund stehen",
      "du Workflows schnell automatisieren willst",
      "du einen Partner mit DocuWare-Erfahrung in der Nähe hast",
    ],
    chooseBIf: [
      "du eine umfassende ECM-Suite mit Aktenstrukturen suchst",
      "du langfristig viele Abteilungen anbinden willst",
      "du einen ELO Business Partner in der Nähe hast",
    ],
  },
  criteriaNotes: {
    funktionen: untested,
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "unentschieden",
      note: "Beide ohne Listenpreise; vergleiche Angebote über drei bis fünf Jahre.",
    },
    datenschutz: {
      winner: "unentschieden",
      note: "Beide deutsche Hersteller; Hosting und Zertifikate im Angebot prüfen.",
    },
    support: untested,
    integrationen: untested,
  },
  featureGroupVerdicts: {
    ablage: untested,
    erfassung: untested,
    prozesse: untested,
    technik: untested,
  },
  personas: [
    {
      label: "Großhändler mit vielen Eingangsrechnungen",
      pick: "docuware",
      reason: "Fokus auf Belegprozesse und Workflows.",
    },
    {
      label: "Mittelständler mit Akten in allen Abteilungen",
      pick: "elo",
      reason: "Umfassende ECM-Suite mit Aktenstrukturen.",
    },
    {
      label: "Unternehmen mit festem IT-Partner",
      pick: "unentschieden",
      reason: "Den Ausschlag gibt oft der Partner vor Ort.",
    },
  ],
  migration:
    "Ein Wechsel zwischen DMS ist ein Projekt: Exportiere Dokumente samt Metadaten, prüfe die Vollständigkeit und bewahre das Altarchiv so lange lesbar, wie die Aufbewahrungsfristen laufen.",
  faqs: [
    {
      q: "Was kosten DocuWare und ELO?",
      a: "Beide veröffentlichen keine Listenpreise. Hol dir Angebote mit identischem Leistungsumfang und vergleiche Lizenz, Einführung, Wartung und Hosting über mehrere Jahre.",
    },
    {
      q: "Sind beide GoBD-konform?",
      a: "Ein DMS kann die revisionssichere Ablage unterstützen. GoBD-Konformität hängt zusätzlich von deiner Verfahrensdokumentation ab.",
    },
  ],
  authorId: "redaktion",
  editorId: "redaktion",
  publishedAt: "2026-11-03",
  updatedAt: "2026-11-03",
} satisfies ComparisonInput;
