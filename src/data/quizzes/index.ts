import type { Question } from "@/lib/finder";
import type { CategorySlug } from "@/lib/schema";
import {
  budgetQuestion,
  featureQuestion,
  priorityQuestion,
  serverQuestion,
} from "./_shared";
import { hrQuiz } from "./hr-software";

// Six questions per category (§12.3). Feature ids come from each category's taxonomy in src/data/categories.

const users = (
  title: string,
  max: number,
  defaultValue: number,
  hint = "Grobe Schätzung reicht – sie bestimmt Tarif und Kosten.",
): Question => ({
  id: "anzahl",
  type: "number",
  title,
  hint,
  min: 1,
  max,
  default: defaultValue,
});

const buchhaltung: Question[] = [
  users("Wie viele Personen arbeiten mit der Buchhaltung?", 15, 1),
  {
    id: "gewinnermittlung",
    type: "single",
    title: "Wie ermittelst du deinen Gewinn?",
    options: [
      {
        id: "euer",
        label: "Einnahmen-Überschuss-Rechnung (EÜR)",
        effects: [{ kind: "require-feature", featureId: "euer" }],
      },
      {
        id: "bilanz",
        label: "Bilanz",
        effects: [{ kind: "require-feature", featureId: "bilanz" }],
      },
      { id: "offen", label: "Macht mein Steuerbüro / weiß nicht", effects: [] },
    ],
  },
  featureQuestion("Was soll die Software für dich erledigen?", [
    {
      id: "rechnungen",
      label: "Rechnungen schreiben",
      features: ["rechnungen"],
    },
    {
      id: "belege",
      label: "Belege per App erfassen",
      features: ["belegerfassung", "app"],
    },
    {
      id: "bank",
      label: "Bankkonto anbinden",
      features: ["bankanbindung", "zahlungsabgleich"],
    },
    { id: "ustva", label: "Umsatzsteuer-Voranmeldung", features: ["ustva"] },
    {
      id: "datev",
      label: "Daten ans Steuerbüro (DATEV)",
      features: ["datev-export", "steuerberater-zugang"],
    },
    { id: "lohn", label: "Lohnabrechnung", features: ["lohn"], weight: 1 },
  ]),
  budgetQuestion(
    "Wie viel darf die Buchhaltung pro Monat kosten?",
    [
      { id: "15", label: "Bis 15 €", maxCents: 1500 },
      { id: "30", label: "Bis 30 €", maxCents: 3000 },
      { id: "60", label: "Bis 60 €", maxCents: 6000 },
    ],
    false,
  ),
  serverQuestion,
  priorityQuestion,
];

const rechnungen: Question[] = [
  users("Wie viele Personen schreiben Rechnungen?", 10, 1),
  {
    id: "erechnung",
    type: "single",
    title: "Musst du E-Rechnungen (XRechnung, ZUGFeRD) verschicken?",
    hint: "Im B2B-Bereich wird die E-Rechnung schrittweise Pflicht.",
    options: [
      {
        id: "ja",
        label: "Ja, für Geschäftskunden",
        effects: [{ kind: "require-feature", featureId: "e-rechnung-versand" }],
      },
      { id: "nein", label: "Nein, nur Privatkunden", effects: [] },
    ],
  },
  featureQuestion("Welche Funktionen brauchst du?", [
    {
      id: "abo",
      label: "Wiederkehrende Rechnungen",
      features: ["wiederkehrend"],
    },
    {
      id: "abschlag",
      label: "Abschlags- und Teilrechnungen",
      features: ["abschlag"],
    },
    { id: "mahnung", label: "Mahnwesen", features: ["mahnwesen"] },
    {
      id: "zahlung",
      label: "Online-Zahlung für Kunden",
      features: ["online-zahlung"],
    },
    {
      id: "zeit",
      label: "Zeiterfassung",
      features: ["zeiterfassung"],
      weight: 1,
    },
    { id: "lager", label: "Lager und Artikel", features: ["lager"], weight: 1 },
  ]),
  budgetQuestion(
    "Wie viel darf das Rechnungsprogramm pro Monat kosten?",
    [
      { id: "10", label: "Bis 10 €", maxCents: 1000 },
      { id: "20", label: "Bis 20 €", maxCents: 2000 },
      { id: "40", label: "Bis 40 €", maxCents: 4000 },
    ],
    false,
  ),
  serverQuestion,
  priorityQuestion,
];

