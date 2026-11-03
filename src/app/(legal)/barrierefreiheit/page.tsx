import type { Metadata } from "next";
import { LegalPage } from "@/components/content/legal-page";
import { formatDate } from "@/lib/format";
import { operator } from "@/lib/site";

export const metadata: Metadata = {
  title: "Erklärung zur Barrierefreiheit",
  description:
    "Wie Dettingenstack barrierefrei gestaltet ist, welche Einschränkungen wir kennen und wie du uns Barrieren meldest.",
  alternates: { canonical: "/barrierefreiheit" },
};

const UPDATED = "2026-11-03";

export default function BarrierefreiheitPage() {
  return (
    <LegalPage
      title="Erklärung zur Barrierefreiheit"
      intro="Dettingenstack soll für alle gut nutzbar sein – auch mit Tastatur, Screenreader oder Vergrößerung."
      draft={false}
    >
      <h2>Unser Ziel</h2>
      <p>
        Wir orientieren uns an den Web Content Accessibility Guidelines (WCAG)
        2.2 auf Stufe AA. Dazu gehören ausreichende Kontraste, vollständige
        Bedienbarkeit per Tastatur, Textalternativen für Bilder und
        Datentabellen zu allen Diagrammen.
      </p>

      <h2>Was wir umgesetzt haben</h2>
      <ul>
        <li>
          Alle Funktionen – Menüs, Suche, Vergleichstool, Kostenrechner und
          Software-Finder – lassen sich per Tastatur bedienen; der Fokus ist
          sichtbar markiert.
        </li>
        <li>
          Diagramme haben eine Tabelle mit denselben Werten, Bilder haben
          Alternativtexte, dekorative Grafiken werden von Screenreadern
          übersprungen.
        </li>
        <li>
          Seiten sind mit Überschriften, Landmarken und Sprungmarken
          strukturiert; die Sprache ist als Deutsch ausgezeichnet.
        </li>
        <li>
          Animationen werden reduziert, wenn dein System „Bewegung reduzieren“
          eingestellt hat.
        </li>
      </ul>

      <h2>Stand der Vereinbarkeit</h2>
      <p>
        Diese Website ist nach unserer eigenen Prüfung teilweise mit WCAG 2.2
        Stufe AA vereinbar. Ein Prüfbericht einer unabhängigen Stelle liegt noch
        nicht vor.
      </p>

      <h2>Bekannte Einschränkungen</h2>
      <ul>
        <li>
          Breite Vergleichstabellen lassen sich auf kleinen Bildschirmen nur
          seitlich scrollen.
        </li>
        <li>
          Einige Logos von Anbietern haben einen geringen Kontrast; der Name
          steht immer zusätzlich als Text daneben.
        </li>
      </ul>

      <h2>Feedback</h2>
      <p>
        Du stößt auf eine Barriere? Schreib uns an{" "}
        <a href={`mailto:${operator.email}`} className="link-marker">
          {operator.email}
        </a>
        . Wir melden uns in der Regel innerhalb von zwei Werktagen.
      </p>

      <h2>Stand</h2>
      <p>{formatDate(UPDATED)}</p>
    </LegalPage>
  );
}
