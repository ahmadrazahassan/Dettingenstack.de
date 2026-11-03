import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { CostCalculator } from "@/components/tools/cost-calculator";
import { Skeleton } from "@/components/ui/misc";
import { SiteImage } from "@/components/ui/site-image";
import { categories, getCategory, toolsInCategory } from "@/data";

export const metadata: Metadata = {
  title: "Kostenrechner: Was kostet Business-Software für dein Team?",
  description:
    "Berechne monatliche, jährliche und Gesamtkosten für HR-, Buchhaltungs-, CRM-, ERP- und weitere Business-Software – mit Einrichtungskosten, netto oder brutto.",
  // Only the base URL is indexed; ?kategorie=…&anzahl=… are shareable states (§8.2).
  alternates: { canonical: "/kostenrechner" },
};

const DEFAULT_CATEGORY = "hr-software";

export default function CalculatorPage({
  searchParams,
}: PageProps<"/kostenrechner">) {
  return (
    <>
      <Container className="pt-10 pb-20">
        <Breadcrumbs items={[{ label: "Kostenrechner" }]} />
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-eyebrow eyebrow-square">Tool</p>
            <h1 className="type-h1 mt-3">
              Kostenrechner: Was kostet Business-Software{" "}
              <span className="textmarker">für dein Team?</span>
            </h1>
            <p className="type-lead mt-4">
              Kategorie wählen, Teamgröße eingeben, Pflichtfunktionen wählen –
              wir rechnen den günstigsten passenden Tarif jedes Anbieters,
              inklusive bekannter Einrichtungskosten.
            </p>
          </div>
          <div className="lg:col-span-5">
            <SiteImage
              id="B-03"
              sizes="(min-width: 1024px) 40vw, 100vw"
              eager
            />
          </div>
        </div>
        <div className="mt-14">
          <Suspense fallback={<Skeleton className="h-[32rem] w-full" />}>
            <Calculator searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
      <NewsletterBand />
    </>
  );
}

async function Calculator({
  searchParams,
}: {
  searchParams: PageProps<"/kostenrechner">["searchParams"];
}) {
  const { kategorie, anzahl } = await searchParams;
  const category =
    getCategory(typeof kategorie === "string" ? kategorie : DEFAULT_CATEGORY) ??
    getCategory(DEFAULT_CATEGORY);
  if (!category) return null;
  const n = Number(typeof anzahl === "string" ? anzahl : NaN);
  const initialTeam =
    Number.isInteger(n) && n >= 1 && n <= category.maxTeam ? n : undefined;

  return (
    <CostCalculator
      // A new category starts with fresh inputs.
      key={category.slug}
      category={category}
      tools={toolsInCategory(category.slug)}
      categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
      initialTeam={initialTeam}
    />
  );
}
