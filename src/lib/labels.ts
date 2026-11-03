import { formatEUR } from "./format";
import { entryPlan, entryPrice, isPackagePrice, isQuoteOnly } from "./pricing";
import type {
  CategorySlug,
  CompanySize,
  Compliance,
  Tool,
  Tri,
  Unit,
} from "./schema";

// German wording for facts, used identically on every page.

export const perUnit: Record<Unit, string> = {
  nutzer: "pro Nutzer/Monat",
  mitarbeitende: "pro Mitarbeitendem/Monat",
  konto: "pro Konto/Monat",
  kontakte_1000: "pro 1.000 Kontakte/Monat",
  bestellungen: "pro Bestellung",
  rechnungen: "pro Rechnung",
  pauschal: "pro Monat",
};

export const unitPlural: Record<Unit, string> = {
  nutzer: "Nutzer",
  mitarbeitende: "Mitarbeitende",
  konto: "Konten",
  kontakte_1000: "Tsd. Kontakte",
  bestellungen: "Bestellungen",
  rechnungen: "Rechnungen",
  pauschal: "",
};

export const serverLabels: Record<Compliance["serverLocation"], string> = {
  DE: "Deutschland",
  DE_CH: "Deutschland & Schweiz",
  EU: "EU",
  EU_US: "EU und USA",
  US: "USA",
  andere: "Andere",
  unbekannt: "Nicht angegeben",
};

export const certLabels: Record<Compliance["certifications"][number], string> =
  {
    ISO_27001: "ISO 27001",
    ISO_27001_IT_Grundschutz: "ISO 27001 auf Basis IT-Grundschutz",
    BSI_C5: "BSI C5",
    SOC_2: "SOC 2",
    TISAX: "TISAX",
    IDW_PS_880: "IDW PS 880",
    GoBD_Testat: "GoBD-Testat",
  };

export const triLabels: Record<Tri, string> = {
  ja: "Ja",
  nein: "Nein",
  unbekannt: "Nicht angegeben",
};

export const sizeLabels: Record<CompanySize, string> = {
  solo: "Selbstständige",
  kleinst: "2–9",
  klein: "10–49",
  mittel: "50–249",
  gross: "250+",
};

export const channelLabels: Record<
  Tool["support"]["channels"][number],
  string
> = {
  telefon: "Telefon",
  email: "E-Mail",
  chat: "Chat",
  ticket: "Ticket",
  community: "Community",
};

export const onboardingLabels: Record<Tool["support"]["onboarding"], string> = {
  selbst: "Selbst einrichten",
  begleitet: "Begleitet",
  kostenpflichtig: "Kostenpflichtig",
  inklusive: "Inklusive",
  unbekannt: "Nicht angegeben",
};

/** Unit of a tool's first priced plan, falling back to the category unit. */
/** Unit of the entry price: a package price (flat, or base fee with units included) is „pro Monat“. */
export function toolUnit(
  tool: Tool,
  fallback: Unit,
  category?: CategorySlug,
): Unit {
  const entry = entryPlan(tool, "jaehrlich", category);
  if (entry) {
    if (isPackagePrice(entry.plan)) return "pauschal";
    if ("unit" in entry.plan.model) return entry.plan.model.unit;
  }
  for (const plan of tool.pricing.plans) {
    if ("unit" in plan.model) return plan.model.unit;
  }
  return fallback;
}

/** „ab 5,40 €“ or „Auf Anfrage“. `category` = the page's category when it is not the tool's primary one. */
export function priceShort(tool: Tool, category?: CategorySlug) {
  const p = entryPrice(tool, "jaehrlich", category);
  return p == null ? "Auf Anfrage" : `ab ${formatEUR(p)}`;
}

/** „ab 5,40 € pro Mitarbeitendem/Monat“ or „Preis auf Anfrage“. */
export function priceLine(
  tool: Tool,
  fallbackUnit: Unit,
  category?: CategorySlug,
) {
  if (isQuoteOnly(tool)) return "Preis auf Anfrage";
  const p = entryPrice(tool, "jaehrlich", category);
  return p == null
    ? "Preis auf Anfrage"
    : `ab ${formatEUR(p)} ${perUnit[toolUnit(tool, fallbackUnit, category)]}`;
}

export function trialLabel(tool: Tool) {
  if (tool.trial.available === "ja")
    return tool.trial.days ? `${tool.trial.days} Tage kostenlos` : "Ja";
  return triLabels[tool.trial.available];
}

export function minTermLabel(tool: Tool) {
  const m = tool.pricing.contract.minTermMonths;
  if (m == null) return "Nicht angegeben";
  return m === 0 ? "Keine" : `${m} Monate`;
}
