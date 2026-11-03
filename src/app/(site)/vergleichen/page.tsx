import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { AnalysisNotice } from "@/components/tool/blocks";
import { CompareTool } from "@/components/tools/compare-tool";
import { Skeleton } from "@/components/ui/misc";
import { categories } from "@/data";
import { categoryRanking } from "@/lib/derive";

export const metadata: Metadata = {
  title: "Vergleichstool: bis zu vier Tools nebeneinander",
  robots: { index: false, follow: true },
  alternates: { canonical: "/vergleich" },
};

export default function CompareToolPage() {
  // Each tool once, scored in its primary category.
  const items = categories.flatMap((c) =>
    categoryRanking(c)
      .filter((r) => r.tool.categories.primary === c.slug)
      .map((r) => ({
        tool: r.tool,
        overall: r.overall,
        categorySlug: c.slug,
        categoryName: c.name,
      })),
  );
  const updatedAt = categories
    .map((c) => c.updatedAt)
    .sort()
    .at(-1);

  return (
    <Container className="pt-10 pb-20">
      <Breadcrumbs items={[{ label: "Vergleichstool" }]} />
      <p className="type-eyebrow eyebrow-square mt-8">Tool</p>
      <h1 className="type-h1 mt-3">
        Vergleichstool: bis zu vier Tools nebeneinander
      </h1>
      <p className="type-lead mt-4 max-w-3xl">
        Wähle Tools aus und vergleiche Bewertung, Kosten für deine Teamgröße,
        Datenschutz und alle Funktionen in einer Tabelle.
      </p>
      {items.some((i) => i.tool.review.method === "analyse") && (
        <AnalysisNotice checkedAt={updatedAt ?? ""} className="mt-6" />
      )}
      <div className="mt-10">
        <Suspense fallback={<Skeleton className="h-14 w-full" />}>
          <CompareTool items={items} categories={categories} />
        </Suspense>
      </div>
    </Container>
  );
}
