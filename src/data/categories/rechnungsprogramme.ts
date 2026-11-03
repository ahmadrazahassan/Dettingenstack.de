import type { CategoryInput } from "@/lib/schema";

// Rechnungsprogramme: flat monthly price per company with a number of users (unit „pauschal“). Reference: 1 user (§7.3).
export const rechnungsprogramme = {
  slug: "rechnungsprogramme",
  name: "Rechnungsprogramme",
  nameSingular: "Rechnungsprogramm",
  nameShort: "Rechnungen",
  unitLabel: { singular: "Nutzer", plural: "Nutzer" },
  unit: "pauschal",
  referenceTeams: [1, 3],
  maxTeam: 10,
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
      id: "dokumente",
      label: "Angebote & Rechnungen",
      features: [
        {
          id: "rechnungen",
          label: "Angebote & Rechnungen",
          description:
            "Angebote, Rechnungen und Gutschriften mit allen Pflichtangaben.",
          importance: "kern",
        },
        {
          id: "e-rechnung-versand",
          label: "E-Rechnungen erstellen",
          description: "XRechnung oder ZUGFeRD für die Pflicht ab 2027/2028.",
          importance: "kern",
        },
        {
          id: "e-rechnung-empfang",
          label: "E-Rechnungen empfangen",
          description: "XRechnung und ZUGFeRD lesen und archivieren.",
          importance: "standard",
        },
        {
          id: "wiederkehrend",
          label: "Wiederkehrende Rechnungen",
          description: "Abo- und Serienrechnungen automatisch erstellen.",
          importance: "standard",
        },
        {
          id: "abschlag",
          label: "Abschlags- & Schlussrechnungen",
          description: "Teilzahlungen für Projekte und Aufträge abrechnen.",
          importance: "standard",
        },
      ],
    },
    {
      id: "zahlung",
      label: "Zahlungen & Mahnwesen",
      features: [
        {
          id: "mahnwesen",
          label: "Mahnwesen",
          description:
            "Zahlungserinnerungen und Mahnstufen, idealerweise automatisch.",
          importance: "kern",
        },
        {
          id: "bankanbindung",
          label: "Bankanbindung",
          description: "Kontoumsätze automatisch abrufen.",
          importance: "standard",
        },
        {
          id: "zahlungsabgleich",
          label: "Zahlungsabgleich",
          description: "Zahlungseingänge Rechnungen automatisch zuordnen.",
          importance: "standard",
        },
        {
          id: "online-zahlung",
          label: "Online-Zahlung",
          description: "Bezahllink oder Kartenzahlung direkt aus der Rechnung.",
          importance: "extra",
        },
      ],
    },
    {
      id: "buchhaltung",
      label: "Steuerbüro & Buchhaltung",
      features: [
        {
          id: "datev-export",
          label: "DATEV-Export",
          description:
            "Rechnungen und Buchungen an die Steuerberatung übergeben.",
          importance: "kern",
        },
        {
          id: "steuerberater-zugang",
          label: "Zugang für die Steuerberatung",
          description: "Eigener Zugang für die Kanzlei.",
          importance: "standard",
        },
        {
          id: "belegerfassung",
          label: "Belegerfassung",
          description: "Eingangsbelege per App oder E-Mail erfassen.",
          importance: "extra",
        },
        {
          id: "euer",
          label: "Einnahmen-Überschuss-Rechnung",
          description: "EÜR direkt im Rechnungsprogramm.",
          importance: "extra",
        },
        {
          id: "ustva",
          label: "Umsatzsteuer-Voranmeldung",
          description: "UStVA per ELSTER übermitteln.",
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
          description:
            "Rechnungen unterwegs schreiben und Belege fotografieren.",
          importance: "standard",
        },
        {
          id: "api",
          label: "Offene API",
          description: "Anbindung an Shop, CRM oder eigene Systeme.",
          importance: "extra",
        },
        {
          id: "shop-anbindung",
          label: "Shop- & Marktplatz-Anbindung",
          description: "Rechnungen aus Shopify, Amazon oder eBay automatisch.",
          importance: "extra",
        },
        {
          id: "zeiterfassung",
          label: "Zeiterfassung",
          description: "Stunden erfassen und in Rechnungen übernehmen.",
          importance: "extra",
        },
        {
          id: "lager",
          label: "Lager & Artikel",
          description: "Bestände und Artikel verwalten.",
          importance: "extra",
        },
      ],
    },
  ],
  seo: {
    title: "Rechnungsprogramm Vergleich 2026: 12 Tools im Check",
    description:
      "Rechnungsprogramme im Vergleich: easybill, Billomat, FastBill, sevdesk, Lexware Office, Zervant und mehr – mit Euro-Preisen, E-Rechnung, Mahnwesen und DATEV.",
    h1: "Rechnungsprogramm Vergleich 2026: 12 Tools im Check",
  },
  intro:
    "Ein Rechnungsprogramm erstellt Angebote und Rechnungen mit allen Pflichtangaben, verschickt E-Rechnungen, erinnert an offene Posten und übergibt alles an die Steuerberatung. Wir haben zwölf Programme verglichen, die in Deutschland verbreitet sind – mit den Preisen von den Preisseiten der Anbieter und den Angaben zu E-Rechnung, Mahnwesen und Serverstandort.",
  testTasks: [
    "Angebot erstellen und in eine Rechnung umwandeln",
    "E-Rechnung im Format XRechnung erzeugen und validieren",
    "Wiederkehrende Rechnung für einen Wartungsvertrag anlegen",
    "Zahlungseingang abgleichen und Mahnung auslösen",
    "Rechnungen eines Monats im DATEV-Format exportieren",
    "Rechnung unterwegs per App schreiben",
  ],
  guideMdx: "rechnungsprogramme",
  faqs: [
    {
      q: "Was kostet ein Rechnungsprogramm?",
      a: "Die Bezahltarife in unserem Vergleich beginnen bei rund 9 € im Monat netto bei jährlicher Zahlung. Mehrere Anbieter haben kostenlose Tarife mit Limits, etwa easybill (50 Dokumente im Monat), sevdesk (3 Rechnungen) oder Zervant (5 Rechnungen).",
    },
    {
      q: "Muss mein Rechnungsprogramm E-Rechnungen können?",
      a: "Ab 2027 (bei mehr als 800.000 € Vorjahresumsatz) bzw. spätestens 2028 musst du im inländischen B2B-Geschäft E-Rechnungen ausstellen, empfangen musst du sie schon seit 2025. Alle Programme in unserem Vergleich nennen XRechnung oder ZUGFeRD; prüfe, in welchem Tarif.",
    },
    {
      q: "Reicht ein Rechnungsprogramm statt Buchhaltungssoftware?",
      a: "Für Selbstständige mit EÜR oft ja, wenn das Programm Belege erfasst und an die Steuerberatung exportiert. Einige Anbieter wie orgaMAX oder Billomat bieten zusätzlich EÜR; für eine vollständige Buchhaltung mit UStVA lohnt der Blick in unseren Vergleich der Buchhaltungssoftware.",
    },
    {
      q: "Was gilt für Kleinunternehmer?",
      a: "Kleinunternehmer nach § 19 UStG müssen keine E-Rechnungen ausstellen, aber empfangen können. Wichtig ist eine Vorlage mit dem Hinweis auf die Steuerbefreiung. Mehr im Ratgeber zu Rechnungen als Kleinunternehmer.",
    },
    {
      q: "Wo liegen meine Rechnungsdaten?",
      a: "Die meisten Anbieter in unserem Vergleich nennen Server in Deutschland. Zervant (Teil der dänischen Ageras-Gruppe) speichert in der EU, mit Unterauftragnehmern auch in den USA.",
    },
  ],
  related: ["buchhaltungssoftware", "crm-software", "zeiterfassungssoftware"],
  authorId: "redaktion",
  editorId: "redaktion",
  updatedAt: "2026-11-03",
} satisfies CategoryInput;
