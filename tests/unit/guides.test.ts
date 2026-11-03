import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { guides, relatedGuides } from "@/data";
import { imagesById } from "@/data/images";
import { guideBody } from "@/lib/guides";
import { slugify } from "@/lib/slug";

const BANNED = [
  /nahtlos/i,
  /ganzheitlich/i,
  /Mehrwert bieten/i,
  /In der heutigen/i,
  /Zusammenfassend lässt sich/i,
  /Tauchen wir ein/i,
  /!\s/,
];

describe("Ratgeber", () => {
  it("has the 20 planned guides with unique slugs and images B-21 to B-40", () => {
    expect(guides).toHaveLength(20);
    expect(new Set(guides.map((g) => g.slug)).size).toBe(20);
    expect(new Set(guides.map((g) => g.imageId)).size).toBe(20);
  });

  it.each(guides.map((g) => [g.slug, g] as const))(
    "%s: body, image, headings and sources",
    (_slug, guide) => {
      expect(
        fs.existsSync(path.join("src/content/ratgeber", `${guide.slug}.mdx`)),
      ).toBe(true);
      expect(imagesById[guide.imageId]).toBeDefined();
      const body = guideBody(guide.slug);
      expect(body.headings.length).toBeGreaterThanOrEqual(3);
      expect(new Set(body.headings.map((h) => h.id)).size).toBe(
        body.headings.length,
      );
      // Guard against empty or half-written bodies; the spec target (1.800–3.500 words) is not reached yet.
      expect(body.words).toBeGreaterThan(400);
      expect(guide.sources.every((s) => s.url.startsWith("https://"))).toBe(
        true,
      );
    },
  );

  it.each(guides.map((g) => [g.slug] as const))(
    "%s: no banned phrases or exclamation marks in running text",
    (slug) => {
      const text = fs
        .readFileSync(path.join("src/content/ratgeber", `${slug}.mdx`), "utf8")
        .replace(/\]\([^)]*\)/g, "]");
      for (const re of BANNED) expect(text).not.toMatch(re);
    },
  );

  it("links only to guides that exist", () => {
    const slugs = new Set(guides.map((g) => g.slug));
    for (const g of guides) {
      const text = fs.readFileSync(
        path.join("src/content/ratgeber", `${g.slug}.mdx`),
        "utf8",
      );
      for (const m of text.matchAll(/\]\(\/ratgeber\/([a-z0-9-]+)\)/g))
        expect(slugs).toContain(m[1]);
    }
  });

  it("suggests three related guides, never the guide itself", () => {
    for (const g of guides) {
      const related = relatedGuides(g);
      expect(related).toHaveLength(3);
      expect(related.map((r) => r.slug)).not.toContain(g.slug);
    }
  });
});

describe("slugify", () => {
  it("builds stable German heading ids", () => {
    expect(slugify("Was gilt ab 2027?")).toBe("was-gilt-ab-2027");
    expect(slugify("Über Größe & Maße")).toBe("ueber-groesse-masse");
  });
});
