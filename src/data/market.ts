// Marktdaten (§11.14). Only official figures, each with its source; values in percent.
// Destatis, IKT-Erhebung 2025: enterprises with at least 10 employees, EU enterprise concept from 2025 on.

export type MarketChart = {
  id: string;
  title: string;
  subtitle: string;
  firstColumn: string;
  data: { label: string; value: number }[];
  highlight?: string;
  source: { name: string; title: string; url: string };
  date: string;
};

const cloudRelease = {
  name: "Statistisches Bundesamt (Destatis)",
  title: "Pressemitteilung Nr. 416 vom 24. November 2025",
  url: "https://www.destatis.de/DE/Presse/Pressemitteilungen/2025/11/PD25_416_52911.html",
};
const aiTable = {
  name: "Statistisches Bundesamt (Destatis)",
  title:
    "Unternehmen mit Nutzung von KI-Technologien nach Beschäftigtengrößenklassen",
  url: "https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/IKT-in-Unternehmen-IKT-Branche/Tabellen/ikti-unternehmen-kuenstliche-intelligenz.html",
};

export const marketSections: {
  id: string;
  title: string;
  intro: string;
  charts: MarketChart[];
}[] = [
  {
    id: "cloud",
    title: "Cloud-Software",
    intro:
      "Gut jedes zweite Unternehmen in Deutschland zahlt für Cloud-Dienste. Je größer das Unternehmen, desto häufiger. Business-Software wie ERP und CRM liegt seltener in der Cloud als E-Mail und Office.",
    charts: [
      {
        id: "cloud-groesse",
        title: "Nutzung kostenpflichtiger Cloud-Dienste 2025",
        subtitle: "Anteil der Unternehmen nach Beschäftigtengröße, in %",
        firstColumn: "Unternehmensgröße",
        highlight: "Insgesamt",
        data: [
          { label: "Insgesamt", value: 54 },
          { label: "10–49 Beschäftigte", value: 51 },
          { label: "50–249 Beschäftigte", value: 65 },
          { label: "250 und mehr", value: 86 },
        ],
        source: cloudRelease,
        date: "2025-11-24",
      },
      {
        id: "cloud-dienste",
        title: "Welche Cloud-Dienste Unternehmen nutzen",
        subtitle:
          "Anteil an den Unternehmen mit Cloud-Nutzung 2025, Mehrfachnennungen, in %",
        firstColumn: "Dienst",
        data: [
          { label: "E-Mail", value: 76 },
          { label: "Datenspeicherung", value: 71 },
          { label: "Office-Anwendungen", value: 68 },
          { label: "ERP-Software", value: 23 },
          { label: "CRM-Software", value: 23 },
        ],
        source: cloudRelease,
        date: "2025-11-24",
      },
      {
        id: "cloud-branche",
        title: "Cloud-Nutzung nach Wirtschaftsbereich 2025",
        subtitle:
          "Anteil der Unternehmen mit kostenpflichtigen Cloud-Diensten, ausgewählte Bereiche, in %",
        firstColumn: "Wirtschaftsbereich",
        highlight: "Alle Bereiche",
        data: [
          { label: "Information und Kommunikation", value: 88 },
          { label: "Alle Bereiche", value: 54 },
          { label: "Gastgewerbe", value: 45 },
          { label: "Verkehr und Lagerei", value: 43 },
        ],
        source: cloudRelease,
        date: "2025-11-24",
      },
    ],
  },
  {
    id: "ki",
    title: "Künstliche Intelligenz",
    intro:
      "Gut ein Viertel der Unternehmen setzt KI ein. Große Unternehmen tun das mehr als doppelt so oft wie kleine. Am häufigsten geht es um Texte und um das Erzeugen von Bildern, Videos und Audio.",
    charts: [
      {
        id: "ki-groesse",
        title: "Nutzung von KI-Technologien 2025",
        subtitle: "Anteil der Unternehmen nach Beschäftigtengröße, in %",
        firstColumn: "Unternehmensgröße",
        highlight: "Insgesamt",
        data: [
          { label: "Insgesamt", value: 26 },
          { label: "10–49 Beschäftigte", value: 23 },
          { label: "50–249 Beschäftigte", value: 36 },
          { label: "250 und mehr", value: 57 },
        ],
        source: aiTable,
        date: "2025-11-24",
      },
      {
        id: "ki-technologien",
        title: "Welche KI-Technologien Unternehmen nutzen",
        subtitle:
          "Anteil an den Unternehmen mit KI-Nutzung 2025, Mehrfachnennungen, in %",
        firstColumn: "Technologie",
        data: [
          { label: "Text Mining", value: 52 },
          { label: "Bilder, Videos, Audio erzeugen", value: 52 },
          { label: "Spracherkennung", value: 42 },
          { label: "Texte und Code erzeugen", value: 35 },
          { label: "Workflows automatisieren", value: 27 },
          { label: "Maschinelles Lernen", value: 23 },
          { label: "Bilderkennung", value: 17 },
        ],
        source: aiTable,
        date: "2025-11-24",
      },
    ],
  },
];
