// Topics for the contact form (/kontakt, /fuer-anbieter). Kept outside the "use server" file,
// which may only export async functions.
export const CONTACT_SUBJECTS = {
  frage: "Frage zu einem Vergleich",
  korrektur: "Fehler oder Korrektur melden",
  anbieter: "Anfrage als Software-Anbieter",
  datenkorrektur: "Daten zu meiner Software korrigieren",
  werbung: "Werbung und Partnerprogramm",
  presse: "Presse",
  sonstiges: "Sonstiges",
} as const;
export type ContactSubject = keyof typeof CONTACT_SUBJECTS;
