import type { ComparisonInput } from "@/lib/schema";

// Drafts (isPlaceholder) until both tools are tested hands-on. Facts come from the tool files.
const dates = { publishedAt: "2026-11-03", updatedAt: "2026-11-03" };
const people = { authorId: "redaktion", editorId: "redaktion" };
const untested = {
  winner: "unentschieden",
  note: "Noch nicht im Praxistest verglichen.",
};

export const hubspotVsPipedrive = {
  slug: "hubspot-vs-pipedrive",
  toolA: "hubspot-crm",
  toolB: "pipedrive",
  category: "crm-software",
  isPlaceholder: false,
  seo: {
    title: "HubSpot vs. Pipedrive (2026): Der große CRM-Vergleich",
    description:
      "HubSpot oder Pipedrive? Gratis-Einstieg, Pipeline, Automatisierung, Euro-Preise pro Nutzer und Hosting in der EU im direkten Vergleich.",
    h1: "HubSpot vs. Pipedrive: Welches CRM passt zu deinem Vertrieb?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Pipedrive ist das fokussierte Vertriebs-CRM mit fairen Preisen pro Nutzer. HubSpot startet kostenlos und wächst zu einer Plattform für Vertrieb, Marketing und Service – wird ab Professional aber deutlich teurer.",
    chooseAIf: [
      "du kostenlos starten willst",
      "Marketing und Vertrieb im selben System arbeiten sollen",
      "du Inbound-Marketing betreibst",
    ],
    chooseBIf: [
      "dein Team vor allem Deals abschließt",
      "du Automatisierung zu planbaren Kosten willst",
      "Daten standardmäßig in der EU liegen sollen",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "hubspot-crm",
      note: "HubSpot deckt Vertrieb, Marketing und Service ab; Pipedrive konzentriert sich auf die Pipeline.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "pipedrive",
      note: "Pipedrive Growth kostet 24 € pro Nutzer bei Jahreszahlung; HubSpot Sales Hub Professional 100 € pro Lizenz plus Onboarding.",
    },
    datenschutz: {
      winner: "pipedrive",
      note: "Pipedrive hostet EU-Kunden in der EU und nennt ISO 27001; bei HubSpot ist das Rechenzentrum in Frankfurt optional.",
    },
    support: untested,
    integrationen: {
      winner: "unentschieden",
      note: "Beide mit großem Marketplace und offener API.",
    },
  },
  featureGroupVerdicts: {
    grundlagen: {
      winner: "unentschieden",
      note: "Beide verwalten Kontakte, Deals und Aufgaben; HubSpot schon kostenlos.",
    },
    kommunikation: {
      winner: "unentschieden",
      note: "Sequenzen bei Pipedrive ab Growth, bei HubSpot ab Professional.",
    },
    vertrieb: {
      winner: "pipedrive",
      note: "Prognosen und Automatisierung bei Pipedrive schon ab 24 € pro Nutzer.",
    },
    technik: {
      winner: "unentschieden",
      note: "Apps für iOS und Android, offene API bei beiden.",
    },
  },
  personas: [
    {
      label: "Gründerteam mit 3 Personen",
      pick: "hubspot-crm",
      reason: "Kostenlose CRM-Tools reichen für den Start.",
    },
    {
      label: "Vertriebsteam mit 10 Personen",
      pick: "pipedrive",
      reason: "Growth mit E-Mail-Sync und Automatisierung zu planbaren Kosten.",
    },
    {
      label: "Mittelständler mit Marketingteam",
      pick: "hubspot-crm",
      reason: "Marketing Hub und Sales Hub auf einer Datenbasis.",
    },
  ],
  migration:
    "Exportiere Kontakte, Firmen und Deals als CSV und ordne die Pipeline-Phasen vorher zu. Beide Anbieter bieten Import-Assistenten; E-Mail-Verläufe und Anhänge wandern oft nur teilweise mit.",
  faqs: [
    {
      q: "Was kosten HubSpot und Pipedrive für 5 Nutzer?",
      a: "Pipedrive Growth: 5 × 24 € = 120 € pro Monat bei jährlicher Zahlung. HubSpot Sales Hub Professional: 5 × 100 € = 500 € pro Monat laut Produktkatalog, plus einmalig 1.470 € Onboarding. Die kostenlosen HubSpot-Tools kosten nichts. Alle Preise netto.",
    },
    {
      q: "Wo liegen die Daten?",
      a: "Pipedrive hostet Kunden aus der EU in AWS-Rechenzentren in Frankfurt und Dublin. HubSpot bietet neuen Kunden optional ein Rechenzentrum in Frankfurt an.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const hubspotVsSalesforce = {
  slug: "hubspot-vs-salesforce",
  toolA: "hubspot-crm",
  toolB: "salesforce-sales-cloud",
  category: "crm-software",
  isPlaceholder: false,
  seo: {
    title: "HubSpot vs. Salesforce (2026): Der große CRM-Vergleich",
    description:
      "HubSpot oder Salesforce? Einstieg, Anpassbarkeit, Euro-Preise pro Nutzer, Vertragslaufzeit und Hosting in Deutschland im direkten Vergleich.",
    h1: "HubSpot vs. Salesforce: Welche CRM-Plattform passt zu dir?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "HubSpot ist schneller eingeführt und startet kostenlos. Salesforce lässt sich tiefer anpassen und bietet mit der EU Operating Zone Datenhaltung in Deutschland – ab Pro Suite aber nur mit Jahresvertrag und meist mit Partner.",
    chooseAIf: [
      "du ohne Implementierungspartner starten willst",
      "Marketing und Vertrieb eng zusammenarbeiten",
      "du klein anfangen und später wachsen willst",
    ],
    chooseBIf: [
      "dein Vertrieb komplexe, individuelle Prozesse hat",
      "Daten in Deutschland liegen müssen",
      "du ein großes Partner-Ökosystem brauchst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "salesforce-sales-cloud",
      note: "Salesforce ist tiefer anpassbar; HubSpot ist breiter im Marketing.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "unentschieden",
      note: "Beide ab 100 € pro Lizenz im Profi-Tarif; HubSpot mit Gratis-Tools, Salesforce mit Starter Suite für 25 €.",
    },
    datenschutz: {
      winner: "salesforce-sales-cloud",
      note: "Salesforce bietet die EU Operating Zone mit deutscher Betreibergesellschaft; HubSpot ein optionales Rechenzentrum in Frankfurt.",
    },
    support: untested,
    integrationen: {
      winner: "unentschieden",
      note: "Beide mit großen Marketplaces und APIs.",
    },
  },
  featureGroupVerdicts: {
    grundlagen: {
      winner: "unentschieden",
      note: "Kontakte, Deals und Aufgaben bei beiden.",
    },
    kommunikation: {
      winner: "unentschieden",
      note: "E-Mail-Integration bei beiden; Sequenzen bei HubSpot ab Professional.",
    },
    vertrieb: {
      winner: "salesforce-sales-cloud",
      note: "Angebote und Prognosen bei Salesforce ab Pro Suite, stark erweiterbar.",
    },
    technik: {
      winner: "unentschieden",
      note: "Mobile Apps und APIs bei beiden.",
    },
  },
  personas: [
    {
      label: "Start-up mit 5 Personen",
      pick: "hubspot-crm",
      reason: "Kostenlos starten, ohne Partner einführen.",
    },
    {
      label: "Mittelständler mit 80 Vertriebsmitarbeitenden",
      pick: "salesforce-sales-cloud",
      reason: "Individuelle Prozesse und Datenhaltung in Deutschland.",
    },
    {
      label: "B2B-Unternehmen mit Content-Marketing",
      pick: "hubspot-crm",
      reason: "Marketing und Vertrieb auf einer Plattform.",
    },
  ],
  migration:
    "Plane einen Wechsel zwischen den beiden als Projekt: Datenmodell abgleichen, benutzerdefinierte Felder anlegen, Kontakte, Firmen und Opportunities per CSV oder Migrationswerkzeug übernehmen und Automatisierungen neu bauen.",
  faqs: [
    {
      q: "Gibt es Salesforce mit monatlicher Zahlung?",
      a: "Laut Preisseite nur die Starter Suite. Pro Suite, Core, Advanced und Max werden jährlich abgerechnet.",
    },
    {
      q: "Welches CRM ist günstiger für 20 Nutzer?",
      a: "Im Profi-Tarif kosten beide rund 100 € pro Nutzer: Salesforce Pro Suite 2.000 € pro Monat, HubSpot Sales Hub Professional 2.000 € pro Monat plus Onboarding. Günstiger sind Salesforce Starter Suite (500 €) und HubSpot Starter (400 €). Alle Preise netto laut Anbieter.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const pipedriveVsZohoCrm = {
  slug: "pipedrive-vs-zoho-crm",
  toolA: "pipedrive",
  toolB: "zoho-crm",
  category: "crm-software",
  isPlaceholder: false,
  seo: {
    title: "Pipedrive vs. Zoho CRM (2026): Der große Vergleich",
    description:
      "Pipedrive oder Zoho CRM? Pipeline, Automatisierung, Gratis-Edition, Preise und Hosting in der EU im direkten Vergleich für kleine Vertriebsteams.",
    h1: "Pipedrive vs. Zoho CRM: Welches CRM passt zu kleinen Teams?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "Zoho CRM ist für bis zu drei Nutzer kostenlos und hat schon in der Gratis-Edition Workflows. Pipedrive ist fokussierter, mit klaren Euro-Preisen und starker Pipeline-Ansicht.",
    chooseAIf: [
      "dein Team eine einfache, visuelle Pipeline will",
      "du transparente Euro-Preise brauchst",
      "du schnell ohne Einrichtung starten willst",
    ],
    chooseBIf: [
      "du mit bis zu drei Nutzern kostenlos starten willst",
      "du weitere Zoho-Apps nutzt",
      "du viel selbst anpassen willst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "zoho-crm",
      note: "Zoho bietet viele Anpassungen und Workflows schon kostenlos.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "zoho-crm",
      note: "Zoho ist für bis zu drei Nutzer kostenlos; Pipedrive startet bei 14 € pro Nutzer.",
    },
    datenschutz: {
      winner: "pipedrive",
      note: "Beide hosten in der EU; bei Zoho ist Supportzugriff aus Indien möglich.",
    },
    support: untested,
    integrationen: {
      winner: "unentschieden",
      note: "Pipedrive mit über 500 Integrationen, Zoho mit eigenem App-Ökosystem.",
    },
  },
  featureGroupVerdicts: {
    grundlagen: {
      winner: "unentschieden",
      note: "Kontakte, Pipeline und Aufgaben bei beiden.",
    },
    kommunikation: {
      winner: "pipedrive",
      note: "E-Mail-Sync und Sequenzen bei Pipedrive ab Growth belegt.",
    },
    vertrieb: {
      winner: "unentschieden",
      note: "Automatisierung bei Zoho schon kostenlos, Prognosen bei Pipedrive ab Growth.",
    },
    technik: {
      winner: "unentschieden",
      note: "Apps und API bei beiden.",
    },
  },
  personas: [
    {
      label: "Selbstständige mit Assistenz",
      pick: "zoho-crm",
      reason: "Kostenlos für bis zu drei Nutzer.",
    },
    {
      label: "Vertriebsteam mit 8 Personen",
      pick: "pipedrive",
      reason: "Klare Pipeline und planbare Kosten pro Nutzer.",
    },
    {
      label: "KMU mit Zoho Books",
      pick: "zoho-crm",
      reason: "CRM und Buchhaltung aus einem Ökosystem.",
    },
  ],
  migration:
    "Beide importieren Kontakte, Firmen und Deals per CSV. Lege Pipeline-Phasen und Pflichtfelder vorher an und teste den Import mit einer kleinen Datei.",
  faqs: [
    {
      q: "Ist Zoho CRM wirklich kostenlos?",
      a: "Ja, die Free-Edition für bis zu drei Nutzer kostet nichts. Für mehr Nutzer und Funktionen brauchst du eine Bezahledition; die Euro-Preise zeigt Zoho auf der Preisseite.",
    },
    {
      q: "Welches CRM hostet in der EU?",
      a: "Beide: Pipedrive für EU-Kunden in Frankfurt und Dublin, Zoho über zoho.eu in Amsterdam und Dublin.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;

export const centralstationcrmVsPipedrive = {
  slug: "centralstationcrm-vs-pipedrive",
  toolA: "centralstationcrm",
  toolB: "pipedrive",
  category: "crm-software",
  isPlaceholder: false,
  seo: {
    title: "CentralStationCRM vs. Pipedrive (2026): Der Vergleich",
    description:
      "CentralStationCRM oder Pipedrive? Deutsches Paket-CRM gegen internationales Pipeline-CRM: Preise, Funktionen und Datenschutz im direkten Vergleich.",
    h1: "CentralStationCRM vs. Pipedrive: Deutsches CRM oder Pipeline-Spezialist?",
  },
  verdict: {
    winner: "unentschieden",
    summary:
      "CentralStationCRM ist das günstigere, einfachere CRM mit Daten in Deutschland. Pipedrive bietet mehr Vertriebsfunktionen wie Sequenzen, Prognosen und Automatisierung.",
    chooseAIf: [
      "du Kontakte und Wiedervorlagen einfach pflegen willst",
      "Daten bei einem deutschen Anbieter liegen sollen",
      "du ein Paket für mehrere Nutzer suchst",
    ],
    chooseBIf: [
      "dein Team aktiv Deals durch eine Pipeline führt",
      "du Folge-E-Mails automatisieren willst",
      "du Umsatzprognosen brauchst",
    ],
  },
  criteriaNotes: {
    funktionen: {
      winner: "pipedrive",
      note: "Pipedrive bietet Sequenzen, Prognosen und Automatisierung; CentralStationCRM bleibt bewusst schlank.",
    },
    bedienbarkeit: untested,
    preisLeistung: {
      winner: "centralstationcrm",
      note: "Drei Nutzer kosten bei CentralStationCRM 25 € im Monat, bei Pipedrive Growth 72 € bei Jahreszahlung.",
    },
    datenschutz: {
      winner: "centralstationcrm",
      note: "Deutscher Anbieter mit Speicherung in Deutschland; Pipedrive hostet in der EU.",
    },
    support: untested,
    integrationen: {
      winner: "pipedrive",
      note: "Pipedrive mit über 500 Integrationen.",
    },
  },
  featureGroupVerdicts: {
    grundlagen: {
      winner: "pipedrive",
      note: "Pipeline bei Pipedrive Kern des Produkts, bei CentralStationCRM Zusatzmodul.",
    },
    kommunikation: {
      winner: "pipedrive",
      note: "E-Mail-Sync und Sequenzen ab Growth.",
    },
    vertrieb: {
      winner: "pipedrive",
      note: "Prognosen, Automatisierung und Angebote.",
    },
    technik: {
      winner: "unentschieden",
      note: "Beide mit API.",
    },
  },
  personas: [
    {
      label: "Handwerksbetrieb mit 3 Büroplätzen",
      pick: "centralstationcrm",
      reason: "Kontaktpflege für 25 € im Monat, Daten in Deutschland.",
    },
    {
      label: "B2B-Vertrieb mit 6 Personen",
      pick: "pipedrive",
      reason: "Pipeline, Sequenzen und Prognosen.",
    },
    {
      label: "Beratung mit Datenschutzfokus",
      pick: "centralstationcrm",
      reason: "Deutscher Anbieter mit Speicherung in Deutschland.",
    },
  ],
  migration:
    "Exportiere Personen, Firmen und Notizen als CSV und importiere sie mit den Import-Assistenten. Deals und Pipeline-Phasen musst du im Ziel-CRM vorher anlegen.",
  faqs: [
    {
      q: "Was kosten beide für 10 Nutzer?",
      a: "CentralStationCRM Small Office: 79 € pro Monat für bis zu 10 Nutzer. Pipedrive Growth: 10 × 24 € = 240 € pro Monat bei jährlicher Zahlung. Alle Preise netto.",
    },
    {
      q: "Gibt es kostenlose Versionen?",
      a: "CentralStationCRM bietet Starter kostenlos für 3 Nutzer und 200 Kontakte. Pipedrive hat keinen Gratis-Tarif, aber 14 Tage Test ohne Kreditkarte.",
    },
  ],
  ...people,
  ...dates,
} satisfies ComparisonInput;