const zeit: Question[] = [
  users("Wie viele Mitarbeitende sollen ihre Zeit erfassen?", 300, 15),
  featureQuestion("Wie und was soll erfasst werden?", [
    { id: "app", label: "Stempeln per App", features: ["app"] },
    { id: "terminal", label: "Terminal oder Tablet", features: ["terminal"] },
    { id: "schicht", label: "Schichtplanung", features: ["schichtplanung"] },
    { id: "projekt", label: "Projektzeiten", features: ["projektzeiten"] },
    {
      id: "urlaub",
      label: "Urlaub & Abwesenheiten",
      features: ["abwesenheiten"],
    },
  ]),
  {
    id: "lohn",
    type: "single",
    title: "Wohin sollen die Zeiten am Monatsende?",
    options: [
      {
        id: "datev",
        label: "An DATEV bzw. unser Steuerbüro",
        effects: [{ kind: "require-feature", featureId: "datev-lohn" }],
      },
      {
        id: "rechnung",
        label: "In Kundenrechnungen",
        effects: [
          { kind: "prefer-feature", featureId: "projektabrechnung", weight: 2 },
        ],
      },
      { id: "offen", label: "Noch offen", effects: [] },
    ],
  },
  budgetQuestion(
    "Wie hoch ist dein Budget pro Mitarbeitendem und Monat?",
    [
      { id: "3", label: "Bis 3 €", maxCents: 300 },
      { id: "6", label: "3 bis 6 €", maxCents: 600 },
      { id: "12", label: "Über 6 €", maxCents: 1200 },
    ],
    true,
  ),
  serverQuestion,
  priorityQuestion,
];

const crm: Question[] = [
  users("Wie viele Personen arbeiten im Vertrieb mit dem CRM?", 100, 5),
  featureQuestion("Was soll das CRM können?", [
    {
      id: "pipeline",
      label: "Deals in einer Pipeline",
      features: ["pipeline", "mehrere-pipelines"],
    },
    {
      id: "mail",
      label: "E-Mails automatisch zuordnen",
      features: ["email-sync"],
    },
    {
      id: "auto",
      label: "Automatisierung & Sequenzen",
      features: ["automatisierung", "sequenzen"],
    },
    { id: "angebote", label: "Angebote erstellen", features: ["angebote"] },
    { id: "prognose", label: "Umsatzprognosen", features: ["prognosen"] },
    { id: "app", label: "Mobile App", features: ["app"], weight: 1 },
  ]),
  {
    id: "anbindung",
    type: "single",
    title: "Womit soll das CRM verbunden werden?",
    options: [
      {
        id: "api",
        label: "Mit ERP, Shop oder Website",
        effects: [{ kind: "prefer-feature", featureId: "api", weight: 2 }],
      },
      {
        id: "sso",
        label: "Mit unserem Firmen-Login (SSO)",
        effects: [{ kind: "prefer-feature", featureId: "sso", weight: 2 }],
      },
      { id: "nichts", label: "Erst einmal mit nichts", effects: [] },
    ],
  },
  budgetQuestion(
    "Wie hoch ist dein Budget pro Nutzer und Monat?",
    [
      { id: "20", label: "Bis 20 €", maxCents: 2000 },
      { id: "50", label: "20 bis 50 €", maxCents: 5000 },
      { id: "100", label: "Über 50 €", maxCents: 10000 },
    ],
    true,
  ),
  serverQuestion,
  priorityQuestion,
];

const pm: Question[] = [
  users("Wie viele Personen arbeiten in Projekten mit?", 200, 10),
  {
    id: "methode",
    type: "single",
    title: "Wie plant ihr eure Projekte?",
    options: [
      {
        id: "kanban",
        label: "Mit Boards (Kanban)",
        effects: [{ kind: "prefer-feature", featureId: "kanban", weight: 2 }],
      },
      {
        id: "gantt",
        label: "Mit Zeitplan und Abhängigkeiten (Gantt)",
        effects: [{ kind: "prefer-feature", featureId: "gantt", weight: 2 }],
      },
      { id: "offen", label: "Mal so, mal so", effects: [] },
    ],
  },
  featureQuestion("Was soll das Tool zusätzlich können?", [
    { id: "zeit", label: "Zeiterfassung", features: ["zeiterfassung"] },
    {
      id: "auslastung",
      label: "Auslastung & Ressourcen",
      features: ["workload"],
    },
    { id: "auto", label: "Automatisierungen", features: ["automatisierung"] },
    { id: "gaeste", label: "Kunden als Gäste einladen", features: ["gaeste"] },
    { id: "doku", label: "Dokumente & Wiki", features: ["dokumente"] },
  ]),
  budgetQuestion(
    "Wie hoch ist dein Budget pro Nutzer und Monat?",
    [
      { id: "8", label: "Bis 8 €", maxCents: 800 },
      { id: "15", label: "8 bis 15 €", maxCents: 1500 },
      { id: "30", label: "Über 15 €", maxCents: 3000 },
    ],
    true,
  ),
  serverQuestion,
  priorityQuestion,
];

