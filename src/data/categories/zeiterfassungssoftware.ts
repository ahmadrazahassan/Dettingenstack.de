import type { CategoryInput } from "@/lib/schema";

// Zeiterfassungssoftware: priced per employee and month. Reference teams 15 and 80 employees (§7.3).
export const zeiterfassungssoftware = {
  slug: "zeiterfassungssoftware",
  name: "Zeiterfassungssoftware",
  nameSingular: "Zeiterfassungssoftware",
  nameShort: "Zeiterfassung",
  unitLabel: { singular: "Mitarbeitende/r", plural: "Mitarbeitende" },
  unit: "mitarbeitende",
  referenceTeams: [15, 80],
  maxTeam: 300,
  scoreWeights: {
    funktionen: 0.2,
    bedienbarkeit: 0.25,
    preisLeistung: 0.2,
    datenschutz: 0.15,
    support: 0.1,
    integrationen: 0.1,
  },
  featureGroups: [
    {
      id: "arbeitszeit",
      label: "Arbeitszeit",
      features: [
        {
          id: "zeiterfassung",
          label: "Arbeitszeiterfassung",
          description:
            "Beginn, Ende und Dauer der Arbeitszeit erfassen – Grundlage der Zeiterfassungspflicht.",
          importance: "kern",
        },
        {
          id: "pausen",
          label: "Pausen & Arbeitszeitregeln",
          description:
            "Pausen automatisch abziehen und Verstöße gegen das Arbeitszeitgesetz anzeigen.",
          importance: "kern",
        },
        {
          id: "ueberstunden",
          label: "Überstunden & Zeitkonten",
          description: "Soll-Stunden, Zeitkonten und Überstunden verwalten.",
          importance: "kern",
        },
        {
          id: "abwesenheiten",
          label: "Urlaub & Abwesenheiten",
          description: "Urlaubsanträge, Krankheit und Resturlaub.",
          importance: "kern",
        },
        {
          id: "schichtplanung",
          label: "Schichtplanung",
          description: "Schichten und Dienstpläne erstellen.",
          importance: "standard",
        },
      ],
    },
    {
      id: "erfassung",
      label: "Erfassungswege",
      features: [
        {
          id: "app",
          label: "Mobile App",
          description: "Stempeln per Smartphone, auch offline.",
          importance: "kern",
        },
        {
          id: "terminal",
          label: "Stempeluhr & Terminal",
          description: "Erfassung per Tablet, Chip oder Hardware-Terminal.",
          importance: "standard",
        },
        {
          id: "gps",
          label: "GPS & Einsatzorte",
          description: "Standort beim Stempeln für Außendienst und Baustellen.",
          importance: "extra",
        },
      ],
    },
    {
      id: "projekte",
      label: "Projekte & Abrechnung",
      features: [
        {
          id: "projektzeiten",
          label: "Projektzeiterfassung",
          description: "Zeiten Kunden, Projekten und Tätigkeiten zuordnen.",
          importance: "standard",
        },
        {
          id: "projektabrechnung",
          label: "Projektabrechnung",
          description:
            "Zeiten in Rechnungen übernehmen oder an Rechnungsprogramme übergeben.",
          importance: "extra",
        },
      ],
    },
    {
      id: "schnittstellen",
      label: "Lohn & Schnittstellen",
      features: [
        {
          id: "datev-lohn",
          label: "Lohnexport (DATEV)",
          description:
            "Arbeitszeiten und Abwesenheiten an DATEV oder die Lohnabrechnung übergeben.",
          importance: "kern",
        },
        {
          id: "api",
          label: "Offene API",
          description: "Anbindung an HR-, ERP- oder Projektsoftware.",
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
    title: "Zeiterfassungssoftware Vergleich 2026: 15 Tools im Check",
    description:
      "Zeiterfassung im Vergleich: Clockodo, clockin, Crewmeister, Papershift, ZEP, TimeTac, MOCO und HR-Software – mit Euro-Preisen, App, DATEV-Export und Serverstandort.",
    h1: "Zeiterfassungssoftware Vergleich 2026: 15 Tools im Check",
  },
  intro:
    "Seit dem Beschluss des Bundesarbeitsgerichts von 2022 müssen Arbeitgeber die Arbeitszeit erfassen. Zeiterfassungssoftware erledigt das per App, Browser oder Terminal und übergibt die Zeiten an die Lohnabrechnung. Wir haben 15 Lösungen verglichen – von reiner Arbeitszeiterfassung über Projektzeiten bis zur HR-Software mit Zeitmodul – mit den Preisen, die die Anbieter veröffentlichen.",
  testTasks: [
    "Arbeitsbeginn per App stempeln, Pause und Feierabend erfassen",
    "Verstoß gegen die tägliche Höchstarbeitszeit erkennen",
    "Urlaubsantrag stellen und genehmigen",
    "Projektzeit einem Kunden zuordnen",
    "Monatswerte an DATEV Lohn übergeben",
    "Zeiterfassung per Terminal im Lager einrichten",
  ],
  guideMdx: "zeiterfassungssoftware",
  faqs: [
    {
      q: "Ist Zeiterfassung Pflicht?",
      a: "Ja. Nach dem Beschluss des Bundesarbeitsgerichts vom 13.09.2022 (1 ABR 22/21) müssen Arbeitgeber Beginn, Ende und Dauer der Arbeitszeit erfassen. Eine bestimmte Form schreibt das Gesetz derzeit nicht vor; ein Entwurf für eine elektronische Pflicht liegt vor, ist aber nicht beschlossen.",
    },
    {
      q: "Was kostet Zeiterfassungssoftware?",
      a: "Die Preise in unserem Vergleich liegen zwischen 1,50 € und rund 15 € pro Mitarbeitendem und Monat, je nach Funktionsumfang. Projekt- und Agenturlösungen wie MOCO oder ZEP Operations kosten mehr, weil sie Angebote und Rechnungen einschließen. Achte auf Grundgebühren und Mindestpauschalen.",
    },
    {
      q: "Brauche ich ein Terminal?",
      a: "Nein. Die meisten Teams stempeln per App oder Browser. Ein Terminal lohnt sich in Produktion, Lager oder Pflege, wo nicht jede Person ein Smartphone nutzt. Viele Anbieter bieten Tablet-Terminals ohne Zusatzhardware.",
    },
    {
      q: "Muss der Betriebsrat zustimmen?",
      a: "Über das Ob der Zeiterfassung nicht, denn sie ist Pflicht. Über das Wie – Erfassungsart, Auswertungen, GPS – hat der Betriebsrat nach § 87 Abs. 1 Nr. 6 BetrVG mitzubestimmen.",
    },
    {
      q: "Darf ich GPS beim Stempeln nutzen?",
      a: "Nur, wenn es für den Zweck erforderlich ist, etwa zur Dokumentation von Einsatzorten, und die Beschäftigten informiert sind. Eine dauerhafte Ortung ist in der Regel unzulässig. Kläre die Nutzung mit dem Datenschutzbeauftragten und gegebenenfalls dem Betriebsrat.",
    },
  ],
  related: ["hr-software", "projektmanagement-software", "rechnungsprogramme"],
  authorId: "redaktion",
  editorId: "redaktion",
  updatedAt: "2026-11-03",
} satisfies CategoryInput;
