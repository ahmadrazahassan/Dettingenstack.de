import { ClipboardCheck, Eye, MessageSquareText, Scale } from "lucide-react";
import type { Metadata, Route } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container, SectionHeading } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { formatDate } from "@/lib/format";
import { operator, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Dettingenstack vergleicht Business-Software für Unternehmen in Deutschland: mit echten Preisen in Euro, festen Kriterien und ehrlich benannten Schwächen. Das ist unser Anspruch.",
  alternates: { canonical: "/ueber-uns" },
};

const values = [
  {
    icon: Scale,
    title: "Unabhängigkeit",
    text: "Bewertungen entstehen nach festen Kriterien. Anbieter können sie nicht kaufen – auch nicht über Partnerschaften.",
  },
  {
    icon: Eye,
    title: "Transparenz",
    text: "Wir zeigen, wie wir bewerten, woher Preise stammen und wie wir Geld verdienen.",
  },
  {
    icon: ClipboardCheck,
    title: "Gründlichkeit",
    text: "Jeder Preis hat ein Prüfdatum, jede rechtliche Aussage eine Quelle. Was wir nicht wissen, schreiben wir dazu.",
  },
  {
    icon: MessageSquareText,
    title: "Klarheit",
    text: "Wir schreiben so, dass du entscheiden kannst – ohne Werbesprache und mit klaren Empfehlungen je Situation.",
  },
];

// Über uns (§11.17). Team photos are real photos only, so the team section follows once real profiles exist.
export default function AboutPage() {
  return (
    <>
      <Container className="pt-10 pb-20">
        <Breadcrumbs items={[{ label: "Über uns" }]} />
        <div className="mt-8 max-w-3xl">
          <p className="type-eyebrow eyebrow-square">Über uns</p>
          <h1 className="type-h1 mt-3">
            Software-Entscheidungen, die du nicht bereust
          </h1>
          <p className="type-lead mt-4">{site.mission}</p>
        </div>
        <div className="mt-12">
          <SiteImage
            id="B-10"
            ratio="16/9"
            sizes="(min-width: 1200px) 1200px, 100vw"
            eager
          />
        </div>

        <section
          aria-labelledby="warum"
          className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <SectionHeading
              id="warum"
              title="Warum es Dettingenstack gibt"
              className="mb-0"
            />
          </div>
          <div className="type-body flex flex-col gap-4 text-neutral-800 lg:col-span-8">
            <p>
              Wer Business-Software kauft, findet viele Vergleichsseiten – aber
              selten Preise in Euro, selten Angaben zum Serverstandort und fast
              nie eine ehrliche Antwort auf die Frage, was ein Tool für ein Team
              mit 25 Personen wirklich kostet. Bewertungen sind oft nicht
              nachvollziehbar, und wer für eine Platzierung bezahlt hat, bleibt
              unklar.
            </p>
            <p>
              Dettingenstack macht es anders: Wir prüfen Preise an der Quelle
              und speichern das Prüfdatum, bewerten nach sechs dokumentierten
              Kriterien und nennen Schwächen beim Namen. Deutsche Besonderheiten
              wie DATEV, E-Rechnung, GoBD und Mitbestimmung stehen bei uns nicht
              im Kleingedruckten, sondern im Vergleich.
            </p>
          </div>
        </section>

        <section aria-labelledby="werte" className="mt-20">
          <SectionHeading id="werte" title="Woran wir uns messen lassen" />
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="flex flex-col gap-3">
                <v.icon
                  aria-hidden
                  className="size-8 text-black"
                  strokeWidth={1.5}
                />
                <h3 className="type-h4">{v.title}</h3>
                <p className="type-small text-neutral-700">{v.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="verein" className="mt-20">
          <SectionHeading
            id="verein"
            title="Wer hinter Dettingenstack steht"
            intro={`Dettingenstack wird vom ${operator.legalName} betrieben, einem eingetragenen Verein mit Sitz in ${operator.city} (${operator.region}).`}
          />
          <dl className="grid grid-cols-1 gap-x-10 gap-y-6 border-neutral-200 border-y py-8 sm:grid-cols-3">
            <div>
              <dt className="type-ui-sm text-neutral-600">Träger</dt>
              <dd className="mt-1 font-semibold font-ui text-[16px] text-black">
                {operator.legalName}
                <span className="block font-normal text-neutral-700">
                  {operator.postalCode} {operator.city}
                </span>
              </dd>
            </div>
            <div>
              <dt className="type-ui-sm text-neutral-600">Vorstand</dt>
              <dd className="mt-1 font-ui text-[16px] text-black">
                {operator.board.map((b) => (
                  <span key={b.name} className="block">
                    <span className="font-semibold">{b.name}</span>
                    <span className="text-neutral-700"> · {b.role}</span>
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="type-ui-sm text-neutral-600">Registereintrag</dt>
              <dd className="mt-1 font-ui text-[16px] text-black">
                {operator.register.type}, {operator.register.court}
                <span className="block font-semibold">
                  {operator.register.number}
                </span>
                <span className="block text-neutral-700">
                  eingetragen am {formatDate(operator.register.registeredAt)}
                </span>
              </dd>
            </div>
          </dl>
          <p className="type-small mt-4 text-neutral-700">
            Alle Angaben zum Anbieter stehen im{" "}
            <Link href={"/impressum" as Route} className="link-marker">
              Impressum
            </Link>
            .
          </p>
        </section>

        <section
          aria-labelledby="mehr"
          className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <h2 id="mehr" className="sr-only">
            Mehr über unsere Arbeit
          </h2>
          {[
            {
              href: "/methodik",
              title: "So bewerten wir",
              text: "Kriterien, Gewichtung, Preisprüfung und Auszeichnungen.",
            },
            {
              href: "/transparenz",
              title: "So finanzieren wir uns",
              text: "Werbelinks, Anzeigen und was bei uns nie passiert.",
            },
            {
              href: "/redaktion",
              title: "Die Redaktion",
              text: "Wer recherchiert, schreibt und prüft.",
            },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href as Route}
              className="group rounded-lg border border-neutral-200 p-6 transition-colors hover:border-black"
            >
              <span className="type-h4 block group-hover:underline group-hover:decoration-2 group-hover:decoration-brand group-hover:underline-offset-4">
                {l.title}
              </span>
              <span className="type-small mt-2 block text-neutral-700">
                {l.text}
              </span>
            </Link>
          ))}
        </section>

        <div className="mt-16 flex flex-wrap items-center gap-4">
          <ButtonLink href={"/kontakt" as Route}>Kontakt aufnehmen</ButtonLink>
          <Link
            href={"/impressum" as Route}
            className="link-marker font-medium font-ui text-[15px]"
          >
            Angaben zum Unternehmen
          </Link>
        </div>
      </Container>
      <NewsletterBand />
    </>
  );
}