const newsletter: Question[] = [
  {
    id: "zweck",
    type: "single",
    title: "Wofür versendest du Newsletter?",
    options: [
      {
        id: "shop",
        label: "Für einen Onlineshop",
        effects: [
          { kind: "prefer-feature", featureId: "segmentierung", weight: 2 },
          { kind: "prefer-feature", featureId: "transaktional", weight: 1 },
        ],
      },
      {
        id: "b2b",
        label: "B2B: Leads entwickeln",
        effects: [
          { kind: "prefer-feature", featureId: "automatisierung", weight: 2 },
        ],
      },
      {
        id: "info",
        label: "Firmen- oder Vereinsnewsletter",
        effects: [
          { kind: "prefer-feature", featureId: "editor", weight: 2 },
          { kind: "prefer-feature", featureId: "vorlagen", weight: 1 },
        ],
      },
    ],
  },
  {
    id: "doi",
    type: "single",
    title: "Brauchst du Anmeldeformulare mit Double-Opt-in?",
    hint: "Damit weist du die Einwilligung deiner Empfänger nach.",
    options: [
      {
        id: "ja",
        label: "Ja",
        effects: [
          { kind: "prefer-feature", featureId: "doi", weight: 2 },
          { kind: "prefer-feature", featureId: "landingpages", weight: 1 },
        ],
      },
      { id: "nein", label: "Habe ich schon geregelt", effects: [] },
    ],
  },
  featureQuestion("Welche Funktionen brauchst du?", [
    {
      id: "auto",
      label: "Automatisierte Strecken",
      features: ["automatisierung"],
    },
    { id: "ab", label: "A/B-Tests", features: ["ab-tests"] },
    { id: "segment", label: "Segmentierung", features: ["segmentierung"] },
    { id: "api", label: "Anbindung an Shop oder CRM", features: ["api"] },
  ]),
  budgetQuestion(
    "Wie viel darf der Newsletter-Versand pro Monat kosten?",
    [
      { id: "20", label: "Bis 20 €", maxCents: 2000 },
      { id: "50", label: "Bis 50 €", maxCents: 5000 },
      { id: "150", label: "Bis 150 €", maxCents: 15000 },
    ],
    false,
  ),
  serverQuestion,
  priorityQuestion,
];

const erp: Question[] = [
  users("Wie viele Personen arbeiten mit dem ERP?", 100, 10),
  {
    id: "branche",
    type: "single",
    title: "Was beschreibt dein Unternehmen am besten?",
    options: [
      {
        id: "handel",
        label: "Handel und Onlineshop",
        effects: [
          { kind: "prefer-feature", featureId: "warenwirtschaft", weight: 2 },
          { kind: "prefer-feature", featureId: "shop", weight: 2 },
        ],
      },
      {
        id: "produktion",
        label: "Produktion",
        effects: [{ kind: "require-feature", featureId: "produktion" }],
      },
      {
        id: "dienstleistung",
        label: "Dienstleistung",
        effects: [
          { kind: "prefer-feature", featureId: "projekte", weight: 2 },
          { kind: "prefer-feature", featureId: "crm-modul", weight: 1 },
        ],
      },
    ],
  },
  featureQuestion("Was soll das ERP zusätzlich abdecken?", [
    { id: "fibu", label: "Finanzbuchhaltung", features: ["fibu"] },
    { id: "datev", label: "Übergabe an DATEV", features: ["datev"] },
    { id: "einkauf", label: "Einkauf & Bestellwesen", features: ["einkauf"] },
    { id: "api", label: "Offene API", features: ["api"] },
  ]),
  budgetQuestion(
    "Wie hoch ist dein Budget pro Nutzer und Monat?",
    [
      { id: "50", label: "Bis 50 €", maxCents: 5000 },
      { id: "100", label: "50 bis 100 €", maxCents: 10000 },
      { id: "200", label: "Über 100 €", maxCents: 20000 },
    ],
    true,
  ),
  serverQuestion,
  priorityQuestion,
];

