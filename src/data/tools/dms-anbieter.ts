import { dmsFeatures, dmsQuoteTool } from "./_dms";

// ECM vendors without published list prices. Each entry only states what the vendor site confirms.

export const docuware = dmsQuoteTool({
  slug: "docuware",
  name: "DocuWare",
  vendor: {
    name: "DocuWare GmbH",
    hq: "Germering",
    countryCode: "DE",
    website: "https://start.docuware.com/de/",
  },
  tagline:
    "Dokumentenmanagement und Workflow-Automatisierung, als Cloud oder lokal",
  bestFor: "Mittelständler mit vielen Belegprozessen",
  companySizes: ["klein", "mittel", "gross"],
  source: "https://start.docuware.com/de/",
  note: "DocuWare veröffentlicht keine Listenpreise; Angebote kommen vom Anbieter oder von Partnern.",
  highlights: [
    "Archiv und Workflows",
    "Eingangsrechnungen",
    "Cloud oder lokal",
  ],
  features: dmsFeatures({}),
  onPremise: "unbekannt",
  platforms: ["web", "windows", "ios", "android"],
  funktionen: 85,
  scoreNote:
    "etabliertes DMS mit Schwerpunkt auf Workflows; Details nicht geprüft.",
  pros: [
    {
      title: "Etabliert im Mittelstand",
      detail: "Großes Partnernetz in Deutschland.",
    },
    {
      title: "Prozessfokus",
      detail: "Ausgerichtet auf Belegprozesse wie Rechnungen.",
    },
  ],
  cons: [
    { title: "Keine Listenpreise", detail: "Kosten erst im Angebot." },
    { title: "Partnerabhängig", detail: "Einführung oft über einen Partner." },
  ],
  verdict: {
    short:
      "DocuWare ist ein etabliertes DMS für Mittelständler mit vielen Belegprozessen. Preise und Einführungsaufwand klärst du im Angebot, meist mit einem Partner.",
    idealFor: [
      "Mittelstand mit Rechnungs- und Vertragsprozessen",
      "Unternehmen mit Partnerbetreuung",
    ],
    notIdealFor: ["Kleinstbetriebe mit kleinem Budget"],
  },
});

export const elo = dmsQuoteTool({
  slug: "elo",
  name: "ELO ECM Suite",
  vendor: {
    name: "ELO Digital Office GmbH",
    hq: "Stuttgart",
    countryCode: "DE",
    website: "https://www.elo.com/de-de.html",
  },
  tagline: "ECM-Plattform aus Stuttgart für Archiv, Akten und Workflows",
  bestFor: "Mittelstand und Konzerne mit Partner",
  companySizes: ["klein", "mittel", "gross"],
  source: "https://www.elo.com/de-de.html",
  note: "ELO veröffentlicht keine Listenpreise; Vertrieb und Einführung laufen über ELO Business Partner.",
  highlights: ["Archiv, Akten und Workflows", "Über Business Partner"],
  features: dmsFeatures({}),
  onPremise: "unbekannt",
  platforms: ["web", "windows", "ios", "android"],
  funktionen: 85,
  scoreNote: "umfassende ECM-Suite; Details nicht geprüft.",
  pros: [
    { title: "Deutscher Hersteller", detail: "ECM-Software aus Stuttgart." },
    { title: "Skalierbar", detail: "Vom Mittelstand bis zum Konzern." },
  ],
  cons: [
    { title: "Keine Listenpreise", detail: "Kosten erst im Partnerangebot." },
    {
      title: "Einführungsprojekt",
      detail: "Meist mit Partner und Anpassungen.",
    },
  ],
  verdict: {
    short:
      "ELO ist eine umfassende ECM-Suite eines deutschen Herstellers, verkauft über Partner. Lohnt sich vor allem für Mittelständler mit vielen Akten und Prozessen.",
    idealFor: [
      "Mittelständler mit Aktenstrukturen",
      "Unternehmen mit Partnerbetreuung",
    ],
    notIdealFor: ["Kleine Büros mit einfacher Ablage"],
  },
});

