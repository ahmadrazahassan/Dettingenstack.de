import { describe, expect, it } from "vitest";
import {
  groupResults,
  type SearchEntry,
  searchEntries,
  searchHref,
} from "@/lib/search";

const index: SearchEntry[] = [
  {
    href: "/software/personio",
    label: "Personio",
    group: "Software",
    keywords: "HR-Software Lohn",
  },
  {
    href: "/software/hr-works",
    label: "HR WORKS",
    group: "Software",
    keywords: "HR-Software",
  },
  {
    href: "/vergleich/personio-vs-hr-works",
    label: "Personio vs. HR WORKS",
    group: "Vergleiche",
  },
  {
    href: "/kostenrechner",
    label: "Kostenrechner",
    group: "Tools",
    keywords: "Was die Software kostet",
  },
  {
    href: "/ratgeber/x",
    label: "Gehälter richtig abrechnen",
    group: "Ratgeber",
  },
];

describe("searchEntries", () => {
  it("returns nothing for an empty query", () => {
    expect(searchEntries(index, "   ")).toEqual([]);
  });

  it("ranks label prefix hits above keyword hits", () => {
    const hrefs = searchEntries(index, "personio").map((r) => r.href);
    expect(hrefs[0]).toBe("/software/personio");
    expect(hrefs).toContain("/vergleich/personio-vs-hr-works");
  });

  it("requires every word to match", () => {
    expect(searchEntries(index, "personio works").map((r) => r.href)).toEqual([
      "/vergleich/personio-vs-hr-works",
    ]);
  });

  it("matches umlauts both ways", () => {
    expect(searchEntries(index, "gehaelter")[0]?.href).toBe("/ratgeber/x");
    expect(searchEntries(index, "gehälter")[0]?.href).toBe("/ratgeber/x");
  });

  it("expands synonyms (Payroll ↔ Lohn ↔ Gehalt)", () => {
    const hrefs = searchEntries(index, "payroll").map((r) => r.href);
    expect(hrefs).toContain("/software/personio");
    expect(hrefs).toContain("/ratgeber/x");
  });

  it("respects the limit", () => {
    expect(searchEntries(index, "hr", 1)).toHaveLength(1);
  });
});

describe("groupResults / searchHref", () => {
  it("groups in a fixed order and drops empty groups", () => {
    const groups = groupResults(searchEntries(index, "personio")).map(
      (g) => g.group,
    );
    expect(groups).toEqual(["Software", "Vergleiche"]);
  });

  it("encodes the query for /suche", () => {
    expect(searchHref(" Lexware & sevdesk ")).toBe(
      "/suche?q=Lexware%20%26%20sevdesk",
    );
  });
});
