import fs from "node:fs";
import path from "node:path";
import { slugify } from "./slug";

// Reads a Ratgeber body at build time: word count for the reading time, ## headings for the TOC.
export function guideBody(slug: string) {
  const file = path.join(process.cwd(), "src/content/ratgeber", `${slug}.mdx`);
  const source = fs.readFileSync(file, "utf8");
  // Keep the words inside components (tables, checklists); drop only syntax: link URLs, tag and prop names.
  const text = source
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/<\/?[A-Z][A-Za-z]*/g, " ")
    .replace(/\b[a-z]+=\{?/g, " ")
    .replace(/[{}[\]"`<>/*#]/g, " ");
  const words = text
    .split(/\s+/)
    .filter((w) => /[a-zA-ZäöüÄÖÜß0-9]/.test(w)).length;
  const headings = [...source.matchAll(/^## (.+)$/gm)].map((m) => {
    const label = (m[1] ?? "").trim();
    return { id: slugify(label), label };
  });
  return {
    words,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    headings,
  };
}
