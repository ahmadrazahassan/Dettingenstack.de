import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Callout } from "./blocks";
import { Prose } from "./prose";

// Simple article template for legal pages (§11.22). Phase 0 content is a skeleton with placeholders.
export function LegalPage({
  title,
  intro,
  draft = true,
  children,
}: {
  title: string;
  intro?: string;
  /** false once every placeholder is filled in; hides the „Entwurf“ notice. */
  draft?: boolean;
  children: ReactNode;
}) {
  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs items={[{ label: title }]} />
      <div className="mt-8 max-w-article">
        <h1 className="type-h1">{title}</h1>
        {intro && <p className="type-lead mt-4">{intro}</p>}
        {draft && (
          <div className="mt-8">
            <Callout type="recht" title="Entwurf – noch nicht gültig">
              Diese Seite ist ein Gerüst. Alle markierten Platzhalter müssen vor
              dem Start ausgefüllt und die Texte von einer Rechtsberatung
              geprüft werden.
            </Callout>
          </div>
        )}
      </div>
      <Prose className="mt-10">{children}</Prose>
    </Container>
  );
}
