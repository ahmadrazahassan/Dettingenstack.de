import type { Metadata } from "next";
import { Callout, Steps } from "@/components/content/blocks";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container, SectionHeading } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { SiteImage } from "@/components/ui/site-image";
import { Table, TableScroll, Td, Th } from "@/components/ui/table";
import { AWARD_LABELS } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "Methodik: So testen und bewerten wir Software",
  description:
    "Sechs Kriterien, feste Gewichte je Kategorie, Prüfdatum bei jedem Preis: So entsteht der Dettingenstack-Score.",
  alternates: { canonical: "/methodik" },
};

const criteria = [
  {
    name: "Funktionsumfang",
    text: "Wie viel der Kategorie-Funktionen ein Tool abdeckt und wie gut die Kernfunktionen umgesetzt sind.",
  },
  {
    name: "Bedienbarkeit",
    text: "Messbare Testaufgaben, Einarbeitung, Klarheit der Oberfläche, mobile App und Qualität der deutschen Oberfläche.",
  },
  {
    name: "Preis-Leistung",
    text: "Kosten für typische Teamgrößen im Verhältnis zum Kategorie-Durchschnitt und zum Funktionsumfang; Fairness der Vertragsbedingungen.",
  },
  {
    name: "Datenschutz & Sicherheit",
    text: "Serverstandort, Auftragsverarbeitungsvertrag, Zertifizierungen wie ISO 27001 oder BSI C5, Single Sign-On, Zwei-Faktor-Anmeldung.",
  },
  {
    name: "Support & Service",
    text: "Support auf Deutsch, Kanäle, gemessene Antwortzeit im Test, Einführungsangebot und Dokumentation.",
  },
  {
    name: "Integrationen",
    text: "DATEV und andere Schnittstellen für den deutschen Markt, offene API, Marktplatz, Microsoft 365 und Google.",
  },
];

// Weights from the build prompt §7.2 (percent).
const weights: [string, number[]][] = [
  ["Buchhaltungssoftware", [25, 20, 15, 15, 10, 15]],
  ["Rechnungsprogramme", [25, 25, 20, 10, 10, 10]],
  ["CRM-Software", [25, 20, 20, 15, 10, 10]],
  ["HR-Software", [25, 20, 15, 20, 10, 10]],
  ["Zeiterfassungssoftware", [20, 25, 20, 15, 10, 10]],
  ["Projektmanagement-Software", [25, 25, 20, 10, 10, 10]],
  ["ERP-Software", [30, 15, 15, 15, 15, 10]],
  ["Newsletter-Software", [20, 20, 20, 20, 10, 10]],
  ["Dokumentenmanagement-Software", [25, 20, 15, 20, 10, 10]],
  ["Shopsysteme", [25, 20, 20, 10, 10, 15]],
];

const rubric: [string, string][] = [
  [
    "10",
    "Server in Deutschland, AVV online verfügbar, ISO 27001 auf Basis IT-Grundschutz oder BSI C5, Single Sign-On und Zwei-Faktor-Anmeldung, feine Rollen, dokumentiertes Löschkonzept",
  ],
  ["8", "Server in der EU, AVV, ISO 27001, Zwei-Faktor-Anmeldung"],
  ["6", "Server in der EU, AVV, keine Zertifizierung"],
  [
    "4",
    "Hosting in den USA mit EU-Option oder EU-US Data Privacy Framework, AVV verfügbar",
  ],
  ["2", "Nur USA, kein AVV, keine Transparenz"],
];

