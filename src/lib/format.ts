// All output uses de-DE (non-breaking space before € and %). Money is integer cents, scores 0–100.

const eur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});
const eur0 = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const num = new Intl.NumberFormat("de-DE");
const pct = new Intl.NumberFormat("de-DE", {
  style: "percent",
  maximumFractionDigits: 1,
});
const dateShort = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Berlin",
});
const dateLong = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

export const VAT_RATE = 0.19;

/** „1.234,50 €“ */
export const formatEUR = (cents: number) => eur.format(cents / 100);
/** „1.235 €“ — chart axes only */
export const formatEURRounded = (cents: number) => eur0.format(cents / 100);
/** „4.319“ */
export const formatNumber = (n: number) => num.format(n);
/** „83 %“ */
export const formatPercent = (ratio: number) => pct.format(ratio);
/** „8,7“ */
export const formatScore = (score100: number) =>
  (score100 / 10).toLocaleString("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
/** „28.10.2026“ */
export const formatDate = (iso: string) => dateShort.format(new Date(iso));
/** „28. Oktober 2026“ */
export const formatDateLong = (iso: string) => dateLong.format(new Date(iso));
/** Gross from net cents, rounded once at display time. */
export const withVat = (cents: number) => Math.round(cents * (1 + VAT_RATE));

export function scoreLabel(score100: number) {
  if (score100 >= 90) return "Hervorragend";
  if (score100 >= 80) return "Sehr gut";
  if (score100 >= 70) return "Gut";
  if (score100 >= 60) return "Befriedigend";
  if (score100 >= 50) return "Ausreichend";
  return "Mangelhaft";
}
