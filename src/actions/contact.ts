"use server";

import { z } from "zod";
import { CONTACT_SUBJECTS, type ContactSubject } from "@/lib/contact";
import { mailConfigured, sendMail } from "@/lib/mail";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Bitte gib deinen Namen an." })
    .max(120),
  email: z.email({ error: "Bitte gib eine gültige E-Mail-Adresse ein." }),
  company: z.string().trim().max(120),
  software: z.string().trim().max(120),
  subject: z.enum(Object.keys(CONTACT_SUBJECTS) as [ContactSubject], {
    error: "Bitte wähle ein Thema.",
  }),
  message: z
    .string()
    .trim()
    .min(10, { error: "Bitte schreib uns mindestens ein paar Worte." })
    .max(4000),
  // Honeypot: real people never fill this hidden field.
  website: z.string().max(0),
});

const TEXT_FIELDS = [
  "name",
  "email",
  "company",
  "software",
  "message",
] as const;
type TextField = (typeof TEXT_FIELDS)[number];
export type ContactField = keyof z.infer<typeof schema>;

export type ContactState = {
  status: "idle" | "error" | "not-ready" | "success";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echo of the text fields: React resets the form after every action. */
  values?: Partial<Record<TextField, string>>;
};

// Contact (§11.19) and vendor form (§11.18). Sent by Resend to CONTACT_INBOX_EMAIL; without credentials
// nothing is sent and the form says so honestly. No database.
export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = Object.fromEntries(
    TEXT_FIELDS.map((f) => [f, String(formData.get(f) ?? "")]),
  );
  const parsed = schema.safeParse({
    ...values,
    subject: formData.get("subject") ?? "",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField | undefined;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    if (errors.website) return { status: "success" };
    return {
      status: "error",
      message: "Bitte prüfe die markierten Felder.",
      errors,
      values,
    };
  }

  const inbox =
    process.env.CONTACT_INBOX_EMAIL ?? process.env.LEADS_INBOX_EMAIL;
  if (!mailConfigured() || !inbox) {
    return {
      status: "not-ready",
      values,
      message:
        "Das Kontaktformular wird gerade eingerichtet. Bitte versuch es zum Start von Dettingenstack noch einmal.",
    };
  }

  const c = parsed.data;
  const text = [
    `Thema: ${CONTACT_SUBJECTS[c.subject]}`,
    `Name: ${c.name}`,
    `E-Mail: ${c.email}`,
    c.company && `Firma: ${c.company}`,
    c.software && `Software: ${c.software}`,
    "",
    c.message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  try {
    await sendMail({
      fromName: "Dettingenstack Kontaktformular",
      to: inbox,
      subject: `Kontakt: ${CONTACT_SUBJECTS[c.subject]}`,
      text,
      replyTo: `${c.name} <${c.email}>`,
    });
  } catch {
    return {
      status: "error",
      values,
      message:
        "Deine Nachricht konnte gerade nicht gesendet werden. Bitte versuch es in ein paar Minuten noch einmal.",
    };
  }

  return { status: "success" };
}
