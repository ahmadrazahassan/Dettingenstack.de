import type { Metadata, Route } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { NewsletterBand } from "@/components/layout/newsletter-band";
import { Badge } from "@/components/ui/badge";
import { StatTile } from "@/components/ui/misc";
import { SiteImage } from "@/components/ui/site-image";
import { Table, TableScroll, Td, Th } from "@/components/ui/table";
import { tools } from "@/data";
import { priceChanges } from "@/lib/derive";
import { formatDate, formatEUR, formatPercent } from "@/lib/format";
import { perUnit } from "@/lib/labels";

export const metadata: Metadata = {
  title: "Software-Preisindex: alle Preisänderungen im Überblick",
  description:
    "Wir erfassen die veröffentlichten Preise von Business-Software mit Datum und dokumentieren jede Änderung.",
  alternates: { canonical: "/preisindex" },
};

export default function PriceIndexPage() {
  const changes = priceChanges();
  const points = tools.flatMap((t) =>
    t.pricing.history.map((p) => ({
      tool: t,
      point: p,
      plan: t.pricing.plans.find((pl) => pl.id === p.planId),
    })),
  );
  const firstDate = points.map((p) => p.point.date).sort()[0];
  const increases = changes.filter(
    (c) => (c.after ?? 0) > (c.before ?? 0),
  ).length;

  return (
    <>
      <Container className="pt-10 pb-20">
        <Breadcrumbs items={[{ label: "Preisindex" }]} />
        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="type-eyebrow eyebrow-square">Preisindex</p>
            <h1 className="type-h1 mt-3">
              Software-Preisindex: alle Preisänderungen im Überblick
            </h1>
            <p className="type-lead mt-4">
              Wir speichern jeden veröffentlichten Tarifpreis mit Datum. Ändert
              ein Anbieter seinen Preis, erscheint die Änderung hier.
            </p>
          </div>
          <div className="lg:col-span-5">
            <SiteImage
              id="B-05"
              sizes="(min-width: 1024px) 40vw, 100vw"
              eager
            />
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-8 border-neutral-200 border-y py-8 sm:grid-cols-3">
          <StatTile
            value={String(points.length)}
            label="erfasste Preispunkte"
          />
          <StatTile
            value={String(changes.length)}
            label="Preisänderungen erfasst"
          />
          <StatTile value={String(increases)} label="davon Erhöhungen" />
        </dl>

        <section aria-labelledby="aenderungen" className="mt-14">
          <h2 id="aenderungen" className="type-h2">
            Letzte Preisänderungen
          </h2>
          {changes.length === 0 ? (
            <p className="type-body mt-4 max-w-3xl text-neutral-800">
              Noch keine Änderungen: Wir erfassen Preise seit dem{" "}
              {firstDate ? formatDate(firstDate) : "Start"}. Die erste Änderung
              erscheint hier, sobald ein Anbieter einen Tarifpreis anpasst.
            </p>
          ) : (
            <div className="mt-6">
              <TableScroll label="Preisänderungen">
                <Table className="min-w-[640px]">
                  <thead>
                    <tr>
                      <Th>Datum</Th>
                      <Th>Tool</Th>
                      <Th>Tarif</Th>
                      <Th className="text-right">Vorher</Th>
                      <Th className="text-right">Nachher</Th>
                      <Th>Veränderung</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {changes.map((c) => {
                      const delta =
                        c.before && c.after
                          ? (c.after - c.before) / c.before
                          : null;
                      return (
                        <tr key={`${c.tool.slug}-${c.planName}-${c.date}`}>
                          <Td>{formatDate(c.date)}</Td>
                          <Td>{c.tool.name}</Td>
                          <Td>{c.planName}</Td>
                          <Td numeric>
                            {c.before != null ? formatEUR(c.before) : "–"}
                          </Td>
                          <Td numeric>
                            {c.after != null ? formatEUR(c.after) : "–"}
                          </Td>
                          <Td>
                            {delta != null && (
                              <Badge
                                variant={delta > 0 ? "negative" : "positive"}
                              >{`${delta > 0 ? "+" : ""}${formatPercent(delta)}`}</Badge>
                            )}
                          </Td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </TableScroll>
            </div>
          )}
        </section>

        <section aria-labelledby="stand" className="mt-14">
          <h2 id="stand" className="type-h2 mb-6">
            Aktueller Preisstand
          </h2>
          <TableScroll label="Aktuelle Preise">
            <Table className="min-w-[640px]">
              <thead>
                <tr>
                  <Th>Tool</Th>
                  <Th>Tarif</Th>
                  <Th className="text-right">Monatlich</Th>
                  <Th className="text-right">Jährlich (pro Monat)</Th>
                  <Th>Geprüft am</Th>
                </tr>
              </thead>
              <tbody>
                {points.map(({ tool, point, plan }) => {
                  const unit =
                    plan && "unit" in plan.model
                      ? perUnit[plan.model.unit]
                      : "";
                  return (
                    <tr key={`${tool.slug}-${point.planId}-${point.date}`}>
                      <Td>
                        <Link
                          href={`/software/${tool.slug}/preise` as Route}
                          className="font-semibold text-black hover:underline"
                        >
                          {tool.name}
                        </Link>
                      </Td>
                      <Td>{plan?.name ?? point.planId}</Td>
                      <Td numeric>
                        {point.price.monthly != null
                          ? formatEUR(point.price.monthly)
                          : "–"}
                      </Td>
                      <Td numeric>
                        {point.price.annualPerMonth != null
                          ? formatEUR(point.price.annualPerMonth)
                          : "–"}
                      </Td>
                      <Td>
                        {formatDate(point.date)}
                        <span className="type-ui-sm block text-neutral-600">
                          {unit}
                        </span>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TableScroll>
          <p className="type-ui-sm mt-3 text-neutral-600">
            Nur Anbieter mit veröffentlichten Preisen. Preise auf Anfrage
            erscheinen hier nicht. Alle Preise netto.
          </p>
        </section>
      </Container>
      <NewsletterBand />
    </>
  );
}
