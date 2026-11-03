import type { CategoryInput } from "@/lib/schema";

// Projektmanagement-Software: priced per user and month. Reference teams 5 and 25 users (§7.3).
export const projektmanagementSoftware = {
  slug: "projektmanagement-software",
  name: "Projektmanagement-Software",
  nameSingular: "Projektmanagement-Software",
  nameShort: "Projektmanagement",
  unitLabel: { singular: "Nutzer", plural: "Nutzer" },
  unit: "nutzer",
  referenceTeams: [5, 25],
  maxTeam: 200,
  scoreWeights: {
    funktionen: 0.25,
    bedienbarkeit: 0.25,
    preisLeistung: 0.2,
    datenschutz: 0.1,
    support: 0.1,
    integrationen: 0.1,
  },
  featureGroups: [
    {
      id: "planung",
      label: "Aufgaben & Ansichten",
      features: [
        {
          id: "aufgaben",
          label: "Aufgaben & Unteraufgaben",
          description:
            "Aufgaben mit Zuständigen, Fälligkeiten und Unteraufgaben.",
          importance: "kern",
        },
        {
          id: "kanban",
          label: "Kanban-Board",
          description: "Aufgaben als Karten durch Spalten ziehen.",
          importance: "kern",
        },
        {
          id: "gantt",
          label: "Gantt & Zeitleiste",
          description: "Projektplan mit Abhängigkeiten auf der Zeitachse.",
          importance: "standard",
        },
        {
          id: "kalender",
          label: "Kalenderansicht",
          description: "Fälligkeiten und Termine im Kalender.",
          importance: "standard",
        },
      ],
    },
    {
      id: "steuerung",
      label: "Steuerung & Automatisierung",
      features: [
        {
          id: "workload",
          label: "Auslastung & Ressourcen",
          description: "Sehen, wer wie viel zu tun hat.",
          importance: "standard",
        },
        {
          id: "automatisierung",
          label: "Automatisierungen",
          description: "Wiederkehrende Schritte automatisch auslösen.",
          importance: "standard",
        },
        {
          id: "vorlagen",
          label: "Projektvorlagen",
          description: "Wiederkehrende Projekte aus Vorlagen anlegen.",
          importance: "standard",
        },
        {
          id: "berichte",
          label: "Berichte & Dashboards",
          description: "Fortschritt und Kennzahlen auf einen Blick.",
          importance: "standard",
        },
        {
          id: "zeiterfassung",
          label: "Zeiterfassung",
          description: "Zeiten direkt an Aufgaben erfassen.",
          importance: "extra",
        },
      ],
    },
    {
      id: "zusammenarbeit",
      label: "Zusammenarbeit",
      features: [
        {
          id: "dokumente",
          label: "Dokumente & Wiki",
          description: "Notizen und Projektdokumentation im Tool.",
          importance: "standard",
        },
        {
          id: "gaeste",
          label: "Gäste & Externe",
          description: "Kunden oder Freelancer einladen.",
          importance: "standard",
        },
        {
          id: "app",
          label: "Mobile App",
          description: "Aufgaben unterwegs bearbeiten.",
          importance: "kern",
        },
      ],
    },
    {
      id: "technik",
      label: "Technik & Sicherheit",
      features: [
        {
          id: "api",
          label: "Offene API",
          description: "Anbindung an andere Systeme.",
          importance: "standard",
        },
        {
          id: "sso",
          label: "Single Sign-On",
          description: "Anmeldung über den zentralen Firmen-Login.",
          importance: "extra",
        },
      ],
    },
  ],
  seo: {
    title: "Projektmanagement-Software Vergleich 2026: 13 Tools",
    description:
      "Projektmanagement-Tools im Vergleich: Asana, monday.com, ClickUp, Jira, Wrike, awork, Stackfield, MeisterTask, Notion und Planner – mit Preisen und Serverstandort.",
    h1: "Projektmanagement-Software Vergleich 2026: 13 Tools im Check",
  },
  intro:
    "Projektmanagement-Software ordnet Aufgaben, Termine und Zuständigkeiten, damit Projekte nicht in E-Mails und Excel-Listen versanden. Wir haben die bekannten internationalen Tools und deutsche Alternativen mit Hosting in Deutschland verglichen – mit den Preisen, die die Anbieter veröffentlichen, und Angaben zum Serverstandort.",
  testTasks: [
    "Projekt aus einer Vorlage anlegen",
    "Aufgaben mit Abhängigkeiten im Gantt-Diagramm planen",
    "Auslastung des Teams für die nächste Woche prüfen",
    "Externen Kunden als Gast einladen",
    "Automatisierung beim Statuswechsel einrichten",
    "Zeit auf eine Aufgabe buchen",
  ],
  guideMdx: "projektmanagement-software",
  faqs: [
    {
      q: "Was kostet Projektmanagement-Software?",
      a: "Die meisten Tools haben einen kostenlosen Einstieg für kleine Teams. Bezahltarife liegen in unserem Vergleich bei rund 5 € bis 30 € pro Nutzer und Monat; Enterprise-Tarife werden individuell verhandelt. Mehrere US-Anbieter zeigen ihre Preise nur in US-Dollar.",
    },
    {
      q: "Gibt es Projektmanagement-Tools mit Servern in Deutschland?",
      a: "Ja. awork hostet bei Microsoft in Deutschland, Stackfield speichert Daten in Deutschland, MeisterTask in Frankfurt. Internationale Anbieter wie Wrike bieten Rechenzentren in der EU an.",
    },
    {
      q: "Welche Methode passt: Kanban, Scrum oder klassisch?",
      a: "Kanban eignet sich für laufende Arbeit, Scrum für Softwareteams mit Sprints, klassische Planung mit Gantt für Projekte mit festen Terminen. Mehr dazu im Ratgeber zu Projektmanagement-Methoden.",
    },
  ],
  related: [
    "zeiterfassungssoftware",
    "crm-software",
    "dokumentenmanagement-software",
  ],
  authorId: "redaktion",
  editorId: "redaktion",
  updatedAt: "2026-11-03",
} satisfies CategoryInput;
