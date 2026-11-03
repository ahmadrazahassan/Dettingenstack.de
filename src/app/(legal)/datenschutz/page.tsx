import type { Metadata, Route } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/content/legal-page";
import { formatDate } from "@/lib/format";
import { mailConfigured } from "@/lib/mail";
import { operator } from "@/lib/site";

// Describes only what the site actually does. Sections for Plausible and the Resend-backed forms switch with the
// configuration, so the text never claims a service that is not running (Art. 13 DSGVO).
export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Welche Daten Dettingenstack verarbeitet, wenn du die Website nutzt – Hosting, Logfiles, Formulare und deine Rechte.",
  alternates: { canonical: "/datenschutz" },
};

const UPDATED = "2026-11-03";

export default function DatenschutzPage() {
  const analytics = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
  const formsLive = mailConfigured();
  const responsible = operator.contentResponsible;

  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro="Hier erfährst du, welche Daten wir verarbeiten, wenn du Dettingenstack nutzt – und welche nicht."
      draft={false}
    >
      <h2>Verantwortliche Stelle</h2>
      <p>
        {operator.legalName}
        <br />
        {operator.street}
        <br />
        {operator.postalCode} {operator.city}
        <br />
        Vertreten durch den Vorstand:{" "}
        {operator.board.map((b) => b.name).join(" und ")}
        <br />
        E-Mail:{" "}
        <a href={`mailto:${operator.email}`} className="link-marker">
          {operator.email}
        </a>
      </p>
      <p>
        Wir sind nicht verpflichtet, eine Datenschutzbeauftragte oder einen
        Datenschutzbeauftragten zu benennen, und haben niemanden benannt. Bei
        Fragen zum Datenschutz schreib uns an die oben genannte E-Mail-Adresse.
      </p>

      <h2>Das Wichtigste in Kürze</h2>
      <ul>
        <li>
          Wir setzen keine Cookies und kein Tracking über Websites hinweg.
        </li>
        <li>
          Schriften und Bilder liefern wir selbst aus – beim Aufruf unserer
          Seiten entstehen keine Verbindungen zu Google oder anderen Dritten.
        </li>
        <li>Wir erstellen keine Nutzerprofile und verkaufen keine Daten.</li>
      </ul>

      <h2>Hosting</h2>
      <p>
        Unsere Website wird bei der Vercel Inc., 440 N Barranca Avenue #4133,
        Covina, CA 91723, USA, gehostet. Vercel stellt die Server und das
        Auslieferungsnetz bereit und verarbeitet dabei die technisch nötigen
        Daten in unserem Auftrag. Wir haben mit Vercel einen
        Auftragsverarbeitungsvertrag (Data Processing Addendum) geschlossen.
        Serverfunktionen laufen in der Region Frankfurt am Main; Inhalte können
        über Server in weiteren Ländern ausgeliefert werden.
      </p>
      <p>
        Vercel ist nach dem EU-US Data Privacy Framework zertifiziert. Für
        Übermittlungen in die USA stützen wir uns auf den
        Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO) und ergänzend
        auf Standardvertragsklauseln. Rechtsgrundlage für das Hosting ist unser
        berechtigtes Interesse an einer sicheren und schnellen Bereitstellung
        der Website (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2>Server-Logfiles</h2>
      <p>
        Bei jedem Aufruf verarbeitet der Server automatisch: IP-Adresse, Datum
        und Uhrzeit, aufgerufene Seite, Referrer-URL, Browser und Betriebssystem
        (User-Agent) sowie den Statuscode. Diese Daten brauchen wir, um die
        Website auszuliefern, Fehler zu finden und Angriffe abzuwehren (Art. 6
        Abs. 1 lit. f DSGVO). Vercel speichert sie nur befristet; die Dauer
        hängt vom gebuchten Tarif ab. Wir führen sie nicht mit anderen Daten
        zusammen.
      </p>

      <h2>Reichweitenmessung</h2>
      {analytics ? (
        <p>
          Wir zählen Seitenaufrufe und Klicks auf Anbieter-Links mit Plausible
          Analytics (Plausible Insights OÜ, Västriku tn 2, 50403 Tartu,
          Estland). Plausible setzt keine Cookies, speichert keine IP-Adressen
          und erstellt keine Profile; die Daten werden in der EU verarbeitet und
          nur zusammengefasst ausgewertet. Rechtsgrundlage ist unser
          berechtigtes Interesse an einer datensparsamen Reichweitenmessung
          (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      ) : (
        <p>
          Derzeit messen wir keine Reichweite. Sollten wir das einführen,
          ergänzen wir diesen Abschnitt vorher.
        </p>
      )}

      <h2>Speicherung im Browser</h2>
      <p>
        Wenn du Tools zum Vergleich auswählst, merkt sich dein Browser diese
        Auswahl im sessionStorage, bis du den Tab schließt. Das ist für die von
        dir angeforderte Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2
        TDDDG); die Daten verlassen deinen Browser nicht. Antworten im
        Software-Finder und Eingaben im Kostenrechner werden nicht gespeichert;
        geteilte Links enthalten nur die Einstellungen, die du selbst in die
        Adresse übernimmst.
      </p>

      <h2>Kontaktformular, Angebotsanfragen und Newsletter</h2>
      {formsLive ? (
        <>
          <p>
            Wenn du uns über das Kontaktformular schreibst, verarbeiten wir
            Name, E-Mail-Adresse, Betreff und Nachricht, um deine Anfrage zu
            beantworten (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Den Versand der
            E-Mails übernimmt Resend (Plus Five Five, Inc., USA) als
            Auftragsverarbeiterin; der Versand läuft über Server in der EU
            (Irland). Für mögliche Übermittlungen in die USA stützen wir uns auf
            Standardvertragsklauseln. Wir löschen die Nachricht, sobald die
            Anfrage erledigt ist und keine Aufbewahrungspflichten bestehen.
          </p>
          <p>
            Bei einer Angebotsanfrage geben wir deine Angaben nur an die
            Anbieter weiter, die du selbst ausgewählt hast, und nur mit deiner
            Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst sie jederzeit
            mit Wirkung für die Zukunft widerrufen, etwa per E-Mail an uns. Für
            die weitere Verarbeitung ist danach der jeweilige Anbieter
            verantwortlich.
          </p>
        </>
      ) : (
        <p>
          Kontaktformular, Angebotsanfragen und Newsletter sind noch nicht
          aktiv: Eingaben in diese Formulare werden derzeit weder gespeichert
          noch übermittelt. Du erreichst uns per E-Mail an{" "}
          <a href={`mailto:${operator.email}`} className="link-marker">
            {operator.email}
          </a>
          ; dann verarbeiten wir deine Angaben, um dir zu antworten (Art. 6 Abs.
          1 lit. b bzw. f DSGVO), und löschen sie, wenn die Anfrage erledigt
          ist.
        </p>
      )}

      <h2>Links zu Anbietern</h2>
      <p>
        Links mit Sternchen (*) führen über unsere Adresse /go zu den Websites
        der Anbieter. Dabei übermitteln wir keine Daten über dich an den
        Anbieter; ab dem Wechsel gilt dessen Datenschutzerklärung. Wie wir uns
        finanzieren, erklären wir auf der Seite{" "}
        <Link href={"/transparenz" as Route} className="link-marker">
          Transparenz
        </Link>
        .
      </p>

      <h2>Deine Rechte</h2>
      <p>
        Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16),
        Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
        Datenübertragbarkeit (Art. 20) und Widerruf erteilter Einwilligungen
        (Art. 7 Abs. 3). Schreib uns dazu einfach eine E-Mail.
      </p>
      <p>
        <strong>Widerspruchsrecht:</strong> Soweit wir Daten auf Grundlage
        berechtigter Interessen verarbeiten (Art. 6 Abs. 1 lit. f DSGVO), kannst
        du aus Gründen, die sich aus deiner besonderen Situation ergeben,
        jederzeit widersprechen (Art. 21 DSGVO).
      </p>

      <h2>Beschwerderecht</h2>
      <p>
        Du kannst dich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für
        uns zuständig ist der Landesbeauftragte für den Datenschutz und die
        Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173
        Stuttgart.
      </p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        {responsible.name}, {responsible.street}, {responsible.postalCode}{" "}
        {responsible.city}
      </p>

      <h2>Stand</h2>
      <p>{formatDate(UPDATED)}</p>
    </LegalPage>
  );
}