export const dvelop = dmsQuoteTool({
  slug: "d-velop",
  name: "d.velop documents",
  vendor: {
    name: "d.velop AG",
    hq: "Gescher",
    countryCode: "DE",
    website: "https://www.d-velop.de/",
  },
  tagline: "DMS-Plattform aus dem Münsterland mit App-Store für Fachlösungen",
  bestFor: "Mittelständler mit Fachprozessen wie Personalakte oder Rechnungen",
  companySizes: ["klein", "mittel", "gross"],
  source:
    "https://www.d-velop.de/store/paperless-solutions-erweiterte-aktensuche",
  note: "d.velop documents gibt es in den Editionen basic, business und ultimate, als Cloud oder On-Premises. Grundpreise nennt der Store nicht; Zusatz-Apps haben eigene Preise, etwa die erweiterte Aktensuche ab 15 € pro Monat für 1–10 Nutzer.",
  highlights: [
    "Editionen basic, business, ultimate",
    "Cloud oder On-Premises",
    "App-Store mit Fachlösungen",
  ],
  features: dmsFeatures({
    eingangsrechnungen: { status: "addon", note: "Über Apps im d.velop Store" },
  }),
  onPremise: "ja",
  platforms: ["web", "windows", "ios", "android"],
  funktionen: 85,
  scoreNote:
    "Plattform mit vielen Fach-Apps; Grundfunktionen nicht im Detail geprüft.",
  pros: [
    {
      title: "App-Store",
      detail: "Fachlösungen für Rechnungen, Personalakte und mehr.",
    },
    { title: "Cloud oder lokal", detail: "Beide Betriebsmodelle verfügbar." },
  ],
  cons: [
    {
      title: "Grundpreise nicht öffentlich",
      detail: "Nur Zusatz-Apps haben Preise im Store.",
    },
    { title: "Kosten addieren sich", detail: "Apps werden einzeln berechnet." },
  ],
  verdict: {
    short:
      "d.velop documents ist eine flexible DMS-Plattform mit vielen Fach-Apps, als Cloud oder lokal. Rechne Grundlizenz und Apps zusammen, bevor du vergleichst.",
    idealFor: [
      "Mittelständler mit Fachprozessen",
      "Unternehmen mit Cloud- oder On-Premises-Wunsch",
    ],
    notIdealFor: ["Kleine Büros mit einfacher Ablage"],
  },
});

export const enaio = dmsQuoteTool({
  slug: "enaio",
  name: "enaio",
  vendor: {
    name: "OPTIMAL SYSTEMS GmbH",
    hq: "Berlin",
    countryCode: "DE",
    website: "https://www.optimal-systems.de/",
  },
  tagline:
    "Full-Feature-DMS aus Berlin für Verwaltung, Mittelstand und Konzerne",
  bestFor: "Verwaltungen und Mittelständler",
  companySizes: ["mittel", "gross"],
  source: "https://www.optimal-systems.de/enaio",
  note: "OPTIMAL SYSTEMS veröffentlicht für enaio keine Listenpreise.",
  highlights: [
    "Full-Feature-DMS",
    "Lösungen für Personal, Verträge, Rechnungen",
  ],
  features: dmsFeatures({}),
  onPremise: "unbekannt",
  platforms: ["web", "windows"],
  funktionen: 85,
  scoreNote: "Full-Feature-DMS mit Fachlösungen; Details nicht geprüft.",
  pros: [
    {
      title: "Fachlösungen",
      detail: "Personal, Verträge und Rechnungen als Lösungen.",
    },
    { title: "Deutscher Hersteller", detail: "Entwicklung in Berlin." },
  ],
  cons: [
    { title: "Keine Listenpreise", detail: "Kosten erst im Angebot." },
    {
      title: "Für kleine Teams groß",
      detail: "Ausgerichtet auf Mittelstand und Verwaltung.",
    },
  ],
  verdict: {
    short:
      "enaio ist ein umfassendes DMS aus Berlin mit Fachlösungen, verbreitet in Verwaltung und Mittelstand. Für kleine Büros ist es meist überdimensioniert.",
    idealFor: [
      "Öffentliche Verwaltung",
      "Mittelständler mit vielen Fachprozessen",
    ],
    notIdealFor: ["Kleinstbetriebe"],
  },
});

