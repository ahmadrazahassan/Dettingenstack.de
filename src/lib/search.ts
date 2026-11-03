// Site search matching (§12.5). Pure functions, used by the header dialog, the hero search and /suche.
// At this content size a normalised token match is enough; switch to MiniSearch once there are hundreds of entries.

/** Built on the server from the data (src/lib/search-index.ts), so only existing pages are searchable. */
export type SearchEntry = {
  href: string;
  label: string;
  group: SearchGroup;
  keywords?: string;
};

export const SEARCH_GROUPS = [
  "Software",
  "Vergleiche",
  "Kategorien",
  "Ratgeber",
  "Tools",
  "Seiten",
] as const;
export type SearchGroup = (typeof SEARCH_GROUPS)[number];

// German-friendly matching: case-insensitive, ä ↔ ae, ö ↔ oe, ü ↔ ue, ß ↔ ss.
export const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");

const SYNONYMS = [
  ["lohn", "gehalt", "gehälter", "payroll"],
  ["zeiterfassung", "stempeluhr", "arbeitszeit"],
  ["erp", "warenwirtschaft"],
  ["dms", "dokumentenmanagement", "archiv"],
  ["rechnung", "faktura", "e-rechnung"],
  ["crm", "kundenverwaltung"],
  ["newsletter", "e-mail-marketing"],
  ["shop", "onlineshop", "e-commerce"],
  ["hr", "personal", "personalverwaltung"],
].map((group) => group.map(normalize));

/** A query token plus its synonyms; matching any of them counts. */
function variants(token: string) {
  const group = SYNONYMS.find((g) =>
    g.some((word) => word.startsWith(token) || token.startsWith(word)),
  );
  return group ? [token, ...group] : [token];
}

/** Every query word must match the label or the keywords. Label hits rank above keyword hits. */
export function searchEntries(index: SearchEntry[], query: string, limit = 50) {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of index) {
    const label = normalize(entry.label);
    const keywords = normalize(entry.keywords ?? "");
    let score = 0;
    for (const token of tokens) {
      const options = variants(token);
      if (options.some((o) => label.startsWith(o))) score += 3;
      else if (options.some((o) => label.includes(o))) score += 2;
      else if (options.some((o) => keywords.includes(o))) score += 1;
      else {
        score = 0;
        break;
      }
    }
    if (score > 0) scored.push({ entry, score });
  }
  return scored
    .sort(
      (a, b) =>
        b.score - a.score || a.entry.label.localeCompare(b.entry.label, "de"),
    )
    .slice(0, limit)
    .map((s) => s.entry);
}

export function groupResults(results: SearchEntry[]) {
  return SEARCH_GROUPS.map((group) => ({
    group,
    items: results.filter((r) => r.group === group),
  })).filter((g) => g.items.length > 0);
}

export const searchHref = (query: string) =>
  `/suche?q=${encodeURIComponent(query.trim())}`;
