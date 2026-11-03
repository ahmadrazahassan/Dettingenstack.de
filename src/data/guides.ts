import type { GuideInput } from "@/lib/schema";

// Ratgeber (§21.3). Every legal statement in the body links to one of these sources (§13.6).
// All URLs were opened on the accessedAt date. Bodies: src/content/ratgeber/{slug}.mdx.

const base = {
  authorId: "redaktion",
  editorId: "redaktion",
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
} as const;
const accessedAt = "2026-11-02";

const law = (name: string, title: string, url: string) => ({
  name,
  title,
  url,
  accessedAt,
});

const src = {
  ustg14: law(
    "Gesetze im Internet",
    "§ 14 UStG – Ausstellung von Rechnungen",
    "https://www.gesetze-im-internet.de/ustg_1980/__14.html",
  ),
  ustg14b: law(
    "Gesetze im Internet",
    "§ 14b UStG – Aufbewahrung von Rechnungen",
    "https://www.gesetze-im-internet.de/ustg_1980/__14b.html",
  ),
  ustg19: law(
    "Gesetze im Internet",
    "§ 19 UStG – Besteuerung der Kleinunternehmer",
    "https://www.gesetze-im-internet.de/ustg_1980/__19.html",
  ),
  ustg27: law(
    "Gesetze im Internet",
    "§ 27 UStG – Allgemeine Übergangsvorschriften",
    "https://www.gesetze-im-internet.de/ustg_1980/__27.html",
  ),
  ustdv33: law(
    "Gesetze im Internet",
    "§ 33 UStDV – Rechnungen über Kleinbeträge",
    "https://www.gesetze-im-internet.de/ustdv_1980/__33.html",
  ),
  ustdv34a: law(
    "Gesetze im Internet",
    "§ 34a UStDV – Rechnungen von Kleinunternehmern",
    "https://www.gesetze-im-internet.de/ustdv_1980/__34a.html",
  ),
  ao147: law(
    "Gesetze im Internet",
    "§ 147 AO – Ordnungsvorschriften für die Aufbewahrung von Unterlagen",
    "https://www.gesetze-im-internet.de/ao_1977/__147.html",
  ),
  hgb257: law(
    "Gesetze im Internet",
    "§ 257 HGB – Aufbewahrung von Unterlagen",
    "https://www.gesetze-im-internet.de/hgb/__257.html",
  ),
  betrvg87: law(
    "Gesetze im Internet",
    "§ 87 BetrVG – Mitbestimmungsrechte",
    "https://www.gesetze-im-internet.de/betrvg/__87.html",
  ),
  arbschg3: law(
    "Gesetze im Internet",
    "§ 3 ArbSchG – Grundpflichten des Arbeitgebers",
    "https://www.gesetze-im-internet.de/arbschg/__3.html",
  ),
  arbzg16: law(
    "Gesetze im Internet",
    "§ 16 ArbZG – Aushang und Arbeitszeitnachweise",
    "https://www.gesetze-im-internet.de/arbzg/__16.html",
  ),
  uwg7: law(
    "Gesetze im Internet",
    "§ 7 UWG – Unzumutbare Belästigungen",
    "https://www.gesetze-im-internet.de/uwg_2004/__7.html",
  ),
  bgb307: law(
    "Gesetze im Internet",
    "§ 307 BGB – Inhaltskontrolle",
    "https://www.gesetze-im-internet.de/bgb/__307.html",
  ),
  bgb310: law(
    "Gesetze im Internet",
    "§ 310 BGB – Anwendungsbereich",
    "https://www.gesetze-im-internet.de/bgb/__310.html",
  ),
  bdsg26: law(
    "Gesetze im Internet",
    "§ 26 BDSG – Datenverarbeitung für Zwecke des Beschäftigungsverhältnisses",
    "https://www.gesetze-im-internet.de/bdsg_2018/__26.html",
  ),
  bsig30: law(
    "Gesetze im Internet",
    "§ 30 BSIG – Risikomanagementmaßnahmen",
    "https://www.gesetze-im-internet.de/bsig_2025/__30.html",
  ),
  dsgvo: law(
    "EUR-Lex",
    "Verordnung (EU) 2016/679 (Datenschutz-Grundverordnung)",
    "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679",
  ),
  dpf: law(
    "U.S. Department of Commerce",
    "Data Privacy Framework – Liste zertifizierter Unternehmen",
    "https://www.dataprivacyframework.gov/",
  ),
  bfdi: law(
    "BfDI",
    "Die Bundesbeauftragte für den Datenschutz und die Informationsfreiheit",
    "https://www.bfdi.bund.de/",
  ),
  c5: law(
    "BSI",
    "Kriterienkatalog C5 (Cloud Computing Compliance Criteria Catalogue)",
    "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/kriterienkatalog-c5_node.html",
  ),
  bag: law(
    "Bundesarbeitsgericht",
    "Beschluss vom 13.09.2022 – 1 ABR 22/21",
    "https://www.bundesarbeitsgericht.de/entscheidung/1-abr-22-21/",
  ),
  eugh: law(
    "Gerichtshof der EU",
    "Urteil vom 14.05.2019 – C-55/18 (CCOO)",
    "https://curia.europa.eu/juris/liste.jsf?num=C-55/18",
  ),
  ihkERechnung: law(
    "IHK Köln",
    "BMF-Schreiben zur E-Rechnung vom 15.10.2025",
    "https://www.ihk.de/koeln/hauptnavigation/recht-steuern/steuern/bmf-schreiben-zur-e-rechnung-vom-15-10-2025-6774012",
  ),
  eRechnungBund: law(
    "Bundesministerium des Innern",
    "E-Rechnung – Informationsportal des Bundes",
    "https://www.e-rechnung-bund.de/",
  ),
  nis2: law(
    "Heuking",
    "Ab jetzt gilt’s: NIS2-Umsetzungsgesetz in Kraft (05.12.2025)",
    "https://www.heuking.de/de/news-events/newsletter-fachbeitraege/artikel/ab-jetzt-gilts-nis2-umsetzungsgesetz-in-kraft.html",
  ),
  bafa: law(
    "BAFA",
    "Förderung von Unternehmensberatungen für KMU",
    "https://www.bafa.de/DE/Wirtschaft/Beratung_Finanzierung/Unternehmensberatung/unternehmensberatung_node.html",
  ),
  kfw: law(
    "KfW",
    "ERP-Digitalisierungs- und Innovationskredit (380, 390, 391)",
    "https://www.kfw.de/partner/KfW-Partnerportal/Finanzierungspartner/F%C3%B6rderprodukte/ERP-Digitalisierungs-und-Innovationskredit-(380-390-391)/index.jsp",
  ),
  mittelstandDigital: law(
    "BMWE",
    "Was ist Mittelstand-Digital?",
    "https://www.mittelstand-digital.de/MD/Navigation/DE/Ueber-uns/was-ist-mittelstand-digital/was-ist-md.html",
  ),
  foerderdatenbank: law(
    "BMWE",
    "Förderdatenbank des Bundes",
    "https://www.foerderdatenbank.de/",
  ),
  destatisCloud: {
    ...law(
      "Statistisches Bundesamt",
      "Jedes zweite Unternehmen nutzt kostenpflichtige Cloud-Services (Pressemitteilung Nr. 416)",
      "https://www.destatis.de/DE/Presse/Pressemitteilungen/2025/11/PD25_416_52911.html",
    ),
    publishedAt: "2025-11-24",
  },
};

