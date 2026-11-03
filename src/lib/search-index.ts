import {
  categories,
  comparisons,
  getCategory,
  getTool,
  guides,
  tools,
} from "@/data";
import { sitePages, toolLinks } from "@/data/navigation";
import type { SearchEntry } from "./search";

// Search index from the data: only pages that exist are findable (§12.5).
export function searchIndex(): SearchEntry[] {
  return [
    ...tools.map((t) => ({
      href: `/software/${t.slug}`,
      label: t.name,
      group: "Software" as const,
      keywords: [
        t.vendor.name,
        t.tagline,
        ...[t.categories.primary, ...t.categories.secondary].map(
          (slug) => getCategory(slug)?.name ?? slug,
        ),
      ].join(" "),
    })),
    ...comparisons.map((c) => ({
      href: `/vergleich/${c.slug}`,
      label: `${getTool(c.toolA)?.name} vs. ${getTool(c.toolB)?.name}`,
      group: "Vergleiche" as const,
      keywords: `Vergleich ${getCategory(c.category)?.name ?? ""}`,
    })),
    ...categories.map((c) => ({
      href: `/${c.slug}`,
      label: c.name,
      group: "Kategorien" as const,
      keywords: `${c.nameShort} Vergleich Bestenliste`,
    })),
    ...guides.map((g) => ({
      href: `/ratgeber/${g.slug}`,
      label: g.title,
      group: "Ratgeber" as const,
      keywords: `${g.topic} ${g.description}`,
    })),
    {
      href: "/buchhaltungssoftware#kaufberatung",
      label: "Buchhaltungssoftware auswählen: Worauf es wirklich ankommt",
      group: "Ratgeber" as const,
      keywords: "Kaufberatung EÜR Bilanz DATEV E-Rechnung Steuerberatung",
    },
    {
      href: "/hr-software#kaufberatung",
      label: "HR-Software auswählen: Worauf es wirklich ankommt",
      group: "Ratgeber" as const,
      keywords: "Kaufberatung Personal DATEV Betriebsrat Zeiterfassungspflicht",
    },
    ...toolLinks.map((t) => ({
      href: t.href,
      label: t.label,
      group: "Tools" as const,
      keywords: t.description,
    })),
    ...sitePages.map((p) => ({
      href: p.href,
      label: p.label,
      group: "Seiten" as const,
    })),
  ];
}