const dms: Question[] = [
  users("Wie viele Personen arbeiten mit dem DMS?", 200, 10),
  featureQuestion("Wofür soll das DMS eingesetzt werden?", [
    {
      id: "archiv",
      label: "Revisionssicher archivieren (GoBD)",
      features: ["archiv"],
    },
    {
      id: "rechnungen",
      label: "Eingangsrechnungen freigeben",
      features: ["eingangsrechnungen", "workflows"],
    },
    { id: "mail", label: "E-Mails archivieren", features: ["mail-archiv"] },
    {
      id: "suche",
      label: "Papier scannen und durchsuchen",
      features: ["ocr", "volltextsuche"],
    },
    {
      id: "version",
      label: "Verträge mit Versionen",
      features: ["versionierung"],
    },
  ]),
  {
    id: "zugriff",
    type: "single",
    title: "Wie greift dein Team auf Dokumente zu?",
    options: [
      {
        id: "browser",
        label: "Im Browser, auch von unterwegs",
        effects: [
          { kind: "prefer-feature", featureId: "web-client", weight: 2 },
          { kind: "prefer-feature", featureId: "app", weight: 1 },
        ],
      },
      {
        id: "anbindung",
        label: "Aus ERP oder Buchhaltung heraus",
        effects: [{ kind: "prefer-feature", featureId: "api", weight: 2 }],
      },
      { id: "egal", label: "Ist mir egal", effects: [] },
    ],
  },
  budgetQuestion(
    "Wie hoch ist dein Budget pro Nutzer und Monat?",
    [
      { id: "10", label: "Bis 10 €", maxCents: 1000 },
      { id: "30", label: "10 bis 30 €", maxCents: 3000 },
      { id: "60", label: "Über 30 €", maxCents: 6000 },
    ],
    true,
  ),
  serverQuestion,
  priorityQuestion,
];

const shops: Question[] = [
  {
    id: "start",
    type: "single",
    title: "Wie willst du deinen Shop betreiben?",
    options: [
      {
        id: "miete",
        label: "Ohne Technik: der Anbieter kümmert sich",
        effects: [{ kind: "prefer-feature", featureId: "hosting", weight: 3 }],
      },
      {
        id: "agentur",
        label: "Mit Agentur oder eigenen Entwicklern",
        effects: [
          { kind: "prefer-feature", featureId: "api", weight: 2 },
          { kind: "prefer-feature", featureId: "erweiterungen", weight: 2 },
        ],
      },
      { id: "offen", label: "Noch offen", effects: [] },
    ],
  },
  {
    id: "kunden",
    type: "single",
    title: "An wen verkaufst du?",
    options: [
      { id: "b2c", label: "An Privatkunden", effects: [] },
      {
        id: "b2b",
        label: "An Geschäftskunden",
        effects: [{ kind: "prefer-feature", featureId: "b2b", weight: 3 }],
      },
    ],
  },
  featureQuestion("Was brauchst du außerdem?", [
    { id: "markt", label: "Amazon, eBay & Co.", features: ["marktplaetze"] },
    {
      id: "international",
      label: "Mehrere Sprachen",
      features: ["mehrsprachig"],
    },
    { id: "recht", label: "Deutsche Rechtstexte", features: ["rechtstexte"] },
    { id: "zahlung", label: "Viele Zahlungsarten", features: ["zahlungen"] },
  ]),
  budgetQuestion(
    "Wie viel darf das Shopsystem pro Monat kosten?",
    [
      { id: "30", label: "Bis 30 €", maxCents: 3000 },
      { id: "150", label: "Bis 150 €", maxCents: 15000 },
      { id: "1000", label: "Bis 1.000 €", maxCents: 100000 },
    ],
    false,
  ),
  serverQuestion,
  priorityQuestion,
];

export const quizzes: Record<CategorySlug, Question[]> = {
  "hr-software": hrQuiz,
  buchhaltungssoftware: buchhaltung,
  rechnungsprogramme: rechnungen,
  zeiterfassungssoftware: zeit,
  "crm-software": crm,
  "projektmanagement-software": pm,
  "newsletter-software": newsletter,
  "erp-software": erp,
  "dokumentenmanagement-software": dms,
  shopsysteme: shops,
};
