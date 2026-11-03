import type { Metadata, Route } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/content/legal-page";
import { operator } from "@/lib/site";

// Operator data from the Vereinsregister (§ 5 DDG, § 18 MStV).
export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung der Dettingen e.V. nach § 5 DDG.",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  const responsible = operator.contentResponsible;
  return (
    <LegalPage title="Impressum" draft={false}>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {operator.legalName}
        <br />
        {operator.street}
        <br />
        {operator.postalCode} {operator.city}
        <br />
        {operator.country}
      </p>

      <h3>Vertreten durch den Vorstand</h3>
      <p>{operator.board.map((b) => `${b.name} (${b.role})`).join(", ")}</p>

      <h3>Kontakt</h3>
      <p>
        E-Mail:{" "}
        <a href={`mailto:${operator.email}`} className="link-marker">
          {operator.email}
        </a>
        {operator.phone && (
          <>
            <br />
            Telefon: {operator.phone}
          </>
        )}
        <br />
        Kontaktformular:{" "}
        <Link href={"/kontakt" as Route} className="link-marker">
          zum Kontaktformular
        </Link>
      </p>

      <h3>Registereintrag</h3>
      <p>
        Eintragung im {operator.register.type}
        <br />
        Registergericht: {operator.register.court}
        <br />
        Registernummer: {operator.register.number}
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {responsible.name}
        <br />
        {responsible.street}
        <br />
        {responsible.postalCode} {responsible.city}
      </p>
    </LegalPage>
  );
}
