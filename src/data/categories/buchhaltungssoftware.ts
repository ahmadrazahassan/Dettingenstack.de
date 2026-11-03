import type { CategoryInput } from "@/lib/schema";

// Buchhaltungssoftware: priced per month for the company, with a number of users included (unit „pauschal“,
// team size = users). Reference teams 1 and 3 users (§7.3).
export const buchhaltungssoftware = {
  slug: "buchhaltungssoftware",
  name: "Buchhaltungssoftware",
  nameSingular: "Buchhaltungssoftware",
  nameShort: "Buchhaltung",
  unitLabel: { singular: "Nutzer", plural: "Nutzer" },
  unit: "pauschal",
  referenceTeams: [1, 3],
  maxTeam: 15,
  scoreWeights: {
    funktionen: 0.25,
    bedienbarkeit: 0.2,
    preisLeistung: 0.15,
    datenschutz: 0.15,
    support: 0.1,
    integrationen: 0.15,
  },
  featureGroups: [
    {
      id: "belege",
      label: "Belege & Archiv",
      features: [
        {
          id: "belegerfassung",
          label: "Automatische Belegerfassung",
          description:
            "Belege per App, Upload oder E-Mail erfassen und Daten automatisch auslesen.",
          importance: "kern",
        },
        {
          id: "belegarchiv",
          label: "GoBD-konformes Belegarchiv",
          description:
            "Belege unveränderbar und für die Aufbewahrungsfrist archivieren.",
          importance: "kern",
        },
        {
          id: "e-rechnung-empfang",
          label: "E-Rechnungen empfangen",
          description: "XRechnung und ZUGFeRD lesen, anzeigen und archivieren.",
          importance: "kern",
        },
      ],
    },
    {
      id: "buchhaltung",
      label: "Buchhaltung & Steuern",
      features: [
        {
          id: "buchungen",
          label: "Buchen mit SKR 03 / SKR 04",
          description:
            "Geschäftsvorfälle auf Konten der DATEV-Kontenrahmen buchen.",
          importance: "kern",
        },
        {
          id: "ustva",
          label: "Umsatzsteuer-Voranmeldung",
          description:
            "UStVA berechnen und per ELSTER an das Finanzamt senden.",
          importance: "kern",
        },
        {
          id: "euer",
          label: "Einnahmen-Überschuss-Rechnung",
          description: "EÜR für Selbstständige und Freiberufler erstellen.",
          importance: "kern",
        },
        {
          id: "bilanz",
          label: "Doppelte Buchführung & Bilanz",
          description:
            "Für bilanzierende Unternehmen, etwa GmbH oder eingetragene Kaufleute.",
          importance: "standard",
        },
        {
          id: "anlagen",
          label: "Anlagenverwaltung & AfA",
          description: "Anlagegüter verwalten und Abschreibungen buchen.",
          importance: "standard",
        },
        {
          id: "kassenbuch",
          label: "Kassenbuch",
          description: "Bargeschäfte GoBD-konform erfassen.",
          importance: "standard",
        },
        {
          id: "kostenstellen",
          label: "Kostenstellen",
          description: "Kosten nach Bereichen oder Projekten auswerten.",
          importance: "extra",
        },
      ],
    },
    {
      id: "bank",
      label: "Bank & Zahlungen",
      features: [
        {
          id: "bankanbindung",
          label: "Bankanbindung",
          description: "Kontoumsätze automatisch abrufen.",
          importance: "kern",
        },
        {
          id: "zahlungsabgleich",
          label: "Zahlungsabgleich",
          description: "Umsätze automatisch Belegen und Rechnungen zuordnen.",
          importance: "kern",
        },
        {
          id: "zahlungen",
          label: "Überweisungen auslösen",
          description: "Rechnungen direkt aus der Software bezahlen.",
          importance: "extra",
        },
      ],
    },
    {
      id: "rechnungen",
      label: "Angebote & Rechnungen",
      features: [
        {
          id: "rechnungen",
          label: "Angebote & Rechnungen",
          description: "Ausgangsrechnungen mit allen Pflichtangaben erstellen.",
          importance: "standard",
        },
        {
          id: "e-rechnung-versand",
          label: "E-Rechnungen erstellen",
          description: "XRechnung oder ZUGFeRD für die Pflicht ab 2027/2028.",
          importance: "standard",
        },
        {
          id: "mahnwesen",
          label: "Mahnwesen",
          description: "Zahlungserinnerungen und Mahnstufen.",
          importance: "standard",
        },
      ],
    },
    {
      id: "zusammenarbeit",
      label: "Steuerberatung & Team",
      features: [
        {
          id: "steuerberater-zugang",
          label: "Zugang für die Steuerberatung",
          description:
            "Eigener Zugang für die Kanzlei, ohne Zusatzkosten oder gegen Gebühr.",
          importance: "kern",
        },
        {
          id: "datev-export",
          label: "DATEV-Export",
          description:
            "Buchungen und Belege im DATEV-Format oder per DATEV-Datenservice übergeben.",
          importance: "kern",
        },
        {
          id: "freigaben",
          label: "Freigabe-Workflows",
          description: "Eingangsrechnungen mehrstufig prüfen und freigeben.",
          importance: "extra",
        },
      ],
    },
    {
      id: "technik",
      label: "Apps & Erweiterungen",
      features: [
        {
          id: "app",
          label: "Mobile App",
          description: "Belege fotografieren und Zahlen unterwegs ansehen.",
          importance: "standard",
        },
        {
          id: "api",
          label: "Offene API",
          description: "Eigene Anbindungen an Shop, CRM oder ERP.",
          importance: "extra",
        },
        {
          id: "lohn",
          label: "Lohnabrechnung",
          description: "Löhne und Gehälter direkt abrechnen.",
          importance: "extra",
        },
      ],
    },
  ],
  seo: {
    title: "Buchhaltungssoftware Vergleich 2026: 12 Tools im Check",
    description:
      "Buchhaltungssoftware im Vergleich: Lexware Office, sevdesk, BuchhaltungsButler, Papierkram, WISO MeinBüro und mehr – mit Euro-Preisen, DATEV und E-Rechnung.",
    h1: "Buchhaltungssoftware Vergleich 2026: 12 Tools im Check",
  },
  intro:
    "Buchhaltungssoftware erfasst Belege, gleicht Kontoumsätze ab, erstellt die Umsatzsteuer-Voranmeldung und übergibt alles an die Steuerberatung. Wir haben zwölf Lösungen verglichen, die in Deutschland verbreitet sind – mit den Preisen, die die Anbieter auf ihren Preisseiten nennen, und den Angaben zu Serverstandort, DATEV und E-Rechnung.",
  testTasks: [
    "Eingangsrechnung per App fotografieren und buchen",
    "XRechnung empfangen, prüfen und archivieren",
    "Kontoumsätze abrufen und Belegen zuordnen",
    "Umsatzsteuer-Voranmeldung per ELSTER übermitteln",
    "Monatsdaten im DATEV-Format an die Steuerberatung übergeben",
    "E-Rechnung im Format XRechnung erstellen und versenden",
  ],
  guideMdx: "buchhaltungssoftware",
  faqs: [
    {
      q: "Was kostet Buchhaltungssoftware?",
      a: "Für Selbstständige und kleine Unternehmen liegen die Listenpreise der Cloud-Lösungen in unserem Vergleich zwischen rund 9 € und 90 € pro Monat netto. Viele Anbieter rechnen pauschal pro Unternehmen und verlangen für weitere Nutzer einen Aufpreis. Rechnungsmanagement-Lösungen wie Candis richten sich an größere Teams und beginnen bei 389 € im Monat.",
    },
    {
      q: "Brauche ich als Kleinunternehmer eine Buchhaltungssoftware?",
      a: "Pflicht ist sie nicht. Sie hilft aber bei der Einnahmen-Überschuss-Rechnung, beim GoBD-konformen Archivieren und beim Empfang von E-Rechnungen, den du seit 2025 sicherstellen musst. Für wenige Belege im Monat reicht oft ein günstiger Einstiegstarif oder ein kostenloser Tarif wie bei Collmex oder Papierkram.",
    },
    {
      q: "Welche Software kann E-Rechnungen?",
      a: "Alle Cloud-Lösungen in unserem Vergleich nennen XRechnung und ZUGFeRD. Prüfe, ob der Empfang und der Versand im gewünschten Tarif enthalten sind und ob das XML-Original archiviert wird. Mehr dazu im Ratgeber zur E-Rechnungspflicht.",
    },
    {
      q: "Funktioniert die Software mit meinem Steuerbüro?",
      a: "Fast alle Anbieter exportieren Buchungen und Belege im DATEV-Format, viele bieten einen kostenlosen Zugang für die Steuerberatung. Frag dein Steuerbüro, welchen Weg es bevorzugt: Export-Datei oder direkte Übertragung an DATEV Unternehmen online.",
    },
    {
      q: "Kann ich mit der Software eine Bilanz erstellen?",
      a: "Viele Cloud-Lösungen sind auf die Einnahmen-Überschuss-Rechnung ausgelegt. Doppelte Buchführung und Bilanz bieten in unserem Vergleich etwa BuchhaltungsButler ab dem Tarif Smart und die Desktop-Software Lexware buchhaltung. Oft erstellt am Ende die Steuerberatung den Abschluss aus den exportierten Daten.",
    },
    {
      q: "Wo werden meine Buchhaltungsdaten gespeichert?",
      a: "Alle Cloud-Anbieter in unserem Vergleich nennen Rechenzentren in Deutschland, etwa in Frankfurt am Main, Köln oder Nürnberg. Zertifizierungen beziehen sich meist auf das Rechenzentrum, nicht auf den Software-Anbieter selbst. Lass dir den Auftragsverarbeitungsvertrag zeigen.",
    },
  ],
  related: [
    "rechnungsprogramme",
    "dokumentenmanagement-software",
    "erp-software",
  ],
  authorId: "redaktion",
  editorId: "redaktion",
  updatedAt: "2026-11-02",
} satisfies CategoryInput;
