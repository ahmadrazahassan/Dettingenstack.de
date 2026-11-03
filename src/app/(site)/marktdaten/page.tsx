import type { Metadata, Route } from "next";
import Link from "next/link";
import { ChartFrame } from "@/components/charts/chart-frame";
import { PercentBars } from "@/components/charts/percent-bars";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { SiteImage } from "@/components/ui/site-image";
import { marketSections } from "@/data/market";

export const metadata: Metadata = {
  title: "Marktdaten: Digitalisierung im Mittelstand in Zahlen",
  description:
    "Wie viele Unternehmen in Deutschland Cloud-Software und KI nutzen – amtliche Zahlen von Destatis als Grafik und Tabelle, frei verwendbar mit Quellenangabe.",
  alternates: { canonical: "/marktdaten" },
};

// Marktdaten (§11.14): only sourced charts, each with a data table.
export default function MarketDataPage() {
  const sources = [
    ...new Map(
      marketSections.flatMap((s) =>
        s.charts.map((c) => [c.source.url, c.source]),
      ),
    ).values(),
  ];

  return (
    <>
      <Container className="pt-10 pb-20">
        <Breadcrumbs items={[{ label: "Marktdaten" }]} />
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-eyebrow eyebrow-square">Marktdaten</p>
            <h1 className="type-h1 mt-3">
              Marktdaten: Digitalisierung im deutschen Mittelstand in Zahlen
            </h1>
            <p className="type-lead mt-4">
              Amtliche Zahlen zur Nutzung von Cloud-Software und künstlicher
              Intelligenz in Unternehmen. Jede Grafik mit Quelle, Stand und
              Datentabelle.
            </p>
          </div>
          <div className="lg:col-span-5">
            <SiteImage
              id="B-08"
              sizes="(min-width: 1024px) 40vw, 100vw"
              eager
            />
          </div>
        </div>

        <nav aria-label="Themen" className="mt-12 flex flex-wrap gap-2">
          {marketSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex h-8 items-center rounded-sm bg-neutral-100 px-3 font-ui text-[14px] text-black transition-colors hover:bg-neutral-200"
            >
              {s.title}
            </a>
          ))}
        </nav>

        {marketSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-titel`}
            className="mt-16 scroll-mt-32"
          >
            <h2 id={`${section.id}-titel`} className="type-h2">
              {section.title}
            </h2>
            <p className="type-body mt-3 max-w-3xl text-neutral-800">
              {section.intro}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {section.charts.map((c) => (
                <ChartFrame
                  key={c.id}
                  title={c.title}
                  subtitle={c.subtitle}
                  source={`${c.source.name}, ${c.source.title}`}
                  date={c.date}
                  table={{
                    columns: [c.firstColumn, "Anteil in %"],
                    rows: c.data.map((d) => [d.label, d.value]),
                  }}
                >
                  <PercentBars data={c.data} highlight={c.highlight} />
                </ChartFrame>
              ))}
            </div>
          </section>
        ))}

        <p className="type-small mt-8 max-w-3xl text-neutral-700">
          Grundlage ist die Erhebung zur Nutzung von Informations- und
          Kommunikationstechnologien in Unternehmen ab zehn Beschäftigten. Seit
          2025 zählt Destatis Unternehmen nach der EU-Einheitenverordnung;
          Vergleiche mit früheren Jahren sind deshalb nur eingeschränkt möglich.
        </p>

        <aside
          aria-labelledby="grafiken-verwenden"
          className="mt-14 rounded-md border-black border-l-4 bg-brand-50 p-6"
        >
          <h2 id="grafiken-verwenden" className="type-h4">
            Grafiken verwenden
          </h2>
          <p className="type-body mt-2 text-neutral-800">
            Du darfst unsere Grafiken mit Quellenangabe und einem Link auf diese
            Seite verwenden. Die Originalquellen findest du unter jeder Grafik.
          </p>
        </aside>

        <section
          aria-labelledby="marktdaten-quellen"
          className="mt-14 border-neutral-200 border-t pt-6"
        >
          <h2 id="marktdaten-quellen" className="type-h4">
            Quellen
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {sources.map((s) => (
              <li key={s.url} className="type-small text-neutral-700">
                {s.name}:{" "}
                <a
                  href={s.url}
                  rel="noopener"
                  className="text-black underline underline-offset-2"
                >
                  {s.title}
                </a>
                . Abgerufen am 02.11.2026.
              </li>
            ))}
          </ul>
        </section>

        <p className="type-body mt-12 text-neutral-800">
          Was die Zahlen für deine Software-Entscheidung bedeuten, liest du im
          Ratgeber{" "}
          <Link
            href={"/ratgeber/cloud-oder-on-premise" as Route}
            className="link-marker font-medium"
          >
            Cloud oder On-Premise
          </Link>
          .
        </p>
      </Container>
      <NewsletterBand />
    </>
  );
}
