import type { CategoryInput } from "@/lib/schema";

// CRM-Software: mostly priced per user and month. Reference teams 5 and 20 users (§7.3).
export const crmSoftware = {
  slug: "crm-software",
  name: "CRM-Software",
  nameSingular: "CRM-Software",
  nameShort: "CRM",
  unitLabel: { singular: "Nutzer", plural: "Nutzer" },
  unit: "nutzer",
  referenceTeams: [5, 20],
  maxTeam: 100,
  scoreWeights: {
    funktionen: 0.25,
    bedienbarkeit: 0.2,
    preisLeistung: 0.2,
    datenschutz: 0.15,
    support: 0.1,
    integrationen: 0.1,
  },
  featureGroups: [
    {
      id: "grundlagen",
      label: "Kontakte & Pipeline",
      features: [
        {
          id: "kontakte",
          label: "Kontakt- & Firmenverwaltung",
          description: "Kontakte, Firmen und Historie an einem Ort.",
          importance: "kern",
        },
        {
          id: "pipeline",
          label: "Vertriebspipeline",
          description: "Deals durch Phasen bis zum Abschluss führen.",
          importance: "kern",
        },
        {
          id: "mehrere-pipelines",
          label: "Mehrere Pipelines",
          description:
            "Getrennte Prozesse, etwa für Neukunden und Bestandskunden.",
          importance: "standard",
        },
        {
          id: "aufgaben",
          label: "Aufgaben & Erinnerungen",
          description: "Wiedervorlagen und Termine je Kontakt oder Deal.",
          importance: "kern",
        },
      ],
    },
    {
      id: "kommunikation",
      label: "E-Mail & Kommunikation",
      features: [
        {
          id: "email-sync",
          label: "E-Mail-Synchronisierung",
          description: "Postfach anbinden, E-Mails automatisch zuordnen.",
          importance: "kern",
        },
        {
          id: "email-tracking",
          label: "E-Mail-Tracking",
          description: "Öffnungen und Klicks sehen – nur mit Rechtsgrundlage.",
          importance: "standard",
        },
        {
          id: "sequenzen",
          label: "E-Mail-Sequenzen",
          description: "Mehrstufige Folge-E-Mails automatisch versenden.",
          importance: "extra",
        },
      ],
    },
    {
      id: "vertrieb",
      label: "Vertrieb & Automatisierung",
      features: [
        {
          id: "angebote",
          label: "Angebote",
          description: "Angebote aus dem CRM erstellen und nachverfolgen.",
          importance: "standard",
        },
        {
          id: "prognosen",
          label: "Umsatzprognosen",
          description: "Erwarteten Umsatz aus der Pipeline vorhersagen.",
          importance: "standard",
        },
        {
          id: "automatisierung",
          label: "Workflow-Automatisierung",
          description: "Wiederkehrende Schritte automatisch auslösen.",
          importance: "standard",
        },
        {
          id: "berichte",
          label: "Berichte & Dashboards",
          description: "Kennzahlen für Vertrieb und Geschäftsführung.",
          importance: "kern",
        },
      ],
    },
    {
      id: "technik",
      label: "Apps & Technik",
      features: [
        {
          id: "app",
          label: "Mobile App",
          description: "Kontakte und Deals unterwegs.",
          importance: "standard",
        },
        {
          id: "api",
          label: "Offene API",
          description: "Anbindung an ERP, Shop oder Website.",
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
    title: "CRM-Software Vergleich 2026: 11 Tools im Check",
    description:
      "CRM-Software im Vergleich: HubSpot, Pipedrive, Salesforce, Dynamics 365, CentralStationCRM, Zoho, Odoo, Teamleader, weclapp – Euro-Preise und Serverstandort.",
    h1: "CRM-Software Vergleich 2026: 11 Tools im Check",
  },
  intro:
    "Ein CRM bündelt Kontakte, Deals und Kommunikation, damit im Vertrieb nichts verloren geht. Wir haben elf Lösungen verglichen – vom deutschen CRM für kleine Teams bis zu internationalen Plattformen – mit den Euro-Preisen, die die Anbieter veröffentlichen, und den Angaben zu Serverstandort und Datenschutz.",
  testTasks: [
    "Kontakte aus einer Excel-Liste importieren und Dubletten bereinigen",
    "Deal anlegen und durch die Pipeline bewegen",
    "Postfach anbinden und E-Mails automatisch zuordnen",
    "Angebot aus dem CRM erstellen",
    "Wiedervorlage automatisch nach drei Tagen auslösen",
    "Umsatzprognose für das Quartal auswerten",
  ],
  guideMdx: "crm-software",
  faqs: [
    {
      q: "Was kostet CRM-Software?",
      a: "Die meisten Anbieter rechnen pro Nutzer und Monat ab. In unserem Vergleich reichen die Bezahltarife von 14 € (Pipedrive Lite, jährlich) bis über 500 € pro Nutzer (Salesforce Max). CentralStationCRM bietet Pakete für mehrere Nutzer, HubSpot, Zoho und Odoo haben kostenlose Einstiege.",
    },
    {
      q: "Darf ich Kundendaten in ein US-CRM geben?",
      a: "Ja, wenn die Voraussetzungen der DSGVO erfüllt sind: Auftragsverarbeitungsvertrag, geeignete Garantien für Übermittlungen (etwa das EU-US Data Privacy Framework) und angemessene Sicherheit. Viele US-Anbieter bieten zusätzlich Rechenzentren in der EU an, HubSpot etwa in Frankfurt.",
    },
    {
      q: "Brauche ich ein CRM als kleines Unternehmen?",
      a: "Sobald mehrere Personen Kunden betreuen oder du Angebote systematisch nachfassen willst, lohnt sich ein CRM. Für kleine Teams reichen oft schlanke Lösungen wie CentralStationCRM oder Pipedrive.",
    },
    {
      q: "Darf ich E-Mail-Öffnungen tracken?",
      a: "Öffnungs- und Klicktracking ist personenbezogen und braucht eine Rechtsgrundlage, in der Regel eine Einwilligung. Viele CRMs lassen sich so einstellen, dass Tracking nur dort aktiv ist, wo es zulässig ist.",
    },
  ],
  related: ["newsletter-software", "rechnungsprogramme", "erp-software"],
  authorId: "redaktion",
  editorId: "redaktion",
  updatedAt: "2026-11-03",
} satisfies CategoryInput;
