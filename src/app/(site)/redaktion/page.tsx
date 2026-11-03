import type { Metadata, Route } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { authors, guides, tools } from "@/data";

export const metadata: Metadata = {
  title: "Die Redaktion",
  description:
    "Wer bei Dettingenstack recherchiert, schreibt und prüft – und nach welchen Regeln. Fehler entdeckt? So meldest du sie der Redaktion.",
  alternates: { canonical: "/redaktion" },
};

// Redaktion (§11.16). Team cards with photos follow once real profiles exist (real people only);
// until then the page describes the editorial team and its rules without inventing names.
export default function EditorialPage() {
  const team = authors[0];
  return (
    <>
      <Container className="pt-10 pb-20">
        <Breadcrumbs items={[{ label: "Redaktion" }]} />
        <div className="mt-8 max-w-3xl">
          <p className="type-eyebrow eyebrow-square">Redaktion</p>
          <h1 className="type-h1 mt-3">{team?.name ?? "Die Redaktion"}</h1>
          <p className="type-lead mt-4">{team?.bio}</p>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-8 border-neutral-200 border-y py-8 sm:grid-cols-3">
          <div>
            <dt className="type-ui text-neutral-700">Software im Vergleich</dt>
            <dd className="type-stat tabular">{tools.length}</dd>
          </div>
          <div>
            <dt className="type-ui text-neutral-700">Ratgeber</dt>
            <dd className="type-stat tabular">{guides.length}</dd>
          </div>
          <div>
            <dt className="type-ui text-neutral-700">Kriterien je Bewertung</dt>
            <dd className="type-stat tabular">6</dd>
          </div>
        </dl>

        <section aria-labelledby="regeln" className="mt-16 max-w-3xl">
          <h2 id="regeln" className="type-h2">
            Unsere Regeln
          </h2>
          <ul className="type-body mt-6 flex flex-col gap-3 text-neutral-800">
            <li>
              Jeder Preis hat eine Quelle und ein Prüfdatum. Veröffentlicht ein
              Anbieter keinen Preis, schreiben wir „auf Anfrage“.
            </li>
            <li>
              Jede rechtliche Aussage in Ratgebern verlinkt auf ihre Quelle,
              etwa Gesetzestexte oder Behörden.
            </li>
            <li>
              Wer eine Software noch nicht selbst getestet hat, schreibt
              „Analyse auf Basis von Herstellerangaben“ – nicht „getestet“.
            </li>
            <li>
              Partnerschaften und Provisionen haben keinen Einfluss auf
              Bewertungen und Rankings.
            </li>
            <li>
              Inhalte prüfen wir mindestens einmal im Jahr und dokumentieren
              Änderungen.
            </li>
          </ul>
          <p className="type-body mt-8 text-neutral-800">
            Fehler entdeckt? Schreib uns über das{" "}
            <Link
              href={"/kontakt" as Route}
              className="link-marker font-medium"
            >
              Kontaktformular
            </Link>{" "}
            mit dem Thema „Fehler oder Korrektur melden“. Wie wir bewerten,
            steht in der{" "}
            <Link
              href={"/methodik" as Route}
              className="link-marker font-medium"
            >
              Methodik
            </Link>
            .
          </p>
        </section>
      </Container>
      <NewsletterBand />
    </>
  );
}