export const easyArchive = dmsQuoteTool({
  slug: "easy-archive",
  name: "EASY Archive",
  vendor: {
    name: "EASY SOFTWARE AG",
    hq: "Mülheim an der Ruhr",
    countryCode: "DE",
    website: "https://easy-software.com/de/",
  },
  tagline:
    "Archiv- und ECM-Lösungen aus Mülheim – lokal, Private Cloud oder Cloud-native",
  bestFor: "Mittelständler und SAP-Anwender",
  companySizes: ["mittel", "gross"],
  source: "https://easy-software.com/de/",
  note: "EASY veröffentlicht keine Listenpreise. Die Lösungen gibt es laut Website als On-Premises-, Private-Cloud-, Cloud-native- oder Hybridvariante.",
  highlights: [
    "On-Premises, Private Cloud oder Cloud",
    "Archiv-, Rechnungs-, Vertrags- und HR-Lösungen",
    "SAP-Integration",
  ],
  features: dmsFeatures({ archiv: { status: "ja" } }),
  onPremise: "ja",
  serverNote:
    "Laut Website als On-Premises-, Private-Cloud-, Cloud-native- oder Hybridlösung",
  platforms: ["web", "windows"],
  funktionen: 80,
  scoreNote: "Archiv- und ECM-Lösungen mit SAP-Fokus; Details nicht geprüft.",
  pros: [
    {
      title: "Flexibler Betrieb",
      detail: "Lokal, Private Cloud, Cloud-native oder hybrid.",
    },
    { title: "SAP-Erfahrung", detail: "Lösungen für SAP-Anwender." },
  ],
  cons: [
    { title: "Keine Listenpreise", detail: "Kosten erst im Angebot." },
    {
      title: "Für kleine Teams groß",
      detail: "Ausgerichtet auf den Mittelstand.",
    },
  ],
  verdict: {
    short:
      "EASY bietet Archiv- und ECM-Lösungen in jedem Betriebsmodell und ist besonders für SAP-Anwender interessant. Preise gibt es nur im Angebot.",
    idealFor: ["SAP-Anwender", "Mittelständler mit Archivpflichten"],
    notIdealFor: ["Kleine Büros"],
  },
});

export const mFiles = dmsQuoteTool({
  slug: "m-files",
  name: "M-Files",
  vendor: {
    name: "M-Files Oy",
    hq: "Tampere",
    countryCode: "FI",
    website: "https://www.m-files.com/de/",
  },
  tagline: "Metadatenbasiertes Dokumentenmanagement mit KI-Funktionen",
  bestFor: "Wissensintensive Unternehmen wie Beratungen und Industrie",
  companySizes: ["klein", "mittel", "gross"],
  source: "https://www.m-files.com/de/",
  note: "M-Files verweist für Preise auf eine eigene Preisseite und Angebote; Listenpreise haben wir nicht verifiziert.",
  highlights: ["Metadaten statt Ordner", "KI-Funktionen"],
  features: dmsFeatures({}),
  onPremise: "unbekannt",
  platforms: ["web", "windows", "ios", "android"],
  funktionen: 85,
  scoreNote: "metadatenbasiertes DMS mit KI; Details nicht geprüft.",
  pros: [
    {
      title: "Metadaten statt Ordner",
      detail: "Dokumente werden über Eigenschaften gefunden.",
    },
    {
      title: "Gute Bewertungen",
      detail: "Laut Website hohe Nutzerbewertungen.",
    },
  ],
  cons: [
    { title: "Preise nicht verifiziert", detail: "Kosten im Angebot klären." },
    {
      title: "Umdenken nötig",
      detail: "Metadaten-Ansatz verlangt Einarbeitung.",
    },
  ],
  verdict: {
    short:
      "M-Files ordnet Dokumente über Metadaten statt Ordner und passt zu wissensintensiven Unternehmen. Plane Zeit ein, um Teams an den Ansatz zu gewöhnen.",
    idealFor: [
      "Beratungen und Ingenieurbüros",
      "Unternehmen mit vielen Dokumenttypen",
    ],
    notIdealFor: ["Teams, die eine klassische Ordnerablage wollen"],
  },
});

