import type { ComparisonInput } from "@/lib/schema";

// Drafts (isPlaceholder) until both tools are tested hands-on. Facts come from the tool files.
const dates = { publishedAt: "2026-11-03", updatedAt: "2026-11-03" };
const people = { authorId: "redaktion", editorId: "redaktion" };
const untested = {
  winner: "unentschieden",
  note: "Noch nicht im Praxistest verglichen.",
};
const usdOnly = {
  winner: "unentschieden",
  note: "Beide Preisseiten zeigten uns nur US-Dollar; Euro-Preise nicht verifiziert.",
};

export const asanaVsMonday = {
  slug: "asana-vs-monday",
  toolA: "asana",
  toolB: "monday",
  category: "projektmanagement-software",
  isPlaceholder: false,
  seo: {
    title: "Asana vs. monday.com (2026): Der große Vergleich",
    description:
      "Asana oder monday.com? Ansichten, Automatisierung, Gratis-Tarif, Mindestnutzer und Preise im direkten Vergleich der beiden Projektmanagement-Tools.",
    h1: "Asana vs. monday.com: Welches Projektmanagement-Tool passt zu dir?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Asana ist strukturierter und stark bei Projekten, Portfolios und Zielen, mit unbegrenzten Automatisierungen ab Starter. monday.com ist flexibler und eignet sich auch für Prozesse jenseits klassischer Projekte, begrenzt aber Automatisierungen und verlangt mindestens drei Lizenzen.",
    chooseAIf: [
      "du viele parallele Projekte mit Zielen und Portfolios steuerst",
      "du unbegrenzte Automatisierungen willst",
      "einzelne Nutzer ohne Mindestmenge starten sollen",
    ],
    chooseBIf: [
      "du Workflows frei gestalten willst",
      "das Tool auch für CRM oder Abläufe dienen soll",
      "dein Team visuelle Boards bevorzugt",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "unentschieden",
      note: "Asana stark bei Portfolios und Zielen, monday.com bei flexiblen Boards.",
    },
    bedienbarkeit: untested,
    preisLeistung: usdOnly,
    datenschutz: {
      winner: "unentschieden",
      note: "Serverstandort für Kunden in Deutschland bei beiden nicht geprüft.",
    },
    support: untested,
    integrationen: {
      winner: "unentschieden",
      note: "Beide mit vielen Integrationen und API.",
    },
  },
  featureGroupVerdicts: {
    planung: {
      winner: "unentschieden",
      note: "Listen, Boards, Kalender und Zeitleiste bei beiden.",
    },
    steuerung: {
      winner: "asana",
      note: "Unbegrenzte Automatisierungen ab Starter.",
    },
    zusammenarbeit: {
      winner: "unentschieden",
      note: "Gäste und Apps bei beiden.",
    },
    technik: {
      winner: "unentschieden",
      note: "API bei beiden; SSO in Enterprise.",
    },
  },
  personas: [
    {
      label: "Marketingteam mit 10 Personen",
      pick: "asana",
      reason: "Kampagnen als Projekte mit Zeitleiste und Zielen.",
    },
    {
      label: "Operations-Team mit eigenen Abläufen",
      pick: "monday",
      reason: "Boards lassen sich frei für Prozesse anpassen.",
    },
    {
      label: "Freelancer-Duo",
      pick: "asana",
      reason: "Gratis für zwei Nutzer, ohne Mindestlizenzen im Bezahltarif.",
    },
  ],
  migration:
    "Beide importieren CSV-Dateien; monday.com und Asana bieten zusätzlich Import-Assistenten. Übertrage zuerst aktive Projekte, lege Felder und Status vorher an und archiviere abgeschlossene Projekte im alten Tool.",
  faqs: [
    {
      q: "Welches Tool hat den besseren Gratis-Tarif?",
      a: "Beide sind für zwei Nutzer kostenlos. Asana Personal bietet unbegrenzte Aufgaben und Projekte, monday.com Free bis zu drei Boards.",
    },
    {
      q: "Was kosten Asana und monday.com in Euro?",
      a: "Beide Preisseiten zeigten uns nur US-Dollar-Preise. Den Euro-Preis zeigt der jeweilige Anbieter je nach Rechnungsland im Bestellprozess.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const clickupVsMonday = {
  slug: "clickup-vs-monday",
  toolA: "clickup",
  toolB: "monday",
  category: "projektmanagement-software",
  isPlaceholder: false,
  seo: {
    title: "ClickUp vs. monday.com (2026): Der große Vergleich",
    description:
      "ClickUp oder monday.com? Gratis-Tarif, Docs, Automatisierung, Ressourcen und EU-Datenresidenz im direkten Vergleich der beiden Work-Management-Tools.",
    h1: "ClickUp vs. monday.com: Welches Tool passt zu deinem Team?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "ClickUp bietet mehr Funktionen fürs Geld, schon im Gratis-Tarif. monday.com ist aufgeräumter und flexibel für Abläufe aller Art. Bei beiden kostet EU-Hosting oder Ressourcenmanagement den Enterprise-Tarif bzw. ist nicht belegt.",
    chooseAIf: [
      "du Aufgaben, Docs und Whiteboards in einem Tool willst",
      "du einen starken Gratis-Tarif suchst",
      "Zeiterfassung ab Business reichen soll",
    ],
    chooseBIf: [
      "dein Team eine übersichtliche Oberfläche braucht",
      "du Prozesse visuell abbilden willst",
      "du viele Vorlagen nutzen willst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "clickup",
      note: "ClickUp bündelt Docs, Sprints, Ressourcen und Zeiterfassung.",
    },
    bedienbarkeit: untested,
    preisLeistung: usdOnly,
    datenschutz: {
      winner: "clickup",
      note: "ClickUp nennt EU-Datenresidenz in Enterprise; bei monday.com nicht geprüft.",
    },
    support: untested,
    integrationen: {
      winner: "unentschieden",
      note: "Beide mit vielen Integrationen und API.",
    },
  },
  featureGroupVerdicts: {
    planung: {
      winner: "unentschieden",
      note: "Boards, Kalender und Gantt bei beiden.",
    },
    steuerung: {
      winner: "clickup",
      note: "Ressourcen und Zeiterfassung ab Business.",
    },
    zusammenarbeit: { winner: "clickup", note: "Docs schon im Gratis-Tarif." },
    technik: {
      winner: "unentschieden",
      note: "API bei beiden; SSO in Enterprise.",
    },
  },
  personas: [
    {
      label: "Start-up mit 6 Personen",
      pick: "clickup",
      reason: "Viele Funktionen schon im Gratis-Tarif.",
    },
    {
      label: "Vertriebsinnendienst mit festen Abläufen",
      pick: "monday",
      reason: "Flexible Boards mit Vorlagen.",
    },
    {
      label: "Agentur mit Zeiterfassung",
      pick: "clickup",
      reason: "Timesheets in Business.",
    },
  ],
  migration:
    "ClickUp und monday.com importieren aus CSV und aus vielen anderen Tools. Plane Felder, Status und Automatisierungen im Ziel-Tool neu, statt sie eins zu eins zu übertragen.",
  faqs: [
    {
      q: "Welches Tool hostet in der EU?",
      a: "ClickUp nennt Datenresidenz in der EU für Enterprise und Max. Für monday.com haben wir den Serverstandort nicht geprüft.",
    },
    {
      q: "Gibt es Mindestnutzer?",
      a: "monday.com-Bezahltarife starten laut FAQ ab drei Nutzern. Für ClickUp nennt die Preisseite keine Mindestzahl.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const jiraVsAsana = {
  slug: "jira-vs-asana",
  toolA: "jira",
  toolB: "asana",
  category: "projektmanagement-software",
  isPlaceholder: false,
  seo: {
    title: "Jira vs. Asana (2026): Der große Vergleich",
    description:
      "Jira oder Asana? Agile Softwareentwicklung gegen Projektarbeit im Fachbereich: Scrum, Boards, Gratis-Tarif und Integrationen im direkten Vergleich.",
    h1: "Jira vs. Asana: Für Softwareteams oder Fachabteilungen?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Jira ist für agile Software- und IT-Teams mit Sprints, Backlogs und Tickets gebaut und bis zehn Benutzer kostenlos. Asana ist zugänglicher für Fachabteilungen wie Marketing und Operations.",
    chooseAIf: [
      "dein Team Software mit Scrum oder Kanban entwickelt",
      "du Sprints, Backlogs und Burndown-Berichte brauchst",
      "bis zu 10 Personen kostenlos arbeiten sollen",
    ],
    chooseBIf: [
      "Fachabteilungen ohne agile Methoden das Tool nutzen",
      "du Portfolios und Ziele steuern willst",
      "eine einfache Oberfläche wichtig ist",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "unentschieden",
      note: "Jira für agile Entwicklung, Asana für allgemeine Projektarbeit.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "jira",
      note: "Jira ist für bis zu 10 Benutzer kostenlos, Asana Personal für 2.",
    },
    datenschutz: {
      winner: "unentschieden",
      note: "Datenresidenz bei beiden nicht geprüft.",
    },
    support: untested,
    integrationen: {
      winner: "jira",
      note: "Atlassian Marketplace mit sehr vielen Apps.",
    },
  },
  featureGroupVerdicts: {
    planung: {
      winner: "unentschieden",
      note: "Boards und Zeitleisten bei beiden.",
    },
    steuerung: {
      winner: "unentschieden",
      note: "Automatisierung bei beiden; Asana mit Workload ab Advanced.",
    },
    zusammenarbeit: {
      winner: "asana",
      note: "Gäste ab Starter; Dokumentation bei Jira über Confluence.",
    },
    technik: { winner: "unentschieden", note: "Offene APIs bei beiden." },
  },
  personas: [
    {
      label: "Softwareteam mit 8 Entwicklern",
      pick: "jira",
      reason: "Sprints und Backlogs, kostenlos bis 10 Benutzer.",
    },
    {
      label: "Marketingabteilung",
      pick: "asana",
      reason: "Zugängliche Projektansichten ohne Scrum-Begriffe.",
    },
    {
      label: "IT-Abteilung mit Tickets",
      pick: "jira",
      reason: "Vorgänge und Workflows für IT-Prozesse.",
    },
  ],
  migration:
    "Asana und Jira lassen sich über CSV oder Integrationen verbinden. Viele Unternehmen nutzen beide parallel: Jira in der Entwicklung, Asana in den Fachbereichen.",
  faqs: [
    {
      q: "Ist Jira kostenlos?",
      a: "Ja, der Free-Tarif gilt für bis zu 10 Benutzer mit 2 GB Speicher und Community-Support.",
    },
    {
      q: "Kann Asana Scrum?",
      a: "Asana bietet Boards und Vorlagen für agile Arbeit; Backlogs, Sprints und Burndown-Berichte sind aber die Kernstärke von Jira.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const aworkVsAsana = {
  slug: "awork-vs-asana",
  toolA: "awork",
  toolB: "asana",
  category: "projektmanagement-software",
  isPlaceholder: false,
  seo: {
    title: "awork vs. Asana (2026): Deutsche Alternative im Vergleich",
    description:
      "awork oder Asana? Projektmanagement aus Hamburg mit Zeiterfassung und Hosting in Deutschland gegen den US-Klassiker: Preise und Funktionen im Vergleich.",
    h1: "awork vs. Asana: Deutsche Alternative oder US-Klassiker?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "awork ist auf Agenturen und Dienstleister zugeschnitten: Zeiterfassung und Auslastung inklusive, Hosting in Deutschland, transparente Euro-Preise. Asana ist breiter aufgestellt, hat einen Gratis-Tarif und mehr Integrationen.",
    chooseAIf: [
      "du Zeiten erfassen und Auslastung planen willst",
      "Daten in Deutschland liegen sollen",
      "du feste Euro-Preise brauchst",
    ],
    chooseBIf: [
      "du kostenlos starten willst",
      "du Portfolios und Ziele brauchst",
      "dein Team viele Integrationen nutzt",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "unentschieden",
      note: "awork mit Zeiterfassung ab Basic, Asana mit Portfolios und Zielen ab Advanced.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "awork",
      note: "awork ab 5 € pro Nutzer mit Zeiterfassung; Asana-Preise nur in US-Dollar sichtbar.",
    },
    datenschutz: {
      winner: "awork",
      note: "awork hostet in Deutschland und ist nach ISO 27001 zertifiziert.",
    },
    support: untested,
    integrationen: {
      winner: "asana",
      note: "Asana mit über 100 Integrationen.",
    },
  },
  featureGroupVerdicts: {
    planung: {
      winner: "unentschieden",
      note: "Boards und Kalender bei beiden; Gantt bei Asana ab Starter.",
    },
    steuerung: {
      winner: "awork",
      note: "Auslastung ab Standard, Zeiterfassung ab Basic.",
    },
    zusammenarbeit: { winner: "asana", note: "Kostenlose Gäste ab Starter." },
    technik: {
      winner: "unentschieden",
      note: "API bei beiden, SSO in Enterprise.",
    },
  },
  personas: [
    {
      label: "Agentur mit 20 Personen",
      pick: "awork",
      reason: "Zeiterfassung und Auslastung in einem Tool.",
    },
    {
      label: "Start-up mit 2 Gründern",
      pick: "asana",
      reason: "Gratis-Tarif für zwei Nutzer.",
    },
    {
      label: "Beratung mit Datenschutzvorgaben",
      pick: "awork",
      reason: "Hosting in Deutschland, ISO 27001.",
    },
  ],
  migration:
    "Exportiere Projekte und Aufgaben aus Asana als CSV und importiere sie in awork. Zeiterfassungsdaten aus Drittanbieter-Tools solltest du zum Monatsende abschließen und separat archivieren.",
  faqs: [
    {
      q: "Was kostet awork für 10 Nutzer?",
      a: "awork Standard: 10 × 15 € = 150 € pro Monat bei jährlicher Zahlung, monatlich 10 × 18 € = 180 €. Alle Preise netto.",
    },
    {
      q: "Hat Asana eine Zeiterfassung?",
      a: "Asana nennt Zeiterfassung im Advanced-Tarif; im Gratis-Tarif nur über Integrationen.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;
