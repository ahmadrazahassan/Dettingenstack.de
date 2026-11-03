// Cross-reference checks the Zod schemas can't express (§6.6). Runs before every build.
// Strict mode (DETTINGEN_STRICT=1) additionally fails on drafts/placeholders — use it for production.

import {
  authors,
  categories,
  comparisons,
  getCategory,
  getTool,
  tools,
} from "../src/data";
import { integrations } from "../src/data/integrations";
import { CRITERIA } from "../src/lib/schema";

const strict = process.env.DETTINGEN_STRICT === "1";
const errors: string[] = [];
const warnings: string[] = [];
const today = new Date("2026-11-02");
const daysSince = (iso: string) =>
  (today.getTime() - new Date(iso).getTime()) / 86_400_000;

const dupes = (list: string[]) => list.filter((x, i) => list.indexOf(x) !== i);
for (const d of dupes(tools.map((t) => t.slug)))
  errors.push(`Doppelter Tool-Slug: ${d}`);
for (const d of dupes(comparisons.map((c) => c.slug)))
  errors.push(`Doppelter Vergleichs-Slug: ${d}`);

for (const category of categories) {
  const sum = CRITERIA.reduce((s, c) => s + (category.scoreWeights[c] ?? 0), 0);
  if (Math.abs(sum - 1) > 0.001)
    errors.push(`${category.slug}: Gewichte ergeben ${sum}, nicht 1`);
  if (!authors.some((a) => a.id === category.authorId))
    errors.push(`${category.slug}: Autor ${category.authorId} fehlt`);
}

for (const tool of tools) {
  const category = getCategory(tool.categories.primary);
  if (!category) {
    warnings.push(
      `${tool.slug}: Kategorie ${tool.categories.primary} hat noch keine Daten`,
    );
  } else {
    const featureIds = new Set(
      category.featureGroups.flatMap((g) => g.features.map((f) => f.id)),
    );
    // Secondary categories may add their own features; only the primary ones are mandatory.
    const allowed = new Set(featureIds);
    for (const slug of tool.categories.secondary)
      for (const g of getCategory(slug)?.featureGroups ?? [])
        for (const f of g.features) allowed.add(f.id);
    for (const id of Object.keys(tool.features)) {
      if (!allowed.has(id))
        errors.push(`${tool.slug}: unbekannte Funktion „${id}“`);
    }
    for (const id of featureIds) {
      if (!(id in tool.features))
        errors.push(
          `${tool.slug}: Funktion „${id}“ fehlt (unbekannt statt weglassen)`,
        );
    }
    for (const plan of tool.pricing.plans) {
      for (const f of plan.features)
        if (!allowed.has(f))
          errors.push(`${tool.slug}/${plan.id}: unbekannte Funktion „${f}“`);
    }
  }
  for (const i of tool.integrations)
    if (!(i in integrations))
      errors.push(`${tool.slug}: unbekannte Integration „${i}“`);
  for (const p of tool.pricing.history) {
    if (!tool.pricing.plans.some((plan) => plan.id === p.planId))
      errors.push(`${tool.slug}: Preispunkt für unbekannten Tarif ${p.planId}`);
  }
  if (tool.pricing.currency === "USD" && !tool.pricing.usdConversion)
    errors.push(`${tool.slug}: USD ohne Umrechnungskurs`);
  if (tool.affiliate && !tool.affiliate.url.startsWith("https://"))
    errors.push(`${tool.slug}: Affiliate-Link ohne https`);
  for (const id of [tool.review.authorId, tool.review.editorId]) {
    if (!authors.some((a) => a.id === id))
      errors.push(`${tool.slug}: Autor ${id} fehlt`);
  }
  if (daysSince(tool.pricing.checkedAt) > 90)
    warnings.push(
      `${tool.slug}: Preise älter als 90 Tage (${tool.pricing.checkedAt})`,
    );
  if (tool.review.method === "test" && tool.screenshots.length < 3)
    warnings.push(`${tool.slug}: weniger als 3 Screenshots`);
  if (tool.isPlaceholder)
    (strict ? errors : warnings).push(
      `${tool.slug}: redaktioneller Entwurf (isPlaceholder)`,
    );
}

for (const c of comparisons) {
  const a = getTool(c.toolA);
  const b = getTool(c.toolB);
  if (!a || !b) {
    errors.push(`${c.slug}: Tool fehlt`);
    continue;
  }
  const cats = (t: typeof a) => [
    t.categories.primary,
    ...t.categories.secondary,
  ];
  if (!cats(a).includes(c.category) || !cats(b).includes(c.category)) {
    errors.push(
      `${c.slug}: beide Tools müssen zur Kategorie ${c.category} gehören`,
    );
  }
  const allowed = new Set([c.toolA, c.toolB, "unentschieden"]);
  if (!allowed.has(c.verdict.winner))
    errors.push(`${c.slug}: ungültiger Gewinner ${c.verdict.winner}`);
  for (const v of [
    ...Object.values(c.criteriaNotes),
    ...Object.values(c.featureGroupVerdicts),
  ]) {
    if (!allowed.has(v.winner))
      errors.push(`${c.slug}: ungültiger Gewinner ${v.winner}`);
  }
  for (const p of c.personas)
    if (!allowed.has(p.pick)) errors.push(`${c.slug}: Persona wählt ${p.pick}`);
  if (c.isPlaceholder)
    (strict ? errors : warnings).push(
      `${c.slug}: redaktioneller Entwurf (isPlaceholder)`,
    );
}

for (const a of authors)
  if (a.isPlaceholder)
    (strict ? errors : warnings).push(
      `Autor ${a.id}: Platzhalter, echte Person fehlt`,
    );

if (warnings.length)
  console.warn(
    `⚠ ${warnings.length} Hinweis(e):\n  ${warnings.join("\n  ")}\n`,
  );
if (errors.length) {
  console.error(`✗ ${errors.length} Fehler:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(
  `✓ Daten gültig: ${tools.length} Tools, ${categories.length} Kategorie(n), ${comparisons.length} Vergleiche.`,
);