export const guides: GuideInput[] = [
  {
    ...base,
    slug: "e-rechnungspflicht",
    title: "E-Rechnungspflicht 2025–2028: Was Unternehmen jetzt wissen müssen",
    description:
      "Seit 2025 musst du E-Rechnungen empfangen können, ab 2027 und 2028 auch ausstellen. Fristen, Formate, Ausnahmen und was deine Software können muss.",
    lead: "Seit dem 1. Januar 2025 muss jedes Unternehmen in Deutschland E-Rechnungen empfangen können. Ausstellen musst du sie ab 2027 (Vorjahresumsatz über 800.000 €) oder spätestens ab 2028. Ein PDF per E-Mail zählt dann nicht mehr als E-Rechnung.",
    topic: "Recht & Pflichten",
    imageId: "B-21",
    relatedCategories: ["rechnungsprogramme", "buchhaltungssoftware"],
    keyTakeaways: [
      "Empfangen: Pflicht für alle Unternehmen seit dem 1. Januar 2025.",
      "Ausstellen: ab 2027 bei mehr als 800.000 € Vorjahresumsatz, spätestens ab 2028 für alle im inländischen B2B-Geschäft.",
      "E-Rechnung heißt strukturierte Daten nach EN 16931, etwa XRechnung oder ZUGFeRD ab Version 2 – ein PDF reicht nicht.",
      "Ausgenommen vom Ausstellen: Kleinbetragsrechnungen bis 250 €, Fahrausweise und Kleinunternehmer.",
    ],
    sources: [
      src.ustg14,
      src.ustg27,
      src.ihkERechnung,
      src.eRechnungBund,
      src.ustdv33,
      src.ustg14b,
    ],
  },
  {
    ...base,
    slug: "zeiterfassungspflicht",
    title: "Zeiterfassungspflicht: Was Arbeitgeber beachten müssen",
    description:
      "Arbeitszeit erfassen ist seit dem BAG-Beschluss von 2022 Pflicht. Was heute gilt, was der Gesetzentwurf von 2026 vorsieht und wie du die Erfassung umsetzt.",
    lead: "Ja, Arbeitgeber müssen die Arbeitszeit ihrer Beschäftigten erfassen – das hat das Bundesarbeitsgericht 2022 entschieden. Eine bestimmte Form schreibt das Gesetz bislang nicht vor. Ein Entwurf zur Reform des Arbeitszeitgesetzes sieht die elektronische Erfassung vor, ist aber noch nicht beschlossen.",
    topic: "Recht & Pflichten",
    imageId: "B-22",
    relatedCategories: ["zeiterfassungssoftware", "hr-software"],
    keyTakeaways: [
      "Die Pflicht folgt aus § 3 ArbSchG, so das BAG im Beschluss vom 13.09.2022 (1 ABR 22/21).",
      "Zu erfassen sind Beginn, Ende und Dauer der täglichen Arbeitszeit – auch bei Vertrauensarbeitszeit.",
      "Papier, Excel oder App sind heute zulässig, solange die Erfassung verlässlich und vollständig ist.",
      "Der Referentenentwurf von 2026 sieht elektronische Erfassung vor. Stand November 2026 ist er nicht beschlossen.",
    ],
    sources: [src.bag, src.eugh, src.arbschg3, src.arbzg16, src.betrvg87],
  },
  {
    ...base,
    slug: "gobd",
    title: "GoBD einfach erklärt: So bleibt deine Buchhaltung prüfungssicher",
    description:
      "Was die GoBD verlangen, welche Aufbewahrungsfristen gelten, wozu du eine Verfahrensdokumentation brauchst und woran du GoBD-taugliche Software erkennst.",
    lead: "Die GoBD sind die Regeln der Finanzverwaltung für digitale Buchführung: Belege und Buchungen müssen vollständig, richtig, zeitgerecht, geordnet und unveränderbar sein – und im Prüfungsfall lesbar vorliegen. Software allein macht dich nicht GoBD-konform, aber sie kann vieles absichern.",
    topic: "Recht & Pflichten",
    imageId: "B-23",
    relatedCategories: [
      "buchhaltungssoftware",
      "dokumentenmanagement-software",
    ],
    keyTakeaways: [
      "GoBD sind kein Gesetz, sondern eine Verwaltungsanweisung des BMF auf Basis von AO und HGB.",
      "Bücher und Jahresabschlüsse: 10 Jahre aufbewahren, Buchungsbelege seit 2025: 8 Jahre, Geschäftsbriefe: 6 Jahre.",
      "Änderungen an Buchungen müssen nachvollziehbar bleiben – festschreiben statt überschreiben.",
      "Eine Verfahrensdokumentation beschreibt, wie Belege bei dir ankommen, verarbeitet und archiviert werden.",
    ],
    sources: [src.ao147, src.hgb257, src.ustg14b],
  },
  {
    ...base,
    slug: "dsgvo-check-software",
    title:
      "DSGVO-Check für Software: AVV, Serverstandort und Drittlandtransfer",
    description:
      "Bevor du Personal- oder Kundendaten in eine Cloud-Software gibst: die fünf Punkte, die du prüfen musst – vom AVV nach Art. 28 DSGVO bis zum Drittlandtransfer.",
    lead: "Wer eine Cloud-Software mit personenbezogenen Daten nutzt, bleibt für diese Daten verantwortlich. Du brauchst deshalb einen Auftragsverarbeitungsvertrag, musst wissen, wo die Daten liegen und wer darauf zugreifen kann, und eine Rechtsgrundlage für Übermittlungen außerhalb der EU.",
    topic: "Datenschutz & Sicherheit",
    imageId: "B-24",
    relatedCategories: ["hr-software", "crm-software", "newsletter-software"],
    keyTakeaways: [
      "Ohne Auftragsverarbeitungsvertrag (Art. 28 DSGVO) darfst du keine personenbezogenen Daten an den Anbieter geben.",
      "Entscheidend ist nicht nur der Serverstandort, sondern auch, wer Zugriff hat – inklusive Subunternehmer.",
      "Übermittlungen in die USA sind über das EU-US Data Privacy Framework möglich, wenn der Empfänger zertifiziert ist.",
      "Lass dir technische und organisatorische Maßnahmen (TOM) und Zertifikate wie ISO 27001 oder BSI C5 zeigen.",
    ],
    sources: [src.dsgvo, src.dpf, src.c5, src.bfdi],
  },
  {
    ...base,
    slug: "software-kosten-berechnen",
    title:
      "Software-Kosten richtig kalkulieren: Gesamtkosten statt Listenpreis",
    description:
      "Der Listenpreis ist selten der Preis, den du zahlst. So rechnest du die Gesamtkosten einer Business-Software über drei Jahre – mit Beispielrechnung und Checkliste.",
    lead: "Rechne Software-Kosten immer über die geplante Nutzungsdauer, meist drei Jahre: laufende Lizenzkosten für deine echte Nutzerzahl plus Einrichtung, Zusatzmodule, Schnittstellen, Schulung und interne Arbeitszeit. Erst diese Gesamtkosten machen Angebote vergleichbar.",
    topic: "Kosten & Verträge",
    imageId: "B-25",
    relatedCategories: ["hr-software"],
    keyTakeaways: [
      "Vergleiche Angebote immer für deine echte Nutzerzahl und dieselben Funktionen.",
      "Achte auf Mindestabnahmen, Zusatzmodule, Einrichtungsgebühren und Preise, die nur bei Jahreszahlung gelten.",
      "Interne Arbeitszeit für Einführung und Datenübernahme ist oft der größte versteckte Kostenblock.",
      "Plane Preiserhöhungen ein und prüfe, wie der Vertrag sie regelt.",
    ],
    sources: [src.bgb307],
  },
  {
    ...base,
    slug: "crm-einfuehrung",
    title: "CRM einführen im Mittelstand: Schritt für Schritt",
    description:
      "Ein CRM scheitert selten an der Technik, sondern an Daten und Akzeptanz. Fünf Schritte von der Zielsetzung bis zum Go-live – mit Datenschutz-Check und Checkliste.",
    lead: "Ein CRM bringt nur etwas, wenn das Vertriebsteam es täglich nutzt. Starte deshalb mit einem klaren Ziel und einem einfachen Vertriebsprozess, bereinige deine Kontaktdaten vor dem Import und führe das System in Etappen ein – zuerst mit dem Team, das am meisten davon hat.",
    topic: "Auswahl & Einführung",
    imageId: "B-26",
    relatedCategories: ["crm-software"],
    keyTakeaways: [
      "Formuliere vor der Toolauswahl zwei bis drei messbare Ziele, etwa schnellere Angebotsnachverfolgung.",
      "Bilde zuerst deinen echten Vertriebsprozess ab – nicht den, den das Tool vorschlägt.",
      "Bereinige Dubletten und alte Kontakte vor dem Import.",
      "Kundendaten sind personenbezogen: AVV, Löschkonzept und Rechtsgrundlagen gehören zur Einführung.",
    ],
    sources: [src.dsgvo, src.uwg7],
  },
  {
    ...base,
    slug: "hr-software-betriebsrat",
    title: "HR-Software und Betriebsrat: Mitbestimmung nach § 87 BetrVG",
    description:
      "HR-Software kann Leistung und Verhalten überwachen – deshalb hat der Betriebsrat ein Mitbestimmungsrecht. So bereitest du Einführung und Betriebsvereinbarung vor.",
    lead: "Hat dein Unternehmen einen Betriebsrat, darfst du HR-Software in aller Regel nicht ohne seine Zustimmung einführen. Nach § 87 Abs. 1 Nr. 6 BetrVG reicht es, dass die Software objektiv geeignet ist, Verhalten oder Leistung zu überwachen – eine Absicht ist nicht nötig.",
    topic: "Recht & Pflichten",
    imageId: "B-27",
    relatedCategories: ["hr-software", "zeiterfassungssoftware"],
    keyTakeaways: [
      "Mitbestimmung nach § 87 Abs. 1 Nr. 6 BetrVG greift schon, wenn die Software zur Überwachung geeignet ist.",
      "Bezieh den Betriebsrat früh ein – vor der Vertragsunterschrift, nicht danach.",
      "Regle in einer Betriebsvereinbarung Zweck, Daten, Zugriffsrechte, Auswertungen und Löschfristen.",
      "Beschäftigtendaten brauchen eine Rechtsgrundlage; eine Betriebsvereinbarung kann sie liefern.",
    ],
    sources: [src.betrvg87, src.bdsg26, src.dsgvo, src.bag],
  },
  {
    ...base,
    slug: "datev-schnittstelle",
    title:
      "DATEV-Schnittstellen erklärt: Welche Software passt zu deinem Steuerbüro?",
    description:
      "DATEV-Export, Belegbilderservice oder Lohn-Schnittstelle: welche Arten der DATEV-Anbindung es gibt, was sie leisten und welche Fragen du vor dem Kauf stellen solltest.",
    lead: "„DATEV-Schnittstelle“ kann vieles heißen: von einer CSV-Datei, die du exportierst und dem Steuerbüro schickst, bis zur direkten Übertragung von Buchungen und Belegbildern in DATEV Unternehmen online. Kläre deshalb zuerst mit deinem Steuerbüro, welchen Weg es nutzt.",
    topic: "Auswahl & Einführung",
    imageId: "B-28",
    relatedCategories: [
      "buchhaltungssoftware",
      "hr-software",
      "rechnungsprogramme",
    ],
    keyTakeaways: [
      "Frag zuerst dein Steuerbüro, welche Übergabe es bevorzugt – Export-Datei oder direkte Übertragung.",
      "Der DATEV-Export (Buchungsstapel) ist am weitesten verbreitet, aber ein manueller Schritt.",
      "Direkte Anbindungen übertragen Buchungen und Belegbilder automatisch an DATEV Unternehmen online.",
      "Für Lohn zählen andere Schnittstellen: DATEV Lohn und Gehalt oder LODAS.",
    ],
    sources: [src.ao147, src.ustg14b],
  },
  {
    ...base,
    slug: "erp-auswahl",
    title: "ERP-Auswahl in 7 Schritten",
    description:
      "Ein ERP-Projekt bindet dich für Jahre. Sieben Schritte von der Prozessaufnahme über die Shortlist bis zum Vertrag – mit typischen Fehlern und einer Checkliste.",
    lead: "Wähle ein ERP-System anhand deiner Prozesse, nicht anhand von Funktionslisten: Prozesse aufnehmen, Anforderungen priorisieren, Shortlist bilden, mit eigenen Daten testen, Gesamtkosten vergleichen, Referenzen prüfen und erst dann verhandeln.",
    topic: "Auswahl & Einführung",
    imageId: "B-29",
    relatedCategories: ["erp-software"],
    keyTakeaways: [
      "Starte mit einer Aufnahme deiner Kernprozesse vom Angebot bis zur Zahlung.",
      "Trenne Muss-, Soll- und Kann-Anforderungen – und halte die Muss-Liste kurz.",
      "Lass dir Demos mit deinen eigenen Fällen zeigen, nicht die Standardpräsentation.",
      "Rechne Gesamtkosten über mindestens fünf Jahre, inklusive Einführungspartner.",
    ],
    sources: [src.ao147, src.dsgvo],
  },
  {
    ...base,
    slug: "projektmanagement-methoden",
    title: "Kanban, Scrum & Co.: Projektmethoden im Vergleich",
    description:
      "Kanban, Scrum, Wasserfall oder hybrid: wie die Methoden funktionieren, für welche Teams sie passen und welche Funktionen deine Projektmanagement-Software dafür braucht.",
    lead: "Kanban passt zu Teams mit laufend neuen Aufgaben, Scrum zu Produktentwicklung in festen Sprints, das Wasserfallmodell zu Projekten mit fixem Umfang und Termin. In der Praxis arbeiten viele Teams hybrid – wichtig ist, dass die Software deine Methode abbildet und nicht umgekehrt.",
    topic: "Auswahl & Einführung",
    imageId: "B-30",
    relatedCategories: ["projektmanagement-software"],
    keyTakeaways: [
      "Kanban begrenzt parallele Arbeit und macht Engpässe sichtbar.",
      "Scrum arbeitet in festen Sprints mit klaren Rollen und regelmäßigen Reviews.",
      "Wasserfall eignet sich, wenn Umfang, Budget und Termin vorab feststehen.",
      "Teste die Software mit einem echten Projekt deines Teams, bevor du dich festlegst.",
    ],
    sources: [src.dsgvo],
  },
  {
    ...base,
    slug: "newsletter-rechtssicher",
    title: "Newsletter rechtssicher versenden",
    description:
      "Einwilligung, Double-Opt-in, Abmeldelink, Impressum und Tracking: was du für einen rechtssicheren Newsletter in Deutschland brauchst – und was deine Software können muss.",
    lead: "Werbe-E-Mails darfst du nur mit vorheriger ausdrücklicher Einwilligung verschicken (§ 7 UWG). Weisen musst du sie im Zweifel nachweisen – deshalb ist das Double-Opt-in-Verfahren Standard. Dazu kommen ein Abmeldelink in jeder E-Mail, ein Impressum und eine Rechtsgrundlage für Tracking.",
    topic: "Recht & Pflichten",
    imageId: "B-31",
    relatedCategories: ["newsletter-software"],
    keyTakeaways: [
      "Ohne vorherige ausdrückliche Einwilligung ist Werbung per E-Mail unzulässig (§ 7 Abs. 2 UWG).",
      "Double-Opt-in dient als Nachweis; protokolliere Zeitpunkt und Inhalt der Einwilligung.",
      "Bestandskunden-Ausnahme nur unter den engen Voraussetzungen des § 7 Abs. 3 UWG.",
      "Öffnungs- und Klick-Tracking braucht eine eigene Rechtsgrundlage – im Zweifel eine Einwilligung.",
    ],
    sources: [src.uwg7, src.dsgvo, src.dpf],
  },
  {
    ...base,
    slug: "revisionssichere-archivierung",
    title: "Revisionssichere Archivierung: Was ein DMS können muss",
    description:
      "Welche Unterlagen du wie lange aufbewahren musst, was „revisionssicher“ technisch bedeutet und welche Funktionen ein Dokumentenmanagement-System dafür braucht.",
    lead: "Revisionssicher heißt: Dokumente werden vollständig, unveränderbar, auffindbar und für die Dauer der Aufbewahrungsfrist lesbar gespeichert – und jede Änderung ist nachvollziehbar. Ein DMS hilft dabei, ersetzt aber nicht die Verfahrensdokumentation.",
    topic: "Recht & Pflichten",
    imageId: "B-32",
    relatedCategories: [
      "dokumentenmanagement-software",
      "buchhaltungssoftware",
    ],
    keyTakeaways: [
      "Aufbewahrungsfristen: 10 Jahre für Bücher und Abschlüsse, 8 Jahre für Buchungsbelege, 6 Jahre für Geschäftsbriefe.",
      "Elektronisch eingegangene Dokumente musst du elektronisch aufbewahren – ein Ausdruck reicht nicht.",
      "Bei E-Rechnungen zählt der strukturierte Datensatz, nicht nur das PDF-Abbild.",
      "Wichtige DMS-Funktionen: Versionierung, Protokollierung, Rechteverwaltung, Löschsperren und Export.",
    ],
    sources: [src.ao147, src.hgb257, src.ustg14b, src.ihkERechnung],
  },
  {
    ...base,
    slug: "shopsystem-saas-oder-open-source",
    title: "Shopsystem wählen: SaaS oder Open Source?",
    description:
      "Gemieteter Shop oder eigene Installation: Kosten, Aufwand, Flexibilität und Rechtssicherheit im Vergleich – und welche Variante zu welcher Shopgröße passt.",
    lead: "Ein SaaS-Shop ist schneller startklar und nimmt dir Hosting, Updates und Sicherheit ab, kostet aber laufend Gebühren und begrenzt Anpassungen. Ein Open-Source-Shop lässt sich frei erweitern, verlangt aber Hosting, Wartung und meist eine Agentur.",
    topic: "Auswahl & Einführung",
    imageId: "B-33",
    relatedCategories: ["shopsysteme", "erp-software"],
    keyTakeaways: [
      "SaaS: schneller Start, planbare Monatskosten, weniger technische Verantwortung.",
      "Open Source: volle Kontrolle und Anpassbarkeit, dafür Hosting, Updates und Sicherheit in eigener Verantwortung.",
      "Rechne Transaktionsgebühren, Apps bzw. Plugins und Agenturkosten in die Gesamtkosten ein.",
      "Prüfe deutsche Rechtstexte, Zahlungsarten und die Anbindung an Warenwirtschaft und Buchhaltung.",
    ],
    sources: [src.dsgvo, src.ustg14],
  },
  {
    ...base,
    slug: "cloud-oder-on-premise",
    title: "Cloud oder On-Premise: Was passt zu deinem Unternehmen?",
    description:
      "Cloud-Software oder eigener Server: Kosten, Sicherheit, Datenschutz und Abhängigkeiten im Vergleich – mit Zahlen von Destatis und einer Entscheidungshilfe.",
    lead: "Für die meisten kleinen und mittleren Unternehmen ist Cloud-Software heute die einfachere Wahl: kein eigener Server, Updates inklusive, planbare Kosten. On-Premise lohnt sich vor allem bei besonderen Anforderungen an Datenhoheit, Anpassung oder bestehende IT-Infrastruktur.",
    topic: "Auswahl & Einführung",
    imageId: "B-34",
    relatedCategories: ["erp-software", "dokumentenmanagement-software"],
    keyTakeaways: [
      "2025 nutzten 54 % der Unternehmen ab 10 Beschäftigten kostenpflichtige Cloud-Dienste (Destatis).",
      "Cloud verlagert Betrieb und Updates zum Anbieter, aber nicht deine Verantwortung für die Daten.",
      "On-Premise bedeutet eigene Server, Backups, Sicherheitsupdates und Fachpersonal.",
      "Prüfe bei Cloud-Anbietern Serverstandort, AVV, Zertifikate (ISO 27001, BSI C5) und den Datenexport.",
    ],
    sources: [src.destatisCloud, src.c5, src.dsgvo],
  },
  {
    ...base,
    slug: "lastenheft-software",
    title: "Lastenheft für Software: Anleitung mit Vorlage",
    description:
      "Was in ein Lastenheft gehört, wie es sich vom Pflichtenheft unterscheidet und wie du Anforderungen so formulierst, dass Anbieter vergleichbare Angebote machen.",
    lead: "Im Lastenheft beschreibst du als Auftraggeber, was die Software leisten soll – nicht wie. Der Anbieter antwortet mit einem Pflichtenheft oder Angebot, das beschreibt, wie er es umsetzt. Ein gutes Lastenheft macht Angebote vergleichbar und spart Diskussionen nach Vertragsschluss.",
    topic: "Auswahl & Einführung",
    imageId: "B-35",
    relatedCategories: ["erp-software", "crm-software", "hr-software"],
    keyTakeaways: [
      "Lastenheft = Was (Auftraggeber), Pflichtenheft = Wie (Auftragnehmer).",
      "Beschreibe Ausgangslage, Ziele, Prozesse, Anforderungen, Schnittstellen und Rahmenbedingungen.",
      "Priorisiere Anforderungen nach Muss, Soll und Kann und formuliere sie prüfbar.",
      "Datenschutz, Datenexport und Support gehören ins Lastenheft, nicht erst in die Vertragsverhandlung.",
    ],
    sources: [src.dsgvo],
  },
  {
    ...base,
    slug: "foerderprogramme-digitalisierung",
    title: "Förderprogramme für Digitalisierung 2026",
    description:
      "Welche Förderungen es 2026 für Software und Digitalisierung im Mittelstand noch gibt: BAFA-Beratung, KfW-Kredit, Mittelstand-Digital und Programme der Länder.",
    lead: "Einen bundesweiten Zuschuss für den Kauf von Software gibt es 2026 nicht mehr – „Digital Jetzt“ und „go-digital“ sind ausgelaufen. Der Bund fördert Beratung (BAFA), Kredite (KfW) und kostenlose Unterstützung (Mittelstand-Digital). Zuschüsse für Investitionen kommen vor allem von den Ländern.",
    topic: "Kosten & Verträge",
    imageId: "B-36",
    relatedCategories: [],
    keyTakeaways: [
      "BAFA fördert Unternehmensberatungen für KMU mit 50 % (max. 1.750 €) bzw. 80 % (max. 2.800 €) der Beratungskosten.",
      "Die KfW finanziert Digitalisierungsvorhaben mit dem ERP-Digitalisierungs- und Innovationskredit über deine Hausbank.",
      "Mittelstand-Digital Zentren unterstützen kostenlos und anbieterneutral.",
      "Investitionszuschüsse vergeben vor allem die Länder – Suche in der Förderdatenbank des Bundes.",
    ],
    sources: [src.bafa, src.kfw, src.mittelstandDigital, src.foerderdatenbank],
  },
  {
    ...base,
    slug: "saas-vertraege",
    title: "SaaS-Verträge: Laufzeiten, Kündigungsfristen und Preiserhöhungen",
    description:
      "Worauf du in SaaS-Verträgen achten solltest: Mindestlaufzeit, automatische Verlängerung, Preisanpassungsklauseln, Datenexport und Service-Level – mit Prüfliste.",
    lead: "Im B2B-Geschäft gelten für SaaS-Verträge weniger Schutzregeln als für Verbraucher. Prüfe deshalb vor der Unterschrift vor allem Mindestlaufzeit, automatische Verlängerung, Kündigungsfrist, Preisanpassungsklauseln und wie du deine Daten am Vertragsende zurückbekommst.",
    topic: "Kosten & Verträge",
    imageId: "B-37",
    relatedCategories: ["hr-software"],
    keyTakeaways: [
      "Viele Verträge verlängern sich automatisch – notiere die Kündigungsfrist direkt nach Vertragsschluss.",
      "Preisanpassungsklauseln in AGB müssen auch unter Unternehmern angemessen sein (§ 307 BGB).",
      "Regle Datenexport und Löschung zum Vertragsende schriftlich.",
      "Service-Level (Verfügbarkeit, Reaktionszeiten) sind nur etwas wert, wenn Folgen bei Verstößen geregelt sind.",
    ],
    sources: [src.bgb307, src.bgb310, src.dsgvo],
  },
  {
    ...base,
    slug: "sso-und-2fa",
    title: "Single Sign-On und 2FA: Mindeststandard für Business-Software",
    description:
      "Warum Zwei-Faktor-Authentisierung für jede Business-Software Pflichtprogramm ist, wann sich Single Sign-On lohnt und was NIS2 dazu verlangt.",
    lead: "Zwei-Faktor-Authentisierung (2FA) sollte jede Business-Software anbieten, die Personal-, Kunden- oder Finanzdaten enthält. Single Sign-On (SSO) lohnt sich, sobald du mehrere Tools und regelmäßige Ein- und Austritte hast. Für Unternehmen unter NIS2 ist Multi-Faktor-Authentifizierung ausdrücklich vorgesehen.",
    topic: "Datenschutz & Sicherheit",
    imageId: "B-38",
    relatedCategories: ["hr-software", "crm-software"],
    keyTakeaways: [
      "2FA verhindert die meisten Übernahmen von Konten mit gestohlenen Passwörtern.",
      "SSO zentralisiert Anmeldungen und macht das Sperren beim Austritt zuverlässig.",
      "Das NIS2-Umsetzungsgesetz gilt seit Dezember 2025; § 30 BSIG nennt Multi-Faktor-Authentifizierung als Maßnahme.",
      "Prüfe, ob SSO nur im teuersten Tarif verfügbar ist – das ist häufig so.",
    ],
    sources: [src.bsig30, src.nis2, src.dsgvo],
  },
  {
    ...base,
    slug: "software-migration",
    title: "Software-Migration ohne Datenverlust: die Checkliste",
    description:
      "Von der Datenbestandsaufnahme bis zur Abschaltung des Altsystems: So wechselst du Business-Software ohne Datenverlust – mit Checkliste und Testplan.",
    lead: "Eine Migration gelingt, wenn du vorher weißt, welche Daten du wirklich brauchst, sie bereinigst, mit einem Testimport prüfst und das Altsystem erst abschaltest, wenn Daten und Aufbewahrungspflichten gesichert sind.",
    topic: "Auswahl & Einführung",
    imageId: "B-39",
    relatedCategories: ["hr-software", "buchhaltungssoftware", "erp-software"],
    keyTakeaways: [
      "Inventur zuerst: Welche Daten, wie viele, in welchem Format, mit welchen Abhängigkeiten.",
      "Bereinige vor dem Import, nicht danach.",
      "Mach mindestens einen vollständigen Testimport und prüfe Stichproben gegen das Altsystem.",
      "Steuerlich relevante Daten musst du auch nach dem Wechsel lesbar aufbewahren.",
    ],
    sources: [src.ao147, src.hgb257, src.dsgvo],
  },
  {
    ...base,
    slug: "kleinunternehmer-rechnung",
    title:
      "Rechnungen als Kleinunternehmer: Pflichtangaben und passende Software",
    description:
      "Seit 2025 gelten neue Grenzen und vereinfachte Pflichtangaben für Kleinunternehmer: was auf die Rechnung muss, was die E-Rechnung bedeutet, welche Software reicht.",
    lead: "Als Kleinunternehmer nach § 19 UStG weist du keine Umsatzsteuer aus, musst aber auf den Grund hinweisen. Seit 2025 gelten neue Umsatzgrenzen und vereinfachte Pflichtangaben nach § 34a UStDV. E-Rechnungen musst du nicht ausstellen, aber empfangen können.",
    topic: "Recht & Pflichten",
    imageId: "B-40",
    relatedCategories: ["rechnungsprogramme", "buchhaltungssoftware"],
    keyTakeaways: [
      "Grenzen seit 2025: höchstens 25.000 € Umsatz im Vorjahr und 100.000 € im laufenden Jahr.",
      "Pflichtangaben nach § 34a UStDV, inklusive Hinweis auf die Steuerbefreiung nach § 19 UStG.",
      "Kleinunternehmer dürfen weiter „sonstige Rechnungen“ wie PDF verschicken, müssen E-Rechnungen aber empfangen können.",
      "Wird die 100.000-€-Grenze im laufenden Jahr überschritten, entfällt die Regelung sofort.",
    ],
    sources: [src.ustg19, src.ustdv34a, src.ustg14, src.ihkERechnung],
  },
];
