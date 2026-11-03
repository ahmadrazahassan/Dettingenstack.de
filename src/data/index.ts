import type { z } from "zod";
import {
  Author,
  Category,
  type CategorySlug,
  Comparison,
  Guide,
  Tool,
} from "@/lib/schema";
import { authors as rawAuthors } from "./authors";
import { guides as rawGuides } from "./guides";
import { toolLogos } from "./logos";
import * as buchhaltung from "./registry/buchhaltungssoftware";
import * as crm from "./registry/crm-software";
import * as dms from "./registry/dokumentenmanagement-software";
import * as erp from "./registry/erp-software";
import * as hr from "./registry/hr-software";
import * as newsletter from "./registry/newsletter-software";
import * as pm from "./registry/projektmanagement-software";
import * as rechnungen from "./registry/rechnungsprogramme";
import * as shops from "./registry/shopsysteme";
import * as zeit from "./registry/zeiterfassungssoftware";

// Every data file is parsed here, so a malformed file fails the build (§6.6).
// One registry file per live category (src/data/registry) lists its tools and comparisons.
const live = [
  hr,
  buchhaltung,
  rechnungen,
  zeit,
  crm,
  pm,
  newsletter,
  erp,
  dms,
  shops,
];

/** Parse with an error that names the record and the failing fields. */
function parse<T>(
  schema: z.ZodType<T>,
  value: { slug: string },
  kind: string,
): T {
  const result = schema.safeParse(value);
  if (result.success) return result.data;
  const issues = result.error.issues
    .map((i) => `${i.path.join(".")}: ${i.message}`)
    .join("; ");
  throw new Error(`${kind} „${value.slug}“ ist ungültig – ${issues}`);
}

export const categories: Category[] = live.map((r) =>
  parse(Category, r.category, "Kategorie"),
);

// Logos live in one registry (src/data/logos.ts) instead of 76 tool files; a tool's own `logo` wins.
export const tools: Tool[] = live
  .flatMap((r) => r.tools)
  .map((t) => ({ ...t, logo: t.logo ?? toolLogos[t.slug] ?? null }))
  .map((t) => parse(Tool, t, "Tool"))
  .filter((t) => t.status === "published");

export const comparisons: Comparison[] = live
  .flatMap((r) => r.comparisons)
  .map((c) => parse(Comparison, c, "Vergleich"));

export const guides: Guide[] = rawGuides.map((g) =>
  parse(Guide, g, "Ratgeber"),
);

export const authors: Author[] = rawAuthors.map((a) => Author.parse(a));

const bySlug = <T extends { slug: string }>(list: T[]) =>
  new Map(list.map((x) => [x.slug, x]));
const toolMap = bySlug(tools);
const categoryMap = bySlug(categories);
const comparisonMap = bySlug(comparisons);
const guideMap = bySlug(guides);

export const getTool = (slug: string) => toolMap.get(slug);
export const getCategory = (slug: string) =>
  categoryMap.get(slug as CategorySlug);
export const getComparison = (slug: string) => comparisonMap.get(slug);
export const getGuide = (slug: string) => guideMap.get(slug);
export const getAuthor = (id: string) => authors.find((a) => a.id === id);

/** Up to three guides for the end of an article: same topic first, then the rest in list order. */
export const relatedGuides = (guide: Guide) =>
  [
    ...guides.filter((g) => g.topic === guide.topic),
    ...guides.filter((g) => g.topic !== guide.topic),
  ]
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 3);

export const toolsInCategory = (slug: CategorySlug) =>
  tools.filter(
    (t) =>
      t.categories.primary === slug || t.categories.secondary.includes(slug),
  );

export const comparisonsForTool = (slug: string) =>
  comparisons.filter((c) => c.toolA === slug || c.toolB === slug);

export const comparisonsInCategory = (slug: CategorySlug) =>
  comparisons.filter((c) => c.category === slug);

/** Tools with a full category page (hub, reviews). Other categories follow in phase 3. */
export const liveCategorySlugs = categories.map((c) => c.slug);
