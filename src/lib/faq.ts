import { formatEUR } from "./format";
import {
  certLabels,
  perUnit,
  priceLine,
  serverLabels,
  toolUnit,
  trialLabel,
} from "./labels";
import { cheapestEligiblePlan, isQuoteOnly } from "./pricing";
import type { Category, Tool } from "./schema";

// FAQs answered only from stored facts (§11.4). Unknown facts produce honest „nicht angegeben“ answers.

export function costAnswer(tool: Tool, category: Category) {
  if (isQuoteOnly(tool)) {
    return `${tool.name} veröffentlicht keine Listenpreise, der Preis entsteht im Angebot.${
      tool.pricing.note ? ` ${tool.pricing.note}` : ""
    }`;
  }
  const team = category.referenceTeams[0] ?? 25;
  const quote = cheapestEligiblePlan(tool, team, "jaehrlich");
  const unit = toolUnit(tool, category.unit);
  const base = `${tool.name} kostet ${priceLine(tool, category.unit)} (netto, bei jährlicher Zahlung).`;
  return quote
    ? `${base} Für ein Team mit ${team} ${category.unitLabel.plural} zahlst du im günstigsten passenden Tarif „${quote.plan.name}“ rund ${formatEUR(quote.cost.cents)} pro Monat.${
        unit !== category.unit ? ` Abgerechnet wird ${perUnit[unit]}.` : ""
      }`
    : base;
}

export function toolFaqs(tool: Tool, category: Category) {
  const c = tool.compliance;
  const datev = tool.features["datev-lohn"];
  const faqs = [
    { q: `Was kostet ${tool.name}?`, a: costAnswer(tool, category) },
    {
      q: `Wo speichert ${tool.name} die Daten?`,
      a:
        c.serverLocation === "unbekannt"
          ? `${tool.name} nennt auf der Website keinen Serverstandort${c.serverNote ? ` (${c.serverNote})` : ""}. Lass dir den Standort vor Vertragsabschluss im Auftragsverarbeitungsvertrag bestätigen.`
          : `Laut Anbieter: ${serverLabels[c.serverLocation]}${c.serverNote ? ` – ${c.serverNote}` : ""}.`,
    },
    {
      q: `Ist ${tool.name} nach ISO 27001 zertifiziert?`,
      a: c.certifications.length
        ? `Der Anbieter nennt folgende Nachweise: ${c.certifications.map((x) => certLabels[x]).join(", ")}.${c.certificationNote ? ` ${c.certificationNote}` : ""}`
        : `Der Anbieter nennt keine eigene Zertifizierung.${c.certificationNote ? ` ${c.certificationNote}` : ""}`,
    },
    {
      q: `Gibt es eine kostenlose Testversion von ${tool.name}?`,
      a:
        tool.trial.available === "ja"
          ? `Ja: ${trialLabel(tool)}.`
          : tool.trial.available === "nein"
            ? "Nein, eine kostenlose Testversion bietet der Anbieter nicht an."
            : "Dazu macht der Anbieter auf seiner Website keine Angabe. Frag nach einer Demo oder einem Testzugang.",
    },
  ];
  if (datev) {
    faqs.push({
      q: `Hat ${tool.name} eine DATEV-Schnittstelle?`,
      a:
        datev.status === "ja"
          ? `Ja.${datev.fromPlan ? ` Sie ist ab dem Tarif ${tool.pricing.plans.find((p) => p.id === datev.fromPlan)?.name ?? datev.fromPlan} enthalten.` : ""}${datev.note ? ` ${datev.note}.` : ""}`
          : datev.status === "addon"
            ? `Ja, als kostenpflichtige Erweiterung.${datev.note ? ` ${datev.note}.` : ""}`
            : datev.status === "nein"
              ? "Nein."
              : "Dazu macht der Anbieter auf seiner Website keine Angabe.",
    });
  }
  return faqs;
}
