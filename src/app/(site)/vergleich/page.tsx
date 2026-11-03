import type { Metadata, Route } from "next";
import { ComparisonCard } from "@/components/cards/cards";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { comparisons, getCategory, getTool } from "@/data";
import { rankedTool } from "@/lib/derive";

export const metadata: Metadata = {
  title: "Software-Vergleiche: alle Duelle im Detail",
  description:
    "Business-Software im direkten Vergleich: Funktionen, Preise in Euro, Datenschutz und unsere Empfehlung je Situation.",
  alternates: { canonical: "/vergleich" },
};

export default function ComparisonsHub() {
  const cards = comparisons.flatMap((c) => {
    const category = getCategory(c.category);
    const a = getTool(c.toolA);
    const b = getTool(c.toolB);
    if (!category || !a || !b) return [];
    const ra = rankedTool(category, a.slug);
    const rb = rankedTool(category, b.slug);
    if (!ra || !rb) return [];
    return [
      {
        c,
        category,
        a: { name: a.name, logo: a.logo?.src, score: ra.overall },
        b: { name: b.name, logo: b.logo?.src, score: rb.overall },
      },
    ];
  });

  return (
    <>
      <Container className="pt-10 pb-16">
        <Breadcrumbs items={[{ label: "Vergleiche" }]} />
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-eyebrow eyebrow-square">Vergleiche</p>
            <h1 className="type-h1 mt-3">
              Software-Vergleiche:{" "}
              <span className="textmarker">{cards.length} Duelle</span> im
              Detail
            </h1>
            <p className="type-lead mt-5">
              Zwei Tools, Funktion für Funktion: mit Preisen in Euro,
              Serverstandort, Kostenrechnung für deine Teamgröße und einer
              Empfehlung je Situation.
            </p>
          </div>
          <div className="lg:col-span-5">
            <SiteImage
              id="B-06"
              sizes="(min-width: 1024px) 40vw, 100vw"
              eager
            />
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ c, category, a, b }) => (
            <li key={c.slug} className="flex">
              <ComparisonCard
                href={`/vergleich/${c.slug}`}
                category={category.name}
                updatedAt={c.updatedAt}
                a={a}
                b={b}
                verdict={`${c.verdict.summary.split(". ")[0]}.`}
              />
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-start gap-4 rounded-lg bg-neutral-50 p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
          <div>
            <p className="type-h4">Dein Vergleich fehlt?</p>
            <p className="type-small mt-1 text-neutral-700">
              Stell dir im Vergleichstool bis zu vier Tools selbst zusammen.
            </p>
          </div>
          <ButtonLink href={"/vergleichen" as Route} variant="secondary">
            Vergleichstool öffnen
          </ButtonLink>
        </div>
      </Container>
      <NewsletterBand />
    </>
  );
}
