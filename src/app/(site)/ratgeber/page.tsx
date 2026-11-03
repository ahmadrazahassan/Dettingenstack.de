import type { Metadata, Route } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/cards/cards";
import { GuideFilter } from "@/components/content/guide-filter";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { SiteImage } from "@/components/ui/site-image";
import { getGuide, guides } from "@/data";
import { guideBody } from "@/lib/guides";
import { GUIDE_TOPICS } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Ratgeber für bessere Software-Entscheidungen",
  description:
    "Ratgeber zu Business-Software: E-Rechnung, Zeiterfassung, GoBD, DSGVO, Kosten, Verträge und Auswahl – mit Quellen und Checklisten.",
  alternates: { canonical: "/ratgeber" },
};

const FEATURED = "e-rechnungspflicht";

// Ratgeber hub (§11.13): one featured guide as a large card, topic tabs, card grid.
export default function GuidesPage() {
  const featured = getGuide(FEATURED);
  const rest = guides.filter((g) => g.slug !== FEATURED);

  return (
    <>
      <Container className="pt-10 pb-20">
        <Breadcrumbs items={[{ label: "Ratgeber" }]} />
        <h1 className="type-h1 mt-8">Ratgeber</h1>
        <p className="type-lead mt-4 max-w-3xl">
          Was du vor dem Kauf wissen solltest: Pflichten wie E-Rechnung und
          Zeiterfassung, Datenschutz, Kosten, Verträge und der Weg zur richtigen
          Auswahl. Jede rechtliche Aussage mit Quelle.
        </p>

        {featured && (
          <Link
            href={`/ratgeber/${featured.slug}` as Route}
            className="group mt-12 grid grid-cols-1 items-center gap-8 rounded-lg border border-neutral-200 p-4 transition-colors hover:border-black md:p-6 lg:grid-cols-12"
          >
            <span className="lg:col-span-7">
              <SiteImage
                id={featured.imageId}
                ratio="16/9"
                sizes="(min-width: 1024px) 55vw, 100vw"
                eager
              />
            </span>
            <span className="lg:col-span-5">
              <span className="type-eyebrow eyebrow-square block">
                Im Fokus · {featured.topic}
              </span>
              <span className="type-h2 mt-3 block group-hover:underline group-hover:decoration-2 group-hover:decoration-brand group-hover:underline-offset-4">
                {featured.title}
              </span>
              <span className="type-body mt-4 block text-neutral-700">
                {featured.description}
              </span>
              <span className="type-ui-sm mt-4 block text-neutral-600">
                {guideBody(featured.slug).readingMinutes} Min. Lesezeit
              </span>
            </span>
          </Link>
        )}

        <section aria-labelledby="alle-ratgeber" className="mt-16">
          <h2 id="alle-ratgeber" className="type-h2 mb-6">
            Alle Ratgeber
          </h2>
          <GuideFilter
            topics={GUIDE_TOPICS}
            items={rest.map((g) => ({
              key: g.slug,
              topic: g.topic,
              card: (
                <GuideCard
                  href={`/ratgeber/${g.slug}`}
                  image={
                    <SiteImage
                      id={g.imageId}
                      ratio="16/9"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="rounded-none"
                    />
                  }
                  category={g.topic}
                  title={g.title}
                  description={g.description}
                  readingMinutes={guideBody(g.slug).readingMinutes}
                />
              ),
            }))}
          />
        </section>

        <section
          aria-labelledby="kaufberatungen"
          className="mt-20 border-neutral-200 border-t pt-14"
        >
          <h2 id="kaufberatungen" className="type-h2">
            Kaufberatungen
          </h2>
          <p className="type-body mt-3 max-w-3xl text-neutral-700">
            Zu jeder Kategorie mit Bestenliste gehört eine ausführliche
            Kaufberatung.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GuideCard
              href="/hr-software#kaufberatung"
              image={
                <SiteImage
                  id="B-14"
                  ratio="16/9"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="rounded-none"
                />
              }
              category="HR-Software"
              title="HR-Software auswählen: Worauf es wirklich ankommt"
              description="Kernfunktionen, Gesamtkosten, DATEV, Datenschutz, Betriebsrat und Zeiterfassungspflicht – in sieben Punkten."
              readingMinutes={8}
            />
            <GuideCard
              href="/buchhaltungssoftware#kaufberatung"
              image={
                <SiteImage
                  id="B-11"
                  ratio="16/9"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="rounded-none"
                />
              }
              category="Buchhaltungssoftware"
              title="Buchhaltungssoftware auswählen: Worauf es wirklich ankommt"
              description="Selbst buchen oder buchen lassen, EÜR oder Bilanz, Gesamtkosten, E-Rechnung und DATEV – in sieben Punkten."
              readingMinutes={6}
            />
          </div>
        </section>
      </Container>
      <NewsletterBand />
    </>
  );
}
