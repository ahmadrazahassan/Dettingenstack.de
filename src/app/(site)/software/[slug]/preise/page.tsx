import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadDialog } from "@/components/forms/lead-form";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { AnalysisNotice } from "@/components/tool/blocks";
import { PlanCards, TeamCostChart } from "@/components/tool/interactive";
import {
  ExampleCosts,
  HiddenCosts,
  PricingNote,
  ReviewHeader,
} from "@/components/tool/review-parts";
import { VendorCTA } from "@/components/tool/vendor-cta";
import { Accordion } from "@/components/ui/disclosure";
import { SiteImage } from "@/components/ui/site-image";
import { getTool, tools, toolsInCategory } from "@/data";
import { categoryOf, yearOf } from "@/lib/derive";
import { costAnswer, toolFaqs } from "@/lib/faq";
import { formatDate } from "@/lib/format";
import { isQuoteOnly } from "@/lib/pricing";

export const instant = false;

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

function load(slug: string) {
  const tool = getTool(slug);
  if (!tool) notFound();
  return { tool, category: categoryOf(tool.categories.primary) };
}

export async function generateMetadata({
  params,
}: PageProps<"/software/[slug]/preise">): Promise<Metadata> {
  const { slug } = await params;
  const { tool, category } = load(slug);
  return {
    title: {
      absolute: `${tool.name} Preise ${yearOf(tool.pricing.checkedAt)}: Tarife & Kosten | Dettingenstack`,
    },
    description: costAnswer(tool, category).slice(0, 158),
    alternates: { canonical: `/software/${tool.slug}/preise` },
  };
}

export default async function PricingPage({
  params,
}: PageProps<"/software/[slug]/preise">) {
  const { slug } = await params;
  const { tool, category } = load(slug);
  const history = tool.pricing.history;
  const firstPoint = [...history].sort((a, b) =>
    a.date.localeCompare(b.date),
  )[0];
  const faqs = toolFaqs(tool, category).filter((f) =>
    /kostet|Testversion/.test(f.q),
  );

  return (
    <>
      <Container className="pt-10 pb-16">
        <Breadcrumbs
          items={[
            { label: category.name, href: `/${category.slug}` },
            { label: tool.name, href: `/software/${tool.slug}` },
            { label: "Preise" },
          ]}
        />
        <div className="mt-8 max-w-4xl">
          <ReviewHeader
            tool={tool}
            title={`${tool.name} Preise ${yearOf(tool.pricing.checkedAt)}: Tarife, Kosten und Gebühren`}
            lead={`Alle Tarife von ${tool.name} in Euro, mit Einrichtungskosten, Vertragsbedingungen und Beispielrechnungen für typische Teamgrößen.`}
          />
          {tool.review.method === "analyse" && (
            <AnalysisNotice
              checkedAt={tool.pricing.checkedAt}
              className="mt-6"
            />
          )}

          <section
            aria-labelledby="kurzantwort"
            className="mt-10 rounded-md border-black border-l-4 bg-brand-50 p-6"
          >
            <h2 id="kurzantwort" className="type-h4">
              Was kostet {tool.name}?
            </h2>
            <p className="type-body mt-2 text-neutral-800">
              {costAnswer(tool, category)}
            </p>
          </section>
        </div>

        <section aria-labelledby="tarife" className="mt-16">
          <h2 id="tarife" className="type-h2 mb-8">
            Tarife im Überblick
          </h2>
          <PlanCards tool={tool} unit={category.unit} />
          <div className="mt-6">
            <PricingNote tool={tool} />
          </div>
          {isQuoteOnly(tool) && (
            <aside
              aria-label="Preis auf Anfrage"
              className="mt-8 flex flex-col gap-6 rounded-lg border border-neutral-200 p-6 sm:flex-row sm:items-center"
            >
              <SiteImage id="C-14" sizes="96px" className="w-24 shrink-0" />
              <div className="flex-1">
                <p className="type-h4">
                  {tool.name} nennt Preise nur auf Anfrage
                </p>
                <p className="type-small mt-2 text-neutral-700">
                  Wir schätzen keine Preise. Hol dir ein Angebot für deine
                  Teamgröße – am besten von zwei bis drei Anbietern, damit du
                  vergleichen kannst.
                </p>
              </div>
              <div className="sm:w-56">
                <LeadDialog
                  tool={{ slug: tool.slug, name: tool.name }}
                  vendors={toolsInCategory(category.slug).map((t) => ({
                    slug: t.slug,
                    name: t.name,
                  }))}
                  category={{ slug: category.slug, name: category.name }}
                />
              </div>
            </aside>
          )}
        </section>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <section aria-labelledby="beispiele">
            <h2 id="beispiele" className="type-h3 mb-5">
              Beispielrechnungen
            </h2>
            <ExampleCosts tool={tool} category={category} />
            <p className="type-ui-sm mt-3 text-neutral-600">
              Netto, bei jährlicher Zahlung, ohne Zusatzmodule.
            </p>
          </section>
          <section aria-labelledby="vertrag">
            <h2 id="vertrag" className="type-h3 mb-5">
              Versteckte Kosten und Vertrag
            </h2>
            <HiddenCosts tool={tool} />
          </section>
        </div>

        <section aria-labelledby="verlauf" className="mt-16">
          <h2 id="verlauf" className="type-h3">
            Preisentwicklung
          </h2>
          <p className="type-body mt-3 max-w-3xl text-neutral-800">
            {firstPoint
              ? `Wir erfassen die Preise von ${tool.name} seit dem ${formatDate(firstPoint.date)}. Sobald sich ein Tarifpreis ändert, zeigen wir hier den Verlauf.`
              : `${tool.name} veröffentlicht keine Preise, deshalb gibt es noch keinen Preisverlauf.`}
          </p>
        </section>

        <section aria-labelledby="preisvergleich" className="mt-16">
          <h2 id="preisvergleich" className="type-h2">
            {tool.name} im Preisvergleich
          </h2>
          <p className="type-lead mt-3 mb-8 max-w-3xl">
            So viel kosten die Anbieter der Kategorie {category.name} bei
            gleicher Teamgröße – nur Tarife mit veröffentlichten Preisen.
          </p>
          <TeamCostChart
            tools={toolsInCategory(category.slug)}
            unit={category.unit}
            defaultTeam={category.referenceTeams[0] ?? 25}
            maxTeam={category.maxTeam}
            category={category.slug}
            highlight={tool.name}
          />
        </section>

        <section aria-labelledby="preis-faq" className="mt-16 max-w-3xl">
          <h2 id="preis-faq" className="type-h3 mb-4">
            Häufige Fragen zu den Preisen
          </h2>
          <Accordion
            type="single"
            items={faqs.map((f, i) => ({
              id: `faq-${i}`,
              title: f.q,
              content: f.a,
            }))}
          />
        </section>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <VendorCTA tool={tool} placement="pricing" />
          <Link
            href={`/software/${tool.slug}` as Route}
            className="link-marker font-medium font-ui text-[16px]"
          >
            Zurück zur Bewertung von {tool.name}
          </Link>
        </div>
      </Container>
      <NewsletterBand />
    </>
  );
}
