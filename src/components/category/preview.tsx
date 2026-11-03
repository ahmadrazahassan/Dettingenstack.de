import type { Route } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/cards/cards";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container, SectionHeading } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { guides, liveCategorySlugs } from "@/data";
import { categoryImages } from "@/data/images";
import {
  type NavCategory,
  categories as navCategories,
} from "@/data/navigation";
import { guideBody } from "@/lib/guides";
import { CRITERIA, CRITERION_LABELS } from "@/lib/schema";

const criterionText: Record<(typeof CRITERIA)[number], string> = {
  funktionen:
    "Welche Aufgaben die Software abdeckt – und welche nur mit Zusatzmodulen.",
  bedienbarkeit: "Wie schnell sich ein Team ohne Schulung zurechtfindet.",
  preisLeistung:
    "Preise in Euro für typische Teamgrößen, inklusive Einrichtung und Mindestabnahme.",
  datenschutz:
    "Serverstandort, Auftragsverarbeitung, Zertifikate und Drittlandtransfer.",
  support:
    "Deutschsprachiger Support, Erreichbarkeit und Hilfe bei der Einführung.",
  integrationen: "DATEV, E-Rechnung und die Anbindung an andere Systeme.",
};

// Category without published tool data yet (phase 3). noindex, no ranking, no prices – only what is true today:
// what we will check, and the guides that already exist for this topic.
export function CategoryPreview({ category }: { category: NavCategory }) {
  const images = categoryImages[category.slug];
  const related = guides.filter((g) =>
    (g.relatedCategories as string[]).includes(category.slug),
  );
  const live = navCategories.filter((c) =>
    (liveCategorySlugs as readonly string[]).includes(c.slug),
  );

  return (
    <>
      <Container className="pt-10 pb-20">
        <Breadcrumbs
          items={[
            { label: "Kategorien", href: "/kategorien" },
            { label: category.name },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Badge>In Vorbereitung</Badge>
            <h1 className="type-h1 mt-4">{category.name} im Vergleich</h1>
            <p className="type-lead mt-4">
              {category.description}: Diese Kategorie bauen wir gerade auf. Eine
              Bestenliste veröffentlichen wir erst, wenn Preise, Funktionen und
              Datenschutzangaben der Anbieter geprüft sind.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={"/newsletter" as Route}>
                Beim Start benachrichtigen
              </ButtonLink>
              <ButtonLink href={"/kategorien" as Route} variant="outline">
                Alle Kategorien
              </ButtonLink>
            </div>
          </div>
          {images && (
            <div className="lg:col-span-5">
              <SiteImage
                id={images.illustration}
                sizes="(min-width: 1024px) 40vw, 100vw"
                eager
              />
            </div>
          )}
        </div>

        <section
          aria-labelledby="pruefkriterien"
          className="mt-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <SectionHeading
              id="pruefkriterien"
              title="Was wir prüfen, bevor wir bewerten"
            />
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {CRITERIA.map((c) => (
                <div key={c} className="border-black border-l-2 pl-4">
                  <dt className="type-h4">{CRITERION_LABELS[c]}</dt>
                  <dd className="type-small mt-1 text-neutral-700">
                    {criterionText[c]}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href={"/methodik" as Route}
              className="link-marker mt-8 inline-block font-medium font-ui text-[16px]"
            >
              Unsere Methodik im Detail
            </Link>
          </div>
          {images && (
            <div className="lg:col-span-5">
              <SiteImage
                id={images.photo}
                ratio="3/2"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          )}
        </section>

        {related.length > 0 && (
          <section
            aria-labelledby="passende-ratgeber"
            className="mt-20 border-neutral-200 border-t pt-14"
          >
            <SectionHeading
              id="passende-ratgeber"
              title="Schon jetzt lesen: passende Ratgeber"
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((g) => (
                <GuideCard
                  key={g.slug}
                  href={`/ratgeber/${g.slug}`}
                  image={
                    <SiteImage
                      id={g.imageId}
                      ratio="16/9"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="rounded-none"
                    />
                  }
                  category={g.topic}
                  title={g.title}
                  description={g.description}
                  readingMinutes={guideBody(g.slug).readingMinutes}
                />
              ))}
            </div>
          </section>
        )}

        {live.length > 0 && (
          <p className="type-body mt-16 text-neutral-700">
            Bereits mit Bestenliste:{" "}
            {live.map((c, i) => (
              <span key={c.slug}>
                {i > 0 && ", "}
                <Link
                  href={`/${c.slug}` as Route}
                  className="link-marker font-medium"
                >
                  {c.name}
                </Link>
              </span>
            ))}
            .
          </p>
        )}
      </Container>
      <NewsletterBand />
    </>
  );
}
