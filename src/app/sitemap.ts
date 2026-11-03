import type { MetadataRoute } from "next";
import { categories, comparisons, guides, tools } from "@/data";
import { site } from "@/lib/site";

// All indexable routes (§15.3). lastModified comes from the data's updatedAt, never from the build time.
// Not listed: /suche, /vergleichen and /styleguide (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const latest = (dates: string[]) => dates.sort().at(-1);

  const toolDates = tools.map((t) => t.review.updatedAt);
  const comparisonDates = comparisons.map((c) => c.updatedAt);
  const categoryDates = categories.map((c) => c.updatedAt);
  const priceDates = tools.map((t) => t.pricing.checkedAt);
  const everything = latest([
    ...toolDates,
    ...comparisonDates,
    ...categoryDates,
    ...priceDates,
  ]);

  const staticPages: [string, string | undefined][] = [
    ["/", everything],
    ["/kategorien", latest([...categoryDates])],
    ["/vergleich", latest([...comparisonDates])],
    ["/preisindex", latest([...priceDates])],
    ["/kostenrechner", latest([...priceDates])],
    ["/software-finder", latest([...toolDates])],
    [
      "/ratgeber",
      latest([...categoryDates, ...guides.map((g) => g.updatedAt)]),
    ],
    ["/methodik", undefined],
    ["/transparenz", undefined],
    ["/marktdaten", "2025-11-24"],
    ["/ueber-uns", undefined],
    ["/redaktion", undefined],
    ["/fuer-anbieter", undefined],
    ["/kontakt", undefined],
    ["/newsletter", undefined],
    ["/impressum", undefined],
    ["/datenschutz", "2026-11-03"],
    ["/barrierefreiheit", "2026-11-03"],
  ];

  return [
    ...staticPages.map(([path, lastModified]) => ({
      url: url(path),
      ...(lastModified ? { lastModified } : {}),
    })),
    ...categories.map((c) => ({
      url: url(`/${c.slug}`),
      lastModified: c.updatedAt,
    })),
    ...tools.flatMap((t) => [
      { url: url(`/software/${t.slug}`), lastModified: t.review.updatedAt },
      {
        url: url(`/software/${t.slug}/preise`),
        lastModified: t.pricing.checkedAt,
      },
      {
        url: url(`/software/${t.slug}/alternativen`),
        lastModified: t.review.updatedAt,
      },
    ]),
    ...guides.map((g) => ({
      url: url(`/ratgeber/${g.slug}`),
      lastModified: g.updatedAt,
    })),
    ...comparisons.map((c) => ({
      url: url(`/vergleich/${c.slug}`),
      lastModified: c.updatedAt,
    })),
  ];
}
