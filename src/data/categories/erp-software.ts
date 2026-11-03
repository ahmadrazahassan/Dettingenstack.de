import type { CategoryInput } from "@/lib/schema";

// ERP-Software: mostly priced per user and month; e-commerce ERPs by orders. Reference teams 5 and 20 users (§7.3).
export const erpSoftware = {
  slug: "erp-software",
  name: "ERP-Software",
  nameSingular: "ERP-Software",
  nameShort: "ERP",
  unitLabel: { singular: "Nutzer", plural: "Nutzer" },
  unit: "nutzer",
  referenceTeams: [5, 20],
  maxTeam: 100,
  scoreWeights: {
    funktionen: 0.3,
    bedienbarkeit: 0.15,
    preisLeistung: 0.2,
    datenschutz: 0.1,
    support: 0.1,
    integrationen: 0.15,
  },
  featureGroups: [
    {
      id: "vertrieb",
      label: "Vertrieb & Aufträge",
      features: [
        {
          id: "auftraege",
          label: "Angebote, Aufträge & Rechnungen",
          description: "Vom Angebot bis zur Rechnung in einem Ablauf.",
          importance: "kern",
        },
        {
          id: "crm-modul",
          label: "CRM",
          description: "Kunden und Verkaufschancen im ERP.",
          importance: "standard",
        },
        {
          id: "shop",
          label: "Shop- & Marktplatzanbindung",
          description:
            "Bestellungen aus Onlineshop, Amazon oder eBay übernehmen.",
          importance: "standard",
        },
      ],
    },
    {
      id: "logistik",
      label: "Warenwirtschaft & Produktion",
      features: [
        {
          id: "warenwirtschaft",
          label: "Warenwirtschaft & Lager",
          description: "Bestände, Lagerorte und Inventur.",
          importance: "kern",
        },
        {
          id: "einkauf",
          label: "Einkauf & Bestellwesen",
          description: "Bestellungen bei Lieferanten und Bestellvorschläge.",
          importance: "kern",
        },
        {
          id: "produktion",
          label: "Produktion",
          description: "Stücklisten, Fertigungsaufträge und Planung.",
          importance: "extra",
        },
      ],
    },
    {
      id: "finanzen",
      label: "Finanzen & Projekte",
      features: [
        {
          id: "fibu",
          label: "Finanzbuchhaltung",
          description: "Buchhaltung direkt im ERP.",
          importance: "standard",
        },
        {
          id: "datev",
          label: "DATEV-Schnittstelle",
          description: "Übergabe an das Steuerbüro.",
          importance: "kern",
        },
        {
          id: "projekte",
          label: "Projekte & Zeiterfassung",
          description: "Projekte und Stunden für Dienstleister.",
          importance: "extra",
        },
      ],
    },
    {
      id: "technik",
      label: "Technik",
      features: [
        {
          id: "api",
          label: "Offene API",
          description: "Anbindung an Shop, Versand und Drittsysteme.",
          importance: "standard",
        },
        {
          id: "app",
          label: "Mobile App",
          description: "Lager oder Vertrieb unterwegs.",
          importance: "standard",
        },
      ],
    },
  ],
  seo: {
    title: "ERP-Software Vergleich 2026: 14 Systeme für den Mittelstand",
    description:
      "ERP für KMU im Vergleich: Sage, weclapp, Xentral, JTL, Odoo, Haufe X360, Business Central und SAP Business One – mit Euro-Preisen und Hosting.",
    h1: "ERP-Software Vergleich 2026: 14 Systeme für KMU",
  },
  intro:
    "Ein ERP verbindet Vertrieb, Einkauf, Lager, Produktion und Buchhaltung in einem System. Für kleine und mittlere Unternehmen gibt es heute Cloud-ERPs mit Monatspreisen ebenso wie klassische Systeme mit Partnern. Wir haben 14 Lösungen verglichen – mit den Preisen, die die Anbieter veröffentlichen, und den Angaben zum Hosting.",
  testTasks: [
    "Angebot in Auftrag und Rechnung umwandeln",
    "Bestellvorschlag für Lagerartikel erzeugen",
    "Bestellung aus dem Onlineshop übernehmen",
    "Wareneingang buchen und Inventur durchführen",
    "Buchungsstapel an DATEV übergeben",
    "Fertigungsauftrag mit Stückliste anlegen",
  ],
  guideMdx: "erp-software",
  faqs: [
    {
      q: "Was kostet ein ERP-System?",
      a: "Cloud-ERPs für KMU kosten in unserem Vergleich zwischen rund 39 € und 240 € pro Nutzer und Monat, je nach Funktionsumfang. E-Commerce-ERPs wie Xentral oder JTL rechnen eher nach Aufträgen ab. Dazu kommen Einführung, Datenübernahme und Schulung, die oft einen großen Teil der Gesamtkosten ausmachen.",
    },
    {
      q: "Cloud oder On-Premise?",
      a: "Cloud-ERPs sind schneller eingeführt und kommen ohne eigene Server aus. On-Premise-Systeme bieten mehr Kontrolle, verlangen aber IT-Betrieb. Mehr dazu im Ratgeber Cloud oder On-Premise.",
    },
    {
      q: "Wie lange dauert eine ERP-Einführung?",
      a: "Kleine Cloud-ERPs lassen sich in einigen Wochen einführen, größere Projekte mit Partner dauern mehrere Monate. Plane Zeit für Datenbereinigung und Schulung ein.",
    },
  ],
  related: ["buchhaltungssoftware", "shopsysteme", "crm-software"],
  authorId: "redaktion",
  editorId: "redaktion",
  updatedAt: "2026-11-03",
} satisfies CategoryInput;
