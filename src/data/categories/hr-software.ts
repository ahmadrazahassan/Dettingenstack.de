import type { CategoryInput } from "@/lib/schema";

export const hrSoftware = {
  slug: "hr-software",
  name: "HR-Software",
  nameSingular: "HR-Software",
  nameShort: "HR",
  unitLabel: { singular: "Mitarbeitende/r", plural: "Mitarbeitende" },
  unit: "mitarbeitende",
  referenceTeams: [25, 150],
  scoreWeights: {
    funktionen: 0.25,
    bedienbarkeit: 0.2,
    preisLeistung: 0.15,
    datenschutz: 0.2,
    support: 0.1,
    integrationen: 0.1,
  },
  featureGroups: [
    {
      id: "verwaltung",
      label: "Personalverwaltung",
      features: [
        {
          id: "personalakte",
          label: "Digitale Personalakte",
          description:
            "Stammdaten und Dokumente aller Mitarbeitenden an einem Ort.",
          importance: "kern",
        },
        {
          id: "dokumente",
          label: "Dokumentenverwaltung",
          description:
            "Verträge, Bescheinigungen und Vorlagen digital ablegen.",
          importance: "kern",
        },
        {
          id: "esignatur",
          label: "E-Signatur",
          description: "Dokumente rechtsgültig elektronisch unterschreiben.",
          importance: "standard",
        },
        {
          id: "organigramm",
          label: "Organigramm",
          description: "Aufbau und Berichtswege des Unternehmens darstellen.",
          importance: "extra",
        },
        {
          id: "rollen",
          label: "Rollen & Rechte",
          description:
            "Fein steuerbare Zugriffsrechte, z. B. für Führungskräfte oder Betriebsrat.",
          importance: "kern",
        },
      ],
    },
    {
      id: "zeit",
      label: "Abwesenheiten & Zeit",
      features: [
        {
          id: "abwesenheiten",
          label: "Urlaubs- & Abwesenheitsverwaltung",
          description: "Anträge, Genehmigungen und Resturlaub.",
          importance: "kern",
        },
        {
          id: "zeiterfassung",
          label: "Arbeitszeiterfassung",
          description:
            "Erfassung der Arbeitszeit, z. B. für die Zeiterfassungspflicht.",
          importance: "kern",
        },
        {
          id: "schichtplanung",
          label: "Schichtplanung",
          description: "Schichten planen und besetzen.",
          importance: "extra",
        },
      ],
    },
    {
      id: "recruiting",
      label: "Recruiting",
      features: [
        {
          id: "bewerbermanagement",
          label: "Bewerbermanagement",
          description: "Bewerbungen sammeln, bewerten und Prozesse steuern.",
          importance: "standard",
        },
        {
          id: "karriereseite",
          label: "Karriereseite & Stellenportal",
          description: "Stellen veröffentlichen und Bewerbungen empfangen.",
          importance: "extra",
        },
      ],
    },
    {
      id: "entwicklung",
      label: "Onboarding & Entwicklung",
      features: [
        {
          id: "onboarding",
          label: "Onboarding-Workflows",
          description: "Aufgaben und Abläufe für neue Mitarbeitende.",
          importance: "kern",
        },
        {
          id: "feedback",
          label: "Mitarbeitergespräche & Feedback",
          description: "Gespräche, Beurteilungen und 360°-Feedback.",
          importance: "standard",
        },
        {
          id: "ziele",
          label: "Ziele & OKR",
          description: "Zielvereinbarungen planen und nachhalten.",
          importance: "extra",
        },
        {
          id: "lernen",
          label: "Weiterbildung",
          description: "Schulungen und Lerninhalte verwalten.",
          importance: "extra",
        },
        {
          id: "umfragen",
          label: "Mitarbeiterbefragungen",
          description: "Stimmung und Zufriedenheit messen.",
          importance: "extra",
        },
      ],
    },
    {
      id: "lohn",
      label: "Lohn & Finanzen",
      features: [
        {
          id: "lohnvorbereitung",
          label: "Vorbereitende Lohnbuchhaltung",
          description: "Lohnrelevante Daten für das Steuerbüro aufbereiten.",
          importance: "kern",
        },
        {
          id: "datev-lohn",
          label: "DATEV-Lohn-Schnittstelle",
          description: "Daten an DATEV Lohn und Gehalt oder LODAS übergeben.",
          importance: "kern",
        },
        {
          id: "lohnabrechnung",
          label: "Integrierte Lohnabrechnung",
          description: "Abrechnung direkt in der Software.",
          importance: "standard",
        },
        {
          id: "spesen",
          label: "Reisekosten & Spesen",
          description: "Belege erfassen und Reisekosten abrechnen.",
          importance: "extra",
        },
      ],
    },
    {
      id: "technik",
      label: "Self-Service, Reporting & Technik",
      features: [
        {
          id: "self-service",
          label: "Mitarbeiter-Self-Service",
          description:
            "Mitarbeitende pflegen Daten und stellen Anträge selbst.",
          importance: "kern",
        },
        {
          id: "app",
          label: "Mobile App",
          description: "Anträge, Zeiten und Dokumente unterwegs.",
          importance: "standard",
        },
        {
          id: "reports",
          label: "Reports & Auswertungen",
          description: "Kennzahlen wie Fluktuation oder Urlaubstage.",
          importance: "standard",
        },
        {
          id: "api",
          label: "Offene API",
          description: "Eigene Anbindungen an andere Systeme.",
          importance: "standard",
        },
        {
          id: "sso",
          label: "Single Sign-On",
          description: "Anmeldung über den zentralen Firmen-Login.",
          importance: "standard",
        },
        {
          id: "hinweisgeber",
          label: "Hinweisgebersystem",
          description: "Meldekanal nach dem Hinweisgeberschutzgesetz.",
          importance: "extra",
        },
      ],
    },
  ],
  seo: {
    title: "HR-Software Vergleich 2026: Die 12 wichtigsten Tools im Check",
    description:
      "HR-Software im Vergleich: Personio, Kenjo, HR WORKS, rexx, Factorial und Leapsome – mit Preisen in Euro, Serverstandort, DATEV-Anbindung und Funktionen.",
    h1: "HR-Software Vergleich 2026: Die 12 wichtigsten Tools im Check",
  },
  intro:
    "HR-Software übernimmt Personalakte, Urlaubsanträge, Zeiterfassung und die Vorbereitung der Lohnabrechnung. Wir haben zwölf Lösungen verglichen – vom deutschen Mittelstand bis zum internationalen Konzern – mit den Preisen, die die Anbieter tatsächlich veröffentlichen, und den Angaben zu Serverstandort und Zertifizierungen.",
  testTasks: [
    "Neue Mitarbeiterin anlegen und Onboarding starten",
    "Urlaubsantrag stellen und genehmigen",
    "Arbeitszeit erfassen und Überstunden auswerten",
    "Monatsdaten an DATEV Lohn übergeben",
    "Zugriffsrechte für Führungskräfte und Betriebsrat einschränken",
    "Personalakte exportieren (Datenauskunft nach Art. 15 DSGVO)",
  ],
  guideMdx: "hr-software",
  faqs: [
    {
      q: "Was kostet HR-Software?",
      a: "Die Preise hängen fast immer von der Zahl der Mitarbeitenden ab. Von den sechs Anbietern in diesem Vergleich veröffentlichen nur Kenjo und Leapsome konkrete Preise (Kenjo ab 6,00 € pro Mitarbeitendem und Monat, Leapsome HRIS Pro 10,00 €). Personio, HR WORKS, rexx und Factorial nennen Preise erst im Angebot oder widersprüchlich. Rechne außerdem mit Einrichtungs- und Schulungskosten.",
    },
    {
      q: "Brauche ich eine DATEV-Schnittstelle?",
      a: "Wenn dein Steuerbüro die Lohnabrechnung mit DATEV macht: ja. Dann sparst du das monatliche Abtippen von Urlaubstagen, Krankheitszeiten und Zuschlägen. Achte darauf, ob die Schnittstelle im Tarif enthalten ist oder extra kostet – bei Kenjo etwa gibt es sie erst ab dem Tarif Growth mit einmaliger Einrichtungsgebühr.",
    },
    {
      q: "Muss der Betriebsrat der Einführung zustimmen?",
      a: "In der Regel ja. HR-Software ist geeignet, Verhalten oder Leistung zu überwachen, deshalb hat der Betriebsrat nach § 87 Abs. 1 Nr. 6 BetrVG ein Mitbestimmungsrecht. Plane eine Betriebsvereinbarung ein und prüfe vorher, wie fein sich Zugriffsrechte einstellen lassen.",
    },
    {
      q: "Wo sollten HR-Daten gespeichert werden?",
      a: "Personaldaten sind besonders sensibel. Ein Serverstandort in Deutschland oder der EU, ein Auftragsverarbeitungsvertrag (AVV) und eine anerkannte Zertifizierung wie ISO 27001 sind gute Mindeststandards. Kenjo nennt ausschließlich Frankfurt am Main, rexx eigene Rechenzentren in Deutschland und der Schweiz.",
    },
    {
      q: "Ist HR-Software auch für kleine Unternehmen sinnvoll?",
      a: "Ab etwa 10 bis 15 Mitarbeitenden lohnt sie sich meist, weil Urlaubsplanung und Dokumente sonst in E-Mails und Excel-Listen verstreut sind. Achte auf Mindestabnahmen: HR WORKS rechnet zum Beispiel mindestens 20 Nutzer ab.",
    },
    {
      q: "Wie lange dauert die Einführung?",
      a: "Für die Grundfunktionen (Personalakte, Abwesenheiten) rechnen Anbieter meist mit wenigen Wochen. Lohn-Schnittstellen, Zeitmodelle und die Abstimmung mit dem Betriebsrat brauchen länger. Plane realistisch zwei bis drei Monate bis zum vollständigen Echtbetrieb ein.",
    },
  ],
  related: [
    "zeiterfassungssoftware",
    "buchhaltungssoftware",
    "projektmanagement-software",
  ],
  authorId: "redaktion",
  editorId: "redaktion",
  updatedAt: "2026-11-02",
} satisfies CategoryInput;
