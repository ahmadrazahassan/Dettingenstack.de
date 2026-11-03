import { normalize } from "./search";

/** Heading text → URL fragment („Was gilt ab 2027?“ → „was-gilt-ab-2027“). */
export function slugify(text: string) {
  return normalize(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