export default function MethodologyPage() {
  return (
    <>
      <Container className="pt-10 pb-20">
        <Breadcrumbs items={[{ label: "Methodik" }]} />
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-eyebrow eyebrow-square">Methodik</p>
            <h1 className="type-h1 mt-3">
              So testen und bewerten wir Software
            </h1>
            <p className="type-lead mt-4">
              Jede Software bewerten wir nach denselben sechs Kriterien. Die
              Gewichtung hängt von der Kategorie ab und steht hier offen. Geld
              von Anbietern hat darauf keinen Einfluss.
            </p>
          </div>
          <div className="lg:col-span-5">
            <SiteImage
              id="B-07"
              sizes="(min-width: 1024px) 40vw, 100vw"
              eager
            />
          </div>
        </div>

        <section aria-labelledby="kriterien" className="mt-16">
          <SectionHeading id="kriterien" title="Die sechs Kriterien" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {criteria.map((c, i) => (
              <article
                key={c.name}
                className="rounded-lg border border-neutral-200 p-6"
              >
                <span className="font-bold font-display text-[28px] text-neutral-300 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="type-h4 mt-3">{c.name}</h3>
                <p className="type-small mt-2 text-neutral-700">{c.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="gewichtung" className="mt-16">
          <SectionHeading
            id="gewichtung"
            title="Gewichtung je Kategorie"
            intro="Angaben in Prozent. Jede Zeile ergibt 100 %."
          />
          <TableScroll label="Gewichtung je Kategorie">
            <Table className="min-w-[760px]">
              <thead>
                <tr>
                  <Th>Kategorie</Th>
                  {criteria.map((c) => (
                    <Th key={c.name} className="text-right">
                      {c.name}
                    </Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weights.map(([name, w]) => (
                  <tr key={name}>
                    <Td className="text-black">{name}</Td>
                    {w.map((x, i) => (
                      <Td key={criteria[i]?.name} numeric>
                        {x} %
                      </Td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableScroll>
        </section>

        <section aria-labelledby="rubrik" className="mt-16 max-w-4xl">
          <SectionHeading
            id="rubrik"
            title="Beispiel: So vergeben wir Punkte für Datenschutz"
            intro="Für jedes Kriterium gibt es solche Ankerpunkte. Werte dazwischen begründen wir in der Bewertung."
          />
          <dl className="divide-y divide-neutral-200 border-neutral-200 border-y">
            {rubric.map(([score, text]) => (
              <div key={score} className="grid grid-cols-[3rem_1fr] gap-4 py-4">
                <dt className="tabular font-bold font-display text-[22px] text-black">
                  {score}
                </dt>
                <dd className="type-small text-neutral-800">{text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="ablauf" className="mt-16">
          <SectionHeading id="ablauf" title="Der Ablauf" />
          <Steps
            steps={[
              {
                title: "Markt sichten",
                text: "Wir erfassen die relevanten Anbieter für den deutschen Markt – auch solche ohne Partnerprogramm.",
              },
              {
                title: "Fakten prüfen",
                text: "Preise, Tarife, Serverstandort und Zertifikate lesen wir beim Anbieter nach und speichern Quelle und Prüfdatum.",
              },
              {
                title: "Praxistest",
                text: "Mit Testzugängen arbeiten wir die Testaufgaben der Kategorie durch. Bis dahin kennzeichnen wir eine Bewertung als Analyse auf Basis von Herstellerangaben.",
              },
              {
                title: "Bewerten und aktualisieren",
                text: "Preise prüfen wir spätestens alle 90 Tage, die vollständige Bewertung mindestens einmal im Jahr.",
              },
            ]}
          />
        </section>

        <section
          aria-labelledby="regeln"
          className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2"
        >
          <div>
            <h2 id="regeln" className="type-h3">
              Preise und Angaben
            </h2>
            <ul className="type-small mt-4 flex flex-col gap-2 text-neutral-800">
              <li>Alle Preise in Euro und netto, mit Prüfdatum und Quelle.</li>
              <li>
                Veröffentlicht ein Anbieter keinen Preis, schreiben wir „auf
                Anfrage“ – wir schätzen nicht.
              </li>
              <li>
                Widersprüchliche Angaben auf einer Preisseite übernehmen wir
                nicht, sondern weisen darauf hin.
              </li>
              <li>
                Fehlt eine Angabe, zeigen wir „nicht angegeben“ statt „nein“.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="type-h3">Auszeichnungen</h2>
            <ul className="type-small mt-4 flex flex-col gap-2 text-neutral-800">
              <li>
                <strong className="text-black">
                  {AWARD_LABELS.empfehlung}:
                </strong>{" "}
                höchster Gesamtscore der Kategorie, kein Kriterium unter 5,0.
              </li>
              <li>
                <strong className="text-black">
                  {AWARD_LABELS["preis-leistung"]}:
                </strong>{" "}
                beste Preis-Leistung bei einem Gesamtscore ab 7,5.
              </li>
              <li>
                <strong className="text-black">
                  {AWARD_LABELS.kleinunternehmen}
                </strong>{" "}
                und{" "}
                <strong className="text-black">
                  {AWARD_LABELS.mittelstand}
                </strong>
                : bester Score unter den Tools für die jeweilige Größe.
              </li>
              <li>
                <strong className="text-black">
                  {AWARD_LABELS.datenschutz}:
                </strong>{" "}
                bester Datenschutz-Score mit Servern in Deutschland.
              </li>
            </ul>
          </div>
        </section>

        <div className="mt-16 max-w-3xl">
          <Callout type="wichtig" title="Fehler entdeckt?">
            Preise und Funktionen ändern sich. Wenn dir eine falsche Angabe
            auffällt, schreib uns – die Kontaktdaten findest du im Impressum.
            Jede Korrektur dokumentieren wir im Änderungsprotokoll der
            jeweiligen Seite.
          </Callout>
        </div>
      </Container>
      <NewsletterBand />
    </>
  );
}