export const windream = dmsQuoteTool({
  slug: "windream",
  name: "windream",
  vendor: {
    name: "dataglobal Group (windream)",
    hq: "Bochum",
    countryCode: "DE",
    website: "https://dataglobalgroup.com/",
  },
  tagline:
    "ECM- und Workflow-System aus Deutschland, heute Teil der dataglobal Group",
  bestFor: "Mittelständler mit Windows-Umgebung",
  companySizes: ["klein", "mittel", "gross"],
  source: "https://dataglobalgroup.com/",
  note: "windream gehört heute zur dataglobal Group; windream.com leitet auf deren Website weiter. Listenpreise werden nicht veröffentlicht, der Vertrieb läuft über Partner.",
  highlights: ["ECM aus Deutschland", "Über Partner"],
  features: dmsFeatures({}),
  onPremise: "unbekannt",
  platforms: ["windows", "web"],
  funktionen: 80,
  scoreNote: "ECM-System; Details nicht geprüft.",
  pros: [
    { title: "Deutscher Hersteller", detail: "Entwicklung in Bochum." },
    { title: "Partnernetz", detail: "Betreuung über regionale Partner." },
  ],
  cons: [
    { title: "Keine Listenpreise", detail: "Kosten erst im Partnerangebot." },
    {
      title: "Wenig geprüft",
      detail: "Funktionen für diesen Vergleich nicht im Detail verifiziert.",
    },
  ],
  verdict: {
    short:
      "windream ist ein ECM-System eines deutschen Herstellers, verkauft über Partner. Für eine fundierte Entscheidung brauchst du eine Demo und ein Partnerangebot.",
    idealFor: [
      "Mittelständler mit Windows-Infrastruktur",
      "Unternehmen mit Partnerbetreuung",
    ],
    notIdealFor: ["Teams, die eine reine Cloud-Lösung suchen"],
  },
});

export const sharepoint = dmsQuoteTool({
  slug: "sharepoint",
  name: "Microsoft SharePoint",
  vendor: {
    name: "Microsoft Corporation",
    hq: "Redmond",
    countryCode: "US",
    website:
      "https://www.microsoft.com/de-de/microsoft-365/sharepoint/collaboration",
  },
  tagline:
    "Dateiablage, Intranet und Zusammenarbeit als Teil von Microsoft 365",
  bestFor: "Unternehmen, die Microsoft 365 bereits nutzen",
  companySizes: ["kleinst", "klein", "mittel", "gross"],
  source:
    "https://www.microsoft.com/de-de/microsoft-365/sharepoint/compare-sharepoint-plans",
  note: "SharePoint ist Bestandteil vieler Microsoft-365-Business-Pakete; einen Einzelpreis für SharePoint Plan 1 in Euro konnten wir nicht verifizieren. Revisionssichere Archivierung erfordert zusätzliche Konfiguration oder Drittanbieter.",
  highlights: ["Teil von Microsoft 365", "Teams- und Office-Integration"],
  features: dmsFeatures({
    versionierung: { status: "ja" },
    "web-client": { status: "ja" },
  }),
  onPremise: "unbekannt",
  serverNote: "Für Kunden in der EU gilt die EU Data Boundary von Microsoft",
  platforms: ["web", "windows", "macos", "ios", "android"],
  funktionen: 70,
  scoreNote:
    "starke Zusammenarbeit, aber kein klassisches revisionssicheres DMS.",
  pros: [
    {
      title: "Oft schon lizenziert",
      detail: "In vielen Microsoft-365-Paketen enthalten.",
    },
    {
      title: "Office-Integration",
      detail: "Arbeitet direkt mit Word, Excel und Teams.",
    },
  ],
  cons: [
    {
      title: "Kein Archiv ab Werk",
      detail: "Revisionssichere Ablage braucht Zusatzaufwand.",
    },
    {
      title: "Struktur nötig",
      detail: "Ohne Governance wird die Ablage schnell unübersichtlich.",
    },
  ],
  verdict: {
    short:
      "SharePoint ist ideal für Zusammenarbeit an Dokumenten im Microsoft-Umfeld, ersetzt aber kein revisionssicheres Archiv. Für Rechnungen und GoBD-Pflichten ergänzt man meist ein DMS.",
    idealFor: ["Teams mit Microsoft 365", "Intranet und Projektablage"],
    notIdealFor: ["Revisionssichere Archivierung ohne Zusatzlösung"],
  },
});
