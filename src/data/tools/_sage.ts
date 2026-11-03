import type { ToolInput } from "@/lib/schema";

// Shared facts for the Sage Deutschland portfolio (sage.com/de-de, checked 2026-11-03).
export const checkedSage = "2026-11-03";

export const sageVendor = {
  name: "Sage GmbH",
  hq: "Frankfurt am Main",
  countryCode: "DE",
  website: "https://www.sage.com/de-de/",
} satisfies ToolInput["vendor"];

export const sageUrl = (path: string) => `https://www.sage.com/de-de/${path}`;

export const sageReview = (basis: string): ToolInput["review"] => ({
  method: "analyse",
  testSetup: `Analyse auf Basis ${basis} (Stand 03.11.2026). Ein Praxistest steht noch aus.`,
  authorId: "redaktion",
  editorId: "redaktion",
  publishedAt: checkedSage,
  updatedAt: checkedSage,
});

/** „Über 630 Mitarbeiter an 4 Standorten in Deutschland“ – stated on every Sage product page. */
export const sageSupport = {
  languages: ["de"],
  channels: [],
  onboarding: "unbekannt",
  note: "Sage Deutschland mit Standorten in Frankfurt am Main, Leipzig, Mönchengladbach und Donaueschingen",
} satisfies ToolInput["support"];

export { hrFeatures } from "./_hr";
