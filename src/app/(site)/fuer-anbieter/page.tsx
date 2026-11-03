import type { Metadata, Route } from "next";
import Link from "next/link";
import { Checklist, Steps } from "@/components/content/blocks";
import { ContactForm } from "@/components/forms/contact-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container, SectionHeading } from "@/components/layout/container";
import { SiteImage } from "@/components/ui/site-image";

export const metadata: Metadata = {
  title: "Für Software-Anbieter",
  description:
    "So kommt deine Software auf Dettingenstack: kostenlose redaktionelle Aufnahme nach festen Kriterien, Datenkorrekturen und Werbemöglichkeiten, die keine Bewertungen beeinflussen.",
  alternates: { canonical: "/fuer-anbieter" },
};

// Für Anbieter (§11.18).
export default function VendorsPage() {
  return (
    <Container className="pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Für Anbieter" }]} />
      <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="type-eyebrow eyebrow-square">Für Anbieter</p>
          <h1 className="type-h1 mt-3">
            Für Software-Anbieter: So kommt deine Software auf Dettingenstack
          </h1>
          <p className="type-lead mt-4">
            Die redaktionelle Aufnahme ist kostenlos. Wir prüfen jede Software
            nach denselben, öffentlich dokumentierten Kriterien – unabhängig
            davon, ob es eine Partnerschaft gibt.
          </p>
        </div>
        <div className="lg:col-span-6">
          <SiteImage
            id="A-21"
            ratio="3/2"
            sizes="(min-width: 1024px) 50vw, 100vw"
            eager
          />
        </div>
      </div>

      <section aria-labelledby="aufnahme" className="mt-20">
        <SectionHeading
          id="aufnahme"
          title="Kostenlose redaktionelle Aufnahme"
        />
        <Steps
          steps={[
            {
              title: "Anfrage senden",
              text: "Schick uns über das Formular unten Name, Kategorie und Website deiner Software.",
            },
            {
              title: "Unterlagen bereitstellen",
              text: "Testzugang, aktuelle Preisliste, AVV und eine Ansprechperson für Rückfragen.",
            },
            {
              title: "Prüfung",
              text: "Wir prüfen Preise, Funktionen, Datenschutz und Support nach unserer Methodik.",
            },
            {
              title: "Veröffentlichung",
              text: "Die Software erscheint in der Kategorie – mit Stärken und Schwächen.",
            },
          ]}
        />
        <div className="mt-10 max-w-2xl">
          <p className="type-h4">Was wir von dir brauchen</p>
          <div className="mt-4">
            <Checklist
              items={[
                "Testzugang mit dem Funktionsumfang, den Kunden typischerweise buchen",
                "Aktuelle Preisliste in Euro, inklusive Einrichtungskosten und Mindestabnahmen",
                "Auftragsverarbeitungsvertrag (AVV) und Angaben zum Serverstandort",
                "Eine Ansprechperson für Rückfragen der Redaktion",
              ]}
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="korrektur"
        className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-2"
      >
        <div>
          <SectionHeading
            id="korrektur"
            title="Daten korrigieren lassen"
            className="mb-6"
          />
          <p className="type-body text-neutral-800">
            Hat sich ein Preis geändert oder ist eine Angabe falsch? Schick uns
            die Änderung mit einer öffentlich zugänglichen Quelle, etwa deiner
            Preisseite. Wir prüfen sie und aktualisieren die Daten mit neuem
            Prüfdatum. Bewertungen ändern wir nur, wenn sich die Grundlage der
            Bewertung geändert hat.
          </p>
        </div>
        <div>
          <SectionHeading title="Werbemöglichkeiten" className="mb-6" />
          <p className="type-body text-neutral-800">
            Wir bieten gekennzeichnete Anzeigenplätze und Newsletter-Sponsoring
            an. Anzeigen stehen außerhalb unserer Rankings, sind als „Anzeige“
            markiert und beeinflussen keine Bewertungen. Auf Vergleichsseiten
            zeigen wir keine Anzeigen.
          </p>
          <p className="type-body mt-4 text-neutral-800">
            Über Partnerprogramme verdienen wir eine Provision, wenn Leser über
            einen markierten Werbelink kaufen. Wie das genau funktioniert, steht
            auf der Seite{" "}
            <Link
              href={"/transparenz" as Route}
              className="link-marker font-medium"
            >
              Transparenz
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        aria-labelledby="anbieter-kontakt"
        className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-4">
          <SectionHeading
            id="anbieter-kontakt"
            title="Schreib uns"
            className="mb-4"
          />
          <p className="type-body text-neutral-800">
            Wir antworten in der Regel innerhalb von zwei Werktagen.
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 p-6 lg:col-span-8 lg:p-8">
          <ContactForm
            vendor
            subjects={["anbieter", "datenkorrektur", "werbung", "sonstiges"]}
            defaultSubject="anbieter"
          />
        </div>
      </section>
    </Container>
  );
}
