import type { CategoryInput } from "@/lib/schema";

// Dokumentenmanagement-Software: per user, per concurrent connection or by quote. Reference teams 10 and 50 users (§7.3).
export const dokumentenmanagementSoftware = {
  slug: "dokumentenmanagement-software",
  name: "Dokumentenmanagement-Software",
  nameSingular: "DMS",
  nameShort: "DMS",
  unitLabel: { singular: "Nutzer", plural: "Nutzer" },
  unit: "nutzer",
  referenceTeams: [10, 50],
  maxTeam: 200,
  scoreWeights: {
    funktionen: 0.3,
    bedienbarkeit: 0.15,
    preisLeistung: 0.15,
    datenschutz: 0.2,
    support: 0.1,
    integrationen: 0.1,
  },
  featureGroups: [
    {
      id: "ablage",
      label: "Ablage & Archiv",
      features: [
        {
          id: "archiv",
          label: "Revisionssichere Archivierung",
          description:
            "Dokumente unveränderbar und nachvollziehbar aufbewahren (GoBD).",
          importance: "kern",
        },
        {
          id: "versionierung",
          label: "Versionierung",
          description:
            "Änderungen nachvollziehen und alte Stände wiederherstellen.",
          importance: "kern",
        },
        {
          id: "rechte",
          label: "Rechte & Rollen",
          description: "Zugriff je Abteilung, Akte oder Dokument steuern.",
          importance: "kern",
        },
      ],
    },
    {
      id: "erfassung",
      label: "Erfassung & Suche",
      features: [
        {
          id: "ocr",
          label: "Texterkennung (OCR)",
          description: "Gescannte Dokumente durchsuchbar machen.",
          importance: "kern",
        },
        {
          id: "volltextsuche",
          label: "Volltextsuche",
          description: "Dokumente über ihren Inhalt finden.",
          importance: "kern",
        },
        {
          id: "mail-archiv",
          label: "E-Mail-Archivierung",
          description: "E-Mails und Anhänge revisionssicher ablegen.",
          importance: "standard",
        },
      ],
    },
    {
      id: "prozesse",
      label: "Prozesse",
      features: [
        {
          id: "workflows",
          label: "Workflows",
          description: "Freigaben und Abläufe automatisieren.",
          importance: "standard",
        },
        {
          id: "eingangsrechnungen",
          label: "Eingangsrechnungen",
          description:
            "Rechnungen prüfen, freigeben und an die Buchhaltung übergeben.",
          importance: "standard",
        },
      ],
    },
    {
      id: "technik",
      label: "Zugriff & Technik",
      features: [
        {
          id: "web-client",
          label: "Web-Client",
          description: "Zugriff im Browser ohne Installation.",
          importance: "standard",
        },
        {
          id: "app",
          label: "Mobile App",
          description: "Dokumente unterwegs abrufen.",
          importance: "extra",
        },
        {
          id: "api",
          label: "Offene API",
          description: "Anbindung an ERP, Buchhaltung oder Fachanwendungen.",
          importance: "standard",
        },
      ],
    },
  ],
  seo: {
    title: "DMS Vergleich 2026: 10 Dokumentenmanagement-Systeme",
    description:
      "Dokumentenmanagement im Vergleich: ecoDMS, Amagno, DocuWare, ELO, d.velop, enaio, EASY, M-Files, windream und SharePoint – Preise, Betrieb und Hosting.",
    h1: "Dokumentenmanagement-Software Vergleich 2026: 10 Systeme",
  },
  intro:
    "Ein Dokumentenmanagement-System (DMS) legt Belege, Verträge und E-Mails geordnet und revisionssicher ab und macht sie in Sekunden auffindbar. Wir haben zehn Systeme verglichen – vom günstigen Archiv für kleine Büros bis zur ECM-Plattform für den Mittelstand. Viele Anbieter verkaufen über Partner und veröffentlichen keine Preise; das kennzeichnen wir.",
  testTasks: [
    "Eingangsrechnung scannen, per OCR erfassen und ablegen",
    "Dokument über die Volltextsuche wiederfinden",
    "Vertrag mit Wiedervorlage zum Kündigungstermin anlegen",
    "Freigabe-Workflow für Rechnungen einrichten",
    "E-Mail mit Anhang aus Outlook archivieren",
    "Zugriffsrechte für die Personalakte setzen",
  ],
  guideMdx: "dokumentenmanagement-software",
  faqs: [
    {
      q: "Was kostet ein DMS?",
      a: "Die Spanne ist groß: ecoDMS kostet einmalig 125 € pro gleichzeitiger Verbindung, Cloud-DMS rechnen pro Nutzer und Monat ab. Die großen ECM-Anbieter wie DocuWare, ELO oder d.velop nennen ihre Preise meist erst im Angebot, oft über Partner.",
    },
    {
      q: "Ist ein DMS automatisch GoBD-konform?",
      a: "Nein. Software kann revisionssichere Ablage unterstützen, GoBD-Konformität hängt aber auch von deiner Verfahrensdokumentation und deinen Abläufen ab. Mehr im Ratgeber zur revisionssicheren Archivierung.",
    },
    {
      q: "Cloud oder eigener Server?",
      a: "Cloud-DMS sind schneller eingerichtet und brauchen keinen eigenen Server. Lokale Installationen bieten mehr Kontrolle, verlangen aber Wartung und Backups. Viele Anbieter bieten beides an.",
    },
  ],
  related: ["buchhaltungssoftware", "erp-software", "hr-software"],
  authorId: "redaktion",
  editorId: "redaktion",
  updatedAt: "2026-11-03",
} satisfies CategoryInput;
